# sistema decimal
a = 10
print("Decimal:", a)

# sistema binario
b = 0b1010  # 10 en binario
print("Binario:", b)

# sistema octal
c = 0o12  # 10 en octal
print("Octal:", c)

# sistema hexadecimal
d = 0xA  # 10 en hexadecimal
print("Hexadecimal:", d)

a = int("10", 10)  # Decimal
b = int("1010", 2)  # Binario
c = int("12", 8)  # Octal
d = int("A", 16)  # Hexadecimal
print("Decimal desde string:", a)
print("Binario desde string:", b)
print("Octal desde string:", c)
print("Hexadecimal desde string:", d)

# base 5
a = int("20", 5)  # 2*5^1 + 0*5^0 = 10
print("Base 5:", a)