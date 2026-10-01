"use strict";
/* ===== Viaje del alumno (29-09-2026): ficha de la materia, enlaces de cada tema, itinerario PAU y migas =====
   Nace del estudio del viaje del usuario (docs/estudio_viaje_usuario_web.md y cuaderno: viaje_del_alumno.html) y de
   las decisiones del profesor del 29-09: nada que desplace ni duplique el contenido; en las webs del alumnado no hay
   Inicio, se entra en la ficha de la materia; y esa ficha se ordena: lista limpia de temas → la web en números →
   itinerario PAU (HF). Este módulo añade, SIN tocar la navegación ni los datos:
   1. En la ficha de la materia: la lista de temas con sus títulos (en 2.º ESO castellano, las unidades de «Clases»),
      y en HF el itinerario PAU completo, tras «Explora la materia». Retira la fila de botones curados (tools) en las
      webs de una materia.
   2. Al final de cada tema de Teoría, «Para seguir con este tema»: TODAS las tarjetas, cuestionarios, infografías,
      mapas, esquemas, lecturas, comentarios y dilemas del tema, los conceptos del glosario, y el paso al tema
      anterior/siguiente. En Tarjetas, Cuestionarios y Clases, la tira de una línea «De este tema».
   3. En cada sección de PAU, una línea con los pasos de la prueba y «estás aquí».
   4. Migas de contexto: «Inicio › Grupo › Sección» (Inicio = la ficha de la materia cuando no hay portada).
   Los temas se deducen de las claves y de mapas curados (como QUIZ_TEMA en quiz.js). Envuelve loaders globales igual
   que resume.js (window.loadX). Las colecciones son const/let de otros <script> (no cuelgan de window): se leen con
   G() (eval indirecto en el ámbito global) y guardas por si un build no trae alguna. Textos en cadenas enteras para que
   web_i18n/ui/<lang>.json los traduzca. Estilos: styles.css («Viaje del alumno»). */
