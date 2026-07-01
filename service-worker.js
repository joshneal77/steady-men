const CACHE='steadymen-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./assets/banner.jpg','./assets/crest.jpg','./downloads/Steady-Men-Summer-Study-Package.pdf'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
