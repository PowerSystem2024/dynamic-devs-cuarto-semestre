// 🎮 Estado global del juego
const gameState = {
    ataqueJugador: "",
    ataquePC: "",
    personajeJugador: null,
    personajePC: null,
    vidasJugador: 3,
    vidasPC: 3
};

// 🌍 Clase Personaje
class Personaje {
    constructor(nombre, emoji) {
        this.nombre = nombre;
        this.emoji = emoji;
        this.id = nombre.toLowerCase().replace(/\s+/g, '-');
    }
    
    get nombreCompleto() {
        return `${this.nombre} ${this.emoji}`;
    }
}

// 📦 Lista de personajes (ahora objetos)
let personajes = [
    new Personaje("Zuko", "🔥"),
    new Personaje("Katara", "💧"),
    new Personaje("Aang", "💨"),
    new Personaje("Toph", "🌱")
];

// 🎯 Constantes universales
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
    vidasJugador: document.getElementById("vidas-jugador"),
    vidasPC: document.getElementById("vidas-pc"),
    resultadoCombate: document.getElementById("resultado-combate"),
    botonSeleccionar: document.getElementById("boton-personaje"),
    botonReiniciar: document.getElementById("boton-reiniciar"),
    botonAgregarPersonaje: document.getElementById("boton-agregar-personaje"),
    botonGuardarPersonaje: document.getElementById("boton-guardar-personaje"),
    botonCancelarAgregar: document.getElementById("boton-cancelar-agregar"),
    botonesAtaque: [
        document.getElementById("btn-punio"),
        document.getElementById("btn-patada"),
        document.getElementById("btn-barrida")
    ],
    seccionSeleccion: document.getElementById("selecionar-personaje"),
    seccionAtaque: document.getElementById("seleccionar-ataque"),
    seccionReiniciar: document.getElementById("reiniciar"),
    seccionAgregarPersonaje: document.getElementById("agregar-personaje"),
    personajesContainer: document.getElementById("personajes-container"),
    nuevoPersonajeNombre: document.getElementById("nuevo-personaje-nombre"),
    nuevoPersonajeEmoji: document.getElementById("nuevo-personaje-emoji")
};

// 🔥 Ocultar todas las secciones excepto selección al inicio
function ocultarSecciones() {
    elements.seccionSeleccion.style.display = "block";
    elements.seccionAtaque.style.display = "none";
    elements.seccionReiniciar.style.display = "none";
    elements.seccionAgregarPersonaje.style.display = "none";
}

// 🎨 Generar inputs de personajes dinámicamente
function generarInputsPersonajes() {
    // Limpiar contenedor existente
    elements.personajesContainer.innerHTML = "";
    
    // Generar inputs para cada personaje
    personajes.forEach(personaje => {
        const contenedor = document.createElement("div");
        
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "personaje";
        input.id = personaje.id;
        input.value = personaje.id;
        
        const label = document.createElement("label");
        label.htmlFor = personaje.id;
        label.textContent = personaje.nombreCompleto;
        
        contenedor.appendChild(input);
        contenedor.appendChild(label);
        elements.personajesContainer.appendChild(contenedor);
    });
}

// ➕ Agregar nuevo personaje
function agregarPersonaje(nombre, emoji) {
    const nuevoPersonaje = new Personaje(nombre, emoji);
    personajes.push(nuevoPersonaje);
    
    // Regenerar los inputs con el nuevo personaje
    generarInputsPersonajes();
    
    // Limpiar campos y volver a la sección de selección
    elements.nuevoPersonajeNombre.value = "";
    elements.nuevoPersonajeEmoji.value = "";
    elements.seccionAgregarPersonaje.style.display = "none";
    elements.seccionSeleccion.style.display = "block";
    
    return nuevoPersonaje;
}

