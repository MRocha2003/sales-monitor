from rest_framework import serializers
from .models import Sale
from apps.users.serializers import UserSerializer


class SaleSerializer(serializers.ModelSerializer):
    seller_detail = UserSerializer(source='seller', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Sale
        fields = [
            'id', 
            'seller',
            'seller_detail',
            'product_name', 
            'quantity', 
            'unit_price', 
            'total_amount', 
            'status',
            'status_display',
            'sale_date', 
            'notes',
        ]
        read_only_fields = [
            'id',
            'seller',
            'seller_detail',
            'total_amount',
            'sale_date',
            'status_display',
        ]

    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a 0")
        return value

    def validate_unit_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value


class SaleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = [
            'product_name',
            'quantity',
            'unit_price',
            'status',
            'notes',
        ]
    
    def validate_product_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("El nombre del producto es requerido")
        return value.strip()
    
    def validate_quantity(self, value):
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a 0")
        return value

    def validate_unit_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value
    
    def validate_status(self, value):
        valid_statuses = ['pendiente', 'completada', 'cancelada']
        if value not in valid_statuses:
            raise serializers.ValidationError(
                f"Estado inválido. Debe ser: {', '.join(valid_statuses)}"
            )
        return value

    def create(self, validated_data):
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        validated_data.pop('seller', None)
        return super().update(instance, validated_data)