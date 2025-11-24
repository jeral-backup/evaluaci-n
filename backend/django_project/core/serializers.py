from rest_framework import serializers
from .models import Vehicle, Maintenance


class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = ['id', 'vehicle', 'performed_at', 'description', 'cost']


class VehicleSerializer(serializers.ModelSerializer):
    maintenances = MaintenanceSerializer(many=True, read_only=True)

    class Meta:
        model = Vehicle
        fields = ['id', 'plate', 'type', 'model', 'notes', 'maintenances']
