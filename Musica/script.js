/**
 * SENSEI_AUDIO_PLAYER - ADVANCED PWA ENGINE (React Hybrid)
 * Versión 69 - UI + Perfil/Playlists + Offline + fixes móviles
 */

console.log("SENSEI MUSIC: script cargado (tabs/favoritos/perfil) v69");

// En file:// algunos navegadores bloquean localStorage (SecurityError) y eso rompe toda la app.
// Usamos un wrapper seguro para que la UI (tabs/favoritos/perfil) no se caiga.
const SafeStorage = {
    get(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
        try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
    },
    getJSON(key, fallback) {
        try {
            const raw = this.get(key);
            if (!raw) return fallback;
            const parsed = JSON.parse(raw);
            return parsed ?? fallback;
        } catch (e) {
            return fallback;
        }
    },
    setJSON(key, value) {
        try { return this.set(key, JSON.stringify(value)); } catch (e) { return false; }
    }
};

// --- 1. Audio Engine (Core Playback Logic) ---
class AudioEngine {
    constructor() {
        this.audio = document.getElementById('audio-player');
        // Mejor compatibilidad móvil/iOS
        try {
            this.audio.preload = 'auto';
            this.audio.playsInline = true;
        } catch (e) {}
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

        // En móviles a veces el audio entra en "waiting/stalled" y parece que se queda mudo.
        // Esto intenta reanudar si seguimos en modo reproducción.
        const tryResume = () => {
            if (App.state.isPlaying) {
                setTimeout(() => {
                    // Reintentar play sin cambiar de canción
                    this.play().catch(() => {});
                }, 700);
            }
        };
        this.audio.addEventListener('waiting', tryResume);
        this.audio.addEventListener('stalled', tryResume);

        this.audio.addEventListener('play', () => {
            App.setState({ isPlaying: true });
            this.requestWakeLock();
            this.updateMediaSession('playing');

            // Pre-cache inteligente (no debe competir con el buffer inicial)
            // Esto mejora el "delay" en la siguiente canción y en replays.
            if (typeof App.maybePrecacheAroundCurrent === 'function') {
                App.maybePrecacheAroundCurrent();
            }
            
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
        // IMPORTANTE: muchos nombres de archivos tienen espacios/acentos/comas.
        // Usar URL absoluta (ya codificada) evita que algunas canciones “no suenen” (404) en móviles/PWA.
        let src = song.src;
        try {
            if (typeof App !== 'undefined' && App && typeof App.toAbsUrl === 'function') {
                src = App.toAbsUrl(song.src);
            } else {
                src = new URL(song.src, window.location.href).href;
            }
        } catch (e) {}
        this.audio.src = src;
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
        favorites: SafeStorage.getJSON('sensei_favs', []),
        downloads: SafeStorage.getJSON('sensei_downloads', []), // Nueva lista de descargas
        queue: SafeStorage.getJSON('sensei_queue', []), // Cola de reproducción
        history: SafeStorage.getJSON('sensei_history', []), // Historial (últimas reproducidas)
        playlists: SafeStorage.getJSON('sensei_playlists', []), // Playlists personalizadas
        profileTab: SafeStorage.get('sensei_profile_tab') || 'downloads', // downloads | playlists | history
        activePlaylistId: SafeStorage.get('sensei_active_playlist') || null,
        user: null, // Firebase user (si hay sesión)
        authReady: false,
        pendingDownloads: {}, // Descargas en progreso: { [url]: song }
        offlineStatus: {}, // Resultado de verificación offline: { [url]: true/false }
        bulkDownload: { active: false, done: 0, total: 0 }, // Descarga TODO (progreso)
        currentSection: 'home', // Nueva sección activa
        currentGenre: null,
        showGenres: false
    },

    engine: null,

    init() {
        this.engine = new AudioEngine();
        this.state.pendingDownloads = {};
        this.state.offlineStatus = {};
        this.state.bulkDownload = { active: false, done: 0, total: 0 };
        
        // Limpiar y validar favoritos guardados
        const savedFavs = SafeStorage.getJSON('sensei_favs', []);
        this.state.favorites = this.cleanSongArray(savedFavs);
        SafeStorage.setJSON('sensei_favs', this.state.favorites);

        // Limpiar y validar descargas guardadas (para que "Perfil" siempre renderice bien)
        const savedDownloads = SafeStorage.getJSON('sensei_downloads', []);
        this.state.downloads = this.cleanSongArray(savedDownloads);
        SafeStorage.setJSON('sensei_downloads', this.state.downloads);

        // Limpiar y validar cola e historial
        const savedQueue = SafeStorage.getJSON('sensei_queue', []);
        this.state.queue = this.cleanSongArray(savedQueue);
        SafeStorage.setJSON('sensei_queue', this.state.queue);

        const savedHistory = SafeStorage.getJSON('sensei_history', []);
        this.state.history = this.cleanSongArray(savedHistory);
        SafeStorage.setJSON('sensei_history', this.state.history);

        // Playlists personalizadas
        this.state.playlists = this.cleanPlaylists(SafeStorage.getJSON('sensei_playlists', []));
        SafeStorage.setJSON('sensei_playlists', this.state.playlists);

        // Verificar si las canciones están cargadas
        if (this.state.songs.length === 0 && typeof songs !== 'undefined') {
            this.state.songs = songs;
            this.state.currentPlaylist = [...songs];
        }

        if (this.state.songs.length > 0) {
            this.engine.load(this.state.currentPlaylist[0]);
            // Cache offline: NO lo iniciamos agresivamente mientras el usuario reproduce,
            // porque en móviles eso causa cortes/mudos por saturación.
            this.scheduleCacheAllSongs();
        }
        this.setupEvents();
        this.renderReact();
        this.renderVanilla();

        // Vincular Perfil con Login/Register (Firebase)
        this.initAuth();
    },

    cleanPlaylists(arr) {
        if (!Array.isArray(arr)) return [];
        return arr
            .filter(p => p && typeof p === 'object' && p.id && p.name)
            .map(p => ({
                id: String(p.id),
                name: String(p.name).slice(0, 40),
                tracks: Array.isArray(p.tracks) ? p.tracks.filter(Boolean).map(String) : []
            }));
    },

    setProfileTab(tab) {
        const allowed = ['downloads', 'playlists', 'history'];
        const value = allowed.includes(tab) ? tab : 'downloads';
        this.setState({ profileTab: value, activePlaylistId: null });
        SafeStorage.set('sensei_profile_tab', value);
        SafeStorage.set('sensei_active_playlist', '');
    },

    openPlaylist(id) {
        const pid = String(id || '').trim();
        const value = pid ? pid : null;
        this.setState({ activePlaylistId: value, profileTab: 'playlists' });
        SafeStorage.set('sensei_active_playlist', value || '');
        SafeStorage.set('sensei_profile_tab', 'playlists');
    },

    createPlaylist(name) {
        const trimmed = (name || '').trim();
        if (!trimmed) return;
        const id = `pl_${Date.now()}`;
        const playlists = [...(this.state.playlists || []), { id, name: trimmed.slice(0, 40), tracks: [] }];
        this.setState({ playlists, profileTab: 'playlists', activePlaylistId: id });
        SafeStorage.setJSON('sensei_playlists', playlists);
        SafeStorage.set('sensei_active_playlist', id);
        SafeStorage.set('sensei_profile_tab', 'playlists');
        this.scheduleUserSync();
        this.showToast("PLAYLIST CREADA");
    },

    deletePlaylist(id) {
        const pid = String(id || '');
        const playlists = (this.state.playlists || []).filter(p => p.id !== pid);
        const nextActive = this.state.activePlaylistId === pid ? null : this.state.activePlaylistId;
        this.setState({ playlists, activePlaylistId: nextActive });
        SafeStorage.setJSON('sensei_playlists', playlists);
        if (!nextActive) SafeStorage.set('sensei_active_playlist', '');
        this.scheduleUserSync();
    },

    addSongToPlaylist(song, playlistId) {
        if (!song || !song.src) return;
        const pid = String(playlistId || this.state.activePlaylistId || '');
        if (!pid) return;
        const playlists = (this.state.playlists || []).map(p => {
            if (p.id !== pid) return p;
            const tracks = Array.isArray(p.tracks) ? [...p.tracks] : [];
            if (!tracks.includes(song.src)) tracks.push(song.src);
            return { ...p, tracks };
        });
        this.setState({ playlists });
        SafeStorage.setJSON('sensei_playlists', playlists);
        this.scheduleUserSync();
        this.showToast("AÑADIDO A PLAYLIST");
    },

    removeSongFromPlaylist(src, playlistId) {
        const pid = String(playlistId || this.state.activePlaylistId || '');
        if (!pid || !src) return;
        const playlists = (this.state.playlists || []).map(p => {
            if (p.id !== pid) return p;
            const tracks = (p.tracks || []).filter(s => s !== src);
            return { ...p, tracks };
        });
        this.setState({ playlists });
        SafeStorage.setJSON('sensei_playlists', playlists);
        this.scheduleUserSync();
    },

    initAuth() {
        const updateFromBridge = async (user) => {
            this.setState({ user: user || null, authReady: true });
            try {
                const bridge = window.SenseiAuthBridge;
                if (user && bridge?.loadUserData) {
                    const data = await bridge.loadUserData(user.uid);
                    const music = data?.music || null;
                    if (music) {
                        const dict = new Map((this.state.songs || []).map(s => [s.src, s]));
                        const mapBySrc = (srcs) =>
                            (Array.isArray(srcs) ? srcs : []).map(src => dict.get(src)).filter(Boolean);

                        const newFavs = mapBySrc(music.favorites || []);
                        const newDownloads = mapBySrc(music.downloads || []);
                        const newQueue = mapBySrc(music.queue || []);
                        const newHistory = mapBySrc(music.history || []);
                        const newPlaylists = this.cleanPlaylists(music.playlists || []);

                        this.setState({
                            favorites: newFavs,
                            downloads: newDownloads,
                            queue: newQueue,
                            history: newHistory,
                            playlists: newPlaylists
                        });

                        SafeStorage.setJSON('sensei_favs', newFavs);
                        SafeStorage.setJSON('sensei_downloads', newDownloads);
                        SafeStorage.setJSON('sensei_queue', newQueue);
                        SafeStorage.setJSON('sensei_history', newHistory);
                        SafeStorage.setJSON('sensei_playlists', newPlaylists);
                    }
                }
            } catch (e) {}
        };

        window.addEventListener('sensei-auth-changed', (evt) => updateFromBridge(evt?.detail || null));

        if (window.SenseiAuthBridge) {
            updateFromBridge(window.SenseiAuthBridge.user || null);
        } else {
            this.setState({ authReady: false });
        }
    },

    scheduleUserSync() {
        const bridge = window.SenseiAuthBridge;
        const user = this.state.user;
        if (!user || !bridge?.saveUserMusicData) return;

        if (this._syncTimer) clearTimeout(this._syncTimer);
        this._syncTimer = setTimeout(async () => {
            try {
                const payload = {
                    favorites: (this.state.favorites || []).map(s => s.src),
                    downloads: (this.state.downloads || []).map(s => s.src),
                    queue: (this.state.queue || []).map(s => s.src),
                    history: (this.state.history || []).map(s => s.src),
                    playlists: (this.state.playlists || []).map(p => ({ id: p.id, name: p.name, tracks: p.tracks || [] }))
                };
                await bridge.saveUserMusicData(user.uid, payload);
            } catch (e) {}
        }, 900);
    },

    // Convertir rutas relativas ("tracks/..") a URL absoluta real ("/Musica/tracks/..")
    // Esto es CLAVE para que el Service Worker cachee bien las canciones.
    toAbsUrl(url) {
        try {
            return new URL(url, window.location.href).href;
        } catch (e) {
            return url;
        }
    },

    // Enviar mensajes al SW incluso en la primera carga (cuando aún no hay controller)
    async postToSW(message) {
        if (!('serviceWorker' in navigator)) return false;
        try {
            const reg = await navigator.serviceWorker.ready;
            const sw = reg.active || reg.waiting || reg.installing;
            if (sw) {
                sw.postMessage(message);
                return true;
            }
        } catch (e) {}
        return false;
    },

    scheduleCacheAllSongs() {
        // Esperar a que el SW esté listo y el render inicial termine.
        // Además, si el usuario está reproduciendo, reprogramamos (evita cortes).
        setTimeout(() => this.cacheAllSongs(), 2000);
    },

    cacheAllSongs() {
        // Verificar si ya hemos cacheado en esta versión para no saturar el navegador
        const lastCacheVersion = SafeStorage.get('sensei_cache_v');
        const currentVersion = 'v69'; // Debe coincidir con CACHE_NAME del service-worker.js

        if (lastCacheVersion === currentVersion) return;
        if (!this.state.songs || this.state.songs.length === 0) return;
        if (!navigator.onLine) return; // para cachear necesitas red al menos una vez

        // Si el usuario está escuchando, esperamos y lo intentamos luego (reduce cortes).
        if (this.state.isPlaying) {
            setTimeout(() => this.cacheAllSongs(), 5000);
            return;
        }

        const songUrls = this.state.songs.map(song => this.toAbsUrl(song.src));
        console.log("PWA: Solicitando cache de TODAS las canciones...", songUrls.length);

        // UI de progreso (NO marcamos como Descargadas hasta que el SW confirme finalización)
        this.setState({ bulkDownload: { active: true, done: 0, total: songUrls.length } });
        this.showBulkDownloadModal();
        this.updateBulkDownloadModal(0, songUrls.length);
        this.showToast("DESCARGANDO TODO... (NO CIERRES LA APP)");

        this.postToSW({
            type: 'CACHE_ALL_SONGS',
            urls: songUrls
        });
    },

    showBulkDownloadModal() {
        if (document.getElementById('bulk-dl-modal')) return;
        const modal = document.createElement('div');
        modal.id = 'bulk-dl-modal';
        modal.className = 'bulk-dl-modal';
        modal.innerHTML = `
          <div class="bulk-dl-card">
            <div class="bulk-dl-title">DESCARGANDO TODO</div>
            <div class="bulk-dl-sub" id="bulk-dl-sub">Preparando...</div>
            <div class="bulk-dl-bar"><div class="bulk-dl-bar-fill" id="bulk-dl-bar-fill"></div></div>
            <div class="bulk-dl-actions">
              <button class="bulk-dl-btn" id="bulk-dl-hide">OCULTAR</button>
            </div>
            <div class="bulk-dl-tip">
              Consejo: en iPhone/Android no bloquees la pantalla mientras descarga.
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#bulk-dl-hide')?.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    },

    updateBulkDownloadModal(done, total) {
        const sub = document.getElementById('bulk-dl-sub');
        const fill = document.getElementById('bulk-dl-bar-fill');
        if (!sub || !fill) return;
        const t = Math.max(0, Number(total || 0));
        const d = Math.max(0, Math.min(Number(done || 0), t || 0));
        const pct = t ? Math.round((d / t) * 100) : 0;
        sub.textContent = `Progreso: ${d}/${t} (${pct}%)`;
        fill.style.width = `${pct}%`;
    },

    finishBulkDownloadModal(ok = true) {
        const modal = document.getElementById('bulk-dl-modal');
        const sub = document.getElementById('bulk-dl-sub');
        const fill = document.getElementById('bulk-dl-bar-fill');
        if (!modal || !sub || !fill) return;
        modal.classList.remove('hidden');
        sub.textContent = ok ? 'OFFLINE LISTO ✅' : 'No se pudo completar ❌';
        fill.style.width = ok ? '100%' : fill.style.width;
        setTimeout(() => {
            try { modal.remove(); } catch (e) {}
        }, 2500);
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
        // ... (Mini Player events)
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
        const fpMenuBtn = document.getElementById('fp-menu-btn');
        const fpContextMenu = document.getElementById('fp-context-menu');
        const menuFavBtn = document.getElementById('menu-fav-btn');
        const menuDownloadBtn = document.getElementById('menu-download-btn');
        const menuQueueBtn = document.getElementById('menu-queue-btn');
        const downloadBtnFull = document.getElementById('download-btn-full');

        if (fpPlayPauseBtn) fpPlayPauseBtn.onclick = () => this.togglePlay();
        if (fpNextBtn) fpNextBtn.onclick = () => this.nextSong();
        if (fpPrevBtn) fpPrevBtn.onclick = () => this.prevSong();

        // Menú de 3 puntos (Contextual)
        const openContextMenu = () => {
            if (!fpContextMenu) return;
            fpContextMenu.classList.remove('hidden');
            fpContextMenu.style.zIndex = '30000';
            fpContextMenu.style.position = 'fixed';

            // Posicionar el menú cerca del botón (mejor en móviles/PWA)
            try {
                const rect = fpMenuBtn?.getBoundingClientRect?.();
                if (rect) {
                    // Primero medimos ancho/alto
                    fpContextMenu.style.visibility = 'hidden';
                    fpContextMenu.style.left = '0px';
                    fpContextMenu.style.top = '0px';
                    const w = fpContextMenu.offsetWidth || 240;
                    const h = fpContextMenu.offsetHeight || 160;

                    let left = Math.min(window.innerWidth - w - 12, rect.right - w);
                    left = Math.max(12, left);
                    let top = rect.bottom + 10;
                    if (top + h > window.innerHeight - 12) top = rect.top - h - 10;
                    top = Math.max(12, top);

                    fpContextMenu.style.left = `${left}px`;
                    fpContextMenu.style.top = `${top}px`;
                    fpContextMenu.style.right = 'auto';
                }
            } catch (e) {}
            // Asegurar visibilidad aunque falle el cálculo
            fpContextMenu.style.visibility = 'visible';

            // Actualizar texto/icono del favorito
            try {
                const current = this.state.currentPlaylist?.[this.state.currentIndex];
                if (current && menuFavBtn) {
                    const isFav = this.state.favorites?.some(s => s.src === current.src);
                    const sp = menuFavBtn.querySelector('span');
                    const ic = menuFavBtn.querySelector('i');
                    if (sp) sp.innerText = isFav ? 'Quitar de Favoritos' : 'Añadir a Favoritos';
                    else menuFavBtn.textContent = isFav ? 'Quitar de Favoritos' : 'Añadir a Favoritos';
                    if (ic) ic.className = isFav ? 'fas fa-heart' : 'far fa-heart';
                }
                // Asegurar textos visibles (por si el HTML fue modificado o el span no existe)
                menuDownloadBtn?.querySelector?.('span')?.textContent && (menuDownloadBtn.querySelector('span').textContent = 'Descargar Música');
                menuQueueBtn?.querySelector?.('span')?.textContent && (menuQueueBtn.querySelector('span').textContent = 'Añadir a Cola');
            } catch (e) {}
        };

        const toggleContextMenu = () => {
            if (!fpContextMenu) return;
            if (fpContextMenu.classList.contains('hidden')) openContextMenu();
            else fpContextMenu.classList.add('hidden');
        };

        if (fpMenuBtn) {
            // En móviles, "pointerdown" + "click" puede disparar dos veces (abre y cierra al instante).
            // Usamos un guard para que un tap normal funcione sin tener que dejar presionado.
            let lastPointerDown = 0;

            fpMenuBtn.addEventListener('pointerdown', (e) => {
                lastPointerDown = Date.now();
                e.stopPropagation();
                toggleContextMenu();
            });

            fpMenuBtn.addEventListener('click', (e) => {
                // Si ya manejamos el tap por pointerdown, ignoramos este click (evita doble toggle)
                if (Date.now() - lastPointerDown < 600) return;
                e.stopPropagation();
                toggleContextMenu();
            });
        }

        if (menuFavBtn) {
            menuFavBtn.onclick = () => {
                this.toggleFavorite();
                fpContextMenu.classList.add('hidden');
            };
        }

        // Cola: añadir la canción actual para reproducirla "después" o como siguiente
        if (menuQueueBtn) {
            menuQueueBtn.onclick = () => {
                const current = this.state.currentPlaylist[this.state.currentIndex];
                if (current) {
                    // playNext=true -> quedará como la próxima canción al terminar esta
                    this.addToQueue(current, { playNext: true });
                    this.showToast("AÑADIDO A COLA");
                }
                fpContextMenu.classList.add('hidden');
            };
        }

        if (menuDownloadBtn) {
            menuDownloadBtn.onclick = () => {
                const current = this.state.currentPlaylist[this.state.currentIndex];
                if (current) {
                    this.downloadCurrentSong(current);
                }
                fpContextMenu.classList.add('hidden');
            };
        }

        // Botón de descarga directo (en el player, tipo Spotify)
        if (downloadBtnFull) {
            downloadBtnFull.onclick = (e) => {
                e.preventDefault();
                const current = this.state.currentPlaylist[this.state.currentIndex];
                if (current) this.downloadCurrentSong(current);
            };
        }

        // Cerrar menú al tocar fuera (móvil/PC)
        document.addEventListener('pointerdown', (e) => {
            if (!fpContextMenu || fpContextMenu.classList.contains('hidden')) return;
            const t = e.target;
            if (fpContextMenu.contains(t) || fpMenuBtn?.contains?.(t)) return;
            fpContextMenu.classList.add('hidden');
        });

        // SW Message Listener (para feedback de descarga)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'DOWNLOAD_COMPLETE') {
                    const ok = !!event.data.ok;
                    const url = event.data.url;
                    // Solo marcar como "descargada" cuando el SW confirme que cacheó OK (para offline real)
                    if (ok && url && this.state.pendingDownloads && this.state.pendingDownloads[url]) {
                        const song = this.state.pendingDownloads[url];
                        const pending = { ...this.state.pendingDownloads };
                        delete pending[url];

                        let newDownloads = [...(this.state.downloads || [])];
                        if (!newDownloads.some(s => s.src === song.src)) newDownloads.push({ ...song });
                        this.setState({ downloads: newDownloads, pendingDownloads: pending });
                        SafeStorage.setJSON('sensei_downloads', newDownloads);
                        this.scheduleUserSync();
                        this.showToast("DESCARGA COMPLETA (OFFLINE)");
                    } else if (!ok && url) {
                        const pending = { ...(this.state.pendingDownloads || {}) };
                        delete pending[url];
                        this.setState({ pendingDownloads: pending });
                        this.showToast("NO SE PUDO DESCARGAR");
                    } else {
                        // fallback
                        this.showToast(ok ? "DESCARGA COMPLETA" : "NO SE PUDO DESCARGAR");
                    }
                }
                if (event.data.type === 'CACHE_PROGRESS') {
                    const done = Number(event.data.done || 0);
                    const total = Number(event.data.total || 0);
                    this.setState({ bulkDownload: { active: true, done, total } });
                    this.updateBulkDownloadModal(done, total);
                }
                if (event.data.type === 'CACHE_ALL_COMPLETE') {
                    // Finalizó el proceso del SW (pero puede haber fallos por espacio/conexión).
                    // Verificamos de verdad qué quedó en cache y SOLO esas marcamos como Descargadas.
                    (async () => {
                        try {
                            const urls = (this.state.songs || []).map(s => this.toAbsUrl(s.src)).filter(Boolean);
                            const res = await this.verifyOfflineDownloadsLocal(urls);
                            const cachedSet = new Set((res.cached || []).map(String));
                            const downloaded = this.cleanSongArray(this.state.songs).filter(s => cachedSet.has(this.toAbsUrl(s.src)));

                            this.setState({
                                downloads: downloaded,
                                bulkDownload: { active: false, done: downloaded.length, total: urls.length }
                            });
                            SafeStorage.setJSON('sensei_downloads', downloaded);
                            SafeStorage.set('sensei_cache_v', 'v69');
                            this.scheduleUserSync();

                            // Guardar status para evitar “mudos” al pasar de canción offline
                            const map = {};
                            downloaded.forEach(s => { map[this.toAbsUrl(s.src)] = true; });
                            this.setState({ offlineStatus: map });

                            const ok = downloaded.length === urls.length && urls.length > 0;
                            this.finishBulkDownloadModal(ok);
                            this.showToast(ok
                                ? "OFFLINE LISTO ✅ (MODO AVIÓN OK)"
                                : `DESCARGA PARCIAL: ${downloaded.length}/${urls.length}`
                            );
                        } catch (e) {
                            this.finishBulkDownloadModal(false);
                            this.showToast("NO SE PUDO COMPLETAR OFFLINE");
                        }
                    })();
                }

                if (event.data.type === 'CHECK_CACHED_RESULT') {
                    const cached = Array.isArray(event.data.cached) ? event.data.cached : [];
                    const total = Number(event.data.total || 0);
                    this.handleVerifyResult(cached, total);
                }
            });
        }
        
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
                // Mensaje VIP (el usuario pidió una ventana al tocar el ícono)
                // Nota: dejamos las categorías accesibles desde el botón de búsqueda (lupa).
                alert("Usted es Miembro VIP");
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
        // Más robusto: delegación de eventos en el contenedor (evita fallos en móviles y dobles handlers).
        const nav = document.querySelector('.app-nav');
        if (nav) {
            const findNavItem = (target) => {
                // Fallback compatible (por si "closest" falla en algún navegador)
                let el = target;
                while (el && el !== nav) {
                    if (el.classList && el.classList.contains('nav-item')) return el;
                    el = el.parentNode;
                }
                return null;
            };
            const navHandler = (e) => {
                const btn = (e.target && e.target.closest) ? e.target.closest('.nav-item') : findNavItem(e.target);
                if (!btn) return;
                e.preventDefault();
                const section = btn.getAttribute('data-section') || 'home';
                this.setState({ currentSection: section });

                const main = document.querySelector('.app-main');
                if (main) main.scrollTo({ top: 0, behavior: 'smooth' });

                // (Quitado) No mostrar mensaje al cambiar de pestaña
            };

            // Limpiar handlers anteriores por si existían
            nav.onclick = null;
            nav.onpointerup = null;
            nav.ontouchend = null;

            nav.addEventListener('pointerup', navHandler, { passive: false });
            nav.addEventListener('click', navHandler, { passive: false });
            nav.addEventListener('touchend', navHandler, { passive: false });
        }

        // Progress Seek
        const fpProgress = document.getElementById('fp-progress-container');
        const miniProgress = document.getElementById('progress-container-mini');
        
        if (fpProgress) fpProgress.onclick = (e) => handleSeek(e, 'fp-progress-container');
        if (miniProgress) miniProgress.onclick = (e) => handleSeek(e, 'progress-container-mini');
    },

    toggleFavorite() {
        const currentSong = this.state.currentPlaylist[this.state.currentIndex];
        if (!currentSong) return;
        this.toggleFavoriteSong(currentSong);
    },

    isFavoriteSong(song) {
        return !!this.state.favorites?.some(s => s?.src === song?.src);
    },

    // Favoritos por canción (para botones dentro de la cuadrícula)
    toggleFavoriteSong(song) {
        if (!song) return;
        let newFavs = [...(this.state.favorites || [])];
        const index = newFavs.findIndex(s => s.src === song.src);

        if (index > -1) {
            newFavs.splice(index, 1);
            this.postToSW({ type: 'REMOVE_SONG', url: this.toAbsUrl(song.src) });
        } else {
            newFavs.push({ ...song });
            // Opcional: también guardar físicamente offline si el usuario quiere
            this.postToSW({ type: 'CACHE_SONG', url: this.toAbsUrl(song.src) });
        }

        this.setState({ favorites: newFavs });
        SafeStorage.setJSON('sensei_favs', newFavs);
        this.showToast(index > -1 ? "QUITADO DE FAVORITOS" : "AÑADIDO A FAVORITOS");
        this.scheduleUserSync();
    },

    isDownloadedSong(song) {
        return !!this.state.downloads?.some(s => s?.src === song?.src);
    },

    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log("Nuevo estado:", this.state);
        this.renderReact();
        this.renderVanilla();
    },

    showToast(message) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        container.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    },

    // Descargar y guardar en "Perfil" (Descargadas)
    downloadCurrentSong(song) {
        if (!song) return;
        const absUrl = this.toAbsUrl(song.src);

        // Marcar como "en progreso" y SOLO agregar a Descargadas cuando el SW confirme (DOWNLOAD_COMPLETE ok)
        const pending = { ...(this.state.pendingDownloads || {}) };
        pending[absUrl] = { ...song };
        this.setState({ pendingDownloads: pending });
        this.showToast("DESCARGANDO PARA OFFLINE...");

        this.postToSW({ type: 'CACHE_SONG', url: absUrl });
    },

    // Verificar si las descargas realmente están guardadas offline (Cache Storage via SW)
    verifyOfflineDownloads() {
        const urls = (this.state.downloads || []).map(s => this.toAbsUrl(s.src)).filter(Boolean);
        if (!urls.length) {
            this.showToast("NO HAY DESCARGAS");
            return;
        }
        const modeLabel = navigator.onLine ? "ONLINE" : "OFFLINE";
        this.showToast(`VERIFICANDO ${modeLabel}...`);

        // Token para evitar respuestas viejas
        this._verifyToken = (this._verifyToken || 0) + 1;
        const token = this._verifyToken;
        this._verifyHandled = false;

        // 1) Intentar vía Service Worker (rápido)
        this.postToSW({ type: 'CHECK_CACHED_URLS', urls, token });

        // 2) Fallback: si el SW no responde (por caché viejo / no control / etc.),
        // hacemos verificación directa desde CacheStorage en la página.
        clearTimeout(this._verifyTimer);
        this._verifyTimer = setTimeout(async () => {
            if (this._verifyHandled || token !== this._verifyToken) return;
            try {
                const result = await this.verifyOfflineDownloadsLocal(urls);
                if (token !== this._verifyToken) return;
                this.handleVerifyResult(result.cached || [], result.total || urls.length);
            } catch (e) {
                if (token !== this._verifyToken) return;
                this.showToast("NO SE PUDO VERIFICAR");
            }
        }, 2500);
    },

    async verifyOfflineDownloadsLocal(urls) {
        if (!('caches' in window)) return { cached: [], total: urls.length, error: true };
        const keys = await caches.keys();
        const candidates = keys.filter(k => k.startsWith('sensei-music-'));
        const cacheName = candidates.sort().slice(-1)[0];
        if (!cacheName) return { cached: [], total: urls.length, error: true };

        const cache = await caches.open(cacheName);
        const cached = [];
        for (const u of urls) {
            try {
                const req = new Request(u, { method: 'GET' });
                const hit = await cache.match(req);
                if (hit) cached.push(u);
            } catch (e) {}
        }
        return { cached, total: urls.length };
    },

    handleVerifyResult(cachedUrls, total) {
        this._verifyHandled = true;
        clearTimeout(this._verifyTimer);

        const cached = Array.isArray(cachedUrls) ? cachedUrls : [];
        const map = {};
        cached.forEach(u => { map[u] = true; });
        this.setState({ offlineStatus: map });

        const label = navigator.onLine ? "VERIFICADO ONLINE" : "VERIFICADO OFFLINE";
        this.showToast(`${label}: ${cached.length}/${Math.max(0, total || 0)}`);
    },

    // Cachear en segundo plano SIN marcar como "Descargada" (mejora velocidad sin llenar Perfil)
    cacheSongSilently(song, delayMs = 0) {
        if (!song) return;
        if (!navigator.onLine) return;

        // Evitar descargas si el usuario activó "ahorro de datos"
        const conn = navigator.connection;
        if (conn && conn.saveData) return;

        setTimeout(() => {
            this.postToSW({
                type: 'CACHE_SONG',
                url: this.toAbsUrl(song.src)
            });
        }, Math.max(0, delayMs));
    },

    // Estrategia: al iniciar play, cachear la actual y la siguiente con retardo,
    // para que el "siguiente" track sea más rápido (Android/iOS).
    maybePrecacheAroundCurrent() {
        try {
            const current = this.state.currentPlaylist?.[this.state.currentIndex];
            if (!current) return;

            // Cachear la actual luego de 4s (no compite con el buffer inicial)
            this.cacheSongSilently(current, 4000);

            // Cachear la siguiente luego de 8s (mejora "next")
            const nextIndex = (this.state.currentIndex + 1) % (this.state.currentPlaylist?.length || 1);
            const next = this.state.currentPlaylist?.[nextIndex];
            if (next) this.cacheSongSilently(next, 8000);
        } catch (e) {}
    },

    // Cola de reproducción (tipo Spotify)
    addToQueue(song, { playNext = false } = {}) {
        if (!song) return;
        let q = [...this.state.queue];
        // Evitar duplicados
        q = q.filter(s => s.src !== song.src);
        if (playNext) q.unshift({ ...song });
        else q.push({ ...song });
        this.setState({ queue: q });
        SafeStorage.setJSON('sensei_queue', q);
        this.scheduleUserSync();
    },

    // Guardar historial (últimas 50)
    pushHistory(song) {
        if (!song) return;
        let h = [...this.state.history];
        h = h.filter(s => s.src !== song.src);
        h.unshift({ ...song });
        if (h.length > 50) h = h.slice(0, 50);
        this.setState({ history: h });
        SafeStorage.setJSON('sensei_history', h);
        this.scheduleUserSync();
    },

    loadSong(index, forcePlay = false) {
        const song = this.state.currentPlaylist[index];
        if (!song) return;

        // Si estamos OFFLINE, solo reproducir si la canción está realmente guardada
        if (!navigator.onLine && !this.isSongAvailableOffline(song)) {
            this.showToast("ESA CANCIÓN NO ESTÁ OFFLINE");
            if (forcePlay) return this.nextSong(true);
            return;
        }

        this.setState({ currentIndex: index });
        this.engine.load(song);
        this.pushHistory(song);
        // Si ya estaba sonando o forzamos el play (por el evento 'ended')
        if (this.state.isPlaying || forcePlay) {
            this.setState({ isPlaying: true });
            this.engine.play();
        }

        // Watchdog: si se queda “atrancado”, reintentar play y si falla, pasar a la siguiente
        clearTimeout(this._playWatchdog);
        this._playWatchdog = setTimeout(() => {
            try {
                if (this.state.isPlaying && this.engine?.audio?.paused) {
                    this.engine.play().catch(() => {});
                    setTimeout(() => {
                        if (this.state.isPlaying && this.engine?.audio?.paused) {
                            this.showToast("SALTANDO... (CARGA LENTA)");
                            this.nextSong(true);
                        }
                    }, 1800);
                }
            } catch (e) {}
        }, 4500);
    },

    isSongAvailableOffline(song) {
        if (!song) return false;
        // Si hay internet, no importa
        if (navigator.onLine) return true;
        const url = this.toAbsUrl(song.src);
        return !!(this.state.offlineStatus && this.state.offlineStatus[url]);
    },

    nextSong(forcePlay = false) {
        // 1) Si hay cola, reproducir lo de la cola primero
        if (this.state.queue && this.state.queue.length > 0) {
            const q = [...this.state.queue];
            const next = q.shift();
            this.setState({ queue: q });
            SafeStorage.setJSON('sensei_queue', q);

            // Si estamos offline y esa canción no está descargada, la saltamos
            if (!this.isSongAvailableOffline(next)) {
                this.showToast("ESA CANCIÓN NO ESTÁ OFFLINE");
                return this.nextSong(forcePlay);
            }

            this.engine.load(next);
            this.pushHistory(next);
            if (this.state.isPlaying || forcePlay) {
                this.setState({ isPlaying: true });
                this.engine.play();
            }
            return;
        }

        // 2) Si no hay cola, seguir la playlist normal
        const len = this.state.currentPlaylist.length;
        if (!len) return;
        let tries = 0;
        let nextIndex = (this.state.currentIndex + 1) % len;
        while (tries < len) {
            const candidate = this.state.currentPlaylist[nextIndex];
            if (this.isSongAvailableOffline(candidate)) {
                this.loadSong(nextIndex, forcePlay);
                return;
            }
            tries += 1;
            nextIndex = (nextIndex + 1) % len;
        }
        this.showToast("NO HAY MÁS MÚSICA OFFLINE");
    },

    prevSong(forcePlay = false) {
        // Lógica mejorada: si la canción lleva más de 3 segundos, se reinicia.
        // Si lleva menos, va a la anterior.
        if (this.engine.audio.currentTime > 3) {
            this.engine.audio.currentTime = 0;
            if (this.state.isPlaying) this.engine.play();
        } else {
            const len = this.state.currentPlaylist.length;
            if (!len) return;
            let tries = 0;
            let prevIndex = (this.state.currentIndex - 1 + len) % len;
            while (tries < len) {
                const candidate = this.state.currentPlaylist[prevIndex];
                if (this.isSongAvailableOffline(candidate)) {
                    this.loadSong(prevIndex, forcePlay);
                    return;
                }
                tries += 1;
                prevIndex = (prevIndex - 1 + len) % len;
            }
            this.showToast("NO HAY MÁS MÚSICA OFFLINE");
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
                    downloads: this.state.downloads, // Pasar descargas al componente
                    history: this.state.history,
                    queue: this.state.queue,
                    playlists: this.state.playlists,
                    profileTab: this.state.profileTab,
                    activePlaylistId: this.state.activePlaylistId,
                    user: this.state.user,
                    authReady: this.state.authReady,
                    offlineStatus: this.state.offlineStatus,
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
    const [playlistName, setPlaylistName] = React.useState("");

    const {
        currentSection,
        favorites,
        downloads,
        history,
        playlists,
        profileTab,
        activePlaylistId,
        user,
        authReady,
        offlineStatus,
        songs,
        currentIndex,
        currentPlaylist,
        currentGenre
    } = props;

    const dict = React.useMemo(() => new Map((songs || []).map(s => [s.src, s])), [songs]);

    // El usuario pidió quitar Login/Register del Perfil.
    // Dejamos el Perfil solo para Descargadas / Playlists / Historial.
    const profileAuthCard = () => null;

    // Determinar lista a mostrar
    let baseSongs = [];
    let headerTitle = 'Descubrir';
    let isListView = false;

    if (currentSection === 'favorites') {
        baseSongs = favorites;
        headerTitle = 'Mis Favoritos';
    } else if (currentSection === 'profile') {
        isListView = true;
        headerTitle =
            profileTab === 'history' ? 'Historial' :
            profileTab === 'playlists' ? 'Mis Playlists' :
            'Música Descargada';

        if (profileTab === 'downloads') baseSongs = downloads;
        else if (profileTab === 'history') baseSongs = history;
        else if (profileTab === 'playlists') {
            if (activePlaylistId) {
                const pl = (playlists || []).find(p => p.id === activePlaylistId);
                const tracks = pl?.tracks || [];
                baseSongs = tracks.map(src => dict.get(src)).filter(Boolean);
            } else {
                baseSongs = [];
            }
        }
    } else {
        baseSongs = songs;
        headerTitle = currentGenre ? `Género: ${currentGenre}` : 'Descubrir';
    }

    baseSongs = (baseSongs || []).filter(s => s && s.title && s.artist);

    if (currentGenre && currentSection === 'home') {
        baseSongs = baseSongs.filter(s => s.genre && s.genre.toUpperCase() === currentGenre.toUpperCase());
    }

    const filteredSongs = baseSongs.filter(s =>
        (s.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.artist || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const profileTabs = () => {
        if (currentSection !== 'profile') return null;
        return React.createElement('div', { className: 'profile-tabs' },
            React.createElement('button', {
                className: `profile-tab ${profileTab === 'downloads' ? 'active' : ''}`,
                onClick: () => App.setProfileTab('downloads')
            }, 'DESCARGADAS'),
            React.createElement('button', {
                className: `profile-tab ${profileTab === 'playlists' ? 'active' : ''}`,
                onClick: () => App.setProfileTab('playlists')
            }, 'PLAYLISTS'),
            React.createElement('button', {
                className: `profile-tab ${profileTab === 'history' ? 'active' : ''}`,
                onClick: () => App.setProfileTab('history')
            }, 'HISTORIAL')
        );
    };

    const playlistsPanel = () => {
        if (currentSection !== 'profile' || profileTab !== 'playlists') return null;

        // Vista: lista de playlists
        if (!activePlaylistId) {
            return React.createElement('div', { className: 'pl-panel' },
                React.createElement('div', { className: 'pl-create' },
                    React.createElement('input', {
                        className: 'pl-input',
                        value: playlistName,
                        placeholder: 'Nombre de playlist...',
                        onChange: (e) => setPlaylistName(e.target.value)
                    }),
                    React.createElement('button', {
                        className: 'pl-btn',
                        onClick: () => {
                            App.createPlaylist(playlistName);
                            setPlaylistName("");
                        }
                    }, 'CREAR')
                ),
                React.createElement('div', { className: 'pl-list' },
                    (playlists || []).length ? (playlists || []).map(p =>
                        React.createElement('div', { key: p.id, className: 'pl-item' },
                            React.createElement('button', {
                                className: 'pl-open',
                                onClick: () => App.openPlaylist(p.id)
                            }, `${p.name} (${(p.tracks || []).length})`),
                            React.createElement('button', {
                                className: 'pl-del',
                                title: 'Eliminar',
                                onClick: () => App.deletePlaylist(p.id)
                            }, '✕')
                        )
                    ) : React.createElement('div', { className: 'no-results' }, 'Crea tu primera playlist.')
                )
            );
        }

        // Vista: playlist abierta
        const pl = (playlists || []).find(p => p.id === activePlaylistId);
        return React.createElement('div', { className: 'pl-panel' },
            React.createElement('div', { className: 'pl-header' },
                React.createElement('button', { className: 'pl-back', onClick: () => App.openPlaylist('') }, '←'),
                React.createElement('div', { className: 'pl-title' }, pl?.name || 'Playlist'),
                React.createElement('button', {
                    className: 'pl-btn',
                    onClick: () => {
                        const current = currentPlaylist?.[currentIndex];
                        if (current) App.addSongToPlaylist(current, activePlaylistId);
                    }
                }, 'AÑADIR ACTUAL')
            ),
            React.createElement('div', { className: 'pl-sub' }, 'Tip: también puedes añadir desde Inicio tocando el menú (3 puntos)'),
        );
    };

    return React.createElement('div', { className: 'playlist-advanced' },
        React.createElement('div', { className: 'playlist-header' },
            React.createElement('div', { className: 'playlist-header-row' },
                React.createElement('h2', null,
                    headerTitle === 'Descubrir'
                        ? React.createElement('span', { className: 'title-accent' }, 'DESCUBRIR')
                        : headerTitle
                ),
                currentSection === 'profile' && profileTab === 'downloads'
                    ? React.createElement('div', { className: 'header-actions-row' },
                        React.createElement('button', {
                            className: 'btn-ghost',
                            onClick: () => {
                                try {
                                    App.showToast("INICIANDO DESCARGA OFFLINE...");
                                    App.cacheAllSongs();
                                } catch (e) {}
                            }
                        }, 'DESCARGAR TODO'),
                        React.createElement('button', {
                            className: 'btn-ghost',
                            onClick: () => {
                                try { App.verifyOfflineDownloads(); } catch (e) {}
                            }
                        }, 'VERIFICAR OFFLINE')
                    )
                    : null
            ),
            profileAuthCard(),
            profileTabs(),
            playlistsPanel(),
            React.createElement('input', {
                type: 'text',
                placeholder: 'Buscar música...',
                className: 'search-advanced',
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
            })
        ),
        React.createElement('div', {
            className: (currentSection === 'profile' && profileTab === 'playlists')
                ? 'pl-songs-wrapper'
                : (isListView ? 'song-list' : 'song-grid')
        },
            // --- VISTA ESPECIAL: PLAYLISTS ---
            (currentSection === 'profile' && profileTab === 'playlists') ? (() => {
                // Resultados para añadir (busca en TODA la música, no solo dentro de la playlist)
                const searchAll = (songs || []).filter(s =>
                    (s?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (s?.artist || "").toLowerCase().includes(searchTerm.toLowerCase())
                ).slice(0, 80);

                const renderSongCard = (song, { listView = false, extraRemove = false } = {}) => {
                    const isCurrent = currentPlaylist[currentIndex]?.src === song.src;
                    return React.createElement('div', {
                        key: song.src,
                        className: `song-item ${isCurrent ? 'active' : ''} ${listView ? 'list-item' : ''}`,
                        onClick: () => {
                            App.setState({ currentPlaylist: listView ? (activePlaylistId ? filteredSongs : searchAll) : (activePlaylistId ? filteredSongs : searchAll) });
                            const list = listView ? (activePlaylistId ? filteredSongs : searchAll) : (activePlaylistId ? filteredSongs : searchAll);
                            const newIndex = list.findIndex(s => s.src === song.src);
                            App.loadSong(newIndex);
                            App.engine.play();
                            openFullPlayer();
                        }
                    },
                        React.createElement('img', {
                            src: song.cover,
                            className: listView ? 'mini-art' : '',
                            loading: 'lazy',
                            decoding: 'async',
                            referrerPolicy: 'no-referrer',
                            onError: (e) => { e.target.src = '../logo SENSEI.png'; }
                        }),
                        React.createElement('div', { className: 'song-actions' },
                            // En vista de playlists solo mostramos acciones de playlist (sin corazón/descarga)
                            React.createElement('button', {
                                className: 'song-action-btn',
                                title: activePlaylistId ? 'Añadir a esta playlist' : 'Abre una playlist primero',
                                onClick: (e) => {
                                    e.preventDefault(); e.stopPropagation();
                                    if (!activePlaylistId) return App.showToast('Abre o crea una playlist');
                                    App.addSongToPlaylist(song, activePlaylistId);
                                }
                            }, React.createElement('i', { className: 'fas fa-plus' })),
                            extraRemove ? React.createElement('button', {
                                className: 'song-action-btn',
                                title: 'Quitar de esta playlist',
                                onClick: (e) => { e.preventDefault(); e.stopPropagation(); App.removeSongFromPlaylist(song.src, activePlaylistId); }
                            }, '✕') : null
                        ),
                        React.createElement('div', { className: listView ? 'song-info-list' : '' },
                            React.createElement('h4', null, song.title),
                            React.createElement('p', null, song.artist)
                        )
                    );
                };

                return React.createElement(React.Fragment, null,
                    // Canciones dentro de la playlist (si hay playlist abierta)
                    activePlaylistId ? React.createElement('div', { className: 'pl-section' },
                        React.createElement('div', { className: 'section-title' }, 'EN ESTA PLAYLIST'),
                        React.createElement('div', { className: 'song-list' },
                            filteredSongs.length
                                ? filteredSongs.map(s => renderSongCard(s, { listView: true, extraRemove: true }))
                                : React.createElement('div', { className: 'no-results' }, 'Esta playlist está vacía. Busca abajo y añade canciones.')
                        )
                    ) : React.createElement('div', { className: 'no-results' }, 'Abre una playlist para ver sus canciones y poder guardar música.'),

                    React.createElement('div', { className: 'pl-section' },
                        React.createElement('div', { className: 'section-title' }, 'BUSCAR PARA AÑADIR'),
                        (searchTerm || '').trim().length === 0
                            ? React.createElement('div', { className: 'pl-sub' }, 'Escribe en “Buscar música…” para encontrar canciones y guardarlas en tu playlist.')
                            : React.createElement('div', { className: 'song-grid' },
                                searchAll.length
                                    ? searchAll.map(s => renderSongCard(s, { listView: false, extraRemove: false }))
                                    : React.createElement('div', { className: 'no-results' }, 'No se encontraron canciones.')
                              )
                    )
                );
            })()
            :
            // --- VISTA NORMAL (Inicio/Favoritos/Descargadas/Historial) ---
            (filteredSongs.length > 0 ? filteredSongs.map((song) => {
                const isCurrent = currentPlaylist[currentIndex]?.src === song.src;
                return React.createElement('div', {
                    key: song.src,
                    className: `song-item ${isCurrent ? 'active' : ''} ${isListView ? 'list-item' : ''}`,
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
                        className: isListView ? 'mini-art' : '',
                        loading: 'lazy',
                        decoding: 'async',
                        referrerPolicy: 'no-referrer',
                        onError: (e) => { e.target.src = '../logo SENSEI.png'; }
                    }),
                    React.createElement('div', { className: isListView ? 'song-info-list' : '' },
                        React.createElement('h4', null, song.title),
                        React.createElement('p', null, song.artist)
                    )
                );
            }) : React.createElement('div', { className: 'no-results' },
                currentSection === 'favorites' ? 'No tienes favoritos aún.' :
                currentSection === 'profile' && profileTab === 'downloads' ? 'No tienes música descargada.' :
                currentSection === 'profile' && profileTab === 'history' ? 'Tu historial está vacío.' :
                'No se encontraron canciones.'
            ))
        )
    );
};

// --- 4. Matrix & Global Init ---
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    initMatrix();
    // Si la app se carga directamente con #player, abrir el Full Player correctamente
    if (window.location.hash === '#player') {
        try { openFullPlayer(); } catch (e) {}
    } else {
        // Asegurar estado cerrado (especialmente después de cambios de CSS/transform)
        const fp = document.getElementById('full-player');
        if (fp) {
            fp.style.transform = 'translateY(100%)';
            fp.classList.remove('is-open');
        }
    }
});

// Re-adquirir Wake Lock cuando la app vuelve a estar visible (si se estaba reproduciendo)
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && App.state.isPlaying) {
        if (App.engine) App.engine.requestWakeLock();
    }
});

// Matrix Logic (Simplificada)
function initMatrix() {
    // Fondo estilo Spotify (por defecto): no renderizar Matrix para ahorrar batería/CPU.
    // Si algún día quieres volver a Matrix: SafeStorage.set('sensei_bg','matrix')
    const bgMode = (SafeStorage.get('sensei_bg') || 'spotify').toLowerCase();
    if (bgMode !== 'matrix') {
        // Si existían canvases de una versión anterior, los quitamos
        try {
            document.getElementById('matrix-canvas-main')?.remove();
            document.getElementById('matrix-canvas-fp')?.remove();
        } catch (e) {}
        return;
    }

    const mainContainer = document.getElementById('matrix-bg');
    if (!mainContainer) return;

    // Evitar crear canvases duplicados si initMatrix se ejecuta más de una vez
    const existingMain = document.getElementById('matrix-canvas-main');
    const existingFP = document.getElementById('matrix-canvas-fp');
    if (existingMain && existingFP) return;

    const makeCanvas = (id, parent, position, zIndex, opacity) => {
        const c = document.createElement('canvas');
        c.id = id;
        c.style.position = position;
        c.style.inset = '0';
        c.style.zIndex = String(zIndex);
        c.style.opacity = String(opacity);
        c.style.pointerEvents = 'none';
        parent.appendChild(c);
        return c;
    };

    // Canvas general (detrás de todo)
    const canvasMain = existingMain || makeCanvas('matrix-canvas-main', mainContainer, 'fixed', -1, 0.30);

    // Canvas dentro del FULL PLAYER (para que se vea "aquí adentro")
    const fullPlayer = document.getElementById('full-player');
    const canvasFP = existingFP || (fullPlayer ? makeCanvas('matrix-canvas-fp', fullPlayer, 'absolute', -2, 0.26) : null);

    const canvases = [canvasMain, canvasFP].filter(Boolean);
    const ctxs = canvases.map(c => c.getContext('2d'));

    const fontSize = 15;
    let drops = [];

    const resize = () => {
        canvases.forEach(c => {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        });
        drops = Array(Math.floor(window.innerWidth / fontSize)).fill(1);
    };
    window.addEventListener('resize', resize);
    resize();

    setInterval(() => {
        ctxs.forEach((ctx) => {
            // Fondo con menor "borrado" para que se vean más las columnas (como en tu captura)
            ctx.fillStyle = 'rgba(0,0,0,0.045)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            // Letras verdes con brillo
            ctx.font = `${fontSize}px monospace`;
            ctx.fillStyle = 'rgba(29, 185, 84, 0.85)';
            ctx.shadowColor = 'rgba(29, 185, 84, 0.45)';
            ctx.shadowBlur = 8;
        });

        drops.forEach((y, i) => {
            const text = String.fromCharCode(33 + Math.random() * 90);
            const x = i * fontSize;
            const yy = y * fontSize;
            ctxs.forEach((ctx) => ctx.fillText(text, x, yy));
            if (yy > window.innerHeight && Math.random() > 0.975) drops[i] = 0;
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
    const fp = document.getElementById('full-player');
    fp.style.transform = 'translateY(0)';
    fp.classList.add('is-open');
    // Agregar estado al historial para el botón atrás del teléfono
    if (!window.location.hash.includes('player')) {
        history.pushState({ player: 'open' }, '', '#player');
    }
}

function closeFullPlayer() { 
    const fp = document.getElementById('full-player');
    fp.style.transform = 'translateY(100%)';
    fp.classList.remove('is-open');
    // Si cerramos manualmente y hay hash, retrocedemos en el historial
    if (window.location.hash === '#player') {
        history.back();
    }
}

// Escuchar el botón atrás del teléfono
window.addEventListener('popstate', (event) => {
    const fp = document.getElementById('full-player');
    if (!fp) return;
    if (window.location.hash !== '#player') {
        // Si ya no estamos en el hash del player, lo cerramos visualmente
        fp.style.transform = 'translateY(100%)';
        fp.classList.remove('is-open');
    } else {
        // Si volvemos al hash (por ejemplo, recarga), lo abrimos
        fp.style.transform = 'translateY(0)';
        fp.classList.add('is-open');
    }
});
