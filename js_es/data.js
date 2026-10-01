// Generado por tools/build_eso.js — solo Pensamiento crítico (2.º ESO).
const WEEK = [
 [
  "8:00",
  "",
  "",
  "",
  "",
  ""
 ],
 [
  "8:55",
  "",
  "",
  "",
  "",
  ""
 ],
 [
  "9:50",
  "",
  "",
  "",
  "",
  [
   "ipc",
   "P. crítico · S2"
  ]
 ],
 [
  "11:15",
  "",
  "",
  "",
  [
   "ipc",
   "P. crítico · S1"
  ],
  ""
 ],
 [
  "12:10",
  "",
  "",
  "",
  "",
  ""
 ],
 [
  "13:05",
  "",
  "",
  "",
  "",
  ""
 ]
];
const SUBJECTS = {
 "ipc": {
  "name": "Pensamiento crítico",
  "kick": "2.º de ESO · Inicio de curso",
  "color": "var(--ipc)",
  "intro": "Fundamentar los conceptos del curso (opinión, pregunta y tipos de pregunta, argumentación, debate, diálogo, crítica, criterio, autonomía, conflicto, negociación) y hacer la preevaluación inicial.",
  "mats": [],
  "tools": [
   [
    "Clases: todas las sesiones",
    "clases",
    ""
   ],
   [
    "Cuestionario: falacias",
    "cuestionarios",
    "falacias"
   ],
   [
    "Dilemas éticos (Elige A o B)",
    "dilemas",
    ""
   ],
   [
    "Juego: Si la clase fuera el mundo",
    "mundo",
    ""
   ],
   [
    "Cuestionario: huella ecológica",
    "cuestionarios",
    "ipc-huella-q"
   ],
   [
    "Lecturas para pensar (cuentos)",
    "cuentos",
    ""
   ]
  ]
 }
};
const DECKS = {
 "ipc-conceptos": {
  "name": "Pensamiento crítico · Conceptos básicos",
  "subject": "ipc",
  "cards": [
   [
    "💬",
    "Opinión",
    "Lo que alguien piensa sobre algo. Vale más cuando se apoya en razones y no solo en gustos."
   ],
   [
    "🧩",
    "Argumento",
    "Una afirmación (conclusión) defendida con razones (premisas)."
   ],
   [
    "❓",
    "Pregunta",
    "La herramienta del pensamiento: abre la investigación en vez de cerrarla."
   ],
   [
    "🗣️",
    "Debate",
    "Confrontar posturas con argumentos para defender una idea."
   ],
   [
    "🤝",
    "Diálogo",
    "Pensar juntos para acercarse a la verdad, no para «ganar»."
   ],
   [
    "🔍",
    "Pensamiento crítico",
    "Examinar las ideas (propias y ajenas) antes de aceptarlas, buscando razones y pruebas."
   ],
   [
    "📏",
    "Criterio",
    "La razón o la regla en la que baso un juicio o una decisión."
   ],
   [
    "🧭",
    "Autonomía",
    "Pensar y decidir por uno mismo, con criterio propio, frente a seguir a la masa."
   ],
   [
    "🕊️",
    "Principio de caridad",
    "Interpretar la postura del otro en su versión más fuerte antes de criticarla."
   ],
   [
    "⚔️",
    "Conflicto",
    "Choque de intereses o de ideas; puede resolverse con diálogo y negociación."
   ],
   [
    "🤲",
    "Negociación",
    "Buscar un acuerdo en el que las partes ceden algo para ganar algo."
   ]
  ]
 },
 "ipc-falacias": {
  "name": "Pensamiento crítico · Falacias",
  "subject": "ipc",
  "cards": [
   [
    "🙅",
    "Ad hominem",
    "Atacar a la persona en vez de a su argumento: «¿Qué vas a decir tú, que llegas tarde todos los días?»."
   ],
   [
    "🥊",
    "Hombre de paja",
    "Deformar lo que dice el otro para rebatir una versión más fácil de tumbar."
   ],
   [
    "🚪",
    "Falso dilema",
    "Presentar solo dos opciones cuando hay más: «O estás conmigo o estás contra mí»."
   ],
   [
    "👥",
    "Ad populum",
    "«Lo hace todo el mundo, así que es bueno». Que muchos lo hagan no lo hace verdad."
   ],
   [
    "🎓",
    "Apelación a la autoridad",
    "«Lo dice un famoso, será verdad». Citar a quien no es experto en el tema."
   ],
   [
    "🔗",
    "Falsa causa (post hoc)",
    "Creer que si algo ocurrió después, fue por su causa: «Aprobé con estos calcetines»."
   ],
   [
    "😱",
    "Apelación al miedo",
    "Convencer asustando con consecuencias terribles de las que no se da ninguna prueba."
   ],
   [
    "😢",
    "Apelación a la compasión",
    "Dar pena en lugar de dar razones."
   ],
   [
    "🎲",
    "Generalización precipitada",
    "Sacar una regla general de muy pocos casos: «Fui dos veces y siempre está lleno»."
   ],
   [
    "⏳",
    "Apelación a la tradición",
    "«Siempre se ha hecho así», como si eso por sí solo lo justificara."
   ]
  ]
 },
 "ipc-sesgos": {
  "name": "Pensamiento crítico · Sesgos cognitivos",
  "subject": "ipc",
  "cards": [
   [
    "🧲",
    "Sesgo de confirmación",
    "Buscar y creer solo lo que confirma lo que ya pienso, ignorando lo demás."
   ],
   [
    "⚓",
    "Anclaje",
    "Quedarse pegado al primer dato recibido al juzgar (el primer precio, la primera cifra)."
   ],
   [
    "📺",
    "Disponibilidad",
    "Creer que algo es más probable solo porque lo recuerdo con facilidad (sale mucho en las noticias)."
   ],
   [
    "🐑",
    "Arrastre (efecto bandwagon)",
    "Pensar u opinar como el grupo por no quedarme fuera."
   ],
   [
    "✨",
    "Efecto halo",
    "Si alguien me cae bien o me parece atractivo, doy por buenas todas sus ideas."
   ],
   [
    "⏰",
    "FOMO",
    "Miedo a perderse algo; empuja a decidir por impulso para no quedar atrás."
   ],
   [
    "🔀",
    "Sesgo ≠ falacia",
    "La falacia es un error en el argumento; el sesgo es un atajo mental que tuerce cómo pensamos."
   ]
  ]
 },
 "ipc-publicidad": {
  "name": "Pensamiento crítico · Publicidad y medios",
  "subject": "ipc",
  "cards": [
   [
    "🌟",
    "Testimonio / influencer",
    "Alguien famoso recomienda el producto para que confíes en él."
   ],
   [
    "👥",
    "Todos lo tienen (bandwagon)",
    "«Únete a los millones que ya lo usan»."
   ],
   [
    "⏳",
    "Escasez y urgencia",
    "«Solo hoy», «últimas unidades»: presionan para decidir sin pensar."
   ],
   [
    "🌈",
    "Publicidad aspiracional",
    "No vende el producto, sino la vida feliz y admirada que promete."
   ],
   [
    "😂",
    "Humor y emoción",
    "Te hace reír o emocionarte para que asocies esa sensación con la marca."
   ],
   [
    "🎯",
    "Clickbait",
    "Titular exagerado que promete más de lo que da, para que hagas clic."
   ],
   [
    "✅",
    "Contrastar fuentes",
    "Antes de creer o compartir: ¿quién lo dice?, ¿con qué pruebas?, ¿lo confirman otros?"
   ],
   [
    "🧠",
    "Alfabetización mediática",
    "Saber leer críticamente los medios: distinguir información, opinión y publicidad."
   ]
  ]
 },
 "ipc-huella": {
  "name": "Pensamiento crítico · Mi huella en el planeta",
  "subject": "ipc",
  "cards": [
   [
    "👣",
    "Huella ecológica",
    "Tierra y mar productivos que hacen falta para producir lo que consumimos y absorber nuestros residuos. Se mide en hectáreas globales."
   ],
   [
    "🌱",
    "Biocapacidad",
    "Lo que la naturaleza puede regenerar en un año: bosques, pesca, cosechas, suelo."
   ],
   [
    "🌍",
    "¿Cuántos planetas?",
    "La humanidad consume como si tuviera unos 1,7 planetas. Viviendo como en España harían falta más de dos."
   ],
   [
    "📅",
    "Día de la Sobrecapacidad",
    "Fecha en que ya hemos gastado lo que el planeta regenera en todo el año. Últimamente, a finales de julio o principios de agosto."
   ],
   [
    "🏭",
    "Huella de carbono",
    "El CO₂ que emitimos con la energía, el transporte y lo que compramos. Es la parte más grande de la huella de los países ricos."
   ],
   [
    "⚖️",
    "Justicia ambiental",
    "Quien más consume no es quien más sufre las consecuencias: sequías e inundaciones golpean más a los pobres."
   ],
   [
    "♻️",
    "Reducir, reutilizar, reciclar",
    "En ese orden: lo mejor es no generar el residuo; reciclar es el último recurso."
   ],
   [
    "🎭",
    "Greenwashing",
    "Publicidad que pinta de «verde» algo que no lo es. Pregunta: ¿qué cambia de verdad en lo que hace la empresa?"
   ]
  ]
 },
 "ipc-prejuicios": {
  "name": "Pensamiento crítico · Prejuicios y estereotipos",
  "subject": "ipc",
  "cards": [
   [
    "🔍",
    "¿Estereotipo o dato?",
    "Un dato se puede comprobar y habla de hechos («el 30 % de…»). Un estereotipo mete a todo un grupo en el mismo saco («todos los X son…»)."
   ],
   [
    "🌍",
    "Racismo",
    "Juzgar o tratar peor a alguien por su color de piel u origen étnico, como si eso dijera algo de cómo es."
   ],
   [
    "🧳",
    "Xenofobia",
    "Rechazo a las personas que vienen de otros países: se las ve como una amenaza o una carga sin conocerlas."
   ],
   [
    "🪙",
    "Aporofobia",
    "Rechazo a las personas pobres (palabra de la filósofa Adela Cortina). Al turista rico se le recibe bien; al pobre, no."
   ],
   [
    "♀️",
    "Machismo y sexismo",
    "Creer que un género vale más o sirve para unas cosas y no para otras («eso es de chicas», «los chicos no lloran»)."
   ],
   [
    "🏳️‍🌈",
    "LGTBIfobia",
    "Rechazo o burla hacia las personas por su orientación sexual o su identidad de género."
   ],
   [
    "👵",
    "Edadismo",
    "Prejuicios por la edad: «los mayores no se enteran», «los jóvenes no saben nada»."
   ],
   [
    "♿",
    "Capacitismo",
    "Tratar a las personas con discapacidad como si fueran menos capaces en todo, o solo como objeto de pena."
   ],
   [
    "🕊️",
    "Prejuicio religioso",
    "Ideas negativas sobre alguien por su religión o por no tener ninguna."
   ],
   [
    "👀",
    "Por la apariencia",
    "Juzgar por el cuerpo, el peso, la ropa o la cara. Las burlas por el peso son una de las formas de acoso más frecuentes."
   ],
   [
    "🧠",
    "Estigma de la salud mental",
    "Creer que quien tiene un problema de salud mental es peligroso, flojo o «se lo inventa». El estigma hace que no se pida ayuda."
   ],
   [
    "🙋",
    "¿Qué puedo hacer?",
    "Pedir datos antes de generalizar, conocer a la persona antes que a la etiqueta y no reírse de la broma que humilla."
   ]
  ]
 },
 "ipc-moda": {
  "name": "Pensamiento crítico · Moda rápida (documental)",
  "subject": "ipc",
  "cards": [
   [
    "📅",
    "52 colecciones al año",
    "Antes había unas 4 colecciones al año; hoy algunas cadenas sacan una microcolección cada semana."
   ],
   [
    "👕",
    "120.000 millones",
    "Según el documental, cada año se producen en el mundo más de 120.000 millones de prendas."
   ],
   [
    "🏷️",
    "Sin estrenar",
    "Según un estudio de Greenpeace, alrededor del 40 % de la ropa que se compra no se llega a usar nunca."
   ],
   [
    "🎉",
    "El top de fiesta",
    "Una prenda de fiesta se usa de media una o dos veces antes de tirarla."
   ],
   [
    "🛢️",
    "Ropa de petróleo",
    "Cerca del 70 % de los tejidos nuevos son fibras sintéticas que salen del petróleo."
   ],
   [
    "♻️",
    "El mito del reciclaje",
    "Reciclar ropa vieja para hacer ropa nueva casi no existe: el poliéster «reciclado» sale sobre todo de botellas de plástico."
   ],
   [
    "🔥",
    "El destino: Bulgaria",
    "Mucha ropa desechada acaba en países pobres de Europa del Este, donde algunas familias la queman en estufas porque no pueden pagar la leña."
   ],
   [
    "☠️",
    "Humo tóxico",
    "Quemar tejidos con plásticos suelta gases contaminantes y dioxinas, que pueden causar cáncer."
   ],
   [
    "📱",
    "Influencers",
    "Las redes sociales empujan las tendencias sin parar y llevan directamente a la tienda online."
   ],
   [
    "🙂",
    "Felicidad de un día",
    "La alegría de estrenar ropa dura muy poco: por eso volvemos a comprar."
   ],
   [
    "🔄",
    "Alternativas",
    "Segunda mano, intercambio, préstamo y arreglar la ropa alargan su vida."
   ],
   [
    "🌱",
    "La prenda más sostenible",
    "La que no hace falta fabricar. Conclusión del documental: la moda rápida nunca será sostenible."
   ]
  ]
 }
};
const QUIZZES = {
 "falacias": {
  "name": "Falacias",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué es una falacia?",
    "o": [
     "Un argumento con razones sólidas y pruebas.",
     "Un razonamiento que parece bueno pero no lo es; muchas veces se usa para convencer o engañar.",
     "Una frase que siempre es verdadera.",
     "Una opinión con la que no estoy de acuerdo."
    ],
    "a": 1,
    "fb": "Una falacia parece un buen razonamiento, pero sus razones no sostienen la conclusión."
   },
   {
    "q": "En la asamblea de clase, Naroa propone cambiar de sitio las mochilas. Julen le contesta: «¿Y tú qué vas a proponer, si llegas tarde todos los días?».",
    "o": [
     "Hombre de paja.",
     "Falso dilema.",
     "Ad hominem (ataque a la persona).",
     "Apelación a la tradición."
    ],
    "a": 2,
    "fb": "Julen ataca a la persona (llega tarde) en vez de responder a su idea."
   },
   {
    "q": "«O venís todos al concierto del sábado o es que ya no sois mis amigos».",
    "o": [
     "Falso dilema.",
     "Apelación al miedo.",
     "Ad populum (apelación a la mayoría).",
     "Generalización precipitada."
    ],
    "a": 0,
    "fb": "Presenta solo dos opciones cuando hay más: ir otro día, o no poder ir y seguir siendo amigos."
   },
   {
    "q": "«El streamer que más sigo dice que estos cereales dan energía para todo el día. Si lo dice él, es verdad».",
    "o": [
     "Apelación a la tradición.",
     "Falsa causa (post hoc).",
     "Ad hominem.",
     "Apelación a la autoridad."
    ],
    "a": 3,
    "fb": "Un streamer no es experto en alimentación; «lo dice él» no es una prueba."
   },
   {
    "q": "Iker: «Deberíamos usar menos plástico en el comedor». Lucía: «Claro, tú lo que quieres es que comamos con las manos y sin bandeja».",
    "o": [
     "Ad hominem.",
     "Falso dilema.",
     "Apelación a la compasión.",
     "Hombre de paja."
    ],
    "a": 3,
    "fb": "Lucía deforma lo que dijo Iker (menos plástico no es comer con las manos) para tumbarlo más fácil."
   },
   {
    "q": "«Me puse los calcetines verdes y aprobé el examen de mates. Los calcetines verdes hacen aprobar».",
    "o": [
     "Generalización precipitada.",
     "Falsa causa (post hoc).",
     "Apelación al miedo.",
     "Ad populum."
    ],
    "a": 1,
    "fb": "Aprobó después de ponérselos, pero la causa fue estudiar (o la suerte), no los calcetines."
   },
   {
    "q": "«Todo el mundo en mi cuadrilla tiene esa marca de auriculares. Si los tiene todo el mundo, son los mejores».",
    "o": [
     "Apelación a la autoridad.",
     "Apelación a la tradición.",
     "Ad populum (apelación a la mayoría).",
     "Falso dilema."
    ],
    "a": 2,
    "fb": "Que muchos los tengan solo dice que están de moda, no que suenen mejor."
   },
   {
    "q": "A su entrenadora: «Tienes que ponerme de titular. Llevo toda la semana triste y, si no juego, mi padre se llevará un disgusto enorme».",
    "o": [
     "Apelación a la compasión (ad misericordiam).",
     "Apelación al miedo.",
     "Ad hominem.",
     "Generalización precipitada."
    ],
    "a": 0,
    "fb": "Da pena (tristeza, disgusto del padre) en lugar de dar razones deportivas."
   },
   {
    "q": "«Tienes que apuntarte al refuerzo de los sábados. Si no, suspenderás todo, repetirás y te quedarás sin amigos».",
    "o": [
     "Apelación a la compasión.",
     "Apelación al miedo (ad metum).",
     "Falsa causa.",
     "Hombre de paja."
    ],
    "a": 1,
    "fb": "Convence asustando con un futuro terrible del que no da ninguna prueba."
   },
   {
    "q": "«He ido dos veces al polideportivo nuevo y las dos veces estaba lleno. Siempre está lleno; no merece la pena ir».",
    "o": [
     "Falsa causa (post hoc).",
     "Ad populum.",
     "Apelación a la tradición.",
     "Generalización precipitada."
    ],
    "a": 3,
    "fb": "Dos visitas no bastan para decir «siempre está lleno»."
   },
   {
    "q": "«Yo aprendí a nadar tirándome al agua sin flotador, y mi padre igual. Así se ha aprendido toda la vida, así que así aprenderás tú».",
    "o": [
     "Apelación a la tradición (ad antiquitatem).",
     "Apelación a la autoridad.",
     "Falso dilema.",
     "Ad hominem."
    ],
    "a": 0,
    "fb": "«Siempre se ha hecho así» no demuestra que sea la mejor manera ni la más segura."
   }
  ]
 },
 "ipc-sesgos-q": {
  "name": "Sesgos cognitivos",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué es un sesgo cognitivo?",
    "o": [
     "Un argumento con pruebas sólidas.",
     "Un atajo mental que tuerce cómo pensamos, muchas veces sin darnos cuenta.",
     "Una mentira dicha a propósito.",
     "Una opinión bien fundada."
    ],
    "a": 1,
    "fb": "El sesgo es un atajo mental que deforma nuestro juicio, aunque no queramos."
   },
   {
    "q": "Aitor solo sigue cuentas que piensan como él y da por falso todo lo demás. ¿Qué sesgo es?",
    "o": [
     "Sesgo de confirmación.",
     "Efecto halo.",
     "Anclaje.",
     "FOMO."
    ],
    "a": 0,
    "fb": "Sesgo de confirmación: buscar solo lo que confirma lo que ya creemos."
   },
   {
    "q": "En una tienda, el primer precio que ves (200 €) hace que 120 € te parezca barato. ¿Qué sesgo actúa?",
    "o": [
     "Disponibilidad.",
     "Anclaje.",
     "Arrastre.",
     "Confirmación."
    ],
    "a": 1,
    "fb": "Anclaje: el primer dato («ancla») condiciona los juicios siguientes."
   },
   {
    "q": "Tras ver muchas noticias de accidentes de avión crees que volar es muy peligroso, aunque los datos digan lo contrario. ¿Qué sesgo es?",
    "o": [
     "Efecto halo.",
     "Sesgo de disponibilidad.",
     "Falso dilema.",
     "Anclaje."
    ],
    "a": 1,
    "fb": "Disponibilidad: lo que recordamos con facilidad nos parece más probable de lo que es."
   },
   {
    "q": "Cambias de opinión solo porque todo tu grupo piensa distinto y no quieres quedar fuera. ¿Qué sesgo es?",
    "o": [
     "Arrastre (efecto bandwagon).",
     "Anclaje.",
     "Efecto halo.",
     "Confirmación."
    ],
    "a": 0,
    "fb": "Arrastre: seguir a la mayoría por no quedar fuera del grupo."
   },
   {
    "q": "Como esa chica te cae genial, das por buenas todas sus ideas sin examinarlas. ¿Qué sesgo es?",
    "o": [
     "FOMO.",
     "Efecto halo.",
     "Disponibilidad.",
     "Anclaje."
    ],
    "a": 1,
    "fb": "Efecto halo: una impresión positiva (simpatía, atractivo) contagia a todo lo demás."
   },
   {
    "q": "Compras algo a toda prisa «porque todos van y no quiero perdérmelo». ¿Qué está actuando?",
    "o": [
     "FOMO (miedo a perderse algo).",
     "Sesgo de confirmación.",
     "Principio de caridad.",
     "Anclaje."
    ],
    "a": 0,
    "fb": "FOMO: el miedo a quedarse fuera empuja a decidir por impulso."
   },
   {
    "q": "¿En qué se diferencian un sesgo y una falacia?",
    "o": [
     "Son exactamente lo mismo.",
     "La falacia es un error en el argumento; el sesgo es un atajo mental que tuerce cómo pensamos.",
     "El sesgo aparece solo en matemáticas.",
     "La falacia solo la cometen los adultos."
    ],
    "a": 1,
    "fb": "Falacia = fallo en el razonamiento; sesgo = desviación en el modo de pensar."
   },
   {
    "q": "¿Qué es el efecto halo?",
    "o": [
     "Que una impresión positiva contamina el juicio sobre todo lo demás.",
     "Que el primer dato ancla la decisión.",
     "Que seguimos a la mayoría.",
     "Que nos confirma en lo que creemos."
    ],
    "a": 0,
    "fb": "Si alguien me cae bien, doy por buenas sus ideas."
   },
   {
    "q": "¿Cómo se defiende uno de los sesgos?",
    "o": [
     "Buscando información que contradiga nuestras ideas y desconfiando de las decisiones con prisa.",
     "Evitando toda información.",
     "Siguiendo la mayoría.",
     "Reenviando sin comprobar."
    ],
    "a": 0,
    "fb": "Vigilar los sesgos es buscar lo que nos contradice."
   }
  ]
 },
 "ipc-medios-q": {
  "name": "Publicidad y medios",
  "subject": "ipc",
  "items": [
   {
    "q": "Un anuncio saca a tu influencer favorito usando el producto. ¿Qué técnica es?",
    "o": [
     "Escasez.",
     "Testimonio de una figura conocida.",
     "Humor.",
     "Datos científicos."
    ],
    "a": 1,
    "fb": "Testimonio: una figura conocida presta su imagen para que confíes en el producto."
   },
   {
    "q": "«¡Solo hoy! ¡Últimas unidades!» ¿Qué técnica publicitaria es?",
    "o": [
     "Escasez y urgencia.",
     "Publicidad aspiracional.",
     "Testimonio.",
     "Humor."
    ],
    "a": 0,
    "fb": "Escasez y urgencia: presionan para que compres sin pensarlo."
   },
   {
    "q": "Un anuncio no muestra el producto, sino una vida feliz y admirada que este promete. ¿Cómo se llama?",
    "o": [
     "Clickbait.",
     "Publicidad aspiracional.",
     "Bandwagon.",
     "Contraste de fuentes."
    ],
    "a": 1,
    "fb": "Publicidad aspiracional: vende un estilo de vida, no el producto en sí."
   },
   {
    "q": "Un titular exagerado promete mucho más de lo que el artículo da, para que hagas clic. Es…",
    "o": [
     "alfabetización mediática.",
     "clickbait.",
     "un argumento.",
     "un testimonio."
    ],
    "a": 1,
    "fb": "Clickbait: cebo de clics mediante titulares exagerados o engañosos."
   },
   {
    "q": "Te llega un mensaje viral alarmante. ¿Qué es lo más sensato antes de creerlo o reenviarlo?",
    "o": [
     "Reenviarlo rápido por si acaso.",
     "Contrastar la fuente: quién lo dice, con qué pruebas y si lo confirman otros.",
     "Creerlo porque lo manda un amigo.",
     "Borrarlo sin mirarlo."
    ],
    "a": 1,
    "fb": "Contrastar fuentes: ¿quién lo dice?, ¿qué pruebas hay?, ¿lo confirman medios fiables?"
   },
   {
    "q": "«Únete a los millones de personas que ya lo usan.» En publicidad, esto es…",
    "o": [
     "apelar a que todos lo tienen (efecto bandwagon).",
     "escasez.",
     "humor.",
     "un dato técnico."
    ],
    "a": 0,
    "fb": "Bandwagon: «lo usa todo el mundo» como razón para que lo uses tú."
   },
   {
    "q": "Saber distinguir en un medio la información, la opinión y la publicidad se llama…",
    "o": [
     "clickbait.",
     "alfabetización mediática.",
     "posverdad.",
     "anclaje."
    ],
    "a": 1,
    "fb": "Alfabetización mediática: leer los medios de forma crítica."
   },
   {
    "q": "¿Por qué la publicidad usa tanto el humor y la emoción?",
    "o": [
     "Porque aporta datos objetivos del producto.",
     "Para que asocies esa emoción agradable con la marca y la recuerdes.",
     "Porque la ley la obliga.",
     "Para informar de los ingredientes."
    ],
    "a": 1,
    "fb": "La emoción positiva se asocia a la marca y ayuda a recordarla, sin necesidad de dar razones."
   },
   {
    "q": "¿Qué es la alfabetización mediática?",
    "o": [
     "Leer críticamente los medios, distinguiendo información, opinión y publicidad.",
     "Creer todo lo que dice la prensa.",
     "Evitar los medios.",
     "Solo consumir publicidad."
    ],
    "a": 0,
    "fb": "Saber leer los medios de forma crítica es la alfabetización mediática."
   },
   {
    "q": "Estás a punto de compartir un mensaje viral. ¿Qué haces (pensamiento crítico)?",
    "o": [
     "Contrastar la fuente y las pruebas antes de compartir.",
     "Reenviarlo ya.",
     "Creerlo porque lo manda un amigo.",
     "Ocultarlo sin mirar."
    ],
    "a": 0,
    "fb": "Contrastar fuentes es clave para no difundir bulos."
   }
  ]
 },
 "ipc-huella-q": {
  "name": "Mi huella en el planeta",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué mide la huella ecológica?",
    "o": [
     "Los kilómetros que andamos al día.",
     "La tierra y el mar productivos que hacen falta para producir lo que consumimos y absorber nuestros residuos.",
     "El número de árboles de una ciudad.",
     "La basura que reciclamos."
    ],
    "a": 1,
    "fb": "Huella ecológica: superficie productiva necesaria para nuestro consumo y nuestros residuos (en hectáreas globales)."
   },
   {
    "q": "Una familia gasta el sueldo de todo el año en cinco meses y luego vive de préstamos. ¿Con qué idea se compara?",
    "o": [
     "Con el Día de la Sobrecapacidad de la Tierra.",
     "Con el reciclaje.",
     "Con la biocapacidad.",
     "Con la huella hídrica."
    ],
    "a": 0,
    "fb": "El Día de la Sobrecapacidad marca cuándo hemos gastado lo que el planeta regenera en todo el año; desde entonces vivimos «a crédito»."
   },
   {
    "q": "Si toda la humanidad viviera como se vive de media en España, ¿cuántos planetas harían falta?",
    "o": [
     "Menos de uno.",
     "Exactamente uno.",
     "Más de dos.",
     "Diez."
    ],
    "a": 2,
    "fb": "Más de dos planetas: nuestro consumo supera con mucho lo que nos tocaría."
   },
   {
    "q": "¿Qué es la biocapacidad?",
    "o": [
     "Lo que la naturaleza puede regenerar en un año.",
     "La capacidad de una fábrica.",
     "El número de habitantes de un país.",
     "La energía de las baterías."
    ],
    "a": 0,
    "fb": "Biocapacidad: bosques que vuelven a crecer, peces que se reproducen, suelo que vuelve a dar cosecha."
   },
   {
    "q": "En los países ricos, ¿cuál es la parte más grande de la huella ecológica?",
    "o": [
     "El agua de beber.",
     "La huella de carbono (energía, transporte, consumo).",
     "El papel del colegio.",
     "Las mascotas."
    ],
    "a": 1,
    "fb": "La huella de carbono: el CO₂ de la energía, el transporte y lo que compramos."
   },
   {
    "q": "Los países que más consumen no son los que más sufren sequías o inundaciones. ¿Cómo se llama este problema?",
    "o": [
     "Greenwashing.",
     "Injusticia ambiental.",
     "Biocapacidad.",
     "Reciclaje."
    ],
    "a": 1,
    "fb": "Injusticia ambiental: los daños recaen sobre quien menos ha contaminado y menos medios tiene."
   },
   {
    "q": "¿Cuál es el orden correcto para reducir residuos?",
    "o": [
     "Reciclar, reutilizar, reducir.",
     "Reutilizar, reciclar, reducir.",
     "Reducir, reutilizar, reciclar.",
     "Da igual el orden."
    ],
    "a": 2,
    "fb": "Primero reducir (no generar el residuo), luego reutilizar y, al final, reciclar."
   },
   {
    "q": "Una marca de ropa rápida anuncia una «colección verde» pero sigue sacando miles de prendas nuevas cada semana. Eso es…",
    "o": [
     "justicia ambiental.",
     "greenwashing.",
     "biocapacidad.",
     "consumo responsable."
    ],
    "a": 1,
    "fb": "Greenwashing: pintarse de verde en la publicidad sin cambiar lo que se hace."
   },
   {
    "q": "¿Cuál de estas acciones reduce más tu huella en el día a día?",
    "o": [
     "Ir al instituto andando o en transporte público en vez de en coche.",
     "Cambiar de móvil cada año.",
     "Comprar ropa nueva cada mes.",
     "Dejar la luz encendida."
    ],
    "a": 0,
    "fb": "El transporte es una de las partes que más pesa: andar, bici o transporte público reducen mucho la huella."
   }
  ]
 },
 "ipc-hecho-q": {
  "name": "¿Hecho, opinión, hipótesis o pregunta?",
  "subject": "ipc",
  "items": [
   {
    "q": "«El agua hierve a 100 °C al nivel del mar.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 0,
    "fb": "Es un hecho: se puede comprobar y cualquiera que lo mida obtiene lo mismo."
   },
   {
    "q": "«El reguetón es la peor música que existe.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 1,
    "fb": "Es una opinión: expresa un gusto o una valoración. Se puede defender con razones, pero no se «comprueba» como un hecho."
   },
   {
    "q": "«Puede que las plantas crezcan más con música: lo probaremos con dos macetas iguales.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 2,
    "fb": "Es una hipótesis: una suposición que todavía no sabemos si es verdad, pero que se puede poner a prueba."
   },
   {
    "q": "«¿Es justo que unos países tengan mucho más que otros?»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 3,
    "fb": "Es una pregunta filosófica: no se responde con un dato ni con un experimento, sino pensando y dando razones."
   },
   {
    "q": "«Bilbao está en Bizkaia.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 0,
    "fb": "Es un hecho: basta mirar un mapa para comprobarlo."
   },
   {
    "q": "«Las series de ahora son más aburridas que las de antes.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 1,
    "fb": "Es una opinión: depende de gustos. Ojo: que sea opinión no significa que no haya que razonarla."
   },
   {
    "q": "«Quizá mirar el móvil antes de dormir empeora el sueño: comparemos a quienes lo hacen y a quienes no.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 2,
    "fb": "Es una hipótesis: se plantea como posible y se propone una forma de comprobarla. Una hipótesis NO es lo mismo que una opinión."
   },
   {
    "q": "«¿Qué es la felicidad?»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 3,
    "fb": "Pregunta filosófica: es abierta, importante y no tiene una única respuesta de libro."
   },
   {
    "q": "«En 1969 unos astronautas llegaron a la Luna.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 0,
    "fb": "Es un hecho histórico comprobado con muchas pruebas independientes (aunque circulen bulos que digan lo contrario)."
   },
   {
    "q": "«Pensar críticamente es aburrido.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 1,
    "fb": "Es una opinión: una valoración personal. Otra persona puede pensar lo contrario con buenas razones."
   },
   {
    "q": "«Si estudio con música, tal vez me concentre peor: voy a probar una semana con música y otra sin ella.»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 2,
    "fb": "Es una hipótesis: una suposición que se comprueba con una prueba sencilla."
   },
   {
    "q": "«¿Podemos estar seguros de algo?»",
    "o": [
     "Un hecho.",
     "Una opinión.",
     "Una hipótesis.",
     "Una pregunta filosófica."
    ],
    "a": 3,
    "fb": "Pregunta filosófica: sobre el conocimiento mismo. La ciencia no la puede zanjar con un experimento."
   }
  ]
 },
 "ipc-moda-q": {
  "name": "Moda rápida: el documental",
  "subject": "ipc",
  "items": [
   {
    "q": "¿A quién se dirige sobre todo el negocio de la moda rápida?",
    "o": [
     "A los adolescentes.",
     "A las personas mayores.",
     "A las empresas.",
     "A los deportistas."
    ],
    "a": 0,
    "fb": "El documental explica que el público principal son los adolescentes."
   },
   {
    "q": "Antes había unas 4 colecciones al año. ¿Cuántas microcolecciones sacan hoy algunas cadenas?",
    "o": [
     "8.",
     "52, una cada semana.",
     "12, una al mes.",
     "Ninguna."
    ],
    "a": 1,
    "fb": "Hasta 52 al año: una microcolección nueva cada semana, para que siempre haya algo «nuevo» que comprar."
   },
   {
    "q": "Según un estudio de Greenpeace, ¿qué parte de la ropa que se compra no se llega a usar nunca?",
    "o": [
     "Casi nada.",
     "Un 5 %.",
     "Alrededor del 40 %.",
     "Toda."
    ],
    "a": 2,
    "fb": "Alrededor del 40 %: casi la mitad de lo que se compra se queda sin estrenar."
   },
   {
    "q": "¿De dónde salen cerca del 70 % de los tejidos nuevos?",
    "o": [
     "Del algodón ecológico.",
     "De la lana.",
     "De ropa reciclada.",
     "Del petróleo (fibras sintéticas)."
    ],
    "a": 3,
    "fb": "Son fibras sintéticas derivadas del petróleo, como el poliéster."
   },
   {
    "q": "El poliéster «reciclado» de muchas grandes marcas sale sobre todo de…",
    "o": [
     "botellas de plástico viejas.",
     "ropa usada.",
     "algodón.",
     "papel."
    ],
    "a": 0,
    "fb": "De botellas de plástico, no de ropa usada: reciclar ropa para hacer ropa nueva casi no existe."
   },
   {
    "q": "¿Qué hacen algunas familias pobres de Bulgaria con la ropa desechada que les venden?",
    "o": [
     "La exportan a Asia.",
     "La queman en las estufas para calentarse.",
     "La convierten en papel.",
     "La devuelven a las tiendas."
    ],
    "a": 1,
    "fb": "La queman para calentarse porque no pueden pagar leña: sale humo tóxico y la ciudad se contamina."
   },
   {
    "q": "¿Por qué es tan contaminante quemar esta ropa?",
    "o": [
     "Porque es de papel.",
     "Porque lleva mucha agua.",
     "Porque muchas prendas llevan plásticos y sueltan gases tóxicos y dioxinas.",
     "Porque huele mal."
    ],
    "a": 2,
    "fb": "Los plásticos de los tejidos liberan gases contaminantes y dioxinas, perjudiciales para la salud."
   },
   {
    "q": "En el documental, la felicidad por estrenar una prenda dura…",
    "o": [
     "años.",
     "toda la temporada.",
     "un mes.",
     "poco más de un día."
    ],
    "a": 3,
    "fb": "Poco más de un día: por eso el ciclo de comprar vuelve a empezar enseguida."
   },
   {
    "q": "Una tienda te da un descuento por dejar tu ropa vieja en su contenedor «de reciclaje». ¿Qué técnica hay detrás?",
    "o": [
     "Te anima a volver a comprar y lava la imagen de la marca (greenwashing).",
     "Es caridad sin más.",
     "Obliga a no comprar.",
     "Es un impuesto."
    ],
    "a": 0,
    "fb": "El descuento es para la siguiente compra: sigues consumiendo y la marca parece «verde». El documental lo llama un truco de marketing."
   },
   {
    "q": "Según la conclusión del documental, ¿cuál es la prenda más sostenible?",
    "o": [
     "La de algodón.",
     "La que no hace falta fabricar.",
     "La más barata.",
     "La que se tira al contenedor."
    ],
    "a": 1,
    "fb": "La que no hace falta producir: comprar menos, usar más tiempo, arreglar y compartir."
   }
  ]
 },
 "ipc-bulos-q": {
  "name": "Detectar bulos: argumentos, falacias y noticias falsas",
  "subject": "ipc",
  "items": [
   {
    "q": "En un debate de clase, Carlos dice: «Deberíamos prohibir las bebidas azucaradas en la cafetería, ya que tienen muchísimo azúcar y aumentan el riesgo de diabetes en los jóvenes». ¿Cuál es la razón que da?",
    "o": [
     "Las bebidas azucaradas tienen mucho azúcar y aumentan el riesgo de diabetes en los jóvenes.",
     "Deberíamos prohibir las bebidas azucaradas en la cafetería.",
     "Todo lo que se vende en la cafetería es malo para la salud.",
     "La cafetería no debería vender ningún alimento procesado."
    ],
    "a": 0,
    "fb": "La razón va detrás de «ya que». «Deberíamos prohibir…» es la conclusión: lo que Carlos quiere que aceptemos."
   },
   {
    "q": "Marta dice: «El profesor debe ponernos un 10 en el proyecto porque nos hemos esforzado muchísimo y apenas hemos dormido». Con las tres preguntas (¿es verdadera?, ¿tiene que ver?, ¿basta?), ¿en cuál falla sobre todo?",
    "o": [
     "En «¿Tiene que ver?»: el esfuerzo y el sueño no miden si el trabajo está bien hecho.",
     "En «¿Es verdadera?»: es imposible saber si durmieron o no.",
     "Solo en «¿Basta?»: esforzarse siempre garantiza un buen trabajo.",
     "En ninguna: la nota debe depender del sacrificio de cada uno."
    ],
    "a": 0,
    "fb": "Puede ser verdad que se esforzaron, pero la nota mide el trabajo, no el cansancio. La razón no tiene que ver con la conclusión."
   },
   {
    "q": "Para elegir la actividad de fin de curso, un alumno dice: «Hagamos un torneo de baloncesto, porque a mí me encanta jugar los fines de semana». ¿Por qué no es un buen argumento?",
    "o": [
     "Da un gusto personal: explica lo que él prefiere, pero no que sea lo mejor para el grupo.",
     "Insulta a los compañeros a los que no les gusta el deporte.",
     "Amenaza al grupo si no vota su propuesta.",
     "No usa ningún «porque»."
    ],
    "a": 0,
    "fb": "Que te guste algo explica tu preferencia, no demuestra que sea lo mejor para todos."
   },
   {
    "q": "Un alumno escribe: «Es imprescindible llegar puntual a clase porque hay que estar a la hora». ¿Qué le pasa a esta razón?",
    "o": [
     "No es una razón: repite la conclusión con otras palabras.",
     "Ataca a los que llegan tarde.",
     "Plantea un falso dilema: puntualidad o expulsión.",
     "Usa el miedo al castigo para convencer."
    ],
    "a": 0,
    "fb": "«Llegar puntual» y «estar a la hora» dicen lo mismo. Lleva «porque», pero no añade ninguna razón."
   },
   {
    "q": "En un debate sobre el uniforme, Lucía explica cuánto ahorrarían las familias. Pablo responde: «No le hagáis caso; el año pasado suspendió dos asignaturas y siempre llega tarde». ¿Qué falacia comete Pablo?",
    "o": [
     "Ad hominem.",
     "Hombre de paja.",
     "Apelación a la autoridad.",
     "Generalización precipitada."
    ],
    "a": 0,
    "fb": "Pablo ataca a Lucía (sus notas, sus retrasos) en vez de responder a lo que dice sobre el ahorro."
   },
   {
    "q": "Un vídeo viral dice: «Este streamer famoso asegura que la vitamina C previene todas las enfermedades infecciosas, así que hay que tomarla a diario». ¿Por qué es una apelación a la autoridad?",
    "o": [
     "Da por buena una afirmación médica porque la dice alguien famoso que no es experto en medicina.",
     "Quiere asustar a la gente con las infecciones.",
     "Solo deja dos opciones: tomar vitamina C o enfermar.",
     "Deforma lo que dicen los médicos."
    ],
    "a": 0,
    "fb": "Ser famoso en los videojuegos no te hace experto en medicina. Hay que preguntar: ¿es experto en este tema? ¿qué pruebas da?"
   },
   {
    "q": "Un alumno propone organizar de otra forma la fila del comedor para ir más rápido. El encargado responde: «Aquí la fila siempre se ha hecho por orden de lista; así que es la forma correcta». ¿Qué falacia es?",
    "o": [
     "Apelación a la tradición.",
     "Ad populum.",
     "Falso dilema.",
     "Apelación a la compasión."
    ],
    "a": 0,
    "fb": "Que algo se haya hecho siempre así no demuestra que sea la mejor forma."
   },
   {
    "q": "Un alumno le dice al profesor: «No me ponga un cero; si suspendo, mis padres me castigarán todo el trimestre y me sentiré fatal». ¿Qué falacia usa?",
    "o": [
     "Apelación a la compasión.",
     "Apelación al miedo.",
     "Ad hominem.",
     "Hombre de paja."
    ],
    "a": 0,
    "fb": "Busca dar pena en vez de dar razones sobre el trabajo. No asusta al profesor: le pide lástima."
   },
   {
    "q": "Elena propone: «Podríamos guardar los móviles en la mochila durante las clases para concentrarnos mejor». Roberto contesta: «¡Tú lo que quieres es prohibir toda la tecnología y volver a la Edad Media!». ¿Qué falacia usa Roberto?",
    "o": [
     "Hombre de paja.",
     "Apelación a la autoridad.",
     "Generalización precipitada.",
     "Falsa causa."
    ],
    "a": 0,
    "fb": "Roberto exagera lo que dijo Elena y rebate esa versión inventada, que es más fácil de atacar."
   },
   {
    "q": "Alguien comenta en un foro: «Conozco a dos personas que aprobaron el carné de conducir sin estudiar; así que estudiar es perder el tiempo». ¿Qué error comete?",
    "o": [
     "Generalización precipitada.",
     "Falso dilema.",
     "Ad populum.",
     "Apelación a la tradición."
    ],
    "a": 0,
    "fb": "Saca una regla para todos a partir de solo dos casos."
   },
   {
    "q": "«Ayer me puse la camiseta roja para ver el partido y ganamos después de tres derrotas. Está claro: la camiseta roja nos hace ganar». ¿Qué falacia es?",
    "o": [
     "Falsa causa.",
     "Generalización precipitada.",
     "Apelación a la autoridad.",
     "Ad populum."
    ],
    "a": 0,
    "fb": "Que una cosa pase después de otra no quiere decir que la cause. Pregunta: ¿no será casualidad o habrá otra causa?"
   },
   {
    "q": "En un debate sobre el tráfico, alguien dice: «O prohibimos del todo los coches en el centro, o aceptamos que la contaminación nos destroce los pulmones». ¿Qué falacia comete?",
    "o": [
     "Falso dilema.",
     "Hombre de paja.",
     "Apelación al miedo.",
     "Ad hominem."
    ],
    "a": 0,
    "fb": "Caso trampa: también mete miedo, pero lo que sostiene el argumento es que solo da dos opciones extremas y olvida las intermedias."
   },
   {
    "q": "Un mensaje en redes dice: «Si no reenvías este aviso a 15 contactos en diez minutos, te bloquearán la cuenta y perderás todos tus archivos». ¿Qué truco usa?",
    "o": [
     "Apelación al miedo.",
     "Apelación a la tradición.",
     "Hombre de paja.",
     "Falsa causa."
    ],
    "a": 0,
    "fb": "Asusta para que actúes deprisa, sin comprobar nada. No hay ninguna prueba de esa amenaza."
   },
   {
    "q": "Un alumno dice: «Esta serie es la mejor de la historia, porque la ven millones de personas en todo el mundo». ¿Qué falacia comete?",
    "o": [
     "Ad populum.",
     "Apelación a la autoridad.",
     "Generalización precipitada.",
     "Falso dilema."
    ],
    "a": 0,
    "fb": "Que algo sea muy popular no demuestra que sea lo mejor."
   },
   {
    "q": "Para responder a un hombre de paja en una discusión, ¿qué pregunta viene mejor?",
    "o": [
     "¿Es eso exactamente lo que yo he dicho?",
     "¿Qué tiene que ver quién lo dice con que sea verdad?",
     "¿Que lo piense mucha gente lo hace verdad?",
     "¿Ese peligro es real? ¿Qué pruebas hay?"
    ],
    "a": 0,
    "fb": "El hombre de paja cambia lo que dijiste. La segunda pregunta sirve para el ad hominem, la tercera para el ad populum y la cuarta para la apelación al miedo."
   },
   {
    "q": "Para desmontar un ad hominem, ¿qué pregunta hay que hacer?",
    "o": [
     "¿Qué tiene que ver quién lo dice con que la idea sea verdad?",
     "¿Es experto en este tema? ¿Qué pruebas da?",
     "¿No será casualidad? ¿Habrá otra causa?",
     "¿No hay una tercera opción?"
    ],
    "a": 0,
    "fb": "El ad hominem ataca a la persona. La pregunta separa a quien habla de lo que dice."
   },
   {
    "q": "Para analizar un bulo o una teoría de la conspiración, ¿qué pregunta corresponde al criterio de la «necesidad»?",
    "o": [
     "¿Qué me ofrece creerlo: seguridad, culpables claros, sentirme parte de un grupo?",
     "¿Qué pruebas da? ¿Se pueden comprobar?",
     "¿Quién lo dice y qué gana con ello?",
     "¿Me hace más libre o me manipula?"
    ],
    "a": 0,
    "fb": "La necesidad mira qué ganas tú al creerlo. Las otras preguntas son las de las pruebas, la fuente e interés y la libertad."
   },
   {
    "q": "Un artículo cita a un equipo de epidemiólogas para defender que una vacuna funciona. ¿Por qué esto NO es una falacia de apelación a la autoridad?",
    "o": [
     "Porque citar a expertas en su propio campo, que se apoyan en pruebas, es una buena razón.",
     "Porque las epidemiólogas son famosas y salen mucho en la tele.",
     "Porque algo es verdad si lo cree mucha gente.",
     "Porque todo lo que dice alguien con un título es correcto."
    ],
    "a": 0,
    "fb": "Caso trampa: fiarse de expertos en su tema y con pruebas es razonable. La falacia está en fiarse de alguien que no sabe del tema o no da pruebas."
   },
   {
    "q": "Una web poco conocida publica: «Científicos descubren que comer solo manzanas elimina todas las caries en 24 horas». ¿Qué falla claramente?",
    "o": [
     "No da pruebas que se puedan comprobar y ningún otro medio serio lo confirma.",
     "Solo que la web es poco conocida: si lo dicen científicos, es fiable.",
     "Apela a la tradición porque no habla de recetas antiguas.",
     "Ataca a los dentistas: es un ad hominem."
    ],
    "a": 0,
    "fb": "«Científicos descubren» no es una prueba: no dice quiénes, ni dónde, ni cómo. Y si fuera verdad, lo contarían muchos otros medios."
   },
   {
    "q": "¿Qué dos falacias juegan con tus emociones (pena o miedo) en vez de dar pruebas?",
    "o": [
     "Apelación a la compasión y apelación al miedo.",
     "Generalización precipitada y falsa causa.",
     "Hombre de paja y falso dilema.",
     "Apelación a la tradición y generalización precipitada."
    ],
    "a": 0,
    "fb": "La compasión busca darte pena; el miedo, asustarte. Las otras son errores al razonar, no trucos con las emociones."
   },
   {
    "q": "Quieres comprobar si una noticia que te ha llegado es un bulo. ¿Cuál de estas cosas NO sirve?",
    "o": [
     "Creértela porque te ha llegado reenviada muchas veces.",
     "Mirar quién la publica y qué gana con ello.",
     "Mirar la fecha, por si es una noticia antigua.",
     "Hacer una búsqueda inversa de la imagen."
    ],
    "a": 0,
    "fb": "Caso trampa: que algo circule mucho no lo hace verdad (eso sería un ad populum). Las otras tres son pasos para verificar."
   },
   {
    "q": "Antes de compartir un mensaje, conviene pasarlo por los «tres tamices». ¿Cuáles son?",
    "o": [
     "¿Es verdad? ¿Es bueno? ¿Es útil?",
     "¿Es verdad? ¿Es nuevo? ¿Es gracioso?",
     "¿Es popular? ¿Es bueno? ¿Es útil?",
     "¿Es verdad? ¿Es bonito? ¿Es corto?"
    ],
    "a": 0,
    "fb": "Verdad, bondad y utilidad. La historia se suele atribuir a Sócrates, aunque no aparece en ningún texto antiguo: es una anécdota moderna."
   },
   {
    "q": "Pensar que una cosa causa otra solo porque ha pasado antes es la falacia de…",
    "o": [
     "falsa causa.",
     "falso dilema.",
     "hombre de paja.",
     "ad populum."
    ],
    "a": 0,
    "fb": "Falsa causa: confunde «pasó antes» con «es la causa»."
   },
   {
    "q": "Cambiar lo que ha dicho el otro para rebatir una versión más débil es la falacia del…",
    "o": [
     "hombre de paja.",
     "ad hominem.",
     "falso dilema.",
     "generalización precipitada."
    ],
    "a": 0,
    "fb": "Hombre de paja: un muñeco fácil de tumbar, que no es lo que el otro dijo."
   },
   {
    "q": "Decir que algo es verdad solo porque la mayoría de la gente lo cree es la falacia…",
    "o": [
     "ad populum (apelación a la mayoría).",
     "apelación a la tradición.",
     "apelación a la autoridad.",
     "ad hominem."
    ],
    "a": 0,
    "fb": "Ad populum significa «al pueblo»: confunde lo que cree mucha gente con lo que es verdad."
   },
   {
    "q": "Para saber si una razón es buena, ¿cuál es la primera de las tres preguntas?",
    "o": [
     "¿Es verdadera o, al menos, creíble?",
     "¿Tiene que ver con la conclusión?",
     "¿Basta?",
     "¿Quién la dice?"
    ],
    "a": 0,
    "fb": "Primero, ¿es verdadera? Si la razón es falsa, el argumento se cae. Después, ¿tiene que ver? y ¿basta?"
   },
   {
    "q": "¿Cuál de estas falacias NO es de las que más usan los bulos para difundirse?",
    "o": [
     "Apelación a la tradición.",
     "Apelación al miedo.",
     "Ad populum.",
     "Apelación a la autoridad."
    ],
    "a": 0,
    "fb": "Los bulos asustan (miedo), dicen que «todo el mundo lo comparte» (ad populum) o que «lo dice un experto» (autoridad). Apelar a la tradición no es lo típico."
   }
  ]
 },
 "ipc-pensar-banco": {
  "name": "Pensar por uno mismo (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "Según el tema, ¿qué significa pensar bien?",
    "o": [
     "Tener muchas ideas distintas y decirlas todas muy rápido",
     "Tener ideas firmes que no cambian pase lo que pase",
     "Tener ideas ordenadas, con razones y abiertas a corrección",
     "Tener las mismas ideas que la mayoría de la gente que conoces"
    ],
    "a": 2,
    "fb": "Pensar bien no es tener muchas ideas, sino tenerlas ordenadas, apoyadas en razones y dispuestas a corregirse."
   },
   {
    "q": "¿Qué es el pensamiento crítico?",
    "o": [
     "Evaluar información y argumentos para decidir por uno mismo",
     "Llevar la contraria a todo lo que dicen los demás",
     "Aceptar lo que dicen los expertos sin hacerles ninguna pregunta",
     "Pensar que todas las opiniones valen exactamente igual"
    ],
    "a": 0,
    "fb": "El pensamiento crítico consiste en evaluar la información y los argumentos para decidir por uno mismo qué es razonable creer o hacer."
   },
   {
    "q": "En este tema, ¿qué es una razón?",
    "o": [
     "Una postura personal sobre un tema cualquiera",
     "Algo que damos por cierto sin haberlo comprobado",
     "Una idea que se acepta sin admitir ninguna duda",
     "Un motivo que apoya o justifica una afirmación"
    ],
    "a": 3,
    "fb": "Una razón es el motivo que apoya una afirmación. Las otras opciones describen la opinión, la creencia y el dogmatismo."
   },
   {
    "q": "¿Qué es el dogmatismo?",
    "o": [
     "Pensar que todas las opiniones valen lo mismo",
     "Aceptar ideas sin examinarlas ni dudar",
     "Cambiar de idea cada vez que alguien lo pide",
     "Pedir pruebas antes de creerse una noticia"
    ],
    "a": 1,
    "fb": "El dogmatismo es creer sin examinar: «esto es así porque sí». No deja sitio a la duda."
   },
   {
    "q": "En el tema, ¿qué es el «todo vale»?",
    "o": [
     "Creer algo sin examinarlo, solo porque sí",
     "Pedir siempre razones a los demás antes de aceptar lo que dicen",
     "Pensar que todas las opiniones valen igual, tengan pruebas o no",
     "Dudar de todo y no creerse nunca nada"
    ],
    "a": 2,
    "fb": "El «todo vale» trata igual una opinión con pruebas y otra sin ninguna. Es uno de los dos extremos que evita el pensamiento crítico."
   },
   {
    "q": "¿Cuáles son los tres gestos del pensamiento crítico?",
    "o": [
     "Escuchar, repetir y memorizar",
     "Preguntar, analizar y valorar",
     "Opinar, discutir y convencer",
     "Dudar, negar y contradecir"
    ],
    "a": 1,
    "fb": "Los tres gestos son preguntar (qué se afirma y de dónde sale), analizar (qué razones hay) y valorar (si me convence)."
   },
   {
    "q": "En el tema, ¿qué es un saber?",
    "o": [
     "Una apuesta sobre algo que puede pasar mañana",
     "Una postura personal sobre un gusto propio",
     "Algo que damos por cierto sin comprobarlo",
     "Una creencia justificada con razones"
    ],
    "a": 3,
    "fb": "Un saber es una creencia justificada: está apoyada en razones o pruebas y se puede comprobar."
   },
   {
    "q": "¿Qué es una creencia?",
    "o": [
     "Algo que damos por cierto, aunque no lo hayamos comprobado",
     "Una afirmación apoyada en pruebas que cualquiera puede comprobar",
     "Un motivo que sirve para apoyar una afirmación",
     "Aceptar ideas sin admitir nunca ninguna duda"
    ],
    "a": 0,
    "fb": "Una creencia es algo que damos por cierto sin haberlo comprobado, como una apuesta. Si se justifica con pruebas, pasa a ser un saber."
   },
   {
    "q": "Según el tema, ¿dónde empieza la filosofía?",
    "o": [
     "En memorizar todo lo que dijeron los grandes pensadores",
     "En examinar lo que creemos en vez de tragarlo sin más",
     "En tener muchas ideas nuevas y originales cada día",
     "En discutir con los demás hasta ganar siempre"
    ],
    "a": 1,
    "fb": "La filosofía empieza cuando examinamos nuestras creencias en lugar de aceptarlas sin pensar."
   },
   {
    "q": "Unai dice en el recreo: «Este año mi equipo gana la liga seguro». No da ningún motivo más. ¿Qué está haciendo?",
    "o": [
     "Dar razones que se pueden discutir",
     "Expresar un saber ya comprobado",
     "Soltar una corazonada sin razones",
     "Analizar los datos de la temporada"
    ],
    "a": 2,
    "fb": "Sin ningún motivo, lo de Unai es una corazonada. Pensar bien sería añadir razones, como los fichajes o los puntos de ventaja."
   },
   {
    "q": "Aya comenta: «La peli se me hizo larga porque en la primera hora casi no pasa nada». ¿Qué hace bien Aya?",
    "o": [
     "Da una razón que apoya lo que opina",
     "Demuestra un saber que nadie discute",
     "Evita dar su opinión sobre la peli",
     "Repite lo que opina la mayoría"
    ],
    "a": 0,
    "fb": "Aya no solo dice que la peli es larga: explica por qué. Así su opinión tiene una razón que se puede discutir."
   },
   {
    "q": "En redes ves el titular «Dormir con calcetines te hace más listo». Si empiezas por el gesto de preguntar, ¿qué te planteas primero?",
    "o": [
     "¿Cuántas veces se ha compartido ya?",
     "¿Me gustaría que fuera verdad?",
     "¿Lo han visto ya mis amigos?",
     "¿Quién lo dice y con qué estudio?"
    ],
    "a": 3,
    "fb": "Preguntar es averiguar qué se afirma y de dónde sale. Por eso lo primero es saber quién lo dice y en qué se basa."
   },
   {
    "q": "Álex lee que un refresco mejora la memoria, pero descubre que el estudio lo ha pagado la propia marca y sospecha. ¿Qué gesto del pensamiento crítico está usando?",
    "o": [
     "Preguntar: averiguar qué se afirma exactamente",
     "Analizar: mirar si las razones son buenas o hay trampa",
     "Valorar: pensar si cambiaría de idea al ver nuevos datos",
     "Opinar: decir lo que le parece a él esa marca"
    ],
    "a": 1,
    "fb": "Analizar es revisar si las razones son buenas o esconden trampa. Que la marca pague el estudio es un motivo para sospechar."
   },
   {
    "q": "En un debate de clase, Mateo dice: «Aunque me enseñéis cualquier dato, no pienso cambiar de idea». Según el tema, ¿qué le pasa a Mateo?",
    "o": [
     "Está pensando de forma crítica",
     "Está defendiendo un saber comprobado",
     "Está creyendo, no pensando",
     "Está cayendo en el «todo vale»"
    ],
    "a": 2,
    "fb": "Quien no cambiaría de idea con nada no está pensando, está creyendo. Valorar incluye estar dispuesto a cambiar con nuevos datos."
   },
   {
    "q": "Nora discute con su hermano sobre un videojuego y le suelta: «Es así porque lo digo yo, y no hay más que hablar». ¿En qué extremo cae Nora?",
    "o": [
     "En el dogmatismo",
     "En el «todo vale»",
     "En el pensamiento crítico",
     "En la valoración de pruebas"
    ],
    "a": 0,
    "fb": "«Es así porque sí» es la frase típica del dogmatismo: aceptar una idea sin examinarla ni admitir dudas."
   },
   {
    "q": "Tu amiga Sara asegura que la Tierra es plana, pero no tiene ninguna prueba. ¿Qué sería lo más crítico por tu parte?",
    "o": [
     "Dejar de hablarle, porque dice cosas sin sentido",
     "Aceptar su idea, porque todas las opiniones valen igual",
     "Llevarle la contraria en todo lo que diga a partir de ahora",
     "Respetarla a ella, pero no aceptar su idea sin pruebas"
    ],
    "a": 3,
    "fb": "Respetar a una persona no obliga a aceptar lo que dice. Puedes tratarla bien y, a la vez, pedir pruebas de su idea."
   },
   {
    "q": "Lucas dice: «Sé que el hielo se derrite con el calor: lo he comprobado muchas veces». ¿Por qué es un saber y no solo una creencia?",
    "o": [
     "Porque Lucas lo dice con mucha seguridad",
     "Porque es una postura personal de Lucas",
     "Porque se puede comprobar con pruebas",
     "Porque la mayoría de la gente lo piensa"
    ],
    "a": 2,
    "fb": "Lo que convierte algo en saber es que está justificado con pruebas y se puede comprobar, no la seguridad con que se dice."
   },
   {
    "q": "Hugo piensa: «La profe de Lengua me tiene manía». ¿Qué tendría que hacer para convertir esa creencia en algo pensado?",
    "o": [
     "Contárselo a todos para ver si le dan la razón",
     "Mirar los hechos, como si entregó los trabajos",
     "Seguir pensándolo, porque es lo que él siente",
     "Cambiar de idea solo si la profe se lo pide"
    ],
    "a": 1,
    "fb": "Para pasar de una creencia sin comprobar a algo pensado hay que mirar los hechos, por ejemplo si se entregaron los trabajos."
   },
   {
    "q": "En el grupo de amigos le dicen a Marta: «Hazlo, no seas rara», para que acepte un reto. ¿En qué le ayuda pensar por sí misma?",
    "o": [
     "A decidir con sus propias razones si lo hace o no",
     "A hacer lo que diga el grupo para no quedar fuera",
     "A llevar siempre la contraria a lo que propone el grupo",
     "A pensar que todas las opciones valen lo mismo"
    ],
    "a": 0,
    "fb": "Pensar por uno mismo sirve para no dejarse manipular por la presión del grupo y decidir con razones propias."
   },
   {
    "q": "Leire quiere gastar su paga en unos cascos. Antes compara precios, lee opiniones y piensa si de verdad los necesita. ¿Qué está haciendo?",
    "o": [
     "Caer en el dogmatismo por pensarlo tanto",
     "Aplicar el «todo vale» a sus compras",
     "Dejarse llevar por una corazonada",
     "Pensar críticamente antes de decidir"
    ],
    "a": 3,
    "fb": "Leire pregunta, analiza y valora antes de gastar. Eso es pensar críticamente para tomar una decisión mejor."
   },
   {
    "q": "¿En qué se diferencian una opinión y un saber?",
    "o": [
     "La opinión está comprobada; el saber es algo personal",
     "No se diferencian: las dos valen exactamente igual",
     "La opinión es personal; el saber se justifica con pruebas",
     "La opinión es de expertos; el saber, de cualquiera"
    ],
    "a": 2,
    "fb": "Una opinión es una postura personal; un saber es una creencia justificada con razones o pruebas que se pueden comprobar."
   },
   {
    "q": "¿En qué se diferencian el dogmatismo y el «todo vale»?",
    "o": [
     "Uno pide pruebas; el otro cree sin examinar nada",
     "Uno no examina; el otro iguala todas las opiniones",
     "Son lo mismo: dos formas de pensamiento crítico",
     "Uno duda de todo; el otro no duda nunca de nada"
    ],
    "a": 1,
    "fb": "El dogmatismo acepta ideas sin examinarlas; el «todo vale» trata igual una opinión con pruebas y otra sin ninguna."
   },
   {
    "q": "¿Qué diferencia hay entre ser crítico y llevar la contraria?",
    "o": [
     "El crítico mira las razones; el otro se opone siempre",
     "Ninguna: el crítico siempre dice lo contrario",
     "El crítico lo acepta todo; el otro no acepta nada",
     "El crítico solo opina; el otro aporta pruebas"
    ],
    "a": 0,
    "fb": "Ser crítico no es llevar la contraria por sistema, sino examinar las razones antes de aceptar o rechazar algo."
   },
   {
    "q": "¿Qué diferencia hay entre respetar a una persona y aceptar todo lo que dice?",
    "o": [
     "Ninguna: si la respetas, le das siempre la razón",
     "Respetarla es aceptar sus ideas aunque no tengan pruebas",
     "Solo se respeta a quien tiene ideas con pruebas",
     "Puedes respetarla y, aun así, pedirle razones"
    ],
    "a": 3,
    "fb": "Respetar a alguien no es aceptar cualquier cosa que diga. Se respeta a la persona y se piden razones de sus ideas."
   },
   {
    "q": "¿Por qué pensar por uno mismo ayuda a convivir con los demás?",
    "o": [
     "Porque así siempre ganas las discusiones con los demás",
     "Porque así nadie te lleva nunca la contraria",
     "Porque quien da razones sabe escuchar las ajenas",
     "Porque así todos acaban pensando exactamente igual"
    ],
    "a": 2,
    "fb": "Quien está acostumbrado a dar razones también sabe escuchar las de los demás, y eso facilita la convivencia."
   }
  ]
 },
 "ipc-argumentar-banco": {
  "name": "Argumentar bien (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué diferencia una opinión de un argumento?",
    "o": [
     "La opinión es verdadera y el argumento puede ser falso.",
     "El argumento lo da un experto y la opinión, cualquiera.",
     "El argumento es una opinión acompañada de razones.",
     "La opinión es breve y el argumento siempre es muy largo."
    ],
    "a": 2,
    "fb": "Una opinión es lo que uno piensa. Si además da razones que la apoyan, se convierte en un argumento."
   },
   {
    "q": "En un argumento, ¿qué son las premisas?",
    "o": [
     "Las razones o datos de los que se parte.",
     "La idea final que se quiere defender.",
     "Las críticas de quien no está de acuerdo.",
     "Los ejemplos que se añaden al final."
    ],
    "a": 0,
    "fb": "Las premisas son las razones de las que se parte para apoyar la conclusión."
   },
   {
    "q": "¿Qué es la conclusión de un argumento?",
    "o": [
     "La razón en contra que lo pone a prueba.",
     "El dato del que parte todo el razonamiento.",
     "El ejemplo que ayuda a entenderlo mejor.",
     "La idea que las premisas quieren apoyar."
    ],
    "a": 3,
    "fb": "La conclusión es la idea que se quiere defender; las premisas son las razones que la apoyan."
   },
   {
    "q": "¿Qué palabras suelen anunciar la conclusión de un argumento?",
    "o": [
     "«Porque» y «ya que».",
     "«Por tanto» y «así que».",
     "«Puesto que» y «porque».",
     "«Ya que» y «puesto que»."
    ],
    "a": 1,
    "fb": "La conclusión suele ir tras «por tanto», «así que» o «luego». «Porque» y «ya que» suelen introducir premisas."
   },
   {
    "q": "Según la teoría, ¿cuándo es bueno un argumento?",
    "o": [
     "Cuando las premisas son verdaderas y de ellas se sigue la conclusión.",
     "Cuando convence a casi todas las personas que lo escuchan.",
     "Cuando la conclusión es verdadera, aunque las premisas sean falsas.",
     "Cuando tiene muchas premisas, aunque no tengan que ver con la idea."
    ],
    "a": 0,
    "fb": "Un buen argumento cumple dos cosas a la vez: premisas verdaderas o creíbles y una conclusión que se sigue de ellas."
   },
   {
    "q": "¿Qué es el principio de caridad?",
    "o": [
     "Ser amable con el otro aunque diga cosas falsas.",
     "Darle la razón al otro para no tener que discutir.",
     "Criticar solo los fallos más pequeños que comete el otro.",
     "Entender al otro en su versión más fuerte antes de criticarlo."
    ],
    "a": 3,
    "fb": "El principio de caridad consiste en reconstruir lo que el otro quiere decir de la mejor manera posible antes de rebatirlo."
   },
   {
    "q": "¿Qué es una objeción?",
    "o": [
     "Una premisa falsa que estropea todo el razonamiento.",
     "Una opinión que no va acompañada de ninguna razón.",
     "Una razón en contra que pone a prueba un argumento.",
     "Un ejemplo que confirma la conclusión que defiendes."
    ],
    "a": 2,
    "fb": "Una objeción es una razón en contra: lo que diría quien no está de acuerdo contigo."
   },
   {
    "q": "Según la teoría, ¿qué pasos sigues para construir tu propio argumento?",
    "o": [
     "Ejemplo, opinión y repetir la idea varias veces seguidas.",
     "Conclusión, razones, ejemplo y respuesta a la objeción.",
     "Razones, conclusión y crítica a quien no piensa igual.",
     "Opinión, frase de un famoso y conclusión final clara."
    ],
    "a": 1,
    "fb": "Se dice la conclusión, se dan dos o tres razones, se pone un ejemplo y se responde a la objeción."
   },
   {
    "q": "Según la teoría, ¿qué distingue a quien argumenta de quien solo repite lo que ya pensaba?",
    "o": [
     "Que habla más alto y con mucha más seguridad.",
     "Que usa palabras difíciles y muchos datos.",
     "Que nunca cambia de idea en una discusión.",
     "Que piensa en la objeción y la responde."
    ],
    "a": 3,
    "fb": "Quien argumenta de verdad piensa qué le diría quien no está de acuerdo y le responde."
   },
   {
    "q": "Leire dice: «Este videojuego es aburrido». ¿Qué es su frase?",
    "o": [
     "Una opinión, porque no da ninguna razón.",
     "Un argumento, porque dice lo que ella piensa.",
     "Una premisa falsa, porque a otros les gusta.",
     "Una objeción, porque critica el videojuego."
    ],
    "a": 0,
    "fb": "Leire solo dice lo que piensa, sin dar razones. Por eso es una opinión y no un argumento."
   },
   {
    "q": "Omar dice: «El entrenamiento debería empezar más tarde, porque muchos salimos de clase a las cinco y no llegamos». ¿Qué es su frase?",
    "o": [
     "Una opinión, porque dice lo que él piensa.",
     "Una objeción, porque critica el horario.",
     "Un argumento, porque da una razón para su idea.",
     "Una premisa falsa, porque no todos salen a las cinco."
    ],
    "a": 2,
    "fb": "Omar da una opinión y la acompaña de una razón («porque muchos salimos a las cinco»). Eso es un argumento."
   },
   {
    "q": "«Los martes hay entrenamiento. Hoy es martes. Por tanto, hoy hay entrenamiento.» ¿Cuál es la conclusión?",
    "o": [
     "Los martes hay entrenamiento.",
     "Hoy hay entrenamiento.",
     "Hoy es martes, como cada semana.",
     "Todos los días hay entrenamiento."
    ],
    "a": 1,
    "fb": "La conclusión va tras el «por tanto»: hoy hay entrenamiento. Las otras dos frases son las premisas."
   },
   {
    "q": "Nerea dice: «Voy a llevar paraguas, ya que el cielo está muy negro y la previsión dice que lloverá». ¿Cuáles son las premisas?",
    "o": [
     "Que va a llevar paraguas y que el cielo está negro.",
     "Que va a llevar paraguas y que la previsión falla.",
     "Solo que va a llevar paraguas a clase mañana.",
     "Que el cielo está negro y la previsión da lluvia."
    ],
    "a": 3,
    "fb": "Las premisas son las razones que van tras el «ya que». «Voy a llevar paraguas» es la conclusión."
   },
   {
    "q": "Hugo razona: «Todas las frutas son rojas. El plátano es una fruta. Luego el plátano es rojo». ¿Qué falla?",
    "o": [
     "La conclusión no se sigue de las premisas.",
     "No tiene conclusión, solo tiene premisas.",
     "Una premisa es falsa, aunque encaje.",
     "Es una opinión, porque no da ninguna razón."
    ],
    "a": 2,
    "fb": "El razonamiento encaja, pero parte de algo falso: no todas las frutas son rojas."
   },
   {
    "q": "Carla dice: «He estrenado zapatillas y he marcado dos goles, así que estas zapatillas me hacen marcar». ¿Qué falla en su argumento?",
    "o": [
     "La conclusión no se sigue de la razón que da.",
     "Una premisa es falsa: no ha marcado dos goles.",
     "No da ninguna razón; solo da una opinión.",
     "Le falta responder a una objeción concreta."
    ],
    "a": 0,
    "fb": "Estrenar zapatillas no tiene nada que ver con marcar goles: la conclusión no se sigue. Es una superstición."
   },
   {
    "q": "Unai dice: «Hace sol, por tanto hoy me van a elegir delegado». ¿Qué le pasa a este argumento?",
    "o": [
     "Tiene una premisa falsa, porque hoy no hace nada de sol.",
     "La razón no tiene nada que ver con la conclusión.",
     "Es bueno, porque la premisa que da es verdadera.",
     "Es una objeción, porque pone a prueba otra idea."
    ],
    "a": 1,
    "fb": "Que haga sol no apoya en nada que lo elijan delegado. La conclusión no se sigue de la premisa."
   },
   {
    "q": "Sara dice en clase: «Habría que poner menos deberes». Pablo le responde: «O sea, que quieres que no estudiemos nada nunca». ¿Qué hace mal Pablo?",
    "o": [
     "No respeta el principio de caridad con Sara.",
     "No pone ningún ejemplo que apoye su postura.",
     "No dice con claridad cuál es su conclusión.",
     "Parte de una premisa verdadera y creíble."
    ],
    "a": 0,
    "fb": "Pablo responde a una caricatura de lo que dice Sara, no a su versión más fuerte. Rompe el principio de caridad."
   },
   {
    "q": "Izan propone cambiar el menú del comedor y Marta no está de acuerdo. ¿Qué hace Marta si aplica el principio de caridad?",
    "o": [
     "Resume la idea de Izan de la forma más ridícula.",
     "Le da la razón a Izan para que no se enfade con ella.",
     "Critica cómo habla Izan y no lo que está diciendo.",
     "Busca la mejor versión de lo que dice Izan."
    ],
    "a": 3,
    "fb": "Aplicar el principio de caridad es entender la idea del otro en su versión más fuerte y responder a eso."
   },
   {
    "q": "Aitana defiende que haya fuentes de agua en el patio. ¿Cuál de estas frases es una objeción a su idea?",
    "o": [
     "«Así beberemos más agua y estaremos mejor.»",
     "«El otro día no pude beber en el recreo.»",
     "«Instalarlas costaría dinero que no hay.»",
     "«Por tanto, hay que poner fuentes nuevas.»"
    ],
    "a": 2,
    "fb": "Una objeción es una razón en contra. El coste de instalarlas pone a prueba la idea de Aitana."
   },
   {
    "q": "Iván dice: «Deberíamos tener taquillas, porque las mochilas pesan mucho. Ayer llevé seis libros». ¿Qué papel cumple «Ayer llevé seis libros»?",
    "o": [
     "Es la conclusión que quiere defender.",
     "Es un ejemplo que apoya su razón.",
     "Es una objeción a su propia idea.",
     "Es la respuesta a una objeción."
    ],
    "a": 1,
    "fb": "Es un caso concreto que ilustra la razón de que las mochilas pesan. Por eso es un ejemplo."
   },
   {
    "q": "Lucas defiende que haya más salidas escolares. Alguien dice que así se pierden clases. Lucas contesta: «En las salidas también se aprende». ¿Qué ha hecho Lucas?",
    "o": [
     "Ha repetido su conclusión sin más.",
     "Ha usado una premisa falsa.",
     "Ha puesto un ejemplo de salida.",
     "Ha respondido a una objeción."
    ],
    "a": 3,
    "fb": "Perder clases es una razón en contra (objeción), y Lucas le responde. Eso refuerza su argumento."
   },
   {
    "q": "Jon gana un debate de clase con un truco que hace reír a todos, pero sus razones eran malas. ¿Qué se puede decir?",
    "o": [
     "Que tenía razón, porque convenció a la clase.",
     "Que convenció, pero eso no significa que tuviera razón.",
     "Que su argumento era bueno, porque ganó el debate de clase.",
     "Que la clase aplicó con él el principio de caridad."
    ],
    "a": 1,
    "fb": "Convencer y tener razón no son lo mismo: un buen truco puede convencer y, aun así, estar equivocado."
   },
   {
    "q": "Ane dice: «Hay que cuidar el patio». ¿Cómo puede convertir su frase en un argumento?",
    "o": [
     "Añadiendo una razón, como que así está limpio.",
     "Diciéndolo más veces y en voz más alta.",
     "Pidiendo que la mayoría de la clase vote a favor.",
     "Cambiándola por una pregunta a toda la clase."
    ],
    "a": 0,
    "fb": "Un argumento es una opinión con razones. Ane tiene que explicar por qué hay que cuidar el patio."
   },
   {
    "q": "¿Cuál de estos argumentos es bueno?",
    "o": [
     "«He desayunado muy bien esta mañana, así que aprobaré el examen de inglés.»",
     "«Las bicis tienen motor de gasolina; luego las bicis contaminan mucho.»",
     "«Si no riego la planta, se seca; me voy, así que pediré que la rieguen.»",
     "«Mi equipo siempre gana cuando voy al campo, así que yo le doy buena suerte.»"
    ],
    "a": 2,
    "fb": "Sus premisas son verdaderas y la conclusión se sigue de ellas. Los demás parten de algo falso o sacan una conclusión que no se sigue."
   },
   {
    "q": "¿En qué se diferencian una premisa y una conclusión?",
    "o": [
     "La premisa es siempre falsa; la conclusión es siempre verdadera.",
     "La premisa es una razón; la conclusión, la idea que se apoya.",
     "La premisa es una opinión; la conclusión es un dato comprobado.",
     "La premisa va al final; la conclusión va siempre al principio."
    ],
    "a": 1,
    "fb": "Las premisas son las razones de las que se parte; la conclusión es la idea que esas razones quieren apoyar."
   },
   {
    "q": "¿Qué diferencia hay entre un argumento con premisas falsas y uno en el que la conclusión no se sigue?",
    "o": [
     "Uno no tiene conclusión; el otro no tiene ninguna premisa.",
     "Uno es solo una opinión; el otro es un argumento con razones.",
     "Uno convence a todo el mundo; el otro no convence a nadie.",
     "Uno parte de algo falso; en el otro, la conclusión no se sigue."
    ],
    "a": 3,
    "fb": "Un argumento puede fallar porque parte de algo falso o porque sus razones no tienen que ver con la conclusión."
   },
   {
    "q": "¿En qué se diferencian convencer y tener razón?",
    "o": [
     "Son lo mismo: si convences es porque tienes razón.",
     "Tener razón depende de cuánta gente te apoye.",
     "Un buen truco puede convencer aunque esté equivocado.",
     "Solo convence quien tiene premisas verdaderas."
    ],
    "a": 2,
    "fb": "Se puede convencer con un truco y estar equivocado. Tener razón depende de las premisas y de que la conclusión se siga."
   },
   {
    "q": "¿Por qué es útil aplicar el principio de caridad en una discusión?",
    "o": [
     "Porque discutes con lo que el otro piensa y no con una caricatura.",
     "Porque así el otro te acaba dando la razón mucho más rápido.",
     "Porque así no tienes que dar tus propias razones en el debate.",
     "Porque así ganas siempre la discusión, aunque no tengas razón."
    ],
    "a": 0,
    "fb": "Discutir bien es responder a lo mejor del otro. Si atacas una caricatura, en realidad no le estás respondiendo."
   }
  ]
 },
 "ipc-falacias-banco": {
  "name": "Las falacias: trucos del mal razonamiento (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "¿En qué se diferencia una falacia de una mentira?",
    "o": [
     "La falacia es un dato falso; la mentira es un fallo en el razonamiento.",
     "No hay diferencia: las dos son formas de decir cosas falsas.",
     "La mentira es un dato falso; la falacia es un fallo en el razonamiento.",
     "La falacia se dice siempre a propósito; la mentira, sin querer."
    ],
    "a": 2,
    "fb": "Una mentira da un dato falso. Una falacia es un argumento mal construido que parece bueno."
   },
   {
    "q": "Amaia pide ir sola en bici al instituto. Su padre le dice: «Hoy la bici, mañana querrás irte sola a otra ciudad y acabarás perdida». ¿Qué falacia usa?",
    "o": [
     "Pendiente resbaladiza",
     "Falso dilema",
     "Generalización apresurada",
     "Apelación a la emoción"
    ],
    "a": 0,
    "fb": "Supone que un primer paso pequeño lleva sin remedio a un desastre. Eso es la pendiente resbaladiza."
   },
   {
    "q": "¿Qué hace quien usa la falacia del hombre de paja?",
    "o": [
     "Ataca a la persona que habla en vez de a sus ideas.",
     "Ofrece solo dos opciones cuando en realidad hay más.",
     "Saca una regla general a partir de muy pocos casos.",
     "Cambia lo que dijo el otro para rebatir algo más fácil."
    ],
    "a": 3,
    "fb": "El hombre de paja deforma lo que dijo el otro y rebate esa versión inventada, no la real."
   },
   {
    "q": "En un debate de clase sobre videojuegos, Pablo explica sus razones. Marta le suelta: «Tú no opines, que siempre llevas la misma sudadera». ¿Qué falacia usa Marta?",
    "o": [
     "Hombre de paja",
     "Ad hominem",
     "Falso dilema",
     "Apelación a la mayoría"
    ],
    "a": 1,
    "fb": "Marta no responde a las razones de Pablo: ataca a Pablo. Eso es un ad hominem."
   },
   {
    "q": "Según el tema, ¿cuándo vale la opinión de una autoridad?",
    "o": [
     "Cuando es muy conocida y tiene muchos seguidores.",
     "Cuando tiene poder o un cargo importante.",
     "Cuando es experta en el tema del que habla.",
     "Cuando mucha gente está de acuerdo con ella."
    ],
    "a": 2,
    "fb": "Una autoridad vale si sabe del tema. Ser famoso o tener poder no basta."
   },
   {
    "q": "Un anuncio de zapatillas dice: «O llevas nuestras zapatillas o te quedas en el banquillo». ¿Qué falacia hay?",
    "o": [
     "Apelación a la autoridad",
     "Pendiente resbaladiza",
     "Generalización apresurada",
     "Falso dilema"
    ],
    "a": 3,
    "fb": "Presenta solo dos salidas cuando hay muchas más: puedes jugar bien con otras zapatillas."
   },
   {
    "q": "¿Qué diferencia hay entre un ad hominem y un hombre de paja?",
    "o": [
     "El ad hominem ataca a la persona; el hombre de paja deforma lo que dijo.",
     "El ad hominem deforma lo que dijo el otro; el hombre de paja lo ataca a él.",
     "El ad hominem da dos opciones; el hombre de paja exagera las consecuencias.",
     "Ninguna: son dos nombres distintos para la misma trampa."
    ],
    "a": 0,
    "fb": "Los dos esquivan el argumento real, pero el ad hominem va contra la persona y el hombre de paja cambia sus palabras."
   },
   {
    "q": "Nerea ha leído dos libros de fantasía y no le han gustado. Concluye: «Los libros de fantasía son todos aburridos». ¿Qué falacia comete?",
    "o": [
     "Apelación a la mayoría",
     "Generalización apresurada",
     "Pendiente resbaladiza",
     "Hombre de paja"
    ],
    "a": 1,
    "fb": "Saca una regla sobre todos los libros de fantasía a partir de solo dos casos."
   },
   {
    "q": "En la apelación a la emoción, ¿qué se usa en lugar de razones?",
    "o": [
     "La opinión de alguien famoso",
     "Lo que hace la mayoría",
     "Un ataque a la persona",
     "Miedo, pena o rabia"
    ],
    "a": 3,
    "fb": "Esta falacia intenta convencer provocando miedo, pena o rabia, sin dar razones."
   },
   {
    "q": "Un vídeo con millones de visitas dice que dormir cuatro horas es suficiente. Lucas comenta: «Si lo ha visto tanta gente, será verdad». ¿Qué falacia es?",
    "o": [
     "Apelación a la mayoría",
     "Apelación a la autoridad",
     "Generalización apresurada",
     "Apelación a la emoción"
    ],
    "a": 0,
    "fb": "Que mucha gente vea o crea algo no lo hace verdad. Es una apelación a la mayoría."
   },
   {
    "q": "¿Qué error comete la generalización apresurada?",
    "o": [
     "Da solo dos opciones cuando hay muchas más.",
     "Supone que un paso pequeño acaba en desastre.",
     "Saca una regla general de muy pocos casos.",
     "Cree algo cierto porque lo hace todo el mundo."
    ],
    "a": 2,
    "fb": "Con muy pocos ejemplos no se puede sacar una regla que valga para todos."
   },
   {
    "q": "Una actriz muy famosa recomienda en redes una app para aprender matemáticas «sin estudiar». Tu primo dice que será buena porque ella es muy conocida. ¿Qué falacia es?",
    "o": [
     "Apelación a la mayoría",
     "Apelación a la autoridad",
     "Apelación a la emoción",
     "Hombre de paja"
    ],
    "a": 1,
    "fb": "Ser famosa no la hace experta en aprender matemáticas. Es una autoridad mal usada."
   },
   {
    "q": "Un anuncio de alarmas muestra una casa a oscuras y una voz pregunta: «¿Dormirías tranquilo con tu familia en peligro?». No da ningún dato. ¿Qué falacia hay?",
    "o": [
     "Apelación a la emoción",
     "Pendiente resbaladiza",
     "Apelación a la mayoría",
     "Ad hominem"
    ],
    "a": 0,
    "fb": "Busca dar miedo en vez de explicar por qué la alarma es buena."
   },
   {
    "q": "¿En qué consiste la pendiente resbaladiza?",
    "o": [
     "En sacar una regla general de muy pocos casos.",
     "En ofrecer solo dos salidas cuando hay más.",
     "En creer algo porque lo cree mucha gente.",
     "En suponer que un paso lleva a un desastre."
    ],
    "a": 3,
    "fb": "Imagina una cadena de males sin remedio a partir de un primer paso pequeño."
   },
   {
    "q": "Sara dice en casa que le gustaría tener algo más de tiempo libre entre semana. Su hermano responde: «Claro, tú lo que quieres es no estudiar en todo el curso». ¿Qué falacia es?",
    "o": [
     "Ad hominem",
     "Falso dilema",
     "Hombre de paja",
     "Pendiente resbaladiza"
    ],
    "a": 2,
    "fb": "Sara no dijo eso: su hermano deforma sus palabras para rebatir algo más fácil."
   },
   {
    "q": "¿Qué diferencia a la generalización apresurada de la apelación a la mayoría?",
    "o": [
     "La primera cree algo porque muchos lo creen; la segunda usa pocos casos.",
     "La primera usa pocos casos; la segunda cree algo porque muchos lo creen.",
     "La primera ataca a la persona; la segunda da solo dos opciones.",
     "La primera usa el miedo; la segunda se fía de alguien famoso."
    ],
    "a": 1,
    "fb": "La generalización saca una regla de pocos ejemplos. La apelación a la mayoría se fía de lo que piensa mucha gente."
   },
   {
    "q": "¿En cuál de estas situaciones NO hay ninguna falacia?",
    "o": [
     "Iratxe cree que un yogur es sano porque lo anuncia un futbolista.",
     "Iratxe cree que un móvil es bueno porque lo tienen todos.",
     "Iratxe cree que un juego es malo porque su creador es antipático.",
     "Iratxe sigue lo que le dice su médica sobre un medicamento."
    ],
    "a": 3,
    "fb": "La médica es experta en ese tema, así que fiarse de ella es razonable. Las otras son falacias."
   },
   {
    "q": "Según el tema, ¿por qué se usan tanto las falacias?",
    "o": [
     "Porque funcionan: convencen aunque no tengan razón.",
     "Porque son la forma más rápida de dar datos verdaderos.",
     "Porque solo las usan personas que quieren mentir.",
     "Porque son argumentos correctos pero difíciles."
    ],
    "a": 0,
    "fb": "Las falacias parecen buenos argumentos y por eso convencen, aunque no tengan razón."
   },
   {
    "q": "Tu hermano pequeño te dice: «Si me quisieras de verdad, me dejarías tu consola todo el fin de semana». ¿Qué falacia usa?",
    "o": [
     "Ad hominem",
     "Apelación a la emoción",
     "Apelación a la autoridad",
     "Generalización apresurada"
    ],
    "a": 1,
    "fb": "No da razones: intenta que te sientas mal para conseguir la consola."
   },
   {
    "q": "Llega a clase un chico de otro instituto y los dos primeros días se retrasa. Alguien dice: «Los de ese instituto son todos unos impuntuales». ¿Qué falacia es?",
    "o": [
     "Ad hominem",
     "Apelación a la mayoría",
     "Generalización apresurada",
     "Hombre de paja"
    ],
    "a": 2,
    "fb": "Con un solo chico y dos días no se puede sacar una regla sobre todo un instituto."
   },
   {
    "q": "¿Para qué sirve aprender a reconocer las falacias?",
    "o": [
     "Para que no nos engañen y no engañar sin darnos cuenta.",
     "Para ganar siempre las discusiones, tengamos razón o no.",
     "Para saber qué datos son falsos en cualquier noticia.",
     "Para poder usar falacias sin que nadie se dé cuenta."
    ],
    "a": 0,
    "fb": "Reconocerlas nos protege de los engaños y nos ayuda a razonar mejor nosotros mismos."
   },
   {
    "q": "Mikel sabe que el examen es el martes, pero dice a sus amigos que es el lunes para que no estudien. ¿Qué es lo que hace Mikel?",
    "o": [
     "Una generalización apresurada",
     "Un falso dilema",
     "Un hombre de paja",
     "Una mentira, no una falacia"
    ],
    "a": 3,
    "fb": "Mikel da un dato falso a propósito. Eso es una mentira, no un fallo en el razonamiento."
   },
   {
    "q": "Según el tema, ¿qué demuestra que mucha gente crea o haga algo?",
    "o": [
     "Que es verdad, porque tanta gente no puede equivocarse.",
     "Nada: que muchos lo crean no lo hace verdad ni bueno.",
     "Que es bueno, aunque quizá no sea del todo verdad.",
     "Que es verdad, pero solo si lo cree más de la mitad."
    ],
    "a": 1,
    "fb": "El número de personas que creen algo no es una prueba de que sea verdad."
   },
   {
    "q": "¿Qué diferencia hay entre el falso dilema y la pendiente resbaladiza?",
    "o": [
     "El falso dilema une pasos hasta un desastre; la pendiente da dos opciones.",
     "El falso dilema ataca a la persona; la pendiente deforma sus palabras.",
     "El falso dilema da dos opciones; la pendiente une pasos hasta un desastre.",
     "El falso dilema usa pocos casos; la pendiente se fía de la mayoría."
    ],
    "a": 2,
    "fb": "El falso dilema reduce todo a dos salidas. La pendiente resbaladiza imagina una cadena que acaba mal."
   },
   {
    "q": "Omar propone que el equipo defienda más atrás en el próximo partido. Un compañero contesta: «¿Tú qué vas a saber, si eres suplente?». ¿Qué falacia es?",
    "o": [
     "Ad hominem",
     "Falso dilema",
     "Apelación a la autoridad",
     "Hombre de paja"
    ],
    "a": 0,
    "fb": "No responde a la idea de Omar, sino que lo ataca a él. Ser suplente no hace falsa su propuesta."
   },
   {
    "q": "Según el tema, ¿por qué funcionan las falacias aunque sean malos argumentos?",
    "o": [
     "Porque siempre se apoyan en datos verdaderos y comprobados.",
     "Porque solo las usan personas expertas en el tema.",
     "Porque nadie es capaz de reconocerlas aunque lo intente.",
     "Porque tocan nuestras emociones o nuestra prisa por decidir."
    ],
    "a": 3,
    "fb": "Nos ahorran pensar: juegan con lo que sentimos y con las ganas de decidir rápido."
   },
   {
    "q": "Aitana le dice a Rubén: «O te gusta este cantante o no tienes ni idea de música». ¿Qué falacia usa?",
    "o": [
     "Generalización apresurada",
     "Falso dilema",
     "Apelación a la mayoría",
     "Pendiente resbaladiza"
    ],
    "a": 1,
    "fb": "Reduce todo a dos opciones, cuando se puede saber de música sin que te guste ese cantante."
   },
   {
    "q": "¿En qué se diferencian la apelación a la autoridad mal usada y la apelación a la mayoría?",
    "o": [
     "Una deforma lo que dijo otro; la otra ataca a la persona.",
     "Una usa el miedo o la pena; la otra da solo dos salidas.",
     "Una se fía de alguien famoso; la otra, de lo que cree mucha gente.",
     "Una saca reglas de pocos casos; la otra imagina un desastre."
    ],
    "a": 2,
    "fb": "La autoridad mal usada confía en alguien conocido pero no experto. La apelación a la mayoría confía en lo que hacen muchos."
   },
   {
    "q": "Un anuncio te mete prisa y te hace sentir mal si no compras ya. Según el tema, ¿qué es lo más útil que puedes hacer?",
    "o": [
     "Parar y buscar qué razones da, además de la emoción.",
     "Comprar rápido antes de que se acabe la oferta.",
     "Mirar si el anuncio lo ha visto mucha gente.",
     "Fiarte si sale alguien famoso recomendándolo."
    ],
    "a": 0,
    "fb": "Las falacias juegan con la emoción y la prisa. Pararse a buscar razones nos protege."
   },
   {
    "q": "¿Qué falacia consiste en ofrecer solo dos salidas cuando en realidad hay más?",
    "o": [
     "Pendiente resbaladiza",
     "Hombre de paja",
     "Generalización apresurada",
     "Falso dilema"
    ],
    "a": 3,
    "fb": "El falso dilema esconde las demás opciones para forzar la conclusión."
   }
  ]
 },
 "ipc-sesgos-banco": {
  "name": "Las trampas de la mente: los sesgos (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "Según la teoría, ¿por qué nuestra mente comete sesgos?",
    "o": [
     "Porque alguien nos convence con argumentos que parecen buenos y no lo son",
     "Porque el cerebro toma atajos para decidir rápido y a veces fallan",
     "Porque solo razonamos mal cuando estamos cansados o aburridos",
     "Porque nos falta información y no sabemos pensar con lógica"
    ],
    "a": 1,
    "fb": "El cerebro usa atajos para decidir deprisa, y esos atajos a veces nos equivocan. No es que seamos tontos."
   },
   {
    "q": "¿Qué es el anclaje?",
    "o": [
     "Creer más probable lo que recordamos con más facilidad",
     "Buscar solo los datos que confirman lo que ya pensábamos",
     "Cambiar de opinión para hacer lo mismo que hace el grupo",
     "Dejarse influir demasiado por el primer dato recibido"
    ],
    "a": 3,
    "fb": "En el anclaje, el primer dato que oímos se queda «enganchado» y tuerce el juicio sobre lo que viene después."
   },
   {
    "q": "¿Qué es el sesgo de disponibilidad?",
    "o": [
     "Fiarse demasiado del primer precio o del primer dato que nos dan",
     "Creer más probable lo que nos viene rápido a la memoria",
     "Seguir a la mayoría para no quedarse fuera del grupo",
     "Fijarse solo en lo que da la razón a nuestras ideas"
    ],
    "a": 1,
    "fb": "La disponibilidad hace que lo que recordamos con facilidad nos parezca más probable de lo que es."
   },
   {
    "q": "¿Qué es el efecto arrastre?",
    "o": [
     "Imitar al grupo solo por no quedarse fuera",
     "Recordar solo los datos que apoyan lo que ya creemos",
     "Juzgar algo según el primer número que hemos oído",
     "Temer más lo que vemos a menudo en las noticias"
    ],
    "a": 0,
    "fb": "El efecto arrastre nos lleva a hacer lo que hace el grupo. Pero «lo hacían todos» no es una razón."
   },
   {
    "q": "En este tema, ¿qué es una burbuja?",
    "o": [
     "Un grupo de amigos que siempre hace lo que dice la mayoría",
     "Un precio inflado que hace que otro parezca un chollo",
     "Un entorno de las redes donde solo aparece lo que ya nos gusta",
     "Un recuerdo tan fuerte que nos parece mucho más probable de lo que es"
    ],
    "a": 2,
    "fb": "La burbuja es un entorno, sobre todo en redes, donde solo vemos lo que ya nos gusta y todos parecen darnos la razón."
   },
   {
    "q": "Según la teoría, ¿por qué el sesgo de confirmación es peor en internet?",
    "o": [
     "Porque en internet hay más mentiras que en los libros o la tele",
     "Porque las redes te muestran sobre todo lo que ya te gusta",
     "Porque en las redes todo el mundo copia lo que hacen los demás",
     "Porque el primer vídeo que ves ancla todo lo que ves después"
    ],
    "a": 1,
    "fb": "Las redes te enseñan más de lo que ya te gusta y te encierran en una burbuja que confirma lo que piensas."
   },
   {
    "q": "Según la teoría, ¿se pueden apagar los sesgos?",
    "o": [
     "Sí, basta con saber cómo se llama cada uno de ellos",
     "Sí, pero solo las personas adultas y que han estudiado mucho",
     "No, y por eso no merece la pena intentar vigilarlos",
     "No, pero sí podemos vigilarlos para que nos engañen menos"
    ],
    "a": 3,
    "fb": "Los sesgos no se pueden apagar, pero sí vigilar: así nos engañan menos."
   },
   {
    "q": "¿Qué pregunta incómoda propone la teoría para vigilar tus propios sesgos?",
    "o": [
     "¿Creo esto porque es verdad o porque me conviene?",
     "¿Qué piensa la mayoría de mi clase sobre esto?",
     "¿Quién fue la primera persona que me lo contó?",
     "¿Cuántas veces he oído esto en las noticias?"
    ],
    "a": 0,
    "fb": "Preguntarte si crees algo porque es verdad o porque te conviene te ayuda a pillar el sesgo de confirmación."
   },
   {
    "q": "En el cuento del ladrón de hachas, ¿qué cambió cuando el campesino encontró el hacha?",
    "o": [
     "El muchacho dejó de comportarse de forma sospechosa",
     "El vecino le convenció de que su hijo era buena persona",
     "El campesino cambió su forma de mirar al muchacho",
     "El muchacho confesó que había escondido el hacha"
    ],
    "a": 2,
    "fb": "El chico no había cambiado nada: cambió la mirada del campesino. Eso es el sesgo de confirmación."
   },
   {
    "q": "¿Cuál de estos consejos NO propone la teoría para defenderse de los sesgos?",
    "o": [
     "Seguir también a personas que piensan distinto que tú",
     "Desconfiar de lo que decides con prisa o con mucha emoción",
     "Tomar las decisiones deprisa para no darles tantas vueltas",
     "Parar unos segundos antes de reenviar un mensaje alarmante"
    ],
    "a": 2,
    "fb": "La teoría aconseja justo lo contrario: desconfiar de las decisiones tomadas con prisa."
   },
   {
    "q": "Mikel dice que «se le da fatal el inglés». Recuerda cada examen suspendido, pero se olvida de los tres últimos que aprobó. ¿Qué sesgo actúa?",
    "o": [
     "Sesgo de confirmación",
     "Sesgo de anclaje",
     "Efecto arrastre",
     "Sesgo de disponibilidad"
    ],
    "a": 0,
    "fb": "Mikel solo ve lo que confirma lo que ya pensaba de sí mismo y olvida lo que le lleva la contraria."
   },
   {
    "q": "Lucía ha visto muchos vídeos de perros que muerden. Ahora cree que los perros de su barrio son muy peligrosos, aunque nunca ha pasado nada. ¿Qué sesgo es?",
    "o": [
     "Efecto arrastre",
     "Sesgo de confirmación",
     "Sesgo de anclaje",
     "Sesgo de disponibilidad"
    ],
    "a": 3,
    "fb": "Como recuerda con facilidad esos vídeos, le parece más probable que un perro la muerda. Es la disponibilidad."
   },
   {
    "q": "La profesora pide que cada uno escriba en secreto cuántos habitantes tiene un pueblo. Antes, Álex dice en broma «un millón», y casi todos escriben cifras altísimas. ¿Qué sesgo explica esto?",
    "o": [
     "Sesgo de disponibilidad",
     "Sesgo de confirmación",
     "Sesgo de anclaje",
     "Efecto arrastre"
    ],
    "a": 2,
    "fb": "El primer número que se oyó, aunque fuera en broma, ancló las respuestas de toda la clase."
   },
   {
    "q": "Carla vende su bici usada. Primero pide 300 € aunque vale menos. El comprador acaba pagando 200 € y cree que ha hecho un buen negocio. ¿Qué sesgo aprovecha Carla?",
    "o": [
     "Sesgo de confirmación",
     "Sesgo de anclaje",
     "Efecto arrastre",
     "Sesgo de disponibilidad"
    ],
    "a": 1,
    "fb": "El primer precio, 300 €, ancla el juicio del comprador y hace que 200 € le parezca barato."
   },
   {
    "q": "En el recreo, todo el grupo hace un reto viral que consiste en vaciar las botellas de agua en el suelo. Nerea también lo hace, aunque le parece una tontería. ¿Qué sesgo es?",
    "o": [
     "Efecto arrastre",
     "Sesgo de disponibilidad",
     "Sesgo de anclaje",
     "Sesgo de confirmación"
    ],
    "a": 0,
    "fb": "Nerea hace lo que hace el grupo solo por no quedarse fuera, no porque tenga una buena razón."
   },
   {
    "q": "Toda la clase se ha comprado la misma funda de móvil. A Pablo no le gusta, pero se la compra para no quedarse fuera. ¿Qué sesgo actúa?",
    "o": [
     "Sesgo de anclaje",
     "Sesgo de confirmación",
     "Sesgo de disponibilidad",
     "Efecto arrastre"
    ],
    "a": 3,
    "fb": "Pablo actúa como el grupo solo para no quedarse fuera. Eso es el efecto arrastre."
   },
   {
    "q": "Ane solo ve en su feed vídeos que alaban a su equipo de fútbol, y está convencida de que todo el mundo opina como ella. ¿En qué está metida?",
    "o": [
     "En un efecto arrastre",
     "En un anclaje",
     "En una burbuja",
     "En una falacia"
    ],
    "a": 2,
    "fb": "Las redes le enseñan solo lo que ya le gusta y parece que todos le dan la razón: está en una burbuja."
   },
   {
    "q": "Irene cree que Dani, el nuevo, es un presumido. Cuando él cuenta su viaje, piensa «ya está fardando»; cuando ayuda a otros, ni lo nota. ¿Qué sesgo es?",
    "o": [
     "Sesgo de confirmación",
     "Efecto arrastre",
     "Sesgo de disponibilidad",
     "Sesgo de anclaje"
    ],
    "a": 0,
    "fb": "Irene se fija en lo que confirma su idea sobre Dani y no ve lo que la contradice."
   },
   {
    "q": "Tras ver en las noticias un robo en una tienda del centro, Martín dice que su ciudad es cada vez más peligrosa, aunque hay menos robos que antes. ¿Qué sesgo es?",
    "o": [
     "Sesgo de anclaje",
     "Sesgo de disponibilidad",
     "Sesgo de confirmación",
     "Efecto arrastre"
    ],
    "a": 1,
    "fb": "Martín recuerda muy bien esa noticia y por eso cree que los robos son más frecuentes de lo que son."
   },
   {
    "q": "A Sara le da pánico bañarse en el mar por los tiburones, pero cruza la calle mirando el móvil sin preocuparse. ¿Qué sesgo explica su miedo?",
    "o": [
     "Efecto arrastre",
     "Sesgo de anclaje",
     "Sesgo de confirmación",
     "Sesgo de disponibilidad"
    ],
    "a": 3,
    "fb": "Los tiburones son rarísimos, pero se recuerdan con facilidad; el tráfico es un peligro real de cada día."
   },
   {
    "q": "Una amiga le dice a Iratxe: «esos cascos son carísimos, cuestan 120 €». Luego Iratxe ve otros de 70 € y le parecen muy baratos. ¿Qué sesgo actúa?",
    "o": [
     "Sesgo de confirmación",
     "Efecto arrastre",
     "Sesgo de anclaje",
     "Sesgo de disponibilidad"
    ],
    "a": 2,
    "fb": "El primer precio que oyó, 120 €, se convierte en el ancla con la que compara todo lo demás."
   },
   {
    "q": "Ainhoa no encuentra su estuche y sospecha de Iker. Desde entonces, todo lo que él hace le parece raro. Luego lo encuentra en su mochila e Iker vuelve a parecerle normal. ¿Qué sesgo es?",
    "o": [
     "Sesgo de anclaje",
     "Efecto arrastre",
     "Sesgo de disponibilidad",
     "Sesgo de confirmación"
    ],
    "a": 3,
    "fb": "Es como el cuento del ladrón de hachas: Iker no cambió, cambió la mirada de Ainhoa."
   },
   {
    "q": "En clase votan la película para la excursión. Omar prefería otra, pero vota la misma que todos sus amigos para no quedarse fuera. ¿Qué sesgo es?",
    "o": [
     "Sesgo de confirmación",
     "Efecto arrastre",
     "Sesgo de disponibilidad",
     "Sesgo de anclaje"
    ],
    "a": 1,
    "fb": "Omar elige lo que elige el grupo solo por no quedarse fuera: efecto arrastre."
   },
   {
    "q": "Leire, muy enfadada tras perder un partido, quiere dejar el equipo de baloncesto en ese mismo momento. ¿Qué consejo de la teoría le vendría bien?",
    "o": [
     "Desconfiar de las decisiones tomadas con prisa y mucha emoción",
     "Hacer lo que decida la mayoría de las compañeras del equipo",
     "Fijarse en el primer resultado de la temporada para decidir",
     "Recordar solo los partidos buenos para sentirse mejor ya"
    ],
    "a": 0,
    "fb": "Las decisiones tomadas con prisa o con mucha emoción suelen estar torcidas por los sesgos."
   },
   {
    "q": "¿En qué se diferencian el anclaje y la disponibilidad?",
    "o": [
     "El anclaje depende del primer dato; la disponibilidad, de lo que se recuerda fácil",
     "El anclaje depende de lo que hace el grupo; la disponibilidad, del primer dato",
     "El anclaje solo pasa con precios; la disponibilidad, solo con las noticias",
     "El anclaje es un sesgo y la disponibilidad es un fallo en un argumento"
    ],
    "a": 0,
    "fb": "El anclaje se engancha al primer dato recibido; la disponibilidad, a lo que nos viene fácil a la memoria."
   },
   {
    "q": "¿Qué diferencia hay entre el sesgo de confirmación y el efecto arrastre?",
    "o": [
     "El primero sigue al grupo; el segundo busca lo que ya pensábamos",
     "El primero busca lo que ya pensábamos; el segundo sigue al grupo",
     "El primero solo pasa en internet; el segundo, solo en el instituto",
     "El primero es un sesgo; el segundo es un error de un argumento"
    ],
    "a": 1,
    "fb": "La confirmación busca lo que da la razón a nuestras ideas; el arrastre nos hace imitar al grupo."
   },
   {
    "q": "¿Qué relación hay entre la burbuja de las redes y el sesgo de confirmación?",
    "o": [
     "La burbuja lo elimina, porque nos muestra opiniones de todo tipo",
     "La burbuja es lo mismo que el efecto arrastre, no que la confirmación",
     "La burbuja lo refuerza, porque nos muestra sobre todo lo que ya nos gusta",
     "No tienen relación: la burbuja es un anclaje de precios en internet"
    ],
    "a": 2,
    "fb": "En la burbuja solo vemos lo que ya nos gusta, así que el sesgo de confirmación se hace más fuerte."
   },
   {
    "q": "¿Qué tienen en común el anclaje, la disponibilidad y el efecto arrastre?",
    "o": [
     "Son errores de un argumento que alguien usa para engañarnos",
     "Solo les pasan a quienes pasan muchas horas en las redes",
     "Se pueden apagar del todo si aprendemos cómo se llaman",
     "Son tendencias automáticas de la mente que no notamos"
    ],
    "a": 3,
    "fb": "Los tres son sesgos: tendencias automáticas de nuestra mente, no errores de un argumento de otra persona."
   },
   {
    "q": "Si todos tenemos sesgos, ¿podemos ser del todo objetivos? Según la teoría…",
    "o": [
     "Sí, siempre que pensemos las cosas despacio y con calma",
     "No, y por eso da igual lo que creamos sobre cualquier tema",
     "Sí, porque los sesgos solo afectan a las personas mayores",
     "Quizá no del todo, pero sí más honestos si los vigilamos"
    ],
    "a": 3,
    "fb": "Quizá no podamos ser del todo objetivos, pero reconocer y vigilar los sesgos nos hace más honestos."
   },
   {
    "q": "¿Para qué te sirve en la vida diaria conocer los sesgos?",
    "o": [
     "Para ganar siempre las discusiones con tus amigos y amigas",
     "Para pillar a tu mente cuando te engaña y decidir mejor",
     "Para no tener que comprobar nunca de dónde sale una noticia",
     "Para saber qué opina la mayoría y hacer siempre lo mismo"
    ],
    "a": 1,
    "fb": "Si conoces los sesgos, puedes darte cuenta de cuándo tu mente piensa torcido y tomar mejores decisiones."
   }
  ]
 },
 "ipc-dialogo-banco": {
  "name": "El arte de dialogar (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "Según el tema, ¿qué es dialogar?",
    "o": [
     "Hablar por turnos hasta que uno gana",
     "Pensar juntos para entender mejor un problema",
     "Convencer al otro de que tu idea es la buena",
     "Llegar a un acuerdo aunque nadie dé razones"
    ],
    "a": 1,
    "fb": "Dialogar es pensar juntos para entender mejor un problema, no hablar por turnos hasta que alguien gana."
   },
   {
    "q": "En un buen diálogo, todos juegan en el mismo equipo. Entonces, ¿quién es el rival?",
    "o": [
     "La persona que piensa distinto",
     "El compañero que habla más alto",
     "La pregunta que se piensa",
     "Quien modera el debate de clase"
    ],
    "a": 2,
    "fb": "En el diálogo el rival es la pregunta o el problema, nunca la otra persona."
   },
   {
    "q": "¿Por qué se dice que en un buen diálogo todos ganan?",
    "o": [
     "Porque al final siempre se llega a un consenso",
     "Porque nadie tiene que cambiar nunca de idea",
     "Porque cada uno se queda con su propia opinión",
     "Porque todos acaban entendiendo más que antes"
    ],
    "a": 3,
    "fb": "Aunque no haya acuerdo, todos terminan entendiendo el problema mejor que al principio."
   },
   {
    "q": "¿Qué es la escucha activa?",
    "o": [
     "Callarte mientras preparas lo que vas a responder",
     "Asentir con la cabeza para que el otro siga",
     "Apuntar los fallos del otro para rebatirlos luego",
     "Atender hasta poder repetir lo que dice el otro"
    ],
    "a": 3,
    "fb": "Escuchar activamente es atender de verdad, tanto que sabrías repetir con tus palabras lo que ha dicho el otro."
   },
   {
    "q": "¿Qué es el consenso?",
    "o": [
     "La norma de hablar de uno en uno",
     "El acuerdo al que se llega tras un diálogo",
     "La opinión de quien mejor habla",
     "Una votación en la que gana siempre la mayoría"
    ],
    "a": 1,
    "fb": "El consenso es el acuerdo al que se llega después de dialogar."
   },
   {
    "q": "¿Por qué es útil saber dialogar en la vida real, por ejemplo con tu cuadrilla?",
    "o": [
     "Porque ayuda a entender un problema aunque no estéis de acuerdo",
     "Porque así consigues que los demás acaben haciendo lo que tú quieres",
     "Porque te ahorra tener que explicar las razones de lo que piensas",
     "Porque te permite ganar las discusiones sin tener que cambiar de idea"
    ],
    "a": 0,
    "fb": "Dialogar sirve para entender mejor los problemas juntos, incluso cuando no se llega a un acuerdo."
   },
   {
    "q": "¿Qué punto de la lista de control pregunta si has dado razones y ejemplos o solo opiniones?",
    "o": [
     "Actitud",
     "Participación",
     "Calidad de los argumentos",
     "Mirada sobre el problema"
    ],
    "a": 2,
    "fb": "La calidad de los argumentos revisa si has apoyado tus ideas con razones y ejemplos."
   },
   {
    "q": "En el debate sobre el uniforme, Hugo le dice a Sara: «Tú qué vas a saber, si vistes fatal». ¿Qué norma del diálogo rompe Hugo?",
    "o": [
     "Ir al problema, no a la persona",
     "Poder cambiar de idea",
     "Respetar el turno de palabra",
     "El principio de caridad"
    ],
    "a": 0,
    "fb": "Hugo ataca a Sara en vez de criticar su idea. En un diálogo se critican las ideas, nunca a quien las dice."
   },
   {
    "q": "Ane y Marco debaten sobre el móvil en el recreo. Ella repite «hay que prohibirlo» y él «pues yo digo que no», cada vez más alto y sin escucharse. ¿Qué es esto?",
    "o": [
     "Una pelea",
     "Una discusión de sordos",
     "Un diálogo",
     "Un consenso"
    ],
    "a": 1,
    "fb": "Cada uno repite su idea más alto sin escuchar al otro: es una discusión de sordos. No hay insultos, así que no es una pelea."
   },
   {
    "q": "Unai propone un día de menú vegetariano en el comedor. Claudia responde: «O sea, que quieres prohibir la carne para siempre». ¿Qué norma NO respeta Claudia?",
    "o": [
     "El turno de palabra",
     "Poder cambiar de idea",
     "Ir al problema, no a la persona",
     "El principio de caridad"
    ],
    "a": 3,
    "fb": "Claudia responde a una caricatura de la idea de Unai, no a su mejor versión. Eso rompe el principio de caridad."
   },
   {
    "q": "Tras escuchar a Yasmin, Iván dice: «Tienes razón, no había pensado en eso. Cambio mi postura». ¿Qué está haciendo Iván?",
    "o": [
     "Pierde el debate por no defender su idea",
     "Aplica la norma de cambiar de idea",
     "Rompe el principio de caridad con Yasmin",
     "Evita dar razones para acabar antes"
    ],
    "a": 1,
    "fb": "Reconocer «tienes razón» no es perder, es aprender. Iván sigue la norma de poder cambiar de idea."
   },
   {
    "q": "En el debate de clase, Leire tenía ideas interesantes, pero no dijo nada en toda la hora. ¿Qué punto de la lista de control debería mejorar?",
    "o": [
     "Actitud",
     "Calidad de los argumentos",
     "Participación",
     "Mirada sobre el problema"
    ],
    "a": 2,
    "fb": "La participación pregunta si has aportado al debate y si has dejado hablar a los demás."
   },
   {
    "q": "En el debate, Mateo no da ninguna razón, pero hace reír a todos con sus chistes y cree que así ha ganado. ¿Qué norma olvida?",
    "o": [
     "Escuchar de verdad",
     "Poder cambiar de idea",
     "Ir al problema, no a la persona",
     "Dar razones, no gritar"
    ],
    "a": 3,
    "fb": "En un diálogo gana el mejor argumento, no la voz más alta ni el más gracioso."
   },
   {
    "q": "Durante un debate, Nerea se burla de cómo habla un compañero y pone caras mientras él interviene. ¿Qué punto de la lista de control debe revisar?",
    "o": [
     "Actitud",
     "Participación",
     "Calidad de los argumentos",
     "Mirada sobre el problema"
    ],
    "a": 0,
    "fb": "La actitud revisa si has respetado los turnos y a las personas, y Nerea no respeta a su compañero."
   },
   {
    "q": "Lucas: «Creo que el móvil en clase distrae; ¿tú por qué piensas que no?». Irati: «Porque lo usamos para buscar información». Lucas: «Eso es verdad... ¿y si solo fuera para eso?». ¿Qué es?",
    "o": [
     "Una discusión de sordos",
     "Una pelea",
     "Un diálogo",
     "Un consenso"
    ],
    "a": 2,
    "fb": "Se escuchan, dan razones y las ideas se mueven: es un diálogo."
   },
   {
    "q": "Sobre el viaje de fin de curso, Aimar le grita a Rocío «¡Eres una pesada!» y ella contesta «¡Y tú un creído!». ¿Qué tipo de escena es?",
    "o": [
     "Una pelea",
     "Una discusión de sordos",
     "Un diálogo",
     "Un consenso"
    ],
    "a": 0,
    "fb": "Se atacan las personas en vez de las ideas (ad hominem) y no se avanza nada: es una pelea."
   },
   {
    "q": "¿En qué se diferencian una pelea y una discusión de sordos?",
    "o": [
     "En la pelea se dan razones; en la de sordos solo se grita más",
     "En la pelea se ataca a la persona; en la de sordos nadie escucha",
     "En la pelea se acaba en acuerdo; en la de sordos nadie cede",
     "En la pelea se escucha al otro; en la de sordos se corta"
    ],
    "a": 1,
    "fb": "En la pelea se ataca a las personas; en la discusión de sordos cada uno repite su idea sin escuchar."
   },
   {
    "q": "¿Qué diferencia hay entre la escucha activa y el principio de caridad?",
    "o": [
     "La escucha es callarse; la caridad, darle la razón al otro",
     "La escucha es respetar los turnos; la caridad, ayudar al que se equivoca",
     "Escuchar es poder repetirlo; la caridad, responder a su mejor versión",
     "No hay diferencia: las dos consisten en no interrumpir nunca al otro"
    ],
    "a": 2,
    "fb": "Escuchar es entender lo que dice el otro hasta poder repetirlo; la caridad es responder a la mejor versión de su idea."
   },
   {
    "q": "¿Qué relación hay entre el diálogo y el consenso?",
    "o": [
     "Sin consenso, un diálogo no ha servido para nada",
     "El consenso es la norma de hablar de uno en uno",
     "El diálogo solo termina cuando uno de los dos le gana al otro",
     "El consenso puede salir del diálogo, pero no siempre"
    ],
    "a": 3,
    "fb": "El consenso es un acuerdo que puede salir del diálogo, pero aunque no se llegue a él, todos entienden más."
   }
  ]
 },
 "ipc-medios-banco": {
  "name": "Mira los medios con lupa (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "¿Qué es la posverdad?",
    "o": [
     "Una época en que las emociones pesan más que los hechos",
     "Una noticia falsa que se difunde como si fuera verdadera",
     "Un titular exagerado que busca conseguir muchos clics",
     "La costumbre de comprobar las noticias en varias fuentes"
    ],
    "a": 0,
    "fb": "La posverdad es la situación en que las emociones y las creencias pesan más que los hechos comprobados."
   },
   {
    "q": "¿Qué es un bulo o fake news?",
    "o": [
     "Una opinión personal que alguien publica en sus redes",
     "Un anuncio en el que un famoso recomienda un producto",
     "Una noticia falsa que circula como si fuera verdad",
     "Una noticia verdadera contada con un titular llamativo"
    ],
    "a": 2,
    "fb": "Un bulo es una noticia falsa que circula como si fuera verdadera."
   },
   {
    "q": "Según el tema, ¿cuál es la primera pregunta que conviene hacerse ante cualquier mensaje?",
    "o": [
     "¿Cuántas personas lo han compartido ya?",
     "¿Me gusta cómo está escrito y diseñado?",
     "¿Coincide con lo que yo ya pensaba antes?",
     "¿Quién lo manda y qué gana con ello?"
    ],
    "a": 3,
    "fb": "Muchos mensajes no buscan informarte, sino venderte algo o convencerte, así que primero hay que saber quién lo manda y qué gana."
   },
   {
    "q": "Según el tema, ¿qué es una necesidad?",
    "o": [
     "Algo que la publicidad nos anima a comprar hoy mismo",
     "Algo que nos hace falta para vivir bien, como comer",
     "Algo que queremos, aunque viviríamos igual de bien sin ello",
     "Algo que ya tienen nuestros amigos y nosotros todavía no"
    ],
    "a": 1,
    "fb": "Una necesidad es algo que nos hace falta para vivir bien: comer, abrigarnos, tener casa, aprender o tener amigos."
   },
   {
    "q": "¿En qué consiste el efecto Diderot?",
    "o": [
     "Un famoso usa un producto y su fama pasa a la marca",
     "Un anuncio nos mete prisa con ofertas de solo un día",
     "Una compra nueva nos lleva a desear otras que peguen con ella",
     "Sentimos miedo a quedarnos fuera de lo que hacen los demás"
    ],
    "a": 2,
    "fb": "En el efecto Diderot, una compra nos empuja a desear otra que pegue con ella, y así una detrás de otra."
   },
   {
    "q": "¿Qué significa verificar o contrastar una información?",
    "o": [
     "Compartirla pronto para que otros también la conozcan",
     "Creerla si la publica una cuenta con muchos seguidores",
     "Leer solo el titular para decidir si nos convence",
     "Comprobarla en varias fuentes fiables antes de creerla"
    ],
    "a": 3,
    "fb": "Verificar es comprobar una información en varias fuentes fiables antes de creerla."
   },
   {
    "q": "Según el tema, ¿qué vende en realidad la publicidad?",
    "o": [
     "Información objetiva sobre sus productos",
     "Datos comprobados por expertos",
     "Solo lo que necesitamos para vivir",
     "Emociones y deseos"
    ],
    "a": 3,
    "fb": "La publicidad no vende tanto productos como emociones y deseos que asociamos a la marca."
   },
   {
    "q": "En el plan para mirar con lupa, ¿qué revisas en el paso «Fecha e imagen»?",
    "o": [
     "Si la foto o el vídeo son actuales o reciclados de antes",
     "Si lo publica un medio serio o una cuenta cualquiera",
     "Si otros sitios fiables cuentan también lo mismo",
     "Quién gana algo si me lo creo o lo comparto"
    ],
    "a": 0,
    "fb": "Muchos bulos reciclan fotos o vídeos viejos, por eso hay que mirar si la imagen es actual."
   },
   {
    "q": "Según el tema, desear no es malo. Entonces, ¿cuándo llega el problema?",
    "o": [
     "Al desear cualquier cosa que no sea comida o ropa",
     "Al pedir algo que hemos visto antes en un anuncio",
     "Al sentir que un deseo superfluo es una necesidad",
     "Al querer algo que también tienen nuestros amigos"
    ],
    "a": 2,
    "fb": "Desear no es malo; el problema llega cuando la publicidad nos hace sentir que un deseo superfluo es una necesidad."
   },
   {
    "q": "¿Qué enseña el cuento chino de los palillos de marfil?",
    "o": [
     "Que un lujo acaba pidiendo otros lujos a juego",
     "Que los objetos caros siempre duran más que los baratos",
     "Que la fama de alguien se contagia a lo que usa",
     "Que las ofertas de última hora nos hacen comprar rápido"
    ],
    "a": 0,
    "fb": "Los palillos de lujo acaban pidiendo cuencos, banquetes y palacios: es la misma escalera que el efecto Diderot."
   },
   {
    "q": "A Lucía le llega un audio de WhatsApp que dice que el agua del grifo del barrio está envenenada y termina con «¡reenvía esto a todos!». Ningún medio habla de ello. ¿Qué es probablemente?",
    "o": [
     "Un bulo que busca asustar para que se comparta",
     "Un anuncio que usa la publicidad aspiracional",
     "Un aviso oficial comprobado por varias fuentes",
     "Un titular de clickbait de un periódico serio"
    ],
    "a": 0,
    "fb": "Da miedo, pide reenviarlo y ningún medio lo confirma: son rasgos típicos de un bulo."
   },
   {
    "q": "Marcos ve en Instagram una foto de una inundación «de hoy» en su ciudad. La busca y descubre que es de hace diez años. ¿Qué paso del plan le ha servido?",
    "o": [
     "Interés: quién gana si lo comparto",
     "Fecha e imagen: si es actual",
     "Fuente: quién lo publica",
     "Contraste: si lo dicen otros"
    ],
    "a": 1,
    "fb": "Comprobar si una imagen es actual destapa muchos bulos que reciclan fotos viejas."
   },
   {
    "q": "Hugo tiene dos sudaderas de marca que le quedan bien, pero quiere una tercera que ha visto en un anuncio. Según el tema, esa tercera sudadera es…",
    "o": [
     "Una necesidad, porque la ropa sirve para abrigarse",
     "Un deseo superfluo, porque viviría igual de bien sin ella",
     "Un bulo, porque el anuncio cuenta algo falso",
     "Un caso de posverdad, porque le hace ilusión"
    ],
    "a": 1,
    "fb": "Hugo ya está abrigado; la tercera sudadera es algo que quiere, pero sin lo que viviría igual de bien."
   },
   {
    "q": "Nerea estrena unas zapatillas. De pronto su chándal le parece viejo y lo cambia; después quiere también una mochila a juego. ¿Qué explica lo que le pasa?",
    "o": [
     "El FOMO: miedo a quedarse fuera de lo que hacen otros",
     "La escasez: la tienda le mete prisa para comprar",
     "El testimonio: una famosa lleva esas zapatillas",
     "El efecto Diderot: una compra le hace desear otras"
    ],
    "a": 3,
    "fb": "Una compra nueva le lleva a desear otras que peguen con ella: eso es el efecto Diderot."
   },
   {
    "q": "Samuel mira unos auriculares en una tienda online. Aparece «¡Solo quedan 2!» junto a una cuenta atrás. ¿Qué busca la tienda con ese mensaje?",
    "o": [
     "Informarle de forma objetiva de lo que queda en el almacén",
     "Que compare el precio con el de otras tiendas antes",
     "Que compre deprisa, sin tiempo para pensarlo bien",
     "Que espere unos días a que baje el precio"
    ],
    "a": 2,
    "fb": "La escasez y la urgencia buscan que compres sin pararte a pensar si de verdad lo quieres."
   },
   {
    "q": "Carla lee en redes que han cancelado el concierto de su cantante favorito. Antes de creérselo, busca la noticia en otros medios fiables y no aparece en ninguno. ¿Qué paso ha aplicado?",
    "o": [
     "Fecha e imagen",
     "Interés",
     "Contraste",
     "Fuente"
    ],
    "a": 2,
    "fb": "Ha contrastado: ha mirado si otros sitios fiables lo cuentan. Si solo aparece en uno, hay que sospechar."
   },
   {
    "q": "Omar ve un vídeo de una marca de batidos que asegura que su batido quita el cansancio para siempre. Omar se pregunta quién gana si él se lo cree. ¿Qué paso aplica?",
    "o": [
     "Contraste",
     "Fuente",
     "Fecha e imagen",
     "Interés"
    ],
    "a": 3,
    "fb": "Preguntarse quién gana si me lo creo o lo comparto es el paso del interés."
   },
   {
    "q": "Yasmina decide no creerse nada de lo que ve en internet, ni siquiera lo que publican los medios serios. Según el tema, ¿qué le pasa?",
    "o": [
     "Hace bien, porque así nunca caerá en un bulo",
     "Exagera, porque desconfiar de todo también paraliza",
     "Aplica muy bien el paso del contraste",
     "Está cayendo en la trampa de la posverdad"
    ],
    "a": 1,
    "fb": "No se trata de desconfiar de todo, sino de comprobar antes de decidir."
   },
   {
    "q": "Un youtuber de videojuegos al que Pablo admira anuncia una crema para la piel, aunque no sabe nada de cuidar la piel. ¿Por qué es un truco?",
    "o": [
     "Porque los youtubers nunca pueden hacer anuncios",
     "Porque la crema es seguro un producto falso",
     "Porque solo quedan unas pocas cremas a la venta",
     "Porque su fama no le hace experto en cremas"
    ],
    "a": 3,
    "fb": "El testimonio de famosos es una apelación a la autoridad mal usada: ser famoso no te hace experto en todo."
   },
   {
    "q": "En un debate de clase, Leire dice: «Me da igual lo que digan los datos. Yo siento que es verdad y ya está». ¿Qué idea del tema refleja su actitud?",
    "o": [
     "La posverdad",
     "El titular clickbait",
     "El efecto Diderot",
     "La verificación"
    ],
    "a": 0,
    "fb": "En la posverdad, las emociones y las creencias pesan más que los hechos comprobados."
   },
   {
    "q": "Noa necesita un abrigo porque el suyo se le ha quedado pequeño y llega el invierno. Según el tema, ese abrigo es…",
    "o": [
     "Un deseo superfluo, porque es ropa nueva",
     "Un efecto Diderot, porque es una compra",
     "Una necesidad, porque abrigarse hace falta",
     "Un caso de FOMO, porque todos llevan abrigo"
    ],
    "a": 2,
    "fb": "Abrigarse es algo que nos hace falta para vivir bien, así que es una necesidad."
   },
   {
    "q": "Iker ve una noticia en redes que le da muchísima rabia. ¿Qué señal, según el tema, debería hacerle frenar antes de compartirla?",
    "o": [
     "Que la publica un medio serio y conocido",
     "Que la cuentan también otros sitios fiables",
     "Que lleva la fecha de hoy y es muy actual",
     "Que le hace sentir una emoción muy fuerte"
    ],
    "a": 3,
    "fb": "Cuanto más te hace sentir algo un mensaje, más hay que frenar y comprobar: los bulos tocan la emoción."
   },
   {
    "q": "Un anuncio de coches no dice nada del motor ni del precio. Solo enseña a una familia riendo durante un viaje. ¿Qué truco publicitario usa?",
    "o": [
     "La emoción",
     "La escasez y urgencia",
     "El testimonio de famosos",
     "El FOMO"
    ],
    "a": 0,
    "fb": "El anuncio no habla del producto, sino de la familia y la felicidad, para que asocies esa emoción a la marca."
   },
   {
    "q": "Paula ve el titular «¡No creerás lo que ha hecho este futbolista!». Lo abre y solo cuenta que se ha cortado el pelo. ¿Es un bulo?",
    "o": [
     "Sí, porque todo titular exagerado es una noticia falsa",
     "No, es clickbait: exagera, pero lo que cuenta es cierto",
     "Sí, porque habla de un famoso para vender algo",
     "No, es publicidad aspiracional sobre el futbolista"
    ],
    "a": 1,
    "fb": "El clickbait exagera el titular para conseguir clics; el bulo, en cambio, cuenta algo falso como si fuera verdad."
   },
   {
    "q": "¿Qué diferencia hay entre el truco de la emoción y la publicidad aspiracional?",
    "o": [
     "La emoción usa a deportistas famosos; la aspiracional, ofertas de solo hoy",
     "La emoción mete prisa para comprar; la aspiracional habla del precio bajo",
     "La emoción asocia la marca a la amistad; la aspiracional, a ser como quieres",
     "La emoción sale solo en la tele; la aspiracional, solo en las redes sociales"
    ],
    "a": 2,
    "fb": "La emoción une la marca a sentimientos como la amistad o la familia; la aspiracional promete que serás más guapo, popular o feliz."
   },
   {
    "q": "¿En qué se diferencia el efecto Diderot de trucos como la escasez o el testimonio de famosos?",
    "o": [
     "En que no depende del anuncio, sino de nosotros mismos",
     "En que solo afecta a la gente con mucho dinero",
     "En que es un truco que usan los influencers",
     "En que solo pasa con los muebles y la decoración"
    ],
    "a": 0,
    "fb": "El efecto Diderot no lo provoca un anuncio: somos nosotros quienes, tras una compra, deseamos otras a juego."
   },
   {
    "q": "¿Qué diferencia hay entre los pasos «Fuente» y «Contraste» del plan para mirar con lupa?",
    "o": [
     "Fuente mira si es actual; Contraste, quién gana con ello",
     "Fuente mira quién lo publica; Contraste, si lo dicen otros sitios",
     "Fuente mira si emociona; Contraste, si tiene muchos likes",
     "Fuente mira la fecha; Contraste, si la foto es real"
    ],
    "a": 1,
    "fb": "La fuente es quién lo publica; el contraste, comprobar si otros sitios fiables dicen lo mismo."
   },
   {
    "q": "¿Para qué sirve, en la vida real, dudar unos segundos antes de creer o compartir algo?",
    "o": [
     "Para no leer nunca las noticias de internet",
     "Para evitar la mayoría de los engaños",
     "Para compartir solo lo que nos emociona",
     "Para desconfiar de todo lo que nos dicen"
    ],
    "a": 1,
    "fb": "Diez segundos de duda y comprobación evitan la mayoría de los engaños."
   }
  ]
 },
 "ipc-grupo-banco": {
  "name": "¿Somos un grupo o un montón? La cohesión (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "Según el tema, las personas que esperan juntas en la cola del autobús forman…",
    "o": [
     "un grupo, porque comparten el mismo sitio y la misma espera",
     "un grupo poco unido, porque casi no hablan entre ellas",
     "un montón, porque no se conocen ni tienen un objetivo común",
     "un montón, porque son demasiadas personas para ser un grupo"
    ],
    "a": 2,
    "fb": "Es un montón: no se conocen, no comparten un objetivo y, cuando llega el autobús, cada uno sigue a lo suyo."
   },
   {
    "q": "¿Qué es la cohesión de un grupo?",
    "o": [
     "La fuerza que lo mantiene unido: las ganas de estar y hacer cosas juntos",
     "Que todos sus miembros acaben pensando igual sobre cualquier tema",
     "La costumbre de cerrarse a los de fuera para proteger a los de dentro",
     "El conjunto de normas escritas que todos los miembros deben cumplir"
    ],
    "a": 0,
    "fb": "La cohesión son las ganas de estar y trabajar juntos. No significa pensar todos igual ni cerrarse a los de fuera."
   },
   {
    "q": "En el equipo de baloncesto de Yusuf se llevan tan bien que quien opina distinto se calla para no romper el buen rollo. Según el tema, eso es…",
    "o": [
     "cohesión, porque todos quieren estar juntos y sin discutir",
     "solidaridad, porque cada uno cede para ayudar a los demás",
     "inclusión, porque nadie se queda fuera de las decisiones",
     "presión de grupo, pues estar unidos obliga a callar"
    ],
    "a": 3,
    "fb": "Cuando «estar unidos» significa callar lo que piensas, ya no es cohesión: es presión de grupo."
   },
   {
    "q": "Salma llega de Marruecos a mitad de curso. Sus compañeros la invitan a su mesa y a los planes del recreo. ¿Qué dimensión de la cohesión se ve aquí?",
    "o": [
     "Participación y acuerdos por consenso",
     "Nadie se queda fuera (inclusión)",
     "Ganas de trabajar en equipo",
     "Reparto de roles dentro del grupo"
    ],
    "a": 1,
    "fb": "La inclusión es que haya buena relación también con quien viene de otra cultura o tiene alguna discapacidad."
   },
   {
    "q": "Para elegir la excursión, cada alumno escribe sus ideas en silencio. Luego se dicen por turnos, se apuntan en la pizarra y cada uno las puntúa. ¿Qué técnica usan?",
    "o": [
     "Bola de nieve",
     "Grupo nominal",
     "Dos columnas",
     "Opiniones contrapuestas"
    ],
    "a": 1,
    "fb": "En el grupo nominal cada uno escribe sus ideas, se ponen en común por turnos y se puntúan."
   },
   {
    "q": "En el experimento de Asch, ¿quiénes eran los otros siete chicos y chicas de la mesa?",
    "o": [
     "Participantes de verdad que no veían bien las líneas",
     "Psicólogos que apuntaban lo que decía cada persona",
     "Amigos del participante que querían ayudarle a acertar",
     "Actores que se habían puesto de acuerdo para fallar"
    ],
    "a": 3,
    "fb": "Eran actores: en algunas rondas decían todos a propósito la respuesta equivocada, «la A»."
   },
   {
    "q": "En la asamblea de 2.º A siempre deciden Marcos y Leire, porque hablan más alto. Los demás se callan. ¿Qué dimensión de la cohesión falla?",
    "o": [
     "Participación y acuerdos",
     "Solidaridad y convivencia",
     "Ganas de trabajar en equipo",
     "Conocerse y llevarse bien"
    ],
    "a": 0,
    "fb": "En un grupo cohesionado participan todos y se decide por consenso, no solo lo que dicen los que más hablan."
   },
   {
    "q": "¿Qué diferencia hay entre la cohesión y la presión de grupo?",
    "o": [
     "En la cohesión todos piensan igual; en la presión cada uno piensa lo que quiere",
     "La cohesión se da en grupos grandes; la presión solo pasa en grupos pequeños",
     "En la cohesión hay ganas de estar juntos; en la presión callas lo que piensas",
     "Son lo mismo: las dos consisten en que el grupo esté muy unido"
    ],
    "a": 2,
    "fb": "La cohesión son las ganas de estar juntos. Si para estar unidos hay que callar o dejar fuera a alguien, es presión de grupo."
   },
   {
    "q": "En tutoría, Ane primero piensa sola, luego comparte sus ideas con Omar, después se juntan con otra pareja y al final habla toda la clase. ¿Qué técnica usan?",
    "o": [
     "Grupo nominal",
     "Opiniones contrapuestas",
     "Dos columnas",
     "Bola de nieve"
    ],
    "a": 3,
    "fb": "En la bola de nieve se pasa de uno solo a parejas, a grupos de cuatro y a toda la clase, juntando y resumiendo ideas."
   },
   {
    "q": "Según el experimento de Asch, ¿qué es la conformidad?",
    "o": [
     "Estar de acuerdo con el grupo porque lo hemos pensado bien",
     "Cambiar lo que decimos para coincidir con lo que dice el grupo",
     "La fuerza que mantiene unido a un grupo y le da ganas de estar junto",
     "Ver mal las líneas y equivocarse sin darse cuenta"
    ],
    "a": 1,
    "fb": "Conformidad es cambiar lo que decimos para coincidir con el grupo, aunque veamos otra cosa."
   },
   {
    "q": "En 2.º C hay tres cuadrillas. Dentro de cada una se llevan genial, pero entre cuadrillas casi no se hablan. ¿Qué dimensión de la cohesión deben mejorar?",
    "o": [
     "Conocerse y llevarse bien",
     "Participación y acuerdos",
     "Ganas de trabajar en equipo",
     "Nadie se queda fuera (inclusión)"
    ],
    "a": 0,
    "fb": "Esta dimensión pide relaciones positivas entre todos los compañeros, no solo dentro de cada cuadrilla."
   },
   {
    "q": "¿Para qué sirve sobre todo el grupo nominal?",
    "o": [
     "Para que un equipo defienda una postura y otro la contraria",
     "Para juntar ideas pasando de parejas a grupos de cuatro",
     "Para que hablen los tímidos y no manden siempre los mismos",
     "Para apuntar las ventajas y los problemas de cada propuesta"
    ],
    "a": 2,
    "fb": "Como todos escriben y hablan por turnos, en el grupo nominal participan también los tímidos."
   },
   {
    "q": "En Música, todos dicen que la canción está en inglés. Pablo la oye claramente en portugués, pero dice «inglés» para no llevar la contraria. ¿Qué le pasa?",
    "o": [
     "Cohesión: quiere estar a gusto y hacer cosas con su clase",
     "Solidaridad: siente como suyos los problemas de otros",
     "Conformidad: cambia lo que dice para coincidir con el grupo",
     "Inclusión: quiere que nadie quede fuera por ser diferente"
    ],
    "a": 2,
    "fb": "Como en el experimento de Asch, Pablo cambia lo que dice para coincidir con el grupo. Eso es conformidad."
   },
   {
    "q": "La clase duda entre dos propuestas para la fiesta de fin de curso. De cada una escriben sus ventajas y las consecuencias que no quieren. ¿Qué técnica usan?",
    "o": [
     "Dos columnas",
     "Grupo nominal",
     "Bola de nieve",
     "Opiniones contrapuestas"
    ],
    "a": 0,
    "fb": "En las dos columnas se apuntan de cada propuesta sus ventajas y las consecuencias que no queremos."
   },
   {
    "q": "¿Cuál de estas cosas es propia de un grupo y no de un montón de gente?",
    "o": [
     "Estar en el mismo lugar a la misma hora durante un rato",
     "Ser muchas personas de edades y lugares muy distintos",
     "Esperar lo mismo, aunque luego cada uno siga a lo suyo",
     "Tener un objetivo común, normas y un «nosotros»"
    ],
    "a": 3,
    "fb": "Un grupo se conoce, comparte un objetivo, tiene normas y roles, y siente un «nosotros»."
   },
   {
    "q": "En el experimento de Asch, ¿qué hacía que casi todos se atrevieran a decir la respuesta correcta?",
    "o": [
     "Que les dieran más tiempo para mirar bien las tarjetas",
     "Que una sola persona del grupo dijera la respuesta correcta",
     "Que el psicólogo les avisara de que había actores",
     "Que todo el grupo repitiera la misma respuesta equivocada"
    ],
    "a": 1,
    "fb": "Con un solo aliado que decía la verdad, casi todos se atrevían a decirla también."
   },
   {
    "q": "Cuando la profe propone un trabajo en grupo, en la clase de Hugo todos protestan: «Yo solo aprendo más y acabo antes». ¿Qué dimensión de la cohesión les falta?",
    "o": [
     "Participación y acuerdos por consenso",
     "Conocerse y llevarse bien",
     "Solidaridad y convivencia",
     "Ganas de trabajar en equipo"
    ],
    "a": 3,
    "fb": "Esta dimensión consiste en valorar la cooperación y ver que juntos se aprende más que cada uno por su cuenta."
   },
   {
    "q": "Mikel y Aroa hacen juntos una maqueta para Tecnología. Cuando a uno le sale bien su parte, al otro le resulta más fácil la suya. ¿Qué concepto lo explica?",
    "o": [
     "Cooperación",
     "Solidaridad",
     "Conformidad",
     "Inclusión"
    ],
    "a": 0,
    "fb": "Cooperar es trabajar juntos hacia un objetivo común, de modo que el éxito de uno ayuda al de los demás."
   },
   {
    "q": "¿En qué se diferencian la bola de nieve y el grupo nominal?",
    "o": [
     "En la bola de nieve se debate a favor y en contra; en el nominal se escribe en silencio",
     "En la bola de nieve las ideas se van juntando en grupos; en el nominal se puntúan",
     "En la bola de nieve se apuntan ventajas y problemas; en el nominal se vota a mano alzada",
     "En la bola de nieve decide un moderador; en el nominal decide quien aporta más ideas"
    ],
    "a": 1,
    "fb": "La bola de nieve va de uno solo a toda la clase juntando ideas; en el grupo nominal las ideas se dicen por turnos y se puntúan."
   },
   {
    "q": "En el experimento de Asch, ¿cuántas personas se dejaron llevar por el grupo al menos una vez?",
    "o": [
     "Más o menos una de cada diez",
     "Aproximadamente la mitad de ellas",
     "Unas tres de cada cuatro",
     "Todas, sin ninguna excepción"
    ],
    "a": 2,
    "fb": "Unas tres de cada cuatro personas dijeron alguna vez la respuesta del grupo, aunque veían que era otra."
   },
   {
    "q": "Nerea se ha roto un brazo. Sus compañeros le pasan los apuntes, le llevan la mochila y se turnan para ayudarla. ¿Qué dimensión de la cohesión muestran?",
    "o": [
     "Solidaridad y convivencia",
     "Participación y acuerdos",
     "Ganas de trabajar en equipo",
     "Conocerse y llevarse bien"
    ],
    "a": 0,
    "fb": "La solidaridad es ayudar a los demás y sentir como propios sus problemas: hay ayuda mutua."
   },
   {
    "q": "En Valores, un equipo defiende que haya uniforme en el instituto, otro defiende lo contrario y un tercero modera y saca conclusiones. ¿Qué técnica es?",
    "o": [
     "Grupo nominal",
     "Bola de nieve",
     "Dos columnas",
     "Opiniones contrapuestas"
    ],
    "a": 3,
    "fb": "En las opiniones contrapuestas dos equipos defienden posturas opuestas y un tercero modera. Así se aprende a argumentar."
   },
   {
    "q": "¿En qué se diferencian la inclusión y la solidaridad?",
    "o": [
     "La inclusión es ayudar a quien lo pasa mal; la solidaridad, decidir todo por consenso",
     "La inclusión es que nadie quede fuera; la solidaridad, ayudar y sentir como propios sus problemas",
     "La inclusión es trabajar juntos por un objetivo; la solidaridad, llevarse bien con la cuadrilla",
     "La inclusión es que todos piensen igual; la solidaridad, que todos cumplan las mismas normas"
    ],
    "a": 1,
    "fb": "Inclusión: que nadie se quede fuera por sus diferencias. Solidaridad: ayudar a los demás y sentir como propios sus problemas."
   },
   {
    "q": "En un debate, toda la clase apoya una idea que Carla cree equivocada. Según lo que se vio con Asch, si ella se atreve a decir lo que piensa, ¿qué puede pasar?",
    "o": [
     "Que la aparten, porque un grupo unido tiene que pensar igual",
     "Que nada cambie, porque una sola persona no influye en nadie",
     "Que otros que piensan como ella se atrevan también a decirlo",
     "Que tenga razón solo por haber sido la primera en hablar"
    ],
    "a": 2,
    "fb": "Un solo aliado lo cambia todo: si tú dices lo que piensas, ayudas a que otros también se atrevan."
   },
   {
    "q": "¿Por qué es útil conocer el experimento de Asch en la vida real?",
    "o": [
     "Porque recuerda que algo no es verdad solo porque lo digan todos",
     "Porque enseña que la mayoría del grupo suele tener la razón",
     "Porque demuestra que mucha gente tiene problemas para ver bien",
     "Porque explica cómo se toman las decisiones por consenso"
    ],
    "a": 0,
    "fb": "Asch muestra que nos dejamos llevar por el grupo. Saberlo ayuda a recordar que, que todos lo digan, no lo convierte en verdad."
   }
  ]
 },
 "ipc-huella-banco": {
  "name": "Mi huella en el planeta (banco ampliado)",
  "subject": "ipc",
  "items": [
   {
    "q": "¿En qué unidad se mide la huella ecológica?",
    "o": [
     "En toneladas de basura",
     "En hectáreas globales",
     "En kilos de CO₂ al día",
     "En litros de agua gastada"
    ],
    "a": 1,
    "fb": "La huella ecológica mide superficie productiva de tierra y mar, y se expresa en hectáreas globales."
   },
   {
    "q": "¿Quiénes propusieron la idea de huella ecológica en los años noventa?",
    "o": [
     "Greenpeace y otras organizaciones ecologistas",
     "Mathis Wackernagel y William Rees",
     "Varias empresas de energía renovable",
     "Un grupo de científicos de la ONU"
    ],
    "a": 1,
    "fb": "La idea la propusieron en los años noventa los ecólogos Mathis Wackernagel y William Rees."
   },
   {
    "q": "La huella incluye la superficie que hace falta para absorber nuestros residuos. Según el tema, ¿cuál es el residuo principal?",
    "o": [
     "Los envases de plástico",
     "El CO₂ que emitimos",
     "El agua sucia de casa",
     "Los restos de comida"
    ],
    "a": 1,
    "fb": "La huella incluye la superficie necesaria para absorber los residuos, sobre todo el CO₂ que emitimos."
   },
   {
    "q": "¿Qué ocurre cuando la huella de la humanidad es mayor que la biocapacidad?",
    "o": [
     "Sobran recursos que se pueden guardar para después",
     "La Tierra produce más recursos para compensar",
     "Los bosques vuelven a crecer más deprisa",
     "Gastamos más de lo que el planeta repone cada año"
    ],
    "a": 3,
    "fb": "Si la huella supera la biocapacidad, consumimos más de lo que la naturaleza es capaz de regenerar."
   },
   {
    "q": "Según la Global Footprint Network, ¿como cuántos planetas consume hoy la humanidad en conjunto?",
    "o": [
     "Unos cinco planetas",
     "Unos 1,7 planetas",
     "Menos de un planeta",
     "Justo un planeta"
    ],
    "a": 1,
    "fb": "La humanidad consume como si tuviera más de un planeta y medio: unos 1,7."
   },
   {
    "q": "En los últimos años, ¿cuándo suele caer el Día de la Sobrecapacidad de la Tierra?",
    "o": [
     "En primavera, hacia el mes de abril",
     "A finales de diciembre, casi al acabar",
     "A principios de enero, al empezar el año",
     "A finales de julio o principios de agosto"
    ],
    "a": 3,
    "fb": "En los últimos años ha caído a finales de julio o principios de agosto. En primavera llega el de España, no el mundial."
   },
   {
    "q": "¿Qué significa que, tras el Día de la Sobrecapacidad, vivimos «a crédito»?",
    "o": [
     "Que gastamos bosques, peces y suelo sin reponer",
     "Que solo usamos lo que el planeta regenera ese año",
     "Que compramos más cosas con tarjeta que en efectivo",
     "Que los países pobres prestan dinero a los ricos"
    ],
    "a": 0,
    "fb": "Desde ese día gastamos recursos que el planeta no repone y acumulamos CO₂ en la atmósfera."
   },
   {
    "q": "¿Qué es la justicia ambiental?",
    "o": [
     "Repartir con justicia beneficios y daños ambientales",
     "Poner multas a quien tira basura o ensucia la calle",
     "Que cada país decida sus propias leyes sobre la naturaleza",
     "Proteger solo los espacios naturales más bonitos del país"
    ],
    "a": 0,
    "fb": "La justicia ambiental busca que los beneficios y los daños ambientales se repartan con justicia entre personas y países."
   },
   {
    "q": "Carla quiere que su ropa deje menos huella. ¿Qué hábito le ayuda más?",
    "o": [
     "Comprar ropa nueva cada mes aprovechando las rebajas",
     "Tirar la ropa usada al contenedor de basura general",
     "Comprar menos, reparar y usar ropa de segunda mano",
     "Elegir siempre la prenda con el anuncio más verde"
    ],
    "a": 2,
    "fb": "Comprar menos y mejor, reparar y usar segunda mano reduce la huella; la moda rápida tiene una huella enorme."
   },
   {
    "q": "En casa de Iratxe siempre sobran macarrones y acaban en la basura. ¿Qué le propondrías según el tema?",
    "o": [
     "Cambiar la pasta por más carne en el menú",
     "Comprar platos ultraprocesados, que duran más",
     "Echar los macarrones al contenedor amarillo",
     "No tirar comida y aprovechar las sobras"
    ],
    "a": 3,
    "fb": "Uno de los hábitos para reducir la huella de la comida es no tirar comida."
   },
   {
    "q": "Mateo deja la consola y la tele encendidas toda la noche aunque nadie las usa. ¿Qué hábito le falta?",
    "o": [
     "Reciclar los aparatos viejos",
     "Apagar los aparatos que no se usan",
     "Usar más el transporte público",
     "Comprar producto de temporada"
    ],
    "a": 1,
    "fb": "En energía, uno de los hábitos es apagar lo que no se usa."
   },
   {
    "q": "Nerea ya no compra zumos en brik: bebe agua del grifo y así no genera ese envase. ¿Qué paso de los residuos aplica?",
    "o": [
     "Reparar",
     "Reciclar",
     "Reducir",
     "Reutilizar"
    ],
    "a": 2,
    "fb": "No generar el residuo es reducir, el primer paso y el más importante."
   },
   {
    "q": "Un anuncio de coches muestra bosques y mariposas y dice «conduce en verde», pero sus coches contaminan igual que antes. Eso es…",
    "o": [
     "huella de carbono",
     "justicia ambiental",
     "greenwashing",
     "biocapacidad"
    ],
    "a": 2,
    "fb": "El greenwashing es presentar como ecológico algo que no lo es, pintándose de verde en los anuncios."
   },
   {
    "q": "En clase, Ainhoa pregunta: «¿Quién gana y quién paga con nuestra forma de vivir?». ¿Sobre qué idea está pensando?",
    "o": [
     "La justicia ambiental",
     "El greenwashing",
     "La biocapacidad",
     "La huella de carbono"
    ],
    "a": 0,
    "fb": "Preguntarse quién gana y quién paga con nuestra forma de vivir es pensar en la justicia ambiental."
   },
   {
    "q": "En el comedor, Lucía elige a menudo legumbres y verduras de la zona y de temporada. ¿Qué parte de su huella reduce?",
    "o": [
     "La de la ropa",
     "La de los aparatos electrónicos",
     "La de la energía de casa",
     "La de la comida"
    ],
    "a": 3,
    "fb": "Comer menos carne y elegir producto local y de temporada reduce la huella de la comida."
   },
   {
    "q": "Samuel dice: «Yo ya reciclo, así que no tengo que cambiar nada más». ¿Qué se le olvida?",
    "o": [
     "Que primero conviene reducir y reutilizar",
     "Que reciclar debe ser lo primero de todo",
     "Que reciclar aumenta la huella ecológica",
     "Que el reciclaje solo sirve para el vidrio"
    ],
    "a": 0,
    "fb": "El orden es reducir, reutilizar y, al final, reciclar. Reciclar es el último paso, no el único."
   },
   {
    "q": "En un debate, Marta dice que para cuidar el planeta basta con que cada persona apague la luz. Según el tema, ¿qué se le olvida?",
    "o": [
     "Que también cuentan las decisiones colectivas",
     "Que solo deben cambiar las empresas",
     "Que los gestos individuales no sirven de nada",
     "Que apagar la luz no ahorra nada de energía"
    ],
    "a": 0,
    "fb": "Los gestos individuales importan, pero también las decisiones colectivas: cómo se produce la energía o cómo se diseñan las ciudades."
   },
   {
    "q": "Leire lee que España llega a su día de sobrecapacidad en primavera, mucho antes que el mundo. ¿Qué indica?",
    "o": [
     "Que en España se recicla más que en otros países",
     "Que España consume más que la media mundial",
     "Que en España la naturaleza se regenera antes",
     "Que la huella de España es menor que la media"
    ],
    "a": 1,
    "fb": "Si España gasta antes lo que el planeta regenera en un año, es porque consume más que la media mundial."
   },
   {
    "q": "Ander se ducha 25 minutos y pone la calefacción al máximo para estar en manga corta. ¿Qué área de su huella debería cuidar?",
    "o": [
     "La ropa y el consumo",
     "La comida",
     "El transporte",
     "La energía y el agua"
    ],
    "a": 3,
    "fb": "Duchas cortas y no abusar de la calefacción son hábitos del apartado de energía y agua."
   },
   {
    "q": "En un pueblo pescan cada año más peces de los que nacen en su río, y cada vez quedan menos. ¿Qué está pasando?",
    "o": [
     "El río gana biocapacidad cada año",
     "Su huella de carbono es muy pequeña",
     "Su consumo supera la biocapacidad del río",
     "Están haciendo greenwashing con la pesca"
    ],
    "a": 2,
    "fb": "Cuando se consume más de lo que la naturaleza regenera, se supera la biocapacidad y el recurso se agota."
   },
   {
    "q": "¿En qué se diferencian la huella ecológica y la biocapacidad?",
    "o": [
     "Son lo mismo, pero la biocapacidad se usa para países",
     "La huella mide el CO₂; la biocapacidad, la basura que hay",
     "La huella es de la naturaleza; la biocapacidad, nuestra",
     "Una mide lo que gastamos; la otra, lo que se repone"
    ],
    "a": 3,
    "fb": "La huella mide lo que consumimos y la biocapacidad lo que la Tierra puede regenerar cada año."
   },
   {
    "q": "¿Qué diferencia hay entre la huella ecológica y la huella de carbono?",
    "o": [
     "La de carbono es solo el CO₂; la ecológica, todo el consumo",
     "La ecológica mide solo la comida; la de carbono, el transporte",
     "La de carbono se mide en planetas; la ecológica, en kilos",
     "Son dos nombres distintos para la misma medida"
    ],
    "a": 0,
    "fb": "La huella de carbono es el CO₂ y otros gases emitidos; es la parte más grande de la huella ecológica, pero no toda."
   },
   {
    "q": "Álex usa tarros vacíos para guardar lápices; Irene echa los suyos al contenedor del vidrio. ¿Qué hace cada uno?",
    "o": [
     "Álex recicla e Irene reutiliza",
     "Álex reduce e Irene reutiliza",
     "Álex reutiliza e Irene recicla",
     "Los dos reducen sus residuos"
    ],
    "a": 2,
    "fb": "Dar otro uso a un objeto es reutilizar; llevarlo al contenedor para fabricar algo nuevo es reciclar."
   },
   {
    "q": "¿Qué relación hay entre la biocapacidad y el Día de la Sobrecapacidad de la Tierra?",
    "o": [
     "Ese día, la biocapacidad llega a su punto máximo",
     "Ese día los bosques empiezan a crecer de nuevo",
     "Ese día, lo gastado en el año iguala la biocapacidad",
     "Ese día se mide la huella de carbono de cada país"
    ],
    "a": 2,
    "fb": "Es la fecha en que ya hemos gastado todo lo que el planeta puede regenerar ese año, es decir, su biocapacidad."
   },
   {
    "q": "¿Para qué te sirve calcular tu propia huella ecológica?",
    "o": [
     "Para ver qué hábitos tuyos pesan más y cambiarlos",
     "Para demostrar que tu huella no importa",
     "Para saber cuántos planetas tiene tu país",
     "Para elegir productos anunciados como verdes"
    ],
    "a": 0,
    "fb": "Calcular tu huella te ayuda a ver qué haces tú (transporte, comida, compras) que más afecta al planeta."
   }
  ]
 }
};
