"use strict";
/* ===== Vista Clases ===== depende de: curso.js (CURSO y CURSO_BASE, generado por tools/build_ipc_curso.py), store.js.
   Curso de Pensamiento crítico (2.º ESO). Dos pantallas en la misma sección:
   - «#clases»: índice (trimestres → unidades → sesiones), renderClasesIndex().
   - «#clases/S61»: detalle de una sesión, loadClase(k) (registrado en window.VIEW_LOADERS de app.js,
     que lo envuelve para reflejar la clave en la URL con replaceState; aquí no se toca el hash).
   Los enlaces a diapositivas, PowerPoint y fotocopias salen siempre de clUrl() (CURSO_BASE + ruta).
   Progreso: una sola clave de store, «aula-clases» = { ultima: "S61" }. Estilos: css/clases.css. */

const CLASES_TXT = {
  todas: "← 所有课程",
  anterior: "‹ 上一个",
  siguiente: "下一个 ›",
  sigNext: "下一课：{n} · {titulo}",
  proyectar: "▶ 投影",
  proyectarN: "▶ 投影第 {n} 课",
  proyectarT: "投影",
  pptx: "PowerPoint",
  fotocopias: "本课讲义",
  fotocopiasPdf: "整个单元（一个 PDF）",
  fotocopiasU: "第 {n} 课讲义",
  fotocopiasT: "本课讲义 (PDF)",
  sigue: "从这里继续",
  todo: "全部",
  sesion: "课",
  unidad: "单元",
  unidades: "单元 {a}–{b} · 共 {n} 节课",
  sesiones: "节课",
  enSesion: "本课内容",
  empezar: "先来热身",
  bloque: "部分 {i}",
  tres: "今天的内容，三句话总结",
  repasoUnidad: "复习：每节课三句话，回顾整个单元",
  turno: "轮到你了：今天的练习单",
  examen: "单元测验",
  examenBadge: "测验",
  trampa: "\u26A0 陷阱案例",
  verPasos: "先想一想再继续 · 看看怎么解决",
  puntos: "{p} 分",
  corrige: "在课堂上批改。",
  primera: "这是第一节课",
  fin: "你已经学完了整门课程",
  vacio: "没有加载任何课程。",
  ariaProyectar: "投影第 {n} 课",
  ariaIndice: "本课目录",
  ariaTrim: "学期"
};

/* clave "S61" → ítem (lo consumen search.js, resume.js y el hub de la materia en app.js) */
const CLASES_IDX = {};
/* claves en orden de curso: anterior/siguiente cruzan unidades (S66 → S67) */
const CL_ORDEN = [];
let clasesKey = null;   // sesión abierta, o null = índice
let clTrim = null;      // trimestre elegido en el índice ("*" = Todo); no se persiste

