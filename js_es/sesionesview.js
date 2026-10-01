"use strict";
/* ===== Vista Sesiones ===== depende de: sesiones.js =====
   Secuenciación anual del curso (rejilla de semanas con el tema por materia) y, en la
   semana en curso, el detalle de cada sesión con enlaces a los materiales de la web.
   Filtros: asignatura y semana. Estilos propios (variables de tema de styles.css). */

const SES_ASIG = { fil: "Filosofía 1.º", hf: "Historia de la Filosofía", ipc: "Pensamiento crítico" };
const SES_TRIM = { 1: "1.er trimestre", 2: "2.º trimestre", 3: "3.er trimestre" };
const SES_DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie"];
let sesAsig = "all";
let sesWeek = null;

const SES_CSS = `
#sesiones .seswrap{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0 6px}
#sesiones .sesnav{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
#sesiones select.sesweek{padding:9px 12px;border:1px solid var(--line);border-radius:12px;font:inherit;background:var(--surface);color:var(--ink);max-width:100%}
#sesiones .sesbtn{padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);font:inherit;cursor:pointer}
#sesiones .sesbtn:hover{border-color:var(--accent)}
#sesiones .seshead{margin:14px 0 4px}
#sesiones .seshead h2{margin:0;font-family:var(--serif);font-size:24px}
#sesiones .seshead .trim{color:var(--muted);font-size:13px;letter-spacing:.04em}
#sesiones .sesnota{color:var(--muted);font-size:12.5px;margin:6px 0 16px;border-left:3px solid var(--ipc);padding-left:10px}
#sesiones .sestemas{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin:0 0 20px}
#sesiones .sestema{border:1px solid var(--line);border-top:3px solid var(--c);border-radius:var(--radius);padding:12px 14px;background:var(--surface)}
#sesiones .sestema .m{font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:var(--c)}
#sesiones .sestema .t{font-size:14.5px;margin-top:4px;color:var(--ink)}
#sesiones .sesday{margin:18px 0 8px;font-family:var(--serif);font-size:18px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:4px}
#sesiones .sescard{border:1px solid var(--line);border-left:4px solid var(--c);border-radius:var(--radius);padding:13px 16px;background:var(--surface);box-shadow:var(--shadow);margin:0 0 10px}
#sesiones .sescard .top{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;justify-content:space-between}
#sesiones .sescard .when{font-family:var(--mono);font-size:12.5px;color:var(--muted)}
#sesiones .sescard .badge{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--c)}
#sesiones .sescard h4{margin:5px 0 2px;font-size:16.5px;color:var(--ink)}
#sesiones .sescard .obj{font-size:14px;color:var(--ink);margin:4px 0}
#sesiones .sescard .sec{font-size:13px;color:var(--muted);margin:4px 0 8px}
#sesiones .seslinks{display:flex;flex-wrap:wrap;gap:6px}
#sesiones .seslink{padding:6px 10px;border:1px solid var(--line);border-radius:999px;background:var(--surface-2);color:var(--ink);font-size:12.5px;cursor:pointer}
#sesiones .seslink:hover{border-color:var(--c);color:var(--c)}
#sesiones .sesempty{color:var(--muted);padding:14px 2px}
`;
let _sesCss = false;
function sesInjectCss(){ if (_sesCss) return; const s = document.createElement("style"); s.textContent = SES_CSS; document.head.appendChild(s); _sesCss = true; }

function sesFriday(iso){ const p = iso.split("-").map(Number); const d = new Date(p[0], p[1] - 1, p[2]); d.setDate(d.getDate() + 4); return d; }
function sesCurrentWeek(){
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let i = 0; i < SEMANAS.length; i++){ if (sesFriday(SEMANAS[i].iso) >= today) return SEMANAS[i].n; }
  return SEMANAS[SEMANAS.length - 1].n;
}
function sesGet(n){ return SEMANAS.find(function (w){ return w.n === n; }) || SEMANAS[0]; }

function sesGo(view, fn, arg, asig){
  // Fija la materia de contexto (así la página destino abre con su tag activo).
  if (asig && typeof setCtxSubject === "function") setCtxSubject(asig);
  const btn = document.querySelector('#tabs [data-view="' + view + '"]');
  if (btn) btn.click();
  if (fn && arg && typeof window[fn] === "function"){ try { window[fn](arg); } catch (e) {} }
  window.scrollTo(0, 0);
}

