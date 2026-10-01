"use strict";
/* ===== Móvil compacto (29-09-2026) =====
   En pantalla estrecha, antes de leer un tema se pasaba por cinco pantallas de controles: entradilla, filtro de
   bloque, la lista de temas (27 chips en HF), el índice completo y la tira de enlaces. Criterio del profesor:
   cabecera → título del tema → texto, en una pantalla. Este módulo, solo con CSS de mobile.css (≤760 px):
   · pliega los filtros y la lista de temas de cada vista en UNA línea con lo elegido («Platón: la teoría… ▾»),
     que se despliega al tocar y se vuelve a plegar al elegir;
   · pliega el índice («En este tema ▾»), cerrado por defecto;
   · mobile.css oculta además la entradilla de las vistas que tienen ese plegado.
   No toca las vistas: inserta un botón antes de los controles y otro antes del índice, y los mantiene al día con
   un MutationObserver (las vistas repintan sus chips e índices con innerHTML). Sin textos nuevos: la etiqueta es
   la del chip/filtro activo o el título del propio índice. En escritorio los botones no se muestran. */
(function(){
  function strip(s){ return String(s == null ? "" : s).replace(/\s+/g, " ").trim(); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var CTL = ":scope > .filterbar, :scope > .chips, :scope > .crono-filter, :scope > .crono-chips";

  function label(sec){
    var chip = sec.querySelector(":scope > .chips [aria-pressed='true'], :scope > .crono-chips [aria-pressed='true']");
    if (chip) return strip(chip.textContent);
    return [].map.call(sec.querySelectorAll(":scope > .filterbar [aria-pressed='true'], :scope > .crono-filter [aria-pressed='true']"), function(b){
      /* los filtros de materia van ocultos en las webs de una materia: no se nombran */
      return b.closest(".fgroup") && b.closest(".fgroup").querySelector("[data-subj],[data-sa]") ? "" : strip(b.textContent);
    }).filter(Boolean).join(" · ");
  }
  function ensureCtl(sec){
    var ctl = sec.querySelector(CTL); if (!ctl) return;
    var btn = sec.querySelector(":scope > .ctl-toggle");
    if (!btn){
      btn = document.createElement("button"); btn.type = "button"; btn.className = "ctl-toggle"; btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function(){ var on = sec.classList.toggle("ctl-open"); btn.setAttribute("aria-expanded", String(on)); });
      sec.insertBefore(btn, ctl);
    }
    var l = label(sec);
    btn.innerHTML = '<span class="ctl-l">' + esc(l) + '</span><span class="ctl-caret" aria-hidden="true">▾</span>';
    btn.hidden = !l;
  }
  function ensureToc(toc){
    var lay = toc.parentNode; if (!lay || !lay.classList.contains("theory-layout")) return;
    var btn = lay.querySelector(":scope > .toc-toggle");
    if (!btn){
      btn = document.createElement("button"); btn.type = "button"; btn.className = "toc-toggle"; btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function(){ var on = lay.classList.toggle("toc-open"); btn.setAttribute("aria-expanded", String(on)); });
      lay.insertBefore(btn, toc);
    }
    var t = toc.querySelector(".toc-title"), n = toc.querySelectorAll("a").length;
    btn.innerHTML = '<span class="ctl-l">' + esc(t ? strip(t.textContent) : "") + (n ? ' <i>' + n + '</i>' : '') + '</span><span class="ctl-caret" aria-hidden="true">▾</span>';
    btn.hidden = !n;
  }
  var pending = false;
  function refresh(){
    pending = false;
    document.querySelectorAll(".view").forEach(ensureCtl);
    document.querySelectorAll(".view .theory-layout > .toc").forEach(ensureToc);
  }
  function schedule(){ if (pending) return; pending = true; setTimeout(refresh, 0); }

  /* al elegir un chip o filtro dentro del panel desplegado, se vuelve a plegar */
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest(".chip, .fbtn"); if (!b) return;
    var sec = b.closest(".view"); if (!sec || !sec.classList.contains("ctl-open")) return;
    if (!b.closest(CTL.split(", ").map(function(s){ return s.replace(":scope > ", ".view > "); }).join(", "))) return;
    if (b.classList.contains("chip")) { sec.classList.remove("ctl-open"); var t = sec.querySelector(":scope > .ctl-toggle"); if (t) t.setAttribute("aria-expanded", "false"); }
  }, true);   // en captura: la vista repinta los chips (innerHTML) en su propio listener y el botón ya no estaría en el DOM
  /* al cambiar de vista, todo plegado */
  if (typeof window.show === "function"){
    var orig = window.show;
    window.show = function(id){ orig.apply(this, arguments); document.querySelectorAll(".view.ctl-open").forEach(function(v){ v.classList.remove("ctl-open"); }); document.querySelectorAll(".toc-open").forEach(function(v){ v.classList.remove("toc-open"); }); schedule(); };
  }
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
  refresh();
})();
