from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Avg, Q  # ← AGREGADO Q AQUÍ
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
        """
        CORREGIDO: Usar SaleCreateSerializer para CREATE, UPDATE y PARTIAL_UPDATE
        """
        if self.action in ['create', 'update', 'partial_update']:  # ← CORREGIDO
            return SaleCreateSerializer
        return SaleSerializer
    
    def get_queryset(self):
        """Filtrar queryset según el rol del usuario"""
        user = self.request.user
        if user.role == 'admin' or user.role == 'supervisor':
            return self.queryset
        return self.queryset.filter(seller=user)
    
    def perform_create(self, serializer):
        """
        CORREGIDO: Asignar seller al crear venta
        """
        sale = serializer.save(seller=self.request.user)  # ← CORREGIDO
        UserActivity.objects.create(
            user=self.request.user,
            action='create_sale',
            description=f'Creó venta de {sale.product_name}'
        )
    
    def perform_update(self, serializer):
        """Actualizar venta y registrar actividad"""
        sale = serializer.save()
        UserActivity.objects.create(
            user=self.request.user,
            action='update_sale',
            description=f'Actualizó venta #{sale.id}'
        )
    
    def perform_destroy(self, instance):
        """Eliminar venta y registrar actividad"""
        UserActivity.objects.create(
            user=self.request.user,
            action='delete_sale',
            description=f'Eliminó venta #{instance.id}'
        )
        instance.delete()
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """
        CORREGIDO: Mejorado con manejo de errores
        GET /api/sales/statistics/
        """
        try:
            queryset = self.get_queryset()
            
            # Si no hay ventas, retornar valores en 0
            if not queryset.exists():
                return Response({
                    'total_sales': 0,
                    'total_revenue': 0,
                    'average_sale': 0,
                    'pending_count': 0,
                    'completed_count': 0,
                    'cancelled_count': 0,
                }, status=status.HTTP_200_OK)
            
            # Calcular estadísticas usando Q (ya importado arriba)
            stats = queryset.aggregate(
                total_sales=Count('id'),
                total_revenue=Sum('total_amount'),
                average_sale=Avg('total_amount'),
                pending_count=Count('id', filter=Q(status='pendiente')),
                completed_count=Count('id', filter=Q(status='completada')),
                cancelled_count=Count('id', filter=Q(status='cancelada')),
            )
            
            # Asegurar que no hay valores None
            response_data = {
                'total_sales': stats['total_sales'] or 0,
                'total_revenue': float(stats['total_revenue'] or 0),
                'average_sale': float(stats['average_sale'] or 0),
                'pending_count': stats['pending_count'] or 0,
                'completed_count': stats['completed_count'] or 0,
                'cancelled_count': stats['cancelled_count'] or 0,
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error en statistics: {str(e)}")
            import traceback
            traceback.print_exc()
            
            return Response(
                {
                    'error': 'Error al calcular estadísticas',
                    'detail': str(e),
                    'total_sales': 0,
                    'total_revenue': 0,
                    'average_sale': 0,
                    'pending_count': 0,
                    'completed_count': 0,
                    'cancelled_count': 0,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def by_seller(self, request):
        """
        Obtener estadísticas por vendedor
        GET /api/sales/by_seller/
        """
        try:
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
            
            return Response(by_seller, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error en by_seller: {str(e)}")
            return Response(
                {'error': 'Error al obtener ventas por vendedor', 'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def daily_sales(self, request):
        """
        Obtener ventas diarias (últimos 30 días)
        GET /api/sales/daily_sales/
        """
        try:
            queryset = self.get_queryset()
            
            daily = queryset.annotate(
                date=TruncDate('sale_date')
            ).values('date').annotate(
                total_sales=Count('id'),
                total_revenue=Sum('total_amount')
            ).order_by('-date')[:30]
            
            # Convertir a lista para serialización
            daily_list = list(daily)
            
            return Response(daily_list, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error en daily_sales: {str(e)}")
            return Response(
                {'error': 'Error al obtener ventas diarias', 'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def my_sales(self, request):
        """
        Obtener solo las ventas del usuario autenticado
        GET /api/sales/my_sales/
        """
        try:
            sales = Sale.objects.filter(seller=request.user).select_related('seller').order_by('-sale_date')
            serializer = self.get_serializer(sales, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error en my_sales: {str(e)}")
            return Response(
                {'error': 'Error al obtener mis ventas', 'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )