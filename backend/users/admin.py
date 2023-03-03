from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import UserAdmin

# Register your models here.

class UsersAdmin(BaseUserAdmin):
    list_display = ('userId', 'username', 'password', 'role', 'email',
            'first_name', 'last_name', 'department', 'phone', 'section')
    admin.site.register(User, UserAdmin)
