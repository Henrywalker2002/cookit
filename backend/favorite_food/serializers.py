from rest_framework import serializers
from favorite_food.models import FavoriteFood
from user.models import User 
from food.models import Food

class FavoriteFoodSerializer(serializers.ModelSerializer):
    
    user = serializers.PrimaryKeyRelatedField(queryset = User.objects.all())
    food = serializers.PrimaryKeyRelatedField(queryset = Food.objects.all())
    
    class Meta: 
        model = FavoriteFood
        fields =['user', 'food']