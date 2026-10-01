"use strict";
/* ===== Colores de época y de rama en toda la web (30-09-2026) =====
   Idea del profesor: la distinción por color que ya usa «Ilustres» (y el eje cronológico) vale para toda la web,
   y quita monotonía a la ficha de la materia. En Historia de la Filosofía cada tema tiene época:
   1-2 Introducción (gris) · 3-10 Antigua · 11-12 Medieval · 13 Renacimiento · 14-17 Moderna · 18-20 Ilustración ·
   21-27 Contemporánea. En Filosofía 1.º cada tema (salvo el 1, introductorio) tiene rama: 2 Antropología ·
   3 Conocimiento · 4 Lógica · 5 Ética · 6 Política · 7 Estética. Los colores (--e-int…--e-con y --r-ant…--r-est) están
   en styles.css, en :root, con su versión para oscuro; el atributo data-ep / data-rama de un elemento fija su --e / --r.
   Este módulo:
   · marca con data-ep (HF) o data-rama (Filosofía 1.º) los chips de Teoría, Tarjetas, Cuestionarios, Infografías,
     Mapas, Esquemas, Lecturas y Comentarios, y la cabecera del tema abierto en Teoría (los deduce con
     Itinerario.temaOf, itinerario.js); lo que no tiene tema pero sí bloque (p. ej. las barajas de Frases) toma el
     color de su bloque (A Antigua · B Medieval-Moderna, a dos tonos · C Contemporánea);
   · (30-09) marca también las etiquetas de los filtros: bloques A/B/C de todas las vistas, épocas de Frases e Ilustres,
     temas T1…T27 de Cuestionarios y bloques de Cronogramas;
   · (30-09) temas 1 y 2 de HF (Historicidad y universalidad, Los métodos de la filosofía): son introductorios, van en
     gris y solo salen con el filtro «Todos los bloques» (window.Epocas.soloTodos, lo usan las vistas y navctx.js);
   · lo mantiene al día con un MutationObserver (las vistas repintan sus chips con innerHTML).
   Pensamiento crítico no tiene épocas ni ramas: no se toca. Sin textos. */
