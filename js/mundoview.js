"use strict";
/* ===== «Si la clase fuera el mundo» ===== depende de: mundo.js (MUNDO), store.js =====
   La clase (N alumnos, ajustable) representa a toda la humanidad. En cada tarjeta el alumnado
   ADIVINA cuántos de la clase estarían en esa situación y luego lo COMPRUEBA: se colorean las
   personas afectadas y aparece el dato. Puntos por acercarse; el tamaño de la clase se guarda. */

const MUNDO_N_KEY = "aula-mundo-n";
/* textos de interfaz: cadenas enteras (así los traduce web_i18n/ui/<lang>.json) */
const MUNDO_TXT = {
  tamano: "你们班的人数：", adivina: "你觉得有多少人？", comprobar: "检查答案",
  enClase: "在你们班：", ninguno: "不到 1 人：在你们班可能没有人，但在整个学校里就有了。",
  clavado: "完全正确！", cerca: "非常接近", lejos: "差得有点远", aciertos: "得分：", otraVez: "重新开始",
  paraPensar: "想一想", fuentes: "来源",
  como: "玩法：", howto: "先设定你们班有多少人，再拖动滑块猜一猜会有多少人遇到这种情况，然后点“检查答案”：猜得越接近，得分越高。"
};
const mundo = { n: 25, done: {}, score: 0 };

function mundoBox(){ return document.getElementById("mundobox"); }
function mundoEsc(s){ return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function mundoCount(p){ return Math.round(p * mundo.n); }
function mundoDots(k){
  let h = "";
  for (let i = 0; i < mundo.n; i++) h += '<span class="md' + (i < k ? " on" : "") + '" aria-hidden="true"></span>';
  return '<div class="mdots">' + h + '</div>';
}

function renderMundo(){
  const box = mundoBox(); if (!box || typeof MUNDO === "undefined") return;
  const saved = +store.get(MUNDO_N_KEY, 25); if (saved >= 5 && saved <= 40) mundo.n = saved;
  box.innerHTML =
    '<p class="howto"><span><b>' + MUNDO_TXT.como + '</b> ' + MUNDO_TXT.howto + '</span></p>' +
    '<p class="mundo-intro">' + mundoEsc(MUNDO.intro) + '</p>' +
    '<div class="mundo-bar"><label>' + MUNDO_TXT.tamano + ' <input type="number" id="mundon" min="5" max="40" value="' + mundo.n + '"></label>' +
      '<span class="mundo-score">' + MUNDO_TXT.aciertos + ' <b id="mundoscore">' + mundo.score + '</b></span>' +
      '<button class="linkbtn" id="mundoreset">' + MUNDO_TXT.otraVez + '</button></div>' +
    '<div class="mundo-grid">' + MUNDO.items.map(it => {
      const d = mundo.done[it.id];
      return '<article class="mundo-card' + (d ? " done" : "") + '" data-id="' + it.id + '">' +
        '<h3><span class="me" aria-hidden="true">' + it.emoji + '</span> ' + mundoEsc(it.t) + '</h3>' +
        (d ? mundoResult(it, d.guess) :
          '<div class="mundo-guess"><label>' + MUNDO_TXT.adivina + ' <input type="range" min="0" max="' + mundo.n + '" value="' + Math.round(mundo.n / 2) + '" data-g="' + it.id + '"> <span class="mout"><output>' + Math.round(mundo.n / 2) + '</output> / ' + mundo.n + '</span></label>' +
          '<button class="mundo-check" data-c="' + it.id + '">' + MUNDO_TXT.comprobar + '</button></div>') +
      '</article>';
    }).join("") + '</div>' +
    '<div class="mundo-think"><h3>' + MUNDO_TXT.paraPensar + '</h3><ol>' + MUNDO.preguntas.map(q => '<li>' + mundoEsc(q) + '</li>').join("") + '</ol>' +
    '<p class="mundo-nota"><b>' + MUNDO_TXT.fuentes + ':</b> ' + mundoEsc(MUNDO.nota) + '</p></div>';

  box.querySelector("#mundon").addEventListener("change", e => {
    const v = Math.max(5, Math.min(40, parseInt(e.target.value, 10) || 25));
    mundo.n = v; store.set(MUNDO_N_KEY, v); mundo.done = {}; mundo.score = 0; renderMundo();
  });
  box.querySelector("#mundoreset").addEventListener("click", () => { mundo.done = {}; mundo.score = 0; renderMundo(); });
  box.querySelectorAll("input[data-g]").forEach(r => r.addEventListener("input", () => { r.parentNode.querySelector("output").textContent = r.value; }));
  box.querySelectorAll("[data-c]").forEach(b => b.addEventListener("click", () => {
    const it = MUNDO.items.find(x => x.id === b.dataset.c), guess = +box.querySelector('input[data-g="' + it.id + '"]').value;
    const real = mundoCount(it.p), diff = Math.abs(guess - real);
    mundo.score += diff === 0 ? 3 : diff <= Math.max(1, Math.round(mundo.n * 0.1)) ? 1 : 0;
    mundo.done[it.id] = { guess };
    const card = b.closest(".mundo-card"); card.classList.add("done");
    card.querySelector(".mundo-guess").outerHTML = mundoResult(it, guess);
    box.querySelector("#mundoscore").textContent = mundo.score;
  }));
}

function mundoResult(it, guess){
  const real = mundoCount(it.p), diff = Math.abs(guess - real);
  const verdict = diff === 0 ? MUNDO_TXT.clavado : diff <= Math.max(1, Math.round(mundo.n * 0.1)) ? MUNDO_TXT.cerca : MUNDO_TXT.lejos;
  return '<div class="mundo-res">' + mundoDots(real) +
    '<p class="mundo-num">' + MUNDO_TXT.enClase + ' <b>' + real + ' / ' + mundo.n + '</b> <span class="pct">(' + Math.round(it.p * 1000) / 10 + ' %)</span>' +
    ' · <span class="verd">' + verdict + ' (' + guess + ')</span></p>' +
    (real === 0 ? '<p class="mundo-dato">' + MUNDO_TXT.ninguno + '</p>' : '') +
    '<p class="mundo-dato">' + mundoEsc(it.dato) + '</p></div>';
}

if (mundoBox()) renderMundo();
