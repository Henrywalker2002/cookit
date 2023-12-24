from base.views import CustomModelViewSetBase
from favorite_food.models import FavoriteFood
from favorite_food.serializers import FavoriteFoodSerializer, DeleteFavoriteFoodSerializer, GetFavoriteFoodSerializer
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import action
from base.custom_middleware import get_current_user
from food.models import Food
from food.serializers import FoodSummarySerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class FavoriteFoodModelViewSet(CustomModelViewSetBase):
    
    serializer_class = {'default' : FavoriteFoodSerializer, "list" : GetFavoriteFoodSerializer, "destroy" : DeleteFavoriteFoodSerializer}
    queryset = FavoriteFood.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['food']
    
    def get_queryset(self):
        return super().get_queryset().filter(user = self.request.user)
    
    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        if FavoriteFood.objects.filter(user = request.user.id, food = request.data['food']).exists():
            return Response({'message': 'This food is already in your favorite list'}, status = 400)
        return super().create(request, *args, **kwargs)
      
    @swagger_auto_schema(manual_parameters=[openapi.Parameter('id', openapi.IN_PATH, type=openapi.TYPE_INTEGER, description="food id")],
                         responses={204: 'No Content'})
    def destroy(self, request, *args, **kwargs):
        food_id = kwargs.pop('pk', None)
        if food_id:
            serializer = self.get_serializer(data = {"food" : food_id})
            serializer.is_valid(raise_exception = True)

            FavoriteFood.objects.filter(user_id = request.user.id, food_id = food_id).first().delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
    
    def list(self, request, *args, **kwargs):
        queryset = self.queryset.filter(user = get_current_user()).values_list('food', flat = True).distinct()
        food_lst = Food.objects.filter(id__in = list(queryset))
        
        page = self.paginate_queryset(food_lst)
        if page is not None:
            serializer = FoodSummarySerializer(food_lst, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = FoodSummarySerializer(food_lst, many=True)
        return Response(serializer.data)
    
    @swagger_auto_schema(auto_schema=None)
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    @swagger_auto_schema(auto_schema=None)
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
    
    @swagger_auto_schema(auto_schema=None)
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

        