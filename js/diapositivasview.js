"use strict";
/* ===== Vista de diapositivas (índice) ===== depende de: diapositivas.js =====
   Reutiliza el mismo estilo que Recursos (filtro por bloque + tarjetas .mcard). */

let diaposBlock = "A";  /* bloque concreto por defecto, nunca «Todos los bloques» */
const DIAPOS_BLOCKS = { A: "板块 A · 古代", B: "板块 B · 中世纪与近代", C: "板块 C · 当代" };

function diaposBlockOf(t){
  if (t >= 1 && t <= 10) return "A";
  if (t >= 11 && t <= 17) return "B";
  if (t >= 18 && t <= 27) return "C";
  return null;
}

function renderDiaposFilter(){
  const box = document.getElementById("diaposfilter");
  if (!box) return;
  const btns = ["all", "A", "B", "C"].map(b =>
    '<button class="fbtn" data-block="' + b + '" aria-pressed="' + (b === diaposBlock) + '">' +
    (b === "all" ? "所有板块" : DIAPOS_BLOCKS[b]) + '</button>'
  ).join("");
  box.innerHTML = '<div class="fgroup"><span class="flabel">板块</span>' + btns + '</div>';
  box.querySelectorAll("[data-block]").forEach(b => b.addEventListener("click", () => {
    diaposBlock = b.dataset.block;
    renderDiaposFilter();
    renderDiaposList();
  }));
}

function renderDiaposList(){
  const box = document.getElementById("diaposlist");
  if (!box) return;
  const temas = DIAPOS_TEMAS.filter(e => diaposBlock === "all" || diaposBlockOf(e.t) === diaposBlock);
  box.innerHTML = temas.map(e => {
    const decks = e.decks.map(x => '<li class="m-v">📊 ' + x + '</li>').join("");
    return '<article class="mcard"><h3>主题 ' + e.t + '</h3><ul class="mlist">' + decks + '</ul></article>';
  }).join("");
}

function renderDiaposExtra(){
  const box = document.getElementById("diaposextra");
  if (box) box.innerHTML = DIAPOS_EXTRA.map(x => '<li class="m-v">📊 ' + x + '</li>').join("");
}

renderDiaposFilter();
renderDiaposList();
renderDiaposExtra();
