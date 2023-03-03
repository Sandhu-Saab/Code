from django.db import models
import uuid
from assets.models import Asset
from priority.models import Priority, Status
from users.models import User, Course
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class BusinessJustification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False)
    purpose = models.CharField(max_length=100)
    need = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)
    accessibility = models.CharField(max_length=100)


class RiskAssesment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    doc_config = models.CharField(max_length=100)
    enviroment = models.CharField(max_length=100)
    redundancy = models.CharField(max_length=100)
    enviroment_maturity = models.CharField(max_length=100)
    time_to_implement = models.CharField(max_length=100)
    change_history = models.CharField(max_length=100)
    deployment_window = models.CharField(max_length=100)
    num_of_staff = models.CharField(max_length=100)
    testing = models.CharField(max_length=100)
    backout_plan = models.CharField(max_length=100)
    scheduling = models.CharField(max_length=100)


class InstallPlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField(max_length=300)


class BackoutPlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField(max_length=300)

# Currently Unused field


class CommunicationPlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.TextField(max_length=300)


class Approvals(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class ChangeRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    requestNumber = models.IntegerField(default = 1)
    status = models.IntegerField(default=1)
    requestType = models.CharField(max_length=100)
    requestDateTime = models.DateTimeField(auto_now=False, auto_now_add=False)
    requestName = models.CharField(max_length=100)
    projectName = models.CharField(max_length=100)
    assignedTo = models.ForeignKey(
        User, related_name='assignedToId', null=True, on_delete=models.SET_NULL)
    ownerId = models.ForeignKey(
        User, related_name='ownerId', null=True, on_delete=models.SET_NULL)
    requestOwnerSection = models.ForeignKey(
        Course, related_name='courseId', null=True, on_delete=models.SET_NULL)
    department = models.CharField(max_length=100)
    requestedById = models.ForeignKey(
        User, related_name='requestedId', null=True, on_delete=models.SET_NULL)
    requestContact = models.CharField(max_length=100)
    impact = models.ForeignKey(
        Priority, to_field='priority_id', related_name='changeimpact_id', null=True, on_delete=models.SET_NULL)
    urgency = models.ForeignKey(
        Priority, to_field='priority_id', related_name='changeurgency_id', null=True, on_delete=models.SET_NULL)
    priority = models.ForeignKey(
        Priority, to_field='priority_id', related_name='changepriority_id', null=True, on_delete=models.SET_NULL)
    description = models.TextField(max_length=300)
    isActive = models.BooleanField(default=True)
    assets = ArrayField(models.CharField(null=True, max_length=100), null=True)
    business_justification = models.ForeignKey(
        BusinessJustification, related_name='businessjustificationId', null=True, on_delete=models.SET_NULL)
    install_plan = models.ForeignKey(
        InstallPlan, related_name='installplan', null=True, on_delete=models.SET_NULL)
    backout_plan = models.ForeignKey(
        BackoutPlan, related_name='backoutplan', null=True, on_delete=models.SET_NULL)
    risk_assesment = models.ForeignKey(
        RiskAssesment, related_name='riskAssesment', null=True, on_delete=models.SET_NULL)
    communication_plan = models.ForeignKey(
        CommunicationPlan, related_name='communicationPlan', null=True, on_delete=models.SET_NULL)
    approvals = models.ForeignKey(
        Approvals, related_name='approvals', null=True, on_delete=models.SET_NULL)
