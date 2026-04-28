# Taller Claude Agentes IA Kodigo

Sitio estatico para el workshop "El futuro del trabajo profesional: el uso de agentes autonomos de IA".

## Estructura

- `index.html`: pagina principal del taller.
- `pages/`: paginas modulares de practicas y facilitador.
- `assets/css/site.css`: estilos principales.
- `assets/js/`: datos y logica de navegacion del taller.
- `resources/`: archivos de trabajo usados en las practicas.

## Uso local

Abre `index.html` directamente en el navegador.

Algunos enlaces a carpetas o archivos locales pueden depender de permisos del navegador.

Tambien puedes levantar el servidor local:

```bash
npm start
```

El sitio quedara disponible en `http://localhost:3000`.

## Deploy en Railway

El proyecto incluye configuracion lista para Railway:

- `package.json`: define `npm start`.
- `server.js`: servidor estatico con Node, sin dependencias externas.
- `railway.json`: usa Nixpacks y ejecuta `npm start`.

Pasos recomendados:

1. En Railway, crea un nuevo proyecto.
2. Selecciona `Deploy from GitHub repo`.
3. Elige `Oscar-codes/massterclass_claude`.
4. Railway detectara Node/Nixpacks y usara el puerto definido por la variable `PORT`.
5. Genera el dominio desde la seccion `Networking`.
