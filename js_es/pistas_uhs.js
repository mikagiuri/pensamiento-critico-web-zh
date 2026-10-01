// Generado por tools/build_eso.js — solo Pensamiento crítico (2.º ESO).
const PISTAS = [
 {
  "id": "ipc-falacias",
  "subject": "ipc",
  "tema": "Las falacias",
  "unidad": "ipc-falacias",
  "materia": "Pensamiento crítico · 2.º ESO",
  "titulo": "¿Qué es una falacia?",
  "lede": "Aprende a reconocer la trampa. Pide solo las pistas que necesites.",
  "ciclos": [
   {
    "fase": "Fase 1 · Recuperación",
    "etiqueta": "Pregunta inicial",
    "pregunta": "¿Qué es una falacia?",
    "intro": [
     "Intenta explicarlo con tus palabras. No hace falta saberse ningún nombre raro."
    ],
    "pistas": [
     "Una falacia es un tipo de <em>argumento</em>, no una simple mentira.",
     "Tiene algo de truco: a primera vista parece un buen argumento.",
     "Consigue convencer, pero sus razones no sostienen de verdad lo que dice.",
     "Una falacia es un argumento que <strong>parece bueno pero no lo es</strong>: convence sin tener razón."
    ],
    "comprobacion": {
     "pregunta": "¿Cuál de estas frases explica mejor qué es una falacia?",
     "opciones": [
      [
       "Un argumento que parece bueno, pero cuyas razones no prueban lo que dice.",
       true
      ],
      [
       "Cualquier mentira.",
       false,
       "Una mentira es decir algo falso a sabiendas. Una falacia es un fallo al razonar, aunque quien la usa ni siquiera se dé cuenta."
      ],
      [
       "Una opinión con la que no estoy de acuerdo.",
       false,
       "Que no estés de acuerdo no convierte un argumento en falaz: hay que mirar si sus razones sostienen la conclusión."
      ],
      [
       "Un error de ortografía en un texto.",
       false,
       "Las falacias son errores al razonar, no al escribir."
      ]
     ],
     "ok": "Bien. La clave es que <em>parece</em> un buen argumento, pero no lo es.",
     "mal": "Todavía no."
    },
    "rescate": [
     {
      "boton": "Necesito un ejemplo",
      "etiqueta": "Ejemplo",
      "titulo": "Mira esta conversación",
      "definicion": [
       "Ane: «Deberíamos reciclar más en clase: el papel que tiramos se puede aprovechar».",
       "Iker: «¿Tú? Pero si el otro día te vi tirar una lata al suelo. No le hagáis caso»."
      ],
      "parrafos": [
       "Iker consigue que la clase dude de Ane. Pero ¿ha dicho algo contra la idea de reciclar el papel?"
      ],
      "comprobacion": {
       "etiqueta": "Comprobación del ejemplo",
       "pregunta": "¿Qué hace Iker?",
       "opciones": [
        [
         "Ataca a Ane en lugar de responder a su argumento.",
         true
        ],
        [
         "Demuestra que reciclar papel no sirve.",
         false,
         "No dice nada sobre el papel: solo habla de lo que hizo Ane."
        ],
        [
         "Da una razón mejor que la de Ane.",
         false,
         "Lo que Ane hiciera con una lata no dice nada sobre si conviene reciclar papel."
        ],
        [
         "Nada raro: es un buen argumento.",
         false,
         "Convence, pero no responde a lo que Ane propone: ahí está la trampa."
        ]
       ],
       "ok": "Correcto. Su respuesta parece un argumento, pero no toca la idea de Ane: es una falacia.",
       "mal": "Vuelve a leer la conversación.",
       "intentos": 2
      }
     },
     {
      "etiqueta": "Definición y explicación",
      "titulo": "Falacia",
      "definicion": [
       "Una <strong>falacia</strong> es un argumento que parece bueno pero no lo es: convence sin tener razón.",
       "No es lo mismo que una mentira: puedes decir cosas verdaderas y razonar mal, o usar una falacia sin darte cuenta.",
       "Por eso no basta con saberse nombres: hay que aprender a ver dónde está el truco."
      ],
      "comprobacion": {
       "boton": "Comprobar comprensión",
       "etiqueta": "Comprobación final",
       "pregunta": "¿Cuál de estas afirmaciones es verdadera?",
       "opciones": [
        [
         "Una falacia puede convencer aunque sus razones no prueben nada.",
         true
        ],
        [
         "Una falacia siempre dice cosas falsas.",
         false,
         "Puede decir cosas verdaderas: el fallo está en cómo razona."
        ],
        [
         "Las falacias solo las usan quienes quieren engañar.",
         false,
         "También se cuelan sin querer: por eso conviene aprender a detectarlas."
        ],
        [
         "Si un argumento convence, no puede ser una falacia.",
         false,
         "Justo al revés: las falacias son peligrosas porque convencen."
        ]
       ],
       "ok": "Correcto.",
       "mal": "Todavía no."
      }
     }
    ]
   },
   {
    "fase": "Fase 2 · Profundización",
    "etiqueta": "Nueva pregunta",
    "pregunta": "¿Por qué es tramposo atacar a la persona en vez de a su argumento?",
    "intro": [
     "Lo que hizo Iker tiene nombre: <em>ad hominem</em> («contra la persona»). Piensa por qué no sirve como respuesta."
    ],
    "pistas": [
     "Separa dos cosas: <em>quién</em> dice algo y <em>qué</em> dice.",
     "Una idea puede ser buena aunque la diga alguien que no la cumple.",
     "Si alguien critica a la persona, la idea sigue ahí, sin responder.",
     "El ataque personal desvía la atención: la conversación pasa de la idea a la persona, y la idea queda sin discutir."
    ],
    "comprobacion": {
     "pregunta": "¿Cuál de estas respuestas es un ataque a la persona?",
     "opciones": [
      [
       "«No le hagas caso a lo que dice sobre el móvil: es un pesado».",
       true
      ],
      [
       "«Dice que el móvil distrae en clase, pero hay estudios que dicen otra cosa».",
       false,
       "Aquí se responde con una razón sobre el móvil, no contra la persona."
      ],
      [
       "«Puede que tenga razón, pero me gustaría ver datos».",
       false,
       "Pedir pruebas es una forma razonable de responder a una idea."
      ],
      [
       "«No estoy de acuerdo, porque el móvil también sirve para buscar información».",
       false,
       "Es un contraargumento: discute la idea, no a quien la dice."
      ]
     ],
     "ok": "Exacto. «Es un pesado» no dice nada sobre el móvil: solo descalifica a quien habla.",
     "mal": "No exactamente."
    },
    "rescate": [
     {
      "boton": "Mostrar la explicación",
      "etiqueta": "La falacia ad hominem",
      "titulo": "Contra la persona",
      "definicion": [
       "La falacia <strong>ad hominem</strong> consiste en atacar a la persona (cómo es, qué hizo, de dónde viene) en lugar de responder a lo que dice.",
       "Es tramposa porque no toca la idea: una propuesta no es mejor ni peor según quién la diga.",
       "Para responder bien, pregúntate: ¿qué razones da? ¿Son buenas? Eso es lo que hay que discutir."
      ],
      "comprobacion": {
       "boton": "Terminar comprobando",
       "pregunta": "Si quien propone algo no lo cumple, ¿qué podemos decir de su propuesta?",
       "opciones": [
        [
         "Nada todavía: hay que examinar sus razones, no a la persona.",
         true
        ],
        [
         "Que la propuesta es falsa.",
         false,
         "Que alguien no cumpla una idea no la hace falsa."
        ],
        [
         "Que no hay que escucharla.",
         false,
         "Eso es justo la falacia: rechazar la idea por la persona."
        ],
        [
         "Que la propuesta es verdadera.",
         false,
         "Tampoco: la persona no cuenta ni a favor ni en contra."
        ]
       ],
       "ok": "Correcto: la idea se juzga por sus razones.",
       "mal": "Relee la explicación."
      }
     }
    ]
   }
  ],
  "cierre": {
   "titulo": "Ya sabes detectar el truco",
   "parrafos": [
    "Una falacia es un argumento que parece bueno pero no lo es. El ataque a la persona (ad hominem) es de las más frecuentes: cambia de tema y deja la idea sin responder.",
    "Reto: busca hoy un ejemplo real (en redes, en la tele, en una discusión) y explica dónde está la trampa."
   ]
  }
 },
 {
  "id": "ipc-sesgos",
  "subject": "ipc",
  "tema": "Los sesgos",
  "unidad": "ipc-sesgos",
  "materia": "Pensamiento crítico · 2.º ESO",
  "titulo": "¿Qué es el sesgo de confirmación?",
  "lede": "Una trampa que no está fuera, sino dentro de nuestra cabeza. Pide solo las pistas que necesites.",
  "ciclos": [
   {
    "fase": "Fase 1 · Recuperación",
    "etiqueta": "Pregunta inicial",
    "pregunta": "¿Qué es el sesgo de confirmación?",
    "intro": [
     "Intenta explicarlo con tus palabras. Piensa en alguien que está convencido de algo y solo hace caso a lo que le da la razón."
    ],
    "pistas": [
     "Un sesgo es un atajo de la mente que nos hace pensar de forma torcida sin darnos cuenta.",
     "A diferencia de las falacias, que están en los argumentos, los sesgos están <em>dentro</em> de nosotros.",
     "Fíjate en la palabra «confirmación»: ¿qué queremos confirmar?",
     "Es la tendencia a <strong>buscar y creer solo lo que confirma lo que ya pensábamos</strong>, y a no ver lo que nos lleva la contraria."
    ],
    "comprobacion": {
     "pregunta": "¿Cuál de estos casos es un sesgo de confirmación?",
     "opciones": [
      [
       "Creo que mi compañero es antipático y solo me fijo en los gestos que lo confirman.",
       true
      ],
      [
       "Cambio de opinión después de ver datos nuevos.",
       false,
       "Eso es justo lo contrario: dejar que las pruebas cambien lo que piensas."
      ],
      [
       "Pregunto a varias personas antes de decidir.",
       false,
       "Buscar opiniones distintas ayuda a evitar el sesgo."
      ],
      [
       "Me equivoco en una suma por despiste.",
       false,
       "Es un error, pero no tiene que ver con confirmar lo que ya pensabas."
      ]
     ],
     "ok": "Bien. El sesgo filtra lo que vemos para que encaje con lo que ya creíamos.",
     "mal": "Todavía no."
    },
    "rescate": [
     {
      "boton": "Necesito un ejemplo",
      "etiqueta": "Ejemplo",
      "titulo": "Las mates de Leire",
      "definicion": [
       "Leire piensa: «Se me dan fatal las mates».",
       "Recuerda perfectamente el examen que suspendió en octubre.",
       "Pero se olvida de los tres que aprobó después, y de que ayer resolvió sola un problema difícil."
      ],
      "parrafos": [
       "¿Qué está haciendo la mente de Leire con sus recuerdos?"
      ],
      "comprobacion": {
       "etiqueta": "Comprobación del ejemplo",
       "pregunta": "¿Qué le pasa a Leire?",
       "opciones": [
        [
         "Solo recuerda lo que confirma su idea y olvida lo que la contradice.",
         true
        ],
        [
         "Tiene mala memoria para todo.",
         false,
         "Recuerda muy bien el suspenso: su memoria elige qué guardar."
        ],
        [
         "Tiene razón: se le dan fatal las mates.",
         false,
         "Los datos (tres aprobados y un problema difícil resuelto) dicen otra cosa."
        ],
        [
         "Miente a propósito.",
         false,
         "No miente: el sesgo actúa sin que se dé cuenta."
        ]
       ],
       "ok": "Correcto. Su idea previa decide qué recuerda: eso es el sesgo de confirmación.",
       "mal": "Vuelve a leer el caso.",
       "intentos": 2
      }
     },
     {
      "etiqueta": "Definición y explicación",
      "titulo": "Sesgo de confirmación",
      "definicion": [
       "El <strong>sesgo de confirmación</strong> es la tendencia a buscar, recordar y creer solo lo que confirma lo que ya pensábamos.",
       "Lo que nos lleva la contraria no lo vemos, lo olvidamos o lo despreciamos.",
       "No es mentir ni ser tonto: le pasa a todo el mundo. Por eso hay que aprender a vigilarlo."
      ],
      "comprobacion": {
       "boton": "Comprobar comprensión",
       "etiqueta": "Comprobación final",
       "pregunta": "¿Cuál de estas frases sobre el sesgo de confirmación es verdadera?",
       "opciones": [
        [
         "Nos afecta a todos, aunque no nos demos cuenta.",
         true
        ],
        [
         "Solo les pasa a las personas poco inteligentes.",
         false,
         "Le pasa a todo el mundo, también a gente muy lista."
        ],
        [
         "Es lo mismo que mentir.",
         false,
         "Quien miente sabe que dice algo falso; el sesgo actúa sin que lo notemos."
        ],
        [
         "Es una falacia que usamos para convencer a otros.",
         false,
         "Las falacias están en los argumentos; los sesgos, dentro de nuestra cabeza."
        ]
       ],
       "ok": "Correcto.",
       "mal": "Todavía no."
      }
     }
    ]
   },
   {
    "fase": "Fase 2 · Profundización",
    "etiqueta": "Nueva pregunta",
    "pregunta": "¿Qué podemos hacer para no caer en el sesgo de confirmación?",
    "intro": [
     "Si el sesgo está dentro de nosotros, no basta con saber que existe. ¿Qué hábitos pueden ayudarte a vigilarlo?"
    ],
    "pistas": [
     "El sesgo nos hace buscar solo lo que nos da la razón. ¿Qué pasaría si hicieras lo contrario?",
     "Las redes sociales nos enseñan sobre todo lo que ya nos gusta. Piensa en lo que eso hace con nuestras ideas.",
     "Una buena pregunta es: «¿Qué me haría cambiar de opinión?».",
     "Busca a propósito pruebas y opiniones que te lleven la contraria, y escúchalas antes de decidir."
    ],
    "comprobacion": {
     "pregunta": "¿Cuál de estos hábitos ayuda más a evitar el sesgo de confirmación?",
     "opciones": [
      [
       "Buscar a propósito información que contradiga lo que pienso.",
       true
      ],
      [
       "Seguir solo cuentas que piensan como yo.",
       false,
       "Eso alimenta el sesgo: solo verás lo que ya te da la razón."
      ],
      [
       "No cambiar nunca de opinión para ser coherente.",
       false,
       "Ser coherente no es no cambiar nunca: si aparecen buenas razones, cambiar es razonable."
      ],
      [
       "Decidir rápido para no dudar.",
       false,
       "Las prisas favorecen los atajos de la mente, y el sesgo es uno de ellos."
      ]
     ],
     "ok": "Exacto. Buscar lo que te contradice es la mejor vacuna contra el sesgo.",
     "mal": "No exactamente."
    },
    "rescate": [
     {
      "boton": "Mostrar la explicación",
      "etiqueta": "Antídotos",
      "titulo": "Cómo vigilar el sesgo",
      "definicion": [
       "<strong>Busca lo contrario.</strong> Antes de decidir, busca al menos una razón o un dato en contra de lo que piensas.",
       "<strong>Pregúntate qué te haría cambiar de opinión.</strong> Si la respuesta es «nada», cuidado: ya no estás pensando, estás defendiendo.",
       "<strong>Rompe la burbuja.</strong> Las redes te muestran lo que ya te gusta: escucha también a quien piensa distinto."
      ],
      "comprobacion": {
       "boton": "Terminar comprobando",
       "pregunta": "Si nada podría hacerte cambiar de opinión, ¿qué te está pasando?",
       "opciones": [
        [
         "Que probablemente estás defendiendo una idea en lugar de pensarla.",
         true
        ],
        [
         "Que tienes toda la razón.",
         false,
         "No poder imaginar ninguna prueba en contra es una señal de alarma, no de acierto."
        ],
        [
         "Que eres muy coherente.",
         false,
         "La coherencia no consiste en cerrarse a las pruebas."
        ],
        [
         "Nada: es lo normal.",
         false,
         "Es normal, pero es justo lo que hay que vigilar."
        ]
       ],
       "ok": "Correcto: pensar es estar dispuesto a cambiar si hay buenas razones.",
       "mal": "Relee la explicación."
      }
     }
    ]
   }
  ],
  "cierre": {
   "titulo": "Ya sabes vigilar tu mente",
   "parrafos": [
    "El sesgo de confirmación nos hace buscar y recordar solo lo que confirma lo que ya pensábamos. Le pasa a todo el mundo; el antídoto es buscar a propósito lo que nos contradice.",
    "Reto: elige una idea de la que estés muy seguro o segura y busca hoy un buen argumento en contra."
   ]
  }
 },
 {
  "id": "ipc-medios",
  "subject": "ipc",
  "tema": "Mira los medios con lupa",
  "unidad": "ipc-medios",
  "materia": "Pensamiento crítico · 2.º ESO",
  "titulo": "¿Cómo sé si una noticia es un bulo?",
  "lede": "Antes de creer o de reenviar, mira con lupa. Pide solo las pistas que necesites.",
  "ciclos": [
   {
    "fase": "Fase 1 · Recuperación",
    "etiqueta": "Pregunta inicial",
    "pregunta": "¿Qué es un bulo y por qué se difunde tan rápido?",
    "intro": [
     "Piensa en el último mensaje que te llegó con un «¡reenvíalo a todos!». Intenta explicarlo antes de pedir ayuda."
    ],
    "pistas": [
     "Un bulo (o <em>fake news</em>) es una noticia, pero con un problema.",
     "Es falsa, aunque se presenta como si fuera verdadera.",
     "Los bulos suelen tocar la emoción: dan miedo, rabia o risa.",
     "Un bulo es una <strong>noticia falsa que se difunde como verdadera</strong>; corre tan rápido porque nos remueve por dentro y apetece compartirla sin pensar."
    ],
    "comprobacion": {
     "pregunta": "¿Por qué se difunden tan rápido los bulos?",
     "opciones": [
      [
       "Porque tocan la emoción y dan ganas de compartirlos sin comprobarlos.",
       true
      ],
      [
       "Porque siempre los publican los periódicos más serios.",
       false,
       "Los bulos suelen circular por mensajes y redes, muchas veces sin fuente clara."
      ],
      [
       "Porque son más aburridos que las noticias verdaderas.",
       false,
       "Al revés: están pensados para llamar la atención."
      ],
      [
       "Porque la gente comprueba siempre todo antes de reenviar.",
       false,
       "Si lo hiciéramos, los bulos no correrían tanto."
      ]
     ],
     "ok": "Bien. La emoción va más rápido que la comprobación.",
     "mal": "Todavía no."
    },
    "rescate": [
     {
      "boton": "Necesito un ejemplo",
      "etiqueta": "Ejemplo",
      "titulo": "Un mensaje en el grupo de clase",
      "definicion": [
       "«¡¡URGENTE!! Mañana cierran todos los institutos por un virus nuevo. Lo ha dicho un médico amigo de mi tía. ¡¡Reenvíalo a todos!!»",
       "No dice qué médico, ni dónde lo ha publicado ninguna fuente oficial.",
       "Está escrito en mayúsculas, con prisa y con miedo."
      ],
      "parrafos": [
       "¿Qué señales de alarma ves en este mensaje?"
      ],
      "comprobacion": {
       "etiqueta": "Comprobación del ejemplo",
       "pregunta": "¿Cuál es la mejor señal de que puede ser un bulo?",
       "opciones": [
        [
         "No tiene una fuente identificable y busca que lo reenvíes con prisa.",
         true
        ],
        [
         "Habla de institutos.",
         false,
         "El tema no lo convierte en bulo: lo que falla es la falta de fuente."
        ],
        [
         "Lo ha mandado alguien de clase.",
         false,
         "Quien lo reenvía puede ser de confianza y aun así haberse creído un bulo."
        ],
        [
         "Está en castellano.",
         false,
         "El idioma no tiene nada que ver."
        ]
       ],
       "ok": "Correcto: sin fuente, con urgencia y con miedo, mucho cuidado.",
       "mal": "Vuelve a leer el mensaje.",
       "intentos": 2
      }
     },
     {
      "etiqueta": "Definición y explicación",
      "titulo": "Bulo y posverdad",
      "definicion": [
       "Un <strong>bulo</strong> es una noticia falsa que se difunde como verdadera.",
       "Vivimos en la época de la <strong>posverdad</strong>: muchas veces pesan más las emociones y las creencias que los hechos comprobados.",
       "Por eso, la primera pregunta ante cualquier mensaje es: <strong>¿quién lo manda y qué gana con ello?</strong>"
      ],
      "comprobacion": {
       "boton": "Comprobar comprensión",
       "etiqueta": "Comprobación final",
       "pregunta": "¿Qué es la posverdad?",
       "opciones": [
        [
         "Una situación en la que pesan más las emociones y creencias que los hechos comprobados.",
         true
        ],
        [
         "Una noticia que se publica después de un suceso.",
         false,
         "No tiene que ver con el orden en el tiempo."
        ],
        [
         "La verdad comprobada por científicos.",
         false,
         "Es casi lo contrario: los hechos pierden peso frente a las emociones."
        ],
        [
         "Un tipo de red social.",
         false,
         "Es un fenómeno, no una plataforma."
        ]
       ],
       "ok": "Correcto.",
       "mal": "Todavía no."
      }
     }
    ]
   },
   {
    "fase": "Fase 2 · Profundización",
    "etiqueta": "Nueva pregunta",
    "pregunta": "¿Qué debo hacer antes de creer o reenviar una noticia?",
    "intro": [
     "Ya sabes qué es un bulo. Ahora piensa en un plan: ¿qué pasos darías antes de pulsar «reenviar»?"
    ],
    "pistas": [
     "Lo primero es frenar: si un mensaje te da mucha prisa, sospecha.",
     "Mira de dónde viene: ¿quién lo firma? ¿Es una fuente conocida y fiable?",
     "Busca si otras fuentes fiables cuentan lo mismo.",
     "Antes de creer o compartir, <strong>verifica</strong>: comprueba la información en varias fuentes fiables."
    ],
    "comprobacion": {
     "pregunta": "¿Qué significa verificar una información?",
     "opciones": [
      [
       "Comprobarla en varias fuentes fiables antes de creerla.",
       true
      ],
      [
       "Reenviarla a muchas personas para ver qué opinan.",
       false,
       "Así se difunde el bulo: primero se comprueba y luego, si acaso, se comparte."
      ],
      [
       "Creerla si tiene muchos «me gusta».",
       false,
       "La popularidad no prueba que algo sea verdad."
      ],
      [
       "Leer solo el titular.",
       false,
       "El titular puede engañar: hay que mirar la fuente y el contenido."
      ]
     ],
     "ok": "Exacto. Verificar es contrastar con fuentes fiables.",
     "mal": "No exactamente."
    },
    "rescate": [
     {
      "boton": "Mostrar los pasos",
      "etiqueta": "Antes de reenviar",
      "titulo": "Cuatro pasos",
      "definicion": [
       "<strong>1. Frena.</strong> Si te da miedo, rabia o prisa, respira antes de hacer nada.",
       "<strong>2. Mira la fuente.</strong> ¿Quién lo dice? ¿Es un medio o una institución conocida?",
       "<strong>3. Contrasta.</strong> Busca si otras fuentes fiables cuentan lo mismo.",
       "<strong>4. Decide.</strong> Si no puedes comprobarlo, no lo reenvíes."
      ],
      "comprobacion": {
       "boton": "Terminar comprobando",
       "pregunta": "No encuentras ninguna fuente fiable que confirme un mensaje. ¿Qué haces?",
       "opciones": [
        [
         "No lo reenvío.",
         true
        ],
        [
         "Lo reenvío por si acaso es verdad.",
         false,
         "«Por si acaso» es justo como se difunden los bulos."
        ],
        [
         "Lo reenvío añadiendo «no sé si es verdad».",
         false,
         "Aun así lo estás difundiendo."
        ],
        [
         "Me lo creo, pero no se lo digo a nadie.",
         false,
         "Sin fuente fiable, tampoco hay razones para creerlo."
        ]
       ],
       "ok": "Correcto: lo que no se puede comprobar, no se comparte.",
       "mal": "Relee los pasos."
      }
     }
    ]
   }
  ],
  "cierre": {
   "titulo": "Ya miras los medios con lupa",
   "parrafos": [
    "Un bulo es una noticia falsa que se difunde como verdadera, porque toca la emoción. Antes de creer o reenviar: frena, mira la fuente, contrasta y, si no puedes comprobarlo, no lo compartas.",
    "Reto: coge un mensaje o un titular de esta semana y aplícale los cuatro pasos."
   ]
  }
 }
];
