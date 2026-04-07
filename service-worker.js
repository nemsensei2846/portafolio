// SENSEI MUSIC - Service Worker (PWA Offline)
// v69
// Objetivo:
// 1) Que la PWA arranque sin internet (incluye React/ReactDOM y librerías CDN)
// 2) Que las canciones .mp3 funcionen offline SIN cortes (evitar cachear respuestas 206 Partial Content)
// 3) Permitir descargar/cargar offline 1 canción o todas

const CACHE_NAME = 'sensei-music-v69';

// Nota: usamos rutas relativas para que funcione en subcarpetas (ej: /portafolio/)
// Importante: esto solo precachea "lo esencial". Las canciones se cachean por mensaje (CACHE_SONG/CACHE_ALL_SONGS).
const ESSENTIAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo SENSEI.png',
  './audio_theme.mp3',

  './Musica/index.html',
  './Musica/style.css',
  './Musica/script.js',
  './Musica/songs.js',
  './Musica/letras.js',
  './Musica/vip.png',

  // Auth pages (están dentro de /Musica/auth/)
  './Musica/auth/login.html',
  './Musica/auth/register.html',
  './Musica/auth/auth.css',
  './Musica/auth/auth.js',

  // Librerías externas (para que Musica/index.html arranque offline)
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Normaliza requests para que "style.css?v=69" use el mismo cache que "style.css".
// Esto es CLAVE porque en tu Musica/index.html usamos cache-busting con "?v=69".
function normalizeRequest(request) {
  try {
    const url = new URL(request.url);
    const isSameOrigin = url.origin === self.location.origin;
    if (!isSameOrigin) return request; // CDN: no tocamos

    if (request.method && request.method !== 'GET') return request;

    const isStatic =
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.json') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.webp') ||
      url.pathname.endsWith('.gif') ||
      url.pathname.endsWith('.mp3');

    if (!isStatic) return request;

    const cleanUrl = url.origin + url.pathname;
    return new Request(cleanUrl, { method: 'GET' });
  } catch (e) {
    return request;
  }
}

function isOpaqueOk(response) {
  // Para recursos cross-origin que se obtienen como "opaque" (no-cors),
  // response.ok suele ser false (status 0). Aun así se pueden cachear.
  return response && (response.ok || response.type === 'opaque');
}

async function precache() {
  const cache = await caches.open(CACHE_NAME);
  const tasks = ESSENTIAL_ASSETS.map(async (asset) => {
    try {
      const req = asset.startsWith('http')
        ? new Request(asset, { mode: 'no-cors' })
        : new Request(asset);

      const res = await fetch(req, { cache: 'reload' });
      if (isOpaqueOk(res)) {
        await cache.put(req, res);
      }
    } catch (e) {
      // Si está offline durante install, que el SW igual se instale con lo que pueda.
    }
  });
  await Promise.all(tasks);
}

// 🔧 INSTALL
self.addEventListener('install', (event) => {
  event.waitUntil(precache());
  self.skipWaiting();
});

// 🔧 ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined)))
    )
  );
  self.clients.claim();
});

// Helpers de navegación offline
async function navigationFallback(request) {
  try {
    const res = await fetch(request);
    if (res && res.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(normalizeRequest(request), res.clone());
    }
    return res;
  } catch (e) {
    const cached = await caches.match(normalizeRequest(request));
    if (cached) return cached;
    return (
      (await caches.match('./Musica/index.html')) ||
      (await caches.match('./index.html')) ||
      new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
    );
  }
}

// 🎵 MP3 con soporte Range (pero SIN cachear 206)
// Mejora: si el navegador pide Range (206) y aún no está cacheado,
// cacheamos en SEGUNDO PLANO el MP3 completo (200) con retardo,
// para NO competir con el buffer inicial.
// Nota: Para evitar “mudo”/cortes en iPhone/Android, respondemos Range desde el MP3 completo cacheado.
// Optimizamos: guardamos el ArrayBuffer en memoria por canción (solo 1-2) para que no se recalcule en cada request.
const mp3BufferCache = new Map(); // keyUrl -> { buffer, ts }
const inflightFullCache = new Set(); // keyUrl
const MAX_MP3_BUFFERS = 2;

