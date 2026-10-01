"use strict";
/* ===== Parejas ===== depende de: data glosario.js (GLOSARIO) =====
   Juego de emparejar término ↔ definición: rondas de 6 parejas del glosario,
   por bloque, con puntos, racha, errores, tiempo y mejor marca (localStorage). */

const PAR_N = 6;                 // parejas por ronda
/* «Cómo se juega» (29-09): una línea al abrir el juego; cadena entera para que la traduzca ui/<lang>.json */
const PAR_HOWTO = { como: "玩法：", txt: "先点一个术语，再点它的定义（或者反过来）。每轮六对，和时间赛跑：连续答对可以累积连击。" };
const PAR_BLOCK_NAME = { A: "板块 A · 古代与中世纪", B: "板块 B · 近代", C: "板块 C · 当代" };
/* Grupo de un término: el bloque (glosario de HF, A/B/C) o, si no lo tiene, el tema (glosario de
   Filosofía 1.º: "Filosofía · Tema 1", "Taller de argumentación"…). Así el juego funciona en las
   dos webs con el glosario de cada una. */
function parGroupOf(g){ return g.bloque || g.tema || ""; }
function parGroupName(b){ return PAR_BLOCK_NAME[b] || String(b).replace(/^Pensamiento crítico · /, ""); }
function parGroupShort(b){ return PAR_BLOCK_NAME[b] ? PAR_BLOCK_NAME[b].split(" · ")[0] : String(b).replace(/^(Filosofía|Pensamiento crítico) · /, ""); }

const par = { block: null, pairs: [], sel: null, matched: null, errors: 0, score: 0, streak: 0, t0: 0, tick: null };

function parBox(){ return document.getElementById("parbox"); }
function parShuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function parBlocksPresent(){ return [...new Set(GLOSARIO.map(parGroupOf))].filter(b => b && parPoolOf(b).length >= PAR_N).sort(); }
function parPoolOf(b){ return GLOSARIO.filter(g => parGroupOf(g) === b && g.t && g.def); }
function escPar(s){ return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

/* ---------- historial de rondas (localStorage) ---------- */
const PAR_HIST_KEY = "aula-parejas-hist", PAR_HIST_MAX = 12;
function parHistLoad(){ const h = store.get(PAR_HIST_KEY, []); return Array.isArray(h) ? h : []; }
function parHistPush(rec){ const h = parHistLoad(); h.unshift(rec); while (h.length > PAR_HIST_MAX) h.pop(); store.set(PAR_HIST_KEY, h); }
function parNowStr(){ const d = new Date(), p = n => String(n).padStart(2, "0"); return p(d.getDate()) + "/" + p(d.getMonth()+1) + "/" + d.getFullYear() + " " + p(d.getHours()) + ":" + p(d.getMinutes()); }
function parStamp(){ const d = new Date(), p = n => String(n).padStart(2, "0"); return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes()); }
function parExportHist(){
  const h = parHistLoad();
  if (!h.length){ alert("记录里还没有可以导出的轮次。"); return; }
  const data = { app: "aula-parejas-hist", version: 1, exportado: new Date().toISOString(), rondas: h };
  try{ const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "parejas-rondas-" + parStamp() + ".json";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  }catch(e){ alert("无法生成文件。"); }
}
function parImportHistFile(file){
  if (!file) return;
  const rd = new FileReader();
  rd.onload = function(){
    let data; try{ data = JSON.parse(rd.result); }catch(e){ alert("这个文件不是有效的 JSON。"); return; }
    const arr = Array.isArray(data) ? data : (data && Array.isArray(data.rondas) ? data.rondas : null);
    if (!arr){ alert("这个文件里没有“配对”的轮次。"); return; }
    const valid = arr.filter(r => r && typeof r === "object" && (typeof r.score === "number" || typeof r.block === "string"));
    if (!valid.length){ alert("这个文件里没有任何有效的轮次。"); return; }
    const cur = parHistLoad(); const seen = {}; cur.forEach(r => { if (r && r.ts != null) seen[r.ts] = true; });
    const nuevos = valid.filter(r => r.ts == null || !seen[r.ts]);
    if (!nuevos.length){ alert("这些轮次已经在这台设备上了，没有添加任何内容。"); return; }
    let merged = cur.concat(nuevos); merged.sort((a, b) => (b.ts || 0) - (a.ts || 0));
    while (merged.length > PAR_HIST_MAX) merged.pop();
    store.set(PAR_HIST_KEY, merged);
    alert("已导入 " + nuevos.length + " 轮。保留最近的 " + PAR_HIST_MAX + " 轮。");
    renderParStart();
  };
  rd.onerror = function(){ alert("无法读取文件。"); };
  rd.readAsText(file);
}

