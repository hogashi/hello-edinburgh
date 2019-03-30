const VERSION = '201903302136';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll([
        // '/bundle.js',
        '/css/index.css',
        '/images/icon.png',
        '/favicon.ico',
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  // console.log(e);
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
