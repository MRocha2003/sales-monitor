from rest_framework import serializers
from .models import UserActivity
from apps.users.serializers import UserSerializer

class UserActivitySerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)
    action_display = serializers.CharField(source='get_action_display', read_only=True)
    
    class Meta:
        model = UserActivity
        fields = ['id', 'user', 'user_detail', 'action', 'action_display', 
                  'description', 'ip_address', 'user_agent', 'timestamp']
        read_only_fields = ['id', 'timestamp']