// (01-10) Solo en la web en CHINO de Pensamiento crítico: botón flotante «我想说…» con tarjetas rápidas de
// comunicación (las del juego impreso de ipc/gestion_aula/tarjetas_comunicacion_zh). Al tocar una, se muestra a
// pantalla completa con el chino y el castellano grandes, para que el profesor la lea desde su mesa.
// i18n_rebuild.js (zh) copia este fichero y su css a build/web_eso_zh e inyecta <script>/<link> en index.html.
(function () {
  "use strict";
  var CARDS = [
    ["😕", "我不懂", "No entiendo"],
    ["🆘", "我需要帮助", "Necesito ayuda"],
    ["⏳", "我需要更多时间", "Necesito más tiempo"],
    ["🔁", "请再说一遍", "¿Puedes repetirlo?"],
    ["🐢", "慢一点", "Más despacio, por favor"],
    ["✍️", "你能写下来吗？", "¿Puedes escribirlo?"],
    ["🏁", "我做完了", "He terminado"],
    ["❓", "我有一个问题", "Tengo una pregunta"],
    ["✅", "是 / 对", "Sí"],
    ["❌", "不是 / 不对", "No"],
    ["👍", "好", "Bien / vale"],
    ["🤷", "也许", "Tal vez"]
  ];
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function init() {
    if (document.getElementById("tr-fab")) return;
    var fab = el("button", "tr-fab", '<span aria-hidden="true">💬</span><span class="tr-fab-t">我想说…</span>');
    fab.id = "tr-fab"; fab.type = "button"; fab.setAttribute("aria-label", "我想说… / Quiero decir…");

    var panel = el("div", "tr-panel"); panel.hidden = true; panel.setAttribute("role", "dialog");
    panel.appendChild(el("div", "tr-head", '<span>我想说… <small>Quiero decir…</small></span>'));
    var close = el("button", "tr-x", "✕"); close.type = "button"; close.setAttribute("aria-label", "关闭 / Cerrar");
    panel.firstChild.appendChild(close);
    var grid = el("div", "tr-grid"); panel.appendChild(grid);

    var big = el("div", "tr-big"); big.hidden = true; big.setAttribute("role", "alertdialog");

    CARDS.forEach(function (c) {
      var b = el("button", "tr-card", '<span class="tr-i">' + c[0] + '</span><span class="tr-zh" lang="zh-CN">' + c[1] + '</span><span class="tr-es" lang="es">' + c[2] + '</span>');
      b.type = "button";
      b.addEventListener("click", function () {
        big.innerHTML = '<div class="tr-big-i">' + c[0] + '</div><div class="tr-big-zh" lang="zh-CN">' + c[1] + '</div><div class="tr-big-es" lang="es">' + c[2] + '</div><div class="tr-big-hint">点击关闭 · Toca para cerrar</div>';
        big.hidden = false; panel.hidden = true;
      });
      grid.appendChild(b);
    });
    fab.addEventListener("click", function () { panel.hidden = !panel.hidden; });
    close.addEventListener("click", function () { panel.hidden = true; });
    big.addEventListener("click", function () { big.hidden = true; });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { big.hidden = true; panel.hidden = true; } });
    document.body.appendChild(panel); document.body.appendChild(big); document.body.appendChild(fab);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
