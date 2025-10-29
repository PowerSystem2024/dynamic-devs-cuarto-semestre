import store


def run():
    razas = store.get_razas()
    for raza in razas:
        print(raza['name'])


if __name__ == '__main__':
    run()
