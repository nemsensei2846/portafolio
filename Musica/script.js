/**
 * FBI_AUDIO_DECRYPTOR - CORE LOGIC
 */

const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');

let isPlaying = false;
let isRepeat = false;
let isShuffle = false;

// Datos de las canciones (Actualización Final - 65 Pistas Detectadas)
const songs = [
    {
        title: "PA_TI",
        artist: "6ix9ine ft. Yailin",
        genre: "Regueton",
        src: "hacking/6ix9ine - Pa Ti (feat. Yailin La Más Viral) (Official Music Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "A_LA_ANTIGÜITA",
        artist: "Calibre 50",
        genre: "Otros",
        src: "hacking/A La Antigüita - Calibre 50 (LETRA).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NACIMOS_PA_MORIR",
        artist: "Anuel ft. Jory",
        genre: "Regueton",
        src: "hacking/Anuel - Nacimos Pa Morir (Official Video) ft. Jory.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "AMORFODA",
        artist: "Bad Bunny",
        genre: "Regueton",
        src: "hacking/BAD BUNNY - AMORFODA (Video Oficial).mp3",
        cover: "https://i.ytimg.com/vi/E6jIgT-38u8/maxresdefault.jpg"
    },
    {
        title: "SOY_PEOR",
        artist: "Bad Bunny",
        genre: "Regueton",
        src: "hacking/BAD BUNNY - SOY PEOR (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "BELLAKEO",
        artist: "Peso Pluma ft. Anitta",
        genre: "Regueton",
        src: "hacking/BELLAKEO (Video Oficial) - Peso Pluma, Anitta.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "MAYORES",
        artist: "Becky G ft. Bad Bunny",
        genre: "Regueton",
        src: "hacking/Becky G, Bad Bunny - Mayores (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SIN_PIJAMA",
        artist: "Becky G ft. Natti Natasha",
        genre: "Regueton",
        src: "hacking/Becky G, NATTI NATASHA - Sin Pijama (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CUANDO_TE_BESE",
        artist: "Becky G ft. Paulo Londra",
        genre: "Regueton",
        src: "hacking/Becky G, Paulo Londra - Cuando Te Besé (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "JUST_THE_WAY_YOU_ARE",
        artist: "Bruno Mars",
        genre: "Romantica",
        src: "hacking/Bruno Mars - Just The Way You Are (Lyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SIEMPRE_TE_VOY_A_QUERER",
        artist: "Calibre 50",
        genre: "Romantica",
        src: "hacking/Calibre 50 - Siempre te voy a querer (Letra) (Lyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "DISFRUTO",
        artist: "Carla Morrison",
        genre: "Romantica",
        src: "hacking/Carla Morrison - Disfruto (letra).mp3",
        cover: "https://images.genius.com/246f08d740fb0c470092b744dbd2cbab.500x500x1.jpg"
    },
    {
        title: "FRONTEAMOS_PORQUE_PODEMOS",
        artist: "De La Ghetto ft. Daddy Yankee",
        genre: "Regueton",
        src: "hacking/De La Ghetto - Fronteamos Porque Podemos ft. Daddy Yankee, Yandel & Ñengo Flow [Official Video].mp3",
        cover: "https://i1.sndcdn.com/artworks-000127721038-pbu4o4-t1080x1080.jpg"
    },
    {
        title: "DEJANDO_HUELLAS",
        artist: "Los Gigantes Del Vallenato",
        genre: "Vallenato",
        src: "hacking/Dejando Huellas, Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "DESPUES_DE_TI",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "hacking/Después De Ti, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "DOS_HOMBRES_Y_UN_DESTINO",
        artist: "David Bustamante y Axel",
        genre: "Romantica",
        src: "hacking/Dos hombres y un destino- David Bustamante y Axel- (letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL_ERROR",
        artist: "Los Gigantes Del Vallenato",
        genre: "Vallenato",
        src: "hacking/El Error, Los Gigantes Del Vallenato - Audio.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL_CIGARRILLO",
        artist: "Ana Gabriel",
        genre: "Romantica",
        src: "hacking/El cigarrillo - Ana Gabriel (LetraLyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ES_UN_SECRETO",
        artist: "Plan B",
        genre: "Regueton",
        src: "hacking/Es Un Secreto - Plan B [Letra  Lyrics].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "HEROIC_EPIC_BEAT",
        artist: "Aidan x Maxxton",
        genre: "Otros",
        src: "hacking/HEROIC Hard Epic String Rap Beat  Prod. By Aidan x Maxxton.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "HASTA_LA_RAIZ",
        artist: "Natalia Lafourcade",
        genre: "Romantica",
        src: "hacking/Hasta la Raíz - Natalia Lafourcade   LETRA.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "FANTASMAS",
        artist: "Humbe",
        genre: "Romantica",
        src: "hacking/Humbe - fantasmas (Letra).mp3",
        cover: "https://animesher.com/orig/1/147/1471/14717/animesher.com_gif-tristeza-series-1471752.gif"
    },
    {
        title: "CORRE",
        artist: "Jesse & Joy",
        genre: "Romantica",
        src: "hacking/Jesse & Joy  Corre! [Letra].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "VITAMINA",
        artist: "Jombriel, DFZM",
        genre: "Regueton",
        src: "hacking/Jombriel, DFZM - Vitamina (LetraLyrics).mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2734b11635cbdec6917dd2c58b1"
    },
    {
        title: "NEVER_SAY_NEVER",
        artist: "Justin Bieber ft. Jaden",
        genre: "Romantica",
        src: "hacking/Justin Bieber - Never Say Never ft. Jaden.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TUSA",
        artist: "Karol G ft. Nicki Minaj",
        genre: "Regueton",
        src: "hacking/KAROL G, Nicki Minaj - Tusa (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ROSAS",
        artist: "La Oreja de Van Gogh",
        genre: "Romantica",
        src: "hacking/La Oreja de Van Gogh - Rosas (Vídeo Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LA_PREGUNTA",
        artist: "J Alvarez",
        genre: "Regueton",
        src: "hacking/La Pregunta - J Alvarez [Letra  Lyrics].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LA_QUEMONA",
        artist: "Master Boys",
        genre: "Regueton",
        src: "hacking/La Quemona Master Boys LetraLyrics.mp3",
        cover: "https://i.ytimg.com/vi/bc3z62HkFbs/maxresdefault.jpg"
    },
    {
        title: "LA_TORMENTA_DE_ARENA",
        artist: "Dorian",
        genre: "Romantica",
        src: "hacking/La Tormenta De Arena - Dorian (letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EN_CAMBIO_NO",
        artist: "Laura Pausini",
        genre: "Romantica",
        src: "hacking/Laura Pausini - En Cambio No (Official Music Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "DEJAME_ENTRAR",
        artist: "Makano",
        genre: "Regueton",
        src: "hacking/Makano - Dejame Entrar [Video Oficial].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SU_NOMBRE_EN_MI_CUADERNO",
        artist: "Makano ft. Josenid",
        genre: "Regueton",
        src: "hacking/Makano feat. Josenid - Su Nombre en mi Cuaderno [Video Oficial].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "Maluma ft. Noriel",
        artist: "Maluma ft. Noriel",
        genre: "Regueton",
        src: "hacking/Maluma - Cuatro Babys (Official Video) ft. Trap Capos, Noriel, Bryant Myers, Juhn.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ME_BEFORE_YOU",
        artist: "Louisa & Will",
        genre: "Romantica",
        src: "hacking/Me Before You - Louisa and Will - Photograph and Letter.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ME_PARTE_EL_CORAZON",
        artist: "Daniel Calderón & Los Gigantes Del Vallenato",
        genre: "Vallenato",
        src: "hacking/Me Parte El Corazón, Daniel Calderón & Los Gigantes Del Vallenato, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "MIENTELE_AL_CORAZON",
        artist: "Miguel Morales",
        genre: "Vallenato",
        src: "hacking/Miéntele Al Corazón, Miguel Morales, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CORAZON",
        artist: "Moy Bobadilla - Grupo Firme",
        genre: "Vallenato",
        src: "hacking/Moy Bobadilla - Grupo Firme - Corazón (LetraLyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NIÑA_BONITA",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "hacking/Niña Bonita, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL_TREN_QUE_NOS_SEPARA",
        artist: "Original",
        genre: "Romantica",
        src: "hacking/ORIGINAL El Tren Que Nos Separa (Letra) .....mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "OLVIDALA",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "hacking/Olvídala, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TE_VAS",
        artist: "Ozuna",
        genre: "Regueton",
        src: "hacking/Ozuna - Te Vas (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "PRESUMIDA",
        artist: "Los Diablitos",
        genre: "Vallenato",
        src: "hacking/Presumida, Los Diablitos, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "QUE_TIENE_ELLA",
        artist: "Unknown",
        genre: "Romantica",
        src: "hacking/Qué tiene ella que no tenga yo_.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "QUITAME_ESE_HOMBRE",
        artist: "Pilar Montenegro",
        genre: "Romantica",
        src: "hacking/Quítame Ese Hombre Del Corazón - Pilar Montenegro   Letra  Norteña.mp3",
        cover: "https://animesher.com/orig/0/60/603/6031/animesher.com_encierro-lluvia-tristeza-603198.jpg"
    },
    {
        title: "SALVAME",
        artist: "RBD",
        genre: "Romantica",
        src: "hacking/RBD  Sálvame [Letra].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "HOLA_BEBE",
        artist: "RD Maravilla",
        genre: "Regueton",
        src: "hacking/RD Maravilla - Hola Bebe (Te Lo Hundo).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LOCO_LOCO",
        artist: "RD Maravilla ft. El Original",
        genre: "Regueton",
        src: "hacking/RD Maravilla Feat. El Original - Loco loco (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "RECUERDAME",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "hacking/Recuérdame, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SABES",
        artist: "Reik",
        genre: "Romantica",
        src: "hacking/Reik - Sabes (Letra  Lyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SI_TU_LO_DEJAS",
        artist: "Rvssian ft. Bad Bunny",
        genre: "Regueton",
        src: "hacking/Rvssian - Si Tu Lo Dejas FT Bad Bunny X Farruko X Nicky Jam X King Kosa.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LOVE_YOU_LIKE_A_LOVE_SONG",
        artist: "Selena Gomez",
        genre: "Romantica",
        src: "hacking/Selena Gomez - Love You Like a Love Song (Lyrics) no one compares you stand alone.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SIN_TU_AMOR",
        artist: "Luis Mateus",
        genre: "Vallenato",
        src: "hacking/Sin Tu Amor - Luis Mateus (Video Lyric)  Vallenato Romántico.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SOLO_ME_FALTAS_TU",
        artist: "Dinastía Romero",
        genre: "Vallenato",
        src: "hacking/Solo Me Faltas Tú, Dinastía Romero, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TE_AMARE",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "hacking/Te Amaré, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TE_SORPRENDERAS",
        artist: "Los Inquietos Del Vallenato",
        genre: "Vallenato",
        src: "hacking/Te Sorprenderás, Los Inquietos Del Vallenato, Video Letra.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NO_ME_ACUERDO",
        artist: "Thalia ft. Natti Natasha",
        genre: "Regueton",
        src: "hacking/Thalia, NATTI NATASHA - No Me Acuerdo (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "IN_THIS_SHIRT",
        artist: "The Irrepressibles",
        genre: "Romantica",
        src: "hacking/The Irrepressibles - In This Shirt (Sub. Español).mp3",
        cover: "https://i1.sndcdn.com/artworks-000663988471-2eooz2-t500x500.jpg"
    },
    {
        title: "TRES_NOCHES",
        artist: "Jesús Manuel",
        genre: "Vallenato",
        src: "hacking/Tres Noches, Jesús Manuel, Vídeo Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TRIGUENITA",
        artist: "Binomio De Oro",
        genre: "Vallenato",
        src: "hacking/Triguenita, Binomio De Oro, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "UN_OSITO_DORMILON",
        artist: "Binomio De Oro De América",
        genre: "Vallenato",
        src: "hacking/Un Osito Dormilón, Binomio De Oro De América, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "VIVAMOS_LO_NUESTRO",
        artist: "Miguel Morales",
        genre: "Vallenato",
        src: "hacking/Vivamos Lo Nuestro, Miguel Morales, Video Letra - Sentir Vallenato.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "VOLVER",
        artist: "Los Inquietos del Vallenato",
        genre: "Vallenato",
        src: "hacking/Volver, Los Inquietos del Vallenato - Video Oficial.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "APARENTEMENTE",
        artist: "Yaga y Mackie ft. Arcangel & De La Ghetto",
        genre: "Regueton",
        src: "hacking/Yaga y Mackie feat. Arcangel y de La Ghetto - Aparentemente (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "PAST_LIVES",
        artist: "sapientdream",
        genre: "Romantica",
        src: "hacking/sapientdream - past lives (Subtitulada Español).mp3",
        cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/10/a9/88/10a98827-ed7e-3077-6cd8-9cc96b764d74/cover.jpg/600x600cc.webp"
    }
];

