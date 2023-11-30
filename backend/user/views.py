import uuid
from user.serializers import CreateUserSerializer, LoginSerializer, UserSerializer
from user.models import User, UserGenderChoice, UserAcitivityLevelChoice
from base.views import CustomModelViewSetBase
from django.db import transaction
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import authenticate
from django.contrib.auth import login, logout
from datetime import datetime

class UserViewSet(CustomModelViewSetBase):
    
    serializer_class = {"create" : CreateUserSerializer, "default" : UserSerializer}
    queryset = User.objects.all() 
    
    # def get_object(self):
    #     if self.action == "update" or self.action == "partial_update":
    #         return self.request.user
    #     return super().get_object()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        
        serializer.save()
        user = serializer.instance
        user.set_password(user.password)
        user.save()        
        return Response(data = serializer.data, status = status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object() or request.user
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(instance, data = request.data, partial = partial)
        serializer.is_valid(raise_exception = True)
        
        gender = serializer.validated_data.get('gender') or instance.gender 
        height = serializer.validated_data.get('height') or instance.height
        weight = serializer.validated_data.get('weight') or instance.weight
        activity_level = serializer.validated_data.get('activity_level') or instance.activity_level
        day_of_birth = serializer.validated_data.get('day_of_birth') or instance.day_of_birth
        age = datetime.now().year - day_of_birth.year
        
        if gender and weight and height and activity_level and day_of_birth:
            if gender == UserGenderChoice.MALE:
                brm = 66 + 13.7*weight + 5*height - 6.8*age
            else:
                brm = 655 + 9.6*weight + 1.8*height - 4.7*age 
            activity_index = {UserAcitivityLevelChoice.SEDENTARY : 1.2, UserAcitivityLevelChoice.LIGHTLY_ACTIVE: 1.375,
                              UserAcitivityLevelChoice.MODERATELY_ACTIVE : 1.55, UserAcitivityLevelChoice.VERY_ACTIVE: 1.725,
                              UserAcitivityLevelChoice.EXTREMELY_ACTIVE: 1.9}
            tdee = activity_index.get(activity_level) * brm 
            serializer.validated_data['tdee'] = int(tdee)
        self.perform_update(serializer)
        
        return Response(serializer.data)
    
    @action(methods= ['get'], detail=False, url_path="get_self_information")
    def get_self_information(self, request, *args, **kwargs):
        instance = request.user 
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
class AuthenticationViewSet(viewsets.GenericViewSet):
    serializer_class = {"default": LoginSerializer}
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_class(self):
        if self.action in self.serializer_class.keys():
            return self.serializer_class[self.action]
        return self.serializer_class['default']

    def get_permissions(self):
        if self.action == "logout":
            return [permissions.IsAuthenticated()]
        return super().get_permissions()
    
    @action(methods=['post'], detail=False, url_path="login")
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(
            request, username=serializer.validated_data['email'], password=serializer.validated_data['password'])
        if user:
            if not user.is_active:
                return Response("user is not active", status= status.HTTP_401_UNAUTHORIZED)
            login(request, user)
            user_data = self.get_serializer(user).data 
            return Response(user_data)
        return Response({"messsage" : "wrong username or password"}, status= status.HTTP_401_UNAUTHORIZED)

    @action(methods=['post'], detail=False, url_path="logout")
    def logout(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)