from base.models import BaseModel 
from django.db import models

class Ingredient(BaseModel):
    
    id = models.AutoField(primary_key= True)
    name = models.CharField(max_length=128, unique= True)
    img = models.CharField()
    
    def __str__(self):
        return self.name

class Food(BaseModel):
    id = models.AutoField(primary_key= True)
    name = models.CharField(max_length= 128, unique= True)
    ingredient = models.ManyToManyField(Ingredient)
    description = models.CharField() 
    calo = models.IntegerField()
    how_to_cook = models.TextField()
    
    def __str__(self):
        return self.name
    