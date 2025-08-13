from logging import log
from Python.clase01.laboratorio_usuarios.Conexion import Conexion

class CursorDelPool:
    def __init__(self):
        self._conexion = None
        self._cursor = None

    def __enter__(self):
        log.debug("inicio del metodo with y __enter__")
        self._conexion = Conexion.obtenerConexion()
        self._cursor = self._conexion.cursor()
        return self._cursor

    def __exit__(self, tipo_exception, valor_exception, detalle_exception):
        log.debug("inicio del metodo with y __exit__")
        if valor_exception:
            self._conexion.rollback()
            log.error(f"Ocurrió una excepción: {valor_exception}")
        else:
            self._conexion.commit()
            log.debug("Transacción completada con éxito.")    
        self._cursor.close()
        Conexion.liberar_conexion(self._conexion)