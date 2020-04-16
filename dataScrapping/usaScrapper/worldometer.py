import requests
from bs4 import BeautifulSoup
from csv import writer

response = requests.get(
    'https://www.worldometers.info/coronavirus/country/us/')

soup = BeautifulSoup(response.text, 'html.parser')

tbody = soup.find('tbody')
# el = tbody.contents[3].find_next_sibling().contents[1].get_text()
el = tbody.contents[3]

with open('csvFiles/stateData/worldometer.csv', 'w') as csv_file:
    csv_writer = writer(csv_file)
    headers = ['State Name', 'Confirmed Cases', 'New Cases', 'Deaths',
               'New Deaths', 'Active Cases']
    csv_writer.writerow(headers)
    for i in range(51):
        if i != 0:
            el = el.find_next_sibling()
        stateName = el.contents[1].get_text()
        totalCases = el.contents[3].get_text()
        newCases = el.contents[5].get_text()
        totalDeaths = el.contents[7].get_text()
        newDeaths = el.contents[9].get_text()
        activeCases = el.contents[11].get_text()
        csv_writer.writerow([stateName, totalCases, newCases, totalDeaths,
                             newDeaths, activeCases])
print('WorldOMeter Scrapper Ran')
