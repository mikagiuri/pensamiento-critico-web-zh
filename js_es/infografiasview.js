"use strict";
/* ===== Vista Infografías ===== depende de: infografias.js =====
   Cada infografía se renderiza dentro de un Shadow DOM (CSS aislado del resto
   de la web). Es un motor de plantilla "editorial oscuro": cada infografía es
   un objeto de datos con bloques (hero, tiles, ladder, quote, columns, split,
   problems). Editar contenido = editar el objeto en infografias.js. */

const IG_CSS = `
:host{display:block;all:initial}
*{box-sizing:border-box}
.info{max-width:1040px;margin:0 auto;background:var(--bg);color:var(--ink);
  font-family:'IBM Plex Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;
  border-radius:16px;overflow:hidden;border:1px solid #000}
.fr{font-family:Fraunces,Georgia,serif}
b{color:#fff}
:host{
  --bg:#0c0f22; --bg2:#141a3a; --line:#2a3157; --ink:#f4f2ea; --mut:#9aa0c4;
  --accent:#f2a63a; --burstink:#1b1408;
}
.kick{font-size:13px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--accent)}
/* HERO */
.hero{position:relative;min-height:520px;padding:44px 42px 38px;overflow:hidden;background:var(--bg)}
.hero .big{position:absolute;right:-24px;top:-84px;font-size:300px;line-height:1;font-style:italic;font-weight:900;color:#fff;opacity:.045;letter-spacing:-.04em;pointer-events:none}
.hero .port{position:absolute;right:0;bottom:0;height:560px;filter:contrast(1.05);
  -webkit-mask-image:linear-gradient(100deg,transparent 0,#000 44%);mask-image:linear-gradient(100deg,transparent 0,#000 44%)}
.hero .motif{position:absolute;right:44px;top:50%;transform:translateY(-50%);width:320px;height:320px;color:var(--accent);opacity:.9}
.hero .motif svg{width:100%;height:100%;display:block}
.hero .grad{position:absolute;inset:0;background:linear-gradient(90deg,var(--bg) 34%,rgba(12,15,34,.25) 60%,transparent 88%)}
.hero .in{position:relative;max-width:640px}
.hero h1{font-size:76px;line-height:.9;font-weight:900;letter-spacing:-.02em;margin:14px 0 0;color:#fff}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero .sub{font-size:21px;color:#cfd3ea;font-style:italic;margin:15px 0 0;font-family:Fraunces,serif}
.hero .cog{margin-top:34px}
.hero .cog b{font-family:Fraunces,serif;font-style:italic;font-weight:900;font-size:27px;color:var(--accent);display:block;letter-spacing:-.01em}
.hero .cog span{font-size:12.5px;color:var(--mut);letter-spacing:.06em}
section{padding:32px 42px}
.htitle{display:flex;align-items:baseline;gap:15px;margin:0 0 18px}
.htitle .no{font-weight:900;font-size:38px;color:var(--line)}
.htitle h2{font-weight:900;font-size:29px;margin:0;letter-spacing:-.01em;color:var(--ink)}
.htitle .r{flex:1;height:2px;background:linear-gradient(90deg,var(--accent),transparent)}
/* tiles */
.trio{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px}
.tile{background:var(--bg2);border:1px solid var(--line);border-radius:16px;padding:19px}
.tile .em{font-size:29px}
.tile .t{font-family:Fraunces,serif;font-weight:600;font-size:18px;color:#fff;margin:6px 0}
.tile p{margin:0;color:#c7cbe6;font-size:14px;line-height:1.5}
/* ladder */
.desc{position:relative;padding-left:30px}
.desc::before{content:"";position:absolute;left:8px;top:6px;bottom:34px;width:3px;background:linear-gradient(#7c93d6,#3247a0,var(--accent))}
.rung{position:relative;margin:0 0 13px;background:var(--bg2);border:1px solid var(--line);border-radius:14px;padding:15px 20px 15px 22px}
.rung .lv{position:absolute;left:-30px;top:15px;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-family:Fraunces,serif;font-weight:900;color:#0c0f22;font-size:16px}
.rung .t{font-weight:700;font-size:16.5px;color:#fff}
.rung p{margin:4px 0 0;color:#b9beda;font-size:14px}
.desc .arrow{margin:2px 0 0 -2px;color:var(--accent);font-size:22px}
/* quote burst */
.turn{position:relative;overflow:hidden;color:var(--burstink);
  background:radial-gradient(120% 160% at 12% -20%,#ffffff55,transparent 45%),var(--accent)}
.turn .q{position:absolute;left:24px;top:-26px;font-family:Fraunces,serif;font-weight:900;font-size:190px;opacity:.18}
.turn .lab{position:relative;font-size:13px;letter-spacing:.24em;text-transform:uppercase;font-weight:700;opacity:.72}
.turn h2{position:relative;font-family:Fraunces,serif;font-weight:900;font-style:italic;font-size:54px;line-height:1;margin:6px 0 12px;letter-spacing:-.02em}
.turn p{position:relative;margin:0;max-width:70ch;font-size:16px;line-height:1.55}
.turn p b{color:#000}
/* columns */
.subs{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px}
.sub{background:var(--bg2);border:1px solid var(--line);border-top:3px solid var(--accent);border-radius:14px;padding:19px}
.sub .h{font-family:Fraunces,serif;font-weight:900;font-size:19px;color:#fff}
.sub .tag{display:block;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);font-weight:600;margin:2px 0 8px}
.sub p{margin:0;color:#c7cbe6;font-size:14px;line-height:1.5}
/* split */
.split{display:flex;gap:15px;flex-wrap:wrap}
.pane{flex:1;min-width:260px;background:var(--bg2);border:1px solid var(--line);border-radius:16px;padding:20px}
.pane>.h{font-family:Fraunces,serif;font-weight:900;font-size:19px;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.pane .row{padding:9px 0;border-top:1px solid var(--line)}
.pane .row:first-of-type{border-top:0}
.pane .row .t{font-weight:700;font-size:14.5px;color:#fff}
.pane .row p{margin:2px 0 0;color:#b9beda;font-size:13.5px}
/* problems */
.probs{display:flex;gap:15px;flex-wrap:wrap}
.prob{flex:1;min-width:240px;border:1px dashed var(--line);border-radius:12px;padding:14px 18px}
.prob b{color:var(--accent);font-family:Fraunces,serif;font-weight:600;font-size:16px}
.prob p{margin:4px 0 0;color:#aab0d0;font-size:13.5px}
.pblock{padding-top:6px}
.foot{padding:20px 42px 30px;color:var(--mut);font-size:12px;letter-spacing:.04em;border-top:1px solid var(--line);background:var(--bg)}
@media(max-width:560px){.hero h1{font-size:52px}.hero .port{opacity:.5}.hero .motif{width:170px;right:8px;opacity:.5}.turn h2{font-size:38px}}
`;

