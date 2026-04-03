const CACHE_NAME = 'sensei-music-v55';

const ESSENTIAL_ASSETS = [
  '/portafolio/',
  '/portafolio/index.html',
  '/portafolio/manifest.json',
  '/portafolio/logo SENSEI.png',

  '/portafolio/Musica/index.html',
  '/portafolio/Musica/script.js',
  '/portafolio/Musica/style.css',
  '/portafolio/Musica/letras.js',
  '/portafolio/Musica/songs.js',
  '/portafolio/Musica/vip.png',

  // 🎵 AGREGA TODAS TUS CANCIONES AQUÍ (OBLIGATORIO)
  '/portafolio/Musica/tracks/el-cholito.mp3',
  '/portafolio/Musica/tracks/bebe-anuel.mp3',
  '/portafolio/Musica/tracks/pati.mp3',
  '/portafolio/Musica/tracks/antiguita.mp3',
  '/portafolio/Musica/tracks/faded.mp3',

  // 🔥 OPCIONAL (SI DESCARGAS LIBRERÍAS EN LOCAL)
  // '/portafolio/libs/fontawesome.css',
  // '/portafolio/libs/gsap.js',
  // '/portafolio/libs/aos.css',
  // '/portafolio/libs/aos.js'
];


// 🔧 INSTALAR
self.addEventListener('install', event => {
  console.log('SW: Instalando v55');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ESSENTIAL_ASSETS);
      })
      .catch(err => console.error('Error cacheando:', err))
  );

  self.skipWaiting();
});


// 🔧 ACTIVAR
self.addEventListener('activate', event => {
  console.log('SW: Activado');

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('SW: Eliminando cache antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});


// 🔧 FETCH (OFFLINE INTELIGENTE)
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 🎵 AUDIO → CACHE FIRST (CLAVE PARA OFFLINE)
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) return response;

        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) return networkResponse;

          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });

          return networkResponse;
        }).catch(() => {
          return new Response('Audio no disponible offline', { status: 503 });
        });
      })
    );
    return;
  }

  // 📄 HTML, CSS, JS → NETWORK FIRST
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.json')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) return response;

          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });

          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 🖼️ IMÁGENES → CACHE FIRST
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) return networkResponse;

        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });

        return networkResponse;
      });
    })
  );
});


// 🔥 MENSAJES (DESCARGAR MÚSICA)
self.addEventListener('message', event => {

  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

  // 🎵 DESCARGAR UNA O TODAS LAS CANCIONES
  if (event.data && (event.data.type === 'CACHE_SONG' || event.data.type === 'CACHE_ALL_SONGS')) {

    const urls = event.data.type === 'CACHE_ALL_SONGS'
      ? event.data.urls
      : [event.data.url];

    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return Promise.all(
          urls.map(url =>
            cache.add(url).catch(err =>
              console.warn('Error cacheando canción:', url, err)
            )
          )
        ).then(() => {
          console.log('SW: Canciones guardadas offline 🔥');
        });
      })
    );
  }

  // ❌ ELIMINAR CANCIÓN
  if (event.data && event.data.type === 'REMOVE_SONG') {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.delete(event.data.url);
      })
    );
  }
});