from base.views import CustomModelViewSetBase
from food.serializers import (
    FoodSerializer,
    IngredientSerializer,
    IntructionStepSerializer,
    NutrientSerializer,
    FoodSummarySerializer,
    FoodFeedbackSerializer,
    CreateFeedbackSerializer,
    FoodSearchByImageSerializer
)
from food.models import Food, FoodFeedback
from rest_framework import status
from rest_framework.response import Response
from django.db import transaction
from recent_food.models import RecentFood
from rest_framework.decorators import action
from django.db import models
from rest_framework import permissions
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from base.custom_middleware import get_current_user
import requests


class FoodModelViewSet(CustomModelViewSetBase):
    serializer_class = {
        "default": FoodSerializer,
        "list": FoodSummarySerializer,
        "get_foods_by_user": FoodSummarySerializer,
        "get_feedbacks": FoodFeedbackSerializer,
        "add_feedbacks": CreateFeedbackSerializer,
        "search_by_image": FoodSearchByImageSerializer,
    }
    queryset = Food.objects.all()
    filterset_fields = ["name", ]
    search_fields = ["name", "ingredients__original"]
    permission_classes = [permissions.AllowAny]

    def help_create(self, data, food_id):
        for item in data:
            item["food"] = food_id
        return data

    @transaction.atomic
    @swagger_auto_schema(auto_schema=None)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ingredients = serializer.validated_data.pop("ingredients")
        instructions = serializer.validated_data.pop("instructions")
        nutrients = serializer.validated_data.pop("nutrients")

        serializer.save()
        food = serializer.instance

        ingredients = self.help_create(ingredients, food.id)
        instructions = self.help_create(instructions, food.id)
        nutrients = self.help_create(nutrients, food.id)

        ingredient_serializer = IngredientSerializer(data=ingredients, many=True)
        ingredient_serializer.is_valid(raise_exception=True)
        ingredient_serializer.save()

        instruction_serializer = IntructionStepSerializer(data=instructions, many=True)
        instruction_serializer.is_valid(raise_exception=True)
        instruction_serializer.save()

        nutrient_serializer = NutrientSerializer(data=nutrients, many=True)
        nutrient_serializer.is_valid(raise_exception=True)
        nutrient_serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(auto_schema=None)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    @swagger_auto_schema(auto_schema=None)
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
    @swagger_auto_schema(auto_schema=None)
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        user = get_current_user()
        if request.user.is_authenticated and instance:
            old_recent_food = RecentFood.objects.filter(
                food=instance, user=request.user
            )
            if old_recent_food:
                old_recent_food.first().delete()
            RecentFood.objects.create(food=instance, user=get_current_user())
        return Response(serializer.data)

    @action(methods=["get"], detail=False, url_path="get_foods_by_user")
    def get_foods_by_user(self, request, *args, **kwargs):
        user = request.user
        recent_foods_instance = RecentFood.objects.filter(user=user).order_by(
            "-created_at"
        )[:5]
        recommended_foods = Food.objects.order_by("?")[:5]

        recent_foods = [recent_food.food for recent_food in recent_foods_instance]

        recent_foods_serializer = self.get_serializer(recent_foods, many=True)
        recommended_foods_serializer = self.get_serializer(recommended_foods, many=True)
        return Response(
            {
                "recent_foods": recent_foods_serializer.data,
                "recommended_foods": recommended_foods_serializer.data,
            }
        )
        
    @action(methods=["get"], detail=True, url_path="get_feedback")
    def get_feedbacks(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data 
        avg_rating = FoodFeedback.objects.filter(food=instance).aggregate(
            models.Avg("rating"))["rating__avg"]
        data["avg_rating"] = avg_rating
        return Response(data)

    @action(methods=["post"], detail=True, url_path="feedback")
    @swagger_auto_schema(request_body = openapi.Schema(
        type= openapi.TYPE_OBJECT,
        properties={
            "rating" : openapi.Schema(type = openapi.TYPE_INTEGER, description = "Rating of the food"),
            "comment" : openapi.Schema(type = openapi.TYPE_STRING, description = "Comment of the food"),
        }
    ))
    @transaction.atomic
    def add_feedbacks(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data
        data["user"] = request.user.id
        data["food"] = instance.id
        old_instance = FoodFeedback.objects.filter(
            user=request.user, food=instance
        )
        if old_instance:
            old_instance.first().delete()
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        avg_rating = FoodFeedback.objects.filter(food=instance).aggregate(
            models.Avg("rating"))["rating__avg"]
        instance.avg_rating = avg_rating
        instance.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @staticmethod
    def remove_image(image_name):
        default_storage.delete(image_name)

    @action(methods=["post"], detail= False, url_path="search-by-image")
    def search_by_image(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        image = serializer.validated_data['image']
        default_storage.save(image.name, ContentFile(image.read()))
        try:
            res = requests.get("http://127.0.0.1:5000/predict", params= {"image_name" : image.name})
        except Exception as e:
            self.remove_image(image.name)
            return Response({"message" : "Something went wrong with server, please try again"}, status = status.HTTP_400_BAD_REQUEST)
        if res.status_code == 200 and len(res.json()['ingredient']) != 0:
            data = res.json()
            key_word = " ".join(data['ingredient'])
            foods = Food.objects.filter(ingredients__original__icontains = key_word).distinct()
            page = self.paginate_queryset(foods)
            if page is not None:
                serializer = FoodSummarySerializer(page, many = True)
                self.remove_image(image.name)
                return self.get_paginated_response(serializer.data)
            self.remove_image(image.name)
            return Response(FoodSummarySerializer(foods, many = True).data, status = status.HTTP_200_OK)
        self.remove_image(image.name)
        return Response({"message" : "Can not detect any object"}, status = status.HTTP_400_BAD_REQUEST)