async function handleMp3(event) {
  const request = event.request;
  const cache = await caches.open(CACHE_NAME);
  const cacheReq = normalizeRequest(request);
  const keyUrl = cacheReq.url || request.url;

  const cached = (await caches.match(cacheReq)) || (await caches.match(request));
  if (cached) {
    const range = request.headers.get('range');
    if (!range) return cached;

    let buffer = mp3BufferCache.get(keyUrl)?.buffer;
    if (!buffer) {
      buffer = await cached.arrayBuffer();
      mp3BufferCache.set(keyUrl, { buffer, ts: Date.now() });
      // Limpiar buffers viejos (máximo 2)
      if (mp3BufferCache.size > MAX_MP3_BUFFERS) {
        const oldestKey = [...mp3BufferCache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0]?.[0];
        if (oldestKey) mp3BufferCache.delete(oldestKey);
      }
    }
    const size = buffer.byteLength;
    const parts = range.replace(/bytes=/, '').split('-');
    const start = Math.max(parseInt(parts[0], 10) || 0, 0);
    const end = parts[1] ? Math.min(parseInt(parts[1], 10), size - 1) : size - 1;
    const chunk = buffer.slice(start, end + 1);

    return new Response(chunk, {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': String(chunk.byteLength),
        'Accept-Ranges': 'bytes'
      }
    });
  }

  const range = request.headers.get('range');
  try {
    const res = await fetch(request);

    if (!range && res && res.status === 200) {
      cache.put(cacheReq, res.clone());
    } else if (range) {
      // Evitar que se lancen muchas descargas completas a la vez (causa lag).
      if (!inflightFullCache.has(keyUrl)) {
        inflightFullCache.add(keyUrl);
        event.waitUntil(
          (async () => {
            try {
              await new Promise((r) => setTimeout(r, 2500));
              const fullRes = await fetch(cacheReq, { cache: 'reload' });
              if (fullRes && fullRes.status === 200) {
                await cache.put(cacheReq, fullRes.clone());
              }
            } catch (e) {
              // ignorar
            } finally {
              inflightFullCache.delete(keyUrl);
            }
          })()
        );
      }
    }
    return res;
  } catch (e) {
    return new Response('Audio no disponible offline', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// 🔧 FETCH
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const cacheReq = normalizeRequest(request);

  // Navegación (PWA)
  if (request.mode === 'navigate') {
    event.respondWith(navigationFallback(request));
    return;
  }

  // MP3
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(handleMp3(event));
    return;
  }

  // JS/CSS/HTML/JSON -> network-first con fallback a cache
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.json')
  ) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (!res) return res;
          if (res.status === 200 || res.type === 'opaque') {
            caches.open(CACHE_NAME).then((cache) => cache.put(cacheReq, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(cacheReq))
    );
    return;
  }

  // Imágenes -> cache-first
  event.respondWith(
    caches.match(cacheReq).then((cachedRes) => {
      if (cachedRes) return cachedRes;
      return fetch(request).then((res) => {
        if (!res) return res;
        if (res.status === 200 || res.type === 'opaque') {
          caches.open(CACHE_NAME).then((cache) => cache.put(cacheReq, res.clone()));
        }
        return res;
      });
    })
  );
});

async function broadcast(message) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach((c) => c.postMessage(message));
}

async function cacheOneSong(url) {
  const cache = await caches.open(CACHE_NAME);
  const req = new Request(url, { cache: 'reload' });

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(req);
      if (res && res.status === 200) {
        try {
          await cache.put(req, res.clone());
          return true;
        } catch (e) {
          // QuotaExceededError u otros fallos de cache
          return false;
        }
      }
    } catch (e) {
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }
  return false;
}

async function cacheAllSongs(urls) {
  const total = (urls || []).length;
  let done = 0;
  let okCount = 0;

  const CONCURRENCY = 2;
  const queue = [...(urls || [])];

  const worker = async () => {
    while (queue.length) {
      const url = queue.shift();
      let ok = false;
      try {
        ok = await cacheOneSong(url);
      } catch (e) {
        // seguir
      } finally {
        done += 1;
        if (ok) okCount += 1;
        broadcast({ type: 'CACHE_PROGRESS', done, total, ok, url });
        await new Promise((r) => setTimeout(r, 120));
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, total || 0) }, worker));
  broadcast({ type: 'CACHE_ALL_COMPLETE', done, total, okCount });
}

// 🔥 MENSAJES (DESCARGA OFFLINE)
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }

  if (!event.data) return;

  if (event.data.type === 'CACHE_SONG' && event.data.url) {
    event.waitUntil(
      (async () => {
        const ok = await cacheOneSong(event.data.url);
        await broadcast({ type: 'DOWNLOAD_COMPLETE', ok, url: event.data.url });
      })()
    );
    return;
  }

  if (event.data.type === 'CACHE_ALL_SONGS' && Array.isArray(event.data.urls)) {
    event.waitUntil(cacheAllSongs(event.data.urls));
    return;
  }

  // ✅ Verificar si URLs están cacheadas (para "VERIFICAR OFFLINE")
  if (event.data.type === 'CHECK_CACHED_URLS' && Array.isArray(event.data.urls)) {
    event.waitUntil(
      (async () => {
        try {
          const cache = await caches.open(CACHE_NAME);
          const urls = event.data.urls.filter(Boolean);
          const cached = [];
          for (const u of urls) {
            try {
              const req = new Request(u, { method: 'GET' });
              const hit = await cache.match(req) || await cache.match(normalizeRequest(req));
              if (hit) cached.push(u);
            } catch (e) {}
          }
          await broadcast({ type: 'CHECK_CACHED_RESULT', cached, total: urls.length });
        } catch (e) {
          await broadcast({ type: 'CHECK_CACHED_RESULT', cached: [], total: 0, error: true });
        }
      })()
    );
    return;
  }

  if (event.data.type === 'REMOVE_SONG' && event.data.url) {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.delete(new Request(event.data.url)))
    );
  }
});