/* ---- render de bloques ---- */
function igHead(n, t){ return '<div class="htitle"><span class="no fr">' + n + '</span><h2 class="fr">' + t + '</h2><span class="r"></span></div>'; }
const IG_RAMP = ["#8ba0da", "#5f74c0", "#4a5db0", "#3a4aa0"];

function igHero(d){
  return '<header class="hero">' +
    (d.ghost ? '<div class="big fr">' + d.ghost + '</div>' : '') +
    (d.portrait ? '<img class="port" src="' + (/[\/:]/.test(d.portrait) ? d.portrait : 'media/retratos/' + d.portrait) + '" alt="' + (d.portraitAlt || '') + '">' : '') +
    (d.heroSvg ? '<div class="motif">' + d.heroSvg + '</div>' : '') +
    '<div class="grad"></div><div class="in">' +
    (d.kicker ? '<div class="kick">' + d.kicker + '</div>' : '') +
    '<h1 class="fr">' + d.title + '</h1>' +
    (d.subtitle ? '<div class="sub">' + d.subtitle + '</div>' : '') +
    (d.tagline ? '<div class="cog"><b>' + d.tagline + '</b>' + (d.author ? '<span>' + d.author + '</span>' : '') + '</div>' : '') +
    '</div></header>';
}

function igBlock(b){
  if (b.type === 'tiles')
    return '<section>' + igHead(b.n, b.title) + '<div class="trio">' +
      b.items.map(function (it){ return '<div class="tile"><div class="em">' + (it.emoji || '') + '</div><div class="t">' + it.t + '</div><p>' + it.p + '</p></div>'; }).join('') + '</div></section>';
  if (b.type === 'ladder')
    return '<section>' + igHead(b.n, b.title) + '<div class="desc">' +
      b.items.map(function (it, i){ var last = i === b.items.length - 1; var bg = last ? 'var(--accent)' : IG_RAMP[Math.min(i, IG_RAMP.length - 1)];
        return '<div class="rung"><span class="lv" style="background:' + bg + '">' + (i + 1) + '</span><div class="t">' + it.t + '</div><p>' + it.p + '</p></div>'; }).join('') +
      '<div class="arrow fr">▼</div></div></section>';
  if (b.type === 'columns')
    return '<section>' + igHead(b.n, b.title) + '<div class="subs">' +
      b.items.map(function (it){ return '<div class="sub"><div class="h">' + it.h + '</div>' + (it.tag ? '<span class="tag">' + it.tag + '</span>' : '') + '<p>' + it.p + '</p></div>'; }).join('') + '</div></section>';
  if (b.type === 'split')
    return '<section>' + igHead(b.n, b.title) + '<div class="split">' +
      b.panes.map(function (pn){ return '<div class="pane"><div class="h">' + (pn.emoji ? pn.emoji + ' ' : '') + pn.h + '</div>' +
        pn.rows.map(function (r){ return '<div class="row"><div class="t">' + r.t + '</div>' + (r.p ? '<p>' + r.p + '</p>' : '') + '</div>'; }).join('') + '</div>'; }).join('') + '</div></section>';
  if (b.type === 'quote')
    return '<section class="turn"><div class="q fr">“</div>' + (b.label ? '<div class="lab">' + b.label + '</div>' : '') +
      '<h2 class="fr">' + b.big + '</h2>' + (b.text ? '<p>' + b.text + '</p>' : '') + '</section>';
  if (b.type === 'problems')
    return '<section class="pblock"><div class="probs">' +
      b.items.map(function (it){ return '<div class="prob"><b>' + it.b + '</b><p>' + it.p + '</p></div>'; }).join('') + '</div></section>';
  return '';
}