/* ---------- mejores marcas: panel + exportar/importar (JSON) ---------- */
const PAR_BEST_KEY = "aula-parejas-best";
function parBestLoad(){ const m = store.get(PAR_BEST_KEY, {}); return (m && typeof m === "object") ? m : {}; }
function parExportBest(){
  const m = parBestLoad();
  if (!Object.keys(m).length){ alert("你还没有可以导出的最好成绩。"); return; }
  const data = { app: "aula-parejas", version: 1, exportado: new Date().toISOString(), marcas: m };
  try{ const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    const d = new Date(), p = n => String(n).padStart(2, "0");
    a.href = url; a.download = "parejas-marcas-" + d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes()) + ".json";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  }catch(e){ alert("无法生成文件。"); }
}
function parImportBestFile(file){
  if (!file) return;
  const rd = new FileReader();
  rd.onload = function(){
    let data; try{ data = JSON.parse(rd.result); }catch(e){ alert("这个文件不是有效的 JSON。"); return; }
    const m = data && data.marcas && typeof data.marcas === "object" ? data.marcas
            : (data && typeof data === "object" && !Array.isArray(data) ? data : null);
    if (!m){ alert("这个文件里没有“配对”的成绩。"); return; }
    const cur = parBestLoad(); let mejoradas = 0;
    Object.keys(m).forEach(b => { const v = Number(m[b]); if (isFinite(v) && v > (cur[b] || 0)){ cur[b] = v; mejoradas++; } });
    if (!mejoradas){ alert("文件里的成绩没有超过这台设备上的成绩，没有做任何更改。"); return; }
    store.set(PAR_BEST_KEY, cur);
    alert("已更新 " + mejoradas + " 项成绩（用文件里的成绩更新）。");
    renderParStart();
  };
  rd.onerror = function(){ alert("无法读取文件。"); };
  rd.readAsText(file);
}

