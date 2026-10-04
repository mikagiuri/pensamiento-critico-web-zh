"use strict";
/* ===== Arranque: navegación, tema, horario y materias =====
   depende de: store.js, data.js, y de las funciones globales
   loadDeck() / loadQuiz() (flashcards.js, quiz.js, cargados antes). */

/* ----- navegación entre vistas ----- */
const tabs = document.getElementById("tabs");
const views = [...document.querySelectorAll(".view")];
function activeViewId(){ const v = views.find(v => v.classList.contains("active")); return v ? v.id : null; }

function show(id){
  if (!document.getElementById(id)) return;   // (29-09) una vista que este build no lleva (p. ej. «unidad» en el alumnado): no dejar la página en blanco
  views.forEach(v => v.classList.toggle("active", v.id === id));
  /* «estás aquí»: marca TODOS los botones de vista, también los de dentro de los
     desplegables. Al hacerlo, se reactiva el resaltado del grupo (regla :has de mobile.css)
     y el del botón (styles.css), que antes eran código muerto porque solo se marcaban
     los hijos directos de la barra. */
  tabs.querySelectorAll("button[data-view]").forEach(b =>
    b.setAttribute("aria-current", b.dataset.view === id ? "true" : "false"));
  /* deep-linking: refleja la vista en la URL (enlace compartible; persiste al refrescar).
     Conserva el argumento profundo (#vista/arg): solo reescribe el hash cuando cambia la
     vista, para no borrar la clave del tema/cuestionario abierto al hacer show(). */
  if (id){
    var _cur = (location.hash || "").replace(/^#/, "").split("/")[0];
    if (_cur !== id){ try { location.hash = id; } catch (e){} }
  }
  window.scrollTo(0, 0);
  /* accesibilidad: lleva el foco al encabezado de la vista para que el cambio se anuncie. */
  const v = document.getElementById(id), h = v && v.querySelector("h1");
  if (h){ h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e){ try { h.focus(); } catch (_){} } }
}
tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) show(b.dataset.view); });

/* ===== Registro común vista→cargador =====
   Fuente única del mapa {vista: nombreDeFunciónCargadora}. Lo consumen el enrutado por
   hash de aquí y el buscador (search.js), para no duplicar la lista. Los nombres son
   funciones globales (declaraciones de función, existen antes que app.js). resume.js
   mantiene su propio MAP porque guarda además colección/tipo/etiqueta por vista
   (superconjunto), no solo el nombre del cargador. */
window.VIEW_LOADERS = {
  teoria: "loadTheory", lecturas: "loadLectura", materiales: "loadMaterial", cuentos: "loadCuento",
  infografias: "loadInfografia", cuestionarios: "loadQuiz", tarjetas: "loadDeck",
  esquemas: "loadEsq", pau: "loadPau", mapas: "loadMap", cronogramas: "loadCrono", genealogias: "loadGenea",
  ilustres: "loadIlustre", clases: "loadClase",
  pistas: "loadPista",
  logica: "loadLogica",   // (01-10) #logica/tablas|silogismos|puertas   // (01-10) #pistas/kant-imperativo
  comentario: "loadComentario", disertaciones: "loadDisert"   // (29-09) enlaces profundos a un ejemplo resuelto o una disertación: #comentario/heraclito
};

/* enrutado por hash: admite «#vista» (compatibilidad) y «#vista/argumento» (enlace
   profundo a un tema/cuestionario/tarjeta concretos: para Classroom o un QR). */
