"use strict";
/* ===== «Elige tu camino» ===== depende de: camino.js (CAMINOS), store.js =====
   Portada con las historias (y cuántos finales has descubierto de cada una) → escena con sus
   opciones → final con la idea de pensamiento crítico y el camino que has seguido. Los finales
   descubiertos se guardan en este navegador. */

const CAM_KEY = "aula-caminos";
/* textos de interfaz: cadenas enteras (así los traduce web_i18n/ui/<lang>.json) */
const CAM_TXT = {
  finales: "已发现的结局：", empezar: "开始", volver: "← 所有故事",
  tuCamino: "你的路", laIdea: "核心想法", otroCamino: "试试另一条路", otraHistoria: "换一个故事",
  todos: "你发现了这个故事的所有结局！", nuevo: "新结局！",
  como: "玩法：", howto: "选一个故事，读每一个场景并做出决定：每个决定都会改变结局。试着把所有结局都找出来。"
};
const cam = { story: null, node: null, path: [] };

function camBox(){ return document.getElementById("caminobox"); }
function camEsc(s){ return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function camFound(){ const f = store.get(CAM_KEY, {}); return f && typeof f === "object" ? f : {}; }
function camStory(id){ return CAMINOS.find(s => s.id === id); }

function renderCamStart(){
  const box = camBox(); if (!box) return;
  const found = camFound();
  box.innerHTML = '<p class="howto"><span><b>' + CAM_TXT.como + '</b> ' + CAM_TXT.howto + '</span></p>' +
    '<div class="cam-grid">' + CAMINOS.map(s => {
    const n = Object.keys(s.finales).length, got = (found[s.id] || []).length;
    return '<button class="cam-card" data-s="' + s.id + '"><span class="cam-emoji" aria-hidden="true">' + s.emoji + '</span>' +
      '<span class="cam-tag">' + camEsc(s.tema) + '</span><span class="cam-title">' + camEsc(s.titulo) + '</span>' +
      '<span class="cam-intro">' + camEsc(s.intro) + '</span>' +
      '<span class="cam-found">' + CAM_TXT.finales + ' <b>' + got + ' / ' + n + '</b></span></button>';
  }).join("") + '</div>';
  box.querySelectorAll("[data-s]").forEach(b => b.addEventListener("click", () => camStart(b.dataset.s)));
}

function camStart(id){
  const s = camStory(id); if (!s) return;
  cam.story = id; cam.node = s.start; cam.path = [];
  renderCamNode();
}

function renderCamNode(){
  const box = camBox(), s = camStory(cam.story); if (!box || !s) return;
  const head = '<button class="linkbtn cam-back" id="camback">' + CAM_TXT.volver + '</button>' +
    '<header class="cam-head"><span class="cam-emoji big" aria-hidden="true">' + s.emoji + '</span><div><span class="cam-tag">' + camEsc(s.tema) + '</span><h2>' + camEsc(s.titulo) + '</h2></div></header>';
  const fin = s.finales[cam.node];
  if (fin){
    const found = camFound(), list = found[s.id] || [], isNew = !list.includes(cam.node);
    if (isNew){ list.push(cam.node); found[s.id] = list; store.set(CAM_KEY, found); }
    const total = Object.keys(s.finales).length;
    box.innerHTML = head +
      '<article class="cam-end"><div class="cam-end-emoji" aria-hidden="true">' + fin.emoji + '</div>' +
        (isNew ? '<span class="cam-new">' + CAM_TXT.nuevo + '</span>' : '') +
        '<h3>' + camEsc(fin.titulo) + '</h3><p>' + camEsc(fin.texto) + '</p>' +
        '<div class="cam-idea"><b>' + CAM_TXT.laIdea + '</b><p>' + camEsc(fin.idea) + '</p></div>' +
        '<div class="cam-path"><b>' + CAM_TXT.tuCamino + '</b><ol>' + cam.path.map(p => '<li>' + camEsc(p) + '</li>').join("") + '</ol></div>' +
        '<p class="cam-found">' + (list.length === total ? CAM_TXT.todos : CAM_TXT.finales + ' <b>' + list.length + ' / ' + total + '</b>') + '</p>' +
        '<div class="cam-actions"><button class="cam-btn" id="camagain">' + CAM_TXT.otroCamino + '</button>' +
        '<button class="pbtn" id="camother">' + CAM_TXT.otraHistoria + '</button></div>' +
      '</article>';
    box.querySelector("#camagain").addEventListener("click", () => camStart(s.id));
    box.querySelector("#camother").addEventListener("click", renderCamStart);
  } else {
    const n = s.escenas[cam.node];
    box.innerHTML = head +
      '<article class="cam-scene"><p class="cam-text">' + camEsc(n.texto) + '</p>' +
      '<div class="cam-opts">' + n.opciones.map((o, i) => '<button class="cam-opt" data-i="' + i + '"><span class="cam-n">' + (i + 1) + '</span><span>' + camEsc(o.t) + '</span></button>').join("") + '</div></article>';
    box.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => {
      const o = n.opciones[+b.dataset.i]; cam.path.push(o.t); cam.node = o.to; renderCamNode();
      const v = document.getElementById("camino"); if (v) v.scrollIntoView({ block: "start" });
    }));
  }
  box.querySelector("#camback").addEventListener("click", renderCamStart);
}

if (camBox() && typeof CAMINOS !== "undefined") renderCamStart();
