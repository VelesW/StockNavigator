from django.contrib import admin
from django.urls import path, include
from api import views

urlpatterns = [
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('admin/', admin.site.urls),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('shares/', views.shares_list, name='shares_list'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('shares/<str:symbol>/', views.shares_detail, name='shares_detail'),
    path('shares/<str:symbol>/buy/', views.buy_shares, name='buy_shares'),
    path('shares/<str:symbol>/sell/', views.sell_shares, name='sell_shares'),
    path('portfolio/', views.portfolio, name='portfolio'),
    path('portfolio/history/', views.transaction_history, name='transaction_history'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('portfolio/details/', views.portfolio_details, name='portfolio_details'),
    path('users/', views.user_list, name='user_list'),
    path('shares/<str:symbol>/details/', views.shares_price_history, name='shares_price_history'),
]