function igMarkup(d){
  const vars = ':host{--accent:' + (d.accent || '#f2a63a') + ';--burstink:' + (d.burstInk || '#1b1408') + '}';
  const body = igHero(d) + (d.blocks || []).map(igBlock).join('') + (d.foot ? '<div class="foot">' + d.foot + '</div>' : '');
  return '<style>' + IG_CSS + vars + '</style><div class="info">' + body + '</div>';
}

/* ---- vista (chips + escenario) ---- */
let igKey = Object.keys(INFOGRAFIAS)[0];
let igSubject = "all", igBloque = "all";
const IG_SUBJECTS = { fil: "Filosofía 1.º", hf: "Historia de la Filosofía", ipc: "Pensamiento crítico" };
const IG_BLOCKS = { A: "Antigua", B: "Medieval-Moderna", C: "Contemporánea" };

function renderIgFilter(){
  const box = document.getElementById("igfilter");
  if (!box) return;
  const subjBtns = ["all", "fil", "hf", "ipc"].map(function (s){
    return '<button class="fbtn" data-subj="' + s + '" aria-pressed="' + (s === igSubject) + '">' +
      (s === "all" ? "Todas" : IG_SUBJECTS[s]) + '</button>'; }).join("");
  let blockBtns = "";
  if (igSubject === "hf"){
    blockBtns = ["all", "A", "B", "C"].map(function (b){
      return '<button class="fbtn" data-block="' + b + '" aria-pressed="' + (b === igBloque) + '">' +
        (b === "all" ? "Todos los bloques" : IG_BLOCKS[b]) + '</button>'; }).join("");
  }
  box.innerHTML = '<div class="fgroup"><span class="flabel">Materia</span>' + subjBtns + '</div>' +
    (blockBtns ? '<div class="fgroup"><span class="flabel">Bloque</span>' + blockBtns + '</div>' : '');
  box.querySelectorAll("[data-subj]").forEach(function (b){ b.addEventListener("click", function (){
    igSubject = b.dataset.subj; if (igSubject !== "hf") igBloque = "all"; renderIgFilter(); renderIgChips(); }); });
  box.querySelectorAll("[data-block]").forEach(function (b){ b.addEventListener("click", function (){
    igBloque = b.dataset.block; renderIgFilter(); renderIgChips(); }); });
}

function renderIgChips(){
  const box = document.getElementById("igchips");
  if (!box) return;
  const entries = Object.entries(INFOGRAFIAS).filter(function (e){
    var d = e[1];
    if (igSubject !== "all" && d.subject !== igSubject) return false;
    if (igSubject === "hf" && igBloque !== "all" && d.block !== igBloque) return false;
    return true;
  });
  box.innerHTML = entries
    .map(function (e){ return '<button class="chip" data-ig="' + e[0] + '" aria-pressed="' + (e[0] === igKey) + '">' + (e[1].label || e[1].title) + '</button>'; }).join("");
  box.querySelectorAll("[data-ig]").forEach(function (b){ b.addEventListener("click", function (){ loadInfografia(b.dataset.ig); }); });
}

function loadInfografia(k){
  if (!(k in INFOGRAFIAS)) return;
  igKey = k;
  renderIgChips();
  const stage = document.getElementById("igstage");
  if (!stage) return;
  if (!stage.shadowRoot) stage.attachShadow({ mode: "open" });
  stage.shadowRoot.innerHTML = igMarkup(INFOGRAFIAS[k]);
  /* Tira «De este tema» en el light DOM (el CSS de .btn/.related-row vive fuera del Shadow DOM). */
  let rel = document.getElementById("igrelated");
  if (!rel){ rel = document.createElement("div"); rel.id = "igrelated"; stage.parentNode.insertBefore(rel, stage); }
  rel.innerHTML = (typeof relatedStripHtml === "function") ? relatedStripHtml(k, "infografias") : "";
  if (typeof wireRelated === "function") wireRelated(rel);
  window.scrollTo(0, 0);
}

renderIgFilter();
renderIgChips();
loadInfografia(igKey);
