"use strict";
/* ===== Vista de comentario de texto guiado ===== depende de: comentario.js
   Sigue el patrón de pauview.js: chips + teoría-layout con TOC. */

let comentarioKey = Object.keys(COMENTARIO)[0];

function renderComentarioChips(){
  const box = document.getElementById("comentariochips");
  if (!box) return;
  box.innerHTML = Object.entries(COMENTARIO)
    .map(([k, c]) => '<button class="chip" data-com="' + k + '" aria-pressed="' + (k === comentarioKey) + '">' + c.title + '</button>').join("");
  box.querySelectorAll("[data-com]").forEach(b => b.addEventListener("click", () => loadComentario(b.dataset.com)));
}

function loadComentario(k){
  comentarioKey = k;
  renderComentarioChips();
  const c = COMENTARIO[k], body = document.getElementById("comentariobody");
  if (!c || !body) return;
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + c.subject + ')">' + c.tema + '</span><h1>' + c.title + '</h1></div>' + c.html;
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "ch-" + i; });
  const toc = document.getElementById("comtoc");
  if (toc) toc.innerHTML = '<div class="toc-title">En esta guía</div><ol>' +
    hs.map((h, i) => '<li><a href="#ch-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

renderComentarioChips();
loadComentario(comentarioKey);

/* ---- Enlace "Comentar este texto" desde la vista de Lecturas ---- */
document.addEventListener("click", e => {
  const b = e.target.closest('[data-go="comentario"]');
  if (!b) return;
  show("comentario");
});
