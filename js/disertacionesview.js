"use strict";
/* ===== Vista de disertaciones ===== depende de: disertaciones.js ===== */

let disertKey = Object.keys(DISERTACIONES)[0];
let disertTipo = "guia";  /* tipo concreto por defecto, nunca «Todas» */

const DISERT_TIPOS = { guia: "怎么做", modelo: "范例", comparativa: "对比", temas: "练习用的主题" };

function renderDisertFilter(){
  const box = document.getElementById("disertfilter");
  if (!box) return;
  const btns = ["all", "guia", "modelo", "comparativa", "temas"].map(t =>
    '<button class="fbtn" data-tipo="' + t + '" aria-pressed="' + (t === disertTipo) + '">' +
    (t === "all" ? "全部" : DISERT_TIPOS[t]) + '</button>'
  ).join("");
  box.innerHTML = '<div class="fgroup"><span class="flabel">类型</span>' + btns + '</div>';
  box.querySelectorAll("[data-tipo]").forEach(b => b.addEventListener("click", () => {
    disertTipo = b.dataset.tipo;
    renderDisertFilter();
    renderDisertChips();
  }));
}

function renderDisertChips(){
  const box = document.getElementById("disertchips");
  if (!box) return;
  const entries = Object.entries(DISERTACIONES).filter(([k, d]) =>
    disertTipo === "all" || d.tipo === disertTipo
  );
  box.innerHTML = entries
    .map(([k, d]) => '<button class="chip" data-dis="' + k + '" aria-pressed="' + (k === disertKey) + '">' + d.title + '</button>').join("");
  box.querySelectorAll("[data-dis]").forEach(b => b.addEventListener("click", () => loadDisert(b.dataset.dis)));
}

function loadDisert(k){
  disertKey = k;
  renderDisertChips();
  const d = DISERTACIONES[k], body = document.getElementById("disertbody");
  if (!d || !body) return;
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + d.subject + ')">' + d.kick + '</span><h1>' + d.title + '</h1></div>' + d.html;
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "dh-" + i; });
  const toc = document.getElementById("diserttoc");
  if (toc) toc.innerHTML = '<div class="toc-title">本篇论述中</div><ol>' +
    hs.map((h, i) => '<li><a href="#dh-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

renderDisertFilter();
if (disertKey) loadDisert(disertKey);
