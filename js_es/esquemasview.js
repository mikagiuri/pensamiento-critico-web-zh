"use strict";
/* ===== Vista Esquemas ===== depende de: esquemas.js + mermaid (CDN) =====
   Renderiza los grafos conceptuales del libro (bloques [RELACIONA]) como
   diagramas mermaid. mermaid se carga por CDN (funciona en el artefacto y
   standalone). Se re-dibuja al cambiar de tema claro/oscuro. */

let esqKey = Object.keys(ESQUEMAS)[0];
let esqBlock = ["A", "B", "C"].find(function (b){ return Object.keys(ESQUEMAS).some(function (k){ return ESQUEMAS[k].block === b; }); }) || "all";  /* bloque concreto por defecto, nunca «Todos» */
let _mid = 0, _esqTheme = null;
const ESQ_BLOCKS = { A: "Antigua", B: "Medieval-Moderna", C: "Contemporánea", F1: "Filosofía 1.º" };
/* Suma los esquemas de Filosofía 1.º (grupo «F1», datos en esquemas_fil.js) al objeto ESQUEMAS. */
if (typeof ESQUEMAS !== "undefined" && typeof ESQUEMAS_FIL !== "undefined") Object.assign(ESQUEMAS, ESQUEMAS_FIL);

const ESQ_CSS = `
#esquemas .mapstage{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;overflow:auto}
#esquemas #esqsvg{min-height:120px;display:block}
#esquemas #esqsvg svg{display:block;margin:0 auto;max-width:none;height:auto}
#esquemas .esq-wait{color:var(--muted);padding:26px 4px;text-align:center}
/* ---- esquema v2 (HTML propio): legible en el móvil, colores del tema ---- */
#esquemas #esqsvg.v2{display:block}
/* con esquema v2, la cabecera sigue el tema (la crema era para el fondo blanco del mermaid) */
#esquemas .mapstage.v2 .maphead{background:transparent;border-bottom:1px solid var(--line);padding:4px 0 12px;margin-bottom:12px}
#esquemas .mapstage.v2 .maphead h2{color:var(--ink);font-size:1.45rem}
.esq2{--c:var(--hf);font-family:var(--sans);color:var(--ink);font-size:16px;line-height:1.45}
.esq2[data-s="fil"]{--c:var(--fil)} .esq2[data-s="ipc"]{--c:var(--ipc)}
.esq2-q{font-family:var(--serif);font-size:1.15rem;font-style:italic;color:var(--muted);margin:2px 0 14px}
.esq2-root{display:inline-block;background:var(--c);color:var(--surface);font-weight:700;letter-spacing:.02em;border-radius:10px;padding:9px 16px;font-size:1.05rem}
.esq2-root-d{margin:8px 0 0;color:var(--muted);font-size:.95rem;max-width:62ch}
.esq2-ramas{list-style:none;margin:16px 0 0;padding:0;display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.esq2-rama{border:1px solid var(--line);border-top:4px solid var(--c);border-radius:12px;background:var(--surface-2);padding:12px 14px 14px}
.esq2-rel{display:block;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--c);margin:0 0 3px}
.esq2-t{font-weight:700;font-size:1.02rem}
.esq2-k>.esq2-t{color:var(--c)}
.esq2-d{margin:3px 0 0;font-size:.95rem}
.esq2-a{margin:4px 0 0;font-size:.9rem;color:var(--muted);font-style:italic}
.esq2-hijos{list-style:none;margin:10px 0 0 4px;padding:0 0 0 14px;border-left:2px solid var(--line)}
.esq2-hijos>li{position:relative;margin:0 0 10px}
.esq2-hijos>li:last-child{margin-bottom:0}
.esq2-hijos>li::before{content:"";position:absolute;left:-14px;top:.8em;width:10px;border-top:2px solid var(--line)}
.esq2-hijos .esq2-rel{color:var(--muted)}
.esq2-cruces{margin:16px 0 0;padding:12px 14px;border:1px dashed var(--line);border-radius:12px}
.esq2-cruces h3,.esq2-idea h3{font:600 .8rem var(--sans);text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:0 0 6px}
.esq2-cruces ul{margin:0;padding-left:1.1em}
.esq2-cruces li{margin:3px 0}
.esq2-cruces em{color:var(--c);font-style:normal;font-weight:600}
.esq2-xrel{display:block;color:var(--muted);font-size:.9rem}
.esq2-idea{margin:14px 0 0;padding:12px 14px;border-radius:12px;background:var(--surface-2);border-left:4px solid var(--c)}
.esq2-idea p{margin:0}
.esq2-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0}
.esq2-q-diag{font-family:var(--serif);font-style:italic;color:var(--muted);margin:0 0 10px;text-align:center}
.esq2-hint{color:var(--muted);font-size:.85rem;margin:8px 0 0;text-align:center}
.esq2-zoom{position:sticky;left:0;display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 8px}
.esq2-zoom .fbtn{min-width:40px;min-height:36px}
.esq2-xtog{margin-left:auto;display:flex;align-items:center;gap:6px;font-size:.9rem;color:var(--muted);cursor:pointer;white-space:nowrap}   /* si no cabe, baja entero a su línea (en el móvil se partía en tres) */
.esq2-xtog input{width:18px;height:18px}
.esq2-zpct{min-width:3.2em;text-align:center;color:var(--muted);font-size:.85rem}
#esquemas .esq2-cross path{fill:none;stroke:var(--c,var(--hf));stroke-width:1.6;stroke-dasharray:5 4}
#esquemas .esq2-cross marker path{fill:var(--c,var(--hf));stroke:none}
#esquemas .esq2-cross text{font:italic 13px var(--sans);fill:var(--ink);text-anchor:middle;dominant-baseline:middle}
#esquemas .esq2-cross rect{fill:var(--surface);stroke:var(--line)}
#esquemas .mapstage.v2 #esqsvg svg .nodeLabel{font-size:15px}
/* etiquetas de las flechas con el fondo de la página (mermaid les pone un gris fijo) */
#esquemas #esqsvg .edgeLabel,#esquemas #esqsvg .edgeLabel p,#esquemas #esqsvg .labelBkg{background-color:var(--surface)!important;color:var(--muted)!important;font-size:13.5px}
#esquemas #esqsvg .edgeLabel rect{fill:var(--surface)!important;opacity:1}
/* 4 ramas: 2 × 2 (con 3 + 1 quedaba una columna huérfana) */
@media (min-width:760px){.esq2-ramas[data-n="4"]{grid-template-columns:repeat(2,1fr)}}   /* por debajo, auto-fit (1 columna si no caben dos de 250 px) */
@media (max-width:520px){.esq2{font-size:15.5px}.esq2-ramas{grid-template-columns:1fr}}
@media print{.esq2-tabs,.esq2-hint{display:none}.esq2-rama{break-inside:avoid}}
`;
let _esqCssDone = false;
function esqInjectCss(){ if (_esqCssDone) return; const s = document.createElement("style"); s.textContent = ESQ_CSS; document.head.appendChild(s); _esqCssDone = true; }

