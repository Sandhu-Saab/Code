from email.policy import default
from random import choices
from django.db import models
from users.models import User, Role, Course, SecurityGroup
from problems.models import Problem
from priority.models import Priority, Status
import uuid
# Create your models here.


class TicketType(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    category = models.CharField(max_length=100)
    type = models.CharField(max_length=100)


class Incident(models.Model):
    def ids():
        no = Incident.objects.count()
        if no == None:
            return 1
        else:
            return no + 1
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    userId = models.ForeignKey(
        User, related_name='userincidentId', null=True, on_delete=models.SET_NULL)
    status = models.ForeignKey(
        Status, to_field='status_id', null=True, on_delete=models.SET_NULL)
    ticketNumber = models.IntegerField(default=ids, unique=True)
    reportDateTime = models.DateTimeField(auto_now=False, auto_now_add=False)
    multipleAffectedUser = models.BooleanField()
    affectedUserSize = models.IntegerField()
    impact = models.ForeignKey(
        Priority, to_field='priority_id', related_name='incidentimpact_id', null=True, on_delete=models.SET_NULL)
    urgency = models.ForeignKey(
        Priority, to_field='priority_id', related_name='incidenturgency_id', null=True, on_delete=models.SET_NULL)
    priority = models.ForeignKey(
        Priority, to_field='priority_id', related_name='incidentpriority_id', null=True, on_delete=models.SET_NULL)
    ticketOwnerId = models.ForeignKey(
        User, related_name='IncidentTicketOwner', null=True, on_delete=models.SET_NULL)
    ticketDateTime = models.DateTimeField(
        auto_now=False, auto_now_add=True, editable=False)
    assignedTechId = models.ForeignKey(
        User, related_name='assignedIncidentTech', null=True, on_delete=models.SET_NULL)
    ticketType = models.ForeignKey(
        TicketType, related_name='incidentTicketType', null=True, on_delete=models.SET_NULL)
    subject = models.CharField(max_length=100)
    details = models.TextField()
    ticketOwnerSection = models.ForeignKey(
        Course, related_name='incidentTicketCourse', null=True, on_delete=models.SET_NULL)
    ticketOwnerRole = models.ForeignKey(
        Role, to_field='roleId', related_name='IncidentTicketrole', null=True, on_delete=models.SET_NULL)
    problemsRelated = models.ForeignKey(
        Problem, related_name="relatedItems", null=True, on_delete=models.SET_NULL)
    isAssigned = models.BooleanField(default=False)
    security_group = models.ForeignKey(
        SecurityGroup, related_name='secGroup', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return str(self.id)
