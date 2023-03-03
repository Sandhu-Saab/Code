from email.policy import default
from enum import unique
from pickle import EMPTY_DICT
from pyexpat import model
from statistics import mode
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

#from symbol import term

# Create your models here.


class SecurityGroup(models.Model):
    securityGroupId = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)


class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    roleId = models.IntegerField(unique=True)
    name = models.CharField(max_length=100, unique=True)


class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    term = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=False, auto_now_add=True)


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=200, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    approved = models.BooleanField(default=False)
    role = models.ForeignKey(Role, to_field='roleId', related_name='role', null=True,
                             on_delete=models.SET_NULL)
    course_id = models.ForeignKey(
        Course, related_name='course_id', null=True, on_delete=models.SET_NULL)
    security_group = models.ManyToManyField(SecurityGroup, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password']

    def __str__(self):
        return self.username
