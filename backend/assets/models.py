from django.db import models
from users.models import User, Course
from priority.models import Status
import uuid
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class License(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    vendor_name = models.CharField(max_length=100)
    product_name = models.CharField(max_length=100)
    current_version = models.CharField(max_length=100)
    license_name = models.CharField(max_length=100)
    license_type = models.CharField(max_length=100)
    vendor_support = models.BooleanField()
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    license_cost = models.IntegerField()

class Asset_Status(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    asset_status_id = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=100)

class Asset(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    asset_number = models.IntegerField()
    serial_number = models.CharField(max_length=100)
    asset_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    ip_address = models.CharField(max_length=100)
    license_id = models.ForeignKey(
        License, related_name="licenseId", null=True, on_delete=models.SET_NULL)
    asset_dependencies = ArrayField(models.CharField(max_length=100), default=["0"])
    user_id = models.ForeignKey(
        User, related_name='userAssetId', null=True, on_delete=models.SET_NULL)
    status = models.ForeignKey(
        Asset_Status, to_field='asset_status_id', null=True, on_delete=models.SET_NULL)
    location = models.CharField(max_length=100)
    asset_resources = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    dateAdded = models.DateTimeField(auto_now=False, auto_now_add=True, null=True)
    course = models.ForeignKey(
        Course, related_name='AssetCourse', null=True, on_delete=models.SET_NULL)
    assignedTo = models.ForeignKey(
        User, related_name='assignedUserId', null=True, on_delete=models.SET_NULL)
    createdBy = models.ForeignKey(
        User, related_name='createdById',null=True, on_delete=models.SET_NULL)
