from rest_framework import serializers
from .models import Shareholder, Portfolio, Shares, Transactions

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Shareholder
        fields = ['id','username','email','password']

class ShareholderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shareholder
        fields = ['id', 'first_name', 'last_name', 'email', 'groups', 'user_permissions']

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'name']

class SharesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shares
        fields = ['id', 'symbol', 'name', 'current_price']

class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ['id', 'portfolio', 'shares', 'transaction_type', 'quantity', 'price_at_transaction', 'date']