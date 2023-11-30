import uuid 
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser 


class UserGenderChoice(models.TextChoices):
    MALE = "MALE", "NAME"
    FENAME = "FENAME", "FENAME"
    

class UserAcitivityLevelChoice(models.TextChoices):
    SEDENTARY = "SEDENTARY", "SEDENTARY"
    LIGHTLY_ACTIVE = "LIGHTLY_ACTIVE", "LIGHTLY_ACTIVE"
    MODERATELY_ACTIVE = "MODERATELY_ACTIVE", "MODERATELY_ACTIVE"
    VERY_ACTIVE = "VERY_ACTIVE", "VERY_ACTIVE"
    EXTREMELY_ACTIVE = "EXTREMELY_ACTIVE", "EXTREMELY_ACTIVE"

class User(AbstractBaseUser):
    id = models.UUIDField(primary_key= True, default= uuid.uuid4, editable= False)
    email = models.EmailField(unique=True, max_length=128)
    password = models.CharField(max_length=128, null=False)
    full_name = models.CharField(max_length=128, null=False)
    is_active = models.BooleanField(default=True)
    
    gender = models.CharField(max_length=128, choices=UserGenderChoice.choices, null= True)
    day_of_birth = models.DateField(null= True)
    height = models.IntegerField(null= True)
    weight = models.IntegerField(null= True)
    activity_level = models.CharField(null= True, max_length=128, choices=UserAcitivityLevelChoice.choices)
    tdee = models.IntegerField(null= True)
    
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    objects = BaseUserManager()
    
    USERNAME_FIELD = 'email'
    
    def __str__(self):
        return self.email
    

