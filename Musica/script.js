/**
 * SENSEI_AUDIO_PLAYER - ADVANCED PWA ENGINE (React Hybrid)
 * Versión 51 - React Integration + Background Audio Fix
 */

// --- 1. Audio Engine (Core Playback Logic) ---
class AudioEngine {
    constructor() {
        this.audio = document.getElementById('audio-player');
        this.wakeLock = null;
        this.setupListeners();
    }

    setupListeners() {
        this.audio.addEventListener('ended', () => {
            console.log("Canción terminada. Intentando pasar a la siguiente...");
            if (App.state.isRepeatOne) {
                this.audio.currentTime = 0;
                this.play().catch(e => console.log("Replay failed", e));
            } else {
                // Forzar el cambio a la siguiente canción de forma sincrónica
                // No usar setTimeout aquí para no romper la cadena de reproducción en segundo plano
                App.nextSong(true);
            }
        });

        this.audio.addEventListener('play', () => {
            App.setState({ isPlaying: true });
            this.requestWakeLock();
            this.updateMediaSession('playing');
            
            // Iniciar intervalo de actualización de posición para mantener vivo el proceso en móviles
            if (this.positionInterval) clearInterval(this.positionInterval);
            this.positionInterval = setInterval(() => this.updatePositionState(), 1000);
        });

        this.audio.addEventListener('pause', () => {
            App.setState({ isPlaying: false });
            this.releaseWakeLock();
            this.updateMediaSession('paused');
            
            if (this.positionInterval) {
                clearInterval(this.positionInterval);
                this.positionInterval = null;
            }
        });

        this.audio.addEventListener('timeupdate', () => {
            const { currentTime, duration } = this.audio;
            if (isNaN(duration)) return;
            const percent = (currentTime / duration) * 100;
            
            // Actualizar barras de progreso
            const progressBars = document.querySelectorAll('#progress-bar-mini, #fp-progress-bar');
            progressBars.forEach(bar => bar.style.width = `${percent}%`);

            // Actualizar tiempos
            const currentEl = document.getElementById('current-time');
            const durationEl = document.getElementById('duration');
            if (currentEl) currentEl.innerText = this.formatTime(currentTime);
            if (durationEl) durationEl.innerText = this.formatTime(duration);
        });

        this.audio.onerror = () => {
            console.error("Error de audio crítico, saltando a la siguiente...");
            // Intentar saltar tras un pequeño delay si falla en el cargado
            setTimeout(() => App.nextSong(true), 300);
        };

        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', () => this.play());
            navigator.mediaSession.setActionHandler('pause', () => this.pause());
            // IMPORTANTE: Asegurarnos de que el handler de MediaSession use forcePlay=true
            navigator.mediaSession.setActionHandler('nexttrack', () => App.nextSong(true));
            navigator.mediaSession.setActionHandler('previoustrack', () => App.prevSong(true));
        }
    }

    load(song) {
        if (!song) return;
        // Solo cambiamos el SRC y llamamos a load() si es necesario
        // En algunos móviles, llamar a load() explícitamente ayuda a resetear el buffer
        this.audio.src = song.src;
        this.audio.load(); 
        this.updateMediaMetadata(song);
    }

    async play() {
        try {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                await playPromise;
                console.log("Reproducción iniciada correctamente.");
            }
        } catch (err) {
            console.warn("Play bloqueado por el navegador (Autoplay):", err);
            // Si falla, intentamos de nuevo en un segundo si seguimos en estado 'isPlaying'
            if (App.state.isPlaying) {
                setTimeout(() => this.play(), 1000);
            }
        }
    }

    pause() {
        this.audio.pause();
    }

    updateMediaMetadata(song) {
        if ('mediaSession' in navigator) {
            const coverUrl = song.cover.startsWith('http') ? song.cover : window.location.origin + '/' + song.cover;
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.artist,
                album: 'SENSEI PWA',
                artwork: [
                    { src: coverUrl, sizes: '96x96',   type: 'image/png' },
                    { src: coverUrl, sizes: '128x128', type: 'image/png' },
                    { src: coverUrl, sizes: '192x192', type: 'image/png' },
                    { src: coverUrl, sizes: '256x256', type: 'image/png' },
                    { src: coverUrl, sizes: '384x384', type: 'image/png' },
                    { src: coverUrl, sizes: '512x512', type: 'image/png' },
                ]
            });
            this.updatePositionState();
        }
    }

    updatePositionState() {
        if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession) {
            const duration = this.audio.duration;
            const currentTime = this.audio.currentTime;
            if (!isNaN(duration) && duration > 0) {
                navigator.mediaSession.setPositionState({
                    duration: duration,
                    playbackRate: this.audio.playbackRate,
                    position: currentTime
                });
            }
        }
    }

    updateMediaSession(state) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = state;
            this.updatePositionState();
        }
    }

    async requestWakeLock() {
        if ('wakeLock' in navigator && !this.wakeLock) {
            try { 
                this.wakeLock = await navigator.wakeLock.request('screen'); 
                this.wakeLock.addEventListener('release', () => {
                    this.wakeLock = null;
                });
            } catch (e) {}
        }
    }

    releaseWakeLock() {
        if (this.wakeLock) {
            this.wakeLock.release();
            this.wakeLock = null;
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

// --- 2. Main App Controller ---
const App = {
    state: {
        songs: typeof songs !== 'undefined' ? songs : [],
        currentPlaylist: typeof songs !== 'undefined' ? [...songs] : [],
        currentIndex: 0,
        isPlaying: false,
        isRepeatOne: false,
        isShuffle: false,
        showLyrics: false,
        favorites: JSON.parse(localStorage.getItem('sensei_favs')) || [],
        currentSection: 'home', // Nueva sección activa
        currentGenre: null,
        showGenres: false
    },

    engine: null,

    init() {
        this.engine = new AudioEngine();
        
        // Limpiar y validar favoritos guardados
        const savedFavs = JSON.parse(localStorage.getItem('sensei_favs')) || [];
        this.state.favorites = this.cleanSongArray(savedFavs);
        localStorage.setItem('sensei_favs', JSON.stringify(this.state.favorites));

        // Verificar si las canciones están cargadas
        if (this.state.songs.length === 0 && typeof songs !== 'undefined') {
            this.state.songs = songs;
            this.state.currentPlaylist = [...songs];
        }

        if (this.state.songs.length > 0) {
            this.engine.load(this.state.currentPlaylist[0]);
        }
        this.setupEvents();
        this.renderReact();
        this.renderVanilla();
    },

    // Utilidad para limpiar arrays de canciones de datos corruptos
    cleanSongArray(arr) {
        if (!Array.isArray(arr)) return [];
        return arr.filter(song => 
            song && 
            typeof song === 'object' && 
            song.src && 
            song.title && 
            song.artist
        );
    },

    setupEvents() {
        // Eventos Mini Player
        const playPauseBtn = document.getElementById('play-pause');
        const nextBtn = document.getElementById('next');
        const prevMiniBtn = document.getElementById('prev-mini');
        const miniInfo = document.querySelector('.mini-info');

        if (playPauseBtn) playPauseBtn.onclick = (e) => { e.stopPropagation(); this.togglePlay(); };
        if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); this.nextSong(); };
        if (prevMiniBtn) prevMiniBtn.onclick = (e) => { e.stopPropagation(); this.prevSong(); };
        if (miniInfo) miniInfo.onclick = () => openFullPlayer();

        // Eventos Full Player
        const fpPlayPauseBtn = document.getElementById('fp-play-pause');
        const fpNextBtn = document.getElementById('fp-next');
        const fpPrevBtn = document.getElementById('prev');
        const fpShuffleBtn = document.getElementById('shuffle');
        const fpRepeatBtn = document.getElementById('repeat');
        const fpLyricsBtn = document.getElementById('toggle-lyrics-btn');
        const fpFavBtn = document.getElementById('fav-btn-full');

        if (fpPlayPauseBtn) fpPlayPauseBtn.onclick = () => this.togglePlay();
        if (fpNextBtn) fpNextBtn.onclick = () => this.nextSong();
        if (fpPrevBtn) fpPrevBtn.onclick = () => this.prevSong();
        
        if (fpShuffleBtn) fpShuffleBtn.onclick = () => {
            const isShuffle = !this.state.isShuffle;
            let newPlaylist = [...this.state.songs];
            if (isShuffle) {
                newPlaylist.sort(() => Math.random() - 0.5);
            }
            this.setState({ isShuffle, currentPlaylist: newPlaylist, currentIndex: 0 });
            this.loadSong(0);
        };

        if (fpRepeatBtn) fpRepeatBtn.onclick = () => {
            this.setState({ isRepeatOne: !this.state.isRepeatOne });
        };

        if (fpLyricsBtn) fpLyricsBtn.onclick = () => {
            this.setState({ showLyrics: !this.state.showLyrics });
        };

        if (fpFavBtn) {
            fpFavBtn.onclick = (e) => {
                e.preventDefault();
                console.log("Clic en botón favoritos");
                this.toggleFavorite();
            };
        }

        // Eventos de Géneros/Lupa
        const genreToggle = document.getElementById('genre-toggle');
        const searchBtn = document.getElementById('search-toggle');
        const closeGenresBtn = document.getElementById('close-genres');
        const genreItems = document.querySelectorAll('.genre-item');

        if (genreToggle) {
            genreToggle.onclick = () => {
                this.setState({ showGenres: !this.state.showGenres });
            };
        }

        if (searchBtn) {
            searchBtn.onclick = () => {
                // Si ya estamos en home, solo mostramos géneros
                // Si no, vamos a home y mostramos géneros
                this.setState({ currentSection: 'home', showGenres: true });
            };
        }

        if (closeGenresBtn) {
            closeGenresBtn.onclick = () => {
                this.setState({ showGenres: false });
            };
        }

        // Cerrar menú al hacer clic fuera
        const genreMenu = document.getElementById('genre-menu');
        if (genreMenu) {
            genreMenu.onclick = (e) => {
                if (e.target === genreMenu) {
                    this.setState({ showGenres: false });
                }
            };
        }

        genreItems.forEach(item => {
            item.onclick = () => {
                let genre = item.getAttribute('data-genre');
                if (genre === "null") genre = null;
                
                this.setState({ 
                    currentGenre: genre, 
                    showGenres: false,
                    currentSection: 'home' // Volver a home si estábamos en otro sitio
                });
            };
        });

        // Navegación Inferior (Barra de Menú)
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.onclick = () => {
                const section = item.getAttribute('data-section');
                this.setState({ currentSection: section });
            };
        });

        // Progress Seek
        const fpProgress = document.getElementById('fp-progress-container');
        const miniProgress = document.getElementById('progress-container-mini');
        
        if (fpProgress) fpProgress.onclick = (e) => handleSeek(e, 'fp-progress-container');
        if (miniProgress) miniProgress.onclick = (e) => handleSeek(e, 'progress-container-mini');
    },

    toggleFavorite() {
        const currentSong = this.state.currentPlaylist[this.state.currentIndex];
        if (!currentSong) return;

        let newFavs = [...this.state.favorites];
        const index = newFavs.findIndex(s => s.src === currentSong.src);

        if (index > -1) {
            newFavs.splice(index, 1); // Quitar de favoritos
            // Notificar al SW para que considere si quiere borrar el cache (opcional)
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'REMOVE_SONG',
                    url: currentSong.src
                });
            }
        } else {
            // Asegurarnos de guardar el objeto completo de la canción
            newFavs.push({...currentSong}); 
            
            // --- NUEVO: Guardar físicamente en el PWA (Cache Offline) ---
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                console.log("PWA: Solicitando guardado offline de:", currentSong.title);
                navigator.serviceWorker.controller.postMessage({
                    type: 'CACHE_SONG',
                    url: currentSong.src
                });
            }
        }

        this.setState({ favorites: newFavs });
        localStorage.setItem('sensei_favs', JSON.stringify(newFavs));
    },

    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log("Nuevo estado:", this.state);
        this.renderReact();
        this.renderVanilla();
    },

    loadSong(index, forcePlay = false) {
        const song = this.state.currentPlaylist[index];
        if (!song) return;
        this.setState({ currentIndex: index });
        this.engine.load(song);
        // Si ya estaba sonando o forzamos el play (por el evento 'ended')
        if (this.state.isPlaying || forcePlay) {
            this.setState({ isPlaying: true });
            this.engine.play();
        }
    },

    nextSong(forcePlay = false) {
        let nextIndex = (this.state.currentIndex + 1) % this.state.currentPlaylist.length;
        this.loadSong(nextIndex, forcePlay);
    },

    prevSong(forcePlay = false) {
        // Lógica mejorada: si la canción lleva más de 3 segundos, se reinicia.
        // Si lleva menos, va a la anterior.
        if (this.engine.audio.currentTime > 3) {
            this.engine.audio.currentTime = 0;
            if (this.state.isPlaying) this.engine.play();
        } else {
            let prevIndex = (this.state.currentIndex - 1 + this.state.currentPlaylist.length) % this.state.currentPlaylist.length;
            this.loadSong(prevIndex, forcePlay);
        }
    },

    togglePlay() {
        if (this.state.isPlaying) this.engine.pause();
        else this.engine.play();
    },

    renderReact() {
        const rootElement = document.getElementById('react-root');
        if (rootElement && !this.reactRoot) {
            try {
                this.reactRoot = ReactDOM.createRoot(rootElement);
            } catch (e) {
                console.error("Error creating React root:", e);
                // Fallback for React 17 if needed, although we are in 18
            }
        }
        if (this.reactRoot) {
            // Ocultar secciones legacy si estamos usando React
            document.querySelectorAll('.app-section').forEach(s => s.style.display = 'none');
            
            try {
                this.reactRoot.render(React.createElement(PlaylistComponent, { 
                    currentSection: this.state.currentSection,
                    favorites: this.state.favorites,
                    songs: this.state.songs,
                    currentIndex: this.state.currentIndex,
                    currentPlaylist: this.state.currentPlaylist,
                    currentGenre: this.state.currentGenre
                }));
            } catch (e) {
                console.error("Error rendering React component:", e);
            }
        }
    },

    renderVanilla() {
        const current = this.state.currentPlaylist[this.state.currentIndex];
        console.log("Renderizando Vanilla para:", current ? current.title : "ninguna");
        
        const miniTitle = document.getElementById('mini-title');
        const miniArtist = document.getElementById('mini-artist');
        const miniCover = document.getElementById('mini-cover');
        const fpTitle = document.getElementById('fp-title');
        const fpArtist = document.getElementById('fp-artist');
        const fpCover = document.getElementById('fp-cover');
        const fpBg = document.getElementById('fp-bg');
        const lyricsText = document.getElementById('lyrics-text-full');
        const lyricsBtnText = document.getElementById('lyrics-btn-text');
        const lyricsOverlay = document.getElementById('lyrics-static');
        const favBtnFull = document.getElementById('fav-btn-full');

        if (current) {
            if (miniTitle) miniTitle.innerText = current.title;
            if (miniArtist) miniArtist.innerText = current.artist;
            if (miniCover) miniCover.src = current.cover;

            if (fpTitle) fpTitle.innerText = current.title;
            if (fpArtist) fpArtist.innerText = current.artist;
            if (fpCover) fpCover.src = current.cover;
            if (fpBg) fpBg.style.backgroundImage = `url('${current.cover}')`;

            // Actualizar Letras si están visibles
            if (lyricsText && this.state.showLyrics) {
                lyricsText.innerText = typeof letrasData !== 'undefined' ? (letrasData[current.src] || "Letra no disponible.") : "Cargando base de datos de letras...";
            }

            // Actualizar Corazón de Favoritos
            if (favBtnFull) {
                const isFav = this.state.favorites.some(s => s.src === current.src);
                console.log("¿Es favorita?", isFav);
                favBtnFull.innerHTML = isFav ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
                favBtnFull.classList.toggle('is-favorite', isFav);
            }
        }

        // Toggle Visual de Letras
        if (lyricsOverlay) {
            lyricsOverlay.classList.toggle('hidden', !this.state.showLyrics);
            if (lyricsBtnText) lyricsBtnText.innerText = this.state.showLyrics ? "OCULTAR LETRA" : "VER LETRA";
        }

        const playIcons = document.querySelectorAll('#play-pause i, #fp-play-pause i');
        playIcons.forEach(icon => {
            icon.className = this.state.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        });

        // Actualizar botones de estado (Shuffle/Repeat)
        const shuffleBtn = document.getElementById('shuffle');
        const repeatBtn = document.getElementById('repeat');
        if (shuffleBtn) shuffleBtn.classList.toggle('active-glow', this.state.isShuffle);
        
        if (repeatBtn) {
            repeatBtn.classList.toggle('active-glow', this.state.isRepeatOne);
            // Mostrar u ocultar el número 1
            if (this.state.isRepeatOne) {
                repeatBtn.innerHTML = '<i class="fas fa-redo"></i><span class="repeat-1-badge">1</span>';
            } else {
                repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
            }
        }

        // Actualizar Navegación Activa
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const section = item.getAttribute('data-section');
            item.classList.toggle('active', section === this.state.currentSection);
        });

        // Actualizar Menú de Géneros
        const genreMenu = document.getElementById('genre-menu');
        if (genreMenu) {
            genreMenu.classList.toggle('hidden', !this.state.showGenres);
        }

        const genreItems = document.querySelectorAll('.genre-item');
        genreItems.forEach(item => {
            let genre = item.getAttribute('data-genre');
            if (genre === "null") genre = null;
            item.classList.toggle('active', genre === this.state.currentGenre);
        });
    }
};

