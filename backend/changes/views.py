from django.shortcuts import render
from .models import BusinessJustification, RiskAssesment, InstallPlan, BackoutPlan, CommunicationPlan, Approvals, ChangeRequest
from .serializers import RequestSerializer, BusinessJustificationSerializer, RiskAssesmentSerializer, InstallPlanSerializer, BackoutPlanSerializer, CommunicationPlanSerializer, ApprovalsSerializer
from rest_framework import generics, viewsets, status, permissions
from django.shortcuts import get_object_or_404
from core.permissions import AdminOrReadOnly, AuthorOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from django.db.models import Q


class BusinessJustificationViewSet(viewsets.ModelViewSet):
    """Business Justification View
    Allows for GET, POST, DELETE and PATCH
    Unfiltered as there's no way to directly access it
    """
    queryset = BusinessJustification.objects.all()
    serializer_class = BusinessJustificationSerializer
    permission_classes = [permissions.IsAuthenticated]

class RiskAssesmentViewSet(viewsets.ModelViewSet):
    """Risk Assessment View
    Allows for GET, POST, DELETE and PATCH
    Unfiltered as there's no way to directly access it
    """
    queryset = RiskAssesment.objects.all()
    serializer_class = RiskAssesmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class InstallPlanViewSet(viewsets.ModelViewSet):
    """Install Plan View
    Allows for GET, POST, DELETE and PATCH
    Unfiltered as there's no way to directly access it
    """
    queryset = InstallPlan.objects.all()
    serializer_class = InstallPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

class BackoutPlanViewSet(viewsets.ModelViewSet):
    """Backout Plan View
    Allows for GET, POST, DELETE and PATCH
    Unfiltered as there's no way to directly access it
    """
    queryset = BackoutPlan.objects.all()
    serializer_class = BackoutPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

class CommunicationPlanViewSet(viewsets.ModelViewSet):
    """Communication Plan View
    Allows for GET, POST, DELETE and PATCH
    Unfiltered as there's no way to directly access it
    """
    queryset = CommunicationPlan.objects.all()
    serializer_class = CommunicationPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

class ApprovalsViewSet(viewsets.ModelViewSet):
    """Approvals View
    Allows for GET, POST, DELETE and PATCH
    """
    queryset = Approvals.objects.all()
    serializer_class = ApprovalsSerializer
    permission_classes = [permissions.IsAuthenticated]

class RequestViewSet(viewsets.ModelViewSet):
    """Unfiltered Request View
    Allows for GET, POST, DELETE and PATCH
    Unfiltered, so used primarily for POSTing and PATCHing
    """
    queryset = ChangeRequest.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [permissions.IsAuthenticated]

class RequestAPIViewSet(APIView):
    """Filtered Single Request View
    Allows for GET
    Receives a request ID then determines if the current user is allowed to see it
    """
    serializer_class = RequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        requestId = request.query_params['requestId']
        user = request.user

        if(requestId != None):
            incData = ChangeRequest.objects.get(id=requestId)
            serializer = RequestSerializer(incData)

            if(user.role_id == 1):
                return Response(serializer.data)
            elif(user.role_id == 2):
                return Response(serializer.data)
            elif(user.role_id == 3):
                if(incData.assignedTo_id == user.id or incData.requestedById_id == user.id or incData.ownerId_id == user.id or incData.requestOwnerSection_id == user.course_id_id or incData.requestOwnerSection_id == None):
                    return Response(serializer.data)
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
            elif(user.role_id == 4):
                if(incData.assignedTo_id == user.id or incData.requestedById_id == user.id or incData.ownerId_id == user.id):
                    return Response(serializer.data)
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

class RequestAPIView(APIView):
    """Filtered Request View
    Allows for GET
    Filters Requests based on the current user's role
    Used primarily for the Request Datagrid
    """
    serializer_class = RequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        user = request.user
        if(user.role_id == 1):
            incData = ChangeRequest.objects.all()
            serializer = self.serializer_class(incData, many=True)
            return Response(serializer.data)
        elif(user.role_id == 2):
            incData = ChangeRequest.objects.all()
            serializer = self.serializer_class(incData, many=True)
            return Response(serializer.data)
        elif(user.role_id == 3):
            incData = ChangeRequest.objects.filter(
                Q(ownerId = request.user.id) | Q(assignedTo = request.user.id) | Q(requestedById = request.user.id) | Q(requestOwnerSection = request.user.course_id_id) | Q(requestOwnerSection = None)
            )
            serializer = self.serializer_class(incData, many=True)
            return Response(serializer.data)
        elif(user.role_id == 4):
            incData = ChangeRequest.objects.filter(
                Q(ownerId = request.user.id) | Q(assignedTo = request.user.id) | Q(requestedById = request.user.id)
            )
            serializer = self.serializer_class(incData, many=True)
            return Response(serializer.data)
        else:
            response = {
                'success': False,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': request.user.id
            }
            return Response(response, status.HTTP_403_FORBIDDEN)