self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1').then(cache => {
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