// --- 3. React Component ---
const PlaylistComponent = (props) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    
    // Usar props en lugar de estado interno hackeado
    const { currentSection, favorites, songs, currentIndex, currentPlaylist, currentGenre } = props;

    let baseSongs = currentSection === 'favorites' ? favorites : (currentSection === 'home' ? songs : []);
    
    // --- LIMPIEZA DE SEGURIDAD ---
    // Asegurarnos de que baseSongs sea un array válido y no contenga nulos
    baseSongs = (baseSongs || []).filter(s => s && s.title && s.artist);
    
    // Filtrar por género si hay uno seleccionado
    if (currentGenre && currentSection === 'home') {
        baseSongs = baseSongs.filter(s => s.genre && s.genre.toUpperCase() === currentGenre.toUpperCase());
    }
    
    const filteredSongs = baseSongs.filter(s => 
        (s.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
        (s.artist || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return React.createElement('div', { className: 'playlist-advanced' },
        React.createElement('div', { className: 'playlist-header' },
            React.createElement('h2', null, 
                currentSection === 'favorites' ? 'Mis Favoritos' : 
                currentSection === 'profile' ? 'Mi Perfil' : 
                (currentGenre ? `Género: ${currentGenre}` : 'Descubrir')
            ),
            currentSection !== 'profile' && React.createElement('input', {
                type: 'text',
                placeholder: 'Buscar música...',
                className: 'search-advanced',
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
            })
        ),
        React.createElement('div', { className: 'song-grid' },
            currentSection === 'profile' ? 
            React.createElement('div', { className: 'profile-info' }, 
                React.createElement('div', { className: 'no-results' }, 'Configuración y perfil de usuario (Próximamente)')
            ) :
            (filteredSongs.length > 0 ? 
            filteredSongs.map((song, i) => {
                const isCurrent = currentPlaylist[currentIndex]?.src === song.src;
                return React.createElement('div', { 
                    key: song.src,
                    className: `song-item ${isCurrent ? 'active' : ''}`,
                    onClick: () => {
                        App.setState({ currentPlaylist: filteredSongs });
                        const newIndex = filteredSongs.findIndex(s => s.src === song.src);
                        App.loadSong(newIndex);
                        App.engine.play();
                        openFullPlayer();
                    }
                },
                    React.createElement('img', { 
                        src: song.cover, 
                        onError: (e) => { e.target.src = '../logo SENSEI.png'; }
                    }),
                    React.createElement('h4', null, song.title),
                    React.createElement('p', null, song.artist)
                );
            }) :
            React.createElement('div', { className: 'no-results' }, 
                currentSection === 'favorites' ? 'No tienes favoritos aún.' : 'No se encontraron canciones.'
            ))
        )
    );
};

// --- 4. Matrix & Global Init ---
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    initMatrix();
});

