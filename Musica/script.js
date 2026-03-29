/**
 * SENSEI_AUDIO_PLAYER - MODERN APP LOGIC
 */

let userName = localStorage.getItem('sensei_user_name') || 'Usuario Sensei';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 10,
        delay: 50,
        disable: false
    });
    initPlaylist();
    initRecommendations();
    initTopSongs();
    
    // Refresh AOS once after all initializations
    setTimeout(() => AOS.refresh(), 500);

    updateFavCount();
    updateDownloadCount();
    loadSong(songs[songIndex]);

    // Ocultar banner VIP después de 10 segundos con animación de "jalado"
    const vipBanner = document.querySelector('.promo-banner');
    if (vipBanner) {
        setTimeout(() => {
            // Fase 1: El perro jala el banner hacia la derecha
            vipBanner.classList.add('banner-exit');
            
            // Fase 2: Colapsar el espacio una vez que el banner está fuera de vista
            setTimeout(() => {
                vipBanner.classList.add('banner-exit-final');
                // Refrescar AOS para que las secciones suban suavemente
                setTimeout(() => {
                    vipBanner.style.display = 'none';
                    AOS.refresh();
                }, 800);
            }, 2000); // Esperar a que termine la animación de 2 segundos de salida
        }, 10000);
    }

    // Escuchar scroll en el contenedor principal para AOS
    document.querySelector('.app-main').addEventListener('scroll', () => {
        AOS.refresh();
    });

    // Cargar nombre de usuario y ocultar botón si ya existe
    const nameInput = document.getElementById('user-name-input');
    const nameDisplay = document.getElementById('user-name-display');
    const saveBtn = document.getElementById('save-profile-btn');
    
    if (nameInput) {
        const savedName = localStorage.getItem('sensei_user_name');
        if (savedName) {
            userName = savedName;
            nameDisplay.innerText = userName;
            nameDisplay.classList.remove('hidden');
            nameInput.classList.add('hidden');
            if (saveBtn) saveBtn.classList.add('hidden');
        } else {
            nameInput.value = userName;
        }
    }
});

// Perfil Logic
 const saveProfileBtn = document.getElementById('save-profile-btn');
 const userNameInput = document.getElementById('user-name-input');
 const userNameDisplay = document.getElementById('user-name-display');
 const saveSuccessMsg = document.getElementById('save-success-msg');
 
 if (saveProfileBtn) {
     saveProfileBtn.addEventListener('click', () => {
         userName = userNameInput.value.trim() || 'Usuario Sensei';
         localStorage.setItem('sensei_user_name', userName);
         
         // Actualizar texto estático
         if (userNameDisplay) {
             userNameDisplay.innerText = userName;
             userNameDisplay.classList.remove('hidden');
         }

         // Ocultar input y botón PERMANENTEMENTE en esta sesión
         userNameInput.classList.add('hidden');
         saveProfileBtn.classList.add('hidden');
         
         // Mostrar mensaje de éxito
         saveSuccessMsg.classList.remove('hidden');

         // Animación con GSAP para el mensaje
         gsap.from(saveSuccessMsg, { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });

         // Ocultar solo el mensaje de éxito después de 3 segundos, pero NO el botón/input
         setTimeout(() => {
             saveSuccessMsg.classList.add('hidden');
             // Al ocultar el mensaje, las estadísticas subirán automáticamente en el DOM
             AOS.refresh();
         }, 3000);
     });
 }

const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.getElementById('progress-bar');
const miniTitle = document.getElementById('mini-title');
const miniArtist = document.getElementById('mini-artist');
const miniCover = document.getElementById('mini-cover');

// Full Player Elements
const fullPlayer = document.getElementById('full-player');
const closeFullPlayerBtn = document.getElementById('close-full-player');
const miniPlayerBar = document.getElementById('mini-player');
const miniPlayerInfo = document.querySelector('.player-left');
const fpTitle = document.getElementById('fp-title');
const fpArtist = document.getElementById('fp-artist');
const fpCover = document.getElementById('fp-cover');
const fpBg = document.getElementById('fp-bg');
const fpPlayPauseBtn = document.getElementById('fp-play-pause');
const fpPrevBtn = document.getElementById('fp-prev');
const fpNextBtn = document.getElementById('fp-next');
const fpRepeatBtn = document.getElementById('fp-repeat');
const fpShuffleBtn = document.getElementById('fp-shuffle');
const fpOptionsBtn = document.getElementById('fp-options-btn');
const fpOptionsMenu = document.getElementById('fp-options-menu');
const optFavBtn = document.getElementById('opt-fav');
const optDownloadBtn = document.getElementById('opt-download');
const fpProgressFill = document.getElementById('fp-progress-fill');
const fpProgressBar = document.getElementById('fp-progress-bar');
const fpCurrentTime = document.getElementById('fp-current-time');
const fpDuration = document.getElementById('fp-duration');

let isPlaying = false;
let isRepeatOne = false;
let isShuffle = false;
let favorites = JSON.parse(localStorage.getItem('sensei_favs')) || [];

