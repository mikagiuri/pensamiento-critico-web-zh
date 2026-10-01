"use strict";
/* ===== Reto: modo juego de repaso ===== depende de: store.js, data.js (QUIZZES) =====
   Reutiliza las preguntas de los cuestionarios y añade temporizador, puntos por
   velocidad, racha (multiplicador) y pantalla final con rango y mejor marca. */

const RETO_SUBJ = { fil: "高一哲学", hf: "哲学史", ipc: "批判性思维" };
const RETO_TIME = 15;          // segundos por pregunta
const RETO_QUICK = 10;         // nº de preguntas del «reto rápido»
/* «Cómo se juega» (29-09): una línea al abrir el juego; cadena entera para que la traduzca ui/<lang>.json */
const RETO_HOWTO = { como: "玩法：", txt: "选一个科目或测验，在时间用完之前回答：答得越快，分越高；连续答对还会加倍。" };

const reto = { subject: null, pool: [], title: "", idx: 0, score: 0, streak: 0, best: 0, correct: 0, t: null, answered: false };

function retoBox(){ return document.getElementById("retobox"); }
function retoShuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function retoSubjectsPresent(){ return [...new Set(Object.values(QUIZZES).map(q => q.subject))].filter(s => RETO_SUBJ[s]); }
function retoQuizzesOf(s){ return Object.entries(QUIZZES).filter(([, q]) => q.subject === s); }

/* ---------- pantalla de inicio ---------- */
function renderRetoStart(){
  const box = retoBox(); if (!box) return;
  if (reto.t){ clearInterval(reto.t); reto.t = null; }
  const present = retoSubjectsPresent();
  if (!present.length){ box.innerHTML = '<p class="reto-lead">还没有可以玩的测验。</p>'; return; }
  if (!present.includes(reto.subject)) reto.subject = present[0];

  const picks = present.map(s =>
    '<button class="rbtn" data-rsub="' + s + '" aria-pressed="' + (s === reto.subject) + '">' + RETO_SUBJ[s] + '</button>').join("");
  const quizzes = retoQuizzesOf(reto.subject);
  const nQ = quizzes.reduce((n, [, q]) => n + q.items.length, 0);
  const list = quizzes.map(([k, q]) =>
    '<button class="chip" data-rquiz="' + k + '">' + q.name + ' · ' + q.items.length + '</button>').join("");

  box.innerHTML =
    '<div class="reto-wrap reto-start">' +
      '<p class="howto"><span><b>' + RETO_HOWTO.como + '</b> ' + RETO_HOWTO.txt + '</span></p>' +
      '<div class="reto-pick"><span class="flabel">科目</span>' + picks + '</div>' +
      '<div class="reto-modes">' +
        '<button class="reto-quick" id="retoQuick"><span><b>快速挑战</b>' +
          '<span>' + Math.min(RETO_QUICK, nQ) + ' 道随机题 · ' + RETO_TIME + ' 秒/题</span></span>' +
          '<span class="go">▶</span></button>' +
        (list ? '<div><span class="flabel" style="font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">或者选一个测验</span>' +
          '<div class="reto-list">' + list + '</div></div>' : '') +
      '</div>' +
    '</div>';

  box.querySelectorAll("[data-rsub]").forEach(b => b.addEventListener("click", () => { reto.subject = b.dataset.rsub; renderRetoStart(); }));
  const quick = document.getElementById("retoQuick");
  if (quick) quick.addEventListener("click", () => {
    const all = retoQuizzesOf(reto.subject).flatMap(([, q]) => q.items.map(it => ({ it, from: q.name })));
    retoStart(retoShuffle(all).slice(0, RETO_QUICK), "快速挑战 · " + RETO_SUBJ[reto.subject]);
  });
  box.querySelectorAll("[data-rquiz]").forEach(b => b.addEventListener("click", () => {
    const q = QUIZZES[b.dataset.rquiz];
    retoStart(q.items.map(it => ({ it, from: q.name })), q.name);
  }));
}

