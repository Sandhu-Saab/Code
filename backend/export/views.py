from rest_framework.response import Response
from rest_framework import generics, viewsets, status
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.views import APIView
from assets.models import Asset
from users.models import User,Course
from users.serializers import CourseSerializer
from django.http import HttpResponse
import json

class ExportDataAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = request.data
        filter_type = data["type"]
        section = data["section"]
        status_id = data["status"]
        user = data["user"]
        start_date = data["start_date"]
        end_date = data["end_date"]
        user_obj = User.objects.get(username = user)
        course = Course.objects.get(section = section)
        status = Asset_Status.objects.get(asset_status_id = status_id)
        if filter_type == "Assets":
            assets = Asset.objects.filter(dateAdded__range=[start_date, end_date], 
            assignedTo = user_obj,
            course = course,
            status = status
            )
        elif filter_type == "Incident":
            incidents = Incident.objects.filter(reportDateTime__range=[start_date, end_date], 
            userId = user_obj,
            ticketOwnerSection = course,
            status = status
            )
        elif filter_type == "Problems":
            problems = Problem.objects.filter(reportDateTime__range=[start_date, end_date], 
            userId = user_obj,
            ticketOwnerSection = course,
            status = status
            )
        elif filter_type == "Changes":
            changes = ChangeRequest.objects.filter(requestDateTime__range=[start_date, end_date], 
            assignedTo = user_obj,
            requestOwnerSection = course,
            status = status.asset_status_id
            )
    def post(self, request):
        pass
    
def GetSectionsAPIView(request):

    try:
        courses = Course.objects.all()
        section = []
        for course in courses:
            section.append(course.section)
        print(section)
        abc = json.dumps({"data":section})
        
        return HttpResponse(abc, status=status.HTTP_200_OK)
    except:
        return HttpResponse(json.dumps({"data":"Error"}), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # def post(self, request):
    #     return Response({"Message":"Method not allowed"}, status = status.HTTP_405_METHOD_NOT_ALLOWED)