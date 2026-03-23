document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');
    const terminalLog = document.getElementById('terminal-log');
    const form = document.getElementById('hacker-upload-form');
    const notesList = document.getElementById('notes-list');

    // LISTA ESTÁTICA DE APUNTES (HTML/JS PURO)
    const notesData = [
        { name: "Semana 1 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 1 Operaciones Unitarias I.pdf", size: "1.2 MB" },
        { name: "Semana 2 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 2 Operaciones Unitarias I.pdf", size: "1.5 MB" },
        { name: "Semana 3 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 3 Operaciones Unitarias I.pdf", size: "1.8 MB" },
        { name: "Semana 4 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 4 Operaciones Unitarias I.pdf", size: "2.1 MB" },
        { name: "Semana 5 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 5 Operaciones Unitarias I.pdf", size: "2.4 MB" },
        { name: "Semana 6 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 6 Operaciones Unitarias I.pdf", size: "2.7 MB" },
        { name: "Semana 7 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 7 Operaciones Unitarias I.pdf", size: "3.0 MB" },
        { name: "Semana 8 Operaciones Unitarias I.pdf", url: "Apuntes/Semana 8 Operaciones Unitarias I.pdf", size: "3.3 MB" }
    ];

    function loadNotes() {
        notesList.innerHTML = ''; // Limpiar cargador
        
        if (notesData.length === 0) {
            notesList.innerHTML = '<p class="error">> No se han encontrado registros en el nodo Apuntes.</p>';
        } else {
            notesData.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = 'note-item';
                noteElement.innerHTML = `
                    <i class="fas fa-file-pdf"></i>
                    <span class="note-name">${note.name}</span>
                    <span class="note-size">[${note.size}]</span>
                    <a href="${note.url}" target="_blank" class="download-link">
                        <i class="fas fa-external-link-alt"></i> ACCESS_DATA
                    </a>
                `;
                notesList.appendChild(noteElement);
            });
            addLog(`${notesData.length} archivos de apuntes cargados satisfactoriamente.`);
        }
    }

    loadNotes(); // Inicializar carga

    // MÉTODOS DE LOG
    function addLog(message, type = '') {
        const p = document.createElement('p');
        const time = new Date().toLocaleTimeString();
        p.innerText = `[${time}] > ${message}`;
        if (type) p.classList.add(type);
        terminalLog.appendChild(p);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    // CLIC EN ÁREA DE DROP
    dropArea.addEventListener('click', () => fileInput.click());

    // ARRASTRAR Y SOLTAR
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
    });

    dropArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            addLog(`Archivo detectado: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
            
            fileName.innerText = file.name;
            filePreview.classList.remove('hidden');
            
            // Efecto visual hacker
            filePreview.style.animation = 'glitch 0.2s 3';
            setTimeout(() => filePreview.style.animation = '', 600);
        }
    }

    // SUBIDA DE FORMULARIO (SIMULADA Y REAL)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!fileInput.files.length) {
            addLog('ERROR: Ningún paquete de datos seleccionado.', 'error');
            return;
        }

        const formData = new FormData(form);
        addLog('Iniciando inyección de datos...', 'success');
        
        // Simulación de progreso
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 20) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Realizar la petición real a PHP
                fetch('upload.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        addLog(`TRANSACCIÓN COMPLETADA: ${data.message}`, 'success');
                        addLog(`RUTA_ALMACENAMIENTO: ${data.path}`, 'success');
                        form.reset();
                        filePreview.classList.add('hidden');
                    } else {
                        addLog(`ERROR_CRÍTICO: ${data.message}`, 'error');
                    }
                })
                .catch(err => {
                    addLog(`FALLO EN LA CONEXIÓN DE RED: ${err.message}`, 'error');
                });
            }
            addLog(`Subiendo... ${progress}%`);
        }, 300);
    });

    // EFECTO GLITCH TEXTO
    const glitches = document.querySelectorAll('.glitch');
    glitches.forEach(glitch => {
        setInterval(() => {
            glitch.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => glitch.style.transform = 'translate(0, 0)', 50);
        }, 3000);
    });
});
