// 👤 Clase Personaje mejorada
export class Personaje {
    constructor(nombre, elemento, vidas = 3) {
        this.nombre = nombre;
        this.elemento = elemento;
        this.vidas = vidas;
        this.emoji = this.obtenerEmojiElemento();
        this.ataques = []; // Array para almacenar los ataques del personaje
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

    // Método para agregar ataques al personaje
    agregarAtaque(nombre, id) {
        this.ataques.push({
            nombre: nombre,
            id: id
        });
    }

    // Método para obtener todos los ataques
    obtenerAtaques() {
        return this.ataques;
    }

    // Método para obtener un ataque específico por índice
    obtenerAtaque(indice) {
        return this.ataques[indice];
    }
}