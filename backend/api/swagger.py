from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from drf_yasg.generators import OpenAPISchemaGenerator

schema_view = get_schema_view(
    openapi.Info(
        title="Vertulio API",
        default_version='v1',
        description="API for Vertulio Stock Market",
        terms_of_service="https://www.example.com/policies/terms/",
        contact=openapi.Contact(email="vertulio@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    generator_class=OpenAPISchemaGenerator,

)
