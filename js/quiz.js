"use strict";
/* ===== Cuestionarios ===== depende de: store.js, data.js ===== */

let quizKey = Object.keys(QUIZZES)[0];
let qpos = 0, qscore = 0, qdone = false;
let quizSubject = "all";
let quizBlock = "all";
let quizTema = "all";
let quizPool = [];          // items en juego (todo el cuestionario o solo los fallados)
let quizOrder = [];         // orden barajado de índices sobre quizPool
let quizOptOrder = [];      // orden barajado de las opciones de la pregunta actual
let quizFailed = [];        // items fallados en esta partida (para «Repasar las que fallé»)
let quizReviewing = false;  // true si repasamos solo los fallos (no toca la mejor marca)

function quizShuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

const QUIZ_SUBJECTS = { fil: "高一哲学", hf: "哲学史", ipc: "批判性思维" };
const QUIZ_BLOCKS = { A: "板块 A · 古代", B: "板块 B · 中世纪与近代", C: "板块 C · 当代" };

/* Clasificador de temas: temas de cada materia (en orden) y tema de cada cuestionario.
   Al añadir un cuestionario a QUIZZES, añadir aquí su clave; si falta, sale en «Otros». */
const QUIZ_TEMAS = {
  fil: { T1: "什么是哲学？", T2: "El ser humano", T3: "Conocimiento y verdad", T4: "Lógica y argumentación", T5: "伦理", T6: "La vida en sociedad: política", T7: "Estética: ¿qué es el arte?" },
  hf: { T1: "Historicidad y universalidad", T2: "Los métodos de la filosofía", T3: "Del mito al logos", T4: "Los presocráticos", T5: "Sofistas, Sócrates y Aspasia", T6: "Platón: Ideas y República", T7: "Antropología clásica", T8: "Ética clásica", T9: "Política clásica", T10: "El helenismo",
    T11: "Filosofía medieval y universales", T12: "Fe y razón", T13: "Renacimiento y revolución científica", T14: "Racionalismo y empirismo", T15: "Dualismo y materialismo", T16: "Sociedad y poder: el contrato social", T17: "Utilitarismo y liberalismo",
    T18: "La Ilustración", T19: "Kant: crítica y metafísica", T20: "Éticas de la felicidad y del deber", T21: "Los filósofos de la sospecha", T22: "Crítica del capitalismo: de Marx a Rawls", T23: "Nietzsche y la posmodernidad", T24: "Filosofía analítica", T25: "El existencialismo", T26: "El feminismo", T27: "Retos del siglo XXI" },
  ipc: { pensar: "自己思考", argumentar: "好好论证", falacias: "谬误与谣言", sesgos: "偏见", dialogo: "对话", medios: "媒体与广告", grupo: "群体", huella: "我在地球上的足迹" }
};
const QUIZ_TEMA = {
  "fil-t1": "T1", "fil-metodo-q": "T1", "fil-ramas-q": "T1", "fil-t1-banco": "T1", "fil-presocraticos-q": "T1", "fil-presocraticos-banco": "T1",
  "fil-t2": "T2", "fil-mente-q": "T2", "fil-t2-banco": "T2", "fil-t3": "T3", "fil-ciencia-q": "T3", "fil-t3-banco": "T3",
  "fil-logica-q": "T4", "fil-t4-banco": "T4", "fil-etica-q": "T5", "fil-t5-banco": "T5", "fil-helenismo-q": "T5", "fil-helenismo-banco": "T5",
  "fil-politica-q": "T6", "fil-t6-banco": "T6", "fil-t7": "T7", "fil-t7-banco": "T7",
  "hf-t1-historicidad": "T1", "hf-a01-banco": "T1", "ltfh-A1": "T1", "hf-t2-metodos": "T2", "hf-a02-banco": "T2", "hf-a03-banco": "T3",
  "preso": "T4", "hf-a04-banco": "T4", "hf25": "T5", "hf-a05-banco": "T5", "hf-a06-banco": "T6", "ltfh-AP": "T6", "ltfh-A6": "T6",
  "plat-antro": "T7", "hf-a07-banco": "T7", "ltfh-AA": "T7", "hf-a08-banco": "T8", "ltfh-A8": "T8", "hf-a09-banco": "T9", "ltfh-A9": "T9", "hf-a10-banco": "T10", "ltfh-A10": "T10",
  "hf-b11-banco": "T11", "ltfh-BHvB": "T11", "ltfh-BOC": "T11", "hf-t12-fe-razon": "T12", "hf-b12-banco": "T12", "ltfh-B1": "T12", "ltfh-BAV": "T12", "ltfh-BT": "T12",
  "hf-b13-banco": "T13", "ltfh-B3": "T13", "hf-b14-banco": "T14", "makro-descartes": "T14", "ltfh-B4": "T14", "ltfh-BD": "T14", "ltfh-BL": "T14", "ltfh-BH": "T14",
  "hf-b15-banco": "T15", "ltfh-B5": "T15", "ltfh-BS": "T15", "hf-b16-banco": "T16", "ltfh-B6": "T16", "hf-b17-banco": "T17", "ltfh-B7": "T17",
  "hf-c18-banco": "T18", "ltfh-C1": "T18", "hf-c19-banco": "T19", "ltfh-CK": "T19", "hf-t20-etica-deber": "T20", "hf-c20-banco": "T20",
  "hf-c21-banco": "T21", "ltfh-C4": "T21", "ltfh-CXIX": "T21", "ltfh-CM": "T21", "ltfh-CN": "T21", "hf-c22-banco": "T22", "ltfh-C5A": "T22",
  "hf-c23-banco": "T23", "ltfh-C6": "T23", "hf-c24-banco": "T24", "ltfh-C7": "T24", "hf-c25-banco": "T25", "ltfh-C8": "T25",
  "hf-c26-banco": "T26", "ltfh-CdB": "T26", "ltfh-C9": "T26", "hf-c27-banco": "T27", "ltfh-C10": "T27", "ltfh-C5B": "T27",
  "ipc-pensar-banco": "pensar", "ipc-hecho-q": "pensar", "ipc-argumentar-banco": "argumentar", "falacias": "falacias", "ipc-falacias-banco": "falacias", "ipc-bulos-q": "falacias",
  "ipc-sesgos-q": "sesgos", "ipc-sesgos-banco": "sesgos", "ipc-dialogo-banco": "dialogo", "ipc-medios-q": "medios", "ipc-medios-banco": "medios",
  "ipc-grupo-banco": "grupo", "ipc-huella-q": "huella", "ipc-huella-banco": "huella", "ipc-moda-q": "huella"
};
/* Orden dentro de un tema: banco ampliado, cuestionario breve, libro. */
function quizTipo(k){ return /-banco$/.test(k) ? 0 : /^ltfh-/.test(k) ? 2 : 1; }
function quizTemaDe(k){ const m = QUIZ_TEMAS[QUIZZES[k].subject] || {}; return m[QUIZ_TEMA[k]] ? QUIZ_TEMA[k] : "otros"; }
function quizEnFiltro(k, q, conTema){
  if (quizSubject !== "all" && q.subject !== quizSubject) return false;
  if (quizSubject === "hf" && quizBlock !== "all" && q.block !== quizBlock) return false;
  if (quizBlock !== "all" && window.Epocas && window.Epocas.soloTodos("cuestionarios", k)) return false;   // (30-09) temas 1-2 de HF: solo con «Todos los bloques» (epocas.js)
  if (conTema && quizTema !== "all" && quizTemaDe(k) !== quizTema) return false;
  return true;
}
/* Temas con algún cuestionario en la materia (y el bloque) elegidos, en el orden de QUIZ_TEMAS. */
function quizTemasVisibles(){
  const hay = new Set(Object.entries(QUIZZES).filter(([k, q]) => quizEnFiltro(k, q, false)).map(([k]) => quizTemaDe(k)));
  return Object.keys(QUIZ_TEMAS[quizSubject] || {}).concat("otros").filter(t => hay.has(t));
}
function quizTemaEtq(t){ return t === "otros" ? "其他" : (QUIZ_TEMAS[quizSubject] || {})[t] || t; }
const quizTemaNum = t => /^T\d+$/.test(t);

