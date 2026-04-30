const workshopData = {
  title: "Workshop Claude Agentes IA Kodigo",
  subtitle: "Claude como orquestador de la agentizacion del trabajo profesional: 4 practicas para aprender a delegar tareas, automatizar flujos y convertir informacion en entregables listos para usar.",
  agenda: [
    { block: "Bloque 1", activity: "Preparar Claude como espacio de trabajo profesional", duration: "35 min" },
    { block: "Bloque 2", activity: "Delegar una rutina semanal a un flujo automatico", duration: "40 min" },
    { block: "Receso", activity: "Pausa para cafe y networking", duration: "15 min" },
    { block: "Bloque 3", activity: "Convertir datos en documentos ejecutivos", duration: "30 min" },
    { block: "Bloque 4", activity: "Integrar fuentes y crear un command center final", duration: "45 min" }
  ],
  resources: [
    {
      file: "ventas_semana.csv",
      usedIn: "Bloques 2 y 3",
      description: "580 transacciones reales de Think Company (semana 21-27 abr 2025).",
      required: true
    },
    {
      file: "plantilla_reporte_think_company.docx",
      usedIn: "Bloques 1 y 3",
      description: "Plantilla oficial de reporte ejecutivo con membrete Think Company.",
      required: true
    },
    {
      file: "glosario_kpis_think_company.csv",
      usedIn: "Bloque 1",
      description: "12 KPIs definidos con formula, meta y umbral de alerta.",
      required: true
    },
    {
      file: "diccionario_datos_think_company.csv",
      usedIn: "Bloques 1 y 2",
      description: "Nombre exacto de columnas, tipos y valores validos.",
      required: false
    },
    {
      file: "benchmarks_sector_consultoria_bi_latam.csv",
      usedIn: "Bloques 1 y 4",
      description: "Comparativos de industria para contextualizar resultados.",
      required: false
    },
    {
      file: "proyectos_activos_q2_2025_think_company.csv",
      usedIn: "Bloque 4",
      description: "Estado actual de proyectos para el command center profesional.",
      required: true
    },
    {
      file: "pipeline_oportunidades_think_company.csv",
      usedIn: "Bloque 4",
      description: "Pipeline comercial para priorizar proximas acciones.",
      required: true
    },
    {
      file: "instruccion_maestra_ejemplo_think_company.md",
      usedIn: "Bloque 1",
      description: "Base recomendada para construir la instruccion maestra de Skill.",
      required: false
    }
  ],
  practices: [
    {
      id: "bloque-1",
      page: "pages/practica-1.html",
      title: "Practica 1 - Prepara tu espacio de trabajo en Claude",
      summary: "Configura Claude como un espacio de trabajo persistente: proyecto, instrucciones, archivos de contexto y pruebas de calibracion para evitar respuestas genericas.",
      duration: "35 min",
      tags: ["Claude", "Projects", "Skills", "Calibracion"],
      objective: "Al finalizar, tendras un proyecto Orquestador IA completamente configurado, con instrucciones claras, archivos de Think Company cargados y pruebas que validan que Claude entiende el trabajo real.",
      instructions: [
        {
          title: "Abre Claude.ai y ubica los elementos clave",
          meta: "5 min",
          summary: "Antes de crear nada, identifica donde estan los controles. Trabajar en un chat suelto es el error mas comun porque no conserva instrucciones ni contexto persistente.",
          items: [
            "Abre claude.ai en Chrome o Edge e inicia sesion.",
            "Ubica la seccion Proyectos en el panel lateral.",
            "Identifica donde se adjuntan archivos, donde queda el historial y donde aparecen integraciones o conectores.",
            "Confirma que entiendes la diferencia entre un chat suelto y un Proyecto."
          ],
          note: "Un Proyecto guarda instrucciones permanentes, archivos de conocimiento e historial de conversaciones. Ese sera el espacio de trabajo profesional de la practica."
        },
        {
          title: "Crea el proyecto Orquestador IA",
          meta: "4 min",
          summary: "El proyecto es el contenedor de todo el taller: instrucciones, archivos y conversaciones.",
          path: ["Claude.ai", "Proyectos", "Nuevo proyecto"],
          items: [
            "Haz clic en el signo + junto a Proyectos o en Nuevo proyecto si aparece en pantalla.",
            "Nombra el proyecto exactamente: Orquestador IA - Tu nombre - Think Company.",
            "Entra al proyecto y trabaja desde ahi durante toda la practica."
          ],
          note: "El nombre del proyecto debe verse en el encabezado del chat antes de ejecutar prompts de validacion."
        },
        {
          title: "Pega la instruccion maestra",
          meta: "8 min",
          summary: "La instruccion define quien es Claude en este contexto: rol, empresa, tono, reglas de respuesta y criterios de calidad.",
          path: ["Proyecto Orquestador IA", "Configuracion", "Instrucciones del proyecto"],
          items: [
            "Busca el acceso a instrucciones: icono de engranaje, texto Agregar instrucciones o icono de lapiz junto al nombre del proyecto.",
            "Pega el prompt Instruccion maestra inicial del proyecto.",
            "Guarda los cambios y espera la confirmacion visual.",
            "Si usas el archivo instruccion_maestra_ejemplo_think_company.md, tomalo como base y personalizalo antes de guardar."
          ],
          note: "La instruccion queda activa para cada conversacion dentro del proyecto, por eso debe ser precisa antes de cargar trabajo real."
        },
        {
          title: "Carga los archivos de conocimiento",
          meta: "6 min",
          summary: "Estos archivos son la memoria factual de Claude. Sin ellos, respondera con generalidades; con ellos, podra citar KPIs, secciones y campos reales.",
          path: ["Proyecto Orquestador IA", "Agregar contenido", "Subir archivos"],
          items: [
            "Carga primero glosario_kpis_think_company.csv.",
            "Carga plantilla_reporte_think_company.docx.",
            "Carga diccionario_datos_think_company.csv si tienes tiempo disponible.",
            "Verifica que cada archivo aparezca listado dentro del proyecto."
          ],
          note: "El archivo de instruccion maestra es apoyo para copiar la configuracion; los archivos obligatorios para calibrar son el glosario y la plantilla."
        },
        {
          title: "Genera el inventario de archivos",
          meta: "4 min",
          summary: "Esta prueba confirma que Claude puede leer el contenido real de los archivos y explicar para que sirve cada uno.",
          path: ["Proyecto Orquestador IA", "Nuevo chat dentro del proyecto", "Prompt 1"],
          items: [
            "Ejecuta el prompt Inventario de archivos cargados.",
            "Revisa si Claude menciona los KPIs especificos del glosario y las secciones de la plantilla.",
            "Si responde de forma vaga, vuelve a cargar los archivos o abre un chat nuevo dentro del proyecto."
          ],
          note: "No ejecutes esta prueba en un chat fuera del proyecto: Claude no tendra acceso al conocimiento cargado."
        },
        {
          title: "Haz la prueba de identidad",
          meta: "3 min",
          summary: "Esta prueba valida que la instruccion maestra fue leida y asimilada.",
          path: ["Proyecto Orquestador IA", "Mismo chat o chat nuevo", "Prompt 2"],
          items: [
            "Ejecuta el prompt Prueba de calibracion de identidad sin agregar contexto adicional.",
            "Comprueba que Claude mencione Think Company, su rol de orquestador o analista BI senior y reglas como trazabilidad y supuestos explicitos.",
            "Si responde como chatbot generico, ajusta la seccion Identidad y rol de las instrucciones."
          ]
        },
        {
          title: "Haz la prueba de tarea real",
          meta: "4 min",
          summary: "Claude debe producir algo util para trabajo real y citar datos concretos de los archivos cargados.",
          path: ["Proyecto Orquestador IA", "Prompt 3", "Estructura de reporte ejecutivo"],
          items: [
            "Pide la estructura del reporte semanal para el comite directivo.",
            "Verifica que cite KPIs por nombre y respete la estructura de la plantilla.",
            "Confirma que separe lo que ya puede hacer con los archivos actuales de lo que requiere datos adicionales."
          ]
        },
        {
          title: "Cierra con una mejora a la instruccion",
          meta: "5 min",
          summary: "Una Skill no se configura una sola vez. Cada prueba revela una mejora concreta.",
          path: ["Configuracion del proyecto", "Instrucciones", "Guardar", "Prompt 4"],
          items: [
            "Identifica una respuesta suboptima de los pasos 6 o 7.",
            "Agrega una regla nueva a las instrucciones para corregirla.",
            "Ejecuta el prompt Validacion de la mejora aplicada para confirmar que Claude detecta el cambio."
          ],
          note: "Ejemplos de reglas: no responder sin citar archivo fuente, separar supuestos de hechos, o pedir datos faltantes antes de calcular."
        }
      ],
      prompts: [
        {
          title: "Instruccion maestra inicial del proyecto",
          files: ["instruccion_maestra_ejemplo_think_company.md", "glosario_kpis_think_company.csv", "plantilla_reporte_think_company.docx"],
          prompt: `## Identidad y rol
Actua como mi orquestador de trabajo profesional para Think Company.
Tu funcion es ayudarme a convertir informacion dispersa en entregables claros para gerencia. Eres un analista BI senior que conoce los archivos, metricas y audiencias de Think Company.

## Contexto de la empresa
Think Company es una consultora de tecnologia y transformacion digital con operaciones en El Salvador, Guatemala, Mexico, Colombia y Costa Rica.
Ofrece 5 lineas de servicio: Consultoria de Datos, Implementacion BI, Analisis Predictivo, Capacitacion Tech y Soporte & Mantenimiento.

## Como debes responder
- Idioma: siempre en espanol.
- Tono: ejecutivo para gerencia, tecnico para el equipo de datos.
- Formato: parrafos concisos con tablas cuando haya datos; sin bullets excesivos.
- Siempre incluye una recomendacion accionable al final de cada analisis.
- Si falta un dato, dilo explicitamente antes de asumir o inventar.

## Reglas de calidad
- Trazabilidad: cuando respondas con datos, cita el archivo o KPI fuente.
- Supuestos explicitos: si asumes algo, declaralo con "Supuesto:" antes de usarlo.
- Claridad sobre completud: es mejor una respuesta clara y parcial que una respuesta larga e imprecisa.
- Prioriza utilidad para decision, claridad ejecutiva y trazabilidad hacia los archivos cargados en este proyecto.

## Tareas frecuentes en este taller
- Analisis de ventas semanales por categoria, canal, region y vendedor.
- Redaccion de resumenes ejecutivos y reportes para el comite directivo.
- Limpieza y validacion de datos en el archivo ventas_semana.csv.
- Generacion de dashboards e insights usando los KPIs del glosario.
- Preparacion de presentaciones de 6 slides para audiencia directiva.`,
          why: "Esta estructura define identidad, contexto, formato, reglas de calidad y tareas frecuentes para que Claude no responda como un chat generico."
        },
        {
          title: "Inventario de archivos cargados",
          files: ["glosario_kpis_think_company.csv", "diccionario_datos_think_company.csv", "plantilla_reporte_think_company.docx"],
          prompt: `Revisa los archivos cargados en este proyecto.
Devuelveme una tabla con estas columnas:

| Archivo | Que contiene | Para que sirve en el taller | Preguntas que puede responder | Limitaciones |

Al final de la tabla, dime:
1. Cual archivo deberias usar primero para preparar un reporte ejecutivo?
2. Hay algun dato que esperarias encontrar y no esta en ningun archivo?
3. Que tipo de analisis NO podrias hacer con solo estos archivos?`,
          why: "La tabla confirma que Claude leyo el contenido real de cada archivo y que puede identificar brechas antes de analizar."
        },
        {
          title: "Prueba de calibracion de identidad",
          files: ["glosario_kpis_think_company.csv", "plantilla_reporte_think_company.docx"],
          prompt: `Sin que yo te de mas informacion, responde estas tres preguntas basandote unicamente en tus instrucciones y los archivos del proyecto:

1. Que rol debes asumir en este proyecto y para que empresa trabajamos?
2. Cuales son las 3 reglas mas importantes que debes cumplir al responder?
3. Que tipos de tareas NO deberias hacer o en que situaciones debes pedir mas informacion antes de responder?

Se concreto. Si algo no esta claro en tus instrucciones, dimelo.`,
          why: "Claude debe mencionar Think Company, su rol de orquestador o analista BI senior, reglas de calidad y situaciones donde debe pedir mas informacion."
        },
        {
          title: "Prueba de tarea real - estructura de reporte ejecutivo",
          files: ["glosario_kpis_think_company.csv", "plantilla_reporte_think_company.docx"],
          prompt: `Necesito preparar el reporte semanal para el comite directivo de Think Company. Con base en el glosario de KPIs y la plantilla de reporte cargados en este proyecto, dame lo siguiente:

1. Estructura propuesta del reporte con secciones y subsecciones.
   - Usa como base las secciones de la plantilla de reporte.
   - Para cada seccion indica: que datos van, KPIs involucrados citando su nombre exacto del glosario y tono recomendado.

2. Orden de prioridad de las secciones para audiencia directiva.
   - Explica brevemente por que ese orden.

3. Lista de datos que necesito recopilar antes de redactar.
   - Que columnas del CSV de ventas son mas relevantes.
   - Que KPIs requieren comparacion con semana anterior.

Al final, indica que seccion podria estar lista con los archivos actuales del proyecto y cual requiere datos adicionales.

Supuesto explicito: la semana analizada es la semana 21-27 de abril 2025.`,
          why: "Valida que Claude cite KPIs por nombre, respete la plantilla, use supuestos explicitos y reconozca limites de informacion."
        },
        {
          title: "Validacion de la mejora aplicada",
          files: ["instruccion_maestra_ejemplo_think_company.md"],
          prompt: `Acabo de actualizar tus instrucciones con una regla nueva.
Sin que te la cuente, dime:

1. Ves algun cambio en las instrucciones del proyecto? Si es asi, describelo con tus propias palabras.
2. Como aplicarias esa nueva regla en la siguiente tarea que te pida?

Si no detectas ningun cambio, avisame. Puede ser que el guardado no se haya aplicado correctamente.`,
          why: "Confirma que el cambio en instrucciones fue guardado y que el ciclo configuracion, prueba y mejora queda validado."
        }
      ],
      deliverables: [
        "Proyecto Orquestador IA creado.",
        "Instruccion maestra pegada y guardada.",
        "Glosario de KPIs y plantilla de reporte cargados como conocimiento.",
        "Inventario de archivos generado por Claude.",
        "Prueba de identidad aprobada.",
        "Prueba de tarea real aprobada.",
        "Una regla nueva agregada a las instrucciones y validada con el Prompt 4."
      ],
      resources: [
        "instruccion_maestra_ejemplo_think_company.md",
        "glosario_kpis_think_company.csv",
        "plantilla_reporte_think_company.docx",
        "diccionario_datos_think_company.csv"
      ]
    },
    {
      id: "bloque-2",
      page: "pages/practica-2.html",
      title: "Practica 2 - Automatiza una rutina semanal",
      summary: "Convierte el analisis semanal de ventas en un flujo repetible: leer datos, detectar hallazgos, redactar resumen y preparar una tarea recurrente.",
      duration: "40 min",
      tags: ["Cowork", "Dispatch", "Scheduling"],
      objective: "Al finalizar, tendras una rutina documentada y probada para generar un resumen semanal a partir de ventas_semana.csv, con pasos claros para automatizarla.",
      instructions: [
        "Define la rutina antes de automatizarla. Escribe en una frase el resultado esperado: generar un resumen semanal de ventas con hallazgos, alertas y recomendacion para gerencia.",
        "Prepara la entrada. Usa ventas_semana.csv como archivo principal y diccionario_datos_think_company.csv como apoyo para entender columnas, tipos y valores validos.",
        "Pide a Claude que inspeccione el CSV antes de analizarlo. Debe identificar columnas, registros, posibles campos numericos, fechas y campos que requieren limpieza.",
        "Ejecuta el primer analisis: ventas totales, categorias con mejor desempeno, productos con mayor margen, variaciones relevantes y cualquier alerta que merezca revision.",
        "Pide a Claude que convierta el analisis en resumen ejecutivo. Debe separar hallazgos de recomendacion y no escribir mas de 120 palabras.",
        "Define el flujo automatico como una receta: archivo de entrada, analisis, salida esperada, nombre del archivo y frecuencia. Esto sirve aunque la automatizacion se haga despues.",
        "Configura o simula Scheduling con una frecuencia semanal: lunes 7:00 AM. Si no tienes la herramienta activa, deja escrita la instruccion exacta que usaras.",
        "Valida el resultado preguntando que podria fallar: archivo ausente, columnas cambiadas, datos incompletos o alerta sin contexto. Agrega esas validaciones al flujo."
      ],
      prompts: [
        {
          title: "Inspeccion inicial del archivo",
          files: ["ventas_semana.csv", "diccionario_datos_think_company.csv"],
          prompt: "Lee ventas_semana.csv y usa diccionario_datos_think_company.csv para entender las columnas. Antes de calcular, devuelveme: numero aproximado de filas, columnas importantes, campos de fecha, campos numericos, posibles riesgos de calidad de datos y que metricas conviene calcular."
        },
        {
          title: "Analisis semanal de ventas",
          files: ["ventas_semana.csv", "diccionario_datos_think_company.csv"],
          prompt: "Analiza ventas_semana.csv. Calcula ventas totales, top 3 productos por margen, categorias con mejor y peor desempeno, variaciones relevantes y alertas que gerencia deberia revisar. Presenta los resultados en tabla y luego explica los 3 hallazgos mas importantes."
        },
        {
          title: "Resumen ejecutivo automatizable",
          files: ["ventas_semana.csv"],
          prompt: "Con base en el analisis anterior, redacta un resumen ejecutivo de maximo 120 palabras. Estructura: titular, 2 hallazgos, 1 riesgo y 1 recomendacion concreta. Usa tono claro para gerencia y evita tecnicismos innecesarios."
        },
        {
          title: "Receta para Scheduling",
          files: ["ventas_semana.csv"],
          prompt: "Disena una receta de automatizacion semanal para este flujo. Incluye: archivo de entrada, validaciones previas, pasos del analisis, formato de salida, nombre del archivo final, frecuencia sugerida y mensaje de error si el CSV no tiene las columnas esperadas."
        }
      ],
      deliverables: [
        "Rutina semanal descrita en pasos.",
        "Archivo de ventas inspeccionado.",
        "Analisis semanal generado.",
        "Resumen ejecutivo listo para gerencia.",
        "Receta de automatizacion semanal escrita.",
        "Validaciones de error agregadas al flujo."
      ],
      resources: [
        "ventas_semana.csv",
        "diccionario_datos_think_company.csv"
      ]
    },
    {
      id: "bloque-3",
      page: "pages/practica-3.html",
      title: "Practica 3 - De datos a presentacion ejecutiva",
      summary: "Usa Claude para transformar datos en una hoja resumen, insights ejecutivos y un guion de presentacion de 6 slides.",
      duration: "30 min",
      tags: ["Excel", "PowerPoint", "Insights"],
      objective: "Al finalizar, tendras una ruta clara para pasar de una tabla a una presentacion ejecutiva: limpieza basica, KPIs, insights y slides.",
      instructions: [
        "Abre ventas_semana.csv en Excel o en la herramienta que usaras para revisar la tabla. Confirma que las columnas se leen correctamente y que no hay caracteres raros.",
        "Carga o referencia plantilla_reporte_think_company.docx para que Claude entienda el tono visual y ejecutivo esperado en el entregable.",
        "Pide una revision de calidad de datos: vacios, duplicados, outliers, columnas calculables y campos que no deberian usarse sin validacion.",
        "Solicita una hoja resumen llamada KPIs_Resumen. Debe incluir metricas por categoria o segmento: ventas, margen, variacion, alerta y recomendacion.",
        "Convierte la hoja resumen en insights. Cada insight debe tener cuatro partes: hallazgo, evidencia, impacto y accion recomendada.",
        "Pide un esquema de deck de 6 slides. Cada slide debe tener titulo accionable, mensaje principal, datos que lo sostienen y visual sugerido.",
        "Refina dos slides con prompts especificos: uno para simplificar texto y otro para hacer mas clara la decision esperada.",
        "Cierra verificando consistencia: los slides deben mencionar datos que existan en el analisis, no conclusiones inventadas."
      ],
      prompts: [
        {
          title: "Revision de calidad de datos",
          files: ["ventas_semana.csv", "diccionario_datos_think_company.csv"],
          prompt: "Analiza ventas_semana.csv como si fueras a preparar un reporte ejecutivo. Usa el diccionario de datos para validar significado de columnas. Indica vacios, duplicados, outliers, columnas que conviene calcular y campos que necesitan revision antes de presentar."
        },
        {
          title: "Crear hoja KPIs_Resumen",
          files: ["ventas_semana.csv", "glosario_kpis_think_company.csv"],
          prompt: "Con base en ventas_semana.csv y el glosario de KPIs, define una hoja llamada KPIs_Resumen. Especifica columnas, formulas sugeridas, agrupaciones por categoria y criterios de alerta. Presenta el resultado como tabla lista para replicar en Excel."
        },
        {
          title: "Redactar insights ejecutivos",
          files: ["ventas_semana.csv", "glosario_kpis_think_company.csv"],
          prompt: "A partir de KPIs_Resumen, redacta 4 insights ejecutivos. Usa este formato para cada uno: hallazgo, evidencia numerica, impacto en negocio y accion recomendada. Ordenalos por prioridad para gerencia."
        },
        {
          title: "Guion de presentacion",
          files: ["plantilla_reporte_think_company.docx", "ventas_semana.csv"],
          prompt: "Crea un guion de presentacion de 6 slides para comite directivo. Para cada slide incluye: titulo accionable, mensaje principal, datos que lo respaldan, visual sugerido y nota del presentador. Usa el tono de la plantilla de reporte."
        },
        {
          title: "Refinamiento de slide",
          files: ["plantilla_reporte_think_company.docx"],
          prompt: "Toma el slide mas cargado de texto y simplificalo. Quiero: un titulo mas directo, maximo 3 bullets, una recomendacion visible y una nota breve para explicar el contexto oralmente."
        }
      ],
      deliverables: [
        "Revision de calidad de datos documentada.",
        "Estructura de hoja KPIs_Resumen definida.",
        "Cuatro insights ejecutivos redactados.",
        "Guion de presentacion de 6 slides.",
        "Dos refinamientos aplicados a slides.",
        "Checklist de consistencia entre datos e historia."
      ],
      resources: [
        "ventas_semana.csv",
        "diccionario_datos_think_company.csv",
        "glosario_kpis_think_company.csv",
        "plantilla_reporte_think_company.docx"
      ]
    },
    {
      id: "bloque-4",
      page: "pages/practica-4.html",
      title: "Practica 4 - Crea un command center profesional",
      summary: "Integra archivos de proyectos, ventas, benchmarks y pipeline para generar un artefacto HTML con metricas, alertas y proximas acciones.",
      duration: "45 min",
      tags: ["MCP", "Artefacto HTML", "Dashboard"],
      objective: "Al finalizar, tendras un command center simple y funcional que consolida informacion de varias fuentes y propone acciones para decision.",
      instructions: [
        "Define el objetivo del command center: mostrar en una sola vista el estado del negocio, proyectos activos, alertas y proximas acciones.",
        "Identifica fuentes. Usa proyectos_activos_q2_2025_think_company.csv para estado operativo, pipeline_oportunidades_think_company.csv para oportunidades, ventas_semana.csv para desempeno y benchmarks_sector_consultoria_bi_latam.csv para contexto externo.",
        "Si tienes integraciones MCP disponibles, conecta Google Drive, Notion o Microsoft 365. Si no, trabaja con los archivos locales del taller como simulacion de fuentes conectadas.",
        "Pide a Claude un inventario de fuentes: que contiene cada archivo, campo clave, posible relacion con otros archivos y seccion del dashboard donde deberia aparecer.",
        "Solicita una estructura de datos consolidada antes del HTML. Debe incluir metricas, proyectos, alertas, pipeline y acciones recomendadas.",
        "Pide el artefacto HTML de un solo archivo. Debe funcionar offline e incluir tarjetas KPI, tabla filtrable, alertas por prioridad y bloque de proximas acciones.",
        "Itera el primer resultado con mejoras concretas: colores de alerta, orden por prioridad, boton imprimir, titulos mas claros y texto mas corto.",
        "Haz una validacion final: abre el HTML, revisa si carga sin internet, confirma que los datos son legibles y prepara una explicacion de 2 minutos."
      ],
      prompts: [
        {
          title: "Inventario de fuentes para el command center",
          files: ["proyectos_activos_q2_2025_think_company.csv", "pipeline_oportunidades_think_company.csv", "ventas_semana.csv", "benchmarks_sector_consultoria_bi_latam.csv"],
          prompt: "Revisa estos archivos y crea un inventario de fuentes. Para cada archivo indica: que contiene, campos clave, posibles relaciones con otros archivos, seccion recomendada del command center y riesgos de interpretacion."
        },
        {
          title: "Modelo consolidado de informacion",
          files: ["proyectos_activos_q2_2025_think_company.csv", "pipeline_oportunidades_think_company.csv", "ventas_semana.csv", "benchmarks_sector_consultoria_bi_latam.csv"],
          prompt: "Consolida la informacion en una estructura para command center con 4 secciones: metricas principales, proyectos activos, alertas y proximas acciones. Para cada item incluye prioridad alta/media/baja, dato que lo respalda y accion sugerida."
        },
        {
          title: "Generar artefacto HTML",
          files: ["proyectos_activos_q2_2025_think_company.csv", "pipeline_oportunidades_think_company.csv", "ventas_semana.csv"],
          prompt: "Genera un artefacto HTML interactivo de un solo archivo, sin dependencias externas. Debe incluir tarjetas KPI, tabla filtrable de proyectos, alertas por prioridad, proximas acciones y boton imprimir. Usa estilos sobrios y que funcione offline."
        },
        {
          title: "Iteracion visual y de usabilidad",
          files: ["benchmarks_sector_consultoria_bi_latam.csv"],
          prompt: "Mejora el artefacto HTML anterior. Ajusta titulos para que sean mas claros, agrega colores de alerta consistentes, ordena acciones por prioridad, mejora lectura en movil y agrega una nota de contexto usando benchmarks del sector."
        },
        {
          title: "Guion de presentacion final",
          files: ["proyectos_activos_q2_2025_think_company.csv", "pipeline_oportunidades_think_company.csv"],
          prompt: "Prepara un guion de 2 minutos para presentar el command center. Estructura: problema que resuelve, fuentes usadas, 3 hallazgos principales, 2 acciones recomendadas y siguiente paso."
        }
      ],
      deliverables: [
        "Inventario de fuentes generado.",
        "Modelo consolidado de informacion definido.",
        "Artefacto HTML creado.",
        "Mejoras visuales y de usabilidad aplicadas.",
        "Validacion offline realizada.",
        "Guion de presentacion final preparado."
      ],
      resources: [
        "proyectos_activos_q2_2025_think_company.csv",
        "pipeline_oportunidades_think_company.csv",
        "benchmarks_sector_consultoria_bi_latam.csv",
        "ventas_semana.csv"
      ]
    }
  ],
  promptLibrary: [
    {
      title: "Instruccion maestra",
      prompt: "Actua como mi orquestador de trabajo profesional. Usa contexto, archivos cargados y reglas de calidad antes de responder."
    },
    {
      title: "Analisis de datos",
      prompt: "Lee el archivo, valida columnas, calcula metricas y separa hallazgos, riesgos y recomendaciones."
    },
    {
      title: "Narrativa ejecutiva",
      prompt: "Convierte el analisis en un resumen ejecutivo con titular, evidencia, impacto y accion recomendada."
    },
    {
      title: "Presentacion",
      prompt: "Crea un guion de slides con titulo accionable, mensaje principal, dato de soporte y nota del presentador."
    },
    {
      title: "Artefacto HTML",
      prompt: "Genera un HTML offline con metricas, tabla, alertas, proximas acciones y estilos claros."
    }
  ]
};
