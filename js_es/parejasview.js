"use strict";
/* ===== Parejas ===== depende de: data glosario.js (GLOSARIO) =====
   Juego de emparejar término ↔ definición: rondas de 6 parejas del glosario,
   por bloque, con puntos, racha, errores, tiempo y mejor marca (localStorage). */

const PAR_N = 6;                 // parejas por ronda
/* «Cómo se juega» (29-09): una línea al abrir el juego; cadena entera para que la traduzca ui/<lang>.json */
const PAR_HOWTO = { como: "Cómo se juega:", txt: "Pulsa un término y luego su definición (o al revés). Seis parejas por ronda, contrarreloj: acierta seguido para sumar racha." };
const PAR_BLOCK_NAME = { A: "Bloque A · Antigua-medieval", B: "Bloque B · Moderna", C: "Bloque C · Contemporánea" };
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
  if (!h.length){ alert("Todavía no hay rondas en el historial que exportar."); return; }
  const data = { app: "aula-parejas-hist", version: 1, exportado: new Date().toISOString(), rondas: h };
  try{ const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "parejas-rondas-" + parStamp() + ".json";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  }catch(e){ alert("No se ha podido generar el archivo."); }
}
function parImportHistFile(file){
  if (!file) return;
  const rd = new FileReader();
  rd.onload = function(){
    let data; try{ data = JSON.parse(rd.result); }catch(e){ alert("El archivo no es un JSON válido."); return; }
    const arr = Array.isArray(data) ? data : (data && Array.isArray(data.rondas) ? data.rondas : null);
    if (!arr){ alert("El archivo no contiene rondas de Parejas."); return; }
    const valid = arr.filter(r => r && typeof r === "object" && (typeof r.score === "number" || typeof r.block === "string"));
    if (!valid.length){ alert("El archivo no contiene ninguna ronda válida."); return; }
    const cur = parHistLoad(); const seen = {}; cur.forEach(r => { if (r && r.ts != null) seen[r.ts] = true; });
    const nuevos = valid.filter(r => r.ts == null || !seen[r.ts]);
    if (!nuevos.length){ alert("Esas rondas ya estaban en este equipo. No se ha añadido ninguna."); return; }
    let merged = cur.concat(nuevos); merged.sort((a, b) => (b.ts || 0) - (a.ts || 0));
    while (merged.length > PAR_HIST_MAX) merged.pop();
    store.set(PAR_HIST_KEY, merged);
    alert("Importadas " + nuevos.length + " ronda(s). Se conservan las " + PAR_HIST_MAX + " más recientes.");
    renderParStart();
  };
  rd.onerror = function(){ alert("No se ha podido leer el archivo."); };
  rd.readAsText(file);
}

/* ---------- mejores marcas: panel + exportar/importar (JSON) ---------- */
const PAR_BEST_KEY = "aula-parejas-best";
function parBestLoad(){ const m = store.get(PAR_BEST_KEY, {}); return (m && typeof m === "object") ? m : {}; }
function parExportBest(){
  const m = parBestLoad();
  if (!Object.keys(m).length){ alert("Todavía no tienes ninguna mejor marca que exportar."); return; }
  const data = { app: "aula-parejas", version: 1, exportado: new Date().toISOString(), marcas: m };
  try{ const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    const d = new Date(), p = n => String(n).padStart(2, "0");
    a.href = url; a.download = "parejas-marcas-" + d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes()) + ".json";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  }catch(e){ alert("No se ha podido generar el archivo."); }
}
function parImportBestFile(file){
  if (!file) return;
  const rd = new FileReader();
  rd.onload = function(){
    let data; try{ data = JSON.parse(rd.result); }catch(e){ alert("El archivo no es un JSON válido."); return; }
    const m = data && data.marcas && typeof data.marcas === "object" ? data.marcas
            : (data && typeof data === "object" && !Array.isArray(data) ? data : null);
    if (!m){ alert("El archivo no contiene marcas de Parejas."); return; }
    const cur = parBestLoad(); let mejoradas = 0;
    Object.keys(m).forEach(b => { const v = Number(m[b]); if (isFinite(v) && v > (cur[b] || 0)){ cur[b] = v; mejoradas++; } });
    if (!mejoradas){ alert("Las marcas del archivo no superan a las de este equipo. No se ha cambiado nada."); return; }
    store.set(PAR_BEST_KEY, cur);
    alert("Actualizadas " + mejoradas + " marca(s) con las del archivo.");
    renderParStart();
  };
  rd.onerror = function(){ alert("No se ha podido leer el archivo."); };
  rd.readAsText(file);
}

