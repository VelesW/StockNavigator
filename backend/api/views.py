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
from .serializers import RegisterSerializer, PortfolioSerializer, RegisterSerializer, SharesSerializer, TransactionsSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shares_list(request):
    sharess = Shares.objects.all()
    data = [{'symbol': shares.symbol, 'name': shares.name, 'exchange': shares.exchange, 'asset_type' : shares.asset_type } for shares in sharess]
    return JsonResponse(data, safe=False)

@permission_classes([IsAuthenticated])
def dashboard(request):
    return JsonResponse({'message': 'Dashboard details'})

@permission_classes([IsAuthenticated])
def shares_detail(request, symbol):
    try:
        shares = Shares.objects.get(symbol=symbol)
        data = {'symbol': shares.symbol, 'name': shares.name, 'current_price': shares.current_price}
        return JsonResponse(data)
    except Shares.DoesNotExist:
        return JsonResponse({'error': 'Shares not found'}, status=404)

@permission_classes([IsAuthenticated])
def buy_shares(request, symbol):
    return JsonResponse({'message': f'Shares {symbol} bought successfully'})

@permission_classes([IsAuthenticated])
def sell_shares(request, symbol):
    return JsonResponse({'message': f'Shares {symbol} sold successfully'})

@permission_classes([IsAuthenticated])
def portfolio(request):
    return JsonResponse({'message': 'Portfolio details'})

@permission_classes([IsAuthenticated])
def transaction_history(request):
    return JsonResponse({'message': 'Transaction history'})

@permission_classes([IsAuthenticated])
def update_profile(request):
    return JsonResponse({'message': 'Profile updated successfully'})

@permission_classes([IsAuthenticated])
def portfolio_details(request):
    return JsonResponse({'message': 'Portfolio details'})

@permission_classes([IsAuthenticated])
def user_list(request):
    return JsonResponse({'message': 'User list'})

@permission_classes([IsAuthenticated])
def shares_price_history(request, symbol):
    return JsonResponse({'message': f'Price history for {symbol}'})

@permission_classes([IsAuthenticated])
def profile_details(request):
    return JsonResponse({'message' : f'User profile details'})
