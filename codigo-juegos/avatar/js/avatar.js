// 🎮 Estado global del juego
const gameState = {
    ataqueJugador: "",
    ataquePC: "",
    personajeJugador: null,
    personajePC: null,
    vidasJugador: 3,
    vidasPC: 3
};

// 👤 Clase Personaje
class Personaje {
    constructor(nombre, elemento, vidas = 3) {
        this.nombre = nombre;
        this.elemento = elemento;
        this.vidas = vidas;
        this.emoji = this.obtenerEmojiElemento();
    }

    obtenerEmojiElemento() {
        const emojis = {
            "Fuego": "🔥",
            "Agua": "💧",
            "Aire": "💨",
            "Tierra": "🌱"
        };
        return emojis[this.elemento] || "❓";
    }

    obtenerNombreCompleto() {
        return `${this.nombre} ${this.emoji}`;
    }

    perderVida() {
        if (this.vidas > 0) {
            this.vidas--;
        }
        return this.vidas;
    }

    reiniciarVidas() {
        this.vidas = 3;
    }
}

// 🌍 Constantes universales (actualizadas)
let PERSONAJES = [
    new Personaje("Zuko", "Fuego"),
    new Personaje("Katara", "Agua"),
    new Personaje("Aang", "Aire"),
    new Personaje("Toph", "Tierra")
];

const ATAQUES = ["Puño", "Patada", "Barrida"];
const EMOJIS = {
    "Puño": "👊🏼",
    "Patada": "🦶🏼",
    "Barrida": "👣"
};

// 📌 Selectores globales (actualizados)
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
    contenedorPersonajes: document.getElementById("contenedor-personajes"),
    // Nuevos elementos para agregar personajes
    botonAgregarPersonaje: document.getElementById("boton-agregar-personaje"),
    modalAgregarPersonaje: document.getElementById("modal-agregar-personaje"),
    formNuevoPersonaje: document.getElementById("form-nuevo-personaje"),
    nombrePersonajeInput: document.getElementById("nombre-personaje"),
    elementoPersonajeSelect: document.getElementById("elemento-personaje"),
    cancelarAgregarBtn: document.getElementById("cancelar-agregar"),
    cerrarModal: document.querySelector(".cerrar-modal")
};

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

// 🔥 Ocultar todas las secciones excepto selección al inicio
function ocultarSecciones() {
    elements.seccionSeleccion.style.display = "block";
    elements.seccionAtaque.style.display = "none";
    elements.seccionReiniciar.style.display = "none";
}

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

// 💬 Mostrar mensajes
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// 👥 FUNCIONES PARA AGREGAR NUEVOS PERSONAJES

// Función para generar los personajes dinámicamente
function generarPersonajes() {
    const contenedor = document.getElementById('contenedor-personajes');
    contenedor.innerHTML = ''; // Limpiar contenedor antes de generar

    PERSONAJES.forEach((personaje, index) => {
        const divPersonaje = document.createElement('div');
        divPersonaje.className = 'opcion-personaje';

        divPersonaje.innerHTML = `
            <input type="radio" name="personaje" id="${personaje.nombre}" />
            <label for="${personaje.nombre}" class="fss">${personaje.nombre} ${personaje.emoji}</label>
        `;

        contenedor.appendChild(divPersonaje);
    });
}

// Función para abrir el modal de agregar personaje
function abrirModalAgregarPersonaje() {
    elements.modalAgregarPersonaje.style.display = 'block';
    elements.nombrePersonajeInput.focus();
}

// Función para cerrar el modal
function cerrarModalAgregarPersonaje() {
    elements.modalAgregarPersonaje.style.display = 'none';
    elements.formNuevoPersonaje.reset();
}

// Función para agregar nuevo personaje
function agregarNuevoPersonaje(event) {
    event.preventDefault();
    
    const nombre = elements.nombrePersonajeInput.value.trim();
    const elemento = elements.elementoPersonajeSelect.value;
    
    // Validaciones
    if (!nombre) {
        alert('Por favor ingresa un nombre para el personaje');
        return;
    }
    
    if (!elemento) {
        alert('Por favor selecciona un elemento');
        return;
    }
    
    // Verificar si el personaje ya existe
    if (PERSONAJES.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())) {
        alert('¡Ya existe un personaje con ese nombre!');
        return;
    }
    
    // Crear y agregar el nuevo personaje
    const nuevoPersonaje = new Personaje(nombre, elemento);
    PERSONAJES.push(nuevoPersonaje);
    
    // Regenerar la lista de personajes
    generarPersonajes();
    
    // Cerrar modal y limpiar formulario
    cerrarModalAgregarPersonaje();
    
    // Mostrar mensaje de éxito
    mostrarMensaje(`¡Personaje "${nombre}" agregado exitosamente!`);
}

// 🎮 Inicialización de eventos
function inicializarEventos() {
    ocultarSecciones();
    elements.botonSeleccionar.addEventListener("click", seleccionarPersonajeJugador);
    elements.botonReiniciar.addEventListener("click", reiniciarJuego);
    
    // Eventos para agregar personajes
    elements.botonAgregarPersonaje.addEventListener("click", abrirModalAgregarPersonaje);
    elements.cerrarModal.addEventListener("click", cerrarModalAgregarPersonaje);
    elements.cancelarAgregarBtn.addEventListener("click", cerrarModalAgregarPersonaje);
    elements.formNuevoPersonaje.addEventListener("submit", agregarNuevoPersonaje);
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener("click", (event) => {
        if (event.target === elements.modalAgregarPersonaje) {
            cerrarModalAgregarPersonaje();
        }
    });

    ATAQUES.forEach((ataque, index) => {
        elements.botonesAtaque[index].addEventListener("click", () => {
            gameState.ataqueJugador = ataque;
            gameState.ataquePC = ataqueAleatorioPC();
            combate(gameState.ataqueJugador, gameState.ataquePC);
        });
    });
}

// 🛠️ Generar personajes al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    generarPersonajes();
    inicializarEventos();
});