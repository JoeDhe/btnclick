const staticCacheName = 'static-site-v1';
const assets = [
  './',
  './index.html',
  './apps.html',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
  './offline.html',
];

// Install Event - Cache Files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(
    caches.open(staticCacheName)
      .then((cache) => cache.addAll(assets))
      .catch((error) => console.error('Caching error:', error))
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cache) => cache !== staticCacheName)
          .map((cache) => caches.delete(cache))
      );
    })
  );
});

// Fetch Event - Serve from cache, with network fallback and offline fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html');
          }
        });
      })
  );
});
