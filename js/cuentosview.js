"use strict";
/* ===== Vista Cuentos ===== depende de: materials.js (MATERIALS) =====
   «Cuentos para pensar» de Pensamiento crítico (2.º ESO): las lecturas ipc-lec-* de MATERIALS,
   con sección propia (chips + índice + texto), separadas de los Materiales de sesión.
   La hoja del profesor (ipc-lec-soluciones) no entra: la retira studentizeCollection y aquí se excluye. */

/* Ficha de trabajo descargable (PDF en blanco y negro, para fotocopiar) de cada cuento.
   Se genera con tools/imprimible_lectura.py <slug> --bn y se copia a web/media/lecturas/fichas/.
   Mapa clave ipc-lec-* → slug de la ficha (lectura_<slug>.md); al añadir un cuento, añade su línea. */
const CUENTO_PDF = {
  "ipc-lec-gyges": "anillo_de_gyges", "ipc-lec-antigona": "antigona",
  "ipc-lec-diogenes": "diogenes_y_las_lentejas", "ipc-lec-monjes": "dos_monjes_y_muchacha",
  "ipc-lec-estomago": "el_estomago", "ipc-lec-elefante": "elefante_encadenado",
  "ipc-lec-damocles": "espada_de_damocles", "ipc-lec-infierno": "infierno_y_paraiso",
  "ipc-lec-hachas": "ladron_de_hachas", "ipc-lec-lobo": "lobo_y_perro",
  "ipc-lec-narciso": "narciso", "ipc-lec-midas": "orejas_del_rey_midas",
  "ipc-lec-palillos": "palillos_de_marfil", "ipc-lec-puercoespines": "puercoespines",
  "ipc-lec-rana": "rana_y_escorpion", "ipc-lec-rey": "rey_que_cojeaba",
  "ipc-lec-serpiente": "serpiente_y_aldeanos", "ipc-lec-tamices": "socrates_tres_tamices",
  "ipc-lec-mariposa": "sueno_de_la_mariposa", "ipc-lec-zar": "zar_camisa_hombre_feliz",
  "ipc-lec-zorro": "zorro_y_tigre",
};
function cuentoPdf(k){ return CUENTO_PDF[k] ? "media/lecturas/fichas/lectura_" + CUENTO_PDF[k] + "_alumnado_zh_bn.pdf" : null; }

function isCuento(k){ return /^ipc-lec-/.test(k) && !/soluciones/.test(k); }
function cuentoKeys(){ return typeof MATERIALS === "undefined" ? [] : Object.keys(MATERIALS).filter(isCuento); }

let cuentoKey = cuentoKeys()[0] || null;

function renderCuentoChips(){
  const box = document.getElementById("cuentochips");
  if (!box) return;
  box.innerHTML = cuentoKeys()
    .map(k => '<button class="chip" data-cuento="' + k + '" aria-pressed="' + (k === cuentoKey) + '">' + MATERIALS[k].title + '</button>').join("");
  box.querySelectorAll("[data-cuento]").forEach(b => b.addEventListener("click", () => loadCuento(b.dataset.cuento)));
}

function loadCuento(k){
  if (!isCuento(k) || !MATERIALS[k]) k = cuentoKeys()[0];
  cuentoKey = k;
  renderCuentoChips();
  const t = k && MATERIALS[k], body = document.getElementById("cuentobody");
  if (!body) return;
  const cnt = document.getElementById("cuentocount");
  if (cnt) cnt.textContent = cuentoKeys().length + " 个故事";
  if (!t){ body.innerHTML = '<p class="lead">这个网站里没有故事。</p>'; return; }
  const pdf = cuentoPdf(k);
  const dl = pdf ? '<p class="cuento-dl"><a class="btn" href="' + pdf + '" download>⬇ 下载学习单（PDF，黑白）</a></p>' : '';
  body.innerHTML = '<div class="theory-head"><span class="kick" style="color:var(--' + t.subject + ')">思考故事</span><h1>' + t.title + '</h1>' + dl + '</div>' + t.html;
  const hs = [...body.querySelectorAll("h2")];
  hs.forEach((h, i) => { h.id = "ch-" + i; });
  const toc = document.getElementById("ctoc");
  if (toc) toc.innerHTML = '<div class="toc-title">本故事中</div><ol>' +
    hs.map((h, i) => '<li><a href="#ch-' + i + '">' + h.textContent + '</a></li>').join("") + '</ol>';
}

if (document.getElementById("cuentobody")) loadCuento(cuentoKey);
