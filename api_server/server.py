from flask import Flask, request
import requests
from os import fdopen
import json
from urllib2 import Request, urlopen
from bs4 import BeautifulSoup as soup
import csv
import re


def getProducts(item, budget):
    req = Request(
        'https://www.mudah.my/Malaysia/k20+pro-for-sale',
        headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(req).read()
    soup = soup(webpage, 'html.parser')
    [s.extract() for s in soup(['style', 'script', '[document]', 'head', 'title'])]
    productTitle = soup.find_all("h2", {"class": "list_title"})
    prices = soup.find_all("div", {"class": "ads_price"})
    productPrices = []
    productTitles = []
    for price in prices:
        price = re.sub('[^0-9]', '', str(price))
        if price.startswith("RM "):
            var = re.sub('RM', '', var)
            var = re.sub(' ', '', var)
            productPrices.append(var)
        else:
            productPrices.append(str(price))

    productLinks = []
    for product in productTitle:
        productUrl = product.find('a', recursive=False)
        productLinks.append(productUrl['href'])

    for title in productTitle:
        text = title.find('a', recursive=False)
        productTitles.append(text['title'])

    list = []
    productPrices = [int(i) for i in productPrices]
    for i in range(len(productTitles)):
        print(i)
        list.append({"name": productTitles[i], "price": productPrices[i], "url": productLinks[i]})
    list = sorted(list, key=lambda i: i['price'])
    halfpoint = len(list) // 2
    firstHalf = list[halfpoint:]
    firstHalf.reverse()
    lastHalf = list[:halfpoint]
    merged = firstHalf + lastHalf
    with open('../src/items/result.json', 'w') as fp:
        json.dump(merged, fp)


app = Flask(__name__)

@app.route('/', methods=['POST'])
def index(item, budget, condition):
    item = request.values['title']
    budget = request.values['budget']
    respond = getProducts(item, budget)
    return respond

if __name__ == "__main__":
    app.run()