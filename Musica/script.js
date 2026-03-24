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

// Datos de las canciones (Actualización Final - 39 Pistas Detectadas)
const songs = [
    {
        title: "DEJAME_ENTRAR",
        artist: "Makano",
        src: "hacking/Makano - Dejame Entrar [Video Oficial].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SU_NOMBRE_EN_MI_CUADERNO",
        artist: "Makano ft. Josenid",
        src: "hacking/Makano feat. Josenid - Su Nombre en mi Cuaderno [Video Oficial].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LA_QUEMONA",
        artist: "Master Boys",
        src: "hacking/La Quemona Master Boys LetraLyrics.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "VITAMINA",
        artist: "Jombriel, DFZM",
        src: "hacking/Jombriel, DFZM - Vitamina (LetraLyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SABES",
        artist: "Reik",
        src: "hacking/Reik - Sabes (Letra  Lyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ROSAS",
        artist: "La Oreja de Van Gogh",
        src: "hacking/La Oreja de Van Gogh - Rosas (Vídeo Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "DISFRUTO",
        artist: "Carla Morrison",
        src: "hacking/Carla Morrison - Disfruto (letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "HASTA_LA_RAIZ",
        artist: "Natalia Lafourcade",
        src: "hacking/Hasta la Raíz - Natalia Lafourcade   LETRA.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "FANTASMAS",
        artist: "Humbe",
        src: "hacking/Humbe - fantasmas (Letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "QUITAME_ESE_HOMBRE",
        artist: "Pilar Montenegro",
        src: "hacking/Quítame Ese Hombre Del Corazón - Pilar Montenegro   Letra  Norteña.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "DOS_HOMBRES_Y_UN_DESTINO",
        artist: "David Bustamante y Axel",
        src: "hacking/Dos hombres y un destino- David Bustamante y Axel- (letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NEVER_SAY_NEVER",
        artist: "Justin Bieber ft. Jaden",
        src: "hacking/Justin Bieber - Never Say Never ft. Jaden.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "JUST_THE_WAY_YOU_ARE",
        artist: "Bruno Mars",
        src: "hacking/Bruno Mars - Just The Way You Are (Lyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "PAST_LIVES",
        artist: "sapientdream",
        src: "hacking/sapientdream - past lives (Subtitulada Español).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "IN_THIS_SHIRT",
        artist: "The Irrepressibles",
        src: "hacking/The Irrepressibles - In This Shirt (Sub. Español).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL_TREN_QUE_NOS_SEPARA",
        artist: "Original",
        src: "hacking/ORIGINAL El Tren Que Nos Separa (Letra) .....mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "ME_BEFORE_YOU",
        artist: "Louisa & Will",
        src: "hacking/Me Before You - Louisa and Will - Photograph and Letter.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "QUE_TIENE_ELLA",
        artist: "Unknown",
        src: "hacking/Qué tiene ella que no tenga yo_.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LA_TORMENTA_DE_ARENA",
        artist: "Dorian",
        src: "hacking/La Tormenta De Arena - Dorian (letra).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CORAZON",
        artist: "Moy Bobadilla - Grupo Firme",
        src: "hacking/Moy Bobadilla - Grupo Firme - Corazón (LetraLyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "LOVE_YOU_LIKE_A_LOVE_SONG",
        artist: "Selena Gomez",
        src: "hacking/Selena Gomez - Love You Like a Love Song (Lyrics) no one compares you stand alone.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EN_CAMBIO_NO",
        artist: "Laura Pausini",
        src: "hacking/Laura Pausini - En Cambio No (Official Music Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SALVAME",
        artist: "RBD",
        src: "hacking/RBD  Sálvame [Letra].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "EL_CIGARRILLO",
        artist: "Ana Gabriel",
        src: "hacking/El cigarrillo - Ana Gabriel (LetraLyrics).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TE_VAS",
        artist: "Ozuna",
        src: "hacking/Ozuna - Te Vas (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SI_TU_LO_DEJAS",
        artist: "Rvssian ft. Bad Bunny",
        src: "hacking/Rvssian - Si Tu Lo Dejas FT Bad Bunny X Farruko X Nicky Jam X King Kosa.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "BELLAKEO",
        artist: "Peso Pluma ft. Anitta",
        src: "hacking/BELLAKEO (Video Oficial) - Peso Pluma, Anitta.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "AMORFODA",
        artist: "Bad Bunny",
        src: "hacking/BAD BUNNY - AMORFODA (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SOY_PEOR",
        artist: "Bad Bunny",
        src: "hacking/BAD BUNNY - SOY PEOR (Video Oficial).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "TUSA",
        artist: "Karol G ft. Nicki Minaj",
        src: "hacking/KAROL G, Nicki Minaj - Tusa (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NO_ME_ACUERDO",
        artist: "Thalia ft. Natti Natasha",
        src: "hacking/Thalia, NATTI NATASHA - No Me Acuerdo (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "SIN_PIJAMA",
        artist: "Becky G ft. Natti Natasha",
        src: "hacking/Becky G, NATTI NATASHA - Sin Pijama (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "MAYORES",
        artist: "Becky G ft. Bad Bunny",
        src: "hacking/Becky G, Bad Bunny - Mayores (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CUANDO_TE_BESE",
        artist: "Becky G ft. Paulo Londra",
        src: "hacking/Becky G, Paulo Londra - Cuando Te Besé (Official Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "CUATRO_BABYS",
        artist: "Maluma ft. Noriel",
        src: "hacking/Maluma - Cuatro Babys (Official Video) ft. Trap Capos, Noriel, Bryant Myers, Juhn.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "FRONTEAMOS_PORQUE_PODEMOS",
        artist: "De La Ghetto ft. Daddy Yankee",
        src: "hacking/De La Ghetto - Fronteamos Porque Podemos ft. Daddy Yankee, Yandel & Ñengo Flow [Official Video].mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "NACIMOS_PA_MORIR",
        artist: "Anuel ft. Jory",
        src: "hacking/Anuel - Nacimos Pa Morir (Official Video) ft. Jory.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "PA_TI",
        artist: "6ix9ine ft. Yailin",
        src: "hacking/6ix9ine - Pa Ti (feat. Yailin La Más Viral) (Official Music Video).mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    },
    {
        title: "HEROIC_EPIC_BEAT",
        artist: "Aidan x Maxxton",
        src: "hacking/HEROIC Hard Epic String Rap Beat  Prod. By Aidan x Maxxton.mp3",
        cover: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2VxYmQxaXRud2JsYWs4bGMzaWRwZGQ1NTI4bW5xMTc0a2tyeTQzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IMOTcqOtaEkXiBonLU/giphy.gif"
    }
];

const playlistItems = document.getElementById('playlist');

let songIndex = 0;

// Generar lista de reproducción
function initPlaylist() {
    playlistItems.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        li.innerHTML = `
            <span class="track-id">${(index + 1).toString().padStart(2, '0')}</span>
            <span class="track-name">${song.title}</span>
        `;
        if (index === songIndex) li.classList.add('active');
        
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        
        playlistItems.appendChild(li);
    });
}

// Cargar canción
function loadSong(song) {
    titleEl.innerText = song.title;
    artistEl.innerText = song.artist;
    audio.src = song.src;
    
    // Actualizar imagen de portada con el GIF de la canción
    const coverImg = document.getElementById('cover');
    if (coverImg) {
        coverImg.src = song.cover;
    }
    
    // Actualizar clase activa en la lista
    const items = playlistItems.querySelectorAll('li');
    items.forEach(item => item.classList.remove('active'));
    items[songIndex].classList.add('active');
    
    // Configurar Media Session API (Para controles en pantalla de bloqueo)
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            album: 'FBI_SURVEILLANCE_OS',
            artwork: [
                { src: song.cover, sizes: '512x512', type: 'image/gif' }
            ]
        });

        // Manejadores de eventos de la sesión multimedia
        navigator.mediaSession.setActionHandler('play', playSong);
        navigator.mediaSession.setActionHandler('pause', pauseSong);
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);
    }
}

// Reproducir
function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
    startVisualizer();
}

// Pausar
function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

// Anterior
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

// Siguiente
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
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