/* ---------- inicio ---------- */
function renderParStart(){
  const box = parBox(); if (!box) return;
  if (par.tick){ clearInterval(par.tick); par.tick = null; }
  const present = parBlocksPresent();
  if (!present.length){ box.innerHTML = '<p class="lead">这个网站里没有可以玩的词汇表。</p>'; return; }
  if (!present.includes(par.block)) par.block = present[0];
  const picks = present.map(b => '<button class="pbtn" data-pblock="' + b + '" aria-pressed="' + (b === par.block) + '">' + escPar(parGroupName(b)) + '</button>').join("");
  const best = parBestLoad(); const anyBest = present.some(b => best[b]);
  const bestItems = present.map(b => '<span class="par-best-item">' + escPar(parGroupShort(b)) + ' <b>' + (best[b] ? best[b] + ' 分' : '—') + '</b></span>').join("");
  const bestPanel = '<div class="par-best">' +
    '<div class="par-best-top"><span class="par-best-h">🏅 最好成绩</span>' +
      '<span class="par-best-io">' +
        (anyBest ? '<button class="btn2" id="parExport" title="把你的最好成绩下载为一个 JSON 文件，用来保存，或带到另一台设备上">⬆️ 导出</button>' : '') +
        '<button class="btn2" id="parImport" title="从导出的 JSON 文件载入成绩（只有比你现有的更好时才会替换）">⬇️ 导入</button>' +
        (anyBest ? '<button class="btn2" id="parClear" title="清除保存在这个浏览器里的最好成绩（不影响已导出的文件）">🗑️ 清除</button>' : '') +
      '</span>' +
      '<input type="file" id="parBestFile" accept="application/json,.json" style="display:none">' +
    '</div>' +
    '<div class="par-best-list">' + bestItems + '</div>' +
    '</div>';
  const hist = parHistLoad();
  const histPanel = hist.length ? (
    '<div class="par-hist">' +
      '<div class="par-hist-top"><span class="par-hist-h">📜 最近几轮</span>' +
        '<span class="par-best-io">' +
          '<button class="btn2" id="parHistExport" title="把轮次记录下载为一个 JSON 文件，用来保存，或带到另一台设备上">⬆️ 导出</button>' +
          '<button class="btn2" id="parHistImport" title="从导出的 JSON 文件载入轮次（会添加到这台设备已有的记录里，不会删除它们）">⬇️ 导入</button>' +
          '<button class="btn2" id="parHistClear" title="清除保存在这个浏览器里的轮次记录">🗑️ 清除</button>' +
        '</span>' +
        '<input type="file" id="parHistFile" accept="application/json,.json" style="display:none"></div>' +
      '<div class="par-hist-list">' +
        hist.map(r => '<div class="par-hist-item"><span class="par-hist-badge">' + (r.emoji || "🧩") + '</span> ' +
          '<b>' + escPar((r.blockName || "").split(" · ")[0] || "Bloque " + (r.block || "")) + '</b> · ' +
          '<span class="par-hist-score">' + (r.score || 0) + ' 分</span> · ' +
          (r.pairs || PAR_N) + ' 对 · ' + (r.errors || 0) + ((r.errors === 1) ? ' 个错误' : ' 个错误') + ' · ' + (r.secs || 0) + ' s' +
          (r.record ? ' · 🎉 新纪录' : '') +
          '<span class="par-hist-date">' + escPar(r.date || "") + '</span></div>').join("") +
      '</div></div>'
  ) : '';
  box.innerHTML = '<div class="par-wrap">' +
    '<p class="howto"><span><b>' + PAR_HOWTO.como + '</b> ' + PAR_HOWTO.txt + '</span></p>' +
    '<div class="par-pick"><span class="flabel">' + (present.some(b => PAR_BLOCK_NAME[b]) ? "板块" : "主题") + '</span>' + picks + '</div>' +
    '<button class="par-play" id="parPlay"><span>🧩</span><span><b>开始</b> · 把 ' + PAR_N + ' 个术语和它们的定义配对</span></button>' +
    bestPanel + histPanel +
    '</div>';
  box.querySelectorAll("[data-pblock]").forEach(b => b.addEventListener("click", () => { par.block = b.dataset.pblock; renderParStart(); }));
  document.getElementById("parPlay").addEventListener("click", parStart);
  const pe = document.getElementById("parExport"); if (pe) pe.addEventListener("click", parExportBest);
  const pi = document.getElementById("parImport"), pf = document.getElementById("parBestFile");
  if (pi && pf){ pi.addEventListener("click", () => pf.click()); pf.addEventListener("change", () => { parImportBestFile(pf.files && pf.files[0]); pf.value = ""; }); }
  const pc = document.getElementById("parClear"); if (pc) pc.addEventListener("click", () => { if (confirm("要清除你在“配对”里的所有最好成绩吗？")){ store.set(PAR_BEST_KEY, {}); renderParStart(); } });
  const ph = document.getElementById("parHistClear"); if (ph) ph.addEventListener("click", () => { if (confirm("要清除“配对”的所有轮次记录吗？")){ store.set(PAR_HIST_KEY, []); renderParStart(); } });
  const he = document.getElementById("parHistExport"); if (he) he.addEventListener("click", parExportHist);
  const hi = document.getElementById("parHistImport"), hf = document.getElementById("parHistFile");
  if (hi && hf){ hi.addEventListener("click", () => hf.click()); hf.addEventListener("change", () => { parImportHistFile(hf.files && hf.files[0]); hf.value = ""; }); }
}

/* ---------- ronda ---------- */
function parStart(){
  const pool = parPoolOf(par.block);
  par.pairs = parShuffle(pool).slice(0, Math.min(PAR_N, pool.length));
  par.sel = null; par.matched = new Set(); par.errors = 0; par.score = 0; par.streak = 0; par.t0 = Date.now();
  renderParRound();
  if (par.tick) clearInterval(par.tick);
  par.tick = setInterval(parUpdateTime, 500);
}

function parElapsed(){ return Math.floor((Date.now() - par.t0) / 1000); }
function parUpdateTime(){ const el = document.getElementById("parTime"); if (el) el.textContent = parElapsed() + " s"; }

function renderParRound(){
  const box = parBox();
  const left = parShuffle(par.pairs.map((_, i) => i));   // orden de términos
  const right = parShuffle(par.pairs.map((_, i) => i));   // orden de definiciones
  const terms = left.map(i => '<button class="par-item par-term" data-side="t" data-pair="' + i + '">' + escPar(par.pairs[i].t) + '</button>').join("");
  const defs = right.map(i => '<button class="par-item par-def" data-side="d" data-pair="' + i + '">' + escPar(par.pairs[i].def) + '</button>').join("");
  box.innerHTML = '<div class="par-wrap">' +
    '<div class="par-hud">' +
      '<span class="stat">配对 <b id="parDone">0</b> / ' + par.pairs.length + '</span>' +
      '<span class="stat">错误 <b id="parErr">0</b></span>' +
      '<span class="stat">⏱ <b id="parTime">0 s</b></span>' +
      '<span class="par-score" id="parScore">0 分</span>' +
    '</div>' +
    '<div class="par-board">' +
      '<div><div class="par-col-h">术语</div><div class="par-terms">' + terms + '</div></div>' +
      '<div><div class="par-col-h">定义</div><div class="par-defs">' + defs + '</div></div>' +
    '</div></div>';
  box.querySelectorAll(".par-item").forEach(el => el.addEventListener("click", () => parClick(el)));
}

