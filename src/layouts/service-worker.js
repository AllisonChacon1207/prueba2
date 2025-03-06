self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-cache').then((cache) => {
      return cache.addAll([
        '/', // Página de inicio
        '/index.html', // Archivo principal
        '/styles.css', // Archivos CSS
        '/scripts.js', // Archivos JS
        // Agrega más archivos que quieras cachear aquí
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
