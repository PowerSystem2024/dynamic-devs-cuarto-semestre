class UsuarioDao:
    _SELECCIONAR = "SELECT * FROM usuarios WHERE id = %s"
    _INSERTAR = "INSERT INTO usuarios(username, password) VALUES(%s, %s)"
    _ACTUALIZAR = "UPDATE usuarios SET username = %s, password = %s WHERE id = %s"
    _ELIMINAR = "DELETE FROM usuarios WHERE id = %s"