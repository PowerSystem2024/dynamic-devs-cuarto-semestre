from conexion import Conexion
from logger_base import log

class CursorDelPool:
    def __init__(self):
        self.conn = None
        self.cursor = None

    def __enter__(self):
        log.debug("Inicio del método with (__enter__)")
        self.conn = Conexion.obtener_conexion()
        self.cursor = self.conn.cursor()
        return self.cursor

    def __exit__(self, tipo_excepcion, valor_excepcion, detalle_excepcion):
        log.debug("Se ejecuta método __exit__")
        if valor_excepcion:
            self.conn.rollback()
            log.error(f"Ocurrió una excepción: {valor_excepcion}")
        else:
            self.conn.commit()
            log.debug("Commit de la transacción")
        self.cursor.close()
        Conexion.liberar_conexion(self.conn)

# Ejemplo de prueba rápida
""" if __name__ == "__main__":
    with CursorDelPool() as cursor:
        log.debug("Dentro del bloque with")
        cursor.execute("SELECT * FROM usuario")
        log.debug(cursor.fetchall()) """
# 
