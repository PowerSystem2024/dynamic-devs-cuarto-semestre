package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiantes2022;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

	@Autowired
	private EstudianteServicio estudianteServicio;

	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);
	private final String nl = System.lineSeparator();

	public static void main(String[] args) {
		logger.info("Iniciando la aplicación...");
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicación finalizada!");
	}

	@Override
	public void run(String... args) {
		logger.info(nl + "Ejecutando el método run de Spring..." + nl);
		boolean salir = false;
		Scanner consola = new Scanner(System.in);

		while (!salir) {
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl);
		}
	}

	private void mostrarMenu() {
		logger.info("""
                ****** Sistema de Estudiantes ******
                1. Listar Estudiantes
                2. Buscar Estudiante
                3. Agregar Estudiante
                4. Modificar Estudiante
                5. Eliminar Estudiante
                6. Salir
                Elija una opción:""");
	}

	private boolean ejecutarOpciones(Scanner consola) {
		boolean salir = false;
		int opcion;

		try {
			opcion = Integer.parseInt(consola.nextLine());

			switch (opcion) {
				case 1 -> { // Listar estudiantes
					logger.info(nl + "Listado de estudiantes: " + nl);
					List<Estudiantes2022> estudiantes = estudianteServicio.listarEstudiantes();
					estudiantes.forEach(estudiante -> logger.info(estudiante.toString() + nl));
				}
				case 2 -> { // Buscar estudiante por id
					int idEstudiante = leerId(consola, "Digite el id estudiante a buscar: ");
					Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
					if (estudiante != null) {
						logger.info("Estudiante encontrado: " + estudiante + nl);
					} else {
						logger.info("Estudiante NO encontrado con id: " + idEstudiante + nl);
					}
				}
				case 3 -> { // Agregar estudiante
					logger.info("Agregar estudiante:" + nl);
					logger.info("Nombre: ");
					String nombre = consola.nextLine();
					logger.info("Apellido: ");
					String apellido = consola.nextLine();
					logger.info("Telefono: ");
					String telefono = consola.nextLine();
					logger.info("Email: ");
					String email = consola.nextLine();

					Estudiantes2022 estudiante = new Estudiantes2022();
					estudiante.setNombre(nombre);
					estudiante.setApellido(apellido);
					estudiante.setTelefono(telefono);
					estudiante.setEmail(email);

					estudianteServicio.guardarEstudiante(estudiante);
					logger.info("Estudiante agregado: " + estudiante + nl);
				}
				case 4 -> { // Modificar estudiante
					int idEstudiante = leerId(consola, "Ingrese el id estudiante: ");
					Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);

					if (estudiante != null) {
						logger.info("Nombre: ");
						String nombre = consola.nextLine();
						logger.info("Apellido: ");
						String apellido = consola.nextLine();
						logger.info("Telefono: ");
						String telefono = consola.nextLine();
						logger.info("Email: ");
						String email = consola.nextLine();

						estudiante.setNombre(nombre);
						estudiante.setApellido(apellido);
						estudiante.setTelefono(telefono);
						estudiante.setEmail(email);

						estudianteServicio.guardarEstudiante(estudiante);
						logger.info("Estudiante modificado: " + estudiante + nl);
					} else {
						logger.info("Estudiante no encontrado con id: " + idEstudiante + nl);
					}
				}
				case 5 -> { // Eliminar estudiante
					int idEstudiante = leerId(consola, "Digite el id estudiante: ");
					Estudiantes2022 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);

					if (estudiante != null) {
						estudianteServicio.eliminarEstudiante(estudiante);
						logger.info("Estudiante eliminado: " + estudiante + nl);
					} else {
						logger.info("Estudiante NO encontrado con id: " + idEstudiante + nl);
					}
				}
				case 6 -> { // Salir
					logger.info("Hasta pronto!" + nl + nl);
					salir = true;
				}
				default -> logger.info("Opción no reconocida: " + opcion + nl);
			}

		} catch (NumberFormatException e) {
			logger.info("Por favor ingrese un número válido." + nl);
		}

		return salir;
	}

	// Método auxiliar para leer un ID y manejar excepciones
	private int leerId(Scanner consola, String mensaje) {
		int id = -1;
		boolean valido = false;
		while (!valido) {
			try {
				logger.info(mensaje);
				id = Integer.parseInt(consola.nextLine());
				valido = true;
			} catch (NumberFormatException e) {
				logger.info("ID inválido. Por favor ingrese un número entero.");
			}
		}
		return id;
	}
}