function clEsc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function clMd(s){ return clEsc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
function clPlain(s){ return String(s == null ? "" : s).replace(/\*\*/g, ""); }
function clTxt(key, vars){ return String(CLASES_TXT[key] || "").replace(/\{(\w+)\}/g, (m, k) => vars && k in vars ? String(vars[k]) : m); }
function clSid(n){ return "S" + String(n).padStart(2, "0"); }
function clUid(u){ return "U" + String(u).padStart(2, "0"); }
/* "S61", "s61", "61", 61 → "S61"; null si no existe */
function clNorm(k){
  const m = String(k == null ? "" : k).trim().match(/^s?0*(\d+)$/i);
  if (!m) return null;
  const key = clSid(m[1]);
  return CLASES_IDX[key] ? key : null;
}
function clUrl(rel){ return (typeof CURSO_BASE !== "undefined" ? CURSO_BASE : "") + rel; }
function clState(){ return store.get("aula-clases", {}) || {}; }
function clSave(key){ store.set("aula-clases", { ultima: key }); }
// nombre corto del trimestre para el chip; si dos grupos empiezan igual («Ampliación · …»), se muestra lo de después del «·»
function clTrimNombre(t){
  const [ini, fin] = String(t || "").split("·").map(x => x.trim());
  return fin && clTrims().filter(x => String(x).split("·")[0].trim() === ini).length > 1 ? fin : ini;
}
function clTrims(){ const out = []; if (typeof CURSO !== "undefined") CURSO.forEach(u => { if (out.indexOf(u.trimestre) < 0) out.push(u.trimestre); }); return out; }

(function clBuild(){
  if (typeof CURSO === "undefined" || !Array.isArray(CURSO)) return;
  CURSO.forEach(u => (u.sesiones || []).forEach(s => {
    const key = clSid(s.n), titulo = clPlain(s.titulo), utitulo = clPlain(u.titulo);
    CLASES_IDX[key] = {
      key: key, n: s.n, titulo: titulo, idea: clPlain(s.idea), examen: !!s.examen,
      unidad: u.unidad, utitulo: utitulo, trimestre: u.trimestre, subject: "ipc", i: CL_ORDEN.length,
      label: s.n + " · " + titulo, meta: CLASES_TXT.unidad + " " + u.unidad + " · " + utitulo, s: s, u: u
    };
    CL_ORDEN.push(key);
  }));
})();

/* trimestre inicial del índice: el de la última sesión abierta; si no, por mes */
function clTrimDefault(){
  const last = clNorm(clState().ultima);
  if (last) return CLASES_IDX[last].trimestre;
  const ts = clTrims(), m = new Date().getMonth() + 1;
  const i = m >= 9 ? 0 : m <= 3 ? 1 : m <= 6 ? 2 : 0;
  return ts[i] || ts[0] || "*";
}

function clUnidadCard(u, ultima){
  const rows = (u.sesiones || []).map(s => {
    const key = clSid(s.n);
    return '<li><button class="cl-seslink" type="button" data-go-clase="' + key + '" aria-current="' + (key === ultima) + '" title="' + clEsc(clPlain(s.idea)) + '">' +
      '<span class="cl-n">' + s.n + '</span><span class="cl-t">' + clMd(s.titulo) +
      (s.examen ? ' <span class="cl-badge">' + clEsc(CLASES_TXT.examenBadge) + '</span>' : '') + '</span></button>' +
      '<a class="cl-play" href="' + clEsc(clUrl("diapositivas/" + key + ".html")) + '" target="_blank" rel="noopener" aria-label="' + clEsc(clTxt("ariaProyectar", { n: s.n })) + '" title="' + clEsc(CLASES_TXT.proyectarT) + '">▶</a>' +
      '<a class="cl-play cl-pdf" href="' + clEsc(clUrl("fotocopias/" + key + ".pdf")) + '" target="_blank" rel="noopener" aria-label="' + clEsc(CLASES_TXT.fotocopiasT) + '" title="' + clEsc(CLASES_TXT.fotocopiasT) + '">PDF</a></li>';
  }).join("");
  return '<article class="course cl-unidad" style="--c:var(--ipc)">' +
    '<span class="kick">' + clEsc(CLASES_TXT.unidad + " " + u.unidad) + '</span><h3>' + clMd(u.titulo) + '</h3>' +
    '<ol class="cl-ses">' + rows + '</ol>' +
    '<div class="meta"><a href="' + clEsc(clUrl("fotocopias/" + clUid(u.unidad) + ".pdf")) + '" target="_blank" rel="noopener">' + clEsc(CLASES_TXT.fotocopiasPdf) + '</a>' +
    '<span><b>' + (u.sesiones || []).length + '</b> ' + clEsc(CLASES_TXT.sesiones) + '</span></div></article>';
}

/* Índice («#clases»): tira «Sigue por aquí», chips de trimestre y una tarjeta por unidad. */
function renderClasesIndex(){
  const root = document.getElementById("clases-root"), sec = document.getElementById("clases");
  if (!root) return;
  if (sec) sec.classList.remove("cl-detalle");
  clasesKey = null;
  if (!CL_ORDEN.length){ root.innerHTML = '<p class="empty">' + clEsc(CLASES_TXT.vacio) + '</p>'; return; }
  const trims = clTrims();
  if (clTrim == null) clTrim = clTrimDefault();
  if (clTrim !== "*" && trims.indexOf(clTrim) < 0) clTrim = trims[0];
  const ultima = clNorm(clState().ultima);
  let html = "";
  if (ultima){
    const it = CLASES_IDX[ultima], nx = CLASES_IDX[CL_ORDEN[it.i + 1]] || null, tgt = nx || it;
    html += '<div class="resume cl-resume"><div class="resume-txt"><span class="resume-kick">' + clEsc(CLASES_TXT.sigue) + '</span>' +
      '<button class="resume-go" type="button" data-go-clase="' + it.key + '">' + clEsc(it.label) + '</button></div>' +
      '<div class="toolrow cl-resume-acts">' +
      (nx ? '<button class="btn" type="button" data-go-clase="' + nx.key + '">' + clEsc(clTxt("sigNext", { n: nx.n, titulo: (nx.unidad !== it.unidad ? clUid(nx.unidad) + " · " : "") + nx.titulo })) + '</button>' : '') +
      '<a class="btn ghost" href="' + clEsc(clUrl("diapositivas/" + tgt.key + ".html")) + '" target="_blank" rel="noopener">' + clEsc(clTxt("proyectarN", { n: tgt.n })) + '</a>' +
      '<a class="btn ghost" href="' + clEsc(clUrl("fotocopias/" + tgt.key + ".pdf")) + '" target="_blank" rel="noopener">' + clEsc(clTxt("fotocopiasU", { n: tgt.n })) + '</a>' +
      '</div></div>';
  }
  html += '<div class="chips" id="cltrim" role="group" aria-label="' + clEsc(CLASES_TXT.ariaTrim) + '">' +
    '<button class="chip" type="button" data-trim="*" aria-pressed="' + (clTrim === "*") + '">' + clEsc(CLASES_TXT.todo) + '</button>' +
    trims.map(t => '<button class="chip" type="button" data-trim="' + clEsc(t) + '" aria-pressed="' + (clTrim === t) + '">' + clEsc(clTrimNombre(t)) + '</button>').join("") +
    '</div>';
  trims.filter(t => clTrim === "*" || t === clTrim).forEach(t => {
    const us = CURSO.filter(u => u.trimestre === t);
    const n = us.reduce((a, u) => a + (u.sesiones || []).length, 0);
    html += '<div class="sec-head"><h2 class="sec">' + clEsc(t) + '</h2><p>' + clEsc(clTxt("unidades", { a: us[0].unidad, b: us[us.length - 1].unidad, n: n })) + '</p></div>' +
      '<div class="courses">' + us.map(u => clUnidadCard(u, ultima)).join("") + '</div>';
  });
  root.innerHTML = html;
}

/* pasos de un caso: el que empieza por «Conclusión:» va destacado (por prefijo, no por posición) */
function clPasos(pasos){
  return '<ol>' + (pasos || []).map(p => '<li' + (/^\s*Conclusi[oó]n:/i.test(clPlain(p)) ? ' class="cl-concl"' : '') + '>' + clMd(p) + '</li>').join("") + '</ol>';
}
function clLis(puntos){ return '<ul>' + (puntos || []).map(p => '<li>' + clMd(p) + '</li>').join("") + '</ul>'; }
function clH3(d){ return d.titulo ? '<h3>' + clMd(d.titulo) + '</h3>' : ''; }

/* Una diapositiva del curso como tarjeta, según su tipo. Un tipo desconocido nunca rompe la sesión. */
function clDiapo(d){
  if (!d) return "";
  switch (d.tipo){
    case "concepto":
      return '<div class="cl-card cl-concepto">' + clH3(d) + '<p class="cl-def">' + clMd(d.texto) + '</p>' + (d.puntos && d.puntos.length ? clLis(d.puntos) : '') + '</div>';
    case "lista":
      return '<div class="cl-card cl-lista">' + clH3(d) + (d.texto ? '<p>' + clMd(d.texto) + '</p>' : '') + clLis(d.puntos) + '</div>';
    case "tabla": {
      const cab = d.cabecera || [];
      return '<div class="cl-card cl-tabla">' + clH3(d) + '<div class="tablewrap"><table><thead><tr>' +
        cab.map(c => '<th>' + clMd(c) + '</th>').join("") + '</tr></thead><tbody>' +
        (d.filas || []).map(f => '<tr>' + f.map((c, j) => '<td data-h="' + clEsc(clPlain(cab[j] || "")) + '">' + clMd(c) + '</td>').join("") + '</tr>').join("") +
        '</tbody></table></div></div>';
    }
    case "caso":
      return '<div class="cl-card cl-caso-card">' + clH3(d) + '<p class="cl-caso">' + clMd(d.caso) + '</p>' + clPasos(d.pasos) + '</div>';
    case "contraste": {
      const izq = d.izq || {}, der = d.der || {};
      return '<div class="cl-card cl-contraste">' + clH3(d) + '<div class="cl-cols">' +
        '<div class="cl-col cl-no"><h4>' + clMd(izq.titulo) + '</h4>' + clLis(izq.puntos) + '</div>' +
        '<div class="cl-col cl-si"><h4>' + clMd(der.titulo) + '</h4>' + clLis(der.puntos) + '</div>' +
        '</div></div>';
    }
    case "cita":
      return '<figure class="cl-card cl-cita"><blockquote class="cl-quote">' + clMd(d.texto) + '</blockquote>' +
        (d.autor ? '<figcaption class="cl-autor">— ' + clMd(d.autor) + '</figcaption>' : '') + '</figure>';
    case "trampa":
      return '<div class="cl-card cl-trampa"><h3><span class="cl-warn">' + clEsc(CLASES_TXT.trampa) + '</span>' + clMd(d.titulo) + '</h3>' +
        '<p class="cl-caso">' + clMd(d.caso) + '</p>' + (d.pregunta ? '<p class="cl-q">' + clMd(d.pregunta) + '</p>' : '') +
        '<details class="cl-reveal"><summary>' + clEsc(CLASES_TXT.verPasos) + '</summary>' + clPasos(d.pasos) + '</details></div>';
    default:
      if (d.puntos && d.puntos.length) return '<div class="cl-card cl-lista">' + clH3(d) + (d.texto ? '<p>' + clMd(d.texto) + '</p>' : '') + clLis(d.puntos) + '</div>';
      return '<div class="cl-card"><h3>' + clMd(d.titulo || "") + '</h3><p>' + clMd(d.texto || d.caso || "") + '</p></div>';
  }
}

/* La hoja del día: solo las preguntas, numeradas de forma continua a lo largo de los peldaños
   (igual que la fotocopia). */
function clHoja(s){
  let q = 0;
  const parts = (s.hoja || []).map(p => {
    const items = (p.items || []);
    const start = q + 1; q += items.length;
    return '<h4>' + clMd(p.nombre) + ' <span class="cl-pts">' + clEsc(clTxt("puntos", { p: p.puntos })) + '</span></h4>' +
      '<ol start="' + start + '">' + items.map(it => '<li>' + clMd(it.pregunta) + '</li>').join("") + '</ol>';
  }).join("");
  return '<div class="cl-card cl-hoja">' + parts + '<p class="cl-nota">' + clEsc(CLASES_TXT.corrige) + '</p></div>';
}

/* Bloque opcional de las sesiones de examen: el resumen de las sesiones anteriores de la unidad. */
function clRepasoUnidad(u, s){
  return (u.sesiones || []).filter(x => x.n < s.n).map(x => {
    const key = clSid(x.n);
    return '<div class="cl-card cl-repaso"><h3><button class="cl-seslink" type="button" data-go-clase="' + key + '">' +
      '<span class="cl-n">' + x.n + '</span><span class="cl-t">' + clMd(x.titulo) + '</span></button></h3>' +
      '<ul>' + (x.resumen || []).map(r => '<li>' + clMd(r) + '</li>').join("") + '</ul></div>';
  }).join("");
}

/* Detalle de una sesión («#clases/S61»). Clave desconocida → índice. */
function loadClase(k){
  const root = document.getElementById("clases-root"), sec = document.getElementById("clases");
  if (!root) return;
  const key = clNorm(k);
  if (!key){ renderClasesIndex(); return; }
  if (clasesKey === key && document.getElementById("clbody")){ window.scrollTo(0, 0); return; }
  const it = CLASES_IDX[key], s = it.s, u = it.u, ar = s.arranque || {};
  const prev = it.i > 0 ? CLASES_IDX[CL_ORDEN[it.i - 1]] : null;
  const next = CLASES_IDX[CL_ORDEN[it.i + 1]] || null;
  if (sec) sec.classList.add("cl-detalle");

  const toc = []; let n = 0;
  const h2 = (label, inner) => { n++; toc.push({ id: "cl-" + n, label: label }); return '<h2 id="cl-' + n + '">' + (inner || clEsc(label)) + '</h2>'; };
  let body = h2(CLASES_TXT.empezar) +
    '<div class="cl-card cl-arranque"><p class="cl-quote">' + clMd(ar.texto) + '</p>' + (ar.pregunta ? '<p class="cl-q">' + clMd(ar.pregunta) + '</p>' : '') + '</div>';
  (s.bloques || []).forEach((b, i) => {
    const num = clTxt("bloque", { i: i + 1 });
    body += h2(num + " · " + clPlain(b.titulo), '<span class="cl-blq">' + clEsc(num) + '</span>' + clMd(b.titulo)) +
      (b.diapositivas || []).map(clDiapo).join("");
  });
  body += h2(CLASES_TXT.tres) + '<div class="cl-card cl-resumen"><ol>' + (s.resumen || []).map(r => '<li>' + clMd(r) + '</li>').join("") + '</ol></div>';
  if (s.examen) body += h2(CLASES_TXT.repasoUnidad) + clRepasoUnidad(u, s);
  body += h2(s.examen ? CLASES_TXT.examen : CLASES_TXT.turno) + clHoja(s);

  const pn = (x, txt) => x ? '<button class="btn ghost" type="button" data-go-clase="' + x.key + '" title="' + clEsc(x.label) + '">' + clEsc(txt) + '</button>' : '';
  const card = (x, kick, empty, extra) => x
    ? '<button class="cl-pn-card' + extra + '" type="button" data-go-clase="' + x.key + '"><span class="kick">' + clEsc(kick) + '</span><b>' + clEsc(x.label) + '</b></button>'
    : '<p class="empty">' + clEsc(empty) + '</p>';
  const link = (cls, rel, txt) => '<a class="' + cls + '" href="' + clEsc(clUrl(rel)) + '" target="_blank" rel="noopener">' + clEsc(txt) + '</a>';

  root.innerHTML =
    '<div class="toolrow cl-nav"><button class="btn ghost" type="button" data-back>' + clEsc(CLASES_TXT.todas) + '</button>' +
      '<span class="cl-pn">' + pn(prev, CLASES_TXT.anterior) + pn(next, CLASES_TXT.siguiente) + '</span></div>' +
    '<div class="cl-head"><div class="theory-head cl-headin">' +
      '<span class="kick">' + clEsc(CLASES_TXT.sesion + " " + s.n + " · " + CLASES_TXT.unidad + " " + u.unidad + " · " + clPlain(u.titulo)) + '</span>' +
      '<h1 tabindex="-1">' + clMd(s.titulo) + '</h1></div>' +
      '<p class="cl-idea">' + clMd(s.idea) + '</p>' +
      '<div class="toolrow cl-links">' +
        link("btn", "diapositivas/" + key + ".html", CLASES_TXT.proyectar) +
        link("btn ghost", "fotocopias/" + key + ".pdf", CLASES_TXT.fotocopias) +
        link("btn ghost", "pptx/" + key + ".pptx", CLASES_TXT.pptx) +
      '</div></div>' +
    '<div class="theory-layout">' +
      '<nav class="toc" id="cltoc" aria-label="' + clEsc(CLASES_TXT.ariaIndice) + '"><div class="toc-title">' + clEsc(CLASES_TXT.enSesion) + '</div><ol>' +
        toc.map(t => '<li><a href="#' + t.id + '">' + clEsc(t.label) + '</a></li>').join("") + '</ol></nav>' +
      '<article class="theory" id="clbody">' + body + '</article>' +
    '</div>' +
    '<div class="cl-pager">' + card(prev, CLASES_TXT.anterior, CLASES_TXT.primera, "") + card(next, CLASES_TXT.siguiente, CLASES_TXT.fin, " cl-next") + '</div>' +
    '<div class="toolrow"><button class="btn ghost" type="button" data-back>' + clEsc(CLASES_TXT.todas) + '</button></div>';

  clasesKey = key;
  clSave(key);
  window.scrollTo(0, 0);
  const h = root.querySelector(".cl-headin h1");
  if (h){ try { h.focus({ preventScroll: true }); } catch (e){ try { h.focus(); } catch (_){} } }
}

/* Volver al índice desde un detalle (botón, atrás del navegador o el botón «Clases» del menú). */
function clBack(){
  if (clasesKey && CLASES_IDX[clasesKey] && clTrim !== "*") clTrim = CLASES_IDX[clasesKey].trimestre;
  renderClasesIndex();
  try { history.replaceState(null, "", "#clases"); } catch (e){}
  window.scrollTo(0, 0);
  const h = document.querySelector("#clases h1.title");
  if (h){ h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e){} }
}

