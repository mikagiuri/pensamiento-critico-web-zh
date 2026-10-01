"use strict";
/* ===== «Pistas» (fil/hf/ipc): itinerarios de pistas progresivas tipo Universal Hint System =====
   depende de: pistas_uhs.js (PISTAS). Motor derivado de editables/pistas_uhs (prototipo en
   fuentes fijas/uhs_kant). Cada itinerario: ciclos de pregunta → pistas (de vagas a casi la
   respuesta) → comprobación; si fallas, vuelves a las pistas; si las agotas, rescate (texto y
   después definición, cada uno con su comprobación).
   (01-10) Pistas en BLOQUES OCULTOS tipo Reddit: cada pista se revela al pulsarla, en el orden que
   quieras; y navegación de PÁGINA A PÁGINA: un índice de preguntas para saltar dentro del itinerario.
   El progreso se guarda en este navegador (clave aula-pistas-<id>). Enlace profundo: #pistas/<id>. */

/* textos de interfaz: cadenas enteras (así los traduce web_i18n/ui/<lang>.json) */
const PIS_TXT = {
  elige: "选择一道问题。试着独自回答；一条一条地请求提示，一旦你能自己回答就停下来。",
  sinEmpezar: "未开始", enCurso: "进行中", hecho: "已完成",
  volver: "← 所有问题", reiniciar: "重新开始",
  puedo: "我觉得我能回答", necesito: "我需要一条提示", yaPuedo: "我现在能回答了", otra: "再来一条提示",
  leer: "我需要阅读一段文字", comprobar: "检查我是否理解了",
  soloLoQuePidas: "指导只会显示你要求的内容。", detente: "如果你已经能重新组织出答案，就在这里停下来。",
  pistaDe: "提示 {n} / {t}", quedaUna: "还剩 1 条提示。", quedan: "还剩 {n} 条提示。", ninguna: "没有更多提示了。",
  comprobacion: "检查", pregunta: "问题", logrado: "已达成理解", completado: "路线已完成",
  sinAyuda: "你没有使用提示就解出来了。", usaste: "已使用提示：{n}。", repetir: "重新浏览一遍", siguiente: "下一道问题：",
  pisN: "提示 {n}", revelar: "点击以显示", preguntas: "问题"
};

const PIS = { it: null, st: null };
const pisBox = () => document.getElementById("pistasbox");
const pisKey = id => "aula-pistas-" + id;
const pisNuevo = () => ({ c: 0, vista: "inicio", rev: {}, r: 0, intentos: 0, usadas: 0, done: {} });
/* índices de pistas reveladas del ciclo actual (persisten por ciclo al saltar de página) */
const pisRev = () => (PIS.st.rev[PIS.st.c] || (PIS.st.rev[PIS.st.c] = []));

function pisLoad(id){
  try { const s = JSON.parse(localStorage.getItem(pisKey(id))); if (s && typeof s.c === "number"){
    const st = Object.assign(pisNuevo(), s);
    if (!st.rev || typeof st.rev !== "object") st.rev = {};
    if (!st.done || typeof st.done !== "object") st.done = {};
    return st;
  } } catch (e){}
  return null;
}
function pisSave(){ try { localStorage.setItem(pisKey(PIS.it.id), JSON.stringify(PIS.st)); } catch (e){} }

