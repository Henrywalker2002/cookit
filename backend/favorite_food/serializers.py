from rest_framework import serializers
from favorite_food.models import FavoriteFood
from food.models import Food
from food.serializers import FoodSummarySerializer

class FavoriteFoodSerializer(serializers.ModelSerializer):
    
    user = serializers.PrimaryKeyRelatedField(read_only = True)
    food = serializers.PrimaryKeyRelatedField(queryset = Food.objects.all())
    
    def validate(self, attrs):
        self.context['user'] = self.context['request'].user
        if FavoriteFood.objects.filter(user = self.context['user'], food = attrs['food']).exists():
            raise serializers.ValidationError({'message': 'This food is already in your favorite list'})
        return attrs
    
    class Meta: 
        model = FavoriteFood
        fields =['user', 'food']
        

class GetFavoriteFoodSerializer(serializers.ModelSerializer):
    food = FoodSummarySerializer(read_only = True, many = True)
    
    class Meta:
        model = FavoriteFood
        fields = ['food']
        
class DeleteFavoriteFoodSerializer(serializers.ModelSerializer):
    
    user = serializers.PrimaryKeyRelatedField(read_only = True)
    food = serializers.PrimaryKeyRelatedField(queryset = Food.objects.all(), required = False)
    
    def validate(self, attrs):
        self.context['user'] = self.context['request'].user
        if not FavoriteFood.objects.filter(user = self.context['user'], food = attrs['food']).exists():
            raise serializers.ValidationError({'message': 'This food is not in your favorite list'})
        return attrs
    
    class Meta: 
        model = FavoriteFood
        fields =['user', 'food']