from base.views import CustomModelViewSetBase
from favorite_food.models import FavoriteFood
from favorite_food.serializers import FavoriteFoodSerializer

class FavoriteFoodModelViewSet(CustomModelViewSetBase):
    
    serializer_class = {'default' : FavoriteFood}
    queryset = FavoriteFood.objects.all()
    
    filterset_fields = ['user', 'food']