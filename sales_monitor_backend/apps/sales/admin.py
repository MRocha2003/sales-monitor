from django.contrib import admin
from .models import Sale

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['id', 'product_name', 'seller', 'quantity', 'total_amount', 'status', 'sale_date']
    list_filter = ['status', 'sale_date', 'seller']
    search_fields = ['product_name', 'notes']
    readonly_fields = ['total_amount', 'sale_date']
    date_hierarchy = 'sale_date'
    
    fieldsets = (
        ('Información de Venta', {
            'fields': ('seller', 'product_name', 'quantity', 'unit_price', 'total_amount')
        }),
        ('Estado y Notas', {
            'fields': ('status', 'notes')
        }),
        ('Fecha', {
            'fields': ('sale_date',)
        }),
    )