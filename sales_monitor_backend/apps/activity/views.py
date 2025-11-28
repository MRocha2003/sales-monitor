from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.db.models.functions import TruncDate
from .models import UserActivity
from .serializers import UserActivitySerializer
from apps.users.permissions import IsAdminUser

class UserActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserActivity.objects.select_related('user').all()
    serializer_class = UserActivitySerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['action', 'user']
    search_fields = ['description']
    ordering_fields = ['timestamp']
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin' or user.role == 'supervisor':
            return self.queryset
        return self.queryset.filter(user=user)
    
    @action(detail=False, methods=['get'])
    def my_activity(self, request):
        activities = UserActivity.objects.filter(user=request.user)[:50]
        serializer = self.get_serializer(activities, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def statistics(self, request):
        stats = UserActivity.objects.aggregate(
            total_activities=Count('id'),
            login_count=Count('id', filter=models.Q(action='login')),
            logout_count=Count('id', filter=models.Q(action='logout')),
            sale_actions=Count('id', filter=models.Q(
                action__in=['create_sale', 'update_sale', 'delete_sale']
            )),
        )
        return Response(stats)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAdminUser])
    def daily_activity(self, request):
        daily = UserActivity.objects.annotate(
            date=TruncDate('timestamp')
        ).values('date').annotate(
            total_actions=Count('id')
        ).order_by('-date')[:30]
        
        return Response(daily)