const playlistItems = document.getElementById('playlist');
const genreFilter = document.getElementById('genre-filter');
const sortBtn = document.getElementById('sort-btn');

let songIndex = 0;
let currentSongs = [...songs];
let isAscending = true;

// Generar lista de reproducción
function initPlaylist(filteredSongs = currentSongs) {
    playlistItems.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        const li = document.createElement('li');
        // Encontrar el índice original en el array 'songs' para cargar la canción correcta
        const originalIndex = songs.findIndex(s => s.src === song.src);
        li.dataset.index = originalIndex;
        li.innerHTML = `
            <span class="track-id">${(index + 1).toString().padStart(2, '0')}</span>
            <div class="track-details">
                <span class="track-name">${song.title}</span>
                <span class="track-genre-label">${song.genre}</span>
            </div>
        `;
        
        // Si la canción actual es la que se está reproduciendo
        if (originalIndex === songIndex) li.classList.add('active');
        
        li.addEventListener('click', () => {
            songIndex = originalIndex;
            loadSong(songs[songIndex]);
            playSong();
        });
        
        playlistItems.appendChild(li);
    });
}

// Lógica de Filtrado por Género
genreFilter.addEventListener('change', (e) => {
    const genre = e.target.value;
    if (genre === 'All') {
        currentSongs = [...songs];
    } else {
        currentSongs = songs.filter(song => song.genre === genre);
    }
    applySort(); // Mantener el orden actual al filtrar
    initPlaylist();
});