function esqThemeName(){
  const t = document.documentElement.getAttribute("data-theme");
  if (t === "dark") return "dark";
  if (t === "light") return "default";
  return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "default";
}

function esqInit(){
  if (typeof mermaid === "undefined") return false;
  const th = esqThemeName();
  mermaid.initialize({
    startOnLoad: false, securityLevel: "loose", theme: th,
    flowchart: { htmlLabels: true, curve: "basis", padding: 14, nodeSpacing: 22, rankSpacing: 42, wrappingWidth: 170, useMaxWidth: false },   /* tamaño real: se desliza en vez de encogerse (en el móvil quedaba a ~4,6 px) */
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
  });
  _esqTheme = th;
  return true;
}

function renderEsqFilter(){
  const box = document.getElementById("esqfilter");
  if (!box) return;
  /* solo los bloques que tienen esquemas en esta web (en la de 1.º no salen Antigua/Moderna/…) */
  const have = ["A", "B", "C", "F1"].filter(function (b){ return Object.keys(ESQUEMAS).some(function (k){ return ESQUEMAS[k].block === b; }); });
  if (have.length < 2){ box.innerHTML = ""; esqBlock = "all"; return; }
  if (esqBlock !== "all" && have.indexOf(esqBlock) < 0) esqBlock = have[0];
  box.innerHTML = '<div class="fgroup"><span class="flabel">Bloque</span>' +
    ["all"].concat(have).map(function (b){
      return '<button class="fbtn" data-eb="' + b + '" aria-pressed="' + (b === esqBlock) + '">' +
        (b === "all" ? "Todos" : ESQ_BLOCKS[b]) + '</button>'; }).join("") + '</div>';
  box.querySelectorAll("[data-eb]").forEach(function (b){ b.addEventListener("click", function (){
    esqBlock = b.dataset.eb; renderEsqFilter(); renderEsqChips(); }); });
}

