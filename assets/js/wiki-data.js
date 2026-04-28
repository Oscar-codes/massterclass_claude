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
      summary: "Configura un proyecto en Claude con instrucciones, archivos base y pruebas de calibracion para que responda como un asistente profesional.",
      duration: "35 min",
      tags: ["Claude", "Projects", "Instrucciones"],
      objective: "Al finalizar, tendras un proyecto Orquestador IA con instrucciones claras, archivos cargados y pruebas que validan si Claude entiende el contexto del trabajo.",
      instructions: [
        "Abre claude.ai e inicia sesion. Antes de escribir prompts, ubica donde estan Proyectos, adjuntos, historial e integraciones. Esto evita trabajar en un chat suelto sin memoria ni contexto.",
        "Crea un proyecto con este nombre: Orquestador IA - Tu nombre - Think Company. Usa el proyecto para centralizar instrucciones, documentos y conversaciones del taller.",
        "Abre las instrucciones del proyecto y pega una primera version de instruccion maestra. Debe incluir rol, contexto de empresa, tipo de tareas, formato esperado y reglas de calidad.",
        "Carga como conocimiento los archivos glosario_kpis_think_company.csv, diccionario_datos_think_company.csv y plantilla_reporte_think_company.docx. Si tienes poco tiempo, carga primero el glosario y la plantilla.",
        "Pide a Claude que lea los archivos y te devuelva un inventario breve: que contiene cada archivo, para que sirve y que preguntas puede responder con ese material.",
        "Ejecuta una prueba de identidad: pregunta que sabe del proyecto, que rol debe asumir y que limites debe respetar. Ajusta instrucciones si responde de forma generica.",
        "Ejecuta una prueba de tarea real: pide una estructura para reporte semanal usando KPIs del glosario. Verifica que cite campos o conceptos del archivo cargado.",
        "Cierra la practica con una mejora concreta: agrega una regla nueva a las instrucciones del proyecto segun lo que fallo o falto en las pruebas."
      ],
      prompts: [
        {
          title: "Instruccion maestra inicial del proyecto",
          files: ["instruccion_maestra_ejemplo_think_company.md", "glosario_kpis_think_company.csv", "plantilla_reporte_think_company.docx"],
          prompt: "Actua como mi orquestador de trabajo profesional para Think Company. Tu funcion es ayudarme a convertir informacion dispersa en entregables claros para gerencia. Usa los archivos cargados como contexto base. Responde en espanol, con estructura ejecutiva, pasos accionables y supuestos explicitos. Si falta un dato, dilo antes de inventarlo. Prioriza: claridad, utilidad para decision y trazabilidad hacia los archivos cargados."
        },
        {
          title: "Inventario de archivos cargados",
          files: ["glosario_kpis_think_company.csv", "diccionario_datos_think_company.csv", "plantilla_reporte_think_company.docx"],
          prompt: "Revisa los archivos cargados en este proyecto. Devuelveme una tabla con estas columnas: archivo, que contiene, para que sirve en el taller, preguntas que puede responder y limitaciones. Al final dime cual archivo deberia usar primero para preparar un reporte ejecutivo."
        },
        {
          title: "Prueba de calibracion del asistente",
          files: ["glosario_kpis_think_company.csv", "plantilla_reporte_think_company.docx"],
          prompt: "Necesito preparar un reporte semanal para gerencia. Con base en el glosario de KPIs y la plantilla de reporte, propon una estructura de reporte con secciones, objetivo de cada seccion, datos necesarios y una recomendacion de tono para audiencia ejecutiva."
        }
      ],
      deliverables: [
        "Proyecto Orquestador IA creado.",
        "Instrucciones del proyecto escritas y guardadas.",
        "Archivos base cargados como conocimiento.",
        "Inventario de archivos generado por Claude.",
        "Tres pruebas de calibracion realizadas.",
        "Una mejora aplicada a la instruccion maestra."
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