// Lógica de Ordenación
function applySort() {
    currentSongs.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (isAscending) {
            return titleA < titleB ? -1 : (titleA > titleB ? 1 : 0);
        } else {
            return titleA > titleB ? -1 : (titleA < titleB ? 1 : 0);
        }
    });
}

sortBtn.addEventListener('click', () => {
    isAscending = !isAscending;
    sortBtn.innerHTML = isAscending ? '<i class="fas fa-sort-alpha-down"></i>' : '<i class="fas fa-sort-alpha-up"></i>';
    applySort();
    initPlaylist();
});

// Cargar canción
function loadSong(song) {
    titleEl.innerText = song.title;
    artistEl.innerText = song.artist;
    audio.src = song.src;
    
    // Asegurar que la ruta de la portada sea absoluta para Media Session
    const absoluteCover = new URL(song.cover, window.location.href).href;
    
    // Actualizar imagen de portada con el GIF de la canción
    const coverImg = document.getElementById('cover');
    if (coverImg) {
        coverImg.src = song.cover;
    }
    
    // Actualizar clase activa en la lista
    const items = playlistItems.querySelectorAll('li');
    items.forEach(item => {
        if (parseInt(item.dataset.index) === songIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Configurar Media Session API (Para controles en pantalla de bloqueo)
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            album: 'SENSEI_AUDIO_SYSTEM',
            artwork: [
                { src: absoluteCover, sizes: '512x512', type: 'image/gif' },
                { src: absoluteCover, sizes: '192x192', type: 'image/gif' }
            ]
        });

        // Asegurar que el estado de reproducción esté sincronizado
        navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

        // Manejadores de eventos de la sesión multimedia
        navigator.mediaSession.setActionHandler('play', () => {
            playSong();
            navigator.mediaSession.playbackState = "playing";
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            pauseSong();
            navigator.mediaSession.playbackState = "paused";
        });
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);

        // Soporte para barra de progreso en pantalla de bloqueo (Seek)
        navigator.mediaSession.setActionHandler('seekbackward', (details) => {
            const skipTime = details.seekOffset || 10;
            audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
            updatePositionState();
        });

        navigator.mediaSession.setActionHandler('seekforward', (details) => {
            const skipTime = details.seekOffset || 10;
            audio.currentTime = Math.min(audio.currentTime + skipTime, audio.duration);
            updatePositionState();
        });

        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.fastSeek && 'fastSeek' in audio) {
                audio.fastSeek(details.seekTime);
                return;
            }
            audio.currentTime = details.seekTime;
            updatePositionState();
        });
    }
}