// Datos de las canciones (102 Pistas Sincronizadas)
const songs = [
    {
        title: "BEBE",
        artist: "6ix9ine Ft. Anuel AA",
        genre: "Regueton",
        src: "tracks/6ix9ine - BEBE ft. Anuel AA.mp3",
        cover: "https://images.squarespace-cdn.com/content/v1/58eef9c2f7e0abff4db78dc9/1535770144822-40AU0TG93OBZNWYYE3OQ/Screen+Shot+2018-08-31+at+7.47.38+PM.png?format=750w"
    },
    {
        title: "PA TI",
        artist: "6ix9ine ft. Yailin",
        genre: "Regueton",
        src: "tracks/6ix9ine - Pa Ti (feat. Yailin La Más Viral) (Official Music Video).mp3",
        cover: "https://i1.sndcdn.com/artworks-000200598950-szqjd2-t500x500.jpg"
    },
    {
        title: "A LA ANTIGUITA",
        artist: "Calibre 50",
        genre: "Vallenato",
        src: "tracks/A La Antigüita - Calibre 50 (LETRA).mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273fd7bf5ad7bbf66e04b1bffb0"
    },
    {
        title: "GIMME GIMME GIMME",
        artist: "ABBA",
        genre: "70 and 80",
        src: "tracks/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3",
        cover: "https://m.media-amazon.com/images/M/MV5BNzg4ZDE2NDAtMTA4Ni00NzUyLTk3NjUtZWU2ZTVkZWI0OTgwXkEyXkFqcGc@._V1_QL75_UY190_CR74,0,190,190_.jpg"
    },
    {
        title: "Faded",
        artist: "Alan Walker",
        genre: "Electronica",
        src: "tracks/Alan Walker - Faded.mp3",
        cover: "https://static.wikia.nocookie.net/electropedia/images/3/36/Faded_Alan_Walker_%28logo%29.jpg/revision/latest?cb=20170513171308&path-prefix=es"
    },
    {
        title: "Kamin cover",
        artist: "Cover Tiktok",
        genre: "Electronica",
        src: "tracks/kaim-tiktok.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdgpRWwk84LvKmPK5COlz2meF0EdlV0nTEvw&s"
    },
    {
        title: "Solo",
        artist: "Amenazzy ft. Lary Over",
        genre: "Regueton",
        src: "tracks/Amenazzy ft. Lary Over - Solo (Video Oficial).mp3",
        cover: "https://s.mxmcdn.net/images-storage/albums2/1/0/9/0/7/0/40070901_350_350.jpg"
    },
    {
        title: "Nacimos pa morir",
        artist: "Anuel ft. Jory",
        genre: "Regueton",
        src: "tracks/Anuel - Nacimos Pa Morir (Official Video) ft. Jory.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273a16fd43991f51ee4312b7519"
    },
    {
        title: "Ella y Yo",
        artist: "Aventura ft. Don Omar",
        genre: "Bachata",
        src: "tracks/Aventura - Ella y Yo (ft. Don Omar).mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2736bb920cebbe9cd79eccaf0e6"
    },
    {
        title: "Atrapado en Dos Amores",
        artist: "Baúl",
        genre: "Salsa",
        src: "tracks/Atrapado en Dos Amores  Letra Salsa.mp3",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/78/0a/f5780ae2-42bb-294c-ff1a-27b902ca8b81/artwork.jpg/3000x3000bb.jpg"
    },
    {
        title: "AMORFODA",
        artist: "Bad Bunny",
        genre: "Regueton",
        src: "tracks/BAD BUNNY - AMORFODA (Video Oficial).mp3",
        cover: "https://i.ytimg.com/vi/E6jIgT-38u8/maxresdefault.jpg"
    },
    {
        title: "SOY PEOR",
        artist: "Bad Bunny",
        genre: "Regueton",
        src: "tracks/BAD BUNNY - SOY PEOR (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "BARBIE GIRL",
        artist: "Aqua",
        genre: "Otros",
        src: "tracks/BARBIE GIRL - Aqua  Subtítulos inglés y español.mp3",
        cover: "https://upload.wikimedia.org/wikipedia/en/4/4c/Aquabarbie.jpg"
    },
    {
        title: "BELLAKEO",
        artist: "Peso Pluma ft. Anitta",
        genre: "Regueton",
        src: "tracks/BELLAKEO (Video Oficial) - Peso Pluma, Anitta.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "MAYORES",
        artist: "Becky G ft. Bad Bunny",
        genre: "Regueton",
        src: "tracks/Becky G, Bad Bunny - Mayores (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SIN PIJAMA",
        artist: "Becky G ft. Natti Natasha",
        genre: "Regueton",
        src: "tracks/Becky G, NATTI NATASHA - Sin Pijama (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CUANDO TE BESE",
        artist: "Becky G ft. Paulo Londra",
        genre: "Regueton",
        src: "tracks/Becky G, Paulo Londra - Cuando Te Besé (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "JUST THE WAY YOU ARE",
        artist: "Bruno Mars",
        genre: "Romantica",
        src: "tracks/Bruno Mars - Just The Way You Are (Lyrics).mp3",
        cover: "https://m.media-amazon.com/images/M/MV5BYTNkZTU4ZmItZDlmMy00MzFhLWJiMzAtMjliZWEzM2YzN2Y1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        title: "Burn It All Down",
        artist: "PVRIS",
        genre: "Otros",
        src: "tracks/Burn It All Down (ft. PVRIS)  Worlds 2021 - League of Legends.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrs7H13nkBXTAENpqSw5rIRgzOERlJAKdL0g&s"
    },
    {
        title: "Siempre te voy a querer",
        artist: "Calibre 50",
        genre: "Romantica",
        src: "tracks/Calibre 50 - Siempre te voy a querer (Letra) (Lyrics).mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b27320f047dc3f75953a831b7db7"
    },
    {
        title: "DISFRUTO",
        artist: "Carla Morrison",
        genre: "Romantica",
        src: "tracks/Carla Morrison - Disfruto (letra).mp3",
        cover: "https://images.genius.com/246f08d740fb0c470092b744dbd2cbab.500x500x1.jpg"
    },
    {
        title: "BAD",
        artist: "David Guetta & Showtek ft. Vassy",
        genre: "Electronica",
        src: "tracks/David Guetta & Showtek - Bad ft.Vassy (Lyrics Video).mp3",
        cover: "https://i.ytimg.com/vi/4tFktcmLl5M/maxresdefault.jpg"
    },
    {
        title: "FRONTEAMOS PORQUE PODEMOS",
        artist: "De La Ghetto ft. Daddy Yankee",
        genre: "Regueton",
        src: "tracks/De La Ghetto - Fronteamos Porque Podemos ft. Daddy Yankee, Yandel & Ñengo Flow [Official Video].mp3",
        cover: "https://i1.sndcdn.com/artworks-000127721038-pbu4o4-t1080x1080.jpg"
    },
    {
        title: "DEJANDO_HUELLAS",
        artist: "Los Gigantes Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Dejando Huellas, Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "DESPUES DE TI",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Después De Ti, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TREMOR",
        artist: "Dimitri Vegas, Martin Garrix, Like Mike",
        genre: "Electronica",
        src: "tracks/Dimitri Vegas, Martin Garrix, Like Mike - Tremor (Official Music Video).mp3",
        cover: "https://i1.sndcdn.com/artworks-000338799858-lprzob-t500x500.jpg"
    },
    {
        title: "DOS HOMBRES Y UN DESTINO",
        artist: "David Bustamante y Axel",
        genre: "Romantica",
        src: "tracks/Dos hombres y un destino- David Bustamante y Axel- (letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL ERROR",
        artist: "Los Gigantes Del Vallenato",
        genre: "Vallenato",
        src: "tracks/El Error, Los Gigantes Del Vallenato - Audio.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL CIGARRILLO",
        artist: "Ana Gabriel",
        genre: "Romantica",
        src: "tracks/El cigarrillo - Ana Gabriel (LetraLyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "En este mundo",
        artist: "Nigga",
        genre: "Romantica",
        src: "tracks/En este mundo - Nigga (Letra).mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b27329c3d17e74dcc33d8beb2f68"
    },
    {
        title: "ES UN SECRETO",
        artist: "Plan B",
        genre: "Regueton",
        src: "tracks/Es Un Secreto - Plan B [Letra  Lyrics].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Te Quiero",
        artist: "Nigga",
        genre: "Romantica",
        src: "tracks/Flex Te quiero.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2739f92d222a80a9bea9805a8eb"
    },
    {
        title: "HASTA LA RAIZ",
        artist: "Natalia Lafourcade",
        genre: "Romantica",
        src: "tracks/Hasta la Raíz - Natalia Lafourcade   LETRA.mp3",
        cover: "https://images.genius.com/5e53b7463b9983373c956d77959b6711.600x600x1.png"
    },
    {
        title: "FANTASMAS",
        artist: "Humbe",
        genre: "Romantica",
        src: "tracks/Humbe - fantasmas (Letra).mp3",
        cover: "https://animesher.com/orig/1/147/1471/14717/animesher.com_gif-tristeza-series-1471752.gif"
    },
    {
        title: "CORRE",
        artist: "Jesse & Joy",
        genre: "Romantica",
        src: "tracks/Jesse & Joy  Corre! [Letra].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "VITAMINA",
        artist: "Jombriel, DFZM",
        genre: "Regueton",
        src: "tracks/Jombriel, DFZM - Vitamina (LetraLyrics).mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2734b11635cbdec6917dd2c58b1"
    },
    {
        title: "NEVER SAY NEVER",
        artist: "Justin Bieber ft. Jaden",
        genre: "Romantica",
        src: "tracks/Justin Bieber - Never Say Never ft. Jaden.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TUSA",
        artist: "Karol G ft. Nicki Minaj",
        genre: "Regueton",
        src: "tracks/KAROL G, Nicki Minaj - Tusa (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LAMBADA",
        artist: "Kaoma",
        genre: "Otros",
        src: "tracks/Kaoma - Lambada (Official Video) 1989 HD.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwiLmXgxhBgx7WpFge67Aitqft0pQ61iLtTg&s"
    },
    {
        title: "ROSAS",
        artist: "La Oreja de Van Gogh",
        genre: "Romantica",
        src: "tracks/La Oreja de Van Gogh - Rosas (Vídeo Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LA PREGUNTA",
        artist: "J Alvarez",
        genre: "Regueton",
        src: "tracks/La Pregunta - J Alvarez [Letra  Lyrics].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LA QUEMONA",
        artist: "Master Boys",
        genre: "Regueton",
        src: "tracks/La Quemona Master Boys LetraLyrics.mp3",
        cover: "https://i.ytimg.com/vi/bc3z62HkFbs/maxresdefault.jpg"
    },
    {
        title: "LA TORMENTA DE ARENA",
        artist: "Dorian",
        genre: "Romantica",
        src: "tracks/La Tormenta De Arena - Dorian (letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EN CAMBIO NO",
        artist: "Laura Pausini",
        genre: "Romantica",
        src: "tracks/Laura Pausini - En Cambio No (Official Music Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "MACARENA",
        artist: "Los Del Rio",
        genre: "Otros",
        src: "tracks/Los Del Rio - Macarena (Bayside Boys Remix).mp3",
        cover: "https://i.ytimg.com/vi/ki2-xiMbQvU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCUE9xMqD16OpyT1-DETW8qvws8gA"
    },
    {
        title: "DEJAME ENTRAR",
        artist: "Makano",
        genre: "Regueton",
        src: "tracks/Makano - Dejame Entrar [Video Oficial].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Te Amo",
        artist: "Makano",
        genre: "Romantica",
        src: "tracks/Makano - Te Amo (Video Oficial).mp3",
        cover: "https://akamai.sscdn.co/uploadfile/letras/albuns/6/b/1/7/310471728900626.jpg"
    },
    {
        title: "SU NOMBRE EN MI CUADERNO",
        artist: "Makano ft. Josenid",
        genre: "Regueton",
        src: "tracks/Makano feat. Josenid - Su Nombre en mi Cuaderno [Video Oficial].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CUATRO BABYS",
        artist: "Maluma ft. Noriel",
        genre: "Regueton",
        src: "tracks/Maluma - Cuatro Babys (Official Video) ft. Trap Capos, Noriel, Bryant Myers, Juhn.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ANIMALS",
        artist: "Martin Garrix",
        genre: "Electronica",
        src: "tracks/Martin Garrix - Animals (Official Video).mp3",
        cover: "https://i.ytimg.com/vi/LvJdIYhC3Ck/maxresdefault.jpg"
    },
    {
        title: "ME BEFORE YOU",
        artist: "Louisa & Will",
        genre: "Romantica",
        src: "tracks/Me Before You - Louisa and Will - Photograph and Letter.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ME PARTE EL CORAZON",
        artist: "Daniel Calderón & Los Gigantes Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Me Parte El Corazón, Daniel Calderón & Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Micaela",
        artist: "Mishelle Master Boys",
        genre: "Regueton",
        src: "tracks/Micaela.mp3",
        cover: "https://i.ytimg.com/vi/bxl0cuevM_E/maxresdefault.jpg"
    },
    {
        title: "BILLIE JEAN",
        artist: "Michael Jackson",
        genre: "70 and 80",
        src: "tracks/Michael Jackson - Billie Jean (Official Video).mp3",
        cover: "https://www.eloriente.net/home/wp-content/uploads/2014/06/michael-jackson-billie-jean.jpg"
    },
    {
        title: "AMIGA",
        artist: "Miguel Bosé",
        genre: "70 and 80",
        src: "tracks/Miguel Bose - Amiga.mp3",
        cover: "https://akamai.sscdn.co/uploadfile/letras/albuns/7/e/3/6/438731433595119.jpg"
    },
    {
        title: "MIENTELE AL CORAZON",
        artist: "Miguel Morales",
        genre: "Vallenato",
        src: "tracks/Miéntele Al Corazón, Miguel Morales, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CORAZON",
        artist: "Moy Bobadilla - Grupo Firme",
        genre: "Vallenato",
        src: "tracks/Moy Bobadilla - Grupo Firme - Corazón (LetraLyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NIÑA BONITA",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "tracks/Niña Bonita, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL TREN QUE NOS SEPARA",
        artist: "Original",
        genre: "Romantica",
        src: "tracks/ORIGINAL El Tren Que Nos Separa (Letra) .....mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "OLVIDALA",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "tracks/Olvídala, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TE VAS",
        artist: "Ozuna",
        genre: "Regueton",
        src: "tracks/Ozuna - Te Vas (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Perdoname",
        artist: "La Factoría ft. Eddy Lover",
        genre: "Romantica",
        src: "tracks/Perdóname - La Factoría ft. Eddy Lover (Video Ofical HD).mp3",
        cover: "https://i.ytimg.com/vi/fPiVzM4bMOA/maxresdefault.jpg"
    },
    {
        title: "Phoenix",
        artist: "Cailin Russo y Chrissy Costanza",
        genre: "Otros",
        src: "tracks/Phoenix (ft. Cailin Russo and Chrissy Costanza)  Worlds 2019 - League of Legends.mp3",
        cover: "https://cdn.dribbble.com/userupload/11462293/file/original-5bb6bc1193c08cd04ab0df28c0786515.jpg"
    },
    {
        title: "PRESUMIDA",
        artist: "Los Diablitos",
        genre: "Vallenato",
        src: "tracks/Presumida, Los Diablitos, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "QUE TIENE ELLA",
        artist: "Unknown",
        genre: "Romantica",
        src: "tracks/Qué tiene ella que no tenga yo_.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "QUITAME ESE HOMBRE",
        artist: "Pilar Montenegro",
        genre: "Romantica",
        src: "tracks/Quítame Ese Hombre Del Corazón - Pilar Montenegro   Letra  Norteña.mp3",
        cover: "https://animesher.com/orig/0/60/603/6031/animesher.com_encierro-lluvia-tristeza-603198.jpg"
    },
    {
        title: "SALVAME",
        artist: "RBD",
        genre: "Romantica",
        src: "tracks/RBD  Sálvame [Letra].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "HOLA BEBE",
        artist: "RD Maravilla",
        genre: "Regueton",
        src: "tracks/RD Maravilla - Hola Bebe (Te Lo Hundo).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LOCO LOCO",
        artist: "RD Maravilla ft. El Original",
        genre: "Regueton",
        src: "tracks/RD Maravilla Feat. El Original - Loco loco (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "RECUERDAME",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Recuérdame, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SABES",
        artist: "Reik",
        genre: "Romantica",
        src: "tracks/Reik - Sabes (Letra  Lyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SI TU LO DEJAS",
        artist: "Rvssian ft. Bad Bunny",
        genre: "Regueton",
        src: "tracks/Rvssian - Si Tu Lo Dejas FT Bad Bunny X Farruko X Nicky Jam X King Kosa.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LOVE YOU LIKE A LOVE SONG",
        artist: "Selena Gomez",
        genre: "Romantica",
        src: "tracks/Selena Gomez - Love You Like a Love Song (Lyrics) no one compares you stand alone.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ME MUERO POR ESTAR CONTIGO",
        artist: "Silvana Di Lorenzo",
        genre: "Romantica",
        src: "tracks/Silvana Di Lorenzo Me muero por estar contigo (VIDEO).mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bHaVLciucHJOE6RXazLt-5Mi0Z68LRPxkQ&s"
    },
    {
        title: "SIN TU AMOR",
        artist: "Luis Mateus",
        genre: "Vallenato",
        src: "tracks/Sin Tu Amor - Luis Mateus (Video Lyric)  Vallenato Romántico.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SOLO ME FALTAS TU",
        artist: "Dinastía Romero",
        genre: "Vallenato",
        src: "tracks/Solo Me Faltas Tú, Dinastía Romero, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TE AMARE",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Te Amaré, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Te Amo tanto",
        artist: "Nigga",
        genre: "Romantica",
        src: "tracks/Te Amo Tanto.mp3",
        cover: "https://i.ytimg.com/vi/6QYcYUATQdw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA7iQtcpRhdApGHHRnsDYOjb8BSEQ"
    },
    {
        title: "TE SORPRENDERAS",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Te Sorprenderás, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NO ME ACUERDO",
        artist: "Thalia ft. Natti Natasha",
        genre: "Regueton",
        src: "tracks/Thalia, NATTI NATASHA - No Me Acuerdo (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "IN THIS SHIRT",
        artist: "The Irrepressibles",
        genre: "Romantica",
        src: "tracks/The Irrepressibles - In This Shirt (Sub. Español).mp3",
        cover: "https://i1.sndcdn.com/artworks-000663988471-2eooz2-t500x500.jpg"
    },
    {
        title: "TRES NOCHES",
        artist: "Jesús Manuel",
        genre: "Vallenato",
        src: "tracks/Tres Noches, Jesús Manuel, Vídeo Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TRIGUENITA",
        artist: "Binomio De Oro",
        genre: "Vallenato",
        src: "tracks/Triguenita, Binomio De Oro, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "UN OSITO DORMILON",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "tracks/Un Osito Dormilón, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Me acuerdo",
        artist: "Vico C",
        genre: "Romantica",
        src: "tracks/Vico C Me acuerdo.mp3",
        cover: "https://d3e6ckxkrs5ntg.cloudfront.net/photos/images/19746849/original/resize:600x600/crop:x0y28w1000h750/aspect:1.0/hash:1464359685/1408851199_695328360557496_4431409542517171851_o.jpg?1464359685"
    },
    {
        title: "VIVAMOS LO NUESTRO",
        artist: "Miguel Morales",
        genre: "Vallenato",
        src: "tracks/Vivamos Lo Nuestro, Miguel Morales, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "VOLVER",
        artist: "Los Inquietos del Vallenato",
        genre: "Vallenato",
        src: "tracks/Volver, Los Inquietos del Vallenato - Video Oficial.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Warriors",
        artist: "ft. 2WEI y Edda Hayes",
        genre: "Otros",
        src: "tracks/Warriors  Season 2020 Cinematic - League of Legends (ft. 2WEI and Edda Hayes).mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273f8fa082806184fcb032d8e0a"
    },
    {
        title: "APARENTEMENTE",
        artist: "Yaga y Mackie ft. Arcangel & De La Ghetto",
        genre: "Regueton",
        src: "tracks/Yaga y Mackie feat. Arcangel y de La Ghetto - Aparentemente (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "PAST LIVES",
        artist: "sapientdream",
        genre: "Romantica",
        src: "tracks/sapientdream - past lives (Subtitulada Español).mp3",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/10/a9/88/10a98827-ed7e-3077-6cd8-9cc96b764d74/cover.jpg/600x600cc.webp"
    },
    { 
        title: "Eveillez-vous",
        artist: "avec Valerie Broussard",
        genre: "Otros",
        src: "tracks/Éveillez-vous (avec Valerie Broussard)  Cinématique de League of Legends  Saison 2019.mp3",
        cover: "https://i.ytimg.com/vi/zF5Ddo9JdpY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDKL44ewCHdZXSQt-v7OtbFQZSeyA"
    },
    { 
        title: "КАМIM", 
        artist: "EMIN feat. JONY", 
        genre: "Electronica", 
        src: "tracks/EMIN feat. JONY - КАМИН.mp3", 
        cover: "https://i.scdn.co/image/ab67616d0000b273870c1c64b1d77eb4456e4283" 
    }, 
    { 
        title: "Lo Aprendí de Ti", 
        artist: "HA-ASH", 
        genre: "Romantica", 
        src: "tracks/Ha-Ash - Lo Aprendí de Ti.mp3", 
        cover: "https://i.scdn.co/image/ab67616d0000b273996dd344d4aa79463b40bb8f" 
    }, 
    { 
        title: "Perdón Perdón", 
        artist: "HA-ASH", 
        genre: "Romantica", 
        src: "tracks/HA-ASH - Perdón, Perdón.mp3", 
        cover: "https://i.scdn.co/image/ab67616d0000b273996dd344d4aa79463b40bb8f" 
    }, 
    { 
        title: "Te Dejo En Libertad", 
        artist: "HA-ASH", 
        genre: "Romantica", 
        src: "tracks/HA-ASH - Te Dejo En Libertad.mp3", 
        cover: "https://i.scdn.co/image/ab67616d0000b273996dd344d4aa79463b40bb8f" 
    }, 
    { 
        title: "Todo No Fue Suficiente", 
        artist: "HA-ASH", 
        genre: "Romantica", 
        src: "tracks/HA-ASH - Todo No Fue Suficiente (Letra).mp3", 
        cover: "https://i.ytimg.com/vi/5AaQ3RWlJuQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAzRA22WZ8cobpz-LTA2mjR_J_2Rg" 
    }, 
    { 
        title: "Un Ángel Llora", 
        artist: "Annette Moreno", 
        genre: "Otros", 
        src: "tracks/Annette Moreno - Un Ángel Llora (Video Oficial).mp3", 
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/68/fc/b6/68fcb610-4456-e372-499a-2255cdc48a17/828357003426.jpg/3000x3000bb.jpg" 
    }, 
    { 
        title: "Guardian De Mi Corazón", 
        artist: "Annette Moreno", 
        genre: "Otros", 
        src: "tracks/Annette Moreno - Guardian De Mi Corazón (Video Oficial).mp3", 
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/68/fc/b6/68fcb610-4456-e372-499a-2255cdc48a17/828357003426.jpg/3000x3000bb.jpg" 
    }, 
    { 
        title: "Devuélveme El Corazón", 
        artist: "Sebastián Yatra", 
        genre: "Otros", 
        src: "tracks/Sebastián Yatra - Devuélveme El Corazón.mp3", 
        cover: "https://i.scdn.co/image/ab67616d0000b2732ee91833ee0b20ad2554256f" 
    }, 
    { 
        title: "Cómo Mirarte", 
        artist: "Sebastián Yatra", 
        genre: "Otros", 
        src: "tracks/Sebastián Yatra - Cómo Mirarte.mp3", 
        cover: "https://i.ytimg.com/vi/fp6TuMZOyj4/maxresdefault.jpg" 
    }, 
    { 
        title: "Hasta el fin del mundo", 
        artist: "Jennifer Peña", 
        genre: "Romantica", 
        src: "tracks/Hasta el fin del mundo - Jennifer Peña.mp3", 
        cover: "https://i1.sndcdn.com/artworks-NFecCvyAwuBh0mxd-qzDskg-t1080x1080.jpg" 
    }, 
    { 
        title: "Simplemente Amigos", 
        artist: "Ana Gabriel", 
        genre: "Romantica", 
        src: "tracks/Ana Gabriel  Simplemente Amigos.mp3", 
        cover: "https://i1.sndcdn.com/artworks-FNE3Y5vDbevyc7Ev-LrNGBQ-t1080x1080.jpg" 
    },
    {
        title: "DISTINTOS DESTINOS",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "tracks/Distintos Destinos, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://i.ytimg.com/vi/IKzQ6O80IW8/sddefault.jpg"
    },
    {
        title: "LA ABEJITA",
        artist: "La dinastía romero",
        genre: "Vallenato",
        src: "tracks/La abejita - La dinastía romero.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LO DULCE DE UN TE QUIERO",
        artist: "Los chiches del vallenato",
        genre: "Vallenato",
        src: "tracks/Lo dulce de un te quiero - Los chiches del vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ME GUSTAS MUCHO",
        artist: "Luis Mateus",
        genre: "Vallenato",
        src: "tracks/Me Gustas Mucho Luis Mateus Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ME ILUSIONE",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "tracks/Me Ilusioné, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://i.ytimg.com/vi/5YYmQsqrvc8/maxresdefault.jpg"
    },
    {
        title: "ME DEJARON",
        artist: "Los amantes del vallenato",
        genre: "Vallenato",
        src: "tracks/Me dejaron - Los amantes del vallenato.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbxtvSLkY6DG3xeVbkdkYS0v8TGq04KsbF3w&s"
    },
    {
        title: "NO ME PIDAS QUE TE OLVIDE",
        artist: "Ivan Villazón",
        genre: "Vallenato",
        src: "tracks/No me pidas que te olvide - Ivan Villazón.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "PERTENECE A TI",
        artist: "Los valbuena",
        genre: "Vallenato",
        src: "tracks/Pertenece a ti - Los valbuena.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "PORQUE ME ENAMORE DE TI",
        artist: "Los amantes del vallenato",
        genre: "Vallenato",
        src: "tracks/Porque me enamore de ti - Los amantes del vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SOLO AMAME",
        artist: "Los Inquietos del vallenato",
        genre: "Vallenato",
        src: "tracks/Solo ámame - Los Inquietos del vallenato.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273e0a2cd1b76f9ec36c47a2e99"
    },
    {
        title: "VOLVER V2",
        artist: "Los inquietos del vallenato",
        genre: "Vallenato",
        src: "tracks/Volver - Los inquietos del vallenato.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273e0a2cd1b76f9ec36c47a2e99"
    },
    {
        title: "SI TU ESTUVIERAS",
        artist: "Los inquietos del vallenato",
        genre: "Vallenato",
        src: "tracks/si tú estuvieras - Los inquietos del vallenato.mp3",
        cover: "https://i.ytimg.com/vi/rjcTs-y6uwA/sddefault.jpg?v=67a69229"
    },
    {
        title: "ADIOS AMOR",
        artist: "Clan Vallenato",
        genre: "Vallenato",
        src: "tracks/Adios Amor - Clan Vallenato.mp3",
        cover: "https://s.mxmcdn.net/images-storage/albums5/5/4/6/2/1/3/32312645_500_500.jpg"
    },
    {
        title: "ATADO A TUS SENTIMIENTOS",
        artist: "Clan Vallenato",
        genre: "Vallenato",
        src: "tracks/Atado A Tus Sentimientos - Clan Vallenato (Letra) @paseosvallenatos9149.mp3",
        cover: "https://s.mxmcdn.net/images-storage/albums5/5/4/6/2/1/3/32312645_500_500.jpg"
    },
    {
        title: "CORAZON ATREVIDO",
        artist: "Los Comandantes Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Corazón Atrevido - Los Comandantes Del Vallenato.mp3",
        cover: "https://i.ytimg.com/vi/vc-LcxFMvCM/maxresdefault.jpg"
    },
    {
        title: "COMO EXPRESAR LO QUE SIENTO",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "tracks/Cómo Expresar Lo Que Siento, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://i.ytimg.com/vi/siwNtC75DOQ/maxresdefault.jpg"
    },
    {
        title: "DESPUES DE AMAR",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Después De Amar, Los Inquietos Del Vallenato - Audio.mp3",
        cover: "https://i.ytimg.com/vi/z9h0mD7rwJg/maxresdefault.jpg"
    },
    {
        title: "NO PUDE OLVIDARTE",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "tracks/No Pude Olvidarte, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://i.ytimg.com/vi/TcQO38KcZhA/sddefault.jpg"
    },
    {
        title: "NO QUEDA NADA",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "tracks/No Queda Nada, Los Inquietos Del Vallenato - Audio.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2730757dcbd35cab77d94e3f934"
    },
    {
        title: "NO TE OLVIDARE",
        artist: "Jorge Celedón",
        genre: "Vallenato",
        src: "tracks/No Te Olvidare - Jorge Celedon  Letra.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273b901c0f988e169aa37ad823a"
    },
    {
        title: "NO PODRAN SEPARARNOS",
        artist: "Jorge Celedón",
        genre: "Vallenato",
        src: "tracks/No podrán separarnos jorge celedon.mp3",
        cover: "https://i.ytimg.com/vi/6rYK0rBM1yE/maxresdefault.jpg"
    },
    {
        title: "Y NO FUISTE MIA",
        artist: "Los Comandantes Del Vallenato",
        genre: "Vallenato",
        src: "tracks/Y No Fuiste Mía - Los Comandantes Del Vallenato.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273e208462dfd422f5c0458300a"
    }
];

