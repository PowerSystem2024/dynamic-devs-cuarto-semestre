let ataqueJugador;
let ataquePC;
let personajeJugador = "";
let personajePC = "";
let vidasJugador = 3;
let vidasPC = 3;

// emojis para mostrar en resultados
const emojis = {
    "Puño": "👊🏼",
    "Patada": "🦶🏼",
    "Barrida": "👣"
};

// Seleccionar personaje
function seleccionarPersonajeJugador() {
    personajeJugador = "";

    if (document.getElementById("Zuko").checked) {
        personajeJugador = "Zuko 🔥";
    } else if (document.getElementById("Katara").checked) {
        personajeJugador = "Katara 💧";
    } else if (document.getElementById("Aang").checked) {
        personajeJugador = "Aang 💨";
    } else if (document.getElementById("Toph").checked) {
        personajeJugador = "Toph 🌱";
    }

    if (personajeJugador !== "") {
        alert("Seleccionaste a " + personajeJugador);
        document.getElementById("personaje-jugador").innerText = personajeJugador;
        seleccionarPersonajePC();
    } else {
        alert("No seleccionaste ningún personaje");
    }
}

// Seleccionar personaje PC (que no sea igual al del jugador)
function seleccionarPersonajePC() {
    const personajesPC = ["Zuko 🔥", "Katara 💧", "Aang 💨", "Toph 🌱"];
    const opcionesPC = personajesPC.filter(p => p !== personajeJugador);
    const indice = Math.floor(Math.random() * opcionesPC.length);
    personajePC = opcionesPC[indice];
    alert("El personaje de la PC es: " + personajePC);
    document.getElementById("personaje-pc").innerText = personajePC;

    // Actualizamos nombres de personajes en el contador
    actualizarVidas();
}

// Generar ataque aleatorio para la PC (sin emojis)
function ataqueAleatorioPC() {
    const ataques = ["Puño", "Patada", "Barrida"];
    const indice = Math.floor(Math.random() * ataques.length);
    return ataques[indice];
}

// Lógica del combate
function combate(ataqueJugadorSimple, ataquePCSimple) {
    let resultado = "";

    if (ataqueJugadorSimple === ataquePCSimple) {
        resultado = "Empate";
    } else if (
        (ataqueJugadorSimple === "Puño" && ataquePCSimple === "Barrida") ||
        (ataqueJugadorSimple === "Patada" && ataquePCSimple === "Puño") ||
        (ataqueJugadorSimple === "Barrida" && ataquePCSimple === "Patada")
    ) {
        resultado = "Ganaste esta ronda";
        vidasPC--;
    } else {
        resultado = "Perdiste esta ronda";
        vidasJugador--;
    }

    // Mostrar resultado debajo de botones con emojis
    document.getElementById("resultado-combate").innerText =
        `Tu ataque: ${ataqueJugadorSimple} ${emojis[ataqueJugadorSimple]} | Ataque enemigo: ${ataquePCSimple} ${emojis[ataquePCSimple]} → ${resultado}`;

    // Actualizar vidas y nombres
    actualizarVidas();

    // Verificar fin del juego
    if (vidasJugador === 0) {
        alert("¡Perdiste el juego!");
        deshabilitarBotones();
    } else if (vidasPC === 0) {
        alert("¡Ganaste el juego!");
        deshabilitarBotones();
    }
}

// Actualizar vidas y mostrar nombres de personajes seleccionados
function actualizarVidas() {
    const textos = document.querySelectorAll("section#seleccionar-ataque p");
    textos[0].innerHTML = `Tu personaje (<span id="personaje-jugador">${personajeJugador}</span>) tiene <span>${vidasJugador}</span> vidas`;
    textos[1].innerHTML = `Los personajes del enemigo (<span id="personaje-pc">${personajePC}</span>) tienen <span>${vidasPC}</span> vidas`;
}

// Deshabilitar los botones cuando termine el juego
function deshabilitarBotones() {
    document.getElementById("btn-punio").disabled = true;
    document.getElementById("btn-patada").disabled = true;
    document.getElementById("btn-barrida").disabled = true;
}

// Reiniciar el juego
function reiniciarJuego() {
    location.reload(); // Recarga la página completa
}

// Eventos
document.getElementById("boton-personaje").addEventListener("click", seleccionarPersonajeJugador);
document.getElementById("btn-punio").addEventListener("click", () => {
    ataqueJugador = "Puño";
    ataquePC = ataqueAleatorioPC();
    combate(ataqueJugador, ataquePC);
});
document.getElementById("btn-patada").addEventListener("click", () => {
    ataqueJugador = "Patada";
    ataquePC = ataqueAleatorioPC();
    combate(ataqueJugador, ataquePC);
});
document.getElementById("btn-barrida").addEventListener("click", () => {
    ataqueJugador = "Barrida";
    ataquePC = ataqueAleatorioPC();
    combate(ataqueJugador, ataquePC);
});
document.getElementById("boton-reiniciar").addEventListener("click", reiniciarJuego);