(function(){
  var TXT = {
    ariaItin: "Itinerario del tema", ariaPau: "Itinerario PAU", ariaCrumbs: "Dónde estás", deEsteTema: "De este tema:",
    p1: "Lee la teoría", p1clases: "Sigue las clases", p2: "Repasa con tarjetas", p3: "Ponte a prueba", p4: "Repaso visual",
    aqui: "Estás aquí", siguiente: "Siguiente paso",
    temas: "Temas", unidades: "Unidades", tema: "Tema {n}", unidad: "Unidad {n}",
    seguir: "Para seguir con este tema", tarjetas: "Tarjetas", cuestionarios: "Cuestionarios", infografias: "Infografías", mapas: "Mapas conceptuales",
    esquemas: "Esquemas", lecturas: "Lecturas", comentarios: "Comentarios de texto", dilemas: "Dilemas éticos", conceptos: "Conceptos",
    nTarjetas: "{n} tarjetas", nPreguntas: "{n} preguntas", anterior: "Tema anterior", siguienteTema: "Tema siguiente",
    infografia: "Infografía", mapa: "Mapa", esquema: "Esquema", lectura: "Lectura", dilema: "Dilema", comentario: "Comentario",
    pau: "Itinerario PAU", pauLead: "Prepara la PAU en orden: primero cómo es la prueba, luego cada ejercicio y, al final, la práctica por temas.",
    pau1: "Cómo es la prueba", pau2: "Ejercicio 1 · El comentario de texto", pau3: "Ejercicio 2 · La disertación",
    pau4: "Ejercicio 3 · La exposición", pau5: "Cómo se corrige", pau6: "Practica por temas", inicio: "Inicio",
    s1: "Teoría", s1clases: "Clases", s2: "Tarjetas", s3: "Cuestionario", s4: "Repaso",
    spau1: "La prueba", spau2: "Ej. 1 · Comentario", spau3: "Ej. 2 · Disertación", spau4: "Ej. 3 · Exposición", spau5: "Corrección", spau6: "Por temas"
  };
  function t(key, vars){ return String(TXT[key] || "").replace(/\{(\w+)\}/g, function(m, k){ return vars && k in vars ? String(vars[k]) : m; }); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function strip(s){ return String(s == null ? "" : s).replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
  /* lectura de globales léxicos (const/let de otros scripts) por su nombre */
  function G(name){ try { return (0, eval)("typeof " + name + " !== 'undefined' ? " + name + " : undefined"); } catch (e){ return undefined; } }
  function coll(name){ var v = G(name); return v && typeof v === "object" ? v : null; }
  function fn(name){ var f = window[name]; return typeof f === "function" ? f : null; }
  function view(id){ return !!document.getElementById(id); }
  var SUBJ_COLOR = { fil: "var(--fil)", hf: "var(--hf)", ipc: "var(--ipc)" };
  function singleSubject(){ var S = coll("SUBJECTS"), ks = S ? Object.keys(S) : []; return ks.length === 1 ? ks[0] : null; }

  /* ---------- tema de cada recurso ----------
     Filosofía y HF: número de tema. Pensamiento crítico: clave de tema (las de QUIZ_TEMAS.ipc). */
  function temaNum(o){
    if (!o) return null;
    if (typeof o.tema === "number") return o.tema;
    var m = String(o.tema || "").match(/Tema\s+(\d+)|(\d+)\.\s*gaia/); return m ? +(m[1] || m[2]) : null;
  }
  var IPC_KEY = /^(?:map-)?ipc-([a-z]+)/;
  var IPC_ALIAS = { conceptos: "pensar", publicidad: "medios", prejuicios: "sesgos", moda: "huella", consumo: "huella", fastfashion: "huella", critico: "pensar", bulos: "falacias", hecho: "pensar" };
  var IPC_TEMAS = ["pensar", "argumentar", "falacias", "sesgos", "dialogo", "medios", "grupo", "huella"];
  function ipcTema(key){
    var m = IPC_KEY.exec(key), k = m ? (IPC_ALIAS[m[1]] || m[1]) : null;
    if (!k){ var Q = coll("QUIZ_TEMA"); k = Q && Q[key]; }
    return IPC_TEMAS.indexOf(k) >= 0 ? k : null;
  }
  var DECK_TEMA = {
    aporias: 4, mito: 3, presocraticos: 4, sofistas: 5, kant: 19, kantPreguntas: 19, racionalismoEmpirismo: 14, historicidad: 1, metodos: 2,
    platon: 6, antropologia: 7, etica: 8, politica: 9, helenismo: 10, medieval: 11, feRazon: 12, modernidad: 13, metafisica: 15, contrato: 16,
    utilitarismo: 17, ilustracion: 18, eticaDeber: 20, sospecha: 21, capitalismo: 22, posmodernidad: 23, analitica: 24, existencialismo: 25, beauvoir: 26, siglo21: 27,
    "fil-que-es": 1, "fil-ramas": 1, "fil-caracteristicas": 1, "fil-metodo": 1, "fil-saberes": 1, "fil-presocraticos": 1,
    "fil-ser-humano": 2, "fil-mente": 2, "fil-concepciones": 2, "fil-identidad": 2, "fil-conocer": 3, "fil-verdad": 3, "fil-ciencia": 3, "fil-posverdad": 3,
    "fil-logica": 4, "fil-etica": 5, "fil-helenismo": 5, "fil-politica": 6, "fil-arte": 7
  };
  var MAP_TEMA = {
    "map-descartes": 14, "map-kant": 19, "map-critica-razon-pura": 19, "map-ilustracion-modernidad": 18, "map-san-agustin": 12, "map-platon": 6,
    "map-aristoteles": 7, "map-helenismo": 10, "map-nietzsche": 23, "map-hegel": 21, "map-ideologia": 22, "map-presocraticos": 4, "map-sofistas-socrates": 5,
    "map-medieval": 11, "map-etica-clasica": 8, "map-politica-clasica": 9, "map-renacimiento": 13, "map-sustancias-modernas": 15, "map-contrato-social": 16,
    "map-utilitarismo-liberalismo": 17, "map-maestros-sospecha": 21, "map-critica-capitalismo": 22, "map-postmodernidad": 23, "map-filosofia-lenguaje": 24,
    "map-existencialismo": 25, "map-feminismo-beauvoir": 26,
    "map-filosofia-ciencia": 3, "map-ser-humano": 2, "map-conocimiento": 3, "map-racionalismo-empirismo": 3, "map-fil-mito-logos": 1, "map-fil-cuerpo-mente": 2
  };
  var IG_TEMA = { "hf-platon": 6, "hf-kant": 19, "hf-helenismo": 10, "hf-beauvoir": 26, "hf-posmodernidad": 23,
    "fil-t1": 1, "fil-ramas": 1, "fil-mito-logos": 1, "fil-t2": 2, "fil-natur-cultura": 2, "fil-cuerpo-mente": 2, "fil-t3": 3, "fil-posverdad": 3 };
  var ESQ_REL = { AA: 7, BH: 14, CK: 19, CC: 21, CM: 21, CF: 21, C5A: 22, C5B: 27, CdB: 26, C8: 25, C8K: 25, C6: 23, C7: 24, C9: 26 };
  var THEORY_EXTRA = { "fil-presocraticos": 1, "fil-helenismo": 5, "hf-descartes-makro": 14, "hf-platon-superficie": 6, "hf-descartes-simulacion": 14, "hf-platon-agustin": 11, "hf-platon-prejuicio": 6 };
  /* unidades del curso de 2.º ESO («Clases») → tema */
  var CLASES_TEMA = { 1: "pensar", 2: "argumentar", 3: "falacias", 4: "falacias", 5: "falacias", 6: "medios", 7: "medios", 8: "sesgos", 9: "medios", 10: "pensar",
    11: "dialogo", 12: "grupo", 13: "huella", 14: "argumentar", 20: "huella" };
  /* glosario de HF: la unidad del libro (código) → tema, vía QUIZ_TEMA («ltfh-<código>»); los que no tienen test en el libro, a mano */
  var GLO_UNIDAD = { A5: 5, A4: 4, "A1-A2": 1, A3: 3, DM: 14 };
  var GLO_IPC = [["pensar", "pensar"], ["argument", "argumentar"], ["falacia", "falacias"], ["sesgo", "sesgos"], ["diálogo", "dialogo"], ["dialogo", "dialogo"], ["medio", "medios"], ["publicidad", "medios"], ["grupo", "grupo"], ["huella", "huella"]];
  function gloTema(g){
    if (g.subject === "ipc"){ var tt = String(g.tema || "").toLowerCase(); for (var i = 0; i < GLO_IPC.length; i++) if (tt.indexOf(GLO_IPC[i][0]) >= 0) return GLO_IPC[i][1]; return null; }
    if (g.subject === "hf"){ var Q = coll("QUIZ_TEMA"), c = Q && Q["ltfh-" + g.unidad], m = c && String(c).match(/^T(\d+)$/); return m ? +m[1] : (GLO_UNIDAD[g.unidad] || null); }
    return temaNum(g);
  }

  function temaOf(go_, key, o){
    if (o && o.subject === "ipc") return ipcTema(key);
    switch (go_){
      case "teoria": return THEORY_EXTRA[key] || temaNum(o);
      case "tarjetas": return DECK_TEMA[key] || null;
      case "cuestionarios": { var Q = coll("QUIZ_TEMA"), m = Q && Q[key] && String(Q[key]).match(/^T(\d+)$/); return m ? +m[1] : null; }
      case "mapas": return MAP_TEMA[key] || null;
      case "infografias": { var A = coll("TEMA_ALIAS"); return IG_TEMA[key] || (A && A[key]) || null; }
      case "esquemas": {
        var m1 = /^ds-([ABC])(\d+)$/.exec(key); if (m1) return m1[1] === "A" ? +m1[2] : m1[1] === "B" ? 10 + +m1[2] : 17 + +m1[2];
        var m2 = /^FIL-(T(\d)|PRE|HEL|TA)-/.exec(key); if (m2) return m2[2] ? +m2[2] : m2[1] === "PRE" ? 1 : m2[1] === "HEL" ? 5 : 4;
        var m3 = /^([A-Za-z0-9]+)-REL-/.exec(key); return (m3 && ESQ_REL[m3[1]]) || null;
      }
      case "lecturas": case "comentario": return temaNum(o);
    }
    return null;
  }
  var COLL = { teoria: "THEORY", tarjetas: "DECKS", cuestionarios: "QUIZZES", mapas: "MAPS", infografias: "INFOGRAFIAS", esquemas: "ESQUEMAS", lecturas: "LECTURAS", comentario: "COMENTARIO" };
  /* claves de una colección de esa materia y tema, en el orden de definición */
  function keysOf(go_, subject, tema){
    var c = coll(COLL[go_]); if (!c || !view(go_)) return [];
    var out = Object.keys(c).filter(function(k){ var o = c[k]; return o && o.subject === subject && temaOf(go_, k, o) === tema; });
    if (go_ === "cuestionarios" && fn("quizTipo")) out.sort(function(a, b){ return quizTipo(a) - quizTipo(b); });   // breve, banco, libro
    if (go_ === "tarjetas") out = out.filter(function(k){ return c[k].tipo !== "frases"; });
    return out;
  }
  function labelOf(go_, key){
    var c = coll(COLL[go_]), o = c && c[key]; if (!o) return key;
    var s = strip(o.name || o.label || o.title || key);
    /* nombres de baraja/cuestionario con prefijo de materia: «Filosofía 1.º · X» → «X» (el tema ya lo dice el bloque) */
    return s.replace(/^(Filosofía 1\.º|Filosofia 1\.º?|Pensamiento crítico|Pentsamendu kritikoa)\s*·\s*/, "").replace(/\((Filosofía 1\.º|Filosofia 1\.º?)\s*·\s*/, "(");
  }
  /* tamaño del recurso (tarjetas o preguntas) para el bloque del final del tema */
  function sizeOf(go_, key){
    var c = coll(COLL[go_]), o = c && c[key]; if (!o) return "";
    if (go_ === "tarjetas" && o.cards) return t("nTarjetas", { n: o.cards.length });
    if (go_ === "cuestionarios" && o.items) return t("nPreguntas", { n: o.items.length });
    return "";
  }

  /* ---------- itinerario de un tema ---------- */
  function sid(n){ return "S" + String(n).padStart(2, "0"); }
  function unidadesDe(tema){
    var C = G("CURSO"); if (!coll("CLASES_IDX") || !Array.isArray(C) || !view("clases")) return [];
    return C.filter(function(u){ return CLASES_TEMA[u.unidad] === tema && u.sesiones && u.sesiones.length; })
      .map(function(u){ return { go: "clases", arg: sid(u.sesiones[0].n), label: t("unidad", { n: u.unidad }) + " · " + strip(String(u.titulo).replace(/\*\*/g, "")) }; });
  }
  function items(go_, subject, tema){ return keysOf(go_, subject, tema).map(function(k){ return { go: go_, arg: k, label: labelOf(go_, k), size: sizeOf(go_, k) }; }); }
  function dilemasDe(teoriaKeys){
    var D = G("DILEMAS"), out = []; if (!Array.isArray(D) || !view("dilemas") || !teoriaKeys.length) return out;
    D.forEach(function(d){ if (d && d.debate && teoriaKeys.indexOf(d.debate.unidad) >= 0) out.push({ go: "dilemas", arg: d.id, label: strip(d.titulo) }); });
    return out;
  }
  function conceptosDe(subject, tema){
    var Gl = G("GLOSARIO"); if (!Array.isArray(Gl) || !view("glosario")) return [];
    return Gl.filter(function(g){ return g && g.subject === subject && g.t && gloTema(g) === tema; }).map(function(g){ return { t: strip(g.t), def: strip(g.def) }; });
  }
  /* pasos (para la tira de una línea de Tarjetas, Cuestionarios y Clases) */
  function itinerario(subject, tema){
    var pre = function(arr, key){ return arr.map(function(r){ r.label = t(key) + " · " + r.label; return r; }); };
    var teoria = items("teoria", subject, tema), clases = subject === "ipc" ? unidadesDe(tema) : [];
    var repaso = [].concat(pre(items("infografias", subject, tema), "infografia"), pre(items("mapas", subject, tema), "mapa"), pre(items("esquemas", subject, tema), "esquema"),
      pre(items("lecturas", subject, tema), "lectura"), pre(items("comentario", subject, tema), "comentario"), pre(dilemasDe(teoria.map(function(x){ return x.arg; })), "dilema"));
    var pasos = [];
    if (teoria.length) pasos.push({ id: "teoria", label: t("p1"), short: t("s1"), items: teoria.concat(clases) });
    else if (clases.length) pasos.push({ id: "clases", label: t("p1clases"), short: t("s1clases"), items: clases });
    var tarj = items("tarjetas", subject, tema), cues = items("cuestionarios", subject, tema);
    if (tarj.length) pasos.push({ id: "tarjetas", label: t("p2"), short: t("s2"), items: tarj });
    if (cues.length) pasos.push({ id: "cuestionarios", label: t("p3"), short: t("s3"), items: cues });
    if (repaso.length) pasos.push({ id: "repaso", label: t("p4"), short: t("s4"), items: repaso });
    return pasos;
  }
  function hereIndex(pasos, here){
    var hereIdx = -1;
    pasos.forEach(function(p, i){ if (hereIdx < 0 && p.items.some(function(x){ return x.go === here.go && (here.arg == null || String(x.arg) === String(here.arg)); })) hereIdx = i; });
    if (hereIdx < 0 && here.go) pasos.forEach(function(p, i){ if (hereIdx < 0 && p.id === here.go) hereIdx = i; });
    return hereIdx;
  }
  function btn(x, cls){ return '<button class="' + (cls || "itin-lnk") + '" type="button" data-igo="' + esc(x.go) + '" data-iarg="' + esc(x.arg) + '">' + esc(x.label) + (x.size ? ' <i>' + esc(x.size) + '</i>' : '') + '</button>'; }
  /* Tira de UNA línea «De este tema» (Tarjetas, Cuestionarios, Clases): un enlace por paso o por tipo de repaso. */
  function stripHtml(pasos, here){
    var hereIdx = hereIndex(pasos, here), out = [];
    pasos.forEach(function(p, i){
      if (i === hereIdx) return;
      if (p.id === "repaso"){
        var seen = {};
        p.items.forEach(function(x){ var tipo = x.label.split(" · ")[0]; if (seen[tipo]) return; seen[tipo] = 1; out.push({ go: x.go, arg: x.arg, label: tipo }); });
      } else out.push({ go: p.items[0].go, arg: p.items[0].arg, label: (p.short || p.label) + (p.items.length > 1 ? " (" + p.items.length + ")" : "") });
    });
    if (!out.length) return "";
    return '<div class="toolrow related-row itin-strip"><span class="flabel" style="align-self:center">' + esc(t("deEsteTema")) + '</span>' +
      out.map(function(x){ return '<button class="btn" type="button" data-igo="' + esc(x.go) + '" data-iarg="' + esc(x.arg) + '">' + esc(x.label) + '</button>'; }).join(" ") + '</div>';
  }
  /* Barra de una línea con los pasos (vistas de PAU). */
  function barHtml(pasos, here, kick, aria, color){
    var hereIdx = hereIndex(pasos, here);
    return '<nav class="itin itin-bar" style="--c:' + color + '" aria-label="' + esc(aria) + '"><span class="itin-kick">' + esc(kick) + '</span><ol class="itin-pills">' +
      pasos.map(function(p, i){
        var f = p.items[0], isHere = i === hereIdx;
        return '<li><button class="itin-pill' + (isHere ? ' here' : '') + '" type="button" data-igo="' + esc(f.go) + '" data-iarg="' + esc(f.arg) + '"' + (isHere ? ' aria-current="step"' : '') +
          ' title="' + esc(p.label) + '"><span class="itin-n" aria-hidden="true">' + (i + 1) + '</span>' + esc(p.short || p.label) + (p.items.length > 1 ? ' <i>' + p.items.length + '</i>' : '') + '</button></li>';
      }).join("") + '</ol></nav>';
  }
  /* Bloque completo de pasos (itinerario PAU en la ficha de la materia). Sin botón de arranque: el profesor no lo quiere. */
  function stepsHtml(pasos, here){
    var hereIdx = hereIndex(pasos, here);
    return '<ol class="itin-steps">' + pasos.map(function(p, i){
      var isHere = i === hereIdx;
      return '<li class="itin-step' + (isHere ? ' here' : '') + '"><span class="itin-n" aria-hidden="true">' + (i + 1) + '</span><div class="itin-body">' +
        '<span class="itin-l">' + esc(p.label) + (isHere ? ' <i class="itin-here">' + esc(t("aqui")) + '</i>' : '') + '</span>' +
        '<div class="itin-links">' + p.items.map(function(x){ return btn(x); }).join("") + '</div></div></li>';
    }).join("") + '</ol>';
  }

  /* ---------- temas de la materia, en orden ---------- */
  function temasDe(subject){
    var T = coll("THEORY"); if (!T || !view("teoria")) return [];
    var ks = Object.keys(T).filter(function(k){ return T[k].subject === subject; });
    if (subject !== "ipc") ks.sort(function(a, b){ var na = temaOf("teoria", a, T[a]) || 0, nb = temaOf("teoria", b, T[b]) || 0; return (na - nb) || ((THEORY_EXTRA[a] ? 1 : 0) - (THEORY_EXTRA[b] ? 1 : 0)); });
    return ks;
  }

  /* ---------- navegación ---------- */
  var LOADERS = Object.assign({ disertaciones: "loadDisert", comentario: "loadComentario" }, window.VIEW_LOADERS || {});
  function go(view_, arg){
    if (!view(view_)) return;
    if (view_ === "dilemas" && fn("goRelated")) return goRelated("dilemas", arg);
    if (fn("show")) show(view_);
    if (view_ === "glosario"){   // concepto del final del tema → Glosario con el término buscado
      var inp = document.querySelector("#glosario .glosearch, #glosario input[type=search], #glosario input[type=text]");
      if (inp && arg){ inp.value = arg; try { inp.dispatchEvent(new Event("input", { bubbles: true })); } catch (e){} }
      return;
    }
    var f = LOADERS[view_];
    if (arg != null && arg !== "" && f && fn(f)) window[f](arg);
  }
  document.addEventListener("click", function(e){
    var b = e.target.closest && e.target.closest("[data-igo]"); if (!b) return;
    e.preventDefault(); go(b.dataset.igo, b.dataset.iarg);
  });

  /* ---------- final de cada tema de Teoría ---------- */
  function finHtml(subject, tema, key){
    var T = coll("THEORY"), teoria = items("teoria", subject, tema), rows = [];
    var row = function(label, arr){ if (arr.length) rows.push('<div class="fin-row"><span class="fin-l">' + esc(label) + '</span><div class="fin-links">' + arr.map(function(x){ return btn(x); }).join("") + '</div></div>'); };
    row(t("tarjetas"), items("tarjetas", subject, tema));
    row(t("cuestionarios"), items("cuestionarios", subject, tema));
    row(t("infografias"), items("infografias", subject, tema));
    row(t("mapas"), items("mapas", subject, tema));
    row(t("esquemas"), items("esquemas", subject, tema));
    row(t("lecturas"), items("lecturas", subject, tema));
    row(t("comentarios"), items("comentario", subject, tema));
    row(t("dilemas"), dilemasDe(teoria.map(function(x){ return x.arg; })));
    var cs = conceptosDe(subject, tema);
    if (cs.length) rows.push('<div class="fin-row"><span class="fin-l">' + esc(t("conceptos")) + '</span><div class="fin-links">' +
      cs.map(function(c){ return '<button class="itin-term" type="button" data-igo="glosario" data-iarg="' + esc(c.t) + '" title="' + esc(c.def) + '">' + esc(c.t) + '</button>'; }).join("") + '</div></div>');
    /* tema anterior / siguiente, en el orden de la materia */
    var ks = temasDe(subject), i = ks.indexOf(key), prev = i > 0 ? ks[i - 1] : null, next = i >= 0 && i < ks.length - 1 ? ks[i + 1] : null;
    var card = function(k, kick, cls){
      if (!k) return '<span class="fin-pn-empty"></span>';
      var tn = temaOf("teoria", k, T[k]), lab = (typeof tn === "number" ? t("tema", { n: tn }) + " · " : "") + strip(T[k].title);
      return '<button class="fin-pn-card' + cls + '" type="button" data-igo="teoria" data-iarg="' + esc(k) + '"><span class="kick">' + esc(kick) + '</span><b>' + esc(lab) + '</b></button>';
    };
    if (!rows.length && !prev && !next) return "";
    return '<section class="itin-fin" style="--c:' + (SUBJ_COLOR[subject] || "var(--accent)") + '" aria-label="' + esc(t("seguir")) + '">' +
      (rows.length ? '<h2>' + esc(t("seguir")) + '</h2>' + rows.join("") : '') +
      '<div class="fin-pager">' + card(prev, "‹ " + t("anterior"), "") + card(next, t("siguienteTema") + " ›", " fin-next") + '</div></section>';
  }
  function itemTema(go_, key){ var c = coll(COLL[go_]), o = c && c[key]; return o ? { subject: o.subject, tema: temaOf(go_, key, o) } : null; }
  function renderTeoria(k){
    var body = document.getElementById("theorybody"), tm = itemTema("teoria", k); if (!body || !tm) return;
    var rel = body.querySelector(".related-row"); if (rel) rel.remove();   // la tira antigua de la cabecera: todo va al final
    body.querySelectorAll(":scope > .itin-fin").forEach(function(o){ o.remove(); });
    if (tm.tema == null) return;
    var tmp = document.createElement("div"); tmp.innerHTML = finHtml(tm.subject, tm.tema, k);
    if (tmp.firstElementChild) body.appendChild(tmp.firstElementChild);
  }
  function renderDeck(k){
    var host = document.getElementById("itin-tarjetas"), tm = itemTema("tarjetas", k); if (!host) return;
    var pasos = tm && tm.tema != null ? itinerario(tm.subject, tm.tema) : [];
    host.innerHTML = pasos.length > 1 ? stripHtml(pasos, { go: "tarjetas", arg: k }) : "";
  }
  function renderQuiz(k){
    var host = document.getElementById("itin-quiz"), tm = itemTema("cuestionarios", k); if (!host) return;
    var pasos = tm && tm.tema != null ? itinerario(tm.subject, tm.tema) : [];
    host.innerHTML = pasos.length > 1 ? stripHtml(pasos, { go: "cuestionarios", arg: k }) : "";
  }
  function renderClase(k){
    var root = document.getElementById("clases-root"), idx = coll("CLASES_IDX"); if (!root || !idx) return;
    var key = fn("clNorm") ? clNorm(k) : k, it = key && idx[key]; if (!it) return;
    var tema = CLASES_TEMA[it.unidad]; if (!tema) return;
    var pasos = itinerario("ipc", tema); if (pasos.length < 2) return;
    root.querySelectorAll(":scope > .itin-strip").forEach(function(o){ o.remove(); });
    var tmp = document.createElement("div"); tmp.innerHTML = stripHtml(pasos, { go: "clases", arg: sid(it.u.sesiones[0].n) });
    if (tmp.firstElementChild) root.insertBefore(tmp.firstElementChild, root.querySelector(".cl-pager") || null);
  }
  function wrap(name, after){
    var orig = window[name]; if (typeof orig !== "function") return;
    window[name] = function(k){ var out = orig.apply(this, arguments); try { after(k); } catch (e){} return out; };
  }
  wrap("loadTheory", renderTeoria); wrap("loadDeck", renderDeck); wrap("loadQuiz", renderQuiz); wrap("loadClase", renderClase);

  /* ---------- itinerario PAU (Historia de la Filosofía) ---------- */
  function pauPasos(){
    var navLabel = function(id){ var b = document.querySelector('#tabs button[data-view="' + id + '"]'); return b ? strip(b.textContent) : ""; };
    var item = function(go_, name, key){ var c = coll(name); if (!view(go_) || !c || !c[key]) return null; return { go: go_, arg: key, label: strip(c[key].title || c[key].name || key) }; };
    var sec = function(id){ return view(id) ? { go: id, arg: "", label: navLabel(id) || id } : null; };
    var steps = [
      { id: "pau", label: t("pau1"), short: t("spau1"), items: [item("pau", "PAU", "estructura"), item("pau", "PAU", "modelos")] },
      { id: "comentario", label: t("pau2"), short: t("spau2"), items: [item("comentario", "COMENTARIO", "metodo"), item("comentario", "COMENTARIO", "consejos"), item("pau", "PAU", "ejercicio1"), sec("lecturas")] },
      { id: "disertaciones", label: t("pau3"), short: t("spau3"), items: [item("disertaciones", "DISERTACIONES", "metodologia"), item("disertaciones", "DISERTACIONES", "temas"), item("disertaciones", "DISERTACIONES", "comparativas")] },
      { id: "pau-ej3", label: t("pau4"), short: t("spau4"), items: [item("pau", "PAU", "ejercicio3"), item("pau", "PAU", "comparativas-temas")] },
      { id: "rubricas", label: t("pau5"), short: t("spau5"), items: [sec("rubricas")] },
      { id: "unidad", label: t("pau6"), short: t("spau6"), items: [sec("cuestionarios"), sec("unidad"), sec("esqautor"), sec("cronogramas")] }
    ];
    return steps.map(function(s){ s.items = s.items.filter(Boolean); return s; }).filter(function(s){ return s.items.length; });
  }
  function pauHere(id){
    var key = { pau: G("pauKey"), comentario: G("comentarioKey"), disertaciones: G("disertKey") }[id];
    return id ? { go: id, arg: key == null ? null : key } : { go: null };
  }
  function pauBar(id){ var pasos = pauPasos(); return pasos.length < 3 ? "" : barHtml(pasos, pauHere(id), t("pau"), t("ariaPau"), "var(--hf)"); }
  function pauHtml(){
    var pasos = pauPasos(); if (pasos.length < 3) return "";
    return '<nav class="itin itin-pau" style="--c:var(--hf)" aria-label="' + esc(t("ariaPau")) + '">' +
      '<div class="itin-top"><span class="itin-kick">' + esc(t("pau")) + '</span><b>' + esc(t("pauLead")) + '</b></div>' + stepsHtml(pasos, { go: null }) + '</nav>';
  }
  var PAU_VIEWS = { pau: 1, disertaciones: 1, comentario: 1, rubricas: 1, unidad: 1 };
  function mount(host, html, where){
    if (!host) return;
    host.querySelectorAll(":scope > .itin").forEach(function(o){ o.remove(); });
    if (!html) return;
    var tmp = document.createElement("div"); tmp.innerHTML = html; var el = tmp.firstElementChild;
    if (where === "start") host.insertBefore(el, host.firstChild); else if (where && where.nodeType) host.insertBefore(el, where); else host.appendChild(el);
  }
  function renderPau(id){
    var sec = document.getElementById(id); if (!sec || !PAU_VIEWS[id]) return;
    var lead = sec.querySelector(":scope > .lead");
    mount(sec, pauBar(id), lead ? lead.nextSibling : "start");
  }
  wrap("loadPau", function(){ renderPau("pau"); }); wrap("loadDisert", function(){ renderPau("disertaciones"); }); wrap("loadComentario", function(){ renderPau("comentario"); });

  /* ---------- ficha de la materia: temas → la web en números → itinerario PAU ---------- */
  function temasHtml(subject){
    var T = coll("THEORY"), ks = temasDe(subject), C = G("CURSO");
    if (!ks.length && subject === "ipc" && Array.isArray(C) && view("clases")){   // 2.º ESO en castellano: las unidades de «Clases»
      return '<div class="sec-head"><h2 class="sec">' + esc(t("unidades")) + '</h2></div><ol class="itin-temas" style="--c:var(--ipc)">' + C.filter(function(u){ return u.sesiones && u.sesiones.length; }).map(function(u){
        return '<li><button type="button" data-igo="clases" data-iarg="' + esc(sid(u.sesiones[0].n)) + '"><span class="temas-n">' + esc(t("unidad", { n: u.unidad })) + '</span><span class="temas-t">' + esc(strip(String(u.titulo).replace(/\*\*/g, ""))) + '</span></button></li>';
      }).join("") + '</ol>';
    }
    if (!ks.length) return "";
    /* HF: agrupada por época, con el color de Ilustres; Filosofía 1.º: por rama (js/epocas.js). Las demás, seguidas. */
    var EP = { int: "Introducción", ant: "Antigua", med: "Medieval", ren: "Renacimiento", mod: "Moderna", ilu: "Ilustración", con: "Contemporánea" };
    var RM = { ant: "Antropología", con: "Conocimiento", log: "Lógica", eti: "Ética", pol: "Política", est: "Estética" };
    var grpNames = null, grpAttr = "", grpOf = null;
    if (subject === "hf"){ grpNames = EP; grpAttr = "ep"; grpOf = window.Epocas ? function(n){ return window.Epocas.epocaDeTema(n); } : function(n){ return n <= 2 ? "int" : n <= 10 ? "ant" : n <= 12 ? "med" : n === 13 ? "ren" : n <= 17 ? "mod" : n <= 20 ? "ilu" : "con"; }; }
    else if (subject === "fil"){ grpNames = RM; grpAttr = "rama"; grpOf = window.Ramas ? function(n){ return window.Ramas.ramaDeTema(n); } : function(n){ return ({ 2: "ant", 3: "con", 4: "log", 5: "eti", 6: "pol", 7: "est" })[n] || null; }; }
    var groups = [], last = null;
    ks.forEach(function(k){
      var n = temaOf("teoria", k, T[k]), g = grpOf && typeof n === "number" ? grpOf(n) : "";
      if (!groups.length || last !== g){ groups.push({ g: g, ks: [] }); last = g; }
      groups[groups.length - 1].ks.push(k);
    });
    return '<div class="sec-head"><h2 class="sec">' + esc(t("temas")) + '</h2></div>' + groups.map(function(gr){
      return (gr.g ? '<h3 class="temas-b" data-' + grpAttr + '="' + esc(gr.g) + '">' + esc((grpNames && grpNames[gr.g]) || gr.g) + '</h3>' : '') + '<ol class="itin-temas" style="--c:' + (SUBJ_COLOR[subject] || "var(--accent)") + '">' + gr.ks.map(function(k){
        var n = temaOf("teoria", k, T[k]), extra = !!THEORY_EXTRA[k], anexo = extra && typeof T[k].temaN === "number";   /* anexos: «Anexo - …», sin «Tema N» */
        return '<li' + (extra ? ' class="temas-extra"' : '') + (gr.g ? ' data-' + grpAttr + '="' + esc(gr.g) + '"' : '') + '><button type="button" data-igo="teoria" data-iarg="' + esc(k) + '">' +
          (typeof n === "number" && !anexo ? '<span class="temas-n">' + esc(t("tema", { n: n })) + '</span>' : '') + '<span class="temas-t">' + esc(strip(T[k].title)) + '</span>' + (anexo ? '<span class="temas-anexo">En clase</span>' : '') + '</button></li>';
      }).join("") + '</ol>';
    }).join("");
  }
  ["fil", "hf", "ipc"].forEach(function(s){
    var el = document.getElementById(s); if (!el) return;
    if (singleSubject() === s) el.querySelectorAll(":scope > .toolrow").forEach(function(o){ o.remove(); });   // sin la fila de botones curados: la lista de temas la sustituye
    var tmp = document.createElement("div");
    tmp.innerHTML = temasHtml(s);
    var first = el.querySelector(":scope > .sec-head");   // «Explora la materia» (la web en números)
    [].slice.call(tmp.children).forEach(function(n){ if (first) el.insertBefore(n, first); else el.appendChild(n); });
    if (s === "hf" && view("pau")){
      tmp.innerHTML = '<div class="itin-hub">' + pauHtml() + '</div>';
      var hub = el.querySelector(".hubmap");
      if (tmp.firstElementChild){ if (hub && hub.parentNode === el) el.insertBefore(tmp.firstElementChild, hub.nextSibling); else el.appendChild(tmp.firstElementChild); }
    }
  });

  /* ---------- migas de contexto ---------- */
  var LANDING = { inicio: 1, fil: 1, hf: 1, ipc: 1 };
  function homeId(){ return view("inicio") ? "inicio" : singleSubject(); }
  function crumbs(id){
    var v = document.getElementById(id); if (!v || !v.classList.contains("view")) return;
    var old = v.querySelector(":scope > .crumbs"); if (old) old.remove();
    if (LANDING[id]) return;
    var btn_ = document.querySelector('#tabs button[data-view="' + id + '"]'), h1 = v.querySelector("h1.title, h1");
    var secLabel = btn_ ? strip(btn_.textContent) : h1 ? strip(h1.textContent) : id;
    var grp = btn_ && btn_.closest(".navsec"), gl = grp && grp.querySelector(".navgroup") ? strip(grp.querySelector(".navgroup").textContent) : "";
    var home = homeId(), html = home ? '<a href="#' + esc(home) + '" data-crumb="' + esc(home) + '">' + esc(t("inicio")) + '</a>' : "";
    if (gl) html += (html ? '<span class="crumb-sep" aria-hidden="true">›</span>' : '') + '<span>' + esc(gl) + '</span>';
    html += (html ? '<span class="crumb-sep" aria-hidden="true">›</span>' : '') + '<span aria-current="page">' + esc(secLabel) + '</span>';
    var nav = document.createElement("nav"); nav.className = "crumbs"; nav.setAttribute("aria-label", t("ariaCrumbs")); nav.innerHTML = html;
    v.insertBefore(nav, v.firstChild);
  }
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("[data-crumb]"); if (!a) return;
    e.preventDefault(); if (fn("show")) show(a.dataset.crumb);
  });
  if (fn("show")){
    var origShow = window.show;
    window.show = function(id){ origShow.apply(this, arguments); try { crumbs(id); renderPau(id); } catch (e){} };
  }
  var active = document.querySelector(".view.active"); if (active) crumbs(active.id);

  /* arranque: las vistas ya cargaron su primer elemento antes de este envoltorio */
  try {
    if (view("teoria") && G("theoryKey") != null) renderTeoria(G("theoryKey"));
    if (G("deckKey") != null) renderDeck(G("deckKey"));
    if (G("quizKey") != null) renderQuiz(G("quizKey"));
  } catch (e){}

  window.Itinerario = { itinerario: itinerario, temaOf: temaOf, go: go };
})();
