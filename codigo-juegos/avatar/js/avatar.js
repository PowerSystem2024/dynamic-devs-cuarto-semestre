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
    textosAtaque: document.querySelectorAll("section#seleccionar-ataque p")
};

//  Seleccionar personaje del jugador
function seleccionarPersonajeJugador() {
    const seleccion = PERSONAJES.find(nombre =>
        document.getElementById(nombre.split(" ")[0]).checked
    );
    gameState.personajeJugador = seleccion || "";

    if (gameState.personajeJugador) {
        mostrarMensaje(`Seleccionaste a ${gameState.personajeJugador}`);
        elements.personajeJugador.innerText = gameState.personajeJugador;
        seleccionarPersonajePC();
    } else {
        mostrarMensaje("No seleccionaste ningún personaje");
    }
}

// 🤖 Seleccionar personaje de la PC (distinto al jugador)
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

// ❤️ Actualizar vidas en pantalla
function actualizarVidas() {
    elements.textosAtaque[0].innerHTML =
        `Tu personaje (<span>${gameState.personajeJugador}</span>) tiene <span>${gameState.vidasJugador}</span> vidas`;
    elements.textosAtaque[1].innerHTML =
        `El personaje enemigo (<span>${gameState.personajePC}</span>) tiene <span>${gameState.vidasPC}</span> vidas`;
}

// 🛑 Verificar si terminó el juego
function verificarFinJuego() {
    if (gameState.vidasJugador === 0) {
        mostrarMensaje("¡Perdiste el juego!");
        deshabilitarBotones();
    } else if (gameState.vidasPC === 0) {
        mostrarMensaje("¡Ganaste el juego!");
        deshabilitarBotones();
    }
}

// 🚫 Deshabilitar botones de ataque
function deshabilitarBotones() {
    elements.botonesAtaque.forEach(boton => boton.disabled = true);
}

// 🔄 Reiniciar el juego
function reiniciarJuego() {
    location.reload();
}

// 💬 Mostrar mensajes (fácil de mejorar con UI en vez de alert)
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// 🎮 Inicialización de eventos
function inicializarEventos() {
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
