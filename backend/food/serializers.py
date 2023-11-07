from rest_framework import serializers 
from food.models import Food, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Ingredient
        fields = ['id' ,'name' ,'img']
        
class FoodSerializer(serializers.ModelSerializer):
    
    ingredient = serializers.PrimaryKeyRelatedField(many = True, required= False, queryset = Ingredient.objects.all())
    
    class Meta:
        model = Food
        fields = ['id', 'name', 'ingredient', 'description', 'calo', 'how_to_cook']