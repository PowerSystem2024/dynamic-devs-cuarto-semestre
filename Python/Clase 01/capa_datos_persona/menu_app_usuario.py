from capa_datos_persona.Usuario import UsuarioDAO
from logger_base import log

opcion = None;
while opcion != 5:
    print("Opciones:")
    print("1. Listar usuarios")
    print("2. Agregar usuario")
    print("3. Modificar usuario")
    print("4. Eliminar usuarios")
    print("5. Salir")
    opcion = int(input("Seleccione una opción de 1 a 5: "))

    if opcion == 1:
        usuarios = UsuarioDAO.select()
        for usuario in usuarios:
            log.info(usuario)
else:
    log.info('Salimos de la aplicación. Hasta pronto');