let songIndex = 0;
let downloads = JSON.parse(localStorage.getItem('sensei_downloads')) || [];
let originalSongs = [...songs]; // Guardar el orden original para cuando se desactive shuffle
let currentSongs = [...songs];

// --- Core UI Functions ---

function initPlaylist(filteredSongs = currentSongs) {
    const playlistContainer = document.getElementById('playlist');
    if (!playlistContainer) return; 
    playlistContainer.innerHTML = '';
    renderGrid(filteredSongs, playlistContainer);
}

function initRecommendations() {
    const recContainer = document.getElementById('recommendations-grid');
    const recs = [...songs].sort(() => 0.5 - Math.random()).slice(0, 4);
    renderGrid(recs, recContainer);
}

function initTopSongs() {
    const topContainer = document.getElementById('top-songs-grid');
    // Simulamos top con las primeras 4 canciones o aleatorias por ahora
    const top = [...songs].slice(0, 4); 
    renderGrid(top, topContainer);
}

function renderGrid(songList, container) {
    songList.forEach((song, index) => {
        const isFav = favorites.includes(song.src);
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 4) * 50); // Escalonado ligero
        card.innerHTML = `
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${song.src}')">
                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="card-art">
                <img src="${song.cover}" alt="${song.title}" onerror="this.src='../logo_sensei.jpg'; this.onerror=null;">
                <div class="card-play-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="card-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            const originalIndex = songs.findIndex(s => s.src === song.src);
            songIndex = originalIndex;
            playSongWithAnimation(card);
        });
        
        container.appendChild(card);
    });
}

function playSongWithAnimation(card) {
    gsap.to(card, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    loadSong(songs[songIndex]);
    playSong();
}

function toggleFavorite(event, src) {
    event.stopPropagation();
    if (favorites.includes(src)) {
        favorites = favorites.filter(f => f !== src);
    } else {
        favorites.push(src);
    }
    localStorage.setItem('sensei_favs', JSON.stringify(favorites));
    updateFavCount();
    
    const btn = event.currentTarget;
    btn.classList.toggle('active');
    btn.querySelector('i').className = btn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
    
    if (document.getElementById('section-favorites').classList.contains('active')) {
        renderFavorites();
    }
}

function updateFavCount() {
    document.getElementById('fav-count').innerText = favorites.length;
}

function renderFavorites() {
    const favGrid = document.getElementById('favorites-grid');
    const favSongs = songs.filter(s => favorites.includes(s.src));
    favGrid.innerHTML = '';
    if (favSongs.length === 0) {
        favGrid.innerHTML = '<p style="grid-column: span 2; text-align: center; opacity: 0.5;">No tienes favoritos aún.</p>';
    } else {
        renderGrid(favSongs, favGrid);
    }
}

// --- Navigation Logic ---
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;
        switchSection(section);
    });
});

function switchSection(section) {
    // UI Update
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
        if (n.dataset.section === section) n.classList.add('active');
    });
    
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    const targetSection = document.getElementById(`section-${section}`);
    if (targetSection) targetSection.classList.add('active');
    
    if (section === 'favorites') renderFavorites();
    if (section === 'profile') renderDownloads();
    
    // Guardar estado en el historial para el botón atrás
    if (history.state?.section !== section) {
        history.pushState({ section: section }, '', `#${section}`);
    }
    
    window.scrollTo(0, 0);
    AOS.refresh();
}