// Actualizar el estado de la posición para el sistema (Lock Screen)
function updatePositionState() {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
        if (!isNaN(audio.duration) && audio.duration > 0) {
            try {
                navigator.mediaSession.setPositionState({
                    duration: audio.duration,
                    playbackRate: audio.playbackRate,
                    position: audio.currentTime
                });
            } catch (error) {
                console.error("Error actualizando PositionState:", error);
            }
        }
    }
}

// Reproducir
function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play().then(() => {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = "playing";
        }
        startVisualizer();
        updatePositionState();
    }).catch(error => {
        console.error("Error al reproducir:", error);
    });
}

// Pausar
function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = "paused";
    }
    updatePositionState();
}

// Anterior
function prevSong() {
    if (currentSongs.length === 0) return;
    
    // Encontrar la posición actual en la lista filtrada
    let currentFilteredIndex = currentSongs.findIndex(s => s.src === songs[songIndex].src);
    
    // Si la canción actual no está en la lista filtrada (por cambio de género), empezar desde el final
    if (currentFilteredIndex === -1) currentFilteredIndex = currentSongs.length - 1;
    else {
        currentFilteredIndex--;
        if (currentFilteredIndex < 0) currentFilteredIndex = currentSongs.length - 1;
    }
    
    // Obtener la canción de la lista filtrada
    const nextSongObj = currentSongs[currentFilteredIndex];
    // Actualizar el índice global
    songIndex = songs.findIndex(s => s.src === nextSongObj.src);
    
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
    updatePositionState(); // Sincronizar con el sistema
}

// Siguiente
function nextSong() {
    if (currentSongs.length === 0) return;

    // Lógica de Shuffle
    if (isShuffle) {
        let randomIndex = Math.floor(Math.random() * currentSongs.length);
        // Evitar que se repita la misma canción si hay más de una
        if (currentSongs.length > 1) {
            let currentFilteredIndex = currentSongs.findIndex(s => s.src === songs[songIndex].src);
            while (randomIndex === currentFilteredIndex) {
                randomIndex = Math.floor(Math.random() * currentSongs.length);
            }
        }
        const nextSongObj = currentSongs[randomIndex];
        songIndex = songs.findIndex(s => s.src === nextSongObj.src);
    } else {
        // Encontrar la posición actual en la lista filtrada
        let currentFilteredIndex = currentSongs.findIndex(s => s.src === songs[songIndex].src);
        
        // Si la canción actual no está en la lista filtrada, empezar desde el principio
        if (currentFilteredIndex === -1) currentFilteredIndex = 0;
        else {
            currentFilteredIndex++;
            if (currentFilteredIndex > currentSongs.length - 1) currentFilteredIndex = 0;
        }
        
        const nextSongObj = currentSongs[currentFilteredIndex];
        songIndex = songs.findIndex(s => s.src === nextSongObj.src);
    }
    
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
    updatePositionState(); // Sincronizar con el sistema
}

// Actualizar progreso
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Tiempo actual
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    currentTimeEl.innerText = `${currentMin}:${currentSec}`;

    // Actualizar también la barra de progreso del sistema (lock screen) cada segundo
    if (Math.floor(currentTime) % 1 === 0) {
        updatePositionState();
    }
}

// Configurar duración al cargar
audio.addEventListener('loadedmetadata', () => {
    let totalMin = Math.floor(audio.duration / 60);
    let totalSec = Math.floor(audio.duration % 60);
    if (totalSec < 10) totalSec = `0${totalSec}`;
    durationEl.innerText = `${totalMin}:${totalSec}`;
});

// Click en barra de progreso
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playPauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});
progressBar.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active');
    repeatBtn.style.color = isRepeat ? '#fff' : 'var(--sgc-cian)';
});

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active');
    shuffleBtn.style.color = isShuffle ? '#fff' : 'var(--sgc-cian)';
});

// --- Visualizador de Audio (Canvas) ---
let audioCtx, analyser, source, dataArray;
let canvas = document.getElementById('visualizer');
let ctx = canvas.getContext('2d');

function startVisualizer() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        draw();
    }
}

function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = `rgba(0, 204, 255, ${barHeight / 100})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
    }
}

// --- Fondo Matrix ---
const matrixCanvas = document.createElement('canvas');
const mCtx = matrixCanvas.getContext('2d');
document.getElementById('matrix-bg').appendChild(matrixCanvas);

function resizeMatrix() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeMatrix);
resizeMatrix();

const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#&*%".split("");
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    mCtx.fillStyle = "rgba(0, 8, 16, 0.05)";
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    mCtx.fillStyle = "#00ccff";
    mCtx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// Inicializar
initPlaylist();
loadSong(songs[songIndex]);
