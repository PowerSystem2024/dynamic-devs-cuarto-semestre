mensaje1 = "hola mundo" # variable con un valor tipo cadena inmutable
mensaje2 = mensaje1.capitalize() # variable con valor tipo cadena, también inmutable

print(f'Mensaje 1: {mensaje1}, id {id(mensaje1)}')
print(f'Mensaje 2: {mensaje2}, id {id(mensaje2)}')

mensaje1 += ", Adios" # concatenación de un nuevo valor a mensaje1

print(f'Mensaje 1: {mensaje1}, id {id(mensaje1)}') # muestra otro ID, demostrando distinto al que tenía al inicio
