from .models import Asset, License, Asset_Status
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

class AssetSerializer(DynamicFieldsCategorySerializer): 
    class Meta: 
        model = Asset
        fields = '__all__'

class LicenseSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = License
        fields = '__all__'

class AssetStatusSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = Asset_Status
        fields = '__all__'