// Manejo del botón atrás del navegador/sistema
window.addEventListener('popstate', (e) => {
    if (fullPlayer.style.transform === 'translate(-50%, 0%)') {
        closeFullPlayer();
    } else if (e.state && e.state.section) {
        switchSection(e.state.section);
    } else {
        switchSection('home');
    }
});

// Inicializar estado del historial al cargar
if (!history.state) {
    history.replaceState({ section: 'home' }, '', '#home');
}

// --- Search Logic ---
document.getElementById('search-input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const results = songs.filter(s => 
        s.title.toLowerCase().includes(term) || 
        s.artist.toLowerCase().includes(term) ||
        s.genre.toLowerCase().includes(term)
    );
    const grid = document.getElementById('search-results');
    grid.innerHTML = term ? '' : '<p style="grid-column: span 2; text-align: center; opacity: 0.5;">Escribe algo para buscar...</p>';
    if (term) renderGrid(results, grid);
});

// --- Filter Logic ---
document.getElementById('genre-filter').addEventListener('change', (e) => {
    const genre = e.target.value;
    currentSongs = genre === 'All' ? [...songs] : songs.filter(s => s.genre === genre);
    initPlaylist(currentSongs);
    AOS.refresh();
});

// --- Player Core ---
function openFullPlayer() {
    gsap.to(fullPlayer, { y: 0, xPercent: -50, duration: 0.6, ease: "power4.out" });
    history.pushState({ section: history.state?.section, player: 'open' }, '', '#player');
}