/* ---------- inicio ---------- */
function renderParStart(){
  const box = parBox(); if (!box) return;
  if (par.tick){ clearInterval(par.tick); par.tick = null; }
  const present = parBlocksPresent();
  if (!present.length){ box.innerHTML = '<p class="lead">No hay glosario para jugar en esta web.</p>'; return; }
  if (!present.includes(par.block)) par.block = present[0];
  const picks = present.map(b => '<button class="pbtn" data-pblock="' + b + '" aria-pressed="' + (b === par.block) + '">' + escPar(parGroupName(b)) + '</button>').join("");
  const best = parBestLoad(); const anyBest = present.some(b => best[b]);
  const bestItems = present.map(b => '<span class="par-best-item">' + escPar(parGroupShort(b)) + ' <b>' + (best[b] ? best[b] + ' pts' : '—') + '</b></span>').join("");
  const bestPanel = '<div class="par-best">' +
    '<div class="par-best-top"><span class="par-best-h">🏅 Mejores marcas</span>' +
      '<span class="par-best-io">' +
        (anyBest ? '<button class="btn2" id="parExport" title="Descarga tus mejores marcas en un archivo JSON para guardarlas o llevarlas a otro equipo">⬆️ Exportar</button>' : '') +
        '<button class="btn2" id="parImport" title="Carga marcas desde un archivo JSON exportado (solo sustituyen a las tuyas si son mejores)">⬇️ Importar</button>' +
        (anyBest ? '<button class="btn2" id="parClear" title="Borra las mejores marcas guardadas en este navegador (no afecta a los archivos exportados)">🗑️ Borrar</button>' : '') +
      '</span>' +
      '<input type="file" id="parBestFile" accept="application/json,.json" style="display:none">' +
    '</div>' +
    '<div class="par-best-list">' + bestItems + '</div>' +
    '</div>';
  const hist = parHistLoad();
  const histPanel = hist.length ? (
    '<div class="par-hist">' +
      '<div class="par-hist-top"><span class="par-hist-h">📜 Últimas rondas</span>' +
        '<span class="par-best-io">' +
          '<button class="btn2" id="parHistExport" title="Descarga el historial de rondas en un archivo JSON para guardarlo o llevarlo a otro equipo">⬆️ Exportar</button>' +
          '<button class="btn2" id="parHistImport" title="Carga rondas desde un archivo JSON exportado (se añaden a las de este equipo, sin borrarlas)">⬇️ Importar</button>' +
          '<button class="btn2" id="parHistClear" title="Borra el historial de rondas guardado en este navegador">🗑️ Borrar</button>' +
        '</span>' +
        '<input type="file" id="parHistFile" accept="application/json,.json" style="display:none"></div>' +
      '<div class="par-hist-list">' +
        hist.map(r => '<div class="par-hist-item"><span class="par-hist-badge">' + (r.emoji || "🧩") + '</span> ' +
          '<b>' + escPar((r.blockName || "").split(" · ")[0] || "Bloque " + (r.block || "")) + '</b> · ' +
          '<span class="par-hist-score">' + (r.score || 0) + ' pts</span> · ' +
          (r.pairs || PAR_N) + ' parejas · ' + (r.errors || 0) + ((r.errors === 1) ? ' error' : ' errores') + ' · ' + (r.secs || 0) + ' s' +
          (r.record ? ' · 🎉 récord' : '') +
          '<span class="par-hist-date">' + escPar(r.date || "") + '</span></div>').join("") +
      '</div></div>'
  ) : '';
  box.innerHTML = '<div class="par-wrap">' +
    '<p class="howto"><span><b>' + PAR_HOWTO.como + '</b> ' + PAR_HOWTO.txt + '</span></p>' +
    '<div class="par-pick"><span class="flabel">' + (present.some(b => PAR_BLOCK_NAME[b]) ? "Bloque" : "Tema") + '</span>' + picks + '</div>' +
    '<button class="par-play" id="parPlay"><span>🧩</span><span><b>Jugar</b> · empareja ' + PAR_N + ' términos con su definición</span></button>' +
    bestPanel + histPanel +
    '</div>';
  box.querySelectorAll("[data-pblock]").forEach(b => b.addEventListener("click", () => { par.block = b.dataset.pblock; renderParStart(); }));
  document.getElementById("parPlay").addEventListener("click", parStart);
  const pe = document.getElementById("parExport"); if (pe) pe.addEventListener("click", parExportBest);
  const pi = document.getElementById("parImport"), pf = document.getElementById("parBestFile");
  if (pi && pf){ pi.addEventListener("click", () => pf.click()); pf.addEventListener("change", () => { parImportBestFile(pf.files && pf.files[0]); pf.value = ""; }); }
  const pc = document.getElementById("parClear"); if (pc) pc.addEventListener("click", () => { if (confirm("¿Borrar todas tus mejores marcas de Parejas?")){ store.set(PAR_BEST_KEY, {}); renderParStart(); } });
  const ph = document.getElementById("parHistClear"); if (ph) ph.addEventListener("click", () => { if (confirm("¿Borrar el historial de rondas de Parejas?")){ store.set(PAR_HIST_KEY, []); renderParStart(); } });
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
      '<span class="stat">Parejas <b id="parDone">0</b> / ' + par.pairs.length + '</span>' +
      '<span class="stat">Errores <b id="parErr">0</b></span>' +
      '<span class="stat">⏱ <b id="parTime">0 s</b></span>' +
      '<span class="par-score" id="parScore">0 pts</span>' +
    '</div>' +
    '<div class="par-board">' +
      '<div><div class="par-col-h">Término</div><div class="par-terms">' + terms + '</div></div>' +
      '<div><div class="par-col-h">Definición</div><div class="par-defs">' + defs + '</div></div>' +
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
    document.getElementById("parScore").textContent = par.score + " pts";
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
  if (errors === 0) return ["🏆", "¡Perfecto, sin fallos!"];
  if (errors <= 2)  return ["🎓", "Muy bien"];
  if (errors <= 5)  return ["🌱", "Bien, a seguir"];
  return ["📚", "A repasar el glosario"];
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
    '<p class="par-stats">' + par.pairs.length + ' parejas · ' + par.errors + (par.errors === 1 ? ' error' : ' errores') + ' · ' + secs + ' s' +
      ' · ' + (record ? '¡nueva mejor marca! 🎉' : 'mejor: ' + Math.max(prev, par.score) + ' pts') + '</p>' +
    '<div class="par-actions"><button class="btn2 primary" id="parAgain">Otra ronda</button>' +
      '<button class="btn2" id="parHome">Cambiar bloque</button></div>' +
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
