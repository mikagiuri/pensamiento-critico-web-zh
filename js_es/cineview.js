"use strict";
/* ===== Filosofía y cine/arte en la teoría ===== depende de: cine_arte.js (CINE), theoryview.js
   Envuelve loadTheory() y, tras renderizar un tema, añade debajo una tira de películas y
   obras de arte relacionadas con ese tema, con la pregunta filosófica que plantean. */
(function(){
  if (typeof CINE === "undefined") return;

  const CSS = ''
    + '.cine-strip{ margin:2.2rem 0 .5rem; padding-top:1.2rem; border-top:1px solid var(--line); }'
    + '.cine-strip h3{ font-family:var(--serif,Georgia,serif); font-size:1.05rem; margin:0 0 .2rem; }'
    + '.cine-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(min(240px,100%),1fr)); gap:.8rem; margin:.9rem 0 .6rem; }'
    + '.cine-card{ background:var(--surface); border:1px solid var(--line); border-left:4px solid var(--accent); '
    + '  border-radius:12px; padding:.7rem .8rem .75rem; display:flex; flex-direction:column; gap:.35rem; }'
    + '.cine-h{ display:flex; align-items:baseline; gap:.4rem; flex-wrap:wrap; }'
    + '.cine-ico{ font-size:1.05rem; }'
    + '.cine-t{ font-weight:600; color:var(--ink); }'
    + '.cine-meta{ font-size:.78rem; color:var(--muted); }'
    + '.cine-q{ font-size:.86rem; color:var(--ink); line-height:1.4; }'
    + '.cine-note{ font-size:.76rem; color:var(--muted); line-height:1.5; margin:.4rem 0 0; }';
  let cssDone = false;
  function injectCss(){ if (cssDone) return; const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); cssDone = true; }
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

  function cardHTML(x){
    const ico = x.kind === "arte" ? "🖼️" : "🎬";
    const meta = [x.autor, x.year].filter(Boolean).join(", ");
    return '<div class="cine-card"><div class="cine-h"><span class="cine-ico">' + ico + '</span>'
      + '<span class="cine-t">' + esc(x.t) + '</span>'
      + (meta ? '<span class="cine-meta">' + esc(meta) + '</span>' : '') + '</div>'
      + '<div class="cine-q">' + esc(x.q) + '</div></div>';
  }

  function injectCine(){
    const body = document.getElementById("theorybody");
    if (!body) return;
    const old = body.querySelector(".cine-strip"); if (old) old.remove();
    const k = (typeof theoryKey !== "undefined") ? theoryKey : null;
    const list = CINE.filter(x => x.tema === k);
    if (!list.length) return;
    injectCss();
    const strip = document.createElement("aside");
    strip.className = "cine-strip";
    strip.innerHTML = '<h3>Filosofía y cine/arte · para este tema</h3>'
      + '<div class="cine-grid">' + list.map(cardHTML).join("") + '</div>'
      + '<p class="cine-note">Películas y obras que plantean las preguntas de este tema. Una vía para pensar la filosofía desde el cine y el arte.</p>';
    body.appendChild(strip);
  }

  if (typeof loadTheory === "function"){
    const orig = loadTheory;
    loadTheory = function(k){ orig(k); try { injectCine(); } catch(e){} };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectCine);
  else injectCine();
})();
