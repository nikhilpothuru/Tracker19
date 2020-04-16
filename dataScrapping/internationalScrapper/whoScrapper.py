import json
import requests
import os.path
from os import path
from csv import writer

response = requests.get(
    'https://datahub.io/core/covid-19/r/time-series-19-covid-combined.csv')
print(response.text)

file1 = open(
    "csvFiles/internationalData/whoData.txt", "w+")
file1.write(response.text)
file1.close()

'''
file1 = open(
    "csvFiles/internationalData/whoData.txt", "r+")
Lines = file1.readlines()

for line in Lines:
    arr = line.split(',')
    print(arr[0])
    '''
