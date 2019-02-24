const VERSION = '201902241444';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll([
        '/js/index.js',
        '/css/index.css',
        '/images/icon.png',
        '/favicon.ico',
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  if (/^https:\/\/[^\/]*twitter.com/.test(e.request)) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
