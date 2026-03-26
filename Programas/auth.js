// FBI_SECURE_AUTH - Lógica de Firebase (Realtime Database)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    set, 
    get, 
    child 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Tu configuración de Firebase
const firebaseConfig = { 
    apiKey: "AIzaSyCmWzM41w0hWvDS0Yq4l2xjwzs2U43OxgI", 
    authDomain: "sensei-bae7d.firebaseapp.com", 
    projectId: "sensei-bae7d", 
    storageBucket: "sensei-bae7d.firebasestorage.app", 
    messagingSenderId: "188633348597", 
    appId: "1:188633348597:web:d2ac93ec1e5bffa5af08bc", 
    measurementId: "G-WW3RFRWM1H",
    databaseURL: "https://sensei-bae7d-default-rtdb.firebaseio.com/" // Link solicitado
}; 

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const authMsg = document.getElementById('auth-message');

// Función para mostrar mensajes en la "terminal"
function showMsg(text, type = 'success') {
    if (authMsg) {
        authMsg.innerText = `>>> ${text}`;
        authMsg.className = `terminal-msg msg-${type}`;
    }
}

// Lógica de Registro
const btnRegister = document.getElementById('btn-register');
if (btnRegister) {
    btnRegister.addEventListener('click', async () => {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const terms = document.getElementById('reg-terms').checked;

        if (!name || !email || !username || !password) {
            showMsg("ERROR: CAMPOS INCOMPLETOS", "error");
            return;
        }

        if (!terms) {
            showMsg("ERROR: DEBE ACEPTAR TERMINOS FBI", "error");
            return;
        }

        showMsg("PROCESANDO_REGISTRO_EN_RTDB...");

        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, `users/${username}`));

            if (snapshot.exists()) {
                showMsg("ERROR: USUARIO_YA_EXISTE", "error");
                return;
            }

            // Guardar directamente en Realtime Database
            await set(ref(db, 'users/' + username), {
                nombre: name,
                email: email,
                usuario: username,
                password: password, // Almacenamiento directo
                fecha_registro: new Date().toLocaleString()
            });

            alert(`SISTEMA FBI: Registro exitoso\n----------------------------\nUSUARIO: ${username}\nPASSWORD: ${password}\n----------------------------\nYa puede ingresar al sistema.`);
            
            showMsg("REGISTRO_EXITOSO. VOLVIENDO AL LOGIN...", "success");

            setTimeout(() => {
                if (window.toggleAuth) window.toggleAuth('login');
            }, 1000);

        } catch (error) {
            console.error("Database Error:", error);
            let errorMsg = "ERROR_EN_SISTEMA_BASE_DE_DATOS";
            
            if (error.message.includes("permission_denied") || error.message.includes("Permission denied")) {
                errorMsg = "ERROR: PERMISO_DENEGADO_EN_FIREBASE";
                alert("⚠️ ERROR DE CONFIGURACIÓN: Tu base de datos tiene el acceso bloqueado.\n\nDebes ir a Firebase Console > Realtime Database > Rules y poner:\n\n{\n  \"rules\": {\n    \".read\": true,\n    \".write\": true\n  }\n}");
            } else if (error.message.includes("databaseURL")) {
                errorMsg = "ERROR: URL_DE_BASE_DE_DATOS_INVALIDA";
            }
            
            showMsg(errorMsg, "error");
        }
    });
}

// Lógica de Login
const btnLogin = document.getElementById('btn-login');
if (btnLogin) {
    btnLogin.addEventListener('click', async () => {
        const usernameInput = document.getElementById('login-username').value;
        const passwordInput = document.getElementById('login-password').value;

        if (!usernameInput || !passwordInput) {
            showMsg("ERROR: CREDENCIALES_VACIAS", "error");
            return;
        }

        showMsg("VERIFICANDO_CREDENCIALES_EN_RTDB...");

        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, `users/${usernameInput}`));

            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.password === passwordInput) {
                    showMsg("SISTEMA: ACCESO_CONCEDIDO ✅", "success");
                    localStorage.setItem('fbi_session', usernameInput); // Guardar sesión local
                    setTimeout(() => {
                        window.location.href = "libros.html";
                    }, 1000);
                } else {
                    showMsg("ERROR: PASSWORD_INCORRECTO", "error");
                }
            } else {
                showMsg("ERROR: USUARIO_NO_REGISTRADO", "error");
            }
        } catch (error) {
            console.error("Login Error:", error);
            showMsg("ERROR_DE_CONEXION_SISTEMA", "error");
        }
    });
}

// Verificación de Acceso para libros.html
if (window.location.pathname.includes('libros.html')) {
    const session = localStorage.getItem('fbi_session');
    if (!session) {
        alert("SISTEMA FBI: ACCESO DENEGADO. IDENTIFÍQUESE.");
        window.location.href = "index.html";
    }
}

