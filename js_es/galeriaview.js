"use strict";
/* ===== Vista Galería ===== depende de: galeria.js =====
   Rejilla de ilustraciones del libro (material propio, generado). Filtro por bloque
   y visor a pantalla (lightbox) con anterior/siguiente. Estilos propios con tokens de tema. */

const GAL_BLOCKS = { A: "Antigua", B: "Medieval-Moderna", C: "Contemporánea" };
/* Filosofía 1.º: suma las ilustraciones de tema (dominio público) como grupo propio «F1»
   de la Galería. Depende de ilustraciones_fil.js (cargado antes). El crédito va en el pie. */
function galAddIlus(list, bloque, nombre){
  GAL_BLOCKS[bloque] = nombre;
  list.forEach(function (x){
    GALERIA.push({ f: x.f, t: x.t, pie: x.pie, bloque: bloque,
      unidad: nombre + " · " + (x.license || "Dominio público") + " · Wikimedia Commons" });
  });
}
if (typeof ILUSTRACIONES !== "undefined" && Array.isArray(GALERIA)) galAddIlus(ILUSTRACIONES, "F1", "Filosofía 1.º");
/* 1.º y 2.º de Bachillerato: «Arte y pensamiento crítico» (galeria_pensar.js), grupo «PC». */
if (typeof GALERIA_PENSAR !== "undefined" && Array.isArray(GALERIA)) galAddIlus(GALERIA_PENSAR, "PC", "Arte y pensamiento crítico");
/* 2.º ESO: la Galería son los dibujos de los «Cuentos para pensar», sacados del propio texto de cada
   cuento (MATERIALS ipc-lec-*, primer <img> + su <figcaption>). En Bachillerato MATERIALS llega vacío. */
if (typeof MATERIALS !== "undefined" && Array.isArray(GALERIA)){
  const cu = Object.keys(MATERIALS).filter(function (k){ return /^ipc-lec-/.test(k) && !/soluciones/.test(k); });
  cu.forEach(function (k){
    const html = String(MATERIALS[k].html || "");
    const img = html.match(/<img[^>]*\ssrc="([^"]+)"[^>]*>/);
    if (!img) return;
    const cap = html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);
    const alt = img[0].match(/\salt="([^"]*)"/);
    GAL_BLOCKS.CU = "Cuentos para pensar";
    GALERIA.push({ f: img[1], t: MATERIALS[k].title, pie: (cap ? cap[1] : (alt ? alt[1] : "")).replace(/<[^>]+>/g, ""),
      bloque: "CU", unidad: "Cuentos para pensar" });
  });
}
/* bloques con alguna imagen (en las webs por materia GALERIA llega ya filtrada: 1.º trae «F1» y «PC»; ESO, «CU») */
function galBlocksPresent(){ return Object.keys(GAL_BLOCKS).filter(function (b){ return GALERIA.some(function (g){ return g.bloque === b; }); }); }
let galBloque = galBlocksPresent()[0] || "all";  /* bloque concreto por defecto, nunca «Todos» */
let galList = [];
let galPos = 0;

