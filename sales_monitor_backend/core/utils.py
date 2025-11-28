from functools import wraps
from apps.activity.models import UserActivity

def log_activity(action, description_template):
    """Decorador para registrar actividad automáticamente"""
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(self, request, *args, **kwargs):
            response = view_func(self, request, *args, **kwargs)
            
            if request.user.is_authenticated:
                description = description_template.format(
                    user=request.user.username,
                    **kwargs
                )
                UserActivity.objects.create(
                    user=request.user,
                    action=action,
                    description=description
                )
            
            return response
        return wrapper
    return decorator