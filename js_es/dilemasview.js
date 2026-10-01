"use strict";
/* ===== Juego «Elige A o B» (dilemas) ===== depende de: dilemas.js (DILEMAS, DILEMAS_INTRO), store.js =====
   Cada dilema: situación → eliges A o B → escribes tu razón → «para pensar» (qué está en juego,
   otra salida, preguntas, dato) → giro «¿Y si…?» → mantienes o cambias de opinión.
   Guarda en este navegador lo elegido y la razón. «Modo clase»: contador de votos A/B para
   proyectar en el aula (también se guarda en este navegador). */

const DIL_KEY = "aula-dilemas", DIL_VOTES_KEY = "aula-dilemas-votos", DIL_CLASS_KEY = "aula-dilemas-clase";
/* grupos: rótulo = DILEMAS_INTRO[g].nombre (datos, se traduce con tm); los de ESO tienen respaldo aquí (ui). */
const DIL_GROUPS_FALLBACK = { tecno: "Tecnoéticos", clasicos: "Clásicos", dia: "Del día" };
const DIL_GROUPS = (function(){ const o = {}, I = typeof DILEMAS_INTRO !== "undefined" ? DILEMAS_INTRO : {};
  for (const k of Object.keys(I)) o[k] = DIL_GROUPS_FALLBACK[k] || I[k].nombre || k;
  for (const k of Object.keys(DIL_GROUPS_FALLBACK)) if (!o[k]) o[k] = DIL_GROUPS_FALLBACK[k];
  return o; })();
/* textos de interfaz: cada uno es una cadena entera (así los traduce web_i18n/ui/<lang>.json) */
const DIL_TXT = {
  decididos: "Decididos:", borrar: "borrar mis respuestas", azar: "Dilema al azar", azarSub: "uno que aún no hayas decidido",
  elegiste: "Elegiste", cambiaste: "cambiaste", sinDecidir: "Sin decidir", confirmBorrar: "¿Borrar tus respuestas de este grupo de dilemas en este navegador?",
  votosClase: "Votos de la clase", quitar: "Quitar un voto a", sumar: "Sumar un voto a", cero: "poner a cero",
  volver: "← Todos los dilemas", tuEleccion: "Tu elección:", queHarias: "¿Qué harías tú? Elige una opción.",
  porQue: "¿Por qué?", porQueSub: "Escribe tu razón en una o dos frases (se guarda en este navegador).", elijoPorque: "Elijo {X} porque…",
  verPensar: "Ver «para pensar» →", enJuego: "¿Qué está en juego?", otraSalida: "¿Hay otra salida?", unDato: "Un dato:",
  mantengo: "Mantengo mi elección", cambiaria: "Cambiaría de opinión", siguiente: "Siguiente:", tipo: "Tipo de dilema",
  /* Bachillerato (25-09): pregunta universal, escuelas, debate de época, reflexión PAU */
  preguntaFondo: "La pregunta de fondo", escuelas: "Las escuelas responden", elige: "elige", debateEpoca: "El debate de su época",
  verTeoria: "Ver en la teoría", pau: "Reflexión PAU (Ejercicio 2)",
  como: "Cómo se juega:", howto: "Abre un dilema, elige A o B, escribe por qué y mira «para pensar»: al final decides si mantienes tu elección o cambias."
};
const dil = { group: (Object.keys(DIL_GROUPS).find(g => typeof DILEMAS !== "undefined" && DILEMAS.some(d => d.grupo === g)) || "tecno"), cur: null, step: 0 };

