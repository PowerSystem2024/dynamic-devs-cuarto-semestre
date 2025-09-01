from cursor_del_pool import CursorDelPool
from usuario import Usuario
from logger_base import log

class UsuarioDao:
    _SELECCIONAR = "SELECT id_usuario, username, password FROM usuario ORDER BY id_usuario"
    _INSERTAR = "INSERT INTO usuario(username, password) VALUES(%s, %s)"
    _ACTUALIZAR = "UPDATE usuario SET username=%s, password=%s WHERE id_usuario=%s"
    _ELIMINAR = "DELETE FROM usuario WHERE id_usuario=%s"

    @classmethod
    def seleccionar(cls):
        with CursorDelPool() as cursor:
            log.debug("Ejecutando SELECT de usuarios")
            cursor.execute(cls._SELECCIONAR)
            registros = cursor.fetchall()
            usuarios = [Usuario(registro[0], registro[1], registro[2]) for registro in registros]
            return usuarios

    @classmethod
    def insertar(cls, usuario):
        with CursorDelPool() as cursor:
            log.debug(f"Insertando usuario: {usuario}")
            valores = (usuario.username, usuario.password)
            cursor.execute(cls._INSERTAR, valores)
            return cursor.rowcount  # Número de registros insertados

    @classmethod
    def actualizar(cls, usuario):
        with CursorDelPool() as cursor:
            log.debug(f"Actualizando usuario: {usuario}")
            valores = (usuario.username, usuario.password, usuario.id_usuario)
            cursor.execute(cls._ACTUALIZAR, valores)
            return cursor.rowcount

    @classmethod
    def eliminar(cls, usuario):
        with CursorDelPool() as cursor:
            log.debug(f"Eliminando usuario: {usuario}")
            valores = (usuario.id_usuario,)
            cursor.execute(cls._ELIMINAR, valores)
            return cursor.rowcount


# Ejemplo de pruebas
""" if __name__ == "__main__":
    # Insertar usuario nuevo
    usuario_nuevo = Usuario(username="jose", password="1234")
    insertados = UsuarioDao.insertar(usuario_nuevo)
    log.debug(f"Usuarios insertados: {insertados}")

    # Listar usuarios
    usuarios = UsuarioDao.seleccionar()
    for usuario in usuarios:
        log.debug(usuario)

    # Actualizar usuario
    usuario_actualizado = Usuario(id_usuario=1, username="hgirard", password="984")
    actualizados = UsuarioDao.actualizar(usuario_actualizado)
    log.debug(f"Usuarios actualizados: {actualizados}")

    # Eliminar usuario
    usuario_eliminar = Usuario(id_usuario=2)
    eliminados = UsuarioDao.eliminar(usuario_eliminar)
    log.debug(f"Usuarios eliminados: {eliminados}") """
