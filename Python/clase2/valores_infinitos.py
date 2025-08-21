# manejo de valores infinitos en Python
import math
from decimal import Decimal

infinito_positivo = float('inf')
infinito_negativo = float('-inf')
print(f"infinito_positivo = {infinito_positivo:.2f}")
print(f"infinito_negativo = {infinito_negativo:.2f}")

print(f'Es infinito +: {math.isinf(infinito_positivo)}')
print(f'Es infinito -: {math.isinf(infinito_negativo)}')

# modulo math
infinito = math.inf #positivo
print(f'Es infinito: {math.isinf(infinito)}')

infinito = -math.inf #negativo
print(f'Es infinito: {math.isinf(infinito)}')

infinito = Decimal('Infinity') #positivo
print(f'Es infinito: {math.isinf(infinito)}')

resultado = infinito_positivo - infinito_negativo
print(f'Resultado de infinito positivo - infinito negativo: {resultado:.2f}')