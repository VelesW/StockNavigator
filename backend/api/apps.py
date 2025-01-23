from django.apps import AppConfig
from django.db.models.signals import post_migrate  # Import post_migrate

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'  # default field type
    name = 'api'  # The name of the app

    def ready(self):
        # WARNING: Disable fetch for developement
        # from .fetch_shares import fetch_and_store_stock_data
        # post_migrate.connect(fetch_and_store_stock_data)
        pass

