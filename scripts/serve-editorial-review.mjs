// Read-only local gallery. Only review artifacts and retained reference images are served.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const port = Number(process.env.REVIEW_PORT || 4322);
const artifacts = path.resolve('artifacts/editorial-v3');
const references = path.resolve('design/editorial-v3/references');
const referencePrefix = '/design/editorial-v3/references/';
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
};
http
  .createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method || '')) {
        response.writeHead(405);
        response.end();
        return;
      }
      const pathname = decodeURIComponent(
        new URL(request.url, 'http://localhost').pathname,
      );
      const isReference = pathname.startsWith(referencePrefix);
      const root = isReference ? references : artifacts;
      const relative = isReference
        ? pathname.slice(referencePrefix.length)
        : pathname === '/'
          ? 'index.html'
          : pathname.slice(1);
      const file = path.resolve(root, relative);
      if (!file.startsWith(root + path.sep) || !mime[path.extname(file)]) {
        response.writeHead(404);
        response.end();
        return;
      }
      const content = await fs.readFile(file);
      response.writeHead(200, {
        'Content-Type': mime[path.extname(file)],
        'X-Robots-Tag': 'noindex, follow',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy':
          "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch {
      response.writeHead(404);
      response.end('Review artifact not found');
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`PROWORKS V3 review gallery: http://127.0.0.1:${port}/`),
  );
