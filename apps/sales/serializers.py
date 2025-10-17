from rest_framework import serializers
from .models import Sale
from apps.users.serializers import UserSerializer

class SaleSerializer(serializers.ModelSerializer):
    seller_detail = UserSerializer(source='seller', read_only=True)
    
    class Meta:
        model = Sale
        fields = ['id', 'seller', 'seller_detail', 'product_name', 'quantity', 
                  'unit_price', 'total_amount', 'status', 'sale_date', 'notes']
        read_only_fields = ['id', 'total_amount', 'sale_date']

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
        fields = ['product_name', 'quantity', 'unit_price', 'status', 'notes']

    def create(self, validated_data):
        validated_data['seller'] = self.context['request'].user
        return super().create(validated_data)