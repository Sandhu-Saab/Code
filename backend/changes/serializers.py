from .models import BusinessJustification, RiskAssesment, InstallPlan, BackoutPlan, CommunicationPlan, Approvals, ChangeRequest
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

class RequestSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = ChangeRequest
        fields = '__all__'

class BusinessJustificationSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = BusinessJustification
        fields = '__all__'

class RiskAssesmentSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = RiskAssesment
        fields = '__all__'

class InstallPlanSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = InstallPlan
        fields = '__all__'

class BackoutPlanSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = BackoutPlan
        fields = '__all__'

class CommunicationPlanSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = CommunicationPlan
        fields = '__all__'

class ApprovalsSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = Approvals
        fields = '__all__'