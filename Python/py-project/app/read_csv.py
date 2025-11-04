import csv

def read_csv(path):
    with open(path, 'r', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        header = next(reader)
        # Limpia espacios en los encabezados
        header = [h.strip() for h in header]
        data = []
        for row in reader:
            # Limpia espacios y saltos de línea en los valores
            row = [value.strip() for value in row]
            iterable = zip(header, row)
            country_dict = {key: value for key, value in iterable}
            data.append(country_dict)
        return data


if __name__ == '__main__':
    data = read_csv('./app/data.csv')
    print(data[0])
