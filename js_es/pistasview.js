"use strict";
/* ===== «Pistas» (HF 2.º): itinerarios de pistas progresivas tipo Universal Hint System =====
   depende de: pistas_uhs.js (PISTAS). Motor derivado de editables/pistas_uhs (prototipo en
   fuentes fijas/uhs_kant). Cada itinerario: ciclos de pregunta → pistas (de vagas a casi la
   respuesta) → comprobación; si fallas, siguiente pista; si se acaban, rescate (texto y después
   definición, cada uno con su comprobación). El progreso se guarda en este navegador
   (clave aula-pistas-<id>). Enlace profundo: #pistas/<id>. */

/* textos de interfaz: cadenas enteras (así los traduce web_i18n/ui/<lang>.json) */
const PIS_TXT = {
  elige: "Elige una pregunta. Intenta responder sola o solo; pide pistas de una en una y detente en cuanto puedas responder por tu cuenta.",
  sinEmpezar: "Sin empezar", enCurso: "En curso", hecho: "Completado",
  volver: "← Todas las preguntas", reiniciar: "Empezar de nuevo",
  puedo: "Creo que puedo responder", necesito: "Necesito una pista", yaPuedo: "Ya puedo responder", otra: "Otra pista",
  leer: "Necesito leer un texto", comprobar: "Comprobar si lo he entendido",
  soloLoQuePidas: "La guía solo revelará lo que pidas.", detente: "Detente aquí si ya puedes reconstruir la respuesta.",
  pistaDe: "Pista {n} de {t}", quedaUna: "Queda 1 pista.", quedan: "Quedan {n} pistas.", ninguna: "No quedan más pistas.",
  comprobacion: "Comprobación", pregunta: "Pregunta", logrado: "Comprensión alcanzada", completado: "Itinerario completado",
  sinAyuda: "Lo has resuelto sin pistas.", usaste: "Pistas usadas: {n}.", repetir: "Recorrerlo de nuevo", siguiente: "Siguiente pregunta:"
};

const PIS = { it: null, st: null };
const pisBox = () => document.getElementById("pistasbox");
const pisKey = id => "aula-pistas-" + id;
const pisNuevo = () => ({ c: 0, vista: "inicio", h: 0, r: 0, intentos: 0, usadas: 0 });

function pisLoad(id){
  try { const s = JSON.parse(localStorage.getItem(pisKey(id))); if (s && typeof s.c === "number") return Object.assign(pisNuevo(), s); } catch (e){}
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

function pisSiguienteCiclo(){
  const st = PIS.st; st.c += 1; st.h = 0; st.r = 0; st.intentos = 0;
  pisIr(st.c >= PIS.it.ciclos.length ? "fin" : "inicio");
}
/* pedir pista o fallar la comprobación: siguiente pista; si no quedan, rescate */
function pisAvanzar(){
  const k = pisCiclo(), st = PIS.st;
  if (st.h < k.pistas.length){ st.h += 1; st.usadas += 1; pisIr("pista"); }
  else if (k.rescate && k.rescate.length){ st.r = 0; st.intentos = 0; pisIr("rescate"); }
  else pisIr("pista");
}

function pisMarco(dentro, cuerpo){
  const it = PIS.it, n = it.ciclos.length, st = PIS.st;
  const pct = Math.min(100, Math.round(((st.c + Math.min(dentro, 1)) / n) * 100));
  const k = pisCiclo();
  pisBox().innerHTML = '<div class="pis-top"><button class="linkbtn" id="pisback">' + PIS_TXT.volver + '</button>' +
    '<button class="linkbtn" id="pisreset">' + PIS_TXT.reiniciar + '</button></div>' +
    '<h2 class="pis-h">' + it.titulo + '</h2>' +
    '<div class="pis-prog"><div class="pis-prog-head"><span>' + (k ? k.fase : PIS_TXT.completado) + '</span><span>' + pct + ' %</span></div>' +
    '<div class="pis-track"><div class="pis-bar" style="width:' + pct + '%"></div></div></div>' +
    '<div class="pis-card" aria-live="polite">' + cuerpo + '<div class="pis-actions"></div></div>';
  pisBox().querySelector("#pisback").addEventListener("click", renderPisCatalogo);
  pisBox().querySelector("#pisreset").addEventListener("click", () => { PIS.st = pisNuevo(); pisSave(); pisPintar(); });
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
  pisBotones([PIS_TXT.puedo, true, () => pisIr("comprobacion")], [PIS_TXT.necesito, false, pisAvanzar]);
}

function pisPista(){
  const k = pisCiclo(), st = PIS.st, n = k.pistas.length, quedan = n - st.h;
  pisMarco(0.1 + 0.45 * (st.h / n), '<div class="pis-label">' + PIS_TXT.pistaDe.replace("{n}", st.h).replace("{t}", n) + '</div><h3>' + k.pregunta + '</h3>' +
    k.pistas.slice(0, st.h).map((p, i) => '<div class="pis-hint' + (i < st.h - 1 ? " old" : "") + '">' + p + '</div>').join("") +
    '<p>' + PIS_TXT.detente + '</p><p class="pis-small">' + (quedan > 1 ? PIS_TXT.quedan.replace("{n}", quedan) : quedan === 1 ? PIS_TXT.quedaUna : PIS_TXT.ninguna) + '</p>');
  const resc = k.rescate && k.rescate.length;
  pisBotones([PIS_TXT.yaPuedo, true, () => pisIr("comprobacion")],
    quedan > 0 ? [PIS_TXT.otra, false, pisAvanzar] : resc ? [k.rescate[0].boton || PIS_TXT.leer, false, pisAvanzar] : null);
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

const PIS_VISTAS = { inicio: pisInicio, pista: pisPista, comprobacion: () => pisTest(pisCiclo().comprobacion, 0.6, pisSiguienteCiclo, pisAvanzar),
  rescate: pisRescate, rescateTest: pisRescateTest, fin: pisFin };
function pisPintar(){ (PIS_VISTAS[PIS.st.vista] || pisInicio)(); }

if (pisBox() && typeof PISTAS !== "undefined") renderPisCatalogo();
