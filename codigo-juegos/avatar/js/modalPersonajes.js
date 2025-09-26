// 🎯 Módulo para gestión del modal de personajes
export class ModalPersonajes {
    constructor(personajesArray, generarPersonajesCallback, mostrarMensajeCallback, PersonajeClass) {
        this.PERSONAJES = personajesArray;
        this.generarPersonajes = generarPersonajesCallback;
        this.mostrarMensaje = mostrarMensajeCallback;
        this.Personaje = PersonajeClass; // Recibir la clase como parámetro
        
        // Elementos del modal
        this.elements = {
            modal: document.getElementById("modal-agregar-personaje"),
            form: document.getElementById("form-nuevo-personaje"),
            nombreInput: document.getElementById("nombre-personaje"),
            elementoSelect: document.getElementById("elemento-personaje"),
            cancelarBtn: document.getElementById("cancelar-agregar"),
            cerrarBtn: document.querySelector(".cerrar-modal")
        };
        
        this.inicializarEventos();
    }

    inicializarEventos() {
        // Eventos del modal
        this.elements.cerrarBtn.addEventListener("click", () => this.cerrar());
        this.elements.cancelarBtn.addEventListener("click", () => this.cerrar());
        this.elements.form.addEventListener("submit", (e) => this.agregarPersonaje(e));
        
        // Cerrar modal al hacer clic fuera
        window.addEventListener("click", (event) => {
            if (event.target === this.elements.modal) {
                this.cerrar();
            }
        });
    }

    abrir() {
        this.elements.modal.style.display = 'block';
        this.elements.nombreInput.focus();
    }

    cerrar() {
        this.elements.modal.style.display = 'none';
        this.elements.form.reset();
    }

    agregarPersonaje(event) {
        event.preventDefault();
        
        const nombre = this.elements.nombreInput.value.trim();
        const elemento = this.elements.elementoSelect.value;
        
        // Validaciones
        if (!this.validarFormulario(nombre, elemento)) {
            return;
        }
        
        // Crear y agregar el nuevo personaje (SIN await)
        const nuevoPersonaje = new this.Personaje(nombre, elemento);
        this.PERSONAJES.push(nuevoPersonaje);
        
        // Actualizar interfaz
        this.generarPersonajes();
        this.cerrar();
        this.mostrarMensaje(`¡Personaje "${nombre}" agregado exitosamente!`);
    }

    validarFormulario(nombre, elemento) {
        if (!nombre) {
            alert('Por favor ingresa un nombre para el personaje');
            return false;
        }
        
        if (!elemento) {
            alert('Por favor selecciona un elemento');
            return false;
        }
        
        // Verificar si el personaje ya existe
        if (this.PERSONAJES.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())) {
            alert('¡Ya existe un personaje con ese nombre!');
            return false;
        }
        
        return true;
    }
}