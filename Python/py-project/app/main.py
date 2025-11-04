import utils
import read_csv
import charts
import pandas as pd


def run():
    # leemos el csv, gracias al módulo línea 2
    '''
    data = read_csv.read_csv('./data.csv')
    data = list(
        filter(lambda item: item['Continent'] == 'South America', data))

    countries = list(map(lambda x: x['Country'], data))
    percentages = list(map(lambda x: x['World Population Percentage'], data))
    charts.generate_pie_chart(countries, percentages)
    '''

    df = pd.read_csv('./data.csv') # Leemos el archivo CSV en un DataFrame
    df = df[df['Continent'] == 'Africa']
    countries = df['Country'].values
    percentages = df['World Population Percentage'].values
    charts.generate_pie_chart(countries, percentages)

    data = read_csv.read_csv('./data.csv')
    country = input('Type Country => ')
    print(country)

    result = utils.population_by_country(data, country)

    if len(result) > 0:
        country = result[0]
        labels, values = utils.get_population(country)
        charts.generate_bar_chart(country['Country'], labels, values)


if __name__ == '__main__':
    run()
