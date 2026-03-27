const CACHE_NAME = 'sensei-v11'; // Versión 11 - Offline Music Support
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
  // Recursos Externos (CDN)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js'
];

const urlsToCacheMusic = [
  './Musica/tracks/6ix9ine - Pa Ti (feat. Yailin La Más Viral) (Official Music Video).mp3',
  './Musica/tracks/A La Antigüita - Calibre 50 (LETRA).mp3',
  './Musica/tracks/Anuel - Nacimos Pa Morir (Official Video) ft. Jory.mp3',
  './Musica/tracks/BAD BUNNY - AMORFODA (Video Oficial).mp3',
  './Musica/tracks/BAD BUNNY - SOY PEOR (Video Oficial).mp3',
  './Musica/tracks/BELLAKEO (Video Oficial) - Peso Pluma, Anitta.mp3',
  './Musica/tracks/Becky G, Bad Bunny - Mayores (Official Video).mp3',
  './Musica/tracks/Becky G, NATTI NATASHA - Sin Pijama (Official Video).mp3',
  './Musica/tracks/Becky G, Paulo Londra - Cuando Te Besé (Official Video).mp3',
  './Musica/tracks/Bruno Mars - Just The Way You Are (Lyrics).mp3',
  './Musica/tracks/Calibre 50 - Siempre te voy a querer (Letra) (Lyrics).mp3',
  './Musica/tracks/Carla Morrison - Disfruto (letra).mp3',
  './Musica/tracks/De La Ghetto - Fronteamos Porque Podemos ft. Daddy Yankee, Yandel & Ñengo Flow [Official Video].mp3',
  './Musica/tracks/Dejando Huellas, Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Después De Ti, Los Inquietos Del Vallenato, Video Letra.mp3',
  './Musica/tracks/Dos hombres y un destino- David Bustamante y Axel- (letra).mp3',
  './Musica/tracks/El Error, Los Gigantes Del Vallenato - Audio.mp3',
  './Musica/tracks/El cigarrillo - Ana Gabriel (LetraLyrics).mp3',
  './Musica/tracks/Es Un Secreto - Plan B [Letra  Lyrics].mp3',
  './Musica/tracks/HEROIC Hard Epic String Rap Beat  Prod. By Aidan x Maxxton.mp3',
  './Musica/tracks/Hasta la Raíz - Natalia Lafourcade   LETRA.mp3',
  './Musica/tracks/Humbe - fantasmas (Letra).mp3',
  './Musica/tracks/Jesse & Joy  Corre! [Letra].mp3',
  './Musica/tracks/Jombriel, DFZM - Vitamina (LetraLyrics).mp3',
  './Musica/tracks/Justin Bieber - Never Say Never ft. Jaden.mp3',
  './Musica/tracks/KAROL G, Nicki Minaj - Tusa (Official Video).mp3',
  './Musica/tracks/La Oreja de Van Gogh - Rosas (Vídeo Oficial).mp3',
  './Musica/tracks/La Pregunta - J Alvarez [Letra  Lyrics].mp3',
  './Musica/tracks/La Quemona Master Boys LetraLyrics.mp3',
  './Musica/tracks/La Tormenta De Arena - Dorian (letra).mp3',
  './Musica/tracks/Laura Pausini - En Cambio No (Official Music Video).mp3',
  './Musica/tracks/Makano - Dejame Entrar [Video Oficial].mp3',
  './Musica/tracks/Makano feat. Josenid - Su Nombre en mi Cuaderno [Video Oficial].mp3',
  './Musica/tracks/Maluma - Cuatro Babys (Official Video) ft. Trap Capos, Noriel, Bryant Myers, Juhn.mp3',
  './Musica/tracks/Me Before You - Louisa and Will - Photograph and Letter.mp3',
  './Musica/tracks/Me Parte El Corazón, Daniel Calderón & Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Miéntele Al Corazón, Miguel Morales, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Moy Bobadilla - Grupo Firme - Corazón (LetraLyrics).mp3',
  './Musica/tracks/Niña Bonita, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/ORIGINAL El Tren Que Nos Separa (Letra) .....mp3',
  './Musica/tracks/Olvídala, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Ozuna - Te Vas (Video Oficial).mp3',
  './Musica/tracks/Presumida, Los Diablitos, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Qué tiene ella que no tenga yo_.mp3',
  './Musica/tracks/Quítame Ese Hombre Del Corazón - Pilar Montenegro   Letra  Norteña.mp3',
  './Musica/tracks/RBD  Sálvame [Letra].mp3',
  './Musica/tracks/RD Maravilla - Hola Bebe (Te Lo Hundo).mp3',
  './Musica/tracks/RD Maravilla Feat. El Original - Loco loco (Video Oficial).mp3',
  './Musica/tracks/Recuérdame, Los Inquietos Del Vallenato, Video Letra.mp3',
  './Musica/tracks/Reik - Sabes (Letra  Lyrics).mp3',
  './Musica/tracks/Rvssian - Si Tu Lo Dejas FT Bad Bunny X Farruko X Nicky Jam X King Kosa.mp3',
  './Musica/tracks/Selena Gomez - Love You Like a Love Song (Lyrics) no one compares you stand alone.mp3',
  './Musica/tracks/Sin Tu Amor - Luis Mateus (Video Lyric)  Vallenato Romántico.mp3',
  './Musica/tracks/Solo Me Faltas Tú, Dinastía Romero, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Te Amaré, Los Inquietos Del Vallenato, Video Letra.mp3',
  './Musica/tracks/Te Sorprenderás, Los Inquietos Del Vallenato, Video Letra.mp3',
  './Musica/tracks/Thalia, NATTI NATASHA - No Me Acuerdo (Official Video).mp3',
  './Musica/tracks/The Irrepressibles - In This Shirt (Sub. Español).mp3',
  './Musica/tracks/Tres Noches, Jesús Manuel, Vídeo Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Triguenita, Binomio De Oro, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Un Osito Dormilón, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Vivamos Lo Nuestro, Miguel Morales, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Volver, Los Inquietos del Vallenato - Video Oficial.mp3',
  './Musica/tracks/Yaga y Mackie feat. Arcangel y de La Ghetto - Aparentemente (Video Oficial).mp3',
  './Musica/tracks/sapientdream - past lives (Subtitulada Español).mp3'
];

