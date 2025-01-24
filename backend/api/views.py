from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import Portfolio, Shares, Transactions, Shareholder
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.core.exceptions import ValidationError
from decimal import Decimal
import requests
from .serializers import ( 
    RegisterSerializer, PortfolioSerializer, RegisterSerializer, ShareholderSerializer,
     SharesSerializer, TransactionsSerializer, DepositSerializer, WithdrawSerializer
)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
             {'message': 'Registration successful', **serializer.data}, 
            status=status.HTTP_201_CREATED,
        )
    else:
        print(serializer.errors)
    return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh(request):
    return TokenRefreshView.as_view()(request._request)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    return TokenObtainPairView.as_view()(request._request)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deposit(request):
    try:
        shareholder = request.user
    except Shareholder.DoesNotExist:
        return Response({'error':'Account not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = DepositSerializer(data=request.data)
    if serializer.is_valid():
        try:
            shareholder.deposit(serializer.validated_data['amount'])
            return Response(ShareholderSerializer(shareholder).data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def withdrawal(request):
    try:
        shareholder = request.user
    except Shareholder.DoesNotExist:
        return Response({'error':'Account not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = WithdrawSerializer(data=request.data)
    if serializer.is_valid():
        try:
            shareholder.withdraw(serializer.validated_data['amount'])
            return Response(ShareholderSerializer(shareholder).data, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shares_list(request):
    sharess = Shares.objects.all()
    data = [{'symbol': shares.symbol, 'name': shares.name, 'exchange': shares.exchange, 'asset_type' : shares.asset_type } for shares in sharess]
    return JsonResponse(data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def concrete_share(request, symbol):
    try:
        shares = Shares.objects.get(symbol=symbol)
        data = {'symbol': shares.symbol, 'name': shares.name, 'exchange': shares.exchange, 'asset_type' : shares.asset_type }
        return JsonResponse(data)
    except Shares.DoesNotExist:
        return JsonResponse({'error': 'Shares not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def share_details(request, symbol):
    try:
        shares = Shares.objects.get(symbol=symbol)
        url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={shares.symbol}&apikey=demo'
        r = requests.get(url)
        data = r.json()
        return JsonResponse(data)
    except Shares.DoesNotExist:
        return JsonResponse({'error': 'Shares not found'}, status=404)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Error fetching data from external API', 'details': str(e)}, status=500)
    except ValueError:
        return JsonResponse({'error': 'Error parsing JSON response'}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buy_shares(request, symbol):
    try:
        shareholder = request.user
        # Fetch current price of the shares from the external API
        url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey=demo'
        r = requests.get(url)
        data = r.json()
        current_price = float(data['Global Quote']['05. price'])  # Extract current price
        symbol = data['Global Quote']['01. symbol']
        share = Shares.objects.get(symbol=symbol)

        
        # Get the amount to buy from the request data
        amount_to_buy = request.data.get('amount', 0)
        total_cost = Decimal(current_price) * Decimal(amount_to_buy)
        
        # Check if the shareholder has enough balance
        if shareholder.balance >= total_cost:
            shareholder.withdraw(total_cost) 
            
            # Save transaction details to the Transactions table
            transaction = Transactions(
                user=shareholder,
                symbol=symbol,
                transaction_type='BUY',
                quantity=amount_to_buy,
                price_at_transaction=current_price,
                total_cost=total_cost,
            )
            transaction.save()  # Save the transaction to the database
            
            # Update the Portfolio table
            portfolio, created = Portfolio.objects.get_or_create(user=shareholder, share=share)
            portfolio.volume += amount_to_buy  # Update the number of shares
            portfolio.save()  # Save the updated portfolio
            
            return JsonResponse({'message': f'Shares {symbol} bought successfully', 'total_cost': total_cost})
        else:
            return JsonResponse({'error': 'Insufficient balance'}, status=400)
    except Shares.DoesNotExist:
        return JsonResponse({'error': 'Shares not found'}, status=404)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Error fetching data from external API', 'details': str(e)}, status=500)
    except ValueError:
        return JsonResponse({'error': 'Error parsing JSON response'}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sell_shares(request, symbol):
    try:
        shareholder = request.user
        shares = Shares.objects.get(symbol=symbol)
        
        amount_to_sell = request.data.get('amount', 0)
        portfolio = Portfolio.objects.get(user=shareholder, share=shares)
        
        if portfolio.volume >= amount_to_sell:
            url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey=demo'
            r = requests.get(url)
            data = r.json()
            current_price = float(data['Global Quote']['05. price'])
            
            # Update the portfolio by deducting the sold shares
            portfolio.volume -= amount_to_sell
            portfolio.save()
            total_earnings = Decimal(amount_to_sell) * Decimal(current_price)
            if total_earnings > 0: 
                shareholder.deposit(total_earnings)
            
            # Save transaction details to the Transactions table
            transaction = Transactions(
                user=shareholder,
                symbol=symbol,
                transaction_type='SELL',
                quantity=amount_to_sell,
                price_at_transaction=current_price,
                total_cost=total_earnings
            )
            transaction.save()
            
            return JsonResponse({'message': f'Shares {symbol} sold successfully', 'earnings': total_earnings})
        else:
            return JsonResponse({'error': 'Insufficient shares in portfolio'}, status=400)
    except Shares.DoesNotExist:
        return JsonResponse({'error': 'Shares not found'}, status=404)
    except Portfolio.DoesNotExist:
        return JsonResponse({'error': 'No shares found in portfolio'}, status=404)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Error fetching data from external API', 'details': str(e)}, status=500)
    except ValueError:
        return JsonResponse({'error': 'Error parsing JSON response'}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shares_profit(request, symbol):
    try:
        # Get the user
        user = request.user
        
        # Get all transactions for the symbol
        transactions = Transactions.objects.filter(user=user, symbol=symbol)
        
        # Fetch current price of the shares from the external API
        url = f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey=demo'
        r = requests.get(url)
        data = r.json()
        current_price = float(data['Global Quote']['05. price'])  # Extract current price
        
        total_profit_loss = 0
        
        for transaction in transactions:
            if transaction.transaction_type == 'BUY':
                # Calculate profit or loss for each buy transaction
                bought_price = transaction.price_at_transaction
                quantity = transaction.quantity
                total_cost = Decimal(bought_price) * Decimal(quantity)
                
                current_value = Decimal(current_price) * Decimal(quantity)
                
                profit_loss = current_value - total_cost
                
                total_profit_loss += profit_loss
        
        if total_profit_loss > 0:
            message = f'You have made a price change of ${total_profit_loss}'
        elif total_profit_loss < 0:
            message = f'You have incurred a loss of ${abs(total_profit_loss)}'
        else:
            message = 'Your investment is break-even'
        
        return JsonResponse({'message': message, 'total_profit_loss': total_profit_loss})
        
    except Transactions.DoesNotExist:
        return JsonResponse({'error': 'No transactions found for the symbol'}, status=404)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Error fetching data from external API', 'details': str(e)}, status=500)
    except ValueError:
        return JsonResponse({'error': 'Error parsing JSON response'}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def portfolio(request):
    user = request.user
    portfolio = Portfolio.objects.filter(user=user)
    serializer = PortfolioSerializer(portfolio, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def transaction_history(request):
    user = request.user
    transactions = Transactions.objects.filter(user=user)
    serializer = TransactionsSerializer(transactions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    shareholder = get_object_or_404(Shareholder, id=request.user.id)

    data = request.data
    shareholder.first_name = data.get('first_name', shareholder.first_name)
    shareholder.last_name = data.get('last_name', shareholder.last_name)
    shareholder.email = data.get('email', shareholder.email)
                
    shareholder.save()
        
    return JsonResponse({'message': 'Profile updated successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request):
    users = Shareholder.objects.all()
    user_data = [{'id' : user.id, 'username' : user.username, 'email' : user.email } for user in users ]

    return JsonResponse(user_data, safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shares_price_history(request, symbol):
    try:
        url = f"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol={symbol}&apikey=demo"
        r = requests.get(url)
        data = r.json()
        return JsonResponse(data)
    except Shares.DoesNotExist:
        return JsonResponse({'error': 'Shares not found'}, status=404)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Error fetching data from external API', 'details': str(e)}, status=500)
    except ValueError:
        return JsonResponse({'error': 'Error parsing JSON response'}, status=500)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile_details(request):
        shareholder = get_object_or_404(Shareholder, id=request.user.id)
    
        response_data = {
            'id': shareholder.id,
            'username': shareholder.username,
            'first_name': shareholder.first_name,
            'last_name': shareholder.last_name,
            'email': shareholder.email,
            'balance': shareholder.balance
        }
        
        return JsonResponse(response_data)
