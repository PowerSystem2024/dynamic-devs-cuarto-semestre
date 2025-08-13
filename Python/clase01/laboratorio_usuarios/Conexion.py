from logging import log
import sys
from psycopg2 import pool

class Conexion:
    _DATABASE = "laboratorio_usuarios"
    _USERNAME = "root"
    _PASSWORD = "root"
    _DB_PORT = 5432
    _HOST = "127.0.0.1"
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtener_conexion(cls):
        conexion = cls.obtener_pool().getconn()
        log.debug(f"Conexión obtenida: {conexion}")
        return conexion
    
    @classmethod
    def liberar_conexion(cls, conexion):
        cls.obtener_pool().putconn(conexion)
        log.debug(f"Conexión liberada: {conexion}")

    @classmethod
    def cerrar_conexiones(cls):
        cls._pool.closeall()
        log.debug("Todas las conexiones han sido cerradas")

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
                log.debug("Pool de conexiones creado exitosamente")
                return cls._pool
            except Exception as e:
                log.error(f"Error al crear el pool de conexiones: {e}")
                sys.exit()
        else:
            return cls._pool
