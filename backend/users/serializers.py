from .models import User, Course, Role, SecurityGroup
from rest_framework import serializers
from incidents.serializers import DynamicFieldsCategorySerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password


class UserSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = User
        fields = '__all__'

    def validate_password(self, value: str) -> str:
        """Hashed user password"""
        # """
        # Hash value passed by user.

        # :param value: password of a user
        # :return: a hashed version of the password
        # """
        return make_password(value)

class EmailRequestSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ['email']

# This serializer is much faster than the dynamic one
class UserFastSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    username = serializers.CharField(max_length=200, required=True)
    first_name = serializers.CharField(max_length=100, required=True)
    last_name = serializers.CharField(max_length=100, required=True)
    password = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(max_length=100, required=True)
    approved = serializers.BooleanField(default=False)
    role_id = serializers.IntegerField()
    course_id_id = serializers.UUIDField()
    last_login = serializers.DateTimeField()
    date_joined = serializers.DateTimeField()
    is_staff = serializers.BooleanField()
    is_active = serializers.BooleanField()
    is_superuser = serializers.BooleanField()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RoleSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = Role
        fields = '__all__'


class CourseSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = Course
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """JWT Token"""
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # You can manually put what to include inside the token when the user logged in
        token['course'] = str(user.course_id_id)
        token['role'] = user.role_id
        token['username'] = user.username
        # token['first_name'] = user.first_name
        # if(user.security_group.all() != None):
        #     token['security_group'] = str(
        #         user.security_group.get())
        return token


class SecurityGroupSerializer(DynamicFieldsCategorySerializer):
    class Meta:
        model = SecurityGroup
        fields = '__all__'