const GAL_CSS = `
#galeria .galgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(170px,100%),1fr));gap:12px;margin-top:12px}
#galeria .galcard{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface);cursor:zoom-in;box-shadow:var(--shadow);text-align:left;padding:0;font:inherit;color:inherit}
#galeria .galcard img{display:block;width:100%;height:150px;object-fit:cover;background:var(--surface-2)}
#galeria .galcard .cap{padding:8px 11px;font-size:13px;line-height:1.35;color:var(--ink)}
#galeria .galcard:hover{border-color:var(--accent)}
#galeria .galcount{color:var(--muted);font-size:13px;margin:10px 0}
.gallb{position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;padding:16px;z-index:200}
.gallb[hidden]{display:none}
.gallb .box{position:relative;max-width:min(940px,96vw);max-height:94vh;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.gallb img{max-width:100%;max-height:72vh;object-fit:contain;background:var(--surface-2)}
.gallb .meta{padding:12px 16px}
.gallb .meta h4{margin:0 0 3px;font-family:var(--serif);font-size:18px;color:var(--ink)}
.gallb .meta p{margin:0;color:var(--muted);font-size:13.5px}
.gallb .close{position:absolute;top:8px;right:10px;width:40px;height:40px;font-size:24px;line-height:1;background:rgba(0,0,0,.35);border:0;color:#fff;border-radius:10px;cursor:pointer}
.gallb .nav{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:60px;font-size:26px;background:rgba(0,0,0,.35);border:0;color:#fff;cursor:pointer}
.gallb .prev{left:6px;border-radius:0 10px 10px 0}
.gallb .next{right:6px;border-radius:10px 0 0 10px}
@media (max-width:520px){ #galeria .galgrid{grid-template-columns:repeat(auto-fill,minmax(min(140px,100%),1fr))} #galeria .galcard img{height:120px} }
`;
let _galCss = false, _lb = null, _galPrev = null;
function galInject(){
  if (_galCss) return;
  const s = document.createElement("style"); s.textContent = GAL_CSS; document.head.appendChild(s);
  _lb = document.createElement("div"); _lb.className = "gallb"; _lb.hidden = true;
  _lb.setAttribute("role", "dialog"); _lb.setAttribute("aria-modal", "true"); _lb.setAttribute("aria-label", "Visor de la galería");
  _lb.innerHTML = '<div class="box"><button class="nav prev" aria-label="Anterior">‹</button>' +
    '<img id="gallbimg" alt=""><div class="meta"><h4 id="gallbt"></h4><p id="gallbp"></p></div>' +
    '<button class="nav next" aria-label="Siguiente">›</button><button class="close" aria-label="Cerrar">×</button></div>';
  document.body.appendChild(_lb);
  _lb.querySelector(".close").addEventListener("click", galClose);
  _lb.querySelector(".prev").addEventListener("click", function (e){ e.stopPropagation(); galStep(-1); });
  _lb.querySelector(".next").addEventListener("click", function (e){ e.stopPropagation(); galStep(1); });
  _lb.addEventListener("click", function (e){ if (e.target === _lb) galClose(); });
  document.addEventListener("keydown", function (e){
    if (_lb.hidden) return;
    if (e.key === "Escape") galClose();
    else if (e.key === "ArrowLeft") galStep(-1);
    else if (e.key === "ArrowRight") galStep(1);
    else if (e.key === "Tab"){   // atrapar el foco dentro del visor
      const f = _lb.querySelectorAll("button"); if (!f.length) return;
      const first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (e.shiftKey && (a === first || !_lb.contains(a))){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (a === last || !_lb.contains(a))){ e.preventDefault(); first.focus(); }
    }
  });
  _galCss = true;
}

function galFiltered(){ return GALERIA.filter(function (g){ return galBloque === "all" || g.bloque === galBloque; }); }

function renderGalFilter(){
  const box = document.getElementById("galfilter");
  if (!box) return;
  galInject();
  const present = galBlocksPresent();
  if (present.length < 2){ box.innerHTML = ""; return; }   /* un solo grupo: sin filtro */
  box.innerHTML = '<div class="fgroup"><span class="flabel">Bloque</span>' +
    ["all"].concat(present).map(function (b){
      return '<button class="fbtn" data-gb="' + b + '" aria-pressed="' + (b === galBloque) + '">' +
        (b === "all" ? "Todos" : GAL_BLOCKS[b]) + '</button>'; }).join("") + '</div>';
  box.querySelectorAll("[data-gb]").forEach(function (b){ b.addEventListener("click", function (){
    galBloque = b.dataset.gb; renderGalFilter(); renderGalGrid(); }); });
}

function renderGalGrid(){
  const grid = document.getElementById("galgrid");
  const cnt = document.getElementById("galcount");
  if (!grid) return;
  galList = galFiltered();
  if (cnt) cnt.textContent = galList.length + (galList.length === 1 ? " ilustración" : " ilustraciones") +
    (galList.length !== GALERIA.length ? " (de " + GALERIA.length + ")" : "");
  grid.innerHTML = galList.map(function (g, i){
    return '<button class="galcard" data-i="' + i + '"><img loading="lazy" src="' + g.f + '" alt="' + g.t.replace(/"/g, "&quot;") + '"><div class="cap">' + g.t + '</div></button>';
  }).join("");
  grid.querySelectorAll(".galcard").forEach(function (b){ b.addEventListener("click", function (){ galOpen(+b.dataset.i); }); });
}

function galEsc(s){ return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function galShow(){
  const g = galList[galPos]; if (!g) return;
  document.getElementById("gallbimg").src = g.f;
  document.getElementById("gallbt").textContent = g.t;
  const cred = (g.pie ? g.pie + " · " : "") + (g.unidad || "");
  document.getElementById("gallbp").innerHTML = galEsc(cred) +
    (g.page ? ' · <a href="' + galEsc(g.page) + '" target="_blank" rel="noopener">Ver origen</a>' : "");
}
function galOpen(i){ galInject(); _galPrev = document.activeElement; galPos = i; galShow(); _lb.hidden = false;
  const c = _lb.querySelector(".close"); if (c) c.focus(); }
function galClose(){ if (_lb) _lb.hidden = true;
  if (_galPrev && _galPrev.focus){ try { _galPrev.focus(); } catch (e){} } _galPrev = null; }
function galStep(d){ galPos = (galPos + d + galList.length) % galList.length; galShow(); }

renderGalFilter();
renderGalGrid();
