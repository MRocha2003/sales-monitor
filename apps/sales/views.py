from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg
from django.db.models.functions import TruncDate
from .models import Sale
from .serializers import SaleSerializer, SaleCreateSerializer
from apps.users.permissions import IsSalesOwnerOrAdmin
from apps.activity.models import UserActivity

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.select_related('seller').all()
    serializer_class = SaleSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['status', 'seller']
    search_fields = ['product_name', 'notes']
    ordering_fields = ['sale_date', 'total_amount']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return SaleCreateSerializer
        return SaleSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin' or user.role == 'supervisor':
            return self.queryset
        return self.queryset.filter(seller=user)
    
    def perform_create(self, serializer):
        sale = serializer.save()
        UserActivity.objects.create(
            user=self.request.user,
            action='create_sale',
            description=f'Creó venta de {sale.product_name}'
        )
    
    def perform_update(self, serializer):
        sale = serializer.save()
        UserActivity.objects.create(
            user=self.request.user,
            action='update_sale',
            description=f'Actualizó venta #{sale.id}'
        )
    
    def perform_destroy(self, instance):
        UserActivity.objects.create(
            user=self.request.user,
            action='delete_sale',
            description=f'Eliminó venta #{instance.id}'
        )
        instance.delete()
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        queryset = self.get_queryset()
        
        stats = queryset.aggregate(
            total_sales=Count('id'),
            total_revenue=Sum('total_amount'),
            average_sale=Avg('total_amount'),
            pending_count=Count('id', filter=models.Q(status='pendiente')),
            completed_count=Count('id', filter=models.Q(status='completada')),
            cancelled_count=Count('id', filter=models.Q(status='cancelada')),
        )
        
        return Response(stats)
    
    @action(detail=False, methods=['get'])
    def by_seller(self, request):
        from django.db import models
        
        queryset = self.get_queryset()
        
        by_seller = queryset.values(
            'seller__id', 
            'seller__username',
            'seller__first_name',
            'seller__last_name'
        ).annotate(
            total_sales=Count('id'),
            total_revenue=Sum('total_amount'),
        ).order_by('-total_revenue')
        
        return Response(by_seller)
    
    @action(detail=False, methods=['get'])
    def daily_sales(self, request):
        queryset = self.get_queryset()
        
        daily = queryset.annotate(
            date=TruncDate('sale_date')
        ).values('date').annotate(
            total_sales=Count('id'),
            total_revenue=Sum('total_amount')
        ).order_by('-date')[:30]
        
        return Response(daily)