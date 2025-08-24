class Usuario:
    def __init__(self, id_usuario=None, username=None, password=None):
        self._id_usuario = id_usuario
        self._username = username
        self._password = password

    # Getters y Setters
    @property
    def id_usuario(self):
        return self._id_usuario

    @id_usuario.setter
    def id_usuario(self, valor):
        self._id_usuario = valor

    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, valor):
        self._username = valor

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, valor):
        self._password = valor

    def __str__(self):
        return f"Usuario[ID: {self._id_usuario}, Username: {self._username}, Password: {self._password}]"


# Ejemplo de uso
""" if __name__ == "__main__":
    usuario1 = Usuario(3, "psouza", "876")
    print(usuario1) """