function renderSesFilter(){
  const box = document.getElementById("sesfilter");
  if (!box) return;
  sesInjectCss();
  const subj = ["all", "fil", "hf", "ipc"].map(function (a){
    return '<button class="fbtn" data-sa="' + a + '" aria-pressed="' + (a === sesAsig) + '">' +
      (a === "all" ? "Todas" : SES_ASIG[a]) + '</button>'; }).join("");
  const opts = SEMANAS.map(function (w){
    return '<option value="' + w.n + '"' + (w.n === sesWeek ? " selected" : "") + '>Sem. ' + w.n + ' · ' + w.ini + '–' + w.fin + ' · ' + w.trim + '.er tr.</option>'; }).join("");
  box.innerHTML =
    '<div class="fgroup"><span class="flabel">Materia</span>' + subj + '</div>' +
    '<div class="seswrap"><span class="flabel">Semana</span><div class="sesnav">' +
      '<button class="sesbtn" id="sesprev" aria-label="Semana anterior">‹</button>' +
      '<select class="sesweek" id="sesweek" aria-label="Elegir semana">' + opts + '</select>' +
      '<button class="sesbtn" id="sesnext" aria-label="Semana siguiente">›</button>' +
      '<button class="sesbtn" id="seshoy">Esta semana</button>' +
    '</div></div>';
  box.querySelectorAll("[data-sa]").forEach(function (b){ b.addEventListener("click", function (){ sesAsig = b.dataset.sa; renderSesFilter(); renderSesBody(); }); });
  document.getElementById("sesweek").addEventListener("change", function (e){ sesWeek = +e.target.value; renderSesBody(); });
  document.getElementById("sesprev").addEventListener("click", function (){ sesWeek = Math.max(SEMANAS[0].n, sesWeek - 1); renderSesFilter(); renderSesBody(); });
  document.getElementById("sesnext").addEventListener("click", function (){ sesWeek = Math.min(SEMANAS[SEMANAS.length - 1].n, sesWeek + 1); renderSesFilter(); renderSesBody(); });
  document.getElementById("seshoy").addEventListener("click", function (){ sesWeek = sesCurrentWeek(); renderSesFilter(); renderSesBody(); });
}

function renderSesBody(){
  const box = document.getElementById("sesbody");
  if (!box) return;
  const w = sesGet(sesWeek);
  const asigs = sesAsig === "all" ? ["fil", "hf", "ipc"] : [sesAsig];
  let html = '<div class="seshead"><h2>Semana ' + w.n + ' · ' + w.ini + ' – ' + w.fin + '</h2>' +
    '<span class="trim">' + (SES_TRIM[w.trim] || "") + (w.n === sesCurrentWeek() ? " · semana en curso" : "") + '</span></div>';

  // Temas de la semana (secuenciación)
  html += '<div class="sestemas">' + asigs.map(function (a){
    return '<div class="sestema" style="--c:var(--' + a + ')"><div class="m">' + SES_ASIG[a] + '</div><div class="t">' + (w.temas[a] || "—") + '</div></div>'; }).join("") + '</div>';

  // Sesiones detalladas (si las hay)
  if (w.sesiones && w.sesiones.length){
    const list = w.sesiones.filter(function (s){ return sesAsig === "all" || s.asig === sesAsig; });
    if (!list.length){ html += '<p class="sesempty">Sin sesiones de esta materia esta semana.</p>'; }
    else {
      SES_DIAS.forEach(function (dpref){
        const day = list.filter(function (s){ return s.dia.startsWith(dpref); });
        if (!day.length) return;
        html += '<div class="sesday">' + day[0].dia + '</div>';
        day.forEach(function (s){
          const links = (s.enl || []).map(function (e, i){
            return '<button class="seslink" data-w="' + w.n + '" data-i="' + w.sesiones.indexOf(s) + '" data-li="' + i + '">' + e.t + '</button>'; }).join("");
          html += '<article class="sescard" style="--c:var(--' + s.asig + ')">' +
            '<div class="top"><span class="badge">' + SES_ASIG[s.asig] + ' · ' + s.grupo + ' · aula ' + s.aula + '</span>' +
            '<span class="when">' + s.hora + ' · ' + s.cod + '</span></div>' +
            '<h4>' + s.titulo + '</h4>' +
            '<p class="obj">' + s.obj + '</p><p class="sec">' + s.sec + '</p>' +
            (links ? '<div class="seslinks">' + links + '</div>' : '') + '</article>';
        });
      });
    }
  } else {
    html += '<p class="sesempty">Detalle de sesiones por concretar (secuenciación provisional). Usa la barra superior para ver otra semana o vuelve a «Esta semana».</p>';
  }
  box.innerHTML = html;

  box.querySelectorAll(".seslink").forEach(function (b){
    b.addEventListener("click", function (){
      const wk = sesGet(+b.dataset.w); const s = wk.sesiones[+b.dataset.i]; const e = s.enl[+b.dataset.li];
      sesGo(e.view, e.fn, e.arg, s.asig);
    });
  });
}

if (document.getElementById("sesbody")){   // solo si la vista de Sesiones existe (no en las webs de alumnado)
  sesWeek = sesCurrentWeek();
  renderSesFilter();
  renderSesBody();
}
