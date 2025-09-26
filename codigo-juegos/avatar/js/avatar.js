// 📦 Importar módulos
import { Personaje } from './Personaje.js';
import { ModalPersonajes } from './modalPersonajes.js';
import { GeneradorPersonajes } from './generadorPersonajes.js';

// 🎮 Estado global del juego
const gameState = {
    ataqueJugador: "",
    ataquePC: "",
    personajeJugador: null,
    personajePC: null,
    vidasJugador: 3,
    vidasPC: 3
};

// 🌍 Constantes
let PERSONAJES = [];

// Inicializar personajes con sus ataques
function inicializarPersonajes() {
    const zuko = new Personaje("Zuko", "Fuego");
    zuko.agregarAtaque("Puño", "btn-punio");
    zuko.agregarAtaque("Patada", "btn-patada");
    zuko.agregarAtaque("Barrida", "btn-barrida");

    const katara = new Personaje("Katara", "Agua");
    katara.agregarAtaque("Puño", "btn-punio");
    katara.agregarAtaque("Patada", "btn-patada");
    katara.agregarAtaque("Barrida", "btn-barrida");

    const aang = new Personaje("Aang", "Aire");
    aang.agregarAtaque("Puño", "btn-punio");
    aang.agregarAtaque("Patada", "btn-patada");
    aang.agregarAtaque("Barrida", "btn-barrida");

    const toph = new Personaje("Toph", "Tierra");
    toph.agregarAtaque("Puño", "btn-punio");
    toph.agregarAtaque("Patada", "btn-patada");
    toph.agregarAtaque("Barrida", "btn-barrida");

    PERSONAJES = [zuko, katara, aang, toph];
}

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
    seccionReiniciar: document.getElementById("reiniciar"),
    botonAgregarPersonaje: document.getElementById("boton-agregar-personaje")
};

// 🏗️ Instanciar módulos
let generadorPersonajes;
let modalPersonajes;

// 💬 Mostrar mensajes
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// 🔥 Ocultar todas las secciones excepto selección al inicio
function ocultarSecciones() {
    elements.seccionSeleccion.style.display = "block";
    elements.seccionAtaque.style.display = "none";
    elements.seccionReiniciar.style.display = "none";
}

// 📜 Función para alternar la visibilidad de las reglas
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const reglasSection = document.getElementById('reglas');

    const reglasOcultas = localStorage.getItem('reglasOcultas') === 'true';

    if (reglasOcultas) {
        reglasSection.classList.add('hidden');
        toggleButton.textContent = 'Mostrar Reglas';
    } else {
        reglasSection.classList.remove('hidden');
        toggleButton.textContent = 'Ocultar Reglas';
    }

    function toggleReglas() {
        reglasSection.classList.toggle('hidden');
        const estanOcultas = reglasSection.classList.contains('hidden');
        localStorage.setItem('reglasOcultas', estanOcultas);

        if (estanOcultas) {
            toggleButton.textContent = 'Mostrar Reglas';
        } else {
            toggleButton.textContent = 'Ocultar Reglas';
        }
    }

    toggleButton.addEventListener('click', toggleReglas);
});

