from django.db import models
from django.contrib.auth.models import AbstractUser

class Shareholder(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',
        blank=True
    )

class Portfolio(models.Model):
    user = models.ForeignKey(Shareholder, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

class Shares(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)

class Transactions(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    shares = models.ForeignKey(Shares, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=4, choices=[('BUY', 'Buy'), ('SELL', 'Sell')])
    quantity = models.PositiveIntegerField()
    price_at_transaction = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)