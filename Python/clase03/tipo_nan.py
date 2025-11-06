# Tipo de valor NaN = Not a Number
import math
from decimal import Decimal

a = float('nan')
print(f'a: {a}') # tipo de dato numérico no definido

# Verificar si es NaN mediante módulo math
b = float('nan')
print(f"Es 'b' tipo NaN: {math.isnan(b)}")

c = Decimal('nan')
print(f"Es 'c' tipo NaN: {math.isnan(c)}")