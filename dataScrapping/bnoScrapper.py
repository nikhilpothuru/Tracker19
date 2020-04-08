import requests
from bs4 import BeautifulSoup
from csv import writer

response = requests.get(
    'https://docs.google.com/spreadsheets/u/0/d/e/2PACX-1vR30F8lYP3jG7YOq8es0PBpJIE5yvRVZffOyaqC0GgMBN6yt0Q-NI8pxS7hd1F9dYXnowSC6zpZmW9D/pubhtml/sheet?headers=false&gid=0&range=A1:I210')

soup = BeautifulSoup(response.text, 'html.parser')

# Grab confirmed cases and deceased world wide totals
el = soup.find_all(class_='s6')
confirmedCasesTotal = el[0].get_text()
deceasedTotal = el[1].get_text()

# Grab recovered world wide total
recoveredTotal = soup.find(class_='s7').get_text()

# Grab unresolved world wide total
unresolvedTotal = soup.find(class_='s8').get_text()

with open('csvFiles/bnoData.csv', 'w') as csv_file:
    csv_writer = writer(csv_file)
    headers = ['Country Name', 'Confirmed Cases', 'New Cases', 'Deaths',
               'New Deaths', 'Death Rate', 'Serious & Critical', 'Recovered']
    csv_writer.writerow(headers)

    # Grab all country data, (7 to 208)
    tbody = soup.find('tbody')
    for i in range(204):
        # Skip row
        if(i == 202):
            continue
        countryName = tbody.contents[i+7].contents[1].get_text()
        cases = tbody.contents[i+7].contents[2].get_text()
        newCases = tbody.contents[i+7].contents[3].get_text()
        deaths = tbody.contents[i+7].contents[4].get_text()
        newDeaths = tbody.contents[i+7].contents[5].get_text()
        deathRate = tbody.contents[i+7].contents[6].get_text()
        seriousCritical = tbody.contents[i+7].contents[7].get_text()
        recovered = tbody.contents[i+7].contents[8].get_text()
        csv_writer.writerow([countryName, cases, newCases, deaths,
                             newDeaths, deathRate, seriousCritical, recovered])
