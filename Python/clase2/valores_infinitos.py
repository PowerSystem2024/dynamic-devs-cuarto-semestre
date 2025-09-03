import math
from decimal import Decimal

# manejo de valores infinitos
infinito_positivo = float('inf')
print(f'Infinito positivo: {infinito_positivo}')
print(f'Es infinito?: {math.isinf(infinito_positivo)}')

infinito_negativo = float('-inf')
print(f'Infinito negativo: {infinito_negativo}')
print(f'Es infinito?: {math.isinf(infinito_negativo)}')

# Module math
infinito_positive = math.inf
print(f'Infinito_positive: {infinito_positive}')
print(f'Es_infinito?: {math.isinf(infinito_positive)}')

infinito_negative = -math.inf
print(f'Infinito_negative: {infinito_negative}')
print(f'Es_infinito?: {math.isinf(infinito_negative)}')

# Modulo decimal
infinito_positive = Decimal('Infinity')
print(f'Infinito_positive: {infinito_positive}')
print(f'Es_infinito?: {math.isinf(infinito_positive)}')

infinito_negative = Decimal('-Infinity')
print(f'Infinito_negative: {infinito_negative}')
print(f'Es_infinito?: {math.isinf(infinito_negative)}')