// 🎯 Seleccionar personaje del jugador
function seleccionarPersonajeJugador() {
    const personajeSeleccionado = PERSONAJES.find(personaje => {
        const radioButton = document.getElementById(personaje.nombre);
        return radioButton && radioButton.checked;
    });

    gameState.personajeJugador = personajeSeleccionado || null;

    if (gameState.personajeJugador) {
        mostrarMensaje(`Seleccionaste a ${gameState.personajeJugador.obtenerNombreCompleto()}`);
        elements.personajeJugador.innerText = gameState.personajeJugador.obtenerNombreCompleto();
        seleccionarPersonajePC();

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
    mostrarMensaje(`El personaje de la PC es: ${gameState.personajePC.obtenerNombreCompleto()}`);
    elements.personajePC.innerText = gameState.personajePC.obtenerNombreCompleto();
    actualizarVidas();
}

// 🎲 Ataque aleatorio para la PC
function ataqueAleatorioPC() {
    const ataquesPC = gameState.personajePC.obtenerAtaques();
    const ataqueAleatorio = ataquesPC[Math.floor(Math.random() * ataquesPC.length)];
    return ataqueAleatorio.nombre;
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
        gameState.personajePC.perderVida();
        gameState.vidasPC = gameState.personajePC.vidas;
    } else {
        resultado = "Perdiste esta ronda";
        gameState.personajeJugador.perderVida();
        gameState.vidasJugador = gameState.personajeJugador.vidas;
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
        `Tu personaje (<span>${gameState.personajeJugador.obtenerNombreCompleto()}</span>) tiene <span>${gameState.vidasJugador}</span> vidas`;
    elements.textosAtaque[1].innerHTML =
        `El personaje enemigo (<span>${gameState.personajePC.obtenerNombreCompleto()}</span>) tiene <span>${gameState.vidasPC}</span> vidas`;
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
    if (gameState.personajeJugador) gameState.personajeJugador.reiniciarVidas();
    if (gameState.personajePC) gameState.personajePC.reiniciarVidas();

    gameState.vidasJugador = 3;
    gameState.vidasPC = 3;
    gameState.ataqueJugador = "";
    gameState.ataquePC = "";

    elements.seccionReiniciar.style.display = "none";
    elements.seccionSeleccion.style.display = "block";

    // Limpiar selección de personajes
    const radioButtons = document.querySelectorAll('input[name="personaje"]');
    radioButtons.forEach(radio => radio.checked = false);

    elements.botonesAtaque.forEach(boton => boton.disabled = false);

    elements.personajeJugador.innerText = "";
    elements.personajePC.innerText = "";
    elements.resultadoCombate.innerText = "";

    mostrarMensaje("Juego reiniciado. ¡Selecciona un personaje!");
}

// 🎮 Inicialización de eventos
function inicializarEventos() {
    ocultarSecciones();
    elements.botonSeleccionar.addEventListener("click", seleccionarPersonajeJugador);
    elements.botonReiniciar.addEventListener("click", reiniciarJuego);

    // Evento para abrir modal
    elements.botonAgregarPersonaje.addEventListener("click", () => {
        modalPersonajes.abrir();
    });

    // Configurar eventos de ataque para cada personaje
    configurarEventosAtaque();
}

// 🔧 Configurar eventos de ataque dinámicamente
function configurarEventosAtaque() {
    // Limpiar eventos anteriores
    elements.botonesAtaque.forEach(boton => {
        boton.replaceWith(boton.cloneNode(true));
    });

    // Reasignar referencias después del clonado
    elements.botonesAtaque = [
        document.getElementById("btn-punio"),
        document.getElementById("btn-patada"),
        document.getElementById("btn-barrida")
    ];

    // Asignar eventos a cada botón de ataque
    elements.botonesAtaque.forEach(boton => {
        boton.addEventListener("click", () => {
            // Obtener el nombre del ataque basado en el ID del botón
            let ataqueNombre = "";
            switch(boton.id) {
                case "btn-punio":
                    ataqueNombre = "Puño";
                    break;
                case "btn-patada":
                    ataqueNombre = "Patada";
                    break;
                case "btn-barrida":
                    ataqueNombre = "Barrida";
                    break;
            }
            
            gameState.ataqueJugador = ataqueNombre;
            gameState.ataquePC = ataqueAleatorioPC();
            combate(gameState.ataqueJugador, gameState.ataquePC);
        });
    });
}

// 🛠️ Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar personajes con sus ataques
    inicializarPersonajes();
    
    // Inicializar módulos
    generadorPersonajes = new GeneradorPersonajes(PERSONAJES);
    modalPersonajes = new ModalPersonajes(
        PERSONAJES,
        () => generadorPersonajes.generar(),
        mostrarMensaje,
        Personaje
    );
    
    // Generar personajes y eventos
    generadorPersonajes.generar();
    inicializarEventos();
});