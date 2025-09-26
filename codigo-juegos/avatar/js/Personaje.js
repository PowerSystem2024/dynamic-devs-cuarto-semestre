// 👤 Clase Personaje
export class Personaje {
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