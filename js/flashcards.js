"use strict";
/* ===== Tarjetas (flashcards) ===== depende de: store.js, data.js ===== */

let deckKey = Object.keys(DECKS)[0];
let order = [];
let pos = 0;
let flipped = false;
let deckSubject = "all";
let deckBlock = "all";
let deckTipo = "all";   // (29-09) «conceptos» | «frases» (barajas con tipo:"frases")
const known = store.get("aula-known", {});

const cardEl = document.getElementById("card");

const DECK_SUBJECTS = { fil: "高一哲学", hf: "哲学史", ipc: "批判性思维" };
const DECK_BLOCKS = { A: "板块 A · 古代", B: "板块 B · 中世纪与近代", C: "板块 C · 当代" };

const DECK_TIPOS = { conceptos: "概念", frases: "句子" };
const deckEsFrases = d => d.tipo === "frases";
const deckOk = d => deckTipo === "all" || (deckTipo === "frases") === deckEsFrases(d);
/* primera baraja que cumple materia, bloque y tipo (la usa también navctx.js) */
function deckFirstKey(sub, block){
  return Object.keys(DECKS).find(k => { const d = DECKS[k];
    return (sub === "all" || d.subject === sub) && (!block || block === "all" || (d.block === block && !(window.Epocas && window.Epocas.soloTodos("tarjetas", k)))) && deckOk(d); });
}
function setDeckTipo(t){
  deckTipo = DECK_TIPOS[t] ? t : "all";
  if (deckTipo !== "all") deckBlock = "all";          // al cambiar de tipo se ven todos sus bloques
  if (DECKS[deckKey] && !deckOk(DECKS[deckKey])){ const k = deckFirstKey(deckSubject, deckBlock); if (k) loadDeck(k); }
  if (document.getElementById("deckfilter")){ renderDeckFilter(); renderDeckChips(); }
}
function renderDeckFilter(){
  const box = document.getElementById("deckfilter");
  const hayFrases = Object.values(DECKS).some(deckEsFrases);
  const tipoBtns = hayFrases ? ["all", "conceptos", "frases"].map(t =>
    '<button class="fbtn" data-tipo="' + t + '" aria-pressed="' + (t === deckTipo) + '">' +
    (t === "all" ? "全部" : DECK_TIPOS[t]) + '</button>').join("") : "";
  const subjBtns = ["all", "fil", "hf", "ipc"].map(s =>
    '<button class="fbtn" data-subj="' + s + '" aria-pressed="' + (s === deckSubject) + '">' +
    (s === "all" ? "全部" : DECK_SUBJECTS[s]) + '</button>'
  ).join("");
  let blockBtns = "";
  if (deckSubject === "hf"){
    blockBtns = ["all", "A", "B", "C"].map(b =>
      '<button class="fbtn" data-block="' + b + '" aria-pressed="' + (b === deckBlock) + '">' +
      (b === "all" ? "所有板块" : DECK_BLOCKS[b]) + '</button>'
    ).join("");
  }
  box.innerHTML = (tipoBtns ? '<div class="fgroup"><span class="flabel">类型</span>' + tipoBtns + '</div>' : '') +
    '<div class="fgroup"><span class="flabel">科目</span>' + subjBtns + '</div>' +
    (blockBtns ? '<div class="fgroup"><span class="flabel">板块</span>' + blockBtns + '</div>' : '');
  box.querySelectorAll("[data-subj]").forEach(b => b.addEventListener("click", () => {
    deckSubject = b.dataset.subj;
    if (deckSubject !== "hf") deckBlock = "all";
    renderDeckFilter();
    renderDeckChips();
  }));
  box.querySelectorAll("[data-tipo]").forEach(b => b.addEventListener("click", () => setDeckTipo(b.dataset.tipo)));
  box.querySelectorAll("[data-block]").forEach(b => b.addEventListener("click", () => {
    deckBlock = b.dataset.block;
    renderDeckFilter();
    renderDeckChips();
  }));
}

function renderDeckChips(){
  const box = document.getElementById("deckchips");
  const entries = Object.entries(DECKS).filter(([k, d]) => {
    if (deckSubject !== "all" && d.subject !== deckSubject) return false;
    if (deckSubject === "hf" && deckBlock !== "all" && d.block !== deckBlock) return false;
    if (deckBlock !== "all" && window.Epocas && window.Epocas.soloTodos("tarjetas", k)) return false;   // (30-09) temas 1-2 de HF: solo con «Todos los bloques» (epocas.js)
    if (!deckOk(d)) return false;
    return true;
  });
  box.innerHTML = entries
    .map(([k, d]) => `<button class="chip" data-deck="${k}" aria-pressed="${k === deckKey}">${d.name}</button>`).join("");
  box.querySelectorAll("[data-deck]").forEach(b => b.addEventListener("click", () => loadDeck(b.dataset.deck)));
}

function loadDeck(k){
  deckKey = k;
  if (deckBlock !== "all" && window.Epocas && window.Epocas.soloTodos("tarjetas", k)){ deckBlock = "all"; if (document.getElementById("deckfilter")) renderDeckFilter(); }
  order = DECKS[k].cards.map((_, i) => i);
  pos = 0; flipped = false;
  renderDeckChips();
  drawCard();
}

function drawCard(){
  const deck = DECKS[deckKey], idx = order[pos], c = deck.cards[idx];
  document.getElementById("deckname").textContent = deck.name;
  document.getElementById("fccount").textContent = (pos + 1) + " / " + deck.cards.length;
  const em = document.getElementById("fcemoji"), img = typeof TARJETAS_IMG !== "undefined" && TARJETAS_IMG[deckKey + "|" + c[1]];
  em.classList.toggle("has-img", !!img);
  if (img) em.innerHTML = '<img src="media/tarjetas/' + img + '.webp" alt="" decoding="async">';
  else em.textContent = c[0];
  document.getElementById("fcfront").textContent = c[1];
  document.getElementById("fcback").textContent = c[2];
  flipped = false; cardEl.classList.remove("flipped");
  const kk = deckKey + ":" + idx, on = !!known[kk];
  const kb = document.getElementById("fcknown");
  kb.classList.toggle("on", on); kb.textContent = on ? "✓ 我会了" : "我会了";
  const learned = order.filter(i => known[deckKey + ":" + i]).length;
  document.getElementById("fcprog").style.width = (learned / deck.cards.length * 100) + "%";
}

function flip(){ flipped = !flipped; cardEl.classList.toggle("flipped", flipped); }
function move(d){ const n = DECKS[deckKey].cards.length; pos = (pos + d + n) % n; drawCard(); }

cardEl.addEventListener("click", flip);
document.getElementById("fcnext").addEventListener("click", () => move(1));
document.getElementById("fcprev").addEventListener("click", () => move(-1));
document.getElementById("fcshuf").addEventListener("click", () => {
  for (let i = order.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  pos = 0; drawCard();
});
document.getElementById("fcknown").addEventListener("click", () => {
  const kk = deckKey + ":" + order[pos];
  known[kk] = !known[kk]; if (!known[kk]) delete known[kk];
  store.set("aula-known", known); drawCard();
});
document.addEventListener("keydown", e => {
  if (!document.getElementById("tarjetas").classList.contains("active")) return;
  if (e.code === "Space"){ e.preventDefault(); flip(); }
  else if (e.key === "ArrowRight") move(1);
  else if (e.key === "ArrowLeft") move(-1);
});

renderDeckFilter();
loadDeck(deckKey);
