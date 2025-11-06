def get_population(country_dict):
    population_dict = {
        '2022': int(country_dict['2022 Population']),
        '2020': int(country_dict['2020 Population']),
        '2015': int(country_dict['2015 Population']),
        '2010': int(country_dict['2010 Population']),
        '2000': int(country_dict['2000 Population']),
        '1990': int(country_dict['1990 Population']),
        '1980': int(country_dict['1980 Population']),
        '1970': int(country_dict['1970 Population'])
    }
    labels = population_dict.keys()
    values = population_dict.values()
    return labels, values


def population_by_country(data, country):
    # Normalizamos el nombre del país ingresado
    normalized_input = country.strip().lower().replace('\n', '')

    result = []
    for item in data:
        country_name = str(item['Country']).strip().lower().replace('\n', '')
        if country_name == normalized_input:
            result.append(item)

    if not result:
        print(f"[DEBUG] No se encontró '{normalized_input}' en el archivo CSV.")
        print(f"[DEBUG] Algunos países del CSV son: {[d['Country'] for d in data[:10]]}")

    return result

