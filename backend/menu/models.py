from base.models import BaseModel
from django.db import models
from datetime import datetime
from food.models import Food

class TypeMenu(models.TextChoices):
    BREAKFAST = 'BREAKFAST', 'BREAKFAST'
    LUNCH = "LUNCH", "LUNCH"
    DINNER = "DINNER", "DINNER"

class Menu(BaseModel):
    
    id = models.AutoField(primary_key= True)
    type = models.CharField(choices=TypeMenu.Choices)
    date = models.DateField(default= datetime.now)
    food = models.ManyToManyField(Food, on_delete = models.CASCADE)
    
    