function renderEsqChips(){
  const box = document.getElementById("esqchips");
  if (!box) return;
  /* (30-09) temas 1-2 de HF (introductorios): solo con «Todos» (epocas.js) */
  const entries = Object.entries(ESQUEMAS).filter(function (e){ return esqBlock === "all" || (e[1].block === esqBlock && !(window.Epocas && window.Epocas.soloTodos("esquemas", e[0]))); });
  box.innerHTML = entries.map(function (e){
    return '<button class="chip" data-eq="' + e[0] + '" aria-pressed="' + (e[0] === esqKey) + '">' + e[1].title + '</button>'; }).join("");
  box.querySelectorAll("[data-eq]").forEach(function (b){ b.addEventListener("click", function (){ loadEsq(b.dataset.eq); }); });
}

/* ---- Esquema v2: HTML propio a partir de e.v2 (ver el formato al final de esquemas.js).
   Se prefiere al mermaid cuando existe; el mermaid sigue disponible con «Ver el diagrama anterior». */
let esqMode = "diag";   /* "diag" (diagrama del v2) · "fichas" · "orig" (mermaid original) */
function esqEsc(s){ return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function esqNodo(n, top){
  const hijos = Array.isArray(n.c) && n.c.length ? '<ul class="esq2-hijos">' + n.c.map(function (h){ return "<li>" + esqNodo(h, false) + "</li>"; }).join("") + "</ul>" : "";
  const body = (n.rel ? '<span class="esq2-rel">' + esqEsc(n.rel) + "</span>" : "") +
    '<div class="esq2-t">' + esqEsc(n.t) + "</div>" +
    (n.d ? '<p class="esq2-d">' + esqEsc(n.d) + "</p>" : "") +
    (n.a ? '<p class="esq2-a">' + esqEsc(n.a) + "</p>" : "") + hijos;
  return top ? '<li class="esq2-rama' + (n.k ? " esq2-k" : "") + '">' + body + "</li>" : '<div class="' + (n.k ? "esq2-k" : "") + '">' + body + "</div>";
}
function esqV2Html(e){
  const v = e.v2;
  return '<div class="esq2" data-s="' + esqEsc(e.subject) + '">' +
    (v.pregunta ? '<p class="esq2-q">' + esqEsc(v.pregunta) + "</p>" : "") +
    '<div class="esq2-root">' + esqEsc(v.raiz) + "</div>" +
    (v.raiz_d ? '<p class="esq2-root-d">' + esqEsc(v.raiz_d) + "</p>" : "") +
    '<ul class="esq2-ramas" data-n="' + (v.ramas || []).length + '">' + (v.ramas || []).map(function (r){ return esqNodo(r, true); }).join("") + "</ul>" +
    (Array.isArray(v.cruces) && v.cruces.length ? '<div class="esq2-cruces"><h3>Relaciones entre ramas</h3><ul>' +
      v.cruces.map(function (x){
        /* castellano: «A rel B» se lee de corrido; en euskera (verbo al final, declinación en B) el
           molde no cabe: «A → B», con la relación aparte */
        return document.documentElement.lang === "eu"
          ? "<li><em>" + esqEsc(x.de) + '</em> → <em>' + esqEsc(x.a) + '</em><span class="esq2-xrel">' + esqEsc(x.rel) + "</span></li>"
          : "<li><em>" + esqEsc(x.de) + "</em> " + esqEsc(x.rel) + " <em>" + esqEsc(x.a) + "</em></li>"; }).join("") + "</ul></div>" : "") +
    (v.idea ? '<div class="esq2-idea"><h3>Idea clave</h3><p>' + esqEsc(v.idea) + "</p></div>" : "") +
    '</div>';
}


/* Diagrama con conexiones a partir del v2: concepto central → ramas → subconceptos (flechas con la
   relación escrita) y las «relaciones entre ramas» como flechas discontinuas. Se genera al vuelo, así
   que en euskera sale del v2 ya traducido. */
function esqLbl(s){ return String(s == null ? "" : s).replace(/"/g, "#quot;").replace(/[<>]/g, ""); }
function esqV2Mermaid(e){
  const v = e.v2, lines = ["flowchart LR"], ids = {}, keys = [], hijos = {};
  let n = 0;
  function node(nd, parent){
    const id = "n" + (++n);
    if (!(nd.t in ids)) ids[nd.t] = id;
    const lab = esqLbl(nd.t) + (nd.a ? "<br/><i>" + esqLbl(nd.a) + "</i>" : "");
    lines.push("  " + id + '["' + lab + '"]');
    if (nd.k) keys.push(id);
    hijos[id] = !!(nd.c && nd.c.length);
    lines.push("  " + parent + (nd.rel ? ' -->|"' + esqLbl(nd.rel) + '"| ' : " --> ") + id);
    (nd.c || []).forEach(function (h){ node(h, id); });
  }
  lines.push('  r["' + esqLbl(v.raiz) + '"]:::axis');
  (v.ramas || []).forEach(function (r){ node(r, "r"); });
  /* las relaciones entre ramas NO van al mermaid: dagre las usa para ordenar los rangos y descolocaba el
     árbol (85 de 122 unen conceptos del mismo nivel); se trazan después encima (esqCruces) */
  esqV2Mermaid.cruces = (v.cruces || []).filter(function (x){ return ids[x.de] && ids[x.a]; })
    .map(function (x){ return { de: ids[x.de], a: ids[x.a], rel: x.rel, izq: hijos[ids[x.de]] || hijos[ids[x.a]] }; });
  if (keys.length) lines.push("  class " + keys.join(",") + " key");
  lines.push("classDef axis fill:#1f5d5a,color:#fff,stroke:#1f5d5a;");
  lines.push("classDef key fill:#9a6a22,color:#fff,stroke:#9a6a22;");
  return lines.join("\n");
}

/* Zoom del diagrama: se abre a tamaño legible (100 %, letra de 15 px) y se desliza; − / + / «Ajustar»
   lo alejan o lo encajan en el ancho. (Antes mermaid lo encogía siempre al ancho: ~4,6 px en el móvil.) */
let esqZoom = 1;
function esqZoomSetup(st){
  const sv = st.querySelector("svg"); if (!sv) return;
  const nat = sv.getBoundingClientRect().width, hint = st.querySelector(".esq2-hint");
  sv.removeAttribute("height"); sv.style.height = "auto";
  const fit = Math.min(1, st.clientWidth / nat);
  function apply(z){ esqZoom = Math.max(Math.min(0.3, fit), Math.min(1.6, z));   /* el mínimo nunca impide «Ajustar» (en el móvil puede hacer falta < 30 %) */ sv.style.width = (nat * esqZoom) + "px";
    const pct = st.querySelector(".esq2-zpct"); if (pct) pct.textContent = Math.round(esqZoom * 100) + " %"; }
  if (fit >= 0.999){ if (hint) hint.remove(); apply(1);   /* cabe: sin zoom (solo el interruptor de relaciones, si hay) */
    const tg = esqCrossToggle(st); if (tg) st.insertAdjacentHTML("afterbegin", '<div class="esq2-zoom">' + tg + "</div>");
    esqCrossBind(st); return; }
  st.insertAdjacentHTML("afterbegin", '<div class="esq2-zoom" role="group" aria-label="Zoom del diagrama">' +
    '<button class="fbtn" data-z="-" aria-label="Alejar">−</button><span class="esq2-zpct"></span>' +
    '<button class="fbtn" data-z="+" aria-label="Acercar">+</button><button class="fbtn" data-z="fit">Ajustar</button>' + esqCrossToggle(st) + '</div>');
  st.querySelectorAll("[data-z]").forEach(function (b){ b.addEventListener("click", function (){
    const z = b.dataset.z; apply(z === "fit" ? fit : esqZoom + (z === "+" ? 0.15 : -0.15)); }); });
  apply(1);
  esqCrossBind(st);
}
let esqShowCross = true;
function esqCrossToggle(st){
  return st.querySelector(".esq2-cross") ? '<label class="esq2-xtog"><input type="checkbox" id="esqxtog"' + (esqShowCross ? " checked" : "") + '> Relaciones entre ramas</label>' : "";
}
function esqCrossBind(st){
  const cb = st.querySelector("#esqxtog"), layer = st.querySelector(".esq2-cross"); if (!cb || !layer) return;
  layer.style.display = esqShowCross ? "" : "none";
  cb.addEventListener("change", function (){ esqShowCross = cb.checked; layer.style.display = esqShowCross ? "" : "none"; });
}

/* Relaciones entre ramas sobre el diagrama ya colocado: curva discontinua con flecha y etiqueta,
   de borde a borde de las cajas; si están en la misma columna, la curva sale por la derecha. */
function esqCruces(sv, cruces){
  if (!sv || !cruces || !cruces.length) return;
  const NS = "http://www.w3.org/2000/svg", vb = sv.viewBox.baseVal, inv = sv.getScreenCTM().inverse();
  function box(id){
    const g = sv.querySelector('[id^="flowchart-' + id + '-"]'); if (!g) return null;
    const r = g.getBoundingClientRect(), p1 = sv.createSVGPoint(), p2 = sv.createSVGPoint();
    p1.x = r.left; p1.y = r.top; p2.x = r.right; p2.y = r.bottom;
    const a = p1.matrixTransform(inv), b = p2.matrixTransform(inv);
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
  }
  const layer = document.createElementNS(NS, "g"); layer.setAttribute("class", "esq2-cross");
  layer.innerHTML = '<defs><marker id="esqx' + _mid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>';
  let maxX = vb.x + vb.width;
  cruces.forEach(function (c, i){
    const A = box(c.de), B = box(c.a); if (!A || !B) return;
    let d, lx, ly;
    if (Math.abs(A.cx - B.cx) < 60 && c.izq){               /* misma columna y con hijos: arco por la izquierda (a la derecha están sus flechas) */
      const x = Math.min(A.x1, B.x1), bulge = 55 + 16 * (i % 3);
      d = "M" + A.x1 + "," + A.cy + " C" + (x - bulge) + "," + A.cy + " " + (x - bulge) + "," + B.cy + " " + B.x1 + "," + B.cy;
      lx = x - bulge * 0.78; ly = (A.cy + B.cy) / 2;
    } else if (Math.abs(A.cx - B.cx) < 60){                  /* misma columna, conceptos finales: arco por la derecha */
      const x = Math.max(A.x2, B.x2), bulge = 70 + 18 * (i % 3);
      d = "M" + A.x2 + "," + A.cy + " C" + (x + bulge) + "," + A.cy + " " + (x + bulge) + "," + B.cy + " " + B.x2 + "," + B.cy;
      lx = x + bulge * 0.78; ly = (A.cy + B.cy) / 2; maxX = Math.max(maxX, x + bulge + 10);
    } else {                                                  /* columnas distintas: curva suave */
      const fromR = A.cx < B.cx, sx = fromR ? A.x2 : A.x1, ex = fromR ? B.x1 : B.x2, mx = (sx + ex) / 2;
      d = "M" + sx + "," + A.cy + " C" + mx + "," + A.cy + " " + mx + "," + B.cy + " " + ex + "," + B.cy;
      lx = mx; ly = (A.cy + B.cy) / 2;
    }
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d); path.setAttribute("marker-end", "url(#esqx" + _mid + ")");
    const t = document.createElementNS(NS, "text"); t.setAttribute("x", lx); t.setAttribute("y", ly); t.textContent = c.rel;
    layer.appendChild(path); layer.appendChild(t);
  });
  sv.appendChild(layer);
  /* etiquetas: si pisan una caja, una etiqueta de flecha u otra etiqueta, se desplazan en vertical */
  const ocupados = [].map.call(sv.querySelectorAll(".node, .edgeLabel"), function (el){
    const r = el.getBoundingClientRect(), p1 = sv.createSVGPoint(), p2 = sv.createSVGPoint();
    p1.x = r.left; p1.y = r.top; p2.x = r.right; p2.y = r.bottom; const a = p1.matrixTransform(inv), b = p2.matrixTransform(inv);
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  }).filter(function (b){ return b.x2 - b.x1 > 2; });
  function choca(b){ return ocupados.some(function (o){ return b.x < o.x2 && b.x + b.width > o.x1 && b.y < o.y2 && b.y + b.height > o.y1; }); }
  layer.querySelectorAll("text").forEach(function (t){
    const y0 = +t.getAttribute("y"), pasos = [0, -22, 22, -44, 44, -66, 66];
    for (let k = 0; k < pasos.length; k++){
      t.setAttribute("y", y0 + pasos[k]);
      const b = t.getBBox(); if (!choca({ x: b.x - 4, y: b.y - 2, width: b.width + 8, height: b.height + 4 })) break;
      if (k === pasos.length - 1) t.setAttribute("y", y0);
    }
    const b = t.getBBox(); ocupados.push({ x1: b.x - 4, y1: b.y - 2, x2: b.x + b.width + 4, y2: b.y + b.height + 2 });
  });
  layer.querySelectorAll("text").forEach(function (t){         /* fondo de la etiqueta */
    const b = t.getBBox(), r = document.createElementNS(NS, "rect");
    r.setAttribute("x", b.x - 4); r.setAttribute("y", b.y - 2); r.setAttribute("width", b.width + 8); r.setAttribute("height", b.height + 4); r.setAttribute("rx", 4);
    layer.insertBefore(r, t); maxX = Math.max(maxX, b.x + b.width + 8);
  });
  if (maxX > vb.x + vb.width){ vb.width = maxX - vb.x; sv.setAttribute("width", vb.width); sv.style.maxWidth = "none"; }
}

function esqTabs(e){
  if (!e.v2) return "";
  const t = [["diag", "Diagrama"], ["fichas", "Fichas"], ["orig", "Diagrama original"]];
  return '<div class="esq2-tabs" role="group" aria-label="Vista del esquema">' + t.map(function (x){
    return '<button class="fbtn" data-em="' + x[0] + '" aria-pressed="' + (esqMode === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>";
}

function drawEsq(){
  const st = document.getElementById("esqsvg");
  const head = document.getElementById("esqhead");
  const e = ESQUEMAS[esqKey];
  if (!e || !st) return;
  esqInjectCss();
  const col = e.subject === "fil" ? "var(--fil)" : e.subject === "ipc" ? "var(--ipc)" : "var(--hf)";
  if (head) head.innerHTML = '<span class="kick" style="color:' + col + '">' + e.tema + '</span><h2>' + e.title + '</h2>';
  const mode = e.v2 ? esqMode : "orig";
  st.style.setProperty("--c", col);   /* color de la materia para las curvas de las relaciones entre ramas */
  if (head){
    head.insertAdjacentHTML("beforeend", esqTabs(e));
    head.querySelectorAll("[data-em]").forEach(function (b){ b.addEventListener("click", function (){ esqMode = b.dataset.em; drawEsq(); }); });
  }
  st.classList.toggle("v2", mode === "fichas");
  if (st.parentNode) st.parentNode.classList.toggle("v2", !!e.v2);
  if (mode === "fichas"){ st.innerHTML = esqV2Html(e); return; }
  if (typeof mermaid === "undefined"){ st.innerHTML = '<p class="esq-wait">Cargando el motor de diagramas…</p>'; setTimeout(drawEsq, 350); return; }
  if (_esqTheme === null || _esqTheme !== esqThemeName()) esqInit();
  const src = mode === "diag" ? esqV2Mermaid(e) : e.mermaid;
  mermaid.render("esqm" + (++_mid), src).then(function (res){
    st.innerHTML = (mode === "diag" && e.v2.pregunta ? '<p class="esq2-q esq2-q-diag">' + esqEsc(e.v2.pregunta) + "</p>" : "") + res.svg +
      '<p class="esq2-hint">Desliza para recorrerlo; con − / + lo alejas o lo acercas. En «Fichas», cada concepto con su explicación.</p>';
    if (mode === "diag") esqCruces(st.querySelector("svg"), esqV2Mermaid.cruces);
    esqZoomSetup(st);
  }).catch(function (){
    st.innerHTML = '<p class="esq-wait">No se pudo dibujar este esquema.</p>';
  });
}

function loadEsq(k){
  if (!(k in ESQUEMAS)) return;
  esqKey = k;
  /* el filtro de bloque sigue al esquema abierto (enlace profundo, buscador…) */
  if (esqBlock !== "all" && ESQUEMAS[k].block && ESQUEMAS[k].block !== esqBlock){ esqBlock = ESQUEMAS[k].block; renderEsqFilter(); }
  if (esqBlock !== "all" && window.Epocas && window.Epocas.soloTodos("esquemas", k)){ esqBlock = "all"; renderEsqFilter(); }
  renderEsqChips();
  drawEsq();
}

renderEsqFilter();
renderEsqChips();
/* El dibujo inicial se dispara al abrir la vista Esquemas (js/lazy_libs.js inyecta
   mermaid entonces). Aquí solo se dibuja ya si mermaid estuviera presente, para no
   arrancar el bucle de reintento cuando la carga es perezosa. */
if (typeof mermaid !== "undefined") drawEsq();   /* el diagrama necesita mermaid: lazy_libs.js lo carga al abrir Esquemas y llama a drawEsq() */

/* Re-dibujar al cambiar el tema (el botón #theme o el sistema); solo si mermaid ya
   está cargado (si no, el redibujo se hará al abrir Esquemas). */
(function(){
  const redraw = function (){ if (typeof mermaid !== "undefined"){ esqInit(); drawEsq(); } };
  const btn = document.getElementById("theme");
  if (btn) btn.addEventListener("click", function (){ setTimeout(redraw, 60); });
  if (window.matchMedia){
    try { window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw); } catch (e) {}
  }
})();
