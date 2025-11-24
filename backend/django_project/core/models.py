from django.db import models


class Vehicle(models.Model):
    plate = models.CharField(max_length=64, unique=True)
    type = models.CharField(max_length=64)
    model = models.CharField(max_length=128, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.plate} ({self.type})"


class Maintenance(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='maintenances')
    performed_at = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"Maintenance {self.id} - {self.vehicle.plate}"
