"use strict";
/* ===== Vista Calendario ===== depende de: sesiones.js (SEMANAS), data.js (WEEK) =====
   Listado de TODOS los días de clase del curso, agrupado por mes y semana, con el
   tema por materia (del plan semanal) y las asignaturas que se imparten cada día
   (según el horario WEEK). Fechas provisionales. */

const CAL_ASIG = { fil: "Filosofía", hf: "Historia de la Filosofía", ipc: "Pensamiento crítico" };
const CAL_ABRV = { fil: "Filo", hf: "HF", ipc: "PC" };
const CAL_TRIM = { 1: "1.er trimestre", 2: "2.º trimestre", 3: "3.er trimestre" };
const CAL_DIAS = ["lun", "mar", "mié", "jue", "vie"];
const CAL_MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const CAL_CSS = `
#calendario .calnota{color:var(--muted);font-size:12.5px;margin:6px 0 18px;border-left:3px solid var(--ipc);padding-left:10px}
#calendario .calmonth{font-family:var(--serif);font-size:26px;margin:26px 0 12px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:6px}
#calendario .calmonth:first-of-type{margin-top:8px}
#calendario .calweek{border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);padding:12px 16px;margin:0 0 12px}
#calendario .calwkhead{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:baseline}
#calendario .calwk{font-weight:700;font-size:15px;color:var(--ink)}
#calendario .calwkrange{font-family:var(--mono);font-size:12.5px;color:var(--muted)}
#calendario .calwktrim{margin-left:auto;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
#calendario ul.caltemas{list-style:none;margin:10px 0;padding:0;display:grid;gap:5px}
#calendario ul.caltemas li{font-size:13.5px;color:var(--ink);padding-left:12px;position:relative}
#calendario ul.caltemas li::before{content:"";position:absolute;left:0;top:6px;width:7px;height:7px;border-radius:50%;background:var(--c)}
#calendario ul.caltemas b{color:var(--c);font-weight:700}
#calendario .caldays{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:8px}
#calendario .calday{border:1px solid var(--line);border-radius:10px;padding:7px 8px;background:var(--surface-2);min-width:0}
#calendario .calday .d{display:block;font-family:var(--mono);font-size:12px;color:var(--ink);white-space:nowrap}
#calendario .calday .s{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}
#calendario .calday .b{font-size:10.5px;font-weight:700;letter-spacing:.02em;padding:2px 6px;border-radius:6px;color:var(--c);background:color-mix(in srgb, var(--c) 14%, transparent)}
#calendario .calday .off{color:var(--muted);font-size:11px}
@media (max-width:640px){
  #calendario .caldays{grid-template-columns:repeat(5,1fr);gap:4px}
  #calendario .calday{padding:5px 4px}
  #calendario .calday .d{font-size:10.5px}
  #calendario .calday .b{font-size:9px;padding:1px 4px}
}
`;
let _calCss = false;
function calInjectCss(){ if (_calCss) return; const s = document.createElement("style"); s.textContent = CAL_CSS; document.head.appendChild(s); _calCss = true; }

/* Asignaturas que se imparten un día de la semana (0=lun..4=vie) según el horario WEEK. */
function calSubjectsForWeekday(wd){
  const col = wd + 1, subs = new Set();
  WEEK.forEach(function(row){ const c = row[col]; if (Array.isArray(c) && c[0]) subs.add(c[0]); });
  return ["fil", "hf", "ipc"].filter(function(s){ return subs.has(s); });
}

/* Etiqueta "lun 14" para un desplazamiento sobre el lunes iso de una semana. */
function calDayLabel(iso, wd){
  const p = iso.split("-").map(Number);
  const d = new Date(p[0], p[1] - 1, p[2]); d.setDate(d.getDate() + wd);
  return CAL_DIAS[wd] + " " + d.getDate();
}
function calMonthLabel(iso, wd){
  const p = iso.split("-").map(Number);
  const d = new Date(p[0], p[1] - 1, p[2]); d.setDate(d.getDate() + wd);
  const m = CAL_MES[d.getMonth()];
  return m.charAt(0).toUpperCase() + m.slice(1) + " " + d.getFullYear();
}

function renderCalendario(){
  const box = document.getElementById("calbody");
  if (!box) return;
  calInjectCss();
  let html = '<p class="calnota">Fechas provisionales (calendario 26-27 sin confirmar). Los temas son el plan semanal por materia; las asignaturas de cada día salen del horario.</p>';
  let curMonth = "";
  SEMANAS.forEach(function(w){
    // Cabecera de mes (usamos el lunes de la semana).
    const mLabel = calMonthLabel(w.iso, 0);
    if (mLabel !== curMonth){
      curMonth = mLabel;
      html += '<h2 class="calmonth">' + mLabel + '</h2>';
    }
    // Temas por materia.
    const temas = ["fil", "hf", "ipc"].map(function(a){
      return '<li style="--c:var(--' + a + ')"><b>' + CAL_ASIG[a] + '</b> · ' + (w.temas && w.temas[a] ? w.temas[a] : "—") + '</li>';
    }).join("");
    // Franja de los 5 días con sus asignaturas.
    const days = [0, 1, 2, 3, 4].map(function(wd){
      const subs = calSubjectsForWeekday(wd);
      const badges = subs.length
        ? subs.map(function(s){ return '<span class="b" style="--c:var(--' + s + ')">' + CAL_ABRV[s] + '</span>'; }).join("")
        : '<span class="off">—</span>';
      return '<div class="calday"><span class="d">' + calDayLabel(w.iso, wd) + '</span><span class="s">' + badges + '</span></div>';
    }).join("");
    html += '<article class="calweek">' +
      '<div class="calwkhead"><span class="calwk">Semana ' + w.n + '</span>' +
      '<span class="calwkrange">' + w.ini + ' – ' + w.fin + '</span>' +
      '<span class="calwktrim">' + (CAL_TRIM[w.trim] || "") + '</span></div>' +
      '<ul class="caltemas">' + temas + '</ul>' +
      '<div class="caldays">' + days + '</div>' +
      '</article>';
  });
  box.innerHTML = html;
}

renderCalendario();
