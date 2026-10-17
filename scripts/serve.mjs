// Local QA server: static files, true 404s and the same security headers as public/_headers.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const port = Number(process.env.PORT || 4321);
const root = path.resolve('dist');
const aliases = {
  '/products/flow/': '/products/workflows/',
  '/products/signal/': '/products/insights/',
  '/design/': '/experience/',
  '/company/': '/about/',
  '/support/': '/guides/',
};
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};
const headers = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const pathname = decodeURIComponent(url.pathname);
      const alias = aliases[pathname.endsWith('/') ? pathname : pathname + '/'];
      if (alias) {
        res.writeHead(301, { Location: alias });
        res.end();
        return;
      }
      let file = path.resolve(root, '.' + pathname);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403);
        res.end();
        return;
      }
      const stat = await fs.stat(file).catch(() => null);
      if (stat?.isDirectory()) {
        if (!pathname.endsWith('/')) {
          res.writeHead(301, { Location: pathname + '/' + url.search });
          res.end();
          return;
        }
        file = path.join(file, 'index.html');
      }
      let body;
      let status = 200;
      try {
        body = await fs.readFile(file);
      } catch {
        body = await fs.readFile(path.join(root, '404.html'));
        status = 404;
        file = '404.html';
      }
      res.writeHead(status, {
        ...headers,
        'X-Robots-Tag':
          status === 404 ||
          !JSON.parse(
            await fs.readFile(path.join(root, 'release.json'), 'utf8'),
          ).indexable
            ? 'noindex, follow'
            : 'index, follow',
        'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch {
      res.writeHead(400);
      res.end('Bad request');
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`PROWORKS local QA: http://127.0.0.1:${port}`),
  );