function renderQuizFilter(){
  const box = document.getElementById("quizfilter");
  const subjBtns = ["all", "fil", "hf", "ipc"].map(s =>
    '<button class="fbtn" data-subj="' + s + '" aria-pressed="' + (s === quizSubject) + '">' +
    (s === "all" ? "全部" : QUIZ_SUBJECTS[s]) + '</button>'
  ).join("");
  let blockBtns = "";
  if (quizSubject === "hf"){
    blockBtns = ["all", "A", "B", "C"].map(b =>
      '<button class="fbtn" data-block="' + b + '" aria-pressed="' + (b === quizBlock) + '">' +
      (b === "all" ? "所有板块" : QUIZ_BLOCKS[b]) + '</button>'
    ).join("");
  }
  let temaBtns = "";
  if (quizSubject !== "all"){
    const temas = quizTemasVisibles();
    if (!temas.includes(quizTema)) quizTema = "all";
    temaBtns = ["all"].concat(temas).map(t =>
      '<button class="fbtn" data-tema="' + t + '" aria-pressed="' + (t === quizTema) + '" title="' + (t === "all" ? "所有主题" : quizTemaEtq(t)) + '">' +
      (t === "all" ? "全部" : quizTemaNum(t) ? t : quizTemaEtq(t)) + '</button>'
    ).join("");
  }
  box.innerHTML = '<div class="fgroup"><span class="flabel">科目</span>' + subjBtns + '</div>' +
    (blockBtns ? '<div class="fgroup"><span class="flabel">板块</span>' + blockBtns + '</div>' : '') +
    (temaBtns ? '<div class="fgroup"><span class="flabel">主题</span>' + temaBtns + '</div>' : '');
  box.querySelectorAll("[data-subj]").forEach(b => b.addEventListener("click", () => {
    quizSubject = b.dataset.subj;
    if (quizSubject !== "hf") quizBlock = "all";
    quizTema = "all";
    renderQuizFilter();
    renderQuizChips();
  }));
  box.querySelectorAll("[data-block]").forEach(b => b.addEventListener("click", () => {
    quizBlock = b.dataset.block;
    quizTema = "all";
    renderQuizFilter();
    renderQuizChips();
  }));
  box.querySelectorAll("[data-tema]").forEach(b => b.addEventListener("click", () => {
    quizTema = b.dataset.tema;
    renderQuizFilter();
    renderQuizChips();
  }));
}

