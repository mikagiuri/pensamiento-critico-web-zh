"use strict";
/* ===== Ilustraciones de tema en la teoría (Filosofía 1.º) ===== depende de: ilustraciones_fil.js, theoryview.js
   Envuelve loadTheory() y, tras renderizar un tema, añade debajo una tira de imágenes de DOMINIO PÚBLICO
   ancladas a ese tema (campo `tema` = clave THEORY). No toca theory.js ni theoryview.js.
   Estilo propio (object-fit: contain) para no recortar diagramas y láminas. Abre el lightbox de la teoría. */
(function(){
  if (typeof ILUSTRACIONES === "undefined") return;

  const CSS = ''
    + '.ilus-strip{ margin:2.4rem 0 .5rem; padding-top:1.2rem; border-top:1px solid var(--line); }'
    + '.ilus-strip h3{ font-family:var(--serif,Georgia,serif); font-size:1.05rem; margin:0 0 .2rem; }'
    + '.ilus-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(min(180px,100%),1fr)); gap:.9rem; margin:.9rem 0 .6rem; }'
    + '.ilus-card{ margin:0; background:var(--surface); border:1px solid var(--line); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; }'
    + '.ilus-card .ilus-img{ width:100%; height:170px; object-fit:contain; background:var(--surface-2); cursor:zoom-in; padding:6px; transition:transform .18s ease; }'
    + '.ilus-card .ilus-img:hover{ transform:scale(1.03); }'
    + '.ilus-card figcaption{ padding:.5rem .6rem .6rem; display:flex; flex-direction:column; gap:.2rem; border-top:1px solid var(--line); }'
    + '.ilus-card figcaption b{ font-size:.88rem; line-height:1.25; }'
    + '.ilus-pie{ font-size:.76rem; color:var(--muted); line-height:1.35; }'
    + '.ilus-cred{ font-size:.68rem; color:var(--muted); margin-top:.1rem; }'
    + '.ilus-cred a{ color:var(--accent); text-decoration:none; } .ilus-cred a:hover{ text-decoration:underline; }'
    + '.ilus-note{ font-size:.76rem; color:var(--muted); line-height:1.5; margin:.4rem 0 0; }'
    + '@media (max-width:560px){ .ilus-grid{ grid-template-columns:repeat(auto-fill,minmax(min(130px,100%),1fr)); } .ilus-card .ilus-img{ height:140px; } }';
  let cssDone = false;
  function injectCss(){ if (cssDone) return; const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); cssDone = true; }

  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function cardHTML(x){
    return '<figure class="ilus-card">'
      + '<img class="ilus-img" loading="lazy" src="' + x.f + '" alt="' + esc(x.t) + '">'
      + '<figcaption><b>' + esc(x.t) + '</b>'
      + (x.pie ? '<span class="ilus-pie">' + esc(x.pie) + '</span>' : '')
      + '<span class="ilus-cred">' + esc(x.license || "Dominio público")
      + (x.page ? ' · <a href="' + x.page + '" target="_blank" rel="noopener">Wikimedia Commons</a>' : '')
      + '</span></figcaption></figure>';
  }

  function injectIlus(){
    const body = document.getElementById("theorybody");
    if (!body) return;
    const old = body.querySelector(".ilus-strip"); if (old) old.remove();
    const k = (typeof theoryKey !== "undefined") ? theoryKey : null;
    const figs = ILUSTRACIONES.filter(x => x.tema === k);
    if (!figs.length) return;
    injectCss();
    const strip = document.createElement("aside");
    strip.className = "ilus-strip";
    strip.innerHTML = '<h3>Imágenes del tema · dominio público</h3>'
      + '<div class="ilus-grid">' + figs.map(cardHTML).join("") + '</div>'
      + '<p class="ilus-note">Imágenes libres (dominio público) de <strong>Wikimedia Commons</strong>, elegidas para ilustrar los conceptos de este tema. Pulsa una para verla a pantalla completa.</p>';
    body.appendChild(strip);
    strip.querySelectorAll(".ilus-img").forEach(img =>
      img.addEventListener("click", () => { if (typeof openLightbox === "function") openLightbox(img.src); }));
  }

  // envolver loadTheory para reconstruir la tira al cambiar de tema
  if (typeof loadTheory === "function"){
    const orig = loadTheory;
    loadTheory = function(k){ orig(k); try { injectIlus(); } catch(e){} };
  }
  // primer tema (ya renderizado al cargar theoryview.js)
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectIlus);
  else injectIlus();
})();
