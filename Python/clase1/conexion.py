from logger_base import log
from psycopg2 import pool
import sys

class Conexion:
    _DATABASE = "test_db"
    _USERNAME = "postgres"
    _PASSWORD = "admin"
    _DB_PORT = "5432"
    _HOST = "127.0.0.1"
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtener_pool(cls):
        if cls._pool is None:
            try:
                cls._pool = pool.SimpleConnectionPool(
                    cls._MIN_CON,
                    cls._MAX_CON,
                    host=cls._HOST,
                    user=cls._USERNAME,
                    password=cls._PASSWORD,
                    port=cls._DB_PORT,
                    database=cls._DATABASE
                )
                log.debug(f"Creación del pool exitosa: {cls._pool}")
                return cls._pool
            except Exception as e:
                log.error(f"Ocurrió un error al obtener el pool de conexiones: {e}")
                sys.exit()
        else:
            return cls._pool

    @classmethod
    def obtener_conexion(cls):
        conexion = cls.obtener_pool().getconn()
        log.debug(f"Conexión obtenida del pool: {conexion}")
        return conexion

    @classmethod
    def liberar_conexion(cls, conexion):
        cls.obtener_pool().putconn(conexion)
        log.debug(f"Conexión liberada: {conexion}")

    @classmethod
    def cerrar_conexiones(cls):
        cls.obtener_pool().closeall()
        log.debug("Conexiones cerradas.")

# Solo para prueba rápida
""" if __name__ == "__main__":
    conexion = Conexion.obtener_conexion()
    Conexion.liberar_conexion(conexion)
    Conexion.cerrar_conexiones() """