/* ---------- juego ---------- */
function retoStart(pool, title){
  reto.pool = pool; reto.title = title; reto.idx = 0; reto.score = 0; reto.streak = 0; reto.correct = 0; reto.answered = false;
  reto.wrong = [];
  reto.best = (store.get("aula-reto-best", {}))[title] || 0;
  renderRetoQuestion();
}

function retoStreakMult(){ return 1 + Math.min(reto.streak, 4) * 0.25; }   // hasta ×2 con racha de 4+

function renderRetoQuestion(){
  const box = retoBox(); const n = reto.pool.length; const cur = reto.pool[reto.idx]; const it = cur.it;
  reto.answered = false; reto.remaining = RETO_TIME;
  reto.optOrder = retoShuffle(it.o.map((_, i) => i));
  const mult = retoStreakMult();
  box.innerHTML =
    '<div class="reto-wrap">' +
      '<div class="reto-hud">' +
        '<span class="reto-count">题目 ' + (reto.idx + 1) + ' / ' + n + '</span>' +
        '<span class="reto-streak">' + (reto.streak > 0 ? '🔥 ×' + mult.toFixed(2).replace(/\.00$/, "") : '') + '</span>' +
        '<span class="reto-score">' + reto.score + ' 分</span>' +
      '</div>' +
      '<div class="reto-timer" id="retoTimer"><i style="width:100%"></i></div>' +
      '<div class="reto-progress"><i style="width:' + Math.round(reto.idx / n * 100) + '%"></i></div>' +
      '<div class="reto-card" id="retoCard">' +
        '<div class="reto-tag">' + cur.from + '</div>' +
        '<p class="reto-q">' + it.q + '</p>' +
        '<div class="reto-opts" id="retoOpts">' +
          reto.optOrder.map((orig, disp) => '<button class="reto-opt" data-i="' + orig + '"><span class="k">' + "ABCD"[disp] + '</span><span>' + it.o[orig] + '</span></button>').join("") +
        '</div>' +
        '<div class="reto-fb" id="retoFb"></div>' +
        '<div class="reto-foot"><button class="reto-next" id="retoNext" hidden>' +
          (reto.idx === n - 1 ? "查看结果" : "下一个 →") + '</button></div>' +
      '</div>' +
    '</div>';

  box.querySelectorAll(".reto-opt").forEach(op => op.addEventListener("click", () => retoAnswer(+op.dataset.i)));
  document.getElementById("retoNext").addEventListener("click", retoNext);
  retoStartTimer();
}

function retoStartTimer(){
  const bar = document.querySelector("#retoTimer > i"); const wrap = document.getElementById("retoTimer");
  const start = Date.now();
  reto.t = setInterval(() => {
    const elapsed = (Date.now() - start) / 1000;
    reto.remaining = Math.max(0, RETO_TIME - elapsed);
    const frac = reto.remaining / RETO_TIME;
    if (bar) bar.style.width = (frac * 100) + "%";
    if (wrap) wrap.classList.toggle("low", frac < 0.34);
    if (reto.remaining <= 0){ clearInterval(reto.t); reto.t = null; retoAnswer(-1); }
  }, 100);
}

