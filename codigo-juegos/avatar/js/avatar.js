// 🎮 Estado global del juego
const gameState = {
    ataqueJugador: "",
    ataquePC: "",
    personajeJugador: "",
    personajePC: "",
    vidasJugador: 3,
    vidasPC: 3
};

// 🌍 Constantes universales
const PERSONAJES = ["Zuko 🔥", "Katara 💧", "Aang 💨", "Toph 🌱"];
const ATAQUES = ["Puño", "Patada", "Barrida"];
const EMOJIS = {
    "Puño": "👊🏼",
    "Patada": "🦶🏼",
    "Barrida": "👣"
};

// 📌 Selectores globales
const elements = {
    personajeJugador: document.getElementById("personaje-jugador"),
    personajePC: document.getElementById("personaje-pc"),
    resultadoCombate: document.getElementById("resultado-combate"),
    botonSeleccionar: document.getElementById("boton-personaje"),
    botonReiniciar: document.getElementById("boton-reiniciar"),
    botonesAtaque: [
        document.getElementById("btn-punio"),
        document.getElementById("btn-patada"),
        document.getElementById("btn-barrida")
    ],
    textosAtaque: document.querySelectorAll("section#seleccionar-ataque p"),
    seccionSeleccion: document.getElementById("selecionar-personaje"),
    seccionAtaque: document.getElementById("seleccionar-ataque"),
    seccionReiniciar: document.getElementById("reiniciar")
};

// 📜 Función para alternar la visibilidad de las reglas
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos
    const toggleButton = document.getElementById('toggleButton');
    const reglasSection = document.getElementById('reglas');

    // Verificar el estado guardado al cargar la página
    const reglasOcultas = localStorage.getItem('reglasOcultas') === 'true';

    // Aplicar el estado guardado
    if (reglasOcultas) {
        reglasSection.classList.add('hidden');
        toggleButton.textContent = 'Mostrar Reglas';
    } else {
        reglasSection.classList.remove('hidden');
        toggleButton.textContent = 'Ocultar Reglas';
    }

    // Función para alternar la visibilidad de las reglas
    function toggleReglas() {
        // Alternar la clase 'hidden' en la sección de reglas
        reglasSection.classList.toggle('hidden');

        // Guardar el nuevo estado en localStorage
        const estanOcultas = reglasSection.classList.contains('hidden');
        localStorage.setItem('reglasOcultas', estanOcultas);

        // Cambiar el texto del botón según el estado
        if (estanOcultas) {
            toggleButton.textContent = 'Mostrar Reglas';
        } else {
            toggleButton.textContent = 'Ocultar Reglas';
        }
    }

    // Agregar el evento de clic al botón
    toggleButton.addEventListener('click', toggleReglas);
});

// 🔥 Ocultar todas las secciones excepto selección al inicio
function ocultarSecciones() {
    elements.seccionSeleccion.style.display = "block";
    elements.seccionAtaque.style.display = "none";
    elements.seccionReiniciar.style.display = "none";
}

// 🎯 Seleccionar personaje del jugador
function seleccionarPersonajeJugador() {
    const seleccion = PERSONAJES.find(nombre =>
        document.getElementById(nombre.split(" ")[0]).checked
    );
    gameState.personajeJugador = seleccion || "";

    if (gameState.personajeJugador) {
        mostrarMensaje(`Seleccionaste a ${gameState.personajeJugador}`);
        elements.personajeJugador.innerText = gameState.personajeJugador;
        seleccionarPersonajePC();

        // 🔥 Cambiar a pantalla de ataque
        elements.seccionSeleccion.style.display = "none";
        elements.seccionAtaque.style.display = "block";
    } else {
        mostrarMensaje("No seleccionaste ningún personaje");
    }
}

// 🤖 Seleccionar personaje de la PC
function seleccionarPersonajePC() {
    const opcionesPC = PERSONAJES.filter(p => p !== gameState.personajeJugador);
    gameState.personajePC = opcionesPC[Math.floor(Math.random() * opcionesPC.length)];
    mostrarMensaje(`El personaje de la PC es: ${gameState.personajePC}`);
    elements.personajePC.innerText = gameState.personajePC;
    actualizarVidas();
}

// 🎲 Ataque aleatorio para la PC
function ataqueAleatorioPC() {
    return ATAQUES[Math.floor(Math.random() * ATAQUES.length)];
}

// ⚔️ Lógica del combate
function combate(ataqueJugador, ataquePC) {
    let resultado = "";

    if (ataqueJugador === ataquePC) {
        resultado = "Empate";
    } else if (
        (ataqueJugador === "Puño" && ataquePC === "Barrida") ||
        (ataqueJugador === "Patada" && ataquePC === "Puño") ||
        (ataqueJugador === "Barrida" && ataquePC === "Patada")
    ) {
        resultado = "Ganaste esta ronda";
        gameState.vidasPC--;
    } else {
        resultado = "Perdiste esta ronda";
        gameState.vidasJugador--;
    }

    elements.resultadoCombate.innerText =
        `Tu ataque: ${ataqueJugador} ${EMOJIS[ataqueJugador]} | ` +
        `Ataque enemigo: ${ataquePC} ${EMOJIS[ataquePC]} → ${resultado}`;

    actualizarVidas();
    verificarFinJuego();
}

// ❤️ Actualizar vidas
function actualizarVidas() {
    elements.textosAtaque[0].innerHTML =
        `Tu personaje (<span>${gameState.personajeJugador}</span>) tiene <span>${gameState.vidasJugador}</span> vidas`;
    elements.textosAtaque[1].innerHTML =
        `El personaje enemigo (<span>${gameState.personajePC}</span>) tiene <span>${gameState.vidasPC}</span> vidas`;
}

// 🛑 Verificar fin de juego
function verificarFinJuego() {
    if (gameState.vidasJugador === 0) {
        mostrarMensaje("¡Perdiste el juego!");
        finalizarJuego();
    } else if (gameState.vidasPC === 0) {
        mostrarMensaje("¡Ganaste el juego!");
        finalizarJuego();
    }
}

// 🔒 Finalizar juego
function finalizarJuego() {
    deshabilitarBotones();
    elements.seccionAtaque.style.display = "none";
    elements.seccionReiniciar.style.display = "block";
}

// 🚫 Deshabilitar botones de ataque
function deshabilitarBotones() {
    elements.botonesAtaque.forEach(boton => boton.disabled = true);
}

// 🔄 Reiniciar juego
function reiniciarJuego() {
    location.reload();
}

// 💬 Mostrar mensajes (ahora alert, fácil de mejorar con UI)
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// 🎮 Inicialización de eventos
function inicializarEventos() {
    ocultarSecciones();
    elements.botonSeleccionar.addEventListener("click", seleccionarPersonajeJugador);
    elements.botonReiniciar.addEventListener("click", reiniciarJuego);

    // Eventos de ataque dinámicos
    ATAQUES.forEach((ataque, index) => {
        elements.botonesAtaque[index].addEventListener("click", () => {
            gameState.ataqueJugador = ataque;
            gameState.ataquePC = ataqueAleatorioPC();
            combate(gameState.ataqueJugador, gameState.ataquePC);
        });
    });
}

// 🚀 Iniciar juego
inicializarEventos();
