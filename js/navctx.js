"use strict";
/* ===== Contexto de navegación por materia — (13 sep 2026; regla ampliada 18 sep) =====
   Regla del usuario: al ENTRAR en una página con filtro de materia, el tag activo
   NUNCA debe ser «Todos» por defecto, sino una MATERIA concreta. «Todos» sigue
   visible y clicable (filtra localmente esa vista), pero no es nunca el estado
   por defecto ni se convierte en la materia de contexto que se propaga entre páginas.

   Mecanismo: se mantiene una «materia de contexto» que es SIEMPRE concreta
   (fil / hf / ipc) — nunca «all» —, se recuerda entre sesiones (localStorage) y se
   preselecciona al mostrar cada página con filtro de materia (solo si difiere de la
   que la página ya tenía, para respetar el bloque/tarjeta/pregunta en que estuviera).

   La materia de contexto se fija cuando:
     · se abre una página de materia (fil / hf / ipc),
     · se pulsa un filtro de MATERIA concreto en cualquier página (data-subj / data-sa),
     · se salta desde una sesión (sesGo pasa la asignatura).
   Pulsar «Todos» NO cambia la materia de contexto (solo filtra la vista actual).

   No modifica ficheros de otros carriles: envuelve la función global show() de
   app.js y usa las variables/funciones globales que ya exponen las vistas
   (comparten el ámbito léxico global entre <script> clásicos). */

(function(){
  var CONCRETE = { fil: 1, hf: 1, ipc: 1 };   // materias válidas como contexto (nunca «all»)
  var DEFAULT_SUBJECT = "fil";                 // materia por defecto la primera vez (se recuerda la última usada)
  var LS_KEY = "aula.ctxSubject";

  function load(){
    try { var v = localStorage.getItem(LS_KEY); if (v && CONCRETE[v]) return v; } catch (e){}
    return DEFAULT_SUBJECT;
  }
  function save(s){ try { localStorage.setItem(LS_KEY, s); } catch (e){} }

  var ctx = { subject: load() };
  window.AulaCtx = ctx;
  /* setCtxSubject solo acepta materias concretas: el contexto nunca es «all». */
  window.setCtxSubject = function(s){ if (s && CONCRETE[s]){ ctx.subject = s; save(s); } };

  /* primera clave (en orden de definición) cuyo objeto sea de la materia dada */
  function firstKeyOf(obj, subj){
    var ks = Object.keys(obj);
    for (var i = 0; i < ks.length; i++){ if (obj[ks[i]] && obj[ks[i]].subject === subj) return ks[i]; }
    return null;
  }
  /* materia a preseleccionar en una vista: la de contexto si tiene contenido ahí;
     si no (p. ej. Teoría no tiene Pensamiento crítico), la primera materia concreta
     con contenido en esa vista. Nunca «all», nunca deja la vista vacía. */
  function pick(obj, s){
    if (firstKeyOf(obj, s)) return s;
    var ks = Object.keys(obj);
    for (var i = 0; i < ks.length; i++){ var it = obj[ks[i]]; if (it && CONCRETE[it.subject]) return it.subject; }
    return s;
  }
  /* primer bloque (A/B/C) con contenido de esa materia (por el campo .block);
     «all» si la materia no usa bloques (Filosofía / Pensamiento crítico, o vistas
     cuyos datos no llevan bloque). Así el filtro de bloque tampoco queda en «Todos». */
  function firstBlockOf(obj, subj){
    var order = ["A", "B", "C"], ks = Object.keys(obj);
    for (var i = 0; i < order.length; i++){
      for (var j = 0; j < ks.length; j++){ var it = obj[ks[j]]; if (it && it.subject === subj && it.block === order[i]) return order[i]; }
    }
    return "all";
  }
  /* (30-09) temas introductorios de HF (1-2): solo con «Todos los bloques» (epocas.js) */
  function intro(go, k){ return !!(window.Epocas && window.Epocas.soloTodos && window.Epocas.soloTodos(go, k)); }
  /* primera clave de esa materia y bloque (bloque «all» = cualquiera); con un bloque concreto, sin los temas introductorios */
  function firstKeyOfSB(obj, subj, block, go){
    var ks = Object.keys(obj);
    for (var i = 0; i < ks.length; i++){ var it = obj[ks[i]]; if (it && it.subject === subj && (block === "all" || (it.block === block && !(go && intro(go, ks[i]))))) return ks[i]; }
    return null;
  }

  /* Cada página con filtro de MATERIA. Se actúa solo si la materia a preseleccionar
     difiere de la que la página ya tiene; al cambiar de materia se reinicia el
     bloque a «todos» y se carga el primer elemento de esa materia (contenido
     coherente con el tag activo). Como la materia es siempre concreta, la vista
     nunca queda por defecto en «Todos». */
  var APPLY = {
    infografias: function(s){
      if (typeof igSubject === "undefined") return; var sub = pick(INFOGRAFIAS, s); if (igSubject === sub) return;
      igSubject = sub; igBloque = firstBlockOf(INFOGRAFIAS, sub); renderIgFilter(); renderIgChips();
      var k = firstKeyOfSB(INFOGRAFIAS, sub, igBloque); if (k) loadInfografia(k);
    },
    mapas: function(s){
      if (typeof mapSubject === "undefined") return; var sub = pick(MAPS, s); if (mapSubject === sub) return;
      mapSubject = sub; mapBlock = firstBlockOf(MAPS, sub); renderMapFilter(); renderMapChips();
      var k = firstKeyOfSB(MAPS, sub, mapBlock); if (k) loadMap(k);
    },
    teoria: function(s){
      if (typeof theorySubject === "undefined") return; var sub = pick(THEORY, s); if (theorySubject === sub) return;
      /* Teoría deriva el bloque del tema (no hay campo .block); los temas de HF van
         en orden A→B→C, así que el bloque por defecto es «A» y el primer tema de HF
         ya es de bloque A. En Filosofía no hay bloques → «all». */
      theorySubject = sub; theoryBlock = (sub === "hf") ? "A" : "all"; renderTheoryFilter(); renderTheoryChips();
      var k = null, tks = Object.keys(THEORY);
      for (var i = 0; i < tks.length && !k; i++) if (THEORY[tks[i]].subject === sub && !(theoryBlock !== "all" && intro("teoria", tks[i]))) k = tks[i];
      if (k) loadTheory(k);
    },
    materiales: function(s){
      if (typeof materialSubject === "undefined") return; var sub = pick(MATERIALS, s); if (materialSubject === sub) return;
      materialSubject = sub; renderMaterialFilter(); renderMaterialChips();
      var k = firstKeyOf(MATERIALS, sub); if (k) loadMaterial(k);
    },
    tarjetas: function(s){
      if (typeof deckSubject === "undefined") return; var sub = pick(DECKS, s); if (deckSubject === sub) return;
      var tipo = typeof deckTipo !== "undefined" && deckTipo !== "all";   // (29-09) filtro «Tipo»: conceptos o frases
      deckSubject = sub; deckBlock = tipo ? "all" : firstBlockOf(DECKS, sub); renderDeckFilter(); renderDeckChips();
      var k = tipo && typeof deckFirstKey === "function" ? deckFirstKey(sub, deckBlock) : firstKeyOfSB(DECKS, sub, deckBlock, "tarjetas"); if (k) loadDeck(k);
    },
    cuestionarios: function(s){
      if (typeof quizSubject === "undefined") return; var sub = pick(QUIZZES, s); if (quizSubject === sub) return;
      quizSubject = sub; quizBlock = firstBlockOf(QUIZZES, sub); renderQuizFilter(); renderQuizChips();
      var k = firstKeyOfSB(QUIZZES, sub, quizBlock, "cuestionarios"); if (k) loadQuiz(k);
    },
    sesiones: function(s){
      if (typeof sesAsig === "undefined" || sesAsig === s) return;
      sesAsig = s; renderSesFilter(); renderSesBody();
    }
  };
  /* Vistas que son «landing» de una materia → registran contexto (id == materia). */
  var LANDING = { fil: 1, hf: 1, ipc: 1 };

  function onShown(id){
    if (LANDING[id]){ ctx.subject = id; save(id); return; }
    var fn = APPLY[id];
    if (fn){ try { fn(ctx.subject); } catch (e){} }
  }

  /* Envolver show() de app.js (ya cargado): toda navegación —barra o
     programática (materias, sesiones)— pasa por aquí. */
  if (typeof window.show === "function"){
    var orig = window.show;
    window.show = function(id){ orig(id); onShown(id); };
  }

  /* Recordar la materia al pulsar un filtro de materia CONCRETO en cualquier página
     (data-subj en infografías/mapas/teoría/materiales/tarjetas/cuestionarios;
     data-sa en sesiones). «Todos» (data-subj="all") no cambia el contexto.
     Captura en fase de captura para no depender del orden. */
  document.addEventListener("click", function(e){
    var t = e.target;
    if (!t || !t.closest) return;
    var b = t.closest("[data-subj],[data-sa]");
    if (!b) return;
    var s = b.dataset.subj || b.dataset.sa;
    if (s && CONCRETE[s]){ ctx.subject = s; save(s); }
  }, true);
})();