(function(){
  var EPOCAS = [["int", 1, 2], ["ant", 3, 10], ["med", 11, 12], ["ren", 13, 13], ["mod", 14, 17], ["ilu", 18, 20], ["con", 21, 27]];
  function epocaDeTema(n){ for (var i = 0; i < EPOCAS.length; i++) if (n >= EPOCAS[i][1] && n <= EPOCAS[i][2]) return EPOCAS[i][0]; return null; }
  /* bloques de HF: B abarca de la Edad Media a la Ilustración y se pinta a dos tonos («medmod») */
  var BLOQUE_EP = { A: "ant", B: "medmod", C: "con" };
  /* Filosofía 1.º: rama de cada tema (el 1, introductorio, no tiene). */
  var RAMAS = { 2: "ant", 3: "con", 4: "log", 5: "eti", 6: "pol", 7: "est" };
  function ramaDeTema(n){ return RAMAS[n] || null; }
  function G(name){ try { return (0, eval)("typeof " + name + " !== 'undefined' ? " + name + " : undefined"); } catch (e){ return undefined; } }
  var COLL = { th: ["teoria", "THEORY"], deck: ["tarjetas", "DECKS"], quiz: ["cuestionarios", "QUIZZES"], ig: ["infografias", "INFOGRAFIAS"], mp: ["mapas", "MAPS"], eq: ["esquemas", "ESQUEMAS"], lec: ["lecturas", "LECTURAS"], com: ["comentario", "COMENTARIO"] };
  /* color de un recurso según su materia: época (HF) o rama (Filosofía 1.º) */
  function colorDe(go, key){
    var It = window.Itinerario, cname = null;
    for (var a in COLL) if (COLL[a][0] === go) cname = COLL[a][1];
    var c = cname ? G(cname) : null, o = c && c[key];
    if (!It || !o) return { ep: null, rama: null };
    var n = It.temaOf(go, key, o);
    if (typeof n !== "number"){
      if (o.subject === "hf" && BLOQUE_EP[o.block]) return { ep: BLOQUE_EP[o.block], rama: null };   // sin tema: el color de su bloque
      return { ep: null, rama: null };
    }
    if (o.subject === "hf") return { ep: epocaDeTema(n), rama: null };
    if (o.subject === "fil") return { ep: null, rama: ramaDeTema(n) };
    return { ep: null, rama: null };
  }
  /* temas introductorios de HF (1 y 2): solo con «Todos los bloques» */
  function soloTodos(go, key){ return colorDe(go, key).ep === "int"; }
  function mark(el, go, key){
    var c = colorDe(go, key);
    if (c.ep) el.setAttribute("data-ep", c.ep); else el.removeAttribute("data-ep");
    if (c.rama) el.setAttribute("data-rama", c.rama); else el.removeAttribute("data-rama");
  }
  function setEp(el, ep){ if (ep){ if (el.getAttribute("data-ep") !== ep) el.setAttribute("data-ep", ep); } else if (el.hasAttribute("data-ep")) el.removeAttribute("data-ep"); }
  /* etiquetas de filtro: atributo → época (los bloques solo en HF: en Filosofía 1.º no hay bloques) */
  var CITA_EP = { antigua: "ant", medieval: "med", moderna: "mod", contemporanea: "con" };
  var CRONO_EP = { A: "ant", B: "mod", C: "con" };   // Cronogramas: A Antigua y medieval · B Moderna · C Contemporánea
  function markFilters(){
    document.querySelectorAll(".fbtn[data-block], .fbtn[data-eb], .fbtn[data-gb], .fbtn[data-blk]").forEach(function(el){
      setEp(el, BLOQUE_EP[el.getAttribute("data-block") || el.getAttribute("data-eb") || el.getAttribute("data-gb") || el.getAttribute("data-blk")]);
    });
    document.querySelectorAll(".cbtn[data-cblock]").forEach(function(el){ setEp(el, CRONO_EP[el.getAttribute("data-cblock")]); });
    document.querySelectorAll(".fbtn[data-ce]").forEach(function(el){ setEp(el, CITA_EP[el.getAttribute("data-ce")]); });
    document.querySelectorAll(".fbtn[data-iep]").forEach(function(el){ var e = el.getAttribute("data-iep"); setEp(el, e === "all" ? null : e); });
    /* temas de Cuestionarios (T1…T27): solo con Historia de la Filosofía elegida */
    var hf = G("quizSubject") === "hf";
    document.querySelectorAll(".fbtn[data-tema]").forEach(function(el){
      var m = hf && /^T(\d+)$/.exec(el.getAttribute("data-tema") || ""); setEp(el, m ? epocaDeTema(+m[1]) : null);
    });
  }
  var pending = false;
  function refresh(){
    pending = false;
    for (var a in COLL){
      var go = COLL[a][0];
      document.querySelectorAll(".chip[data-" + a + "]").forEach(function(el){ mark(el, go, el.getAttribute("data-" + a)); });
    }
    /* cabecera del tema abierto en Teoría y sus tarjetas de tema anterior/siguiente */
    var head = document.querySelector("#theorybody .theory-head"), k = G("theoryKey");
    if (head && k != null) mark(head, "teoria", k);
    document.querySelectorAll("#theorybody .fin-pn-card[data-iarg]").forEach(function(el){ mark(el, "teoria", el.getAttribute("data-iarg")); });
    markFilters();
  }
  function schedule(){ if (pending) return; pending = true; setTimeout(refresh, 0); }
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  window.Epocas = { epocaDeTema: epocaDeTema, EPOCAS: EPOCAS, soloTodos: soloTodos };
  window.Ramas = { ramaDeTema: ramaDeTema, RAMAS: RAMAS };
  /* las vistas pintaron sus chips antes de cargar este módulo: repintarlas para que apliquen soloTodos */
  function repaint(){
    ["renderTheoryChips", "renderDeckChips", "renderQuizFilter", "renderQuizChips", "renderEsqChips"].forEach(function(f){
      var fn = G(f); if (typeof fn === "function"){ try { fn(); } catch (e){} }
    });
    /* Esquemas abre con el primero (en HF, el del tema 1): con un bloque concreto, el primero de ese bloque que no sea introductorio */
    var E = G("ESQUEMAS"), ek = G("esqKey"), eb = G("esqBlock"), le = G("loadEsq");
    if (E && typeof le === "function" && eb !== "all" && ek != null && soloTodos("esquemas", ek)){
      var k2 = Object.keys(E).filter(function(k){ return E[k].block === eb && !soloTodos("esquemas", k); })[0]; if (k2) le(k2);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", repaint); else repaint();
  refresh();
})();
