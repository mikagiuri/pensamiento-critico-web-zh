"use strict";
/* ===== Vista de Preparación PAU ===== depende de: pau.js ===== */

let pauKey = Object.keys(PAU)[0];

function renderPauChips(){
  const box = document.getElementById("pauchips");
  if (!box) return;
  box.innerHTML = Object.entries(PAU)
    .map(([k, p]) => '<button class="chip" data-pau="' + k + '" aria-pressed="' + (k === pauKey) + '">' + p.title + '</button>').join("");
  box.querySelectorAll("[data-pau]").forEach(b => b.addEventListener("click", () => loadPau(b.dataset.pau)));
}

function loadPau(k){
  pauKey = k;
  renderPauChips();
  const p = PAU[k], body = document.getElementById("paubody");
  if (!p || !body) return;
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + p.subject + ')">' + p.kick + '</span><h1>' + p.title + '</h1></div>' + p.html;
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "ph-" + i; });
  const toc = document.getElementById("pautoc");
  if (toc) toc.innerHTML = '<div class="toc-title">En esta guía</div><ol>' +
    hs.map((h, i) => '<li><a href="#ph-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

renderPauChips();
if (pauKey) loadPau(pauKey);
