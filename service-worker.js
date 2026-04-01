const CACHE_NAME = 'sensei-music-v53';
const ESSENTIAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo SENSEI.png',
  './Musica/index.html',
  './Musica/script.js',
  './Musica/style.css',
  './Musica/letras.js',
  './Musica/songs.js',
  './Musica/vip.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Instalación: Cachear recursos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('SW: Instalando nueva versión v53');
      return cache.addAll(ESSENTIAL_ASSETS);
    })
  );
  // Forzar que el nuevo SW se active inmediatamente
  self.skipWaiting();
});

// Activación: Limpiar caches antiguas e inmediatamente tomar el control
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('SW: Eliminando cache antigua', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Tomar el control de todas las pestañas abiertas inmediatamente
  self.clients.claim();
});

// Estrategia de Fetch Avanzada (Network First para asegurar actualizaciones)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Manejo especial para AUDIO (.mp3) - Cache First con soporte para Range
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then(networkResponse => {
          return networkResponse;
        }).catch(() => new Response('Audio no disponible offline', { status: 503 }));
      })
    );
    return;
  }

  // Network First para Scripts, Estilos y HTML (Para que las actualizaciones sean instantáneas)
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html') || url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const clonedResponse = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache First para imágenes y fuentes
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) return networkResponse;
        const clonedResponse = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
        return networkResponse;
      });
    })
  );
});

// Mantener el Service Worker activo y manejar mensajes
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  // Lógica para cachear canciones favoritas individualmente
  if (event.data && event.data.type === 'CACHE_SONG') {
    const songUrl = event.data.url;
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.add(songUrl).then(() => {
          console.log('SW: Canción guardada en cache offline:', songUrl);
        });
      })
    );
  }

  // Lógica para eliminar de cache si se quita de favoritos (opcional)
  if (event.data && event.data.type === 'REMOVE_SONG') {
    const songUrl = event.data.url;
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.delete(songUrl).then(() => {
          console.log('SW: Canción eliminada de cache offline:', songUrl);
        });
      })
    );
  }
});
