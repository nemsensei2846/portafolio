const songs = [
    {
        title: "BEBE",
        artist: "6ix9ine Ft. Anuel AA",
        genre: "Regueton",
        src: "tracks/bebe-anuel.mp3",
        cover: "https://images.squarespace-cdn.com/content/v1/58eef9c2f7e0abff4db78dc9/1535770144822-40AU0TG93OBZNWYYE3OQ/Screen+Shot+2018-08-31+at+7.47.38+PM.png?format=750w"
    },
    {
        title: "Una Noche En Medellín",
        artist: "Cris MJ",
        genre: "Regueton",
        src: "tracks/Cris MJ - Una Noche En Medellín (LetraLyrics).mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStulP-Rvd4QAyQTb1UobrvPBvIGnherscEgw&s"
    },
    {
        title: "PA TI",
        artist: "6ix9ine ft. Yailin",
        genre: "Regueton",
        src: "tracks/pati.mp3",
        cover: "https://i1.sndcdn.com/artworks-000200598950-szqjd2-t500x500.jpg"
    },
    {
        title: "Vamo a Bailotear",
        artist: "Cris MJ",
        genre: "Regueton",
        src: "tracks/baioletar.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2739f3e9b1bad89497bfc24c5ba"
    },
    {
        title: "SI NO ES CONTIGO",
        artist: "Cris MJ",
        genre: "Regueton",
        src: "tracks/Cris MJ - SI NO ES CONTIGO (Video Oficial).mp3",
        cover: "https://i.ytimg.com/vi/vNQjKyEMJxk/maxresdefault.jpg"
    },
    {
        title: "SI NO ES CONTIGO REMIX",
        artist: "Cris MJ, Kali Uchis, JHAYCO",
        genre: "Regueton",
        src: "tracks/Cris MJ, Kali Uchis, JHAYCO - SI NO ES CONTIGO REMIX.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYYJMf4q-QDsozgKEdQWD-LXD3myNxZvN0QA&s"
    },
    {
        title: "Gata Only",
        artist: "Cris MJ ft FloyyMenor",
        genre: "Regueton",
        src: "tracks/FloyyMenor, Cris MJ - Gata Only.mp3",
        cover: "https://i.ytimg.com/vi/UWn9RdueB7E/maxresdefault.jpg"
    },
    {
        title: "La Asesina",
        artist: "Zacarías Ferreira",
        genre: "Bachata",
        src: "categoria/Zacarías Ferreira - La Asesina (Vídeo Oficial).mp3",
        cover: "https://i1.sndcdn.com/artworks-000213741937-tw4xu2-t500x500.jpg"
    },
    {
        title: "Sentada en un Bar",
        artist: "cecy narvaez",
        genre: "Otros",
        src: "categoria/Sentada en un Bar - @CECYNARVAEZ (Video Oficial).mp3",
        cover: "https://i.ytimg.com/vi/gmp8hTsGs-0/maxresdefault.jpg"
    },
    {
        title: "He sentido amor",
        artist: "Jaime Enrique Aymara",
        genre: "Cumbia",
        src: "categoria/Jaime Enrique Aymara He sentido amor DTV byBryan.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzETh_KisQq36ux5ABcF_u9LqQRP_u8qn0w&s"
    },
    {
        title: "A LA ANTIGUITA",
        artist: "Calibre 50",
        genre: "Vallenato",
        src: "tracks/antiguita.mp3",
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
        title: "Se fue",
        artist: "laura pausini",
        genre: "Balada",
        src: "categoria/Se fué.mp3",
        cover: "https://pbs.twimg.com/media/Em5Vg0aXYAsmGiy.jpg"
    },
    {
        title: "Faded",
        artist: "Alan Walker",
        genre: "Electronica",
        src: "tracks/faded.mp3",
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
        title: "Procura",
        artist: "chichi peralta",
        genre: "Otros",
        src: "categoria/Procura.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273ee686ebada622d510f8660fb"
    },
    {
        title: "Atrapado en Dos Amores",
        artist: "Baúl",
        genre: "Otros",
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
        title: "NI QUE VALIERAS TANTO",
        artist: "MARIA DE LOS ANGELES",
        genre: "Cumbia",
        src: "categoria/MARIA DE LOS ANGELES - NI QUE VALIERAS TANTO 2015.mp3",
        cover: "https://i.ytimg.com/vi/VwEW4sPxJ9s/hqdefault.jpg"
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
        title: "Amor Prohibido",
        artist: "Selena",
        genre: "Romantica",
        src: "categoria/Selena - Amor Prohibido.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2730990f85ec999f7b2f71458c0"
    },
    {
        title: "Bandido",
        artist: "Ana Bárbara",
        genre: "Romantica",
        src: "categoria/Ana Bárbara - Bandido (Official Video).mp3",
        cover: "https://i.ytimg.com/vi/cq6QE5-PWwQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDUTQ_m8EA19KrBTgSVJ-sUF7izuw"
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
        title: "En Vida",
        artist: "Segundo Rosero",
        genre: "Balada",
        src: "categoria/Balada/Segundo Rosero - En Vida.mp3",
        cover: "https://i.ytimg.com/vi/EnYWG3r3QBY/maxresdefault.jpg"
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
    },
    {
        title: "El Conejito",
        artist: "Los Conquistadores",
        genre: "Otros",
        src: "categoria/Los Conquistadores - El Conejito (Video Oficial).mp3",
        cover: "https://i.ytimg.com/vi/Lpmd2yA_uyo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCTOv6pP81MMGPlU1A1v4q9sX59QA"
    },
    {
        title: "FERNANDEZ 13",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/13. fernandez.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PERDON",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/23. perdon.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "FERNANDEZ 01",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/01 Pista 1.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "FERNANDEZ 04",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/04 Pista 4.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "FERNANDEZ 05",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/05 Pista 5.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "FERNANDEZ 07",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/07 Pista 7.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "Nunca pense llorar",
        artist: "ROSSY WAR",
        genre: "Cumbia",
        src: "categoria/ROSSY WAR, Nunca pense llorar (Tito Mauri).mp3",
        cover: "https://i.ytimg.com/vi/5QT__kYjCJU/sddefault.jpg?v=60beae65"
    },
    {
        title: "MI JOVEN PROFESOR DE AMOR",
        artist: "TIERRA CANELA",
        genre: "Cumbia",
        src: "categoria/TIERRA CANELA - MI JOVEN PROFESOR DE AMOR.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b2738e389611a2504b95250efbd3"
    },
    {
        title: "Y Siempre",
        artist: "Karolina Con K y La Orquesta La Inmensa",
        genre: "Cumbia",
        src: "categoria/Y Siempre - Karolina Con K y La Orquesta La Inmensa.mp3",
        cover: "https://i.ytimg.com/vi/lbSJCpzIQfg/maxresdefault.jpg"
    },
    {
        title: "El Camaleón",
        artist: "Widinson",
        genre: "Cumbia",
        src: "categoria/Widinson - El Camaleón.mp3",
        cover: "https://i.ytimg.com/vi/vd89-vtP2iY/maxresdefault.jpg"
    },
    {
        title: "FERNANDEZ 15 (Pista)",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/15 Pista 15.wma",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "FERNANDEZ 15",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/15. fernandez.mp3",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "FERNANDEZ 17",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/17 Pista 17.wma",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "FERNANDEZ 18",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/18. fernandez.mp3",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "FERNANDEZ 19",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/19 Pista 19.wma",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "FERNANDEZ 21 (Pista)",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/21 Pista 21.wma",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "FERNANDEZ 21",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/21. fernandez.mp3",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "FERNANDEZ 22",
        artist: "Vicente Fernandez",
        genre: "Ranchera",
        src: "categoria/ALEJANDRO Y VICENTE FERNANDEZ/22 Pista 22.wma",
        cover: "https://yt3.googleusercontent.com/6wic42kN_2DcrHTVMEUbWI0_ZWd39rvWDB-Je1mBwLy9gQRLis_4SbhHv7mMMQ1l0jxgrVHqzg=s900-c-k-c0x00ffffff-no-rj"
    },
    {
        title: "EL CONTRAGOLPE",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/EL CONTRAGOLPE.mp3",
        cover: "https://i.ytimg.com/vi/zR84hNFexkg/maxresdefault.jpg"
    },
    {
        title: "LA COPA ROTA",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/LA COPA ROTA.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "AMOR GITANO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/AMOR GITANO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "AMOR DEL ALMA",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/AMOR DEL ALMA.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BRAVO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/BRAVO .mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "EL PRESO # 9",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/EL PRESO # 9.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "EL ULTIMO BESO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/EL ULTIMO BESO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "HOLA SOLEDAD",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/HOLA SOLEDAD.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "JORNALERO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/JORNALERO .mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "LA ARAÑA",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/LA ARAÑA.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "LA CARCEL DE SING SING",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/La carcel de sing sing.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "LA ULTIMA COPA",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/LA ULTIMA COPA.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MALDITO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/MALDITO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ME LLEVARAS EN TI",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/ME LLEVARAS EN TI.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NIEGALO TODO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/NIEGALO TODO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ODIAME",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/ODIAME.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ODIO GITANO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/ODIO GITANO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PAPEL DE LA CALLE",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/PAPEL DE LA CALLE.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "QUIERO SER TU AMIGO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/QUIERO SER TU AMIGO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "RENUNCIACION",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/RENUNCIACION.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "TANGO NEGRO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/TANGO NEGRO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "TE PROPONGO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/TE PROPONGO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "TRAICIONERA",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/TRAICIONERA.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "YO TE MALDIGO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/YO TE MALDIGO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "COSTUMBRES",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/COSTUMBRES.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "DE QUE MANERA TE OLVIDO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/DE QUE MANERA TE OLVIDO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MUJERES DIVINAS",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/MUJERES DIVINAS.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PORQUE AHORA",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/PORQUE AHORA - ALCI ACOSTA.MP3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "SI HOY FUERA AYER",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/SI HOY FUERA AYER.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PORQUE SE FUE",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/porqué se fue.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "EL PRESO -9",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/EL PRESO -9.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "LA CARCEL DE SING SING (2)",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/LA CARCEL DE SING SING (2).mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NIEGALO TODO (2)",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/NIEGALO TODO (2).mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "JORNALERO",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "categoria/ALCI ACOSTA/JORNALERO.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "EL ULTIMO BESO (CHUPATE LOS DOLARES)",
        artist: "Alci Acosta",
        genre: "Bolero",
        src: "tracks/chupate los dolares fruko/11 - EL ULTIMO BESO - ALCI ACOSTA - 11.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PORQUE YO TE AMO",
        artist: "Sandro",
        genre: "Balada",
        src: "tracks/BALADAS ANTIGUAS/SANDRO/Sandro  Porque yo te amo.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ROSA ROSA",
        artist: "Sandro",
        genre: "Balada",
        src: "tracks/BALADAS ANTIGUAS/SANDRO/Sandro Rosa Rosa.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "DESPIERTA",
        artist: "Los Tres Diamantes",
        genre: "Bolero",
        src: "tracks/BOLEROS/LOS DIAMANTES/Despierta Los Tres Diamantes.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "LA GLORIA ERES TU",
        artist: "Los Tres Diamantes",
        genre: "Bolero",
        src: "tracks/BOLEROS/LOS DIAMANTES/Los tres diamantes La Gloria Eres Tu.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NUESTRO JURAMENTO (MIX)",
        artist: "Julio Jaramillo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Julio Jaramillo Vol 1 Nuestro Juramento Odiame Fatalidad Rondando Tu Esquina Musica de Ecuador.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "AMOR SUBLIME",
        artist: "Jesús Vásquez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/AMOR SUBLIME Jesús Vásquez.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PASILLOS MIX",
        artist: "Anita Lucía Proaño",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/ANITA LUCIA PROANO ( PASILLOS MIX).mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "AQUELLA TARDE",
        artist: "Gerardo Morán",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/AQUELLA TARDE - GERARDO MORAN - 13.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NIÑA",
        artist: "El Cholito",
        genre: "Otros",
        src: "tracks/el-cholito.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrR0nst_SVWzTdZ3dL4JZpO_VzXVaoFQNNw&s"
    },
    {
        title: "ENTREGA FINAL",
        artist: "Anita Lucía Proaño",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Anita Lucia Proaño Entrega Final.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MOSAICO DE SANJUANITOS",
        artist: "Anita Lucía Proaño",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Anita Lucía Proaño Mix - Mosaico de Sanjuanitos Ecuatorianos.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "AVECILLA",
        artist: "Hnos Núñez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Avecilla Hnos Nuñez.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "CAUTIVO DE AMOR",
        artist: "José Antonio",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/CAUTIVO DE AMOR - JOSE ANTONIO - 15.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "CELOS SIN MOTIVO",
        artist: "Odilio González",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/CELOS SIN MOTIVO - ODILIO GONZALEZ - 12.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "CIELO DE LUJO",
        artist: "Lucho Barrios",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/CIELO DE LUJO - LUCHO BARRIOS - 09.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "COMO PEQUEÑA FLORECITA",
        artist: "Claudio Vallejo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/COMO PEQUE�A FLORECITA - CLAUDIO VALLEJO - 16.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "COMO VOY A OLVIDARTE",
        artist: "Claudio Vallejo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/COMO VOY A OLVIDARTE - CLAUDIO VALLEJO - 17.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "CARIÑO BONITO",
        artist: "Hermanos Núñez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Cariño bonito - (Hermanos Núñez - Letra).mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "CLAUDIO VALLEJO MIX",
        artist: "Claudio Vallejo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Claudio Vallejo mix.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "EL CARMIN DE TUS LABIOS",
        artist: "Kike Vega",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/EL CARMIN DE TUS LABIOS - KIKE VEGA - 14.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "EL ULTIMO BESO (PASILLO)",
        artist: "Alci Acosta",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/EL ULTIMO BESO - ALCI ACOSTA - 11.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ELENA",
        artist: "José Antonio",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/ELENA - JOSE ANTONIO - 23.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ESTOY PENSANDO EN TI",
        artist: "Julio Jaramillo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/ESTOY PENSANDO EN TI - JULIO JARAMILLO - 01.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ESTOY SIN TI",
        artist: "Segundo Rosero",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/ESTOY SIN TI - SEGUNDO ROSERO - 22.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "FALSA MUJER (ASTUDILLO)",
        artist: "Carlos Astudillo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/FALSA MUJER - CARLOS ASTUDILLO - 18.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "FALSA MUJER (ROSERO)",
        artist: "Segundo Rosero",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/FALSA MUJER - SEGUNDO ROSERO - 20.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "TU Y YO",
        artist: "Hermanos Núñez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Hermanos Nuñez Tu y yo.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ACUÉRDATE DE MÍ",
        artist: "Jesús Vásquez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/JESUS VAZQUEZ Acuerdate de mi.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ENDECHAS",
        artist: "Jesús Vásquez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Jesus Vasquez Endechas.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "JESÚS VÁSQUEZ MIX",
        artist: "Jesús Vásquez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Jesús Vásquez Mix.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "LEONOR",
        artist: "Cecilio Alva",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/LEONOR - CECILIO ALVA - 08.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MAL PASO",
        artist: "Los Kipus",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/MAL PASO - LOS KIPUS - 19.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MAS TE QUIERO",
        artist: "Kike Vega",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/MAS TE QUIERO - KIKE VEGA - 05.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "POPURRÍ DE PASILLOS",
        artist: "Hermanos Miño Naranjo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/MUSICA ECUATORIANA - Hermanos Miño Naranjo - Popurri de Pasillos y Albazos.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MI ÚLTIMO ADIÓS",
        artist: "Olga Gutiérrez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Mi Ultimo Adios - Olga Gutierrez y la rondalla de Christian Naranjo.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NUESTRO JURAMENTO (SANTOS)",
        artist: "Daniel Santos",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/NUESTRO JURAMENTO - DANIEL SANTOS - 02.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NUNCA TE OLVIDARÉ",
        artist: "Pepe Jaramillo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/NUNCA TE OLVIDARE - PEPE JARAMILLO - 06.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NUESTRO JURAMENTO (SINGLE)",
        artist: "Julio Jaramillo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Nuestro Juramento - Julio Jaramillo.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "OJOS TENTADORES",
        artist: "Olga Gutiérrez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Ojos Tentadores - Pasillo - Olga Gutiérrez.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "OJOS NEGROS",
        artist: "Olga Gutiérrez",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Olga Gutierrez Ojos Negros.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PAULINA TAMAYO MIX",
        artist: "Paulina Tamayo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/PAULINA TAMAYO MIX.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PERDISTE",
        artist: "Los Kipus",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/PERDISTE - LOS KIPUS - 07.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PERDÓN MUJER",
        artist: "Kike Vega",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/PERDON MUJER - KIKE VEGA - 10.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "PAULINA TAMAYO PASILLOS",
        artist: "Paulina Tamayo",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Paulina Tamayo Pasillos Mix Dj PauL 2016.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "SEGUNDO ROSERO MIX",
        artist: "Segundo Rosero",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/Segundo Rosero Mix -  Exitos.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "TIÉNDEME LA MANO",
        artist: "Hermanos Zañartu",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/TIENDEME LA MANO - HERMANOS ZA�ARTU - 21.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "TU AMIGO SERÉ",
        artist: "Lucho Barrios",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/TU AMIGO SERE - LUCHO BARRIOS - 03.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "VAGABUNDO, BORRACHO Y LOCO",
        artist: "Segundo Rosero",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/VAGABUNDO, BORRACHO Y LOCO - SEGUNDO ROSERO - 24.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "VENGANZA",
        artist: "Cecilio Alva",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/VENGANZA - CECILIO ALVA - 04.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "17 AÑOS",
        artist: "Segundo Rosero",
        genre: "Pasillo",
        src: "categoria/PASILLLOS/17 años - Segundo Rosero (Videoclip Oficial).mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "QUE LEVANTE LA MANO",
        artist: "Américo",
        genre: "Cumbia",
        src: "tracks/SEÑORA MÚSICA/AMERICO/03.-_Que_levante_la_mano___Americo_A_morir.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "TE VAS",
        artist: "Américo",
        genre: "Cumbia",
        src: "tracks/SEÑORA MÚSICA/AMERICO/Américo Te vas.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "AMANECIENDO",
        artist: "La Sonora Dinamita",
        genre: "Cumbia",
        src: "tracks/SEÑORA MÚSICA/LA SONORA DINAMITA/AMANECIENDO_(SONORA_DINAMITA).mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "NEGRO JOSE",
        artist: "La Sonora Dinamita",
        genre: "Cumbia",
        src: "tracks/SEÑORA MÚSICA/LA SONORA DINAMITA/Negro_Jose_Completo.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 01",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/01 Pista 1.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 02",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/02 Pista 2.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 03",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/03 Pista 3.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 04",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/04 Pista 4.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 05",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/05 Pista 5.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 06",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/06 Pista 6.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 07",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/07 Pista 7.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 08",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/08 Pista 8.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 09",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/09 Pista 9.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 10",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/10 Pista 10.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 11",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/11 Pista 11.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "BACHITA 12",
        artist: "BACHITA",
        genre: "Ranchera",
        src: "categoria/BACHITA/12 Pista 12.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 01",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/01 Pista 1.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 02",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/02 Pista 2.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 03",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/03 Pista 3.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 04",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/04 Pista 4.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 05",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/05 Pista 5.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 07",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/07 Pista 7.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 08",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/08 Pista 8.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 10",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/10 Pista 10.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 12",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/12 Pista 12.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 14",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/14 Pista 14.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 15",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/15 Pista 15.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 16",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/16 Pista 16.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 18",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/18 Pista 18.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 20",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/20 Pista 20.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 25",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/25 Pista 25.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "AMOR POR TI",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/amor por ti.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 29",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/pista 29.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "ANGELES NEGROS 31",
        artist: "Angeles Negros",
        genre: "Balada",
        src: "categoria/ANGELES NEGROS/pista 31.wma",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MIX MERENGUE 1",
        artist: "Varios",
        genre: "OTROS",
        src: "tracks/MIX MERENGUE 1.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MIX MERENGUE 2",
        artist: "Varios",
        genre: "OTROS",
        src: "tracks/MIX MERENGUE 2.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MIX MERENGUE 5",
        artist: "Varios",
        genre: "OTROS",
        src: "tracks/MIX MERENGUE 5.mp3",
        cover: "../logo%20SENSEI.png"
    },
    {
        title: "MIX MERENGUE 7",
        artist: "Varios",
        genre: "OTROS",
        src: "tracks/MIX MERENGUE 7.mp3",
        cover: "../logo%20SENSEI.png"
    }
];

// ✅ FIX COMPATIBILIDAD (Android/iPhone/PWA):
// Si tus MP3 están alojados en GitHub Pages (otro dominio), las rutas relativas "tracks/..." fallan
// cuando la PWA está en Netlify u otro host. Aquí normalizamos las URLs para que siempre apunten al lugar correcto.
//
// Cambia esta URL si mueves los audios a otro sitio.
const AUDIO_BASE_URL = "https://nemsensei2846.github.io/portafolio/Musica/";

try {
    songs.forEach((s) => {
        if (!s || !s.src) return;
        // Si ya es absoluta, no tocar
        if (/^https?:\/\//i.test(s.src)) return;
        // Normalizar: quitar "/" inicial si existe
        const clean = String(s.src).replace(/^\/+/, '');
        s.src = AUDIO_BASE_URL + clean;
    });
} catch (e) {}
