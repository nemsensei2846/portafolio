document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');
    const terminalLog = document.getElementById('terminal-log');
    const form = document.getElementById('hacker-upload-form');
    const notesList = document.getElementById('notes-list');
    const tablesList = document.getElementById('tables-list');

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

    // LISTA DE TABLAS TERMODINÁMICAS
    const tablesData = [
        { name: "Tablas termodinámicas de ocon-tojo.pdf", url: "Apuntes/Tablas termodinámicas de ocon-tojo.pdf", size: "4.5 MB" },
        { name: "Gráficas.pdf", url: "Apuntes/Gráficas.pdf", size: "2.1 MB" },
        { name: "Mecánica de Fluidos - Robert Mott (LIBRO BASE) .pdf", url: "Apuntes/Mecánica de Fluidos - Robert Mott (LIBRO BASE) .pdf", size: "15.4 MB" },
        { name: "Mecánica de fluidos.pdf", url: "Apuntes/Mecánica de fluidos.pdf", size: "8.2 MB" },
        { name: "Propiedades fisicas del agua.pdf", url: "Apuntes/Propiedades fisicas del agua.pdf", size: "1.1 MB" }
    ];

    function loadNotes() {
        // Cargar Apuntes (CON CARRUSEL VERDE)
        notesList.innerHTML = '';
        if (notesData.length === 0) {
            notesList.innerHTML = '<p class="error">> No se han encontrado registros en el nodo Apuntes.</p>';
        } else {
            notesData.forEach(note => {
                notesList.appendChild(createNoteElement(note, "fa-file-pdf", false));
            });
            addLog(`${notesData.length} archivos de apuntes cargados.`);
        }

        // Cargar Tablas (CON CARRUSEL CIAN)
        tablesList.innerHTML = '';
        if (tablesData.length === 0) {
            tablesList.innerHTML = '<p class="error">> No se han encontrado tablas de referencia.</p>';
        } else {
            tablesData.forEach(table => {
                tablesList.appendChild(createNoteElement(table, "fa-table", true));
            });
            addLog(`${tablesData.length} tablas del sistema inicializadas.`);
        }
    }

    function createNoteElement(item, icon = "fa-file-pdf", showPrint = false) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        
        // Botón de impresión solo si se solicita y es PDF
        const isPdf = item.url.toLowerCase().endsWith('.pdf');
        const printBtn = (showPrint && isPdf) ? `
            <a onclick="printPdf('${item.url}')" class="print-link">
                <i class="fas fa-print"></i> PRINT_DATA
            </a>
        ` : '';

        noteElement.innerHTML = `
            <i class="fas ${icon}"></i>
            <span class="note-name">${item.name}</span>
            <span class="note-size">[${item.size}]</span>
            <div class="action-btns">
                <a href="${item.url}" target="_blank" class="download-link">
                    <i class="fas fa-external-link-alt"></i> ACCESS_DATA
                </a>
                ${printBtn}
            </div>
        `;
        return noteElement;
    }

    // FUNCIÓN DE IMPRESIÓN HACKER
    window.printPdf = function(url) {
        addLog(`Preparando protocolo de impresión para: ${url}...`, 'success');
        
        // Crear un iframe invisible para imprimir
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.src = url;
        
        iframe.onload = function() {
            try {
                iframe.contentWindow.print();
                addLog('Comando de impresión enviado satisfactoriamente.', 'success');
            } catch (e) {
                addLog('ERROR_IMPRESION: Acceso denegado. Abriendo en nueva pestaña para imprimir manualmente.', 'error');
                window.open(url, '_blank');
            }
            // Eliminar iframe después de un tiempo
            setTimeout(() => document.body.removeChild(iframe), 2000);
        };
        
        document.body.appendChild(iframe);
    }

    loadNotes(); // Inicializar carga

    // MATRIX BACKGROUND ANIMATION
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);

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