function closeFullPlayer() {
    gsap.to(fullPlayer, { y: "100%", xPercent: -50, duration: 0.5, ease: "power4.in" });
}

// Swipe down to close logic
let startY = 0;
fullPlayer.addEventListener('touchstart', (e) => startY = e.touches[0].clientY);
fullPlayer.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 50) {
        gsap.set(fullPlayer, { y: diff, xPercent: -50 });
    }
});
fullPlayer.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 150) {
        closeFullPlayer();
    } else {
        gsap.to(fullPlayer, { y: 0, xPercent: -50, duration: 0.3 });
    }
});

if (miniPlayerInfo) {
    miniPlayerInfo.addEventListener('click', openFullPlayer);
}

closeFullPlayerBtn.addEventListener('click', closeFullPlayer);

async function loadSong(song) {
    miniTitle.innerText = song.title;
    miniArtist.innerText = song.artist;
    miniCover.src = song.cover;
    miniCover.onerror = () => miniCover.src = '../logo_sensei.jpg';
    
    // Full Player Update
    fpTitle.innerText = song.title;
    fpArtist.innerText = song.artist;
    fpCover.src = song.cover;
    fpBg.style.backgroundImage = `url('${song.cover}')`;
    fpCover.onerror = () => fpCover.src = '../logo_sensei.jpg';
    
    // Optimización de carga: Solo resetear si es una canción diferente
    if (audio.dataset.currentSrc === song.src) return;

    audio.pause();
    audio.dataset.currentSrc = song.src;

    // Solo cargamos directamente desde red o caché del Service Worker
    audio.src = song.src;
    audio.preload = "auto";
    
    // REPRODUCCIÓN INMEDIATA: No esperar a load() si ya se llamó a play()
    if (isPlaying) {
        audio.play().catch(e => console.log("Auto-play bloqueado por el navegador"));
    }
    
    preloadNextSong();

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            artwork: [
                { src: song.cover, sizes: '96x96', type: 'image/png' },
                { src: song.cover, sizes: '128x128', type: 'image/png' },
                { src: song.cover, sizes: '192x192', type: 'image/png' },
                { src: song.cover, sizes: '256x256', type: 'image/png' },
                { src: song.cover, sizes: '384x384', type: 'image/png' },
                { src: song.cover, sizes: '512x512', type: 'image/png' },
            ]
        });
        
        // Registrar acciones del sistema
        navigator.mediaSession.setActionHandler('play', playSong);
        navigator.mediaSession.setActionHandler('pause', pauseSong);
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);
        
        // Soporte para buscar (opcional)
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.seekTime) audio.currentTime = details.seekTime;
        });
    }
}

