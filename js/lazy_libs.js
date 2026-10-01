"use strict";
/* ===== Carga perezosa de las librerías de diagramas =====
   mermaid (Esquemas) y markmap-autoloader (Mapas) son ~1,5 MB de CDN que antes se
   cargaban SIEMPRE al arrancar. Aquí se inyectan solo la primera vez que se abre su
   vista. Ambas vistas ya reintentan dibujar mientras su librería no esté lista, así
   que basta con inyectar el script y disparar su dibujo.
   markmap va en modo `manual` (ver index.html): sus dependencias (d3…) solo se cargan
   al llamar a autoLoader.renderAll(), así que se llama tras cargar el autoloader.
   Se envuelve show() (ya envuelto por navctx) para captar toda navegación —barra,
   buscador, hub, enlaces «De este tema», enrutado por hash—. */
(function(){
  var MERMAID = "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js";
  var MARKMAP = "https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18.10";
  var done = {};

  function injectMermaid(){
    if (done[MERMAID]) return; done[MERMAID] = true;
    var s = document.createElement("script"); s.src = MERMAID; s.async = true;
    document.head.appendChild(s);   // esquemasview reintenta hasta que exista el global `mermaid`
  }
  function injectMarkmap(){
    if (done[MARKMAP]) return; done[MARKMAP] = true;
    var s = document.createElement("script"); s.src = MARKMAP; s.async = true;
    s.onload = function(){
      try { var al = window.markmap && window.markmap.autoLoader;
        if (al && typeof al.renderAll === "function") al.renderAll(); } catch (e){}   // dispara la carga de dependencias (modo manual)
      if (typeof drawMap === "function") requestAnimationFrame(drawMap);
    };
    document.head.appendChild(s);
  }
  function needFor(id){
    if (id === "esquemas"){ injectMermaid(); if (typeof drawEsq === "function") drawEsq(); }
    else if (id === "mapas"){ injectMarkmap(); if (typeof drawMap === "function") requestAnimationFrame(drawMap); }
  }

  if (typeof window.show === "function"){
    var orig = window.show;
    window.show = function(id){ orig(id); needFor(id); };
  }
  function fromHash(){ var id = (location.hash || "").replace(/^#/, ""); if (id) needFor(id); }
  window.addEventListener("hashchange", fromHash);
  document.addEventListener("DOMContentLoaded", fromHash);
})();
