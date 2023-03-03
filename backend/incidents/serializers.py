from ast import Import
from .models import Incident, TicketType
from users.models import User
from rest_framework import serializers


class DynamicFieldsCategorySerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class IncidentSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = Incident
        fields = '__all__'


class TicketTypeSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = TicketType
        fields = '__all__'


class IncidentDataGridSerializer(serializers.Serializer):
    """Faster Datagrid specific serializer, can be used in a lot of places to speed up load times
        Can't post, patch or delete currently though and only has fields related to datagrid"""
    id = serializers.UUIDField()
    userId = serializers.CharField()
    status = serializers.CharField(source='status.status_name', default=None)
    ticketNumber = serializers.IntegerField()
    reportDateTime = serializers.DateTimeField()
    priority = serializers.CharField(
        source='priority.priority_name', default=None)
    subject = serializers.CharField()
    assignedTechId = serializers.CharField()
    ticketOwnerId = serializers.CharField()