function preloadNextSong() {
    const nextIndex = (songIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    
    // Usamos una etiqueta link prefetch para el siguiente audio
    let prefetchLink = document.getElementById('next-song-prefetch');
    if (!prefetchLink) {
        prefetchLink = document.createElement('link');
        prefetchLink.id = 'next-song-prefetch';
        prefetchLink.rel = 'prefetch';
        prefetchLink.as = 'audio';
        document.head.appendChild(prefetchLink);
    }
    prefetchLink.href = nextSong.src;
}

function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    fpPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Reproducción directa
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Error al reproducir:", error);
        });
    }

    gsap.to('#mini-player', { y: 0, opacity: 1, duration: 0.3 });
    gsap.fromTo(fpPlayPauseBtn, { scale: 0.8 }, { scale: 1, duration: 0.2, ease: "back.out(2)" });

    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
    }
}

function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    fpPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
    
    gsap.fromTo(fpPlayPauseBtn, { scale: 1.2 }, { scale: 1, duration: 0.2, ease: "power2.out" });

    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

// Event Listeners
playPauseBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
fpPlayPauseBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
nextBtn.addEventListener('click', nextSong);
fpNextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
fpPrevBtn.addEventListener('click', prevSong);

fpRepeatBtn.addEventListener('click', () => {
    isRepeatOne = !isRepeatOne;
    fpRepeatBtn.classList.toggle('active-repeat', isRepeatOne);
    // Desactivar shuffle si se activa repeat one (opcional, según preferencia)
    // if (isRepeatOne && isShuffle) toggleShuffle();
});