function retoAnswer(i){
  if (reto.answered) return;
  reto.answered = true;
  if (reto.t){ clearInterval(reto.t); reto.t = null; }
  const it = reto.pool[reto.idx].it;
  const opts = [...document.querySelectorAll(".reto-opt")];
  const byOrig = k => opts.find(o => +o.dataset.i === k);
  opts.forEach(o => { o.disabled = true; o.classList.add("dim"); });
  const card = document.getElementById("retoCard");
  let gain = 0;
  const ok = i === it.a;
  if (ok){
    const frac = reto.remaining / RETO_TIME;
    gain = Math.round((100 + 100 * frac) * retoStreakMult());
    reto.score += gain; reto.correct++; reto.streak++;
    const b = byOrig(i); if (b){ b.classList.remove("dim"); b.classList.add("correct"); }
    if (card) card.classList.add("pop");
    const st = document.querySelector(".reto-streak"); if (st){ st.classList.add("bump"); setTimeout(() => st.classList.remove("bump"), 200); }
  } else {
    reto.streak = 0;
    reto.wrong.push(reto.pool[reto.idx]);
    const b = byOrig(i); if (i >= 0 && b){ b.classList.remove("dim"); b.classList.add("wrong"); }
    const bc = byOrig(it.a); if (bc){ bc.classList.remove("dim"); bc.classList.add("correct"); }
    if (card) card.classList.add("shake");
  }
  const sc = document.querySelector(".reto-score"); if (sc) sc.textContent = reto.score + " 分";
  const fb = document.getElementById("retoFb");
  const head = ok ? '<b class="reto-gain">+' + gain + ' 分。</b> ' : (i < 0 ? '<b>时间到！</b> ' : '<b>正确答案是 ' + "ABCD"[reto.optOrder.indexOf(it.a)] + '.</b> ');
  fb.innerHTML = head + it.fb;
  fb.classList.add("show");
  document.getElementById("retoNext").hidden = false;
}

function retoNext(){
  reto.idx++;
  if (reto.idx >= reto.pool.length) renderRetoResult();
  else renderRetoQuestion();
}

/* ---------- resultado ---------- */
function retoRank(pct){
  if (pct >= 100) return ["🏆", "哲学家！"];
  if (pct >= 80)  return ["🎓", "很好"];
  if (pct >= 60)  return ["🌱", "你走在正确的路上"];
  if (pct >= 40)  return ["💪", "继续复习"];
  return ["📚", "要再好好想一想"];
}

function renderRetoResult(){
  const n = reto.pool.length; const pct = Math.round(reto.correct / n * 100);
  const [emoji, rank] = retoRank(pct);
  const bestMap = store.get("aula-reto-best", {});
  const prev = bestMap[reto.title] || 0;
  const record = reto.score > prev;
  if (record){ bestMap[reto.title] = reto.score; store.set("aula-reto-best", bestMap); }
  retoBox().innerHTML =
    '<div class="reto-wrap"><div class="reto-result">' +
      '<div class="reto-badge">' + emoji + '</div>' +
      '<div class="reto-rank">' + rank + '</div>' +
      '<div class="reto-final">' + reto.score + '</div>' +
      '<p class="reto-stats">' + reto.correct + ' / ' + n + ' aciertos (' + pct + '%) · ' +
        (record ? '新的最好成绩！🎉' : '最好成绩：' + Math.max(prev, reto.score) + ' 分') + '</p>' +
      '<div class="reto-actions">' +
        '<button class="btn2 primary" id="retoAgain">重做</button>' +
        (reto.wrong && reto.wrong.length ? '<button class="btn2" id="retoReview">重做答错的题 (' + reto.wrong.length + ')</button>' : '') +
        '<button class="btn2" id="retoHome">再来一个挑战</button>' +
      '</div>' +
    '</div></div>';
  document.getElementById("retoAgain").addEventListener("click", () => retoStart(retoShuffle(reto.pool), reto.title));
  const rev = document.getElementById("retoReview");
  if (rev) rev.addEventListener("click", () => { const w = reto.wrong.slice(); retoStart(retoShuffle(w), "复习 · " + reto.title); });
  document.getElementById("retoHome").addEventListener("click", renderRetoStart);
}

/* ---------- init: dibuja la pantalla de inicio al cargar y al entrar en la vista ---------- */
document.addEventListener("DOMContentLoaded", renderRetoStart);
(function(){ const nav = document.getElementById("tabs"); if (nav) nav.addEventListener("click", e => {
  const b = e.target.closest("button"); if (b && b.dataset.view === "reto") renderRetoStart();
}); })();
