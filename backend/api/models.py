from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError


class Shareholder(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def deposit(self, amount):
        if amount <= 0:
            raise ValidationError("Deposit amount must be positive.")
        self.balance += amount
        self.save()

    def withdraw(self, amount):
        if amount <= 0:
            raise ValidationError("Withdrawal amount must be positive.")
        if amount > self.balance:
            raise ValidationError("Insufficient funds.")
        self.balance -= amount
        self.save()

class Shares(models.Model):
    symbol = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    exchange = models.CharField(max_length=50)
    asset_type = models.CharField(max_length=20)

class Portfolio(models.Model):
    user = models.ForeignKey(Shareholder, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    share = models.ForeignKey(Shares, on_delete=models.CASCADE)
    volume = models.PositiveIntegerField(default=0)
    
class Transactions(models.Model):
    user = models.ForeignKey(Shareholder, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=20)
    transaction_type = models.CharField(max_length=4, choices=[('BUY', 'Buy'), ('SELL', 'Sell')])
    quantity = models.PositiveIntegerField()
    price_at_transaction = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
