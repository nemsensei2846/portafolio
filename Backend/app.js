const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurar CORS para permitir peticiones desde el frontend (PWA)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Servir archivos estáticos de Musica (tracks y categoria)
app.use('/tracks', express.static(path.join(__dirname, '../Musica/tracks')));
app.use('/categoria', express.static(path.join(__dirname, '../Musica/categoria')));

// Servir la aplicación PWA completa desde la raíz si es necesario
app.use(express.static(path.join(__dirname, '../')));

app.listen(port, () => {
    console.log(`Servidor de música SENSEI corriendo en http://localhost:${port}`);
    console.log(`Para abrir la App: http://localhost:${port}/Musica/index.html`);
});
