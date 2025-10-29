import logging as log

# Llamamos una configuración básica

# docs.python.org/3/howto/logging.html // PÁGINA PARA CONFIGURACIÓN DE LOGGIN //
log.basicConfig(level=log.DEBUG,
                format='%(asctime)s:%(levelname)s [%(filename)s:%(lineno)s] %(message)s', # esto es hora del error, nivel del error, nombre archivo del error, número de línea del error, y mensaje que envía tras el error..
                datefmt='%I:%M:%S %p', # date format (identifca hora, minuto y segundo. Como también am - pm.
                handlers=[
                    log.FileHandler('capa_datos_.log'),
                    log.StreamHandler()
                ])

if __name__ == '__main__':
    log.debug('Mensaje a nivel debug.')
    log.info('Mensaje a nivel info.')
    log.warning('Mensaje a nivel warning.')
    log.error('Mensaje a nivel error.')
    log.critical('Mensaje a nivel critical.')
