import json
import requests
from csv import writer

with open('dataScrapping/dxyScrapper/dxyJSONFile.json') as f:
    dataSet = json.load(f)

for data in dataSet:
    response = requests.get(data['statisticsData'])
    json_data = json.loads(response.text)

    response = requests.get(data['statisticsData'])
    json_data = json.loads(response.text)
    with open('csvFiles/dxyData/{countryName}.csv'.format(countryName=data['countryShortCode']), 'w') as csv_file:
        csv_writer = writer(csv_file)
        print(data['countryShortCode'] + ' == ' + data['countryFullName'])
        headers = ['Date ID', 'Confirmed Count', 'Confirmed Increment', 'Recovered Count',
                   'Recovered Increment', 'Deceased Count', 'Deceased Increment']
        csv_writer.writerow(headers)
        for element in json_data['data']:
            dateId = element['dateId']
            # Confirmed == Current Confirmed
            confirmedCount = element['currentConfirmedCount']
            confirmedIncrement = element['currentConfirmedIncr']
            # Recovered == Cured
            recoveredCount = element['curedCount']
            recoveredIncrement = element['curedIncr']
            # Deceased == Dead
            deceasedCount = element['deadCount']
            deceasedIncrement = element['deadIncr']
            csv_writer.writerow([dateId, confirmedCount, confirmedIncrement, recoveredCount,
                                 recoveredIncrement, deceasedCount, deceasedIncrement])
