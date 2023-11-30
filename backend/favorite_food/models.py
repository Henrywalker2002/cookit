from django.db import models
from user.models import User 
from food.models import Food
from base.models import BaseModel
from base.custom_middleware import get_current_user

class FavoriteFood(BaseModel):
    user = models.ForeignKey(User, on_delete= models.CASCADE, related_name= 'favorite_foods', default=get_current_user)
    food = models.ForeignKey(Food, on_delete= models.CASCADE)
    
    class Meta:
        unique_together = ['user', 'food']