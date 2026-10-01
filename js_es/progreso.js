"use strict";
/* ===== Mi progreso: exportar / importar TODO (JSON) =====
   Módulo autónomo (no edita archivos compartidos). Añade en el pie un bloque
   «💾 Mi progreso» que junta en un solo archivo todo el progreso guardado por los
   juegos y el estudio: partidas de La República, marcas e historial de Parejas,
   Eudaimonía, Reto, Cuestionarios y tarjetas conocidas.
   Todo se guarda en localStorage con claves «aula-…»; se excluyen las preferencias
   («aula-theme» y «aula.ctxSubject»). */
(function () {
  var EXCLUDE = { "aula-theme": true };            // preferencias, no progreso
  function isProgressKey(k) { return /^aula-/.test(k) && !EXCLUDE[k]; }

  function collect() {
    var out = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (isProgressKey(k)) out[k] = localStorage.getItem(k);   // valor crudo (ya es JSON)
      }
    } catch (e) {}
    return out;
  }

  function stamp() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes());
  }

  function exportAll() {
    var datos = collect();
    var n = Object.keys(datos).length;
    if (!n) { alert("Todavía no hay progreso guardado en este navegador que exportar."); return; }
    var data = { app: "aula-filosofia-progreso", version: 1, exportado: new Date().toISOString(), datos: datos };
    try {
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = "aula-filosofia-progreso-" + stamp() + ".json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    } catch (e) { alert("No se ha podido generar el archivo."); }
  }

  function importAll(file) {
    if (!file) return;
    var rd = new FileReader();
    rd.onload = function () {
      var data; try { data = JSON.parse(rd.result); } catch (e) { alert("El archivo no es un JSON válido."); return; }
      var datos = (data && data.datos && typeof data.datos === "object") ? data.datos : null;
      if (!datos) { alert("El archivo no es un progreso de Aula de Filosofía."); return; }
      var keys = Object.keys(datos).filter(isProgressKey);
      if (!keys.length) { alert("El archivo no contiene progreso reconocible."); return; }
      if (!confirm("Se sustituirá el progreso de este navegador por el del archivo (partidas, marcas, historiales y tarjetas).\n\n" +
                   keys.length + " apartado(s). ¿Continuar?")) return;
      var ok = 0;
      keys.forEach(function (k) {
        var v = datos[k];
        try { JSON.parse(v); localStorage.setItem(k, v); ok++; }   // solo si el valor es JSON válido
        catch (e) {}
      });
      alert("Importado. Se han restaurado " + ok + " apartado(s). La página se recargará para aplicarlo.");
      try { location.reload(); } catch (e) {}
    };
    rd.onerror = function () { alert("No se ha podido leer el archivo."); };
    rd.readAsText(file);
  }

  function injectStyle() {
    if (document.getElementById("progreso-css")) return;
    var s = document.createElement("style");
    s.id = "progreso-css";
    s.textContent =
      "#contenido>footer .progreso-box{margin-top:1rem;padding-top:1rem;border-top:1px solid var(--line);" +
        "display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;}" +
      "#contenido>footer .progreso-h{font-weight:700;}" +
      "#contenido>footer .progreso-btn{font:inherit;cursor:pointer;border:1px solid var(--line);" +
        "background:var(--surface-2,var(--surface));color:var(--ink,inherit);padding:.45rem .8rem;border-radius:9px;" +
        "transition:background .15s,border-color .15s;}" +
      "#contenido>footer .progreso-btn:hover{border-color:var(--accent);}" +
      "#contenido>footer .progreso-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}" +
      "#contenido>footer .progreso-note{flex-basis:100%;margin:.2rem 0 0;font-size:.82rem;color:var(--muted);}";
    document.head.appendChild(s);
  }

  function mount() {
    var footer = document.querySelector("#contenido > footer");
    if (!footer || document.getElementById("progExport")) return;
    injectStyle();
    var box = document.createElement("div");
    box.className = "progreso-box";
    box.innerHTML =
      '<span class="progreso-h">💾 Mi progreso</span>' +
      '<button class="progreso-btn" id="progExport" title="Descarga en un solo archivo JSON todo tu progreso de los juegos y el estudio, para guardarlo o llevarlo a otro equipo">⬇️ Exportar todo mi progreso</button>' +
      '<button class="progreso-btn" id="progImport" title="Restaura tu progreso desde un archivo exportado (sustituye el de este navegador)">⬆️ Importar</button>' +
      '<input type="file" id="progFile" accept="application/json,.json" style="display:none">' +
      '<p class="progreso-note">Reúne tus partidas de La República, las marcas e historiales de Parejas, Eudaimonía, Reto y Cuestionarios y las tarjetas que dominas. Se guarda en este navegador; expórtalo para no perderlo o llevarlo a otro equipo.</p>';
    footer.appendChild(box);
    document.getElementById("progExport").addEventListener("click", exportAll);
    var imp = document.getElementById("progImport"), fi = document.getElementById("progFile");
    imp.addEventListener("click", function () { fi.click(); });
    fi.addEventListener("change", function () { importAll(fi.files && fi.files[0]); fi.value = ""; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
