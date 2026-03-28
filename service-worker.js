const CACHE_NAME = 'sensei-v34'; // Versión 34 - Ultra Fast Audio & Offline Fix
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

const urlsToCacheMusic = [
  './Musica/tracks/6ix9ine - BEBE ft. Anuel AA.mp3',
  './Musica/tracks/6ix9ine - Pa Ti (feat. Yailin La Más Viral) (Official Music Video).mp3',
  './Musica/tracks/A La Antigüita - Calibre 50 (LETRA).mp3',
  './Musica/tracks/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3',
  './Musica/tracks/Alan Walker - Faded.mp3',
  './Musica/tracks/Amenazzy ft. Lary Over - Solo (Video Oficial).mp3',
  './Musica/tracks/Anuel - Nacimos Pa Morir (Official Video) ft. Jory.mp3',
  './Musica/tracks/Aventura - Ella y Yo (ft. Don Omar).mp3',
  './Musica/tracks/BAD BUNNY - AMORFODA (Video Oficial).mp3',
  './Musica/tracks/BAD BUNNY - SOY PEOR (Video Oficial).mp3',
  './Musica/tracks/BARBIE GIRL - Aqua  Subtítulos inglés y español.mp3',
  './Musica/tracks/BELLAKEO (Video Oficial) - Peso Pluma, Anitta.mp3',
  './Musica/tracks/Becky G, Bad Bunny - Mayores (Official Video).mp3',
  './Musica/tracks/Becky G, NATTI NATASHA - Sin Pijama (Official Video).mp3',
  './Musica/tracks/Becky G, Paulo Londra - Cuando Te Besé (Official Video).mp3',
  './Musica/tracks/Bruno Mars - Just The Way You Are (Lyrics).mp3',
  './Musica/tracks/Burn It All Down (ft. PVRIS)  Worlds 2021 - League of Legends.mp3',
  './Musica/tracks/Calibre 50 - Siempre te voy a querer (Letra) (Lyrics).mp3',
  './Musica/tracks/Carla Morrison - Disfruto (letra).mp3',
  './Musica/tracks/David Guetta & Showtek - Bad ft.Vassy (Lyrics Video).mp3',
  './Musica/tracks/De La Ghetto - Fronteamos Porque Podemos ft. Daddy Yankee, Yandel & Ñengo Flow [Official Video].mp3',
  './Musica/tracks/Dejando Huellas, Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Después De Ti, Los Inquietos Del Vallenato, Video Letra.mp3',
  './Musica/tracks/Dimitri Vegas, Martin Garrix, Like Mike - Tremor (Official Music Video).mp3',
  './Musica/tracks/Dos hombres y un destino- David Bustamante y Axel- (letra).mp3',
  './Musica/tracks/El Error, Los Gigantes Del Vallenato - Audio.mp3',
  './Musica/tracks/El cigarrillo - Ana Gabriel (LetraLyrics).mp3',
  './Musica/tracks/En este mundo - Nigga (Letra).mp3',
  './Musica/tracks/Es Un Secreto - Plan B [Letra  Lyrics].mp3',
  './Musica/tracks/Flex Te quiero.mp3',
  './Musica/tracks/HEROIC Hard Epic String Rap Beat  Prod. By Aidan x Maxxton.mp3',
  './Musica/tracks/Hasta la Raíz - Natalia Lafourcade   LETRA.mp3',
  './Musica/tracks/Humbe - fantasmas (Letra).mp3',
  './Musica/tracks/Jesse & Joy  Corre! [Letra].mp3',
  './Musica/tracks/Jombriel, DFZM - Vitamina (LetraLyrics).mp3',
  './Musica/tracks/Justin Bieber - Never Say Never ft. Jaden.mp3',
  './Musica/tracks/KAROL G, Nicki Minaj - Tusa (Official Video).mp3',
  './Musica/tracks/Kaoma - Lambada (Official Video) 1989 HD.mp3',
  './Musica/tracks/La Oreja de Van Gogh - Rosas (Vídeo Oficial).mp3',
  './Musica/tracks/La Pregunta - J Alvarez [Letra  Lyrics].mp3',
  './Musica/tracks/La Quemona Master Boys LetraLyrics.mp3',
  './Musica/tracks/La Tormenta De Arena - Dorian (letra).mp3',
  './Musica/tracks/Laura Pausini - En Cambio No (Official Music Video).mp3',
  './Musica/tracks/Los Del Rio - Macarena (Bayside Boys Remix).mp3',
  './Musica/tracks/Makano - Dejame Entrar [Video Oficial].mp3',
  './Musica/tracks/Makano - Te Amo (Video Oficial).mp3',
  './Musica/tracks/Makano feat. Josenid - Su Nombre en mi Cuaderno [Video Oficial].mp3',
  './Musica/tracks/Maluma - Cuatro Babys (Official Video) ft. Trap Capos, Noriel, Bryant Myers, Juhn.mp3',
  './Musica/tracks/Martin Garrix - Animals (Official Video).mp3',
  './Musica/tracks/Me Before You - Louisa and Will - Photograph and Letter.mp3',
  './Musica/tracks/Me Parte El Corazón, Daniel Calderón & Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Micaela.mp3',
  './Musica/tracks/Michael Jackson - Billie Jean (Official Video).mp3',
  './Musica/tracks/Miguel Bose - Amiga.mp3',
  './Musica/tracks/Miéntele Al Corazón, Miguel Morales, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Moy Bobadilla - Grupo Firme - Corazón (LetraLyrics).mp3',
  './Musica/tracks/Niña Bonita, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/ORIGINAL El Tren Que Nos Separa (Letra) .....mp3',
  './Musica/tracks/Olvídala, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Ozuna - Te Vas (Video Oficial).mp3',
  './Musica/tracks/Perdóname - La Factoría ft. Eddy Lover (Video Ofical HD).mp3',
  './Musica/tracks/Phoenix (ft. Cailin Russo and Chrissy Costanza)  Worlds 2019 - League of Legends.mp3',
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
  './Musica/tracks/Silvana Di Lorenzo Me muero por estar contigo (VIDEO).mp3',
  './Musica/tracks/Sin Tu Amor - Luis Mateus (Video Lyric)  Vallenato Romántico.mp3',
  './Musica/tracks/Solo Me Faltas Tú, Dinastía Romero, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Te Amaré, Los Inquietos Del Vallenato, Video Letra.mp3',
  './Musica/tracks/Te Amo Tanto.mp3',
  './Musica/tracks/Te Sorprenderás, Los Inquietos Del Vallenato, Video Letra.mp3',
  './Musica/tracks/Thalia, NATTI NATASHA - No Me Acuerdo (Official Video).mp3',
  './Musica/tracks/The Irrepressibles - In This Shirt (Sub. Español).mp3',
  './Musica/tracks/Tres Noches, Jesús Manuel, Vídeo Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Triguenita, Binomio De Oro, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Un Osito Dormilón, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Vico C Me acuerdo.mp3',
  './Musica/tracks/Vivamos Lo Nuestro, Miguel Morales, Video Letra - Sentir Vallenato.mp3',
  './Musica/tracks/Volver, Los Inquietos del Vallenato - Video Oficial.mp3',
  './Musica/tracks/Warriors  Season 2020 Cinematic - League of Legends (ft. 2WEI and Edda Hayes).mp3',
  './Musica/tracks/Yaga y Mackie feat. Arcangel y de La Ghetto - Aparentemente (Video Oficial).mp3',
  './Musica/tracks/sapientdream - past lives (Subtitulada Español).mp3',
  './Musica/tracks/Éveillez-vous (avec Valerie Broussard)  Cinématique de League of Legends  Saison 2019.mp3',
  './Musica/tracks/kaim-tiktok.mp3',
  './Musica/tracks/EMIN feat. JONY - КАМИН.mp3',
  './Musica/tracks/Ha-Ash - Lo Aprendí de Ti.mp3',
  './Musica/tracks/HA-ASH - Perdón, Perdón.mp3',
  './Musica/tracks/HA-ASH - Te Dejo En Libertad.mp3',
  './Musica/tracks/HA-ASH - Todo No Fue Suficiente (Letra).mp3',
  './Musica/tracks/Annette Moreno - Un Ángel Llora (Video Oficial).mp3',
  './Musica/tracks/Annette Moreno - Guardian De Mi Corazón (Video Oficial).mp3',
  './Musica/tracks/Sebastián Yatra - Devuélveme El Corazón.mp3',
  './Musica/tracks/Sebastián Yatra - Cómo Mirarte.mp3',
  './Musica/tracks/Hasta el fin del mundo - Jennifer Peña.mp3',
  './Musica/tracks/Ana Gabriel Simplemente Amigos.mp3'
];

// Evento de instalación
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache v34 abierta. Iniciando cacheo...');
      // Intentamos cachear lo esencial primero
      cache.addAll(urlsToCacheEssential);
      // Imágenes comunes
      cache.addAll(urlsToCacheImages);
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

  // MANEJO ESPECIAL PARA AUDIO (RANGE REQUESTS)
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
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'no-cache'
              }
            });
          });
        }
        // Si no está en caché, intentar fetch con prioridad alta
        return fetch(event.request);
      })
    );
    return;
  }

  // Estrategia Cache First para Audio no-range (o para asegurar que se guarde)
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(networkResponse => {
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

  // Estrategia Stale-While-Revalidate para Imágenes y otros
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
