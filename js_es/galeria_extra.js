"use strict";
/* ===== Galería · buscador + etiqueta IA ===== depende de: galeria.js, galeria_museo.js, galeriaview.js
   Sin editar galeria.js ni galeriaview.js: envuelve galFiltered() y renderGalGrid().
   Las imágenes generadas con IA (g.ia === true) se OCULTAN por defecto y solo se muestran
   si el usuario activa «Mostrar dibujos de IA». Además, un buscador filtra por texto. */
(function(){
  if (typeof GALERIA === "undefined" || typeof renderGalGrid !== "function") return;
  var galQuery = "", galShowIA = false;

  var css =
    '#galeria .galtools{display:flex;flex-wrap:wrap;gap:.6rem 1rem;align-items:center;margin:.7rem 0 .2rem}' +
    '#galeria .galsearch{flex:1 1 240px;min-width:180px;font:inherit;padding:.5rem .75rem;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink)}' +
    '#galeria .galsearch:focus{outline:2px solid var(--accent);outline-offset:1px}' +
    '#galeria .galia{display:inline-flex;align-items:center;gap:.4rem;font-size:.86rem;color:var(--muted);cursor:pointer;user-select:none;white-space:nowrap}' +
    '#galeria .galia input{width:1rem;height:1rem;accent-color:var(--accent)}' +
    '#galeria .galcard{position:relative}' +
    '#galeria .galcard.is-ia::after{content:"IA";position:absolute;top:7px;left:7px;font-size:11px;font-weight:600;letter-spacing:.05em;' +
    'padding:3px 6px;border-radius:6px;background:color-mix(in srgb,var(--accent) 85%,#000);color:var(--on-accent,#fff);box-shadow:0 1px 3px rgba(0,0,0,.35)}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  // envolver el filtro: oculta IA (salvo que se active) y aplica la búsqueda
  if (typeof galFiltered === "function"){
    var origFilter = galFiltered;
    galFiltered = function(){
      var q = galQuery.trim().toLowerCase();
      return origFilter().filter(function(g){
        if (g.ia && !galShowIA) return false;
        if (q){ var hay = ((g.t || "") + " " + (g.pie || "") + " " + (g.unidad || "")).toLowerCase(); if (hay.indexOf(q) < 0) return false; }
        return true;
      });
    };
  }
  // envolver el render: marca con «IA» las tarjetas generadas
  var origRender = renderGalGrid;
  renderGalGrid = function(){
    origRender();
    try {
      var cards = document.querySelectorAll("#galgrid .galcard");
      for (var i = 0; i < cards.length; i++){ if (typeof galList !== "undefined" && galList[i] && galList[i].ia) cards[i].classList.add("is-ia"); }
    } catch(e){}
  };

  function mount(){
    var filt = document.getElementById("galfilter");
    if (!filt || !filt.parentNode) return false;
    if (document.getElementById("galsearchbox")) return true;
    var bar = document.createElement("div");
    bar.className = "galtools";
    bar.innerHTML =
      '<input id="galsearchbox" class="galsearch" type="search" placeholder="Buscar por nombre, autor o tema…" aria-label="Buscar en la galería">' +
      '<label class="galia" title="Los dibujos del libro están generados con IA; actívalo para verlos"><input type="checkbox" id="galiatoggle"> Mostrar dibujos de IA</label>';
    filt.parentNode.insertBefore(bar, filt.nextSibling);
    document.getElementById("galsearchbox").addEventListener("input", function(e){ galQuery = e.target.value; renderGalGrid(); });
    document.getElementById("galiatoggle").addEventListener("change", function(e){ galShowIA = e.target.checked; renderGalGrid(); });
    return true;
  }
  if (!mount()){
    var iv = setInterval(function(){ if (mount()) clearInterval(iv); }, 200);
    setTimeout(function(){ clearInterval(iv); }, 4000);
  }
  renderGalGrid();   // re-render inicial: IA oculta por defecto
})();
