class Usuario:
    def __init__(self, username, password):
        self._id_usuario = None
        self._username = username
        self._password = password

    @property
    def id_usuario(self):
        return self._id_usuario

    @property
    def username(self):
        return self._username

    @property
    def password(self):
        return self._password
    
    @username.setter
    def username(self, value):
        self._username = value

    @password.setter
    def password(self, value):
        self._password = value

    def __str__(self):
        return f"Usuario(id_usuario={self._id_usuario}, username={self._username}, password=******)"