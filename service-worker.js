const CACHE_NAME = 'sensei-v9'; // Nueva versión para diseño carrusel y visor PDF
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo_sensei.jpg',
  './google495610aeff1281cc.html',
  './Musica/index.html',
  './Musica/script.js',
  './Musica/style.css',
  './audio_theme.mp3',
  './Formulario/index.html',
  './Formulario/style.css',
  './Formulario/script.js',
  './Programas/libros.html',
  './Programas/style.css'
];

// Evento de instalación: Forzamos a que el nuevo SW tome el control inmediatamente
self.addEventListener('install', event => {
  self.skipWaiting(); // Salta la fase de espera y activa el nuevo SW de inmediato
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Nueva cache v8 abierta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activación: Limpiamos caches antiguos y tomamos el control de las pestañas abiertas
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Toma el control de los clientes inmediatamente
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.startsWith('sensei-') && cacheName !== CACHE_NAME) {
              console.log('Borrando cache antigua:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Estrategia de red primero, luego cache (para asegurar actualizaciones en vivo)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});