function parClick(el){
  if (el.disabled || el.classList.contains("matched")) return;
  const side = el.dataset.side, pair = +el.dataset.pair;
  if (!par.sel){ par.sel = { el, side, pair }; el.classList.add("sel"); return; }
  if (par.sel.el === el){ el.classList.remove("sel"); par.sel = null; return; }   // deseleccionar
  if (par.sel.side === side){ par.sel.el.classList.remove("sel"); par.sel = { el, side, pair }; el.classList.add("sel"); return; } // cambiar de misma columna

  // hay uno de cada columna: comprobar
  const a = par.sel; a.el.classList.remove("sel");
  if (a.pair === pair){
    // acierto
    par.streak++; const gain = 100 + Math.min(par.streak - 1, 5) * 20;
    par.score += gain; par.matched.add(pair);
    [a.el, el].forEach(x => { x.classList.add("matched", "pop"); x.disabled = true; setTimeout(() => x.classList.remove("pop"), 280); });
    document.getElementById("parDone").textContent = par.matched.size;
    document.getElementById("parScore").textContent = par.score + " 分";
    par.sel = null;
    if (par.matched.size === par.pairs.length) setTimeout(renderParResult, 420);
  } else {
    // fallo
    par.errors++; par.streak = 0;
    document.getElementById("parErr").textContent = par.errors;
    [a.el, el].forEach(x => { x.classList.add("wrong"); setTimeout(() => x.classList.remove("wrong"), 320); });
    par.sel = null;
  }
}

/* ---------- resultado ---------- */
function parRank(errors){
  if (errors === 0) return ["🏆", "完美，一个错误也没有！"];
  if (errors <= 2)  return ["🎓", "很好"];
  if (errors <= 5)  return ["🌱", "不错，继续加油"];
  return ["📚", "该复习词汇表了"];
}

function renderParResult(){
  if (par.tick){ clearInterval(par.tick); par.tick = null; }
  const secs = parElapsed();
  const timeBonus = Math.max(0, 120 - secs) * 2;
  par.score += timeBonus;
  const [emoji, rank] = parRank(par.errors);
  const key = "aula-parejas-best";
  const bestMap = store.get(key, {}); const prev = bestMap[par.block] || 0;
  const record = par.score > prev; if (record){ bestMap[par.block] = par.score; store.set(key, bestMap); }
  parHistPush({ block: par.block, blockName: parGroupName(par.block), emoji: emoji, rank: rank, score: par.score, errors: par.errors, secs: secs, pairs: par.pairs.length, record: record, date: parNowStr(), ts: Date.now() });
  parBox().innerHTML = '<div class="par-wrap"><div class="par-result">' +
    '<div class="par-badge">' + emoji + '</div>' +
    '<div class="par-rank">' + rank + '</div>' +
    '<div class="par-final">' + par.score + '</div>' +
    '<p class="par-stats">' + par.pairs.length + ' 对 · ' + par.errors + (par.errors === 1 ? ' 个错误' : ' 个错误') + ' · ' + secs + ' s' +
      ' · ' + (record ? '新的最好成绩！🎉' : '最好：' + Math.max(prev, par.score) + ' 分') + '</p>' +
    '<div class="par-actions"><button class="btn2 primary" id="parAgain">再来一轮</button>' +
      '<button class="btn2" id="parHome">更换板块</button></div>' +
    '</div></div>';
  document.getElementById("parAgain").addEventListener("click", parStart);
  document.getElementById("parHome").addEventListener("click", renderParStart);
}

/* ---------- init ---------- */
function initPar(){ if (typeof GLOSARIO === "undefined") return; renderParStart(); }
document.addEventListener("DOMContentLoaded", initPar);
(function(){ const nav = document.getElementById("tabs"); if (nav) nav.addEventListener("click", e => {
  const b = e.target.closest("button"); if (b && b.dataset.view === "parejas") renderParStart();
}); })();
