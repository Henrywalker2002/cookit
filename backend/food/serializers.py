from rest_framework import serializers
from food.models import Food, Ingredient, IntructionStep, Nutrient, FoodFeedback
from user.serializers import UserSummarySerializer
from user.models import User

class IngredientSerializer(serializers.ModelSerializer):
    food = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(), required=False
    )

    class Meta:
        model = Ingredient
        fields = ["original", "food"]


class IntructionStepSerializer(serializers.ModelSerializer):
    food = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(), required=False
    )

    class Meta:
        model = IntructionStep
        fields = ["number", "step", "food"]


class NutrientSerializer(serializers.ModelSerializer):
    food = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(), required=False
    )

    class Meta:
        model = Nutrient
        fields = ["name", "amount", "unit", "percentOfDailyNeeds", "food"]


class FoodSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = IntructionStepSerializer(many=True)
    nutrients = NutrientSerializer(many=True)
    
    class Meta:
        model = Food
        fields = ["id", "name", "description", "image", "ingredients", "instructions", "nutrients", "calories", "time_taken", "avg_rating"]


class FoodSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ["id", "name", "description", "image", "time_taken", "avg_rating"]
        
        
class FeedbackSerializer(serializers.ModelSerializer):
    user = UserSummarySerializer(read_only=True)
    
    class Meta:
        model = FoodFeedback
        fields = ['id', 'created_at', 'user', 'rating', 'comment']
        
class CreateFeedbackSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False
    )
    food = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(), required=False
    )
    
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be in range 1-5")
        return value
    
    class Meta:
        model = FoodFeedback
        fields = ['user', 'food', 'rating', 'comment']
    
class FoodFeedbackSerializer(serializers.ModelSerializer):
    feedbacks = FeedbackSerializer(many=True)
    
    class Meta:
        model = Food
        fields = ["feedbacks"]