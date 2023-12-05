from base.models import BaseModel
from django.db import models


class RecentFood(BaseModel):
    food = models.ForeignKey("food.Food", on_delete=models.CASCADE)
    user = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="recent_foods")

    def __str__(self):
        return self.food.name