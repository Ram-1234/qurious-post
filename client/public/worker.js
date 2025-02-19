//console.warn("service worker from publick folder");

let cacheName = "pwa-cache-name";
let cacheUrls = [
  "/static/js/bundle.js",
  "/favicon.ico",
  "/static/js/vendors-main.chunk.js",
  "/static/media/roadlight.1f17136611b2e3c6db94.png",
  "/logo192.png",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/index.html",
  "/",
  '/completed',
  "/worker",
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheUrls);
    })
  );
});
// Cache and return request
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) return result;
        else {
          let furl = event.request.clone();
          return fetch(furl);
        }
      })
    );
  }
});

// Update a service worker
this.addEventListener('activate', event => {
  var cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});