if (fpShuffleBtn) {
    fpShuffleBtn.addEventListener('click', toggleShuffle);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    fpShuffleBtn.classList.toggle('active-repeat', isShuffle); // Usamos la misma clase de brillo
    
    if (isShuffle) {
        // Mezclar canciones manteniendo la actual en su posición si es posible
        const currentSong = songs[songIndex];
        let remainingSongs = songs.filter((_, i) => i !== songIndex);
        
        // Fisher-Yates shuffle
        for (let i = remainingSongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remainingSongs[i], remainingSongs[j]] = [remainingSongs[j], remainingSongs[i]];
        }
        
        // Re-ensamblar: canción actual primero, luego el resto mezclado
        // Esto evita que la música se detenga o salte bruscamente
        const shuffled = [currentSong, ...remainingSongs];
        songs.splice(0, songs.length, ...shuffled);
        songIndex = 0;
    } else {
        // Restaurar orden original
        const currentSong = songs[songIndex];
        songs.splice(0, songs.length, ...originalSongs);
        songIndex = songs.findIndex(s => s.src === currentSong.src);
    }
}

// --- Options Menu & Downloads Logic ---

if (fpOptionsBtn) {
    fpOptionsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fpOptionsMenu.classList.toggle('hidden');
    });
}

// Cerrar menú al hacer click fuera
document.addEventListener('click', () => {
    if (fpOptionsMenu) fpOptionsMenu.classList.add('hidden');
});