function renderQuizChips(){
  const box = document.getElementById("quizchips");
  const entries = Object.entries(QUIZZES).filter(([k, q]) => quizEnFiltro(k, q, true));
  const chip = ([k, q]) => `<button class="chip" data-quiz="${k}" aria-pressed="${k === quizKey}">${q.name}</button>`;
  if (quizSubject === "all") box.innerHTML = entries.map(chip).join("");
  else {
    /* agrupados por tema, con su título; dentro de cada tema: banco ampliado, breve, libro */
    box.innerHTML = quizTemasVisibles().filter(t => quizTema === "all" || t === quizTema).map(t => {
      const del = entries.filter(([k]) => quizTemaDe(k) === t).sort((a, b) => quizTipo(a[0]) - quizTipo(b[0]));
      return del.length ? '<div class="quiz-tema"><span class="flabel">' + (quizTemaNum(t) ? t + " · " : "") + quizTemaEtq(t) + '</span><div class="quiz-tema-chips">' + del.map(chip).join("") + '</div></div>' : "";
    }).join("");
  }
  box.querySelectorAll("[data-quiz]").forEach(b => b.addEventListener("click", () => loadQuiz(b.dataset.quiz)));
}

function loadQuiz(k){ quizKey = k;
  if (quizBlock !== "all" && window.Epocas && window.Epocas.soloTodos("cuestionarios", k)){ quizBlock = "all"; if (document.getElementById("quizfilter")) renderQuizFilter(); } quizReviewing = false; quizPool = QUIZZES[k].items; renderQuizChips(); startQuizRun(); }
