const static = 'static-site';
const assets = [
                './',
                './index.html',
                './apps.html',
                'https://script.google.com/macros/s/AKfycbyI2upLldJVAirdKywq5siMVJp2j55_gFJTv5cXTIKOcUu8hdCcYbBd2G5ciaHODzIRFA/exec',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
                  './offline.html',
              ];

self.addEventListener('install', function (event) {
  console.log('SW Installed');
    event.waitUntil(
      caches.open('static')
        .then(function (cache) {
          cache.addAll(assets);
        })
    );
  });

self.addEventListener('activate', function () {
  console.log('SW Activated');
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});
