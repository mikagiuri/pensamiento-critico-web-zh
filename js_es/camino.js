// Generado por tools/build_eso.js — solo Pensamiento crítico (2.º ESO).
const CAMINOS = [
 {
  "id": "audio",
  "subject": "ipc",
  "emoji": "🔊",
  "titulo": "El audio del grupo",
  "tema": "Bulos y medios",
  "intro": "Un audio corre por el grupo de clase. ¿Qué haces tú con él?",
  "start": "inicio",
  "escenas": {
   "inicio": {
    "texto": "Domingo, 22:30. En el grupo de WhatsApp de clase alguien reenvía un audio: una voz dice que mañana cierran el instituto por una plaga de chinches y que «lo ha dicho la directora». En cinco minutos hay cuarenta mensajes.",
    "opciones": [
     {
      "t": "Reenviarlo al grupo de mi familia y al del equipo.",
      "to": "reenvio"
     },
     {
      "t": "Preguntar en el grupo: «¿Quién lo ha dicho? ¿Hay algo oficial?»",
      "to": "preguntar"
     },
     {
      "t": "Mirar primero la web del instituto y las notificaciones oficiales.",
      "to": "comprobar"
     }
    ]
   },
   "reenvio": {
    "texto": "Tu madre avisa en su trabajo de que mañana no podrá ir porque se quedará con tu hermano. Mientras, en el grupo alguien escribe: «¿De dónde ha salido esto? En la web no pone nada».",
    "opciones": [
     {
      "t": "Insistir: «Si lo dice tanta gente, será verdad».",
      "to": "f_bulo"
     },
     {
      "t": "Borrar el mensaje y avisar de que no está comprobado.",
      "to": "f_rectificar"
     }
    ]
   },
   "preguntar": {
    "texto": "Te contestan: «Lo ha dicho la prima de Ane, que conoce a la directora». Un par de personas te llaman aguafiestas por preguntar.",
    "opciones": [
     {
      "t": "Callarme para no quedar mal.",
      "to": "f_silencio"
     },
     {
      "t": "Proponer comprobarlo antes de seguir reenviándolo.",
      "to": "comprobar"
     }
    ]
   },
   "comprobar": {
    "texto": "En la web del instituto no hay nada. Buscas una frase del audio en internet y aparece: es un audio de hace dos años… y de un instituto de otra ciudad.",
    "opciones": [
     {
      "t": "Contarlo en el grupo y poner el enlace.",
      "to": "f_detective"
     },
     {
      "t": "No decir nada: «No es mi problema».",
      "to": "f_silencio"
     }
    ]
   }
  },
  "finales": {
   "f_bulo": {
    "emoji": "📣",
    "titulo": "Bulo en cadena",
    "texto": "El audio llega a cientos de personas. Al día siguiente el instituto abre con normalidad y varias familias han reorganizado su día para nada.",
    "idea": "«Si lo dice mucha gente, será verdad» es una falacia: la apelación a la mayoría. Un bulo no se vuelve verdad por repetirse; se vuelve más peligroso."
   },
   "f_rectificar": {
    "emoji": "↩️",
    "titulo": "Rectificar también es pensar",
    "texto": "Tu mensaje frena a varias personas que iban a reenviarlo. Te ha costado reconocer el error, pero el grupo lo agradece.",
    "idea": "Equivocarse le pasa a cualquiera; lo importante es corregir. Cambiar de opinión ante las pruebas no es debilidad: es pensar críticamente."
   },
   "f_silencio": {
    "emoji": "🤐",
    "titulo": "El silencio también cuenta",
    "texto": "El bulo sigue corriendo. Tú sabías (o sospechabas) que era falso, pero preferiste no destacar.",
    "idea": "La «espiral del silencio»: cuando creemos que la mayoría piensa distinto, callamos, y así el error parece todavía más mayoritario. Callar también es una forma de decidir."
   },
   "f_detective": {
    "emoji": "🕵️",
    "titulo": "Detective de bulos",
    "texto": "Con el enlace, el grupo se calma. Alguien hasta te da las gracias. Mañana hay clase, como siempre.",
    "idea": "Las cuatro preguntas antes de creer o compartir: ¿quién lo dice (fuente)?, ¿de cuándo es (fecha)?, ¿lo confirman otros sitios fiables (contraste)?, ¿quién gana si me lo creo (interés)?"
   }
  }
 },
 {
  "id": "foto",
  "subject": "ipc",
  "emoji": "📸",
  "titulo": "La foto del recreo",
  "tema": "Presión de grupo",
  "intro": "Tu cuadrilla quiere subir una foto de un compañero. Todos te miran.",
  "start": "inicio",
  "escenas": {
   "inicio": {
    "texto": "En el recreo, tu cuadrilla se ríe con una foto de Iker, de tu clase, tropezando en Educación Física. Mikel propone subirla a Instagram con un meme. Todos te miran esperando tu reacción.",
    "opciones": [
     {
      "t": "Reírme y decir: «¡Súbela!».",
      "to": "sube"
     },
     {
      "t": "Decir: «Paso, eso es pasarse».",
      "to": "paso"
     },
     {
      "t": "No decir nada y cambiar de tema.",
      "to": "callo"
     }
    ]
   },
   "sube": {
    "texto": "La foto consigue doscientos «me gusta» y un montón de comentarios. Al día siguiente Iker no viene a clase. En el grupo dicen: «Era una broma, no aguanta nada».",
    "opciones": [
     {
      "t": "Darles la razón: «Solo era una broma».",
      "to": "f_broma"
     },
     {
      "t": "Escribir a Iker en privado para ver cómo está.",
      "to": "f_reparar"
     }
    ]
   },
   "paso": {
    "texto": "Mikel se burla: «Qué aburrido eres». Pero Unai, que estaba callado, te mira y asiente: parece que piensa como tú.",
    "opciones": [
     {
      "t": "Explicar mis razones y buscar el apoyo de Unai.",
      "to": "f_valiente"
     },
     {
      "t": "Ceder para no quedarme fuera.",
      "to": "sube"
     }
    ]
   },
   "callo": {
    "texto": "La foto se sube igual. Durante la tarde no dejas de pensar en ello y te sientes incómodo o incómoda.",
    "opciones": [
     {
      "t": "Hablar con Iker o contárselo a la tutora.",
      "to": "f_reparar"
     },
     {
      "t": "Olvidarlo: «Yo no he hecho nada».",
      "to": "f_testigo"
     }
    ]
   }
  },
  "finales": {
   "f_broma": {
    "emoji": "😶",
    "titulo": "¿Solo una broma?",
    "texto": "Iker tarda días en volver y evita al grupo. La foto sigue circulando aunque ya la hayáis borrado.",
    "idea": "Una broma es graciosa para todos; si solo se ríen unos a costa de otro, es una humillación. Lo que se sube a internet no se puede recoger del todo."
   },
   "f_reparar": {
    "emoji": "🤝",
    "titulo": "Nunca es tarde para reparar",
    "texto": "Iker agradece el mensaje. Con ayuda de la tutora, la foto se retira y el tema se habla en tutoría.",
    "idea": "Reparar el daño (pedir perdón, acompañar, avisar a un adulto) también es tomar partido. Empatía: ponerse en el lugar del otro y actuar en consecuencia."
   },
   "f_valiente": {
    "emoji": "🦁",
    "titulo": "Decir no en grupo",
    "texto": "Con Unai de tu parte, el plan se desinfla. La foto no se sube. Mikel refunfuña, pero no pasa nada más.",
    "idea": "En el experimento de Asch, bastaba con que una sola persona del grupo discrepara para que los demás se atrevieran a decir lo que pensaban. Un aliado lo cambia todo."
   },
   "f_testigo": {
    "emoji": "👀",
    "titulo": "El testigo también decide",
    "texto": "Nadie te culpa, pero la foto hace daño y tú lo sabías. Otras veces volverá a pasar.",
    "idea": "En el acoso no solo están quien agrede y quien lo sufre: también los testigos. Lo que hacen (o no hacen) los espectadores decide muchas veces cómo acaba la historia."
   }
  }
 }
];
