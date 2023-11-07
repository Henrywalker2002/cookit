from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from user.views import AuthenticationViewSet, UserViewSet
from food.views import FoodModelViewSet, IngredientModelViewSet
from favorite_food.views import FavoriteFoodModelViewSet

router = DefaultRouter() 

router.register(r'user', UserViewSet, 'user')
router.register('food', FoodModelViewSet, 'food')
router.register('ingredient', IngredientModelViewSet, 'ingredient')
router.register('favorite-food', FavoriteFoodModelViewSet, 'favorite-food')

schema_view = get_schema_view(openapi.Info(
    "docs", default_version= 'v1', public = True), permission_classes= (permissions.AllowAny, ))

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('docs/', schema_view.with_ui()), 
    path('login/', AuthenticationViewSet.as_view({'post': 'login'})),
    path('logout/', AuthenticationViewSet.as_view({'post': 'logout'})),
    path('', include(router.urls))
]
