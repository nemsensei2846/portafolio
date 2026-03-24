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

// Datos de las canciones (Actualizado con carpeta hacking)
const songs = [
    {
        title: "HEROIC_EPIC_BEAT",
        artist: "Aidan x Maxxton",
        src: "hacking/HEROIC Hard Epic String Rap Beat  Prod. By Aidan x Maxxton.mp3",
        cover: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxxcaatvAyc/giphy.gif"
    },
    {
        title: "PA_TI",
        artist: "6ix9ine ft. Yailin",
        src: "hacking/6ix9ine - Pa Ti (feat. Yailin La Más Viral) (Official Music Video).mp3",
        cover: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxxcaatvAyc/giphy.gif"
    },
    {
        title: "NACIMOS_PA_MORIR",
        artist: "Anuel ft. Jory",
        src: "hacking/Anuel - Nacimos Pa Morir (Official Video) ft. Jory.mp3",
        cover: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxxcaatvAyc/giphy.gif"
    },
    {
        title: "FRONTEAMOS_PORQUE_PODEMOS",
        artist: "De La Ghetto ft. Daddy Yankee",
        src: "hacking/De La Ghetto - Fronteamos Porque Podemos ft. Daddy Yankee, Yandel & Ñengo Flow [Official Video].mp3",
        cover: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6Znh6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxxcaatvAyc/giphy.gif"
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
