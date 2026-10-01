"use strict";
/* ===== Vista de materiales ===== depende de: materials.js =====
   Filtro por materia (solo en la web completa) y por BLOQUE (rutinas y gestión / trimestre), para
   que la lista no sea una tira de 35 chips: cada material lleva en `tema` «Sesión N» (o «Gestión de
   aula», «Dilemas», «Huella ecológica»), y de ahí sale su grupo. El grupo por defecto es el
   trimestre en curso. Los «cuentos para pensar» (ipc-lec-*) tienen sección propia (cuentosview.js). */

function matIsCuento(k){ return /^ipc-lec-/.test(k) && !/soluciones/.test(k); }

const MATERIAL_SUBJECTS = { fil: "Filosofía 1.º", hf: "Historia de la Filosofía", ipc: "Pensamiento crítico" };
const MAT_GROUPS = { rutinas: "Rutinas y gestión", t1: "1.er trimestre (S1-S22)", t2: "2.º trimestre (S23-S48)", t3: "3.er trimestre (S49-S68)", otros: "Otros" };

/* número de sesión (primero del rango) y grupo de un material */
function matSession(t){ const m = /Sesi[oó]n\s+(\d+)/i.exec(t.tema || ""); return m ? +m[1] : null; }
function matGroup(t){
  const tema = t.tema || "";
  if (/Gesti[oó]n de aula|Dilemas|R[uú]bricas/i.test(tema)) return "rutinas";
  if (/Huella/i.test(tema)) return "t3";
  const s = matSession(t);
  if (s == null) return "otros";
  return s <= 22 ? "t1" : s <= 48 ? "t2" : "t3";
}
/* trimestre en curso: sep-dic → 1.º, ene-mar → 2.º, abr-ago → 3.º */
function matCurrentGroup(){ const m = new Date().getMonth() + 1; return m >= 9 ? "t1" : m <= 3 ? "t2" : "t3"; }
function matLabel(k, t){ const s = matSession(t); const r = /Sesi[oó]n\s+([\d-]+)/i.exec(t.tema || ""); return (r ? "S" + r[1] + " · " : "") + t.title; }

let materialSubject = "all";
let materialGroup = matCurrentGroup();
let materialKey = null;

function matEntries(){
  return Object.entries(MATERIALS).filter(([k, t]) =>
    !matIsCuento(k) && (materialSubject === "all" || t.subject === materialSubject) &&
    (materialGroup === "all" || matGroup(t) === materialGroup)
  ).sort((a, b) => (matSession(a[1]) ?? 999) - (matSession(b[1]) ?? 999));
}
function matGroupsPresent(){
  const set = new Set(Object.entries(MATERIALS).filter(([k, t]) => !matIsCuento(k) && (materialSubject === "all" || t.subject === materialSubject)).map(([k, t]) => matGroup(t)));
  return Object.keys(MAT_GROUPS).filter(g => set.has(g));
}

function renderMaterialFilter(){
  const box = document.getElementById("materialfilter");
  if (!box) return;
  const subjBtns = ["all", "fil", "hf", "ipc"].map(s =>
    '<button class="fbtn" data-subj="' + s + '" aria-pressed="' + (s === materialSubject) + '">' +
    (s === "all" ? "Todas" : MATERIAL_SUBJECTS[s]) + '</button>'
  ).join("");
  const groups = matGroupsPresent();
  const groupBtns = groups.length > 1 ? ["all"].concat(groups).map(g =>
    '<button class="fbtn" data-mgroup="' + g + '" aria-pressed="' + (g === materialGroup) + '">' +
    (g === "all" ? "Todos" : MAT_GROUPS[g]) + '</button>'
  ).join("") : "";
  box.innerHTML = '<div class="fgroup"><span class="flabel">Materia</span>' + subjBtns + '</div>' +
    (groupBtns ? '<div class="fgroup"><span class="flabel">Bloque</span>' + groupBtns + '</div>' : '');
  box.querySelectorAll("[data-subj]").forEach(b => b.addEventListener("click", () => {
    materialSubject = b.dataset.subj;
    renderMaterialFilter();
    renderMaterialChips();
  }));
  box.querySelectorAll("[data-mgroup]").forEach(b => b.addEventListener("click", () => {
    materialGroup = b.dataset.mgroup;
    renderMaterialFilter();
    renderMaterialChips();
  }));
}

function renderMaterialChips(){
  const box = document.getElementById("materialchips");
  if (!box) return;
  const entries = matEntries();
  box.innerHTML = entries
    .map(([k, t]) => '<button class="chip" data-mat="' + k + '" aria-pressed="' + (k === materialKey) + '">' + matLabel(k, t) + '</button>').join("");
  box.querySelectorAll("[data-mat]").forEach(b => b.addEventListener("click", () => loadMaterial(b.dataset.mat)));
  const cnt = document.getElementById("materialcount");
  if (cnt) cnt.textContent = entries.length + (entries.length === 1 ? " material" : " materiales") + (materialGroup === "all" ? "" : " en este bloque");
}

function loadMaterial(k){
  const t = MATERIALS[k];
  if (t && matGroup(t) !== materialGroup && materialGroup !== "all"){ materialGroup = matGroup(t); renderMaterialFilter(); }   // enlace profundo: mostrar su bloque
  materialKey = k;
  renderMaterialChips();
  const body = document.getElementById("materialbody");
  if (!body || !t) return;   // vista de Materiales ausente (webs de alumnado de Bachillerato) o clave inexistente: no hacer nada
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + t.subject + ')">' + t.tema + '</span><h1>' + t.title + '</h1></div>' + t.html;
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "mh-" + i; });
  const toc = document.getElementById("mtoc");
  if (toc) toc.innerHTML = '<div class="toc-title">En este material</div><ol>' +
    hs.map((h, i) => '<li><a href="#mh-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

if (document.getElementById("materialbody")){   // solo si la vista de Materiales existe (no en las webs de alumnado de Bachillerato)
  renderMaterialFilter();
  const first = matEntries()[0] || Object.entries(MATERIALS).filter(([k]) => !matIsCuento(k))[0];
  if (first) loadMaterial(first[0]); else renderMaterialChips();
}
