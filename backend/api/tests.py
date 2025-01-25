from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from .models import Shareholder, Shares
from rest_framework_simplejwt.tokens import RefreshToken

class ShareholderModelTest(TestCase):
    def setUp(self):
        self.user = Shareholder.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword'
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'testuser@example.com')
        self.assertTrue(self.user.check_password('testpassword'))

class SharesModelTest(TestCase):
    def setUp(self):
        self.share = Shares.objects.create(
            symbol='IBM',
            name='International Business Machines Corp',
            exchange='NYSE',
            asset_type='Stock'
        )

    def test_share_creation(self):
        self.assertEqual(self.share.symbol, 'IBM')
        self.assertEqual(self.share.name, 'International Business Machines Corp')

class RegistrationAPITest(TestCase):
    def setUp(self):
        self.url = reverse('register')
        self.data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpassword'
        }

    def test_registration(self):
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Shareholder.objects.count(), 1)
        self.assertEqual(Shareholder.objects.get().username, 'newuser')

    def test_registration_invalid_email(self):
        self.data['email'] = 'invalid-email'
        response = self.client.post(self.url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class LoginAPITest(TestCase):
    def setUp(self):
        self.user = Shareholder.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpassword'
        )
        self.url = reverse('token_access')

    def test_login(self):
        response = self.client.post(self.url, {
            'username': 'testuser',
            'password': 'testpassword'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_login_invalid_credentials(self):
        response = self.client.post(self.url, {
            'username': 'testuser',
            'password': 'wrongpassword'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
