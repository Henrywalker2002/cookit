from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    tdee = serializers.IntegerField(required = False)
    
    def validate_height(self, value):
        if value < 0:
            raise serializers.ValidationError("Height must be greater than 0")
        return value
    
    def validate_weight(self, value):
        if value < 0:
            raise serializers.ValidationError("Weight must be greater than 0")
        return value
    
    class Meta:
        model = User
        fields = ["id", "email", "full_name", "gender", "day_of_birth", 
                  "height", "weight", "activity_level", "tdee", "avatar"]

class CreateUserSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only= True)
    
    class Meta: 
        model = User 
        fields = ['password', 'email' , 'full_name']


class UserSummarySerializer(serializers.ModelSerializer):
        
        class Meta:
            model = User
            fields = ["id", "full_name", "avatar"]
        
class LoginSerializer(serializers.Serializer):
    
    email = serializers.EmailField(max_length = 128)
    full_name = serializers.CharField(read_only = True)
    password = serializers.CharField(max_length=128, write_only=True)
    avatar = serializers.ImageField(read_only = True)
    
    
