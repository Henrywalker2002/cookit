from rest_framework import permissions
from user.models import UserTypeChoice


class UserPermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if view.action == "create_admin":
            return request.user.is_authenticated and request.user.role == UserTypeChoice.ADMIN
        return True
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.user.role == UserTypeChoice.ADMIN:
            return True
        return obj == request.user