/* Arranque y listeners (una sola vez). Nunca loadClase aquí: «#clases/S61» lo enruta app.js al cargar. */
(function clInit(){
  const root = document.getElementById("clases-root");
  if (!root || typeof CURSO === "undefined") return;
  root.addEventListener("click", e => {
    const go = e.target.closest("[data-go-clase]");
    if (go){
      // Del índice al detalle: entrada propia en el historial («#clases/S61» con pushState) para que «Atrás»
      // vuelva a «#clases» (el hashchange de abajo repinta el índice). Sin esto, el envoltorio de app.js
      // hace replaceState y pisa la entrada «#clases»: «Atrás» saltaba a la vista anterior con el detalle
      // aún pintado. Entre detalles sigue el replaceState del envoltorio (no ensucia el historial).
      const key = clNorm(go.dataset.goClase);
      if (clasesKey === null && key && location.hash !== "#clases/" + key) { try { history.pushState(null, "", "#clases/" + key); } catch (err){} }
      loadClase(go.dataset.goClase); return;
    }
    if (e.target.closest("[data-back]")){ clBack(); return; }
    const tr = e.target.closest("[data-trim]");
    if (tr){ clTrim = tr.dataset.trim; renderClasesIndex(); return; }
    const a = e.target.closest("#cltoc a");
    if (a){
      e.preventDefault();
      const t = document.getElementById((a.getAttribute("href") || "").slice(1));
      if (t) t.scrollIntoView({ block: "start" });
    }
  });
  window.addEventListener("hashchange", () => { if (location.hash === "#clases" && clasesKey) clBack(); });
  const tb = document.querySelector('#tabs button[data-view="clases"]');
  // Solo cuando Clases ya está activa: es el único caso en que show() no reescribe el hash. Desde otra
  // vista, show() empuja «#clases» y el hashchange de arriba ya vuelve al índice (si se llamase aquí,
  // el replaceState pisaría la entrada de la vista que se deja y «Atrás» la perdería).
  if (tb) tb.addEventListener("click", () => {
    const sec = document.getElementById("clases");
    if (clasesKey && sec && sec.classList.contains("active")) clBack();
  });
  document.addEventListener("keydown", e => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const sec = document.getElementById("clases");
    if (!sec || !sec.classList.contains("active") || !clasesKey) return;
    const a = document.activeElement, tag = a && a.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (a && a.isContentEditable)) return;
    const it = CLASES_IDX[clasesKey]; if (!it) return;
    const k = CL_ORDEN[it.i + (e.key === "ArrowRight" ? 1 : -1)];
    if (k){ e.preventDefault(); loadClase(k); }
  });
  renderClasesIndex();
})();
