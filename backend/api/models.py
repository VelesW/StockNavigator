from django.db import models
from django.contrib.auth.models import AbstractUser

class Shareholder(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    # Possible OAuth2 integration
    # groups = models.ManyToManyField(
    #     'auth.Group',
    #     related_name='custom_user_set',
    #     blank=True
    # )
    # user_permissions = models.ManyToManyField(
    #     'auth.Permission',
    #     related_name='custom_user_permissions_set',
    #     blank=True
    # )


class Shares(models.Model):
    symbol = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    exchange = models.CharField(max_length=50)  
    asset_type = models.CharField(max_length=20)

class Portfolio(models.Model):
    user = models.ForeignKey(Shareholder, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    share = models.ForeignKey(Shares, on_delete=models.CASCADE)
    
class Transactions(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    share = models.ForeignKey(Shares, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=4, choices=[('BUY', 'Buy'), ('SELL', 'Sell')])
    quantity = models.PositiveIntegerField()
    price_at_transaction = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)