from django.contrib import admin
from django.urls import path, include
from api import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='token_access'),
    path('login/refresh/', views.refresh, name='token_refresh'),
    path('deposit/', views.deposit, name='deposit'),
    path('withdrawal/', views.withdrawal, name='withdrawal'),
    path('shares/', views.shares_list, name='shares_list'),
    path('shares/<str:symbol>/', views.concrete_share, name='concrete_share'),
    path('shares/<str:symbol>/details/', views.share_details, name='share_details'),
    path('shares/<str:symbol>/buy/', views.buy_shares, name='buy_shares'),
    path('shares/<str:symbol>/sell/', views.sell_shares, name='sell_shares'),
    path('shares/<str:symbol>/profit', views.shares_profit, name='shares_profit'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('portfolio/history/', views.transaction_history, name='transaction_history'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('portfolio/details/', views.portfolio_details, name='portfolio_details'),
    path('users/', views.user_list, name='user_list'),
    path('shares/<str:symbol>/history/', views.shares_price_history, name='shares_price_history'),
    path('profile/details', views.profile_details, name='profile_details')
]
