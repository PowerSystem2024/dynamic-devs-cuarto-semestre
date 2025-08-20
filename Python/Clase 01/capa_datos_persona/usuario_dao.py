from capa_datos_persona.Usuario import Usuario;
from capa_datos_persona.cursor_del_pool import CursorDelPool;
from logger_base import log

class UsuarioDAO:
    '''
    DAO -> Data Access Object para la tabla del usuario
    CRUD -> Create, Read, Update, Delete
    '''

    _SELECT = 'SELECT * FROM usuario ORDER BY id_usuario';
    _INSERT = 'INSERT INTO usuario(username, password) VALUES (%s, %s)';
    _UPDATE = 'UPDATE usuario SET username=%s, password=%s WHERE id_usuario=%s';
    _DELETE = 'DELETE FROM usuario WHERE id_usuario=%s';

@classmethod
def select(cls):
    with CursorDelPool() as cursor:
        log.debug('Seleccionando usuarios')
        cursor.execute(cls._SELECT)
        registros = cursor.fetchall();
        usuarios = [];
        for registro in registros:
            usuario = Usuario(registro[0], registro[1], registro[2])
            usuarios.append(usuario)
        return usuarios;

@classmethod
def insert(cls, usuario):
    with CursorDelPool() as cursor:
        log.debug(f'Usuario Insertado: {usuario}')
        valores = (usuario.username, usuario.password)
        cursor.execute(cls._INSERT, valores)
        return cursor.rowcount;

@classmethod
def update(cls, usuario):
    with CursorDelPool() as cursor:
        log.debug(f'Usuario a actualizar: {usuario}')
        valores = (usuario.username, usuario.password, usuario.id_usuario)
        cursor.execute(cls._UPDATE, valores)
        return cursor.rowcount;

@classmethod
def delete(cls, usuario):
    with CursorDelPool() as cursor:
        log.debug(f'Usuario a eliminar: {usuario}')
        valores = (usuario.id_usuario)
        cursor.execute(cls._DELETE, valores)
        return cursor.rowcount;