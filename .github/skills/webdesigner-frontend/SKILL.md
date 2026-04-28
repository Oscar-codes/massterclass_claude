---
name: webdesigner-frontend
description: 'Experto en web desarrollo frontend moderno y dinamico. Usar cuando se pida crear/redisenar UI (webdesign, webdesigner, webdesingner), frotend/frontend con html, css, bootstrap, tailwind/taildwind, sass/scss, componentes y animaciones.'
argument-hint: 'Describe objetivo, publico, paginas, stack preferido y nivel de animacion'
user-invocable: true
disable-model-invocation: false
---
# WebDesigner Frontend

## Resultado
Construir interfaces web modernas, dinamicas y responsivas con enfoque en conversion, usabilidad, accesibilidad y rendimiento.

## Cuando usar
- Crear una landing page, home, dashboard o pagina de producto.
- Redisenar una interfaz existente que se ve generica o desordenada.
- Implementar componentes UI reutilizables.
- Agregar animaciones y microinteracciones sin afectar performance.
- Mejorar responsive y accesibilidad.

## Flujo de trabajo
1. Alinear objetivo y contexto
- Definir objetivo principal (conversion, registro, venta, informacion).
- Identificar publico y tono visual.
- Listar secciones/paginas y prioridad de contenido.

2. Elegir stack visual y tecnico
- Si el proyecto ya usa Bootstrap: continuar con Bootstrap y personalizar tema.
- Si el proyecto ya usa Tailwind: continuar con Tailwind y design tokens.
- Si no hay framework:
- Usar Tailwind para velocidad y consistencia en sistemas nuevos.
- Usar Bootstrap para equipos que priorizan componentes listos.
- Usar Sass/SCSS para arquitectura CSS escalable en proyectos medianos/grandes.

3. Definir direccion visual
- Establecer tipografia, paleta, espaciado, radios, sombras y escala de tamanos.
- Crear variables/tokens de color y espaciado antes de maquetar.
- Disenar jerarquia visual clara (titulos, subtitulos, CTAs, contenido).

4. Construir layout y componentes
- Usar HTML semantico (header, nav, main, section, article, footer).
- Implementar grid/flex con enfoque mobile-first.
- Crear componentes reutilizables: navbar, hero, cards, CTA, formulario, footer.
- Evitar duplicidad de estilos y utilidades inconsistentes.

5. Aplicar motion y dinamismo
- Priorizar animaciones utiles: entrada de bloques, hover, focus, cambio de estado.
- Mantener transiciones breves y coherentes.
- Respetar prefers-reduced-motion cuando aplique.

6. Validar calidad y cierre
- Revisar responsive en mobile, tablet y desktop.
- Verificar accesibilidad basica (contraste, foco visible, labels, teclado).
- Verificar rendimiento (evitar animaciones pesadas y CSS/JS innecesario).
- Entregar resumen corto: que se hizo, por que mejora UX/UI y como probarlo.

## Criterios de calidad (Done)
- Visual consistente y no generico.
- Navegacion clara y CTA principal visible sin friccion.
- Responsive real en puntos de quiebre clave.
- Accesibilidad basica cumplida.
- Animaciones con proposito y sin impacto notable de rendimiento.
- Codigo limpio, mantenible y facil de extender.

## Formato de entrega recomendado
- Cambios por archivo y componente.
- Decisiones de diseno y stack elegidos.
- Checklist final de validacion.
- Siguientes mejoras opcionales (1 a 3).
