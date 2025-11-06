#help(str.split)

cursos = 'Python Java JS Node'
lista = cursos.split()
print(f'Lista: {lista}, Tipo: {type(lista)}')

cursos_separados = 'Python,Java,JS,Node'
lista = cursos_separados.split(',',2)
print(f'Lista: {lista}, Tipo: {type(lista)}')
print(len(lista))