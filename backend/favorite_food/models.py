from django.db import models
from user.models import User 
from food.models import Food
from base.models import BaseModel

class FavoriteFood(BaseModel):
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    food = models.ForeignKey(Food, on_delete= models.CASCADE)