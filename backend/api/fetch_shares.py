import requests
from .models import Shares
import csv
from io import StringIO

def fetch_and_store_stock_data(**kwargs):
    url = "https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=demo"
    response = requests.get(url)
    if response.status_code == 200:
        csv_data = StringIO(response.text)
        reader = csv.DictReader(csv_data)
        for item in reader:
            share, created = Shares.objects.get_or_create(
            symbol=item['symbol'],
            defaults={
                'name': item['name'],
                'exchange': item['exchange'],
                'asset_type': item['assetType'],
                }
            )
            if not created:
                share.name = item['name']
                share.exchange = item['exchange']
                share.asset_type = item['assetType']
                share.save()
    else:
        print("Download data error:", response.status_code)