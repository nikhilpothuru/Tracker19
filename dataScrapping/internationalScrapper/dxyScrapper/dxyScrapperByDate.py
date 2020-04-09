import json
import requests
import os.path
from os import path
from csv import writer

with open('dataScrapping/internationalScrapper/dxyScrapper/dxyJSONFile.json') as f:
    dataSet = json.load(f)

file1 = open("csvFiles/dxyData/CountryCodeToCountryName.txt", "w+")

countrySet = set(())
tempSet = set(())

for data in dataSet:
    if data['countryShortCode'] not in countrySet:
        countrySet.add(data['countryShortCode'])
    else:
        break
    response = requests.get(data['statisticsData'])
    json_data = json.loads(response.text)
    print(data['countryShortCode'] + ' == ' + data['countryFullName'])
    file1.write(data['countryShortCode'] +
                ' == ' + data['countryFullName'] + '\n')
    response = requests.get(data['statisticsData'])
    json_data = json.loads(response.text)
    for element in json_data['data']:
        dateId = element['dateId']
        if dateId not in tempSet:
            open(
                'csvFiles/dxyDataDate/{dateId_}.csv'.format(dateId_=dateId), 'w').close()
        with open('csvFiles/dxyDataDate/{dateId_}.csv'.format(dateId_=dateId), 'a') as csv_file:
            csv_writer = writer(csv_file)
            if dateId not in tempSet:
                headers = ['Country Name', 'Confirmed Count', 'Confirmed Increment', 'Recovered Count',
                           'Recovered Increment', 'Deceased Count', 'Deceased Increment']
                csv_writer.writerow(headers)
                tempSet.add(dateId)
            # Confirmed == Current Confirmed
            confirmedCount = element['currentConfirmedCount']
            confirmedIncrement = element['currentConfirmedIncr']
            # Recovered == Cured
            recoveredCount = element['curedCount']
            recoveredIncrement = element['curedIncr']
            # Deceased == Dead
            deceasedCount = element['deadCount']
            deceasedIncrement = element['deadIncr']
            csv_writer.writerow([data['countryFullName'], confirmedCount, confirmedIncrement, recoveredCount,
                                 recoveredIncrement, deceasedCount, deceasedIncrement])
file1.close()