function pisBarajar(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- catálogo ---------- */
function renderPisCatalogo(){
  PIS.it = null;
  const box = pisBox(); if (!box) return;
  box.innerHTML = '<p class="pis-intro">' + PIS_TXT.elige + '</p><div class="pis-cat">' + PISTAS.map(it => {
    const s = pisLoad(it.id), est = !s ? PIS_TXT.sinEmpezar : s.vista === "fin" ? PIS_TXT.hecho : PIS_TXT.enCurso;
    return '<button class="pis-item' + (s && s.vista === "fin" ? " done" : "") + '" data-id="' + it.id + '" style="--pc:var(--' + it.subject + ')"><span class="pis-tema">' + it.tema + '</span>' +
      '<span class="pis-tit">' + it.titulo + '</span><span class="pis-est">' + est + '</span></button>';
  }).join("") + '</div>';
  box.querySelectorAll("[data-id]").forEach(b => b.addEventListener("click", () => loadPista(b.dataset.id)));
}

/* ---------- itinerario ---------- */
function loadPista(id){
  const it = PISTAS.find(x => x.id === id);
  if (!it) return renderPisCatalogo();
  PIS.it = it; PIS.st = pisLoad(id) || pisNuevo();
  pisBox().style.setProperty("--pc", "var(--" + it.subject + ")");
  if (PIS.st.c >= it.ciclos.length) PIS.st.vista = "fin";
  pisPintar();
}

function pisIr(v){ PIS.st.vista = v; pisSave(); pisPintar(); }
const pisCiclo = () => PIS.it.ciclos[PIS.st.c];

/* saltar a una pregunta cualquiera del itinerario (navegación de página a página) */
function pisIrPregunta(i){
  if (i < 0 || i >= PIS.it.ciclos.length) return;
  PIS.st.c = i; PIS.st.r = 0; PIS.st.intentos = 0;
  pisIr("inicio");
}

function pisSiguienteCiclo(){
  const st = PIS.st; st.done[st.c] = true; st.c += 1; st.r = 0; st.intentos = 0;
  pisIr(st.c >= PIS.it.ciclos.length ? "fin" : "inicio");
}

function pisMarco(dentro, cuerpo){
  const it = PIS.it, n = it.ciclos.length, st = PIS.st;
  const doneN = Object.keys(st.done).filter(k => st.done[k]).length;
  const base = st.vista === "fin" ? n : doneN;
  const pct = Math.min(100, Math.round(((base + Math.min(dentro, 1)) / n) * 100));
  const k = pisCiclo();
  const pager = n > 1 ? '<div class="pis-pager"><span class="pis-pager-lb">' + PIS_TXT.preguntas + '</span>' +
    it.ciclos.map((cy, i) => '<button type="button" class="pis-pg' + (i === st.c && st.vista !== "fin" ? " cur" : "") + (st.done[i] ? " done" : "") + '" data-go="' + i + '" aria-label="' + PIS_TXT.pregunta + ' ' + (i + 1) + '">' + (i + 1) + '</button>').join("") +
    '</div>' : "";
  pisBox().innerHTML = '<div class="pis-top"><button class="linkbtn" id="pisback">' + PIS_TXT.volver + '</button>' +
    '<button class="linkbtn" id="pisreset">' + PIS_TXT.reiniciar + '</button></div>' +
    '<h2 class="pis-h">' + it.titulo + '</h2>' +
    '<div class="pis-prog"><div class="pis-prog-head"><span>' + (k ? k.fase : PIS_TXT.completado) + '</span><span>' + pct + ' %</span></div>' +
    '<div class="pis-track"><div class="pis-bar" style="width:' + pct + '%"></div></div>' + pager + '</div>' +
    '<div class="pis-card" aria-live="polite">' + cuerpo + '<div class="pis-actions"></div></div>';
  pisBox().querySelector("#pisback").addEventListener("click", renderPisCatalogo);
  pisBox().querySelector("#pisreset").addEventListener("click", () => { PIS.st = pisNuevo(); pisSave(); pisPintar(); });
  pisBox().querySelectorAll(".pis-pg").forEach(b => b.addEventListener("click", () => pisIrPregunta(+b.dataset.go)));
}
function pisBotones(...bs){
  const fila = pisBox().querySelector(".pis-actions");
  bs.filter(Boolean).forEach(([txt, prim, fn]) => {
    const b = document.createElement("button"); b.type = "button";
    b.className = prim ? "pis-btn" : "pis-btn2"; b.innerHTML = txt; b.addEventListener("click", fn); fila.appendChild(b);
  });
}

function pisInicio(){
  const k = pisCiclo();
  pisMarco(0, '<div class="pis-label">' + (k.etiqueta || PIS_TXT.pregunta) + '</div><h3>' + k.pregunta + '</h3>' +
    (k.intro || []).map(p => '<p>' + p + '</p>').join("") + '<p class="pis-small">' + PIS_TXT.soloLoQuePidas + '</p>');
  pisBotones([PIS_TXT.puedo, true, () => pisIr("comprobacion")], [PIS_TXT.necesito, false, () => pisIr("pista")]);
}

/* pistas en bloques ocultos (spoiler): se revela cada una al pulsarla, en el orden que quieras */
function pisPista(){
  const k = pisCiclo(), st = PIS.st, n = k.pistas.length, rev = pisRev();
  const bloques = k.pistas.map((p, i) => rev.indexOf(i) >= 0
    ? '<div class="pis-hint reveal">' + p + '</div>'
    : '<button type="button" class="pis-spoil" data-h="' + i + '"><span class="pis-spoil-n">' + PIS_TXT.pisN.replace("{n}", i + 1) + '</span><span class="pis-spoil-cta">' + PIS_TXT.revelar + '</span></button>'
  ).join("");
  pisMarco(0.1 + 0.45 * (rev.length / n),
    '<div class="pis-label">' + PIS_TXT.pregunta + '</div><h3>' + k.pregunta + '</h3>' +
    '<p class="pis-small">' + PIS_TXT.soloLoQuePidas + '</p>' +
    '<div class="pis-spoilers">' + bloques + '</div>' +
    (rev.length ? '<p class="pis-small">' + PIS_TXT.detente + '</p>' : ''));
  pisBox().querySelectorAll(".pis-spoil").forEach(b => b.addEventListener("click", () => {
    const i = +b.dataset.h, r = pisRev();
    if (r.indexOf(i) < 0){ r.push(i); st.usadas += 1; pisSave(); }
    pisPintar();
  }));
  const resc = k.rescate && k.rescate.length;
  pisBotones([PIS_TXT.yaPuedo, true, () => pisIr("comprobacion")],
    (resc && rev.length >= n) ? [k.rescate[0].boton || PIS_TXT.leer, false, () => { st.r = 0; st.intentos = 0; pisIr("rescate"); }] : null);
}

function pisTest(test, dentro, alAcertar, alFallar){
  pisMarco(dentro, '<div class="pis-label">' + (test.etiqueta || PIS_TXT.comprobacion) + '</div><h3>' + test.pregunta + '</h3>' +
    '<div class="pis-choices"></div><div class="pis-fb" role="status"></div>');
  const lista = pisBox().querySelector(".pis-choices"), fb = pisBox().querySelector(".pis-fb");
  pisBarajar(test.opciones).forEach(([txt, ok, porQue]) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "pis-choice"; b.innerHTML = txt;
    b.addEventListener("click", () => {
      lista.querySelectorAll("button").forEach(x => (x.disabled = true));
      b.classList.add(ok ? "ok" : "bad");
      fb.className = "pis-fb " + (ok ? "ok" : "bad"); fb.innerHTML = ok ? test.ok : (porQue || test.mal);
      setTimeout(ok ? alAcertar : alFallar, ok ? 1200 : 2200);
    });
    lista.appendChild(b);
  });
}