function dilBox(){ return document.getElementById("dilbox"); }
function dilEsc(s){ return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function dilState(){ const s = store.get(DIL_KEY, {}); return s && typeof s === "object" ? s : {}; }
function dilSave(id, patch){ const s = dilState(); s[id] = Object.assign({}, s[id], patch, { ts: Date.now() }); store.set(DIL_KEY, s); }
function dilVotes(){ const v = store.get(DIL_VOTES_KEY, {}); return v && typeof v === "object" ? v : {}; }
function dilClassMode(){ return !!store.get(DIL_CLASS_KEY, false); }
function dilList(g){ return DILEMAS.filter(d => !g || d.grupo === g); }
function dilById(id){ return DILEMAS.find(d => d.id === id); }

/* ---------- portada: grupos y tarjetas ---------- */
function renderDilStart(){
  const box = dilBox(); if (!box) return;
  const st = dilState(), list = dilList(dil.group), intro = DILEMAS_INTRO[dil.group] || {};
  const done = list.filter(d => st[d.id] && st[d.id].choice).length;
  const groups = Object.keys(DIL_GROUPS).filter(g => dilList(g).length);
  box.innerHTML =
    '<p class="howto"><span><b>' + DIL_TXT.como + '</b> ' + DIL_TXT.howto + '</span></p>' +
    '<div class="dil-pick" role="group" aria-label="' + DIL_TXT.tipo + '">' +
      groups.map(g => '<button class="pbtn" data-g="' + g + '" aria-pressed="' + (g === dil.group) + '">' + DIL_GROUPS[g] + ' <span class="n">' + dilList(g).length + '</span></button>').join("") +
      '<label class="dil-classmode"><input type="checkbox" id="dilclass"' + (dilClassMode() ? " checked" : "") + '> Modo clase (contar votos)</label>' +
    '</div>' +
    '<div class="dil-intro"><h2>' + dilEsc(intro.titulo) + '</h2><p>' + dilEsc(intro.texto) + '</p>' +
      '<p class="dil-progress">' + DIL_TXT.decididos + ' <b>' + done + ' / ' + list.length + '</b>' + (done ? ' · <button class="linkbtn" id="dilreset">' + DIL_TXT.borrar + '</button>' : '') + '</p>' +
      (done === list.length && intro.cierre ? '<p class="dil-cierre">' + dilEsc(intro.cierre) + '</p>' : '') +
    '</div>' +
    '<button class="dil-play" id="dilrandom"><span aria-hidden="true">🎲</span> <b>' + DIL_TXT.azar + '</b> <span>' + DIL_TXT.azarSub + '</span></button>' +
    '<div class="dil-grid">' + list.map(d => {
      const s = st[d.id] || {};
      return '<button class="dil-card" data-id="' + d.id + '">' +
        '<span class="dil-emoji" aria-hidden="true">' + d.emoji + '</span>' +
        '<span class="dil-tag">' + dilEsc(d.etiqueta) + '</span>' +
        '<span class="dil-title">' + dilEsc(d.titulo) + '</span>' +
        (s.choice ? '<span class="dil-badge dil-' + s.choice.toLowerCase() + '">' + DIL_TXT.elegiste + ' ' + s.choice + (s.cambio ? ' · ' + DIL_TXT.cambiaste : '') + '</span>' : '<span class="dil-badge pend">' + DIL_TXT.sinDecidir + '</span>') +
      '</button>';
    }).join("") + '</div>';
  box.querySelectorAll("[data-g]").forEach(b => b.addEventListener("click", () => { dil.group = b.dataset.g; renderDilStart(); }));
  box.querySelectorAll(".dil-card").forEach(b => b.addEventListener("click", () => openDil(b.dataset.id)));
  box.querySelector("#dilrandom").addEventListener("click", () => {
    const pend = list.filter(d => !(st[d.id] && st[d.id].choice)), pool = pend.length ? pend : list;
    openDil(pool[Math.floor(Math.random() * pool.length)].id);
  });
  box.querySelector("#dilclass").addEventListener("change", e => store.set(DIL_CLASS_KEY, e.target.checked));
  const rs = box.querySelector("#dilreset");
  if (rs) rs.addEventListener("click", () => {
    if (!confirm(DIL_TXT.confirmBorrar)) return;
    const s = dilState(); list.forEach(d => delete s[d.id]); store.set(DIL_KEY, s); renderDilStart();
  });
}

/* ---------- un dilema ---------- */
function openDil(id){
  const d = dilById(id); if (!d) return;
  dil.cur = id; const s = dilState()[id] || {};
  dil.step = s.choice ? 2 : 0;
  renderDil();
  const v = document.getElementById("dilemas"); if (v) v.scrollIntoView({ block: "start" });
}

function dilVotesHtml(d){
  const v = dilVotes()[d.id] || { A: 0, B: 0 }, tot = (v.A || 0) + (v.B || 0);
  const pct = k => tot ? Math.round((v[k] || 0) * 100 / tot) : 0;
  return '<div class="dil-votes" aria-label="' + DIL_TXT.votosClase + '">' + ["A", "B"].map(k =>
    '<div class="dil-vrow dil-' + k.toLowerCase() + '"><b>' + k + '</b>' +
      '<button class="vbtn" data-v="' + k + '" data-d="-1" aria-label="' + DIL_TXT.quitar + ' ' + k + '">−</button>' +
      '<span class="vbar"><span style="width:' + pct(k) + '%"></span></span>' +
      '<span class="vnum">' + (v[k] || 0) + (tot ? ' · ' + pct(k) + ' %' : '') + '</span>' +
      '<button class="vbtn" data-v="' + k + '" data-d="1" aria-label="' + DIL_TXT.sumar + ' ' + k + '">+</button>' +
    '</div>').join("") + '<button class="linkbtn" id="dilvreset">' + DIL_TXT.cero + '</button></div>';
}

function renderDil(){
  const box = dilBox(), d = dilById(dil.cur); if (!box || !d) return;
  const s = dilState()[d.id] || {}, ch = s.choice;
  const opt = k => '<button class="dil-opt dil-' + k.toLowerCase() + (ch === k ? ' sel' : '') + (ch && ch !== k ? ' dim' : '') + '" data-opt="' + k + '"' + (ch ? ' aria-pressed="' + (ch === k) + '"' : '') + '>' +
    '<span class="dil-letter">' + k + '</span><span>' + dilEsc(d[k.toLowerCase()]) + '</span></button>';
  let html =
    '<button class="linkbtn dil-back" id="dilback">' + DIL_TXT.volver + '</button>' +
    '<article class="dil-one">' +
      '<header class="dil-head"><span class="dil-emoji big" aria-hidden="true">' + d.emoji + '</span><div>' +
        '<span class="dil-tag">' + dilEsc(DIL_GROUPS[d.grupo]) + ' · ' + dilEsc(d.etiqueta) + '</span>' +
        '<h2>' + dilEsc(d.titulo) + '</h2></div></header>' +
      '<div class="dil-sit"><h3>La situación</h3><p>' + dilEsc(d.situacion) + '</p></div>' +
      '<p class="dil-ask">' + (ch ? DIL_TXT.tuEleccion : DIL_TXT.queHarias) + '</p>' +
      '<div class="dil-opts">' + opt("A") + opt("B") + '</div>' +
      (dilClassMode() ? dilVotesHtml(d) : '');
  if (dil.step >= 1){
    html += '<div class="dil-why"><label for="dilrazon"><b>' + DIL_TXT.porQue + '</b> ' + DIL_TXT.porQueSub + '</label>' +
      '<textarea id="dilrazon" rows="3" placeholder="' + DIL_TXT.elijoPorque.replace("{X}", ch) + '">' + dilEsc(s.razon || "") + '</textarea>' +
      (dil.step === 1 ? '<button class="dil-next" id="dilthink">' + DIL_TXT.verPensar + '</button>' : '') + '</div>';
  }
  if (dil.step >= 2){
    html += '<div class="dil-think"><h3>Para pensar</h3>' +
      (d.pregunta ? '<p class="dil-preg"><b>' + DIL_TXT.preguntaFondo + '</b> ' + dilEsc(d.pregunta) + '</p>' : '') +
      '<p><b>' + DIL_TXT.enJuego + '</b> ' + dilEsc(d.enjuego) + '</p>' +
      (d.otra ? '<p class="dil-otra"><b>' + DIL_TXT.otraSalida + '</b> ' + dilEsc(d.otra) + '</p>' : '') +
      '<ol>' + (d.preguntas || []).map(q => '<li>' + dilEsc(q) + '</li>').join("") + '</ol>' +
      (d.dato ? '<p class="dil-dato"><b>' + DIL_TXT.unDato + '</b> ' + dilEsc(d.dato) + '</p>' : '') + '</div>';
    /* Bachillerato: las escuelas responden (con ficha de Ilustres) y el debate de su época (texto + unidad de teoría) */
    if (Array.isArray(d.escuelas) && d.escuelas.length){
      const I = typeof ILUSTRES !== "undefined" ? ILUSTRES : {};
      html += '<div class="dil-esc"><h3>' + DIL_TXT.escuelas + '</h3><ul>' + d.escuelas.map(e =>
        '<li class="dil-' + String(e.elige || '').toLowerCase() + '"><span class="dil-letter" title="' + DIL_TXT.elige + ' ' + dilEsc(e.elige) + '">' + dilEsc(e.elige) + '</span><div><b>' +
        (e.ilustre && I[e.ilustre] ? '<a href="#ilustres/' + e.ilustre + '">' + dilEsc(e.quien) + '</a>' : dilEsc(e.quien)) + '</b> ' + dilEsc(e.porque) + '</div></li>').join('') + '</ul></div>';
    }
    if (d.debate && d.debate.texto){
      const TH = typeof THEORY !== "undefined" ? THEORY : {}, u = d.debate.unidad;
      html += '<div class="dil-debate"><h3>' + DIL_TXT.debateEpoca + '</h3>' +
        (d.debate.epoca ? '<p class="dil-epoca">' + dilEsc(d.debate.epoca) + '</p>' : '') +
        '<blockquote>' + dilEsc(d.debate.texto) + '</blockquote>' +
        (d.debate.fuente ? '<p class="dil-fuente">' + dilEsc(d.debate.fuente) + '</p>' : '') +
        (u && TH[u] ? '<p class="dil-teo"><a href="#teoria/' + u + '">' + DIL_TXT.verTeoria + ': ' + dilEsc(TH[u].title) + ' →</a></p>' : '') + '</div>';
    }
    if (d.ysi){
      html += '<div class="dil-ysi"><h3>¿Y si…?</h3><p>' + dilEsc(d.ysi.replace(/^¿Y si…\?\s*/, "")) + '</p>' +
        '<div class="dil-keep"><button class="pbtn" data-keep="0" aria-pressed="' + (s.cambio === false) + '">' + DIL_TXT.mantengo + '</button>' +
        '<button class="pbtn" data-keep="1" aria-pressed="' + (s.cambio === true) + '">' + DIL_TXT.cambiaria + '</button></div></div>';
    }
    if (d.pau) html += '<div class="dil-pau"><h3>' + DIL_TXT.pau + '</h3><p>' + dilEsc(d.pau) + '</p></div>';
    const list = dilList(d.grupo), i = list.findIndex(x => x.id === d.id), nx = list[(i + 1) % list.length];
    html += '<div class="dil-foot"><button class="dil-next" id="dilnext">' + DIL_TXT.siguiente + ' ' + nx.emoji + ' ' + dilEsc(nx.titulo) + ' →</button></div>';
  }
  html += '</article>';
  box.innerHTML = html;

  box.querySelector("#dilback").addEventListener("click", renderDilStart);
  box.querySelectorAll("[data-opt]").forEach(b => b.addEventListener("click", () => {
    const k = b.dataset.opt, prev = (dilState()[d.id] || {}).choice;
    dilSave(d.id, prev && prev !== k ? { choice: k, cambio: true } : { choice: k });
    if (dil.step < 1) dil.step = 1;
    renderDil();
    const ta = document.getElementById("dilrazon"); if (ta && dil.step === 1){ try { ta.focus({ preventScroll: false }); } catch (e){} }
  }));
  const ta = box.querySelector("#dilrazon");
  if (ta) ta.addEventListener("input", () => dilSave(d.id, { razon: ta.value.slice(0, 600) }));
  const th = box.querySelector("#dilthink");
  if (th) th.addEventListener("click", () => { dil.step = 2; renderDil(); const t = document.querySelector(".dil-think"); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); });
  box.querySelectorAll("[data-keep]").forEach(b => b.addEventListener("click", () => { dilSave(d.id, { cambio: b.dataset.keep === "1" }); renderDil(); }));
  const nx = box.querySelector("#dilnext");
  if (nx){ const list = dilList(d.grupo), i = list.findIndex(x => x.id === d.id); nx.addEventListener("click", () => openDil(list[(i + 1) % list.length].id)); }
  box.querySelectorAll(".vbtn").forEach(b => b.addEventListener("click", () => {
    const all = dilVotes(), v = all[d.id] || { A: 0, B: 0 };
    v[b.dataset.v] = Math.max(0, (v[b.dataset.v] || 0) + (+b.dataset.d)); all[d.id] = v; store.set(DIL_VOTES_KEY, all);
    renderDil();
  }));
  const vr = box.querySelector("#dilvreset");
  if (vr) vr.addEventListener("click", () => { const all = dilVotes(); delete all[d.id]; store.set(DIL_VOTES_KEY, all); renderDil(); });
}

if (dilBox() && typeof DILEMAS !== "undefined") renderDilStart();
