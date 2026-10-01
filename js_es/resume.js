"use strict";
/* ===== «Continuar donde lo dejaste» =====
   Recuerda el último contenido abierto y ofrece un enlace para retomarlo en Inicio.
   Envuelve los loaders globales (declaraciones de función → interceptables por
   window.loadX, igual que navctx.js envuelve show()). Solo graba TRAS el arranque:
   al cargar la página cada vista llama a su loader con el primer elemento, y eso no
   es navegación del usuario. Se guarda en localStorage (por-origen, tolerante a fallo). */
(function(){
  var LS = "aula.resume";
  var ready = false;                 // se activa tras el arranque (ver setTimeout al final)
  var strip = function(s){ return String(s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); };

  /* go (vista) → loader, colección, tipo legible y de dónde sale la etiqueta */
  var MAP = {
    teoria:       { load: "loadTheory",     coll: function(){ return typeof THEORY      !== "undefined" ? THEORY      : null; }, type: "Teoría",       lab: function(o){ return o.title; } },
    lecturas:     { load: "loadLectura",    coll: function(){ return typeof LECTURAS    !== "undefined" ? LECTURAS    : null; }, type: "Lectura",      lab: function(o){ return o.title; } },
    materiales:   { load: "loadMaterial",   coll: function(){ return typeof MATERIALS   !== "undefined" ? MATERIALS   : null; }, type: "Material",     lab: function(o){ return o.title; } },
    cuentos:      { load: "loadCuento",     coll: function(){ return typeof MATERIALS   !== "undefined" ? MATERIALS   : null; }, type: "Cuento",       lab: function(o){ return o.title; } },
    infografias:  { load: "loadInfografia", coll: function(){ return typeof INFOGRAFIAS !== "undefined" ? INFOGRAFIAS : null; }, type: "Infografía",   lab: function(o){ return o.label || o.title; } },
    cuestionarios:{ load: "loadQuiz",       coll: function(){ return typeof QUIZZES     !== "undefined" ? QUIZZES     : null; }, type: "Cuestionario", lab: function(o){ return o.name; } },
    tarjetas:     { load: "loadDeck",       coll: function(){ return typeof DECKS       !== "undefined" ? DECKS       : null; }, type: "Tarjetas",     lab: function(o){ return o.name; } },
    esquemas:     { load: "loadEsq",        coll: function(){ return typeof ESQUEMAS    !== "undefined" ? ESQUEMAS    : null; }, type: "Esquema",      lab: function(o){ return o.title; } },
    pau:          { load: "loadPau",        coll: function(){ return typeof PAU         !== "undefined" ? PAU         : null; }, type: "PAU",          lab: function(o){ return o.title; } },
    mapas:        { load: "loadMap",        coll: function(){ return typeof MAPS        !== "undefined" ? MAPS        : null; }, type: "Mapa",         lab: function(o){ return o.name || o.title; } },
    clases:       { load: "loadClase",      coll: function(){ return typeof CLASES_IDX  !== "undefined" ? CLASES_IDX  : null; }, type: "Clase",        lab: function(o){ return o.label; } }
  };

  function get(){ try { return JSON.parse(localStorage.getItem(LS) || "null"); } catch (e){ return null; } }
  function set(v){ try { localStorage.setItem(LS, JSON.stringify(v)); } catch (e){} }
  function clear(){ try { localStorage.removeItem(LS); } catch (e){} }

  function record(go, k){
    var m = MAP[go]; if (!m) return;
    var coll = m.coll(); if (!coll || !coll[k]) return;
    var label = strip(m.lab(coll[k])); if (!label) return;
    set({ go: go, arg: String(k), type: m.type, label: label, ts: Date.now() });
    renderBanner();
  }

  /* envolver cada loader existente para grabar la navegación posterior al arranque */
  Object.keys(MAP).forEach(function(go){
    var name = MAP[go].load, orig = window[name];
    if (typeof orig !== "function") return;
    window[name] = function(k){
      var out = orig.apply(this, arguments);
      if (ready && k != null) record(go, k);
      return out;
    };
  });

  /* ---- tarjeta en Inicio ---- */
  var card, goBtn;
  function ensureCard(){
    if (card) return card;
    var inicio = document.getElementById("inicio");
    if (!inicio && typeof SUBJECTS !== "undefined" && Object.keys(SUBJECTS).length === 1) inicio = document.getElementById(Object.keys(SUBJECTS)[0]);   // (29-09) sin portada: en la ficha de la materia
    if (!inicio) return null;
    card = document.createElement("div");
    card.className = "resume"; card.id = "resumecard"; card.hidden = true;
    card.innerHTML =
      '<div class="resume-txt"><span class="resume-kick">Continuar donde lo dejaste</span>' +
      '<button class="resume-go" id="resumego" type="button"></button></div>' +
      '<button class="resume-x" id="resumex" type="button" title="Descartar" aria-label="Descartar">×</button>';
    var courses = inicio.querySelector(".courses") || inicio.querySelector(".sec-head");
    if (courses) inicio.insertBefore(card, courses); else inicio.appendChild(card);
    goBtn = card.querySelector("#resumego");
    goBtn.addEventListener("click", resume);
    card.querySelector("#resumex").addEventListener("click", function(){ clear(); card.hidden = true; });
    return card;
  }

  function renderBanner(){
    var r = get(); if (!ensureCard()) return;
    var m = r && MAP[r.go], coll = m && m.coll();
    if (!r || !m || !coll || !coll[r.arg]){ card.hidden = true; return; }   // no mostrar si ya no existe en este build
    goBtn.textContent = r.type + " · " + r.label;
    card.hidden = false;
  }

  function resume(){
    var r = get(); if (!r || !MAP[r.go]) return;
    if (typeof show === "function") show(r.go);
    var fn = window[MAP[r.go].load];
    if (typeof fn === "function") fn(r.arg);
  }

  /* el arranque llama a los loaders de forma síncrona; activamos la grabación después */
  renderBanner();
  setTimeout(function(){ ready = true; }, 0);
})();
