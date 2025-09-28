import { APP_BASE_HREF } from '@angular/common';
import { ɵgetOrCreateAngularServerApp as getOrCreateAngularServerApp } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const angularAppEngine = getOrCreateAngularServerApp();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', async (req, res, next) => {
    try {
      const { protocol, originalUrl, baseUrl } = req;
      const host = req.headers.host || '';
      const url = `${protocol}://${host}${originalUrl}`;

      // Convert Express headers to Fetch HeadersInit
      const headersInit: Record<string, string> = {};
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === 'string') {
          headersInit[key] = value;
        } else if (Array.isArray(value)) {
          headersInit[key] = value.join(',');
        } else if (value === undefined) {
          // skip
        } else {
          headersInit[key] = String(value);
        }
      }

      const request = new Request(url, { method: req.method, headers: headersInit });

      const response = await angularAppEngine.handle(request, {
        // Provide APP_BASE_HREF so server rendering has correct base href
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      } as any);

      if (!response) {
        return next();
      }

      // Copy status
      res.status(response.status);

      // Copy headers from Response
      response.headers.forEach((value: string, key: string) => {
        // Express expects lowercase header names to be set as-is
        res.setHeader(key, value);
      });

      // Send body
      const body = await response.text();
      res.send(body);
    } catch (err) {
      next(err as unknown);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