// Re-adquirir Wake Lock cuando la app vuelve a estar visible (si se estaba reproduciendo)
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && App.state.isPlaying) {
        if (App.engine) App.engine.requestWakeLock();
    }
});

// Matrix Logic (Simplificada)
function initMatrix() {
    const container = document.getElementById('matrix-bg');
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.onresize = resize;
    resize();

    const drops = Array(Math.floor(canvas.width/15)).fill(1);
    setInterval(() => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = "15px monospace";
        drops.forEach((y, i) => {
            const text = String.fromCharCode(Math.random()*128);
            ctx.fillText(text, i*15, y*15);
            if(y*15 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 33);
}

// Eventos de botones
// Se han movido a App.setupEvents() para mayor robustez

// Botones de estado (eliminados de aquí ya que están en setupEvents)

// --- Seek Logic ---
const handleSeek = (e, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const audio = document.getElementById('audio-player');
    if (audio && audio.duration) {
        audio.currentTime = percent * audio.duration;
    }
};

function openFullPlayer() { 
    document.getElementById('full-player').style.transform = 'translateX(-50%) translateY(0)';
    // Agregar estado al historial para el botón atrás del teléfono
    if (!window.location.hash.includes('player')) {
        history.pushState({ player: 'open' }, '', '#player');
    }
}

function closeFullPlayer() { 
    document.getElementById('full-player').style.transform = 'translateX(-50%) translateY(100%)';
    // Si cerramos manualmente y hay hash, retrocedemos en el historial
    if (window.location.hash === '#player') {
        history.back();
    }
}

// Escuchar el botón atrás del teléfono
window.addEventListener('popstate', (event) => {
    if (window.location.hash !== '#player') {
        // Si ya no estamos en el hash del player, lo cerramos visualmente
        document.getElementById('full-player').style.transform = 'translateX(-50%) translateY(100%)';
    } else {
        // Si volvemos al hash (por ejemplo, recarga), lo abrimos
        document.getElementById('full-player').style.transform = 'translateX(-50%) translateY(0)';
    }
});
