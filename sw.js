"use strict";
/* ===== Service Worker — Aula de Filosofía (PWA offline) =====
   Estrategia (desde el 25-09, v21):
   · el CÓDIGO propio (html, js, css, json, manifest) va RED PRIMERO, revalidando con el servidor
     (cache:"no-cache" → un 304 si no ha cambiado), y solo sin conexión sale de la caché: así una
     publicación nueva se ve en la primera visita (antes, con stale-while-revalidate, en la segunda
     o tercera, y la caché HTTP de 10 min de GitHub Pages podía colar ficheros viejos);
   · imágenes, fuentes y CDN (mermaid, markmap) siguen stale-while-revalidate: pesan y casi no cambian.
   Tras la primera visita toda la web ya visitada funciona sin conexión.
   ⚠ Sube VERSION al desplegar cambios para invalidar la caché antigua. */
const VERSION = "v70-2026-10-01";
// Bachillerato y 2.º ESO se sirven en el MISMO origen (mikagiuri.github.io) bajo
// subrutas distintas. La caché debe ser única por sitio o una web desalojaría la
// de la otra: derivamos el prefijo del scope del propio service worker.
const SITE = (new URL(self.registration.scope).pathname).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root";
const PREFIX = "aula-" + SITE + "-";
const CACHE = PREFIX + VERSION;
const CORE = ["./", "./index.html", "./manifest.webmanifest",
  "./media/icons/icon-192.png", "./media/icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(
      ks.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Navegaciones (abrir/refrescar): red primero; si no hay conexión, el index cacheado.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("./index.html")));
    return;
  }
  // Código propio (html/js/css/json/manifest): red primero revalidando; sin red, la caché.
  const url = new URL(req.url);
  if (url.origin === self.location.origin && /\.(?:js|css|html?|json|webmanifest)$/i.test(url.pathname)) {
    e.respondWith(
      fetch(req, { cache: "no-cache" }).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }
  // Resto (imágenes, fuentes, CDN): stale-while-revalidate.
  e.respondWith(
    caches.open(CACHE).then(cache => cache.match(req).then(hit => {
      const net = fetch(req).then(res => {
        // cachea respuestas propias (ok) y de terceros (opacas: fuentes, CDN)
        if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || net;
    }))
  );
});
