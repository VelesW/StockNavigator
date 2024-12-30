from rest_framework import serializers
from .models import Shareholder, Portfolio, Shares, Transactions

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Shareholder
        fields = ['id','username','email','password']

    def create(self, validated_data):
        print("Validated data:", validated_data)

        user = Shareholder.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class ShareholderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shareholder
        fields = ['id', 'first_name', 'last_name', 'email', 'balance']

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'name', 'share']

class SharesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shares
        fields = ['id', 'symbol', 'name', 'exchange', 'asset_type']

class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = ['id', 'user', 'share', 'transaction_type', 'quantity', 'price_at_transaction', 'date']

class DepositSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

class WithdrawSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