if (optFavBtn) {
    optFavBtn.addEventListener('click', () => {
        const currentSong = songs[songIndex];
        toggleFavoriteManual(currentSong.src);
        fpOptionsMenu.classList.add('hidden');
    });
}

if (optDownloadBtn) {
    optDownloadBtn.addEventListener('click', () => {
        const currentSong = songs[songIndex];
        downloadSong(currentSong);
        fpOptionsMenu.classList.add('hidden');
    });
}

function toggleFavoriteManual(src) {
    if (favorites.includes(src)) {
        favorites = favorites.filter(f => f !== src);
    } else {
        favorites.push(src);
    }
    localStorage.setItem('sensei_favs', JSON.stringify(favorites));
    updateFavCount();
    // Actualizar grids si están visibles
    if (document.getElementById('section-favorites').classList.contains('active')) renderFavorites();
    initPlaylist(); // Refrescar iconos en la lista principal
}

async function downloadSong(song) {
    if (!downloads.some(d => d.src === song.src)) {
        updateDownloadStatus(song.src, 'descargando');
        
        try {
            // Usamos el Cache API directamente en lugar de IndexedDB
            const cache = await caches.open('sensei-v36');
            await cache.add(song.src);
            
            downloads.push(song);
            localStorage.setItem('sensei_downloads', JSON.stringify(downloads));
            updateDownloadCount();
            if (document.getElementById('section-profile').classList.contains('active')) renderDownloads();
            alert(`"${song.title}" se ha descargado para escuchar offline.`);
        } catch (err) {
            console.error('Error al descargar:', err);
            alert(`Error al descargar "${song.title}".`);
        }
    } else {
        alert("Esta canción ya está en tus descargas.");
    }
}

function updateDownloadStatus(src, status) {
    // Buscar si la card está visible en el perfil y actualizar el badge
    const downloadCards = document.querySelectorAll('#downloads-grid .card');
    downloadCards.forEach(card => {
        // Esta es una ayuda visual, la lógica principal es el almacenamiento
    });
}

function updateDownloadCount() {
    const countEl = document.getElementById('download-count');
    if (countEl) countEl.innerText = downloads.length;
}

function renderDownloads() {
    const downloadsGrid = document.getElementById('downloads-grid');
    if (!downloadsGrid) return;
    downloadsGrid.innerHTML = '';
    if (downloads.length === 0) {
        downloadsGrid.innerHTML = '<p style="grid-column: span 2; text-align: center; opacity: 0.5;">No tienes canciones descargadas.</p>';
    } else {
        // Renderizar grid normal pero con un distintivo de descarga si se desea
        downloads.forEach((song, index) => {
            const isFav = favorites.includes(song.src);
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${song.src}')">
                    <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <div class="card-art">
                    <img src="${song.cover}" alt="${song.title}" onerror="this.src='../logo_sensei.jpg'; this.onerror=null;">
                    <div class="card-play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="card-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
                <span class="download-status-badge"><i class="fas fa-check-circle"></i> OFF</span>
            `;
            
            card.addEventListener('click', () => {
                const originalIndex = songs.findIndex(s => s.src === song.src);
                if (originalIndex !== -1) {
                    songIndex = originalIndex;
                    playSongWithAnimation(card);
                }
            });
            
            downloadsGrid.appendChild(card);
        });
        AOS.refresh();
    }
}

audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    fpProgressFill.style.width = `${progressPercent}%`;
    
    // Update labels
    fpCurrentTime.innerText = formatTime(currentTime);
    if (!isNaN(duration)) {
        fpDuration.innerText = formatTime(duration);
        
        // Sincronizar posición con el sistema (opcional pero recomendado)
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setPositionState({
                duration: duration,
                playbackRate: audio.playbackRate,
                position: currentTime
            });
        }
    }
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

audio.addEventListener('ended', () => {
    if (isRepeatOne) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

progressBar.addEventListener('click', (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

fpProgressBar.addEventListener('click', (e) => {
    const width = fpProgressBar.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// --- Matrix Background ---
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('matrix-bg').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ccff";
    ctx.font = fontSize + "px arial";
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);
