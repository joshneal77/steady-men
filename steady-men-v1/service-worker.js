const CACHE_NAME = 'steady-men-refresh-2026-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './404.html',
  './js/study-data.js',
  './js/app.js',
  './assets/steady-men-crest.png',
  './manifest.webmanifest',
  ...['arrow-left', 'arrow-right', 'arrow-up-right', 'copy', 'book-open', 'calendar-days', 'menu', 'download', 'x', 'chevron-down', 'house', 'users'].map((name) => `./assets/icons/${name}.svg`)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('steady-men-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    const appPath = new URL('./', self.location.href).pathname;
    const isHome = requestUrl.pathname === appPath || requestUrl.pathname === `${appPath}index.html`;
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok && isHome) {
            const copy = response.clone();
            event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy)));
          }
          return response;
        })
        .catch(async () => {
          if (isHome) return caches.match('./index.html');
          const page = await caches.match('./404.html');
          return new Response(await page.text(), { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
        })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
