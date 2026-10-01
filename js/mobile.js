"use strict";
/* Menú móvil: el botón ☰ abre/cierra el menú; dentro, los grupos son plegables
   (acordeón), así que al abrir solo se ven Inicio + los 5 grupos. En escritorio el
   botón y los encabezados están ocultos (mobile.css) y esto no tiene efecto visible. */
(function () {
  const t = document.getElementById("navtoggle");
  const tabs = document.getElementById("tabs");
  if (!t || !tabs) return;
  const secs = Array.prototype.slice.call(tabs.querySelectorAll(".navsec"));

  function collapseAll() {
    secs.forEach(function (s) {
      s.classList.remove("open");
      const g = s.querySelector(".navgroup");
      if (g) g.setAttribute("aria-expanded", "false");
    });
  }
  function openSec(s) {
    s.classList.add("open");
    const g = s.querySelector(".navgroup");
    if (g) g.setAttribute("aria-expanded", "true");
  }
  function closeMenu() { tabs.classList.remove("open"); t.setAttribute("aria-expanded", "false"); collapseAll(); }
  function openMenu() {
    tabs.classList.add("open"); t.setAttribute("aria-expanded", "true");
    collapseAll();
    /* desplegar el grupo de la sección activa, para dar contexto */
    const cur = tabs.querySelector('button[aria-current="true"]');
    const sec = cur && cur.closest(".navsec");
    if (sec) openSec(sec);
  }

  t.addEventListener("click", function (e) { e.stopPropagation(); tabs.classList.contains("open") ? closeMenu() : openMenu(); });

  /* Acordeón: al pulsar un encabezado de grupo, abrir ese (y cerrar los demás). */
  secs.forEach(function (s) {
    const g = s.querySelector(".navgroup");
    if (!g) return;
    function toggleSec(e) { e.stopPropagation(); const wasOpen = s.classList.contains("open"); collapseAll(); if (!wasOpen) openSec(s); }
    g.addEventListener("click", toggleSec);
    g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSec(e); } });
  });

  /* Al pulsar una sección (botón con data-view), cerrar el menú. */
  tabs.addEventListener("click", function (e) { if (e.target.closest("button[data-view]")) closeMenu(); });
  /* Cerrar al pulsar fuera: en móvil con el menú ☰ abierto; en escritorio cuando
     hay un "cajón" desplegado (.navsec.open). */
  document.addEventListener("click", function (e) {
    const anyOpen = tabs.classList.contains("open") || tabs.querySelector(".navsec.open");
    if (anyOpen && !tabs.contains(e.target) && e.target !== t) closeMenu();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
})();
