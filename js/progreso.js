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
    if (!n) { alert("这个浏览器里还没有保存可以导出的进度。"); return; }
    var data = { app: "aula-filosofia-progreso", version: 1, exportado: new Date().toISOString(), datos: datos };
    try {
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = "aula-filosofia-progreso-" + stamp() + ".json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    } catch (e) { alert("无法生成文件。"); }
  }

  function importAll(file) {
    if (!file) return;
    var rd = new FileReader();
    rd.onload = function () {
      var data; try { data = JSON.parse(rd.result); } catch (e) { alert("这个文件不是有效的 JSON。"); return; }
      var datos = (data && data.datos && typeof data.datos === "object") ? data.datos : null;
      if (!datos) { alert("这个文件不是“哲学课堂”的进度文件。"); return; }
      var keys = Object.keys(datos).filter(isProgressKey);
      if (!keys.length) { alert("这个文件里没有可以识别的进度。"); return; }
      if (!confirm("这个浏览器里的进度将被文件里的进度替换（对局、成绩、记录和卡片）。\n\n" +
                   keys.length + " 项。要继续吗？")) return;
      var ok = 0;
      keys.forEach(function (k) {
        var v = datos[k];
        try { JSON.parse(v); localStorage.setItem(k, v); ok++; }   // solo si el valor es JSON válido
        catch (e) {}
      });
      alert("已导入。已恢复 " + ok + " 项。页面将重新加载以生效。");
      try { location.reload(); } catch (e) {}
    };
    rd.onerror = function () { alert("无法读取文件。"); };
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
      '<span class="progreso-h">💾 我的进度</span>' +
      '<button class="progreso-btn" id="progExport" title="把你在游戏和学习中的全部进度下载为一个 JSON 文件，用来保存，或带到另一台设备上">⬇️ 导出我的全部进度</button>' +
      '<button class="progreso-btn" id="progImport" title="从导出的文件恢复你的进度（会替换这个浏览器里的进度）">⬆️ 导入</button>' +
      '<input type="file" id="progFile" accept="application/json,.json" style="display:none">' +
      '<p class="progreso-note">汇总你在《理想国》游戏里的对局、“配对”“幸福”“挑战”和测验的成绩与记录，以及你已经掌握的卡片。它保存在这个浏览器里；可以导出，避免丢失，或者带到另一台设备上。</p>';
    footer.appendChild(box);
    document.getElementById("progExport").addEventListener("click", exportAll);
    var imp = document.getElementById("progImport"), fi = document.getElementById("progFile");
    imp.addEventListener("click", function () { fi.click(); });
    fi.addEventListener("change", function () { importAll(fi.files && fi.files[0]); fi.value = ""; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
