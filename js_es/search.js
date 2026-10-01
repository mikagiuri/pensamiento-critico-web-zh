"use strict";
/* ===== Buscador global «Buscar en el aula» =====
   Paleta de comandos que indexa (1) las SECCIONES del menú (cualquier data-view) y
   (2) el CONTENIDO con clave (teoría, lecturas, materiales, infografías, cuestionarios,
   tarjetas, esquemas, PAU). Navega reutilizando show() + los loaders globales; no cambia
   la estructura de navegación. Se carga el último (todos los datos y loaders ya existen),
   pero igualmente usa guardas typeof porque las colecciones son const de otros <script>.
   Atajos: Ctrl/⌘+K o «/» para abrir, Esc para cerrar, ↑↓ mover, ↵ abrir. */
(function(){
  var norm = function(s){ return (s == null ? "" : String(s)).toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, ""); };
  var strip = function(s){ return String(s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); };
  var SUBJ = { fil: "Filosofía 1.º", hf: "Historia de la Filosofía", ipc: "Pensamiento crítico" };
  var subjName = function(s){ return SUBJ[s] || ""; };
  /* tokens completos para que el diccionario de interfaz los traduzca con el orden correcto */
  var BLOCK = { A: "Bloque A", B: "Bloque B", C: "Bloque C" };

  /* go (vista) → nombre de la función loader global. Registro común definido en app.js
     (window.VIEW_LOADERS); se conserva un respaldo por si cambiara el orden de carga. */
  var LOADER = window.VIEW_LOADERS || {
    teoria: "loadTheory", lecturas: "loadLectura", materiales: "loadMaterial",
    infografias: "loadInfografia", cuestionarios: "loadQuiz", tarjetas: "loadDeck",
    esquemas: "loadEsq", pau: "loadPau", mapas: "loadMap"
  };

  var index = null;   // se construye una vez, al abrir
  function build(){
    if (index) return index;
    var out = [];
    /* (1) Secciones del menú: toda vista alcanzable desde la barra. */
    var seen = {};
    var tabs = document.getElementById("tabs");
    if (tabs){
      tabs.querySelectorAll("button[data-view]").forEach(function(b){
        var id = b.dataset.view, label = strip(b.textContent);
        if (!id || seen[id]) return; seen[id] = 1;
        out.push({ type: "Sección", label: label, meta: "Ir a la sección", go: id, arg: null,
          hay: norm(label + " " + id) });
      });
    }
    /* (2) Contenido con clave. addAll(colección, vista, etiquetaFn, metaFn, tipo) */
    function addAll(obj, go, labelFn, metaFn, type){
      if (typeof obj === "undefined" || !obj) return;
      Object.keys(obj).forEach(function(k){
        var it = obj[k]; if (!it) return;
        var label = strip(labelFn(it)); if (!label) return;
        var meta = strip(metaFn(it));
        out.push({ type: type, label: label, meta: meta, go: go, arg: k,
          hay: norm(label + " " + meta + " " + k) });
      });
    }
    addAll(typeof THEORY      !== "undefined" ? THEORY      : null, "teoria",        function(i){ return i.title; },            function(i){ return i.tema; },                                  "Teoría");
    addAll(typeof LECTURAS    !== "undefined" ? LECTURAS    : null, "lecturas",      function(i){ return i.title; },            function(i){ return i.tema; },                                  "Lectura");
    var matsSinCuentos = null, cuentos = null;
    if (typeof MATERIALS !== "undefined" && MATERIALS){ matsSinCuentos = {}; cuentos = {}; Object.keys(MATERIALS).forEach(function(k){ (/^ipc-lec-/.test(k) && !/soluciones/.test(k) ? cuentos : matsSinCuentos)[k] = MATERIALS[k]; }); }
    addAll(matsSinCuentos, "materiales",    function(i){ return i.title; },            function(i){ return i.tema; },                                  "Material");
    addAll(cuentos,        "cuentos",       function(i){ return i.title; },            function(i){ return "Cuentos para pensar"; },                    "Cuento");
    addAll(typeof INFOGRAFIAS !== "undefined" ? INFOGRAFIAS : null, "infografias",   function(i){ return i.label || i.title; }, function(i){ return subjName(i.subject) + (i.block && BLOCK[i.block] ? " · " + BLOCK[i.block] : ""); }, "Infografía");
    addAll(typeof QUIZZES     !== "undefined" ? QUIZZES     : null, "cuestionarios", function(i){ return i.name; },             function(i){ return subjName(i.subject); },                      "Cuestionario");
    addAll(typeof DECKS       !== "undefined" ? DECKS       : null, "tarjetas",      function(i){ return i.name; },             function(i){ return subjName(i.subject); },                      "Tarjetas");
    addAll(typeof ESQUEMAS    !== "undefined" ? ESQUEMAS    : null, "esquemas",      function(i){ return i.title; },            function(i){ return i.tema || subjName(i.subject); },            "Esquema");
    addAll(typeof PAU         !== "undefined" ? PAU         : null, "pau",           function(i){ return i.title; },            function(i){ return i.kick || "PAU"; },                          "PAU");
    addAll(typeof ILUSTRES    !== "undefined" ? ILUSTRES    : null, "ilustres",      function(i){ return i.name; },             function(i){ return i.dates + (i.role ? " · " + i.role : ""); }, "Ilustre");
    addAll(typeof CLASES_IDX  !== "undefined" ? CLASES_IDX  : null, "clases",        function(i){ return i.label; },            function(i){ return i.meta; },                                  "Clase");
    index = out;
    return out;
  }

  function search(q){
    var nq = norm(q).trim();
    if (!nq) return [];
    var toks = nq.split(/\s+/);
    var res = [];
    build().forEach(function(e){
      var ok = toks.every(function(t){ return e.hay.indexOf(t) >= 0; });
      if (!ok) return;
      /* puntúa: coincidencia al principio de la etiqueta > secciones > resto */
      var nl = norm(e.label), score = 0;
      if (nl.indexOf(nq) === 0) score -= 100;
      else if (nl.indexOf(nq) >= 0) score -= 40;
      if (e.type === "Sección") score -= 5;
      res.push({ e: e, score: score });
    });
    res.sort(function(a, b){ return a.score - b.score || a.e.label.localeCompare(b.e.label); });
    return res.slice(0, 40).map(function(r){ return r.e; });
  }

  /* ---- interfaz ---- */
  var ov, input, list, current = [], sel = -1;

  function css(){
    var s = document.createElement("style");
    s.textContent =
      ".searchbtn{margin-right:.15rem}" +
      ".search-ov{position:fixed;inset:0;z-index:1000;display:flex;justify-content:center;align-items:flex-start;" +
        "padding:12vh 16px 16px;background:rgba(20,21,25,.42);backdrop-filter:blur(2px)}" +
      ".search-ov[hidden]{display:none}" +
      ".search-box{width:min(640px,100%);background:var(--surface,#fff);color:var(--ink,#222);" +
        "border:1px solid var(--line,#ccc);border-radius:var(--radius,14px);box-shadow:var(--shadow,0 12px 40px rgba(0,0,0,.3));overflow:hidden}" +
      ".search-box input{width:100%;box-sizing:border-box;border:0;border-bottom:1px solid var(--line,#ccc);" +
        "background:transparent;color:inherit;font:500 1.05rem/1.3 var(--sans,system-ui);padding:.95rem 1.1rem;outline:none}" +
      ".search-res{list-style:none;margin:0;padding:.3rem;max-height:52vh;overflow:auto}" +
      ".search-res li{display:flex;align-items:baseline;gap:.6rem;padding:.55rem .7rem;border-radius:10px;cursor:pointer}" +
      ".search-res li .s-label{font-weight:600}" +
      ".search-res li .s-meta{color:var(--muted,#666);font-size:.85rem;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      ".search-res li .s-type{color:var(--muted,#666);font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;" +
        "border:1px solid var(--line,#ccc);border-radius:999px;padding:.05rem .5rem;flex:none}" +
      ".search-res li.sel,.search-res li:hover{background:var(--surface-2,#eee)}" +
      ".search-res li.sel .s-type{border-color:var(--accent,#357)}" +
      ".search-empty{padding:.9rem 1rem;color:var(--muted,#666)}" +
      ".search-hint{padding:.5rem .9rem;border-top:1px solid var(--line,#ccc);color:var(--muted,#666);font-size:.78rem}";
    document.head.appendChild(s);
  }

  function ensure(){
    if (ov) return;
    css();
    ov = document.createElement("div");
    ov.className = "search-ov"; ov.id = "searchoverlay"; ov.hidden = true;
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Buscar en el aula");
    ov.innerHTML =
      '<div class="search-box">' +
        '<input id="searchinput" type="search" autocomplete="off" spellcheck="false" ' +
          'placeholder="Buscar teoría, lecturas, cuestionarios, secciones…" aria-label="Buscar en el aula">' +
        '<ul id="searchresults" class="search-res" role="listbox" aria-label="Resultados"></ul>' +
        '<div class="search-hint">↑↓ moverse · ↵ abrir · esc cerrar</div>' +
      '</div>';
    document.body.appendChild(ov);
    input = ov.querySelector("#searchinput");
    list = ov.querySelector("#searchresults");
    ov.addEventListener("mousedown", function(e){ if (e.target === ov) close(); });
    input.addEventListener("input", function(){ render(search(input.value)); });
    input.addEventListener("keydown", onKey);
    list.addEventListener("click", function(e){
      var li = e.target.closest("li[data-i]"); if (li) activate(+li.dataset.i);
    });
  }

  function render(items){
    current = items; sel = items.length ? 0 : -1;
    if (!input.value.trim()){ list.innerHTML = ""; return; }
    if (!items.length){ list.innerHTML = '<li class="search-empty">Sin resultados</li>'; return; }
    list.innerHTML = items.map(function(e, i){
      return '<li role="option" data-i="' + i + '" class="' + (i === sel ? "sel" : "") + '">' +
        '<span class="s-label"></span><span class="s-meta"></span><span class="s-type"></span></li>';
    }).join("");
    /* textContent para evitar inyección de HTML de los datos */
    [].forEach.call(list.children, function(li, i){
      li.querySelector(".s-label").textContent = items[i].label;
      li.querySelector(".s-meta").textContent = items[i].meta || "";
      li.querySelector(".s-type").textContent = items[i].type;
    });
  }

  function move(d){
    if (!current.length) return;
    sel = (sel + d + current.length) % current.length;
    [].forEach.call(list.children, function(li, i){ li.classList.toggle("sel", i === sel); });
    var el = list.children[sel]; if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }

  function activate(i){
    var e = current[i]; if (!e) return;
    close();
    if (typeof show === "function") show(e.go);
    var fn = LOADER[e.go];
    if (e.arg && fn && typeof window[fn] === "function") window[fn](e.arg);
  }

  function onKey(e){
    if (e.key === "ArrowDown"){ e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp"){ e.preventDefault(); move(-1); }
    else if (e.key === "Enter"){ e.preventDefault(); if (sel >= 0) activate(sel); }
    else if (e.key === "Escape"){ e.preventDefault(); close(); }
  }

  function open(){ ensure(); ov.hidden = false; input.value = ""; render([]); input.focus(); }
  function close(){ if (ov){ ov.hidden = true; } }

  /* disparador en la cabecera (antes del menú hamburguesa), reutiliza el estilo de .theme */
  function mountBtn(){
    var bar = document.querySelector(".bar-in"); if (!bar) return;
    var btn = document.createElement("button");
    btn.className = "theme searchbtn"; btn.id = "searchbtn"; btn.type = "button";
    btn.title = "Buscar en el aula (Ctrl+K)"; btn.setAttribute("aria-label", "Buscar en el aula");
    btn.textContent = "🔎";
    btn.addEventListener("click", open);
    var ref = document.getElementById("navtoggle") || document.getElementById("theme");
    if (ref) bar.insertBefore(btn, ref); else bar.appendChild(btn);
  }
  mountBtn();

  /* atajos globales */
  document.addEventListener("keydown", function(e){
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")){ e.preventDefault(); open(); return; }
    if (e.key === "/" && !(ov && !ov.hidden)){
      var a = document.activeElement, tag = a && a.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (a && a.isContentEditable)) return;
      e.preventDefault(); open();
    }
  });
})();
