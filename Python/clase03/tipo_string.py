# Concatenación automática en Python
import math

mensaje = "Hola " "Mundo"
print(mensaje) # Se unen sin el operador +

# Concatenación cadena + variable
variable = "!"
mensaje = "Hola " "Mundo" + variable
print(mensaje)
mensaje += variable
print(mensaje) # doble !! al final

# En el caso anterior no se permite concatenar de la siguiente manera:
# variable = "!"
# mensaje = "Hola " "Mundo" variable
# print(mensaje) SyntaxError: invalid syntax

# Uso de la clase help() para consultar funcionalidades
help(str)

# consulta de la función isnan() del módulo math con help()
help(math.isnan)