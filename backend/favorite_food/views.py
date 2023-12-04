from base.views import CustomModelViewSetBase
from favorite_food.models import FavoriteFood
from favorite_food.serializers import FavoriteFoodSerializer, DeleteFavoriteFoodSerializer
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import action

class FavoriteFoodModelViewSet(CustomModelViewSetBase):
    
    serializer_class = {'default' : FavoriteFoodSerializer, "destroy" : DeleteFavoriteFoodSerializer}
    queryset = FavoriteFood.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['user', 'food']
    
    def get_queryset(self):
        return super().get_queryset().filter(user = self.request.user)
    
    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        if FavoriteFood.objects.filter(user = request.user.id, food = request.data['food']).exists():
            return Response({'message': 'This food is already in your favorite list'}, status = 400)
        return super().create(request, *args, **kwargs)
    

    def destroy(self, request, *args, **kwargs):
        food_id = kwargs.pop('pk', None)
        if food_id:
            serializer = self.get_serializer(data = {"food" : food_id})
            serializer.is_valid(raise_exception = True)

            FavoriteFood.objects.filter(user_id = request.user.id, food_id = food_id).first().delete()
        return Response(status= status.HTTP_204_NO_CONTENT)
        