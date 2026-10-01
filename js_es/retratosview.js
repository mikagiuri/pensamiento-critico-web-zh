"use strict";
/* ===== Retratos de museo en la teoría ===== depende de: retratos_museo.js, theoryview.js
   Sin tocar theory.js ni theoryview.js: envuelve loadTheory() y, tras renderizar una unidad,
   detecta los autores/temas citados y añade debajo una tira de imágenes de dominio público
   (Wikimedia Commons) con su atribución. Las imágenes abren el lightbox de la teoría. */
(function(){
  if (typeof RETRATOS === "undefined") return;

  function esc(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  // índice de la primera aparición del alias como palabra (respeta acentos)
  function firstIndex(text, alias){
    let re;
    try { re = new RegExp("(?<![\\p{L}\\p{N}])" + esc(alias) + "(?![\\p{L}\\p{N}])", "u"); }
    catch(e){ re = new RegExp("\\b" + esc(alias) + "\\b"); }
    const m = re.exec(text);
    return m ? m.index : -1;
  }

  function pickFigures(text){
    const found = [];
    RETRATOS.forEach(r => {
      let best = Infinity;
      (r.aliases || [r.name]).forEach(a => { const i = firstIndex(text, a); if (i >= 0 && i < best) best = i; });
      if (best < Infinity) found.push({ r, at: best });
    });
    found.sort((a, b) => a.at - b.at);
    return found.slice(0, 18).map(x => x.r);
  }

  function cardHTML(r){
    const cred = [r.title, r.artist && r.artist !== "Desconocido" && r.artist !== "Unknown author" ? r.artist : ""]
      .filter(Boolean).join(" · ");
    return '<figure class="museo-card">' +
      '<img class="figimg museo-img" loading="lazy" src="' + r.file + '" alt="' + r.name + '">' +
      '<figcaption><b>' + r.name + '</b>' +
      (cred ? '<span class="museo-cred">' + cred + '</span>' : '') +
      '<span class="museo-lic">' + r.license + ' · <a href="' + r.page + '" target="_blank" rel="noopener">Wikimedia Commons</a></span>' +
      '</figcaption></figure>';
  }

  function injectMuseo(){
    const body = document.getElementById("theorybody");
    if (!body) return;
    const old = body.querySelector(".museo-strip"); if (old) old.remove();
    const figs = pickFigures(body.textContent || "");
    if (!figs.length) return;
    const strip = document.createElement("aside");
    strip.className = "museo-strip";
    strip.innerHTML = '<h3>Retratos y obras · imágenes de dominio público</h3>' +
      '<div class="museo-grid">' + figs.map(cardHTML).join("") + '</div>' +
      '<p class="museo-note">Imágenes libres (dominio público / CC) recopiladas de <strong>Wikimedia Commons</strong>. ' +
      'Cada pie enlaza a la ficha original con su autoría y licencia. Corresponden a los autores y temas citados en esta unidad.</p>';
    body.appendChild(strip);
    strip.querySelectorAll(".museo-img").forEach(img =>
      img.addEventListener("click", () => { if (typeof openLightbox === "function") openLightbox(img.src); }));
  }

  // envolver loadTheory para que la tira se reconstruya al cambiar de unidad
  if (typeof loadTheory === "function"){
    const orig = loadTheory;
    loadTheory = function(k){ orig(k); try { injectMuseo(); } catch(e){} };
  }
  // primera unidad (ya renderizada al cargar theoryview.js)
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injectMuseo);
  else injectMuseo();
})();
