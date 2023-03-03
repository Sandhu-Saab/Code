from django.db import models
import uuid


class Priority(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    priority_id = models.IntegerField(unique=True)
    priority_name = models.CharField(max_length=100)


class Status(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    status_id = models.IntegerField(unique=True)
    status_name = models.CharField(max_length=100, unique=True)
# Create your models here.
