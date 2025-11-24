from django.urls import path, include
from rest_framework import routers
from .views import VehicleViewSet, MaintenanceViewSet, login_view, register_view, logout_view, me_view

router = routers.DefaultRouter()
router.register(r'vehicles', VehicleViewSet)
router.register(r'maintenances', MaintenanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login_view),
    path('auth/register/', register_view),
    path('auth/logout/', logout_view),
    path('auth/me/', me_view),
]
