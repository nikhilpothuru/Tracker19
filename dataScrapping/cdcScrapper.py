#!/usr/bin/env python3
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen as uReq

# Grab the url for the CDC data
my_url = 'https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html'
uClient = uReq(my_url)

#match = soup.find()
