from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('vendedor', 'Vendedor'),
        ('supervisor', 'Supervisor'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='vendedor')
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_active_seller = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"{self.username} - {self.get_role_display()}"