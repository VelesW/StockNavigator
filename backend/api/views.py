from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from oauth2_provider.decorators import protected_resource
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import Portfolio, Shares, Transactions, Shareholder
from .serializers import RegisterSerializer, PortfolioSerializer, RegisterSerializer, SharesSerializer, TransactionsSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED
        )
    else:
        print(serializer.errors)
    return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

def login_view(request):
    # Logika logowania użytkownika
    return JsonResponse({'message': 'User logged in successfully'})

@protected_resource()
def shares_list(request):
    sharess = Shares.objects.all()
    data = [{'symbol': shares.symbol, 'name': shares.name, 'current_price': shares.current_price} for shares in sharess]
    return JsonResponse(data, safe=False)

@protected_resource()
def dashboard(request):
    return JsonResponse({'message': 'Dashboard details'})

@protected_resource()
def shares_detail(request, symbol):
    try:
        shares = Shares.objects.get(symbol=symbol)
        data = {'symbol': shares.symbol, 'name': shares.name, 'current_price': shares.current_price}
        return JsonResponse(data)
    except Shares.DoesNotExist:
        return JsonResponse({'error': 'Shares not found'}, status=404)

@protected_resource()
def buy_shares(request, symbol):
    return JsonResponse({'message': f'Shares {symbol} bought successfully'})

@protected_resource()
def sell_shares(request, symbol):
    return JsonResponse({'message': f'Shares {symbol} sold successfully'})

@protected_resource()
def portfolio(request):
    return JsonResponse({'message': 'Portfolio details'})

@protected_resource()
def transaction_history(request):
    return JsonResponse({'message': 'Transaction history'})

@protected_resource()
def update_profile(request):
    return JsonResponse({'message': 'Profile updated successfully'})

@protected_resource()
def portfolio_details(request):
    return JsonResponse({'message': 'Portfolio details'})

@protected_resource()
def user_list(request):
    return JsonResponse({'message': 'User list'})

@protected_resource()
def shares_price_history(request, symbol):
    return JsonResponse({'message': f'Price history for {symbol}'})

@protected_resource
def profile_details(request):
    return JsonResponse({'message' : f'User profile details'})
