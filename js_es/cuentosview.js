"use strict";
/* ===== Vista Cuentos ===== depende de: materials.js (MATERIALS) =====
   «Cuentos para pensar» de Pensamiento crítico (2.º ESO): las lecturas ipc-lec-* de MATERIALS,
   con sección propia (chips + índice + texto), separadas de los Materiales de sesión.
   La hoja del profesor (ipc-lec-soluciones) no entra: la retira studentizeCollection y aquí se excluye. */

function isCuento(k){ return /^ipc-lec-/.test(k) && !/soluciones/.test(k); }
function cuentoKeys(){ return typeof MATERIALS === "undefined" ? [] : Object.keys(MATERIALS).filter(isCuento); }

let cuentoKey = cuentoKeys()[0] || null;

function renderCuentoChips(){
  const box = document.getElementById("cuentochips");
  if (!box) return;
  box.innerHTML = cuentoKeys()
    .map(k => '<button class="chip" data-cuento="' + k + '" aria-pressed="' + (k === cuentoKey) + '">' + MATERIALS[k].title + '</button>').join("");
  box.querySelectorAll("[data-cuento]").forEach(b => b.addEventListener("click", () => loadCuento(b.dataset.cuento)));
}

function loadCuento(k){
  if (!isCuento(k) || !MATERIALS[k]) k = cuentoKeys()[0];
  cuentoKey = k;
  renderCuentoChips();
  const t = k && MATERIALS[k], body = document.getElementById("cuentobody");
  if (!body) return;
  const cnt = document.getElementById("cuentocount");
  if (cnt) cnt.textContent = cuentoKeys().length + " cuentos";
  if (!t){ body.innerHTML = '<p class="lead">No hay cuentos en esta web.</p>'; return; }
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + t.subject + ')">Cuentos para pensar</span><h1>' + t.title + '</h1></div>' + t.html;
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "ch-" + i; });
  const toc = document.getElementById("ctoc");
  if (toc) toc.innerHTML = '<div class="toc-title">En este cuento</div><ol>' +
    hs.map((h, i) => '<li><a href="#ch-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

if (document.getElementById("cuentobody")) loadCuento(cuentoKey);
