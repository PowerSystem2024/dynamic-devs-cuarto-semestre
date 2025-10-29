# Bool contiene valores True o False = 1 o 0 respectivamente
valor = 0
resultado = bool(valor)
print(f"Valor: {valor}, Resultado: {resultado}")

valor = -23
resultado = bool(valor)
print(f"Valor: {valor}, Resultado: {resultado}")

# Cualquier valor distinto a cero es True,
# ya sea positivo o negativo, entero o decimal

# Booleanos con cadenas (Strings)
# False para cadenas vacías '' y True para el resto de variantes
valor = "Hola"
resultado = bool(valor)
print(f"Valor: {valor}, Resultado: {resultado}")

valor = ""
resultado = bool(valor)
print(f"Valor: {valor}, Resultado: {resultado}")

# Booleanos con colecciones
# False para colecciones vacías, True para el resto de variantes

# Listas
valores = [1,2,3]
resultado = bool(valores)
print(f"Valores Lista con elementos: {valores}, Resultado: {resultado}")
valores = []
resultado = bool(valores)
print(f"Valores Lista vacía: {valores}, Resultado: {resultado}")

# Tuplas
valores = (4,)
resultado = bool(valores)
print(f"Valores Tupla con elementos: {valores}, Resultado: {resultado}")
valores = ()
resultado = bool(valores)
print(f"Valores Tupla vacía: {valores}, Resultado: {resultado}")

# Diccionarios
valores = {"Hola", "Mundo"}
resultado = bool(valores)
print(f"Valores Diccionario con elementos: {valores}, Resultado: {resultado}")
valores = {}
resultado = bool(valores)
print(f"Valores Diccionario vacío: {valores}, Resultado: {resultado}")

# Sentencias de control con bool
if bool(''):
    print("True")
else:
    print("False")

# Ciclos
variable = 3
while variable:
    print("True")
    break
else:
    print("False")