function pisRescate(){
  const p = pisCiclo().rescate[PIS.st.r];
  pisMarco(0.65 + 0.1 * PIS.st.r, '<div class="pis-label">' + p.etiqueta + '</div><h3>' + p.titulo + '</h3>' +
    (p.cita ? '<blockquote class="pis-cita">' + p.cita.texto + (p.cita.fuente ? '<cite>' + p.cita.fuente + '</cite>' : '') + '</blockquote>' : '') +
    (p.definicion ? '<div class="pis-def">' + p.definicion.map(x => '<p>' + x + '</p>').join("") + '</div>' : '') +
    (p.parrafos || []).map(x => '<p>' + x + '</p>').join(""));
  pisBotones([p.comprobacion.boton || PIS_TXT.comprobar, true, () => pisIr("rescateTest")]);
}

function pisRescateTest(){
  const k = pisCiclo(), st = PIS.st, p = k.rescate[st.r];
  pisTest(p.comprobacion, 0.85, pisSiguienteCiclo, () => {
    st.intentos += 1;
    if (st.intentos >= (p.comprobacion.intentos || 2) && st.r < k.rescate.length - 1){ st.r += 1; st.intentos = 0; }
    pisIr("rescate");   // en el último paso no hay callejón sin salida: se vuelve a leer
  });
}

function pisFin(){
  const f = PIS.it.cierre, u = PIS.st.usadas;
  pisMarco(1, '<div class="pis-label">' + PIS_TXT.logrado + '</div><h3>' + f.titulo + '</h3>' + f.parrafos.map(x => '<p>' + x + '</p>').join("") +
    '<p class="pis-small">' + (u === 0 ? PIS_TXT.sinAyuda : PIS_TXT.usaste.replace("{n}", u)) + '</p>');
  const sig = f.siguiente && PISTAS.find(x => x.id === f.siguiente);
  pisBotones(sig ? [PIS_TXT.siguiente + ' ' + sig.titulo, true, () => loadPista(sig.id)] : null,
    [PIS_TXT.repetir, !sig, () => { PIS.st = pisNuevo(); pisSave(); pisPintar(); }]);
}

const PIS_VISTAS = { inicio: pisInicio, pista: pisPista, comprobacion: () => pisTest(pisCiclo().comprobacion, 0.6, pisSiguienteCiclo, () => pisIr("pista")),
  rescate: pisRescate, rescateTest: pisRescateTest, fin: pisFin };
function pisPintar(){ (PIS_VISTAS[PIS.st.vista] || pisInicio)(); }

if (pisBox() && typeof PISTAS !== "undefined") renderPisCatalogo();
