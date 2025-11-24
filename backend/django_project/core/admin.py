from django.contrib import admin
from .models import Vehicle, Maintenance

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('id', 'plate', 'type', 'model')


@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'vehicle', 'performed_at', 'cost')
