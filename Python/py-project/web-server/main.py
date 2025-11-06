import store
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI() # Crear una instancia de la aplicación FastAPI

# Ruta principal
@app.get('/') # agregamos el decorador para definir la ruta raíz
def get_list():
    return [1, 2, 3,]

# Ruta de contacto o segunda ruta
@app.get('/contact', response_class=HTMLResponse) # especificamos que la respuesta será HTML
def get_list():
    return '''
    <h1>Hola soy un sitio web</h1>
    <p>Soy un párrafo para ser leído</p>
    '''

def run():
    store.get_razas()


if __name__ == '__main__':
    run()
