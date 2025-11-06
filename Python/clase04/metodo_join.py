help(str.join)

tupla_str = ('hola', 'mundo', 'desde', 'una', 'tupla!')
mensaje = str.join(' ', tupla_str)
print(mensaje)

lista_str = ['hola', 'mundo', 'desde', 'una', 'lista!']
mensaje = str.join(' ', lista_str)
print(mensaje)

cadena = "HolaMundo"
mensaje = str.join('.', cadena)
print(mensaje)

diccionario = {'nombre': 'John', 'apellido': 'Doe', 'edad': '33'}
llaves = '-'.join(diccionario.keys())
valores = '-'.join(diccionario.values())
print(f'Llaves: {llaves}, Tipo: {type(llaves)}')
print(f'Valores: {valores}, Tipo: {type(valores)}')
