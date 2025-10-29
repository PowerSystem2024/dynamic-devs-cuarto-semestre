// 👥 Módulo para generar la lista de personajes en la UI
export class GeneradorPersonajes {
    constructor(personajesArray) {
        this.PERSONAJES = personajesArray;
        this.contenedor = document.getElementById('contenedor-personajes');
    }

    generar() {
        this.contenedor.innerHTML = ''; // Limpiar contenedor

        this.PERSONAJES.forEach((personaje) => {
            const divPersonaje = document.createElement('div');
            divPersonaje.className = 'opcion-personaje';

            divPersonaje.innerHTML = `
                <input type="radio" name="personaje" id="${personaje.nombre}" />
                <label for="${personaje.nombre}" class="fss">
                    ${personaje.nombre} ${personaje.emoji}
                </label>
            `;

            this.contenedor.appendChild(divPersonaje);
        });
    }

    // Método para agregar personaje y actualizar UI
    agregarPersonaje(nuevoPersonaje) {
        this.PERSONAJES.push(nuevoPersonaje);
        this.generar();
    }

    // Método para obtener personajes
    getPersonajes() {
        return this.PERSONAJES;
    }
}