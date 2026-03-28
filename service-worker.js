const CACHE_NAME = 'sensei-v35'; // Versión 35 - Ultra Fast & Efficient
const urlsToCacheEssential = [
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
  './Programas/style.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js'
];

// Portadas comunes para pre-cachear
const urlsToCacheImages = [
  'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif',
  'https://i.scdn.co/image/ab67616d0000b2736bb920cebbe9cd79eccaf0e6',
  'https://i.ytimg.com/vi/E6jIgT-38u8/maxresdefault.jpg'
];

// Evento de instalación
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache v35 abierta. Iniciando cacheo esencial...');
      // Solo cacheamos lo esencial para que la app cargue instantáneamente
      return Promise.all([
        cache.addAll(urlsToCacheEssential),
        cache.addAll(urlsToCacheImages)
      ]);
    })
  );
});

// Evento de activación: Limpiamos caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('sensei-') && cacheName !== CACHE_NAME) {
            console.log('Borrando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      ).then(() => self.clients.claim());
    })
  );
});

// Estrategia de Fetch
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // MANEJO PARA AUDIO (RANGE REQUESTS)
  // Optimizamos para que si no está en caché, use la red directamente sin intermediarios
  if (event.request.headers.get('range') && (event.request.destination === 'audio' || url.pathname.endsWith('.mp3'))) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse.arrayBuffer().then(buffer => {
            const rangeHeader = event.request.headers.get('range');
            const parts = rangeHeader.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : buffer.byteLength - 1;
            const chunk = buffer.slice(start, end + 1);

            return new Response(chunk, {
              status: 206,
              statusText: 'Partial Content',
              headers: {
                'Content-Range': `bytes ${start}-${end}/${buffer.byteLength}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunk.byteLength,
                'Content-Type': 'audio/mpeg'
              }
            });
          });
        }
        // Si no está en caché, pasamos directamente a la red (lo más rápido para streaming)
        return fetch(event.request);
      })
    );
    return;
  }

  // Estrategia Cache First para Audio no-range (o para asegurar que se guarde)
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;
        
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Estrategia Stale-While-Revalidate para Imágenes y otros recursos
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});
