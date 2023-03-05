from django.urls import path, include
from export import views

urlpatterns = [
    path('api/get-sections/', views.GetSectionsAPIView, name="getSections"),
]