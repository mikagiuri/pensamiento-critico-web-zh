"use strict";
/* ===== Botón «volver arriba» + resaltado de la sección actual en el índice =====
   Mejora los temas largos sin tocar la estructura:
   - Un botón flotante que aparece al bajar y sube al principio (respeta reduce-motion).
   - Scroll-spy: marca en el índice (#toc/#ltoc/…) el apartado que se está leyendo.
   Se basa en el índice que ya construyen las vistas (nav.toc con enlaces #th-N, etc.)
   y en los <h2 id> del cuerpo; funciona aunque el contenido se re-renderice, porque
   calcula la sección actual en cada scroll (no guarda referencias). */
(function(){
  var reduce = function(){ return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; };

  /* ---- botón «volver arriba» ---- */
  var btn = document.createElement("button");
  btn.className = "to-top"; btn.id = "totop"; btn.type = "button";
  btn.setAttribute("aria-label", "Volver arriba"); btn.title = "Volver arriba";
  btn.textContent = "↑";
  btn.hidden = true;
  btn.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });
    var h = document.querySelector(".view.active h1");
    if (h){ h.setAttribute("tabindex", "-1"); try { h.focus({ preventScroll: true }); } catch (e){} }
  });
  document.body.appendChild(btn);

  /* ---- scroll-spy sobre el índice de la vista activa ---- */
  function activeToc(){
    var v = document.querySelector(".view.active"); if (!v) return null;
    var toc = v.querySelector(".toc");
    return toc ? { toc: toc, view: v } : null;
  }
  function update(){
    btn.hidden = (window.scrollY || document.documentElement.scrollTop || 0) < 500;
    var a = activeToc(); if (!a) return;
    var hs = a.view.querySelectorAll(".theory h2[id]");
    if (!hs.length) return;
    var cur = hs[0];
    for (var i = 0; i < hs.length; i++){ if (hs[i].getBoundingClientRect().top <= 90) cur = hs[i]; }
    var href = "#" + cur.id;
    a.toc.querySelectorAll("a").forEach(function(link){
      link.classList.toggle("active", link.getAttribute("href") === href);
    });
  }

  var ticking = false;
  function onScroll(){ if (ticking) return; ticking = true; requestAnimationFrame(function(){ update(); ticking = false; }); }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("hashchange", update);
  document.addEventListener("DOMContentLoaded", update);
  /* re-evalúa al cambiar de vista o de tema (la barra y los índices se pulsan) */
  document.addEventListener("click", function(){ setTimeout(update, 0); }, true);
})();