// 🎯 Seleccionar personaje del jugador
function seleccionarPersonajeJugador() {
    const personajeSeleccionadoId = document.querySelector('input[name="personaje"]:checked')?.value;
    const personajeSeleccionado = personajes.find(p => p.id === personajeSeleccionadoId);
    
    gameState.personajeJugador = personajeSeleccionado || null;

    if (gameState.personajeJugador) {
        mostrarMensaje(`Seleccionaste a ${gameState.personajeJugador.nombreCompleto}`);
        elements.personajeJugador.textContent = gameState.personajeJugador.nombreCompleto;
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
    const opcionesPC = personajes.filter(p => p !== gameState.personajeJugador);
    gameState.personajePC = opcionesPC[Math.floor(Math.random() * opcionesPC.length)];
    mostrarMensaje(`El personaje de la PC es: ${gameState.personajePC.nombreCompleto}`);
    elements.personajePC.textContent = gameState.personajePC.nombreCompleto;
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

    elements.resultadoCombate.textContent =
        `Tu ataque: ${ataqueJugador} ${EMOJIS[ataqueJugador]} | ` +
        `Ataque enemigo: ${ataquePC} ${EMOJIS[ataquePC]} → ${resultado}`;

    actualizarVidas();
    verificarFinJuego();
}

// ❤️ Actualizar vidas
function actualizarVidas() {
    elements.vidasJugador.textContent = gameState.vidasJugador;
    elements.vidasPC.textContent = gameState.vidasPC;
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
    // Reiniciar estado del juego
    gameState.ataqueJugador = "";
    gameState.ataquePC = "";
    gameState.personajeJugador = null;
    gameState.personajePC = null;
    gameState.vidasJugador = 3;
    gameState.vidasPC = 3;
    
    // Reiniciar UI
    elements.personajeJugador.textContent = "";
    elements.personajePC.textContent = "";
    elements.resultadoCombate.textContent = "";
    elements.vidasJugador.textContent = "3";
    elements.vidasPC.textContent = "3";
    
    // Desmarcar selección de personaje
    const radioSeleccionado = document.querySelector('input[name="personaje"]:checked');
    if (radioSeleccionado) {
        radioSeleccionado.checked = false;
    }
    
    // Habilitar botones
    elements.botonesAtaque.forEach(boton => boton.disabled = false);
    
    // Volver a pantalla inicial
    ocultarSecciones();
}

// 💬 Mostrar mensajes
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// 🎮 Inicialización de eventos
function inicializarEventos() {
    ocultarSecciones();
    generarInputsPersonajes();
    
    // Eventos de botones principales
    elements.botonSeleccionar.addEventListener("click", seleccionarPersonajeJugador);
    elements.botonReiniciar.addEventListener("click", reiniciarJuego);
    
    // Eventos para agregar personajes
    elements.botonAgregarPersonaje.addEventListener("click", () => {
        elements.seccionSeleccion.style.display = "none";
        elements.seccionAgregarPersonaje.style.display = "block";
    });
    
    elements.botonCancelarAgregar.addEventListener("click", () => {
        elements.seccionAgregarPersonaje.style.display = "none";
        elements.seccionSeleccion.style.display = "block";
    });
    
    elements.botonGuardarPersonaje.addEventListener("click", () => {
        const nombre = elements.nuevoPersonajeNombre.value.trim();
        const emoji = elements.nuevoPersonajeEmoji.value.trim();
        
        if (nombre && emoji) {
            agregarPersonaje(nombre, emoji);
            mostrarMensaje(`Personaje ${nombre} ${emoji} agregado correctamente`);
        } else {
            mostrarMensaje("Debes ingresar un nombre y un emoji para el personaje");
        }
    });

    // Eventos de ataque
    elements.botonesAtaque.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            gameState.ataqueJugador = ATAQUES[index];
            gameState.ataquePC = ataqueAleatorioPC();
            combate(gameState.ataqueJugador, gameState.ataquePC);
        });
    });
}

// 🚀 Iniciar juego
document.addEventListener("DOMContentLoaded", inicializarEventos);