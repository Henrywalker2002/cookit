from base.views import CustomModelViewSetBase
from food.serializers import FoodSerializer, IngredientSerializer
from food.models import Food, Ingredient

class FoodModelViewSet(CustomModelViewSetBase):
    
    serializer_class = {'default' : FoodSerializer}
    queryset = Food.objects.all()
    filterset_fields = ['name']
    search_fields = ['name']
    

class IngredientModelViewSet(CustomModelViewSetBase):
    serializer_class = {'default' : IngredientSerializer}
    queryset = Ingredient.objects.all()
    
    filterset_fields = ['name']
    search_fields = ['name']