function parseHash(){
  const raw = (location.hash || "").replace(/^#/, "");
  if (!raw) return null;
  const i = raw.indexOf("/");
  const go = i < 0 ? raw : raw.slice(0, i);
  let arg = i < 0 ? null : raw.slice(i + 1);
  const el = go && document.getElementById(go);
  if (!(el && el.classList.contains("view"))) return null;   // p. ej. #th-3 (ancla interna del índice): se ignora
  if (arg){ try { arg = decodeURIComponent(arg); } catch (e){} }
  return { go: go, arg: arg };
}
/* compatibilidad: por si algo sigue llamando a viewIdFromHash() */
function viewIdFromHash(){ const r = parseHash(); return r ? r.go : null; }
function routeFromHash(){
  const r = parseHash(); if (!r) return;
  if (r.go !== activeViewId()) (window.show || show)(r.go);
  if (r.arg){
    const fn = window.VIEW_LOADERS[r.go];
    if (fn && typeof window[fn] === "function"){ try { window[fn](r.arg); } catch (e){} }
  }
}
window.addEventListener("hashchange", routeFromHash);
/* enrutado inicial tras cargar todos los scripts (para pasar por el show() ya envuelto por navctx).
   (29-09) Las webs del alumnado no tienen portada: sin hash, se abre la ficha de su materia. */
document.addEventListener("DOMContentLoaded", function(){
  routeFromHash();
  if (!activeViewId()){
    const home = document.getElementById("inicio") ? "inicio" : (typeof SUBJECTS !== "undefined" ? Object.keys(SUBJECTS).find(s => document.getElementById(s)) : null);
    if (home) (window.show || show)(home);
  }
});

/* Cada tema/chip/recurso abierto refleja su clave en la URL (#vista/argumento) con
   replaceState: sin ensuciar el historial ni disparar hashchange, de modo que el enlace
   de la barra siempre sea compartible. Se envuelven los cargadores globales igual que
   hace resume.js; las llamadas del arranque ocurren ANTES de este envoltorio, así que no
   fuerzan un hash en la primera carga. Solo actualiza si la vista del cargador está
   activa (evita reescribir el hash en cargas colaterales como la tira «De este tema»). */
function setDeepHash(go, arg){
  const h = "#" + go + (arg != null && arg !== "" ? "/" + encodeURIComponent(String(arg)) : "");
  if (location.hash === h) return;
  try {
    if (history && history.replaceState) history.replaceState(null, "", h);
    else location.hash = h;
  } catch (e){}
}
Object.keys(window.VIEW_LOADERS).forEach(function(go){
  const name = window.VIEW_LOADERS[go], orig = window[name];
  if (typeof orig !== "function") return;
  window[name] = function(k){
    const out = orig.apply(this, arguments);
    if (k != null && activeViewId() === go) setDeepHash(go, k);
    return out;
  };
});

/* ----- tema claro / oscuro / sistema ----- */
const themeBtn = document.getElementById("theme");
function applyTheme(t){
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  else document.documentElement.removeAttribute("data-theme");
}
function themeIcon(t){ return t === "light" ? "☀" : t === "dark" ? "☾" : "◐"; }
let theme = store.get("aula-theme", "system");
applyTheme(theme);
themeBtn.textContent = themeIcon(theme);
themeBtn.addEventListener("click", () => {
  theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  store.set("aula-theme", theme);
  applyTheme(theme);
  themeBtn.textContent = themeIcon(theme);
});

/* ----- imprimir / guardar en PDF (la vista activa, sin cabecera ni filtros) ----- */
const printBtn = document.getElementById("printbtn");
if (printBtn) printBtn.addEventListener("click", () => void 0 /* sin imprimir en la web de alumnado */);

/* ----- horario ----- */
(function buildWeek(){
  const tb = document.getElementById("weekbody"); if (!tb) return;   // sin portada no hay horario
  WEEK.forEach(row => {
    const tr = document.createElement("tr");
    const th = document.createElement("td"); th.className = "h"; th.textContent = row[0]; tr.appendChild(th);
    for (let i = 1; i < 6; i++){
      const td = document.createElement("td"), c = row[i];
      if (Array.isArray(c)){ const s = document.createElement("span"); s.className = "pill " + c[0]; s.textContent = c[1]; td.appendChild(s); }
      else td.innerHTML = '<span style="color:var(--muted)">·</span>';
      tr.appendChild(td);
    }
    tb.appendChild(tr);
  });
})();

/* ----- portada dinámica: «Esta semana (X–Y)» según el calendario ----- */
(function dynamicPortada(){
  if (typeof SEMANAS === "undefined" || !SEMANAS.length) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const fri = function (iso){ const p = iso.split("-").map(Number); const d = new Date(p[0], p[1] - 1, p[2]); d.setDate(d.getDate() + 4); return d; };
  let sem = SEMANAS[SEMANAS.length - 1];
  for (const w of SEMANAS){ if (fri(w.iso) >= today){ sem = w; break; } }
  const h = document.querySelector('#inicio .sec-head h2.sec');
  if (h) h.textContent = "Esta semana" + " (" + sem.ini + " – " + sem.fin + ")";
})();

/* ----- vistas de materia ----- */
/* Mapa de recursos de una materia: por cada tipo de contenido, cuántos elementos
   hay de esa materia. Da al hub un índice navegable de todo lo disponible (además
   de los enlaces curados de s.tools). Guardas typeof por si un build no trae alguna
   colección. Al pulsar una ficha, navctx.js preselecciona la materia en esa vista. */
const HUB_PREGUNTAS = "{n} preguntas", HUB_TARJETAS = "{n} tarjetas", HUB_FRASES = "{n} frases";
function hubNum(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }   // 1293 → 1.293
function subjectResourceMap(subjId){
  const defs = [
    // «Clases» va la primera: la última def se sustituye por «Cuentos» en las webs sin Materiales.
    ["clases", "Clases", typeof CLASES_IDX !== "undefined" ? CLASES_IDX : null],
    ["teoria", "Temas de teoría", typeof THEORY !== "undefined" ? THEORY : null],
    ["lecturas", "Lecturas", typeof LECTURAS !== "undefined" ? LECTURAS : null],
    ["cuestionarios", "Cuestionarios", typeof QUIZZES !== "undefined" ? QUIZZES : null],
    ["tarjetas", "Barajas de conceptos", typeof DECKS !== "undefined" ? DECKS : null, d => d.tipo !== "frases", "conceptos"],
    ["tarjetas", "Barajas de frases", typeof DECKS !== "undefined" ? DECKS : null, d => d.tipo === "frases", "frases"],
    ["infografias", "Infografías", typeof INFOGRAFIAS !== "undefined" ? INFOGRAFIAS : null],
    ["esquemas", "Esquemas", typeof ESQUEMAS !== "undefined" ? ESQUEMAS : null],
    ["mapas", "Mapas conceptuales", typeof MAPS !== "undefined" ? MAPS : null],
    ["materiales", "Materiales", typeof MATERIALS !== "undefined" ? MATERIALS : null]
  ];
  // webs del alumnado: si la sección no existe (p. ej. «Materiales» en 2.º ESO), la ficha no debe llevar a una página vacía.
  // En ESO lo único que queda de MATERIALS son los Cuentos para pensar: la ficha pasa a «Cuentos».
  if (!document.getElementById("materiales") && document.getElementById("cuentos")) defs[defs.length - 1] = ["cuentos", "Cuentos", defs[defs.length - 1][2]];
  // (29-09) cuestionarios y barajas cuentan conjuntos: debajo, el total de preguntas o tarjetas que contienen
  const INNER = { cuestionarios: [x => (x.items || []).length, HUB_PREGUNTAS], tarjetas: [x => (x.cards || []).length, HUB_TARJETAS] };
  return defs.map(([go, label, coll, filt, tipo]) => {
    if (!coll || !document.getElementById(go)) return null;
    const ks = Object.keys(coll).filter(k => coll[k] && coll[k].subject === subjId && (!filt || filt(coll[k]))), n = ks.length;
    const inn = INNER[go], m = inn ? ks.reduce((a, k) => a + inn[0](coll[k]), 0) : 0;
    const sub = m ? (tipo === "frases" ? HUB_FRASES : inn[1]).replace("{n}", hubNum(m)) : "";
    return n ? { go, label, n, sub, tipo } : null;
  }).filter(Boolean);
}

function renderSubjects(){
  Object.entries(SUBJECTS).forEach(([id, s]) => {
    const el = document.getElementById(id);
    const mats = s.mats.map(m => {
      const inner = `<h4>${m[0]}</h4><p>${m[1]}</p><span class="tag">${m[2]}</span>`;
      return m[3] ? `<div class="mat mat-link" data-mat="${m[3]}" role="button" tabindex="0">${inner}</div>` : `<div class="mat">${inner}</div>`;
    }).join("");
    /* solo herramientas cuya vista exista en este build (p. ej. «Clases» no está en Bachillerato) */
    const toolsOk = s.tools.filter(t => document.getElementById(t[1]));
    const tools = toolsOk.length
      ? `<div class="toolrow">${toolsOk.map(t => `<button class="btn" data-go="${t[1]}" data-arg="${t[2]}">${t[0]} →</button>`).join("")}</div>`
      : "";
    const resMap = subjectResourceMap(id);
    const hub = resMap.length
      ? `<div class="sec-head"><h2 class="sec">Explora la materia</h2><p>Todo lo disponible, por tipo. Pulsa para abrirlo.</p></div>
      <div class="hubmap" style="--c:${s.color}">${resMap.map(r => `<button class="hubtile" data-hub="${r.go}"${r.tipo ? ` data-tipo="${r.tipo}"` : ""}><span class="hubtile-n">${r.n}</span><span class="hubtile-l">${r.label}</span>${r.sub ? `<span class="hubtile-s">${r.sub}</span>` : ""}</button>`).join("")}</div>`
      : "";
    el.innerHTML = `<div class="subhead" style="--c:${s.color}"><span class="kick">${s.kick}</span><h1>${s.name}</h1></div>
      <p class="lead">${s.intro}</p>
      ${hub}
      ${mats ? `<div class="sec-head"><h2 class="sec">Materiales</h2></div>
      <div class="mats">${mats}</div>` : ""}${tools}`;
  });
  document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => {
    const go = b.dataset.go, arg = b.dataset.arg;
    show(go);
    if (go === "tarjetas") loadDeck(arg);
    if (go === "cuestionarios") loadQuiz(arg);
    if (go === "teoria") loadTheory(arg);
    if (go === "materiales") loadMaterial(arg);
    if (go === "mapas") loadMap(arg);
  }));
  /* Fichas del hub: solo cambian de vista; navctx.js preselecciona la materia. */
  document.querySelectorAll("[data-hub]").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.hub === "tarjetas" && typeof setDeckTipo === "function") setDeckTipo(b.dataset.tipo || "all");   // ficha de conceptos o de frases → Tarjetas filtrada
    show(b.dataset.hub);
  }));
  document.querySelectorAll("[data-mat]").forEach(b => b.addEventListener("click", () => {
    show("materiales");
    loadMaterial(b.dataset.mat);
  }));
}
renderSubjects();

/* Inicio: las tarjetas de materia abren su hub «Explora la materia». Antes el único
   acceso era el cajón «Materias» del menú (ya retirado): ahora entra por donde el
   usuario mira. navctx.js preselecciona la materia al hacer show(). */
document.querySelectorAll(".courses [data-view]").forEach(card => {
  const go = () => show(card.dataset.view);
  card.addEventListener("click", go);
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
  });
});

/* Inicio de la web COMPLETA del profesor (las tres materias en SUBJECTS; las webs de alumnado
   solo llevan la suya): enlaces a las seis webs públicas en GitHub Pages, con «Copiar» para
   pegarlos en Classroom. En la web completa en euskera (web_eu) se listan igual. */
(function publicWebs(){
  if (typeof SUBJECTS === "undefined" || Object.keys(SUBJECTS).length < 3) return;
  const courses = document.querySelector("#inicio .courses");
  if (!courses) return;
  const B = "https://mikagiuri.github.io/";
  const webs = [
    ["fil", "Filosofía 1.º Bachillerato", "aula-de-filosofia-web"],
    ["hf", "Historia de la Filosofía 2.º Bachillerato", "historia-filosofia-web"],
    ["ipc", "Pensamiento crítico 2.º ESO", "pensamiento-critico-web"]
  ];
  const link = (url, lab) =>
    '<span class="pw-l"><a href="' + url + '" target="_blank" rel="noopener">' + lab + '</a>' +
    '<button class="pw-copy" type="button" data-url="' + url + '" aria-label="Copiar el enlace">Copiar</button></span>';
  const css = document.createElement("style");
  css.textContent = ".pubwebs{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin-top:14px}" +
    ".pubweb{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--c);border-radius:12px;padding:12px 14px}" +
    ".pubweb h3{font:600 .95rem var(--sans);margin:0 0 8px;color:var(--ink)}" +
    ".pw-l{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:4px 0}" +
    ".pw-l a{color:var(--c);font-weight:600;text-decoration:none}.pw-l a:hover{text-decoration:underline}" +
    ".pw-copy{border:1px solid var(--line);background:var(--surface-2);color:var(--muted);border-radius:8px;padding:3px 10px;font-size:.8rem;cursor:pointer}" +
    ".pw-copy.ok{color:var(--ok);border-color:var(--ok)}";
  document.head.appendChild(css);
  courses.insertAdjacentHTML("afterend",
    '<div class="sec-head"><h2 class="sec">Webs del alumnado (en abierto)</h2>' +
    '<p>Lo que ve el alumnado: cada materia con lo suyo y sin material del profesor. Se actualizan al publicar.</p></div>' +
    '<div class="pubwebs">' + webs.map(w =>
      '<div class="pubweb" style="--c:var(--' + w[0] + ')"><h3>' + w[1] + '</h3>' +
      link(B + w[2] + "/", "Castellano") + link(B + w[2] + "-eu/", "Euskera") + '</div>').join("") + '</div>');
  document.querySelectorAll(".pw-copy").forEach(b => b.addEventListener("click", () => {
    const done = () => { b.textContent = "Copiado"; b.classList.add("ok"); setTimeout(() => { b.textContent = "Copiar"; b.classList.remove("ok"); }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.url).then(done, () => window.prompt("Copia el enlace:", b.dataset.url));
    else window.prompt("Copia el enlace:", b.dataset.url);
  }));
})();
