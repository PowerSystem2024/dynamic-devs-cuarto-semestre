import logging as log

# Configuración básica del logger
log.basicConfig(
    level=log.DEBUG,  # Nivel mínimo de mensajes a registrar
    format="%(asctime)s: %(levelname)s [%(filename)s:%(lineno)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        log.FileHandler("capa_datos.log"),  # Guarda en archivo
        log.StreamHandler()                 # Muestra en consola
    ]
)

# Ejemplo de uso
""" if __name__ == "__main__":
    log.debug("Mensaje de depuración")
    log.info("Mensaje informativo")
    log.warning("Mensaje de advertencia")
    log.error("Mensaje de error")
    log.critical("Mensaje crítico") """
