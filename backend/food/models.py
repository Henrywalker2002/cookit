from base.models import BaseModel 
from django.db import models


class Food(BaseModel):
    name = models.CharField(max_length= 128, unique= True)
    description = models.TextField() 
    image = models.CharField(max_length= 128)
    time_taken = models.IntegerField()
    avg_rating = models.FloatField(default= 5)
    calories = models.IntegerField(default= 500)
    
    def __str__(self):
        return self.name
    

class IntructionStep(BaseModel):
    number = models.IntegerField()
    step = models.TextField()
    food = models.ForeignKey(Food, on_delete= models.CASCADE, related_name= 'instructions')


class Ingredient(BaseModel):
    original = models.CharField(max_length= 128)
    food = models.ForeignKey(Food, on_delete= models.CASCADE, related_name= 'ingredients')


class Nutrient(BaseModel):
    name = models.CharField(max_length= 128)
    amount = models.FloatField()
    unit = models.CharField(max_length= 128)
    percentOfDailyNeeds = models.FloatField()
    food = models.ForeignKey(Food, on_delete= models.CASCADE, related_name= 'nutrients')
    

class FoodFeedback(BaseModel):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="food_feedbacks")
    food = models.ForeignKey(Food, on_delete= models.CASCADE, related_name= 'feedbacks')
    rating = models.IntegerField(default= 5)
    comment = models.TextField()
    
    def __str__(self):
        return self.food.name + " - " + self.user.full_name