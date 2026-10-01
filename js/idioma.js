// (01-10) Interruptor 中文 ⇄ Español de la web china de Pensamiento crítico. La web china lleva dentro la castellana
// (index_es.html + js_es/ + css_es/ + curso_es/, mismas imágenes en media/): el botón salta a la otra versión con la
// MISMA sección (#hash) y la misma posición de lectura (proporción de scroll, vía localStorage, mismo origen).
// <script src="…/idioma.js" data-lang="zh|es" data-other="index_es.html|index.html">. Lo inyecta i18n_rebuild.js (zh).
(function () {
  "use strict";
  var me = document.currentScript, lang = me && me.dataset.lang || "zh", other = me && me.dataset.other || "index_es.html";
  var KEY = "idioma_salto";
  function guardar(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function leer() { try { var v = JSON.parse(localStorage.getItem(KEY) || "null"); localStorage.removeItem(KEY); return v; } catch (e) { return null; } }
  function ratio() { var m = document.documentElement.scrollHeight - innerHeight; return m > 0 ? scrollY / m : 0; }

  function init() {
    if (window.__ASSETS) return;   // descargable de un archivo (tools/build_single.py): no lleva la otra versión
    var b = document.createElement("button");
    b.type = "button"; b.className = "idioma-btn";
    b.innerHTML = lang === "zh" ? '<span aria-hidden="true">🔁</span> Español' : '<span aria-hidden="true">🔁</span> 中文';
    b.title = lang === "zh" ? "切换到西班牙语 · Ver en castellano" : "Ver en chino · 切换到中文";
    b.addEventListener("click", function () {
      guardar({ h: location.hash, r: ratio(), t: Date.now() });
      location.href = other + location.hash;
    });
    document.body.appendChild(b);
    var v = leer();
    if (v && Date.now() - v.t < 20000 && v.h === location.hash && v.r > 0) {
      var ir = function () { var m = document.documentElement.scrollHeight - innerHeight; if (m > 0) scrollTo(0, Math.round(v.r * m)); };
      setTimeout(ir, 350); setTimeout(ir, 1200);   // la vista se pinta tras cargar los datos
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
