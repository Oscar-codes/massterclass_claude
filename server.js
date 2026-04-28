const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".csv": "text/csv; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
};

function send(res, status, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": contentType,
    "X-Content-Type-Options": "nosniff"
  });
  res.end(body);
}

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalizedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const filePath = path.normalize(path.join(root, normalizedPath));

  if (!filePath.startsWith(root)) {
    return null;
  }

  return filePath;
}

function renderDirectoryList(dirPath, requestPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."))
    .map((entry) => {
      const href = path.posix.join(requestPath, entry.name) + (entry.isDirectory() ? "/" : "");
      return `<li><a href="${href}">${entry.name}${entry.isDirectory() ? "/" : ""}</a></li>`;
    })
    .join("");

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recursos del taller</title>
  <link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
  <main class="py-4">
    <div class="container">
      <article class="k-content">
        <h1 class="h4 mb-3">Recursos del taller</h1>
        <ul class="list-group">${entries}</ul>
      </article>
    </div>
  </main>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  if (!req.url || !["GET", "HEAD"].includes(req.method || "")) {
    send(res, 405, "Metodo no permitido");
    return;
  }

  const filePath = resolveRequestPath(req.url);

  if (!filePath) {
    send(res, 403, "Ruta no permitida");
    return;
  }

  if (!fs.existsSync(filePath)) {
    send(res, 404, "Archivo no encontrado");
    return;
  }

  const stat = fs.statSync(filePath);

  if (stat.isDirectory()) {
    const indexPath = path.join(filePath, "index.html");

    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath);
      send(res, 200, req.method === "HEAD" ? "" : html, mimeTypes[".html"]);
      return;
    }

    const requestPath = req.url.split("?")[0].replace(/\/?$/, "/");
    const html = renderDirectoryList(filePath, requestPath);
    send(res, 200, req.method === "HEAD" ? "" : html, mimeTypes[".html"]);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const body = req.method === "HEAD" ? "" : fs.readFileSync(filePath);
  send(res, 200, body, mimeTypes[ext] || "application/octet-stream");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Static workshop site running on port ${port}`);
});
