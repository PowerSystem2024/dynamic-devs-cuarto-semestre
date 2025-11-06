import random


def choose_options():
    options = ('piedra', 'papel', 'tijera')
    user_option = input('piedra, papel o tijera => ')
    user_option = user_option.lower()

    if not user_option in options:
        print('Esa opcion no es valida')
        return None, None

    computer_option = random.choice(options)

    print('')
    print('Oponente escogio =>', computer_option)
    return user_option, computer_option


def check_rules(user_option, computer_option, user_wins, computer_wins):
    if user_option == computer_option:
        print('¡Empate!')
    elif (user_option == 'piedra' and computer_option == 'tijera') or \
         (user_option == 'tijera' and computer_option == 'papel') or \
         (user_option == 'papel' and computer_option == 'piedra'):
        print('Ganaste!')
        user_wins += 1
    else:
        print('Perdiste!')
        computer_wins += 1
    return user_wins, computer_wins


def run_game():
    computer_wins = 0
    user_wins = 0
    rounds = 1

    while True:
        print('*' * 10)
        print('ROUND', rounds)
        print('*' * 10)
        print('Puntuacion: Usuario', user_wins, ' - Oponente', computer_wins)
        print('')

        rounds += 1

        user_option, computer_option = choose_options()
        if user_option is None:
            continue

        user_wins, computer_wins = check_rules(
            user_option, computer_option, user_wins, computer_wins)

        if computer_wins == 3:
            print('¡Perdiste el juego!')
            break
        if user_wins == 3:
            print('¡Ganaste el juego!')
            break


run_game()
