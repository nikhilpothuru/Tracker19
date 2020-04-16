import requests
import os.path
from os import path
from csv import writer

response = requests.get(
    'https://datahub.io/core/covid-19/r/worldwide-aggregated.csv')
print(response.text)

file1 = open(
    "csvFiles/whoGlobalData.txt", "w+")
file1.write(response.text)
print('WHO Scrapper')
file1.close()
