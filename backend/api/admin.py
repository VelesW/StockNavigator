from django.contrib import admin
from .models import Shareholder, Portfolio, Shares, Transactions

admin.site.register(Shareholder)
admin.site.register(Portfolio)
admin.site.register(Shares)
admin.site.register(Transactions)
