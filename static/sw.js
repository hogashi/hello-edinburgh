self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/bundle.js',
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