function startQuizRun(){ qpos = 0; qscore = 0; qdone = false; quizFailed = []; quizOrder = quizShuffle(quizPool.map((_, i) => i)); drawQuiz(); }

function drawQuiz(){
  const quiz = QUIZZES[quizKey], box = document.getElementById("quizbox");

  if (qdone){
    const total = quizPool.length;
    let bestLine = "";
    if (!quizReviewing){
      const bestMap = store.get("aula-best", {});
      const prevBest = bestMap[quizKey] || 0;
      if (qscore > prevBest){ bestMap[quizKey] = qscore; store.set("aula-best", bestMap); }
      bestLine = `<p class="best">你在这个浏览器里的最好成绩：${Math.max(prevBest, qscore)} / ${total}</p>`;
    }
    const reviewBtn = quizFailed.length
      ? `<button class="btn" id="qreview">重做答错的题 (${quizFailed.length})</button>` : "";
    box.innerHTML = `<div class="q-result"><p class="eyebrow">${quizReviewing ? "复习" : "结果"}</p>
      <div class="big">${qscore} / ${total}</div>
      ${bestLine}
      <div style="margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn" id="qretry">重做</button>${reviewBtn}</div></div>`;
    document.getElementById("qretry").addEventListener("click", () => loadQuiz(quizKey));
    const rv = document.getElementById("qreview");
    if (rv) rv.addEventListener("click", () => { const fails = quizFailed.slice(); quizReviewing = true; quizPool = fails; startQuizRun(); });
    return;
  }

  const total = quizPool.length;
  const it = quizPool[quizOrder[qpos]];
  quizOptOrder = quizShuffle(it.o.map((_, i) => i));
  box.innerHTML = `<div class="q-top"><span>第 ${qpos + 1} 题，共 ${total} 题</span><span class="score">答对：${qscore}</span></div>
    <div class="q-card">
      <div class="q-num">${quiz.name}</div>
      <p class="q-text">${it.q}</p>
      <div class="opts" id="opts">${quizOptOrder.map((orig, disp) => `<button class="opt" data-i="${orig}"><span class="k">${"ABCD"[disp]}</span><span>${it.o[orig]}</span></button>`).join("")}</div>
      <div class="fb" id="fb"></div>
      <div class="q-foot"><button class="btn hide" id="qnext">${qpos === total - 1 ? "查看结果" : "下一个 →"}</button></div>
    </div>`;

  const opts = [...box.querySelectorAll(".opt")];
  const correctBtn = opts.find(o => +o.dataset.i === it.a);
  const correctLetter = "ABCD"[quizOptOrder.indexOf(it.a)];
  opts.forEach(op => op.addEventListener("click", () => {
    const i = +op.dataset.i;
    opts.forEach(o => { o.disabled = true; o.classList.add("dim"); });
    op.classList.remove("dim");
    if (i === it.a){ op.classList.add("correct"); qscore++; }
    else { op.classList.add("wrong"); if (correctBtn){ correctBtn.classList.remove("dim"); correctBtn.classList.add("correct"); } quizFailed.push(it); }
    const fb = document.getElementById("fb");
    fb.innerHTML = "<b>" + (i === it.a ? "正确。" : "正确答案是 " + correctLetter + ". ") + "</b>" + it.fb;
    fb.classList.add("show");
    document.getElementById("qnext").classList.remove("hide");
  }));

  document.getElementById("qnext").addEventListener("click", () => {
    if (qpos === quizPool.length - 1){ qdone = true; } else { qpos++; }
    drawQuiz();
  });
}

renderQuizFilter();
loadQuiz(quizKey);
