import uuid
from django.db import models
from user.models import User
from base.custom_middleware import get_current_user

class BaseModel(models.Model):
    """
    BaseModel contains id, created_at, modified_at, created_by, updated_by
    """

    id = models.AutoField(primary_key= True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="%(class)s_created_by", default= get_current_user, null = True)
    updated_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="%(class)s_updated_by", null= True)

    class Meta: 
        abstract = True
    
    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self.modified_at:
            self.updated_by = get_current_user()
        return super().save(force_insert, force_update, using, update_fields)