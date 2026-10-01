// Generado por tools/build_eso.js — solo Pensamiento crítico (2.º ESO).
const DILEMAS_INTRO = {
 "tecno": {
  "nombre": "Tecnoéticos",
  "titulo": "La tecnología no es neutral",
  "texto": "Detrás de cada avance hay decisiones éticas escondidas. Las herramientas cambian el mundo según cómo las usamos. Cuatro dimensiones, cuatro situaciones reales y cuatro decisiones sin vuelta atrás.",
  "cierre": "La tecnología diseña nuestro mundo, pero son los valores los que guían la tecnología. Si renunciamos a nuestra responsabilidad ética, se impondrán los valores de los algoritmos, las máquinas y las empresas. El futuro no solo se inventa: el futuro se elige."
 },
 "clasicos": {
  "nombre": "Clásicos",
  "titulo": "Dilemas clásicos",
  "texto": "Dos dilemas famosos que se discuten en clases de ética de todo el mundo. Aquí no se trata de acertar: fíjate en qué razones te convencen y en cuándo cambias de opinión.",
  "cierre": "Kohlberg usaba el dilema de Heinz para estudiar cómo razonamos: no importa tanto qué eliges como por qué lo eliges (miedo al castigo, lo que opinan los demás, las normas o principios que valen para todos)."
 },
 "dia": {
  "nombre": "Del día",
  "titulo": "Dilemas del día",
  "texto": "Situaciones de tu edad en las que hay que elegir entre dos cosas que importan. No hay respuesta de libro: lo que cuenta es la razón que das.",
  "cierre": "Un buen dilema no se «resuelve»: se piensa. Fíjate en si has cambiado de opinión y por qué."
 }
};
const DILEMAS = [
 {
  "grupo": "tecno",
  "subject": "ipc",
  "id": "tec-algoritmo",
  "emoji": "📱",
  "etiqueta": "Dimensión digital",
  "titulo": "La sombra del algoritmo",
  "situacion": "Leire tiene 14 años. En su red social le aparece un vídeo que humilla a su amiga Amaia. El algoritmo empuja este tipo de vídeos porque consiguen muchísimas visualizaciones, y cada vez más gente lo comparte y lo comenta.",
  "a": "Compartir el vídeo y conseguir muchas visualizaciones y «me gusta».",
  "b": "Denunciar el vídeo a la plataforma y ayudar a Amaia, aunque pierda seguidores.",
  "enjuego": "Amistad y dignidad frente a popularidad. Y una pregunta de fondo: ¿quién decide lo que vemos en las redes?",
  "preguntas": [
   "¿Son neutros los algoritmos, o alguien decide cómo van a funcionar?",
   "¿Quién es responsable aquí: quien grabó el vídeo, quien lo comparte o la propia plataforma?",
   "¿Qué derechos y deberes tenemos en los entornos digitales?"
  ],
  "dato": "Los algoritmos nos enseñan lo que más nos engancha, no necesariamente lo que es verdad ni lo que nos conviene. Y los deepfakes (vídeos falsos muy realistas) hacen todavía más difícil distinguir lo real de lo fabricado."
 },
 {
  "grupo": "tecno",
  "subject": "ipc",
  "id": "tec-semilla",
  "emoji": "🌾",
  "etiqueta": "Dimensión económica",
  "titulo": "La semilla perfecta",
  "situacion": "La sequía ha arruinado la cosecha del caserío de la familia de Aitor. Una empresa les ofrece semillas transgénicas que aguantan la sequía. Pero están patentadas: no se pueden volver a plantar al año siguiente, hay que comprarlas cada año.",
  "a": "Aceptar la semilla: más cosecha ya y seguridad económica.",
  "b": "Rechazarla y conservar la independencia del caserío, sin depender de patentes.",
  "enjuego": "Seguridad hoy frente a libertad mañana. Soberanía alimentaria: que una comunidad pueda decidir qué come y cómo lo produce.",
  "preguntas": [
   "¿Es legítimo que una empresa tenga la patente de algo vivo, como una semilla?",
   "¿Cómo afecta esta tecnología a la soberanía alimentaria de la comunidad?"
  ]
 },
 {
  "grupo": "tecno",
  "subject": "ipc",
  "id": "tec-tratamiento",
  "emoji": "🧬",
  "etiqueta": "Dimensión médica",
  "titulo": "Un nuevo tratamiento",
  "situacion": "Jun tiene 15 años y una enfermedad del corazón muy rara. Le ofrecen un tratamiento experimental con CRISPR (edición genética) que podría arreglar la enfermedad directamente en sus genes. Pero nadie sabe qué consecuencias tendrá a largo plazo.",
  "a": "Probar el tratamiento nuevo, aunque sea arriesgado.",
  "b": "Elegir el tratamiento de siempre, más seguro pero que no cura.",
  "enjuego": "El derecho a decidir sobre el propio cuerpo, la prudencia ante lo desconocido y la esperanza de curarse.",
  "preguntas": [
   "¿Quién debe tomar la decisión final: los médicos, los padres o Jun, que tiene 15 años?",
   "¿Es aceptable un riesgo grande si hay una posibilidad de curarse?"
  ]
 },
 {
  "grupo": "tecno",
  "subject": "ipc",
  "id": "tec-mar",
  "emoji": "🌊",
  "etiqueta": "Dimensión ecológica",
  "titulo": "Limpiar el mar",
  "situacion": "Una empresa quiere instalar máquinas gigantes para recoger el plástico del mar frente a un pueblo de la costa. Los biólogos avisan: las máquinas también atraparán plancton y peces pequeños, la base de la cadena alimentaria, y dañarán el ecosistema.",
  "a": "Instalar las máquinas y quitar el plástico rápido.",
  "b": "No instalarlas y reducir el uso de plástico, con resultados más lentos.",
  "enjuego": "Arreglar un daño con tecnología o evitar crearlo. Resultados rápidos frente a soluciones de fondo.",
  "preguntas": [
   "¿Qué es mejor: arreglar el problema con tecnología después de crearlo, o evitar crearlo?",
   "¿Puede la tecnología reparar de verdad el daño que le hacemos a la naturaleza?"
  ]
 },
 {
  "grupo": "clasicos",
  "subject": "ipc",
  "id": "cla-heinz",
  "emoji": "💊",
  "etiqueta": "Ley, vida y justicia",
  "titulo": "El dilema de Heinz",
  "situacion": "La mujer de Heinz se está muriendo de un cáncer raro. Un farmacéutico de su ciudad ha descubierto un medicamento que podría salvarla, pero cobra 5.000 euros por una dosis, muchísimo más de lo que le cuesta fabricarla. Heinz pide dinero a familiares y amigos y solo reúne la mitad. Le suplica que se lo venda más barato o que le deje pagar más adelante. El farmacéutico se niega: lo ha descubierto él y quiere ganar dinero.",
  "a": "Heinz entra de noche en la farmacia y roba el medicamento.",
  "b": "Heinz no lo roba: sigue buscando dinero y respeta la ley.",
  "enjuego": "La vida de una persona frente a la ley y la propiedad. ¿Es justo el precio? ¿Puede haber leyes que haya que desobedecer?",
  "preguntas": [
   "Robar va contra la ley. ¿Eso convierte a Heinz en una mala persona? ¿Por qué?",
   "¿Tiene alguna culpa el farmacéutico? ¿Debería existir una ley que le obligara a bajar el precio?",
   "¿Por qué, en general, conviene cumplir las leyes? ¿Hay excepciones?"
  ],
  "ysi": "¿Y si Heinz no quisiera a su mujer? ¿Y si la enferma fuera una desconocida? ¿Y si fuera su perro? ¿Cambia tu respuesta en algún caso?",
  "dato": "El psicólogo Lawrence Kohlberg planteó este dilema a cientos de personas. No le interesaba si decían «sí» o «no», sino sus razones: así describió las etapas del desarrollo moral, desde «para que no me castiguen» hasta «por principios que valen para todos»."
 },
 {
  "grupo": "clasicos",
  "subject": "ipc",
  "id": "cla-confederacion",
  "emoji": "🛸",
  "etiqueta": "Mayoría y minoría",
  "titulo": "La Confederación Galáctica",
  "situacion": "Llega a la Tierra una delegación de la Confederación Galáctica: «En todos los planetas que controlamos, la gente es completamente feliz. Podemos hacer lo mismo con la humanidad: felicidad para siempre». «¿A cambio de qué?», preguntan los humanos. «Muy poco: un niño o una niña de cada país, al que torturaremos el resto de su vida. Un precio pequeño por la felicidad eterna de todos, ¿no?»",
  "a": "Aceptar el trato: la felicidad de miles de millones compensa el sufrimiento de unos pocos.",
  "b": "Rechazar el trato: nadie puede ser sacrificado, aunque sea por la felicidad de todos.",
  "enjuego": "La mayor felicidad para el mayor número (utilitarismo) frente a los derechos de cada persona, que no se pueden cambiar por nada (dignidad).",
  "preguntas": [
   "¿Qué razones darías para rechazar la propuesta?",
   "¿Es siempre mejor «la mayor felicidad para el mayor número», aunque una minoría sufra?",
   "¿Están los derechos de la mayoría por encima de los de las minorías?",
   "¿Estarías dispuesto o dispuesta a sacrificarte tú por la felicidad de toda la humanidad?"
  ],
  "ysi": "¿Y si os aseguran que, además, olvidaréis para siempre a esos niños? ¿Y si en vez de niños fueran personas a punto de morir, o criminales? ¿Aceptarías entonces?",
  "dato": "Es una versión del famoso relato de Ursula K. Le Guin «Los que se marchan de Omelas» (1973): una ciudad feliz cuya felicidad depende del sufrimiento de un solo niño."
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-1",
  "emoji": "👥",
  "etiqueta": "Justicia y lealtad",
  "titulo": "El trabajo en grupo injusto",
  "situacion": "En 2.º B han mandado un trabajo en grupo sobre la historia del barrio. Naia, Ander y Malik forman equipo. Naia y Malik se han quedado dos tardes en la biblioteca de Bidebarrieta buscando fotos y escribiendo el texto. Ander solo ha escrito el título y se ha pasado las tardes con el móvil. El profesor va a poner la misma nota a los tres. Ander es amigo de Naia desde Primaria. Naia no sabe si contarle al profesor lo que ha pasado o callarse para no tener problemas con Ander.",
  "a": "Contárselo al profesor antes de que ponga la nota.",
  "b": "Callarse y aceptar la misma nota para los tres.",
  "otra": "Hablar primero con Ander y darle la oportunidad de hacer una parte del trabajo (por ejemplo, la exposición oral).",
  "enjuego": "Justicia (que cada uno reciba lo que merece) frente a lealtad a un amigo. También la honestidad: callar es una forma de dejar que el profesor crea algo falso.",
  "preguntas": [
   "¿Es injusto que Ander reciba la misma nota? ¿Para quién es injusto: para Naia, para Malik, para el resto de la clase?",
   "¿Contar lo que ha pasado es «chivarse»? ¿Qué diferencia hay entre chivarse e informar?"
  ],
  "ysi": "¿Y si Ander no ha trabajado porque su padre está en el hospital y no se lo ha contado a nadie? ¿Cambia tu respuesta?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-2",
  "emoji": "👛",
  "etiqueta": "Honestidad",
  "titulo": "La cartera del parque",
  "situacion": "Jon vuelve del entrenamiento de fútbol por el parque de Doña Casilda. En un banco ve una cartera. Dentro hay 60 euros, una tarjeta del banco y el DNI de un hombre que no conoce. No hay nadie cerca y nadie le ha visto cogerla. Jon lleva semanas ahorrando para unos auriculares que cuestan justo 60 euros. Piensa: «Si no la cojo yo, la cogerá otro». Pero también se imagina al hombre del DNI buscándola ahora mismo por el parque.",
  "a": "Quedarse el dinero y dejar la cartera en el banco.",
  "b": "Llevar la cartera entera, con el dinero, a la policía municipal o a una oficina de objetos perdidos.",
  "otra": "Buscar al dueño por el nombre del DNI, con ayuda de un adulto, y devolvérsela en persona.",
  "enjuego": "Honestidad y respeto a lo que es de otros. ¿Es tuyo lo que encuentras?",
  "preguntas": [
   "«Si no la cojo yo, la cogerá otro»: ¿es una buena razón? ¿Por qué sí o por qué no?",
   "¿Cambiaría algo si en la cartera hubiera 5 euros? ¿Y 500? ¿Depende la honestidad de la cantidad?"
  ],
  "ysi": "¿Y si en el DNI Jon reconoce a un vecino de su portal que siempre le trata mal?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-3",
  "emoji": "🏺",
  "etiqueta": "Honestidad y responsabilidad",
  "titulo": "El jarrón de la abuela",
  "situacion": "Maialen se ha quedado en casa al cuidado de su hermano Unai, de cinco años. Mientras Unai duerme la siesta, Maialen juega con el balón en el pasillo, aunque su madre se lo tiene prohibido. El balón golpea la estantería y un jarrón que era de su abuela cae y se rompe. Su madre llega en media hora. Maialen tiene miedo: la última vez que rompió algo estuvo un mes sin móvil. Unai está en su habitación y no se ha enterado de nada. El gato también anda por casa. Nadie sabría que ha sido ella.",
  "a": "Decir la verdad y aceptar el castigo.",
  "b": "Decir que ha sido el gato (o Unai) para evitar problemas.",
  "otra": "Contar la verdad, pedir perdón y proponer una forma de reparar el daño (intentar pegar el jarrón, ayudar más en casa).",
  "enjuego": "Honestidad, responsabilidad por lo que hacemos y confianza dentro de la familia.",
  "preguntas": [
   "¿Es igual de grave culpar al gato que culpar a Unai? ¿Por qué?",
   "Si nadie va a descubrirlo nunca, ¿sigue siendo mala la mentira? ¿A quién hace daño?"
  ],
  "ysi": "¿Y si Maialen sabe que su madre ya está muy nerviosa por un problema del trabajo y que la verdad la va a poner peor? ¿Es mejor mentir «para no hacerle daño»?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-4",
  "emoji": "📝",
  "etiqueta": "Honestidad, justicia y amistad",
  "titulo": "El examen de mates",
  "situacion": "Examen de matemáticas, viernes a primera hora. Aitor ha estudiado toda la semana. Su amiga Nora, que se sienta a su lado, no ha estudiado nada porque ha tenido un torneo de baloncesto en Getxo. A mitad del examen, Nora le pasa un papelito: «Pásame el 3, porfa». Si Aitor la ayuda y la profesora lo ve, les quitará el examen a los dos. Si no la ayuda, Nora puede suspender la evaluación y, seguramente, se enfadará con él.",
  "a": "Pasarle la respuesta.",
  "b": "No ayudarla y centrarse en su propio examen.",
  "otra": "No pasarle la respuesta ahora y ofrecerse a estudiar juntos antes de la recuperación.",
  "enjuego": "Honestidad y justicia (una nota debe reflejar lo que sabes), amistad y responsabilidad de cada uno sobre lo suyo.",
  "preguntas": [
   "¿A quién perjudica copiar: a Nora, a Aitor, al resto de la clase, a nadie?",
   "¿Un buen amigo hace siempre lo que le piden? ¿Qué sería «ayudar» de verdad en este caso?"
  ],
  "ysi": "¿Y si no fuera un examen, sino un torneo online por equipos en el que hacer trampas les da la victoria a los dos? ¿Es lo mismo?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-5",
  "emoji": "🏢",
  "etiqueta": "Lealtad y cuidado",
  "titulo": "El secreto de la azotea",
  "situacion": "Sofía y Aroa se lo cuentan todo. Aroa le ha hecho prometer que guardará un secreto: los fines de semana se sube con unos chicos mayores a la azotea de un edificio abandonado del barrio para grabar vídeos y subirlos a redes. Sofía ha visto uno: Aroa camina por el borde, sin barandilla, a seis pisos de altura. Aroa dice que controla, que no pasa nada y que, si Sofía se lo cuenta a alguien, dejará de hablarle para siempre.",
  "a": "Guardar la promesa y no decir nada.",
  "b": "Contárselo a un adulto (su familia, la tutora) aunque Aroa se enfade.",
  "otra": "Hablar primero con Aroa, decirle que tiene miedo y darle un plazo para que lo deje o lo cuente ella misma.",
  "enjuego": "Lealtad y promesas frente a responsabilidad y cuidado de la otra persona. ¿Qué es ser una buena amiga?",
  "preguntas": [
   "¿Todas las promesas hay que cumplirlas? ¿Hay promesas que no deberíamos hacer nunca?",
   "Si Sofía lo cuenta y Aroa deja de hablarle, ¿ha hecho Sofía algo malo?"
  ],
  "ysi": "¿Y si el secreto no fuera la azotea, sino que un desconocido de internet, mayor de edad, le pide fotos a Aroa y le dice que no se lo cuente a nadie? ¿Cambia la urgencia? ¿Cambia la respuesta?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-6",
  "emoji": "🎂",
  "etiqueta": "Inclusión",
  "titulo": "El cumpleaños de Yeray",
  "situacion": "Yeray cumple 14 años y sus padres le dejan invitar a seis personas a una tarde de karts. Ya tiene cinco amigos claros. Para el último sitio duda entre Samuel, su colega del fútbol, y Chen, un compañero que llegó al instituto en enero, se sienta solo en el patio y casi no habla en clase. Yeray sabe que Chen le ha oído hablar de la fiesta. Si no le invita, Chen se quedará otra vez fuera de todo. Pero Samuel es su amigo de verdad y también lo espera.",
  "a": "Invitar a Samuel, su amigo de verdad.",
  "b": "Invitar a Chen para que no se quede fuera.",
  "otra": "Pedir a sus padres un sitio más, o preparar otro plan con Chen otro día.",
  "enjuego": "Inclusión y empatía frente a la libertad de elegir con quién estar. ¿Tenemos obligaciones con quien está solo?",
  "preguntas": [
   "¿Está Yeray obligado a invitar a Chen? ¿Es distinto «estar obligado» de «sería bueno hacerlo»?",
   "¿Por qué crees que Chen está solo? ¿De quién depende que deje de estarlo?"
  ],
  "ysi": "¿Y si Chen no fuera nuevo ni tímido, sino un chico al que nadie invita porque una vez se metió con otro compañero? ¿Merece igual la invitación?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-7",
  "emoji": "🐕",
  "etiqueta": "Responsabilidad",
  "titulo": "La perra Txiki",
  "situacion": "Hace un año Lucía convenció a su familia para adoptar a Txiki, una perra del refugio. Prometió sacarla tres veces al día y cuidarla ella. Al principio lo hacía. Ahora está en el equipo de balonmano, tiene más deberes y por las tardes prefiere quedar con sus amigas. Casi siempre saca a Txiki su padre, que trabaja muchas horas y ya se lo ha reprochado. Lucía piensa que sus padres también quisieron a la perra y que deberían cuidarla entre todos.",
  "a": "Cumplir la promesa y organizarse para cuidar a Txiki aunque tenga menos tiempo libre.",
  "b": "Dejar que sus padres se ocupen de Txiki: la perra es de toda la familia y ella ya no tiene tiempo.",
  "otra": "Negociar un reparto por escrito (quién saca a Txiki cada día, ella incluida) y aceptar renunciar a algo si no lo cumple.",
  "enjuego": "Responsabilidad: una promesa hecha a otras personas y a un ser vivo. ¿Cuándo se puede cambiar un compromiso?",
  "preguntas": [
   "¿Es lo mismo cansarse de un juego que cansarse de cuidar a un animal? ¿Por qué?",
   "Lucía tenía 12 años cuando lo prometió. ¿Vale igual una promesa hecha cuando eras más pequeña?"
  ],
  "ysi": "¿Y si en lugar de una perra fuera su hermano pequeño, al que prometió recoger cada tarde del colegio? ¿Cambia algo?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-8",
  "emoji": "💬",
  "etiqueta": "Justicia y valentía",
  "titulo": "Lo que se dice en el grupo",
  "situacion": "En el grupo de WhatsApp de la clase, tres compañeros empiezan a escribir que Daniel «huele mal» y que «roba en el súper». Markel sabe que lo del robo es mentira: esa tarde Daniel estaba con él en el entrenamiento de atletismo. Pero los tres que escriben son de los más populares de la clase y Markel acaba de conseguir que lo incluyan en sus planes. Si les lleva la contraria, cree que lo dejarán fuera. Daniel no está en el grupo y no sabe nada.",
  "a": "Escribir en el grupo que es mentira y defender a Daniel.",
  "b": "No decir nada para no quedarse fuera.",
  "otra": "No responder en el grupo, pero hablar en privado con los que escriben, o avisar a Daniel.",
  "enjuego": "Justicia y valentía; respeto a quien no está presente. ¿Quien calla es cómplice?",
  "preguntas": [
   "¿Quien lee un rumor y no dice nada tiene alguna responsabilidad?",
   "¿Cambia algo que esto pase en un grupo de WhatsApp y no en el patio? ¿Qué cambia?"
  ],
  "ysi": "¿Y si Markel no supiera si es verdad o mentira? ¿Debería callarse hasta estar seguro, o pedir pruebas a los que lo escriben?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-9",
  "emoji": "🍕",
  "etiqueta": "Justicia (cómo repartir)",
  "titulo": "La última porción",
  "situacion": "Cinco amigos ven el partido del Athletic en casa de Ibai con una pizza. Queda una porción. Ibai ha puesto la pizza, ya ha comido tres trozos y es el que tiene la caja más cerca: podría cogerla sin decir nada. Amaia es la que menos ha comido porque llegó tarde. Julen dice que él tiene más hambre que nadie. Valentina propone echarlo a suertes. Fátima propone partirla en cinco. Se hace un silencio y todos miran la caja.",
  "a": "Que se la coma una sola persona porque tiene más derecho que los demás: Ibai (la ha pagado), Julen (tiene más hambre) o Amaia (es la que menos ha comido). Quien vote A dice quién y por qué.",
  "b": "Partirla en cinco trozos iguales para que todos prueben.",
  "otra": "Echarlo a suertes: nadie tiene más derecho que nadie y la suerte no se enfada con nadie.",
  "enjuego": "Justicia: ¿repartimos a partes iguales, según la necesidad, según el mérito o por sorteo?",
  "preguntas": [
   "¿Qué es más justo: lo mismo para todos, o más para quien más lo necesita o más ha puesto?",
   "Si «solo es una pizza», ¿por qué nos importa tanto? ¿En qué otras cosas usamos estas mismas reglas de reparto?"
  ],
  "ysi": "¿Y si en lugar de una porción de pizza fuera la última plaza en una excursión gratuita del instituto? ¿Servirían las mismas reglas?"
 },
 {
  "grupo": "dia",
  "subject": "ipc",
  "id": "dia-10",
  "emoji": "🤝",
  "etiqueta": "Lealtad y falso dilema",
  "titulo": "Entre dos amigos",
  "situacion": "Enara es amiga de Oihan y de Izaro desde Primaria. El viernes discutieron por un vídeo que Oihan subió a TikTok en el que Izaro sale haciendo el ridículo, y ahora no se hablan. Los dos le han escrito a Enara el mismo mensaje: «Tienes que elegir». Izaro quiere que Enara deje de seguir a Oihan; Oihan dice que Izaro exagera y que Enara lo sabe. Enara los quiere a los dos, y el sábado hay un plan de cumpleaños al que van a ir los dos.",
  "a": "Ponerse de parte de uno de los dos.",
  "b": "Apartarse de los dos hasta que se arreglen.",
  "otra": "Proponerles hablar los tres y buscar una solución (por ejemplo, que Oihan borre el vídeo y pida perdón).",
  "enjuego": "Lealtad y justicia. ¿Se puede ser amigo de los dos? ¿Es lo mismo ser neutral que no importarte el problema?",
  "preguntas": [
   "¿Hay una parte que tiene razón? ¿Importa quién tiene razón para decidir qué hace Enara?",
   "«Tienes que elegir»: ¿es un falso dilema? ¿Hay más de dos opciones?"
  ],
  "ysi": "¿Y si Enara viera claramente que uno de los dos ha hecho algo injusto (por ejemplo, el vídeo humilla a Izaro y ya tiene 2.000 visitas)? ¿Sigue siendo posible no tomar partido?"
 }
];
