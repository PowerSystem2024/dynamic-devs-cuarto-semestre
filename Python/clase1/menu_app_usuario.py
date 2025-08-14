from usuario_dao import UsuarioDao
from usuario import Usuario
from logger_base import log

def mostrar_menu():
    print("\n=== Menú de Usuarios ===")
    print("1. Listar usuarios")
    print("2. Agregar usuario")
    print("3. Actualizar usuario")
    print("4. Eliminar usuario")
    print("5. Salir")

def ejecutar_opcion(opcion):
    if opcion == "1":
        usuarios = UsuarioDao.seleccionar()
        print("\n--- Lista de Usuarios ---")
        for usuario in usuarios:
            print(usuario)
    elif opcion == "2":
        username = input("Ingrese username: ")
        password = input("Ingrese password: ")
        usuario = Usuario(username=username, password=password)
        insertados = UsuarioDao.insertar(usuario)
        log.info(f"Usuarios insertados: {insertados}")
    elif opcion == "3":
        id_usuario = int(input("Ingrese ID de usuario a actualizar: "))
        username = input("Ingrese nuevo username: ")
        password = input("Ingrese nuevo password: ")
        usuario = Usuario(id_usuario=id_usuario, username=username, password=password)
        actualizados = UsuarioDao.actualizar(usuario)
        log.info(f"Usuarios actualizados: {actualizados}")
    elif opcion == "4":
        id_usuario = int(input("Ingrese ID de usuario a eliminar: "))
        usuario = Usuario(id_usuario=id_usuario)
        eliminados = UsuarioDao.eliminar(usuario)
        log.info(f"Usuarios eliminados: {eliminados}")
    elif opcion == "5":
        print("Saliendo del programa...")
        return False
    else:
        print("Opción no válida.")
    return True

if __name__ == "__main__":
    continuar = True
    while continuar:
        mostrar_menu()
        opcion = input("Seleccione una opción: ")
        continuar = ejecutar_opcion(opcion)