// Evento de instalación
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache v11 abierta. Iniciando cacheo...');
      // Intentamos cachear lo esencial primero
      cache.addAll(urlsToCacheEssential);
      // Luego la música (sin forzar que el install falle si una canción falla)
      return Promise.allSettled(
        urlsToCacheMusic.map(url => cache.add(url))
      ).then(results => {
        const success = results.filter(r => r.status === 'fulfilled').length;
        console.log(`Cacheado: ${success}/${urlsToCacheMusic.length} canciones.`);
      });
    })
  );
});

// Evento de activación: Limpiamos caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
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

// Estrategia de Fetch
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Estrategia Cache-First para archivos de Audio e Imágenes (archivos estáticos pesados)
  if (event.request.destination === 'audio' || 
      event.request.destination === 'image' || 
      url.pathname.endsWith('.mp3') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.gif')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(event.request).then(response => {
          // Si la respuesta es válida, la guardamos en cache para la próxima vez
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        }).catch(err => {
          // Si falla la red y no está en cache, retornamos un error o algo silencioso
          console.error('Error fetching resource offline:', err);
          return null;
        });
      })
    );
  } else if (url.hostname === 'cdnjs.cloudflare.com' || url.hostname === 'www.gstatic.com') {
    // Estrategia Cache-First para dependencias externas
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
    );
  } else {
    // Para todo lo demás (HTML, JS, CSS), usamos Network-First
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  }
});