"use strict";
/* ===== Vista de recursos ===== depende de: media.js ===== */

let mediaBlock = "A";  /* bloque concreto por defecto, nunca «Todos los bloques» */
const MEDIA_BLOCKS = { A: "Bloque A · Antigua", B: "Bloque B · Medieval-Moderna", C: "Bloque C · Contemporánea" };

function mediaBlockOf(t){
  if (t >= 1 && t <= 10) return "A";
  if (t >= 11 && t <= 17) return "B";
  if (t >= 18 && t <= 27) return "C";
  return null;
}

function renderMediaFilter(){
  const box = document.getElementById("mediafilter");
  const btns = ["all", "A", "B", "C"].map(b =>
    '<button class="fbtn" data-block="' + b + '" aria-pressed="' + (b === mediaBlock) + '">' +
    (b === "all" ? "Todos los bloques" : MEDIA_BLOCKS[b]) + '</button>'
  ).join("");
  box.innerHTML = '<div class="fgroup"><span class="flabel">Bloque</span>' + btns + '</div>';
  box.querySelectorAll("[data-block]").forEach(b => b.addEventListener("click", () => {
    mediaBlock = b.dataset.block;
    renderMediaFilter();
    renderMediaList();
  }));
}

function renderMediaList(){
  const box = document.getElementById("medialist");
  const temas = MEDIA_TEMAS.filter(e => mediaBlock === "all" || mediaBlockOf(e.t) === mediaBlock);
  box.innerHTML = temas.map(e => {
    const v = e.v.map(x => '<li class="m-v">🎬 ' + x + '</li>').join("");
    const i = e.i.map(x => {
      const svg = MEDIA_SVG[x];
      if (svg){
        return '<li class="m-i"><button class="m-thumb" data-svg="' + svg + '" title="Ampliar: ' + x + '">' +
          '<img src="' + svg + '" alt="' + x + '" loading="lazy"></button><span>' + x + '</span></li>';
      }
      return '<li class="m-i">🖼️ ' + x + '</li>';
    }).join("");
    return '<article class="mcard"><h3>Tema ' + e.t + '</h3>' +
      (v ? '<ul class="mlist">' + v + '</ul>' : '') +
      (i ? '<ul class="mlist">' + i + '</ul>' : '') +
      '</article>';
  }).join("");
  box.querySelectorAll("[data-svg]").forEach(b => b.addEventListener("click", () => openLightbox(b.dataset.svg)));
}

function renderMediaExtra(){
  document.getElementById("mediatextos").innerHTML =
    MEDIA_TEXTOS.map(x => '<li class="m-v">🎬 ' + x + '</li>').join("");
  document.getElementById("mediapau").innerHTML =
    MEDIA_PAU.map(x => '<li class="m-v">🎬 ' + x + '</li>').join("");
}

/* ----- visor (lightbox) ----- */
let _mlbPrev = null;
function closeMediaLightbox(){
  const lb = document.getElementById("medialightbox");
  if (lb) lb.classList.remove("open");
  if (_mlbPrev && _mlbPrev.focus){ try { _mlbPrev.focus(); } catch (e){} } _mlbPrev = null;
}
function openLightbox(src){
  let lb = document.getElementById("medialightbox");
  if (!lb){
    lb = document.createElement("div");
    lb.id = "medialightbox";
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Imagen ampliada");
    lb.innerHTML = '<button class="lb-close" aria-label="Cerrar">×</button><img alt="Imagen ampliada">';
    document.body.appendChild(lb);
    lb.addEventListener("click", e => {
      if (e.target === lb || e.target.classList.contains("lb-close")) closeMediaLightbox();
    });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeMediaLightbox();
      else if (e.key === "Tab"){ e.preventDefault(); const c = lb.querySelector(".lb-close"); if (c) c.focus(); }  // foco atrapado (único control)
    });
  }
  _mlbPrev = document.activeElement;
  lb.querySelector("img").src = src;
  lb.classList.add("open");
  const c = lb.querySelector(".lb-close"); if (c) c.focus();
}

if (document.getElementById("medialist")){   // solo si la vista de Recursos existe (no en las webs de alumnado)
  renderMediaFilter();
  renderMediaList();
  renderMediaExtra();
}
