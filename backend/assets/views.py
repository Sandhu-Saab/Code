from django.shortcuts import render
from .models import Asset, License, Asset_Status
from .serializers import AssetSerializer, LicenseSerializer, AssetStatusSerializer
from rest_framework import generics, viewsets, status, permissions
from django.shortcuts import get_object_or_404
from core.permissions import AdminOrReadOnly, AuthorOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from django.db.models import Q


class LicenseViewSet(viewsets.ModelViewSet):
    """License View
    Allows for GET, POST, DELETE and PATCH
    No role filtering since the only way to view these is through Assets, which are filtered.
    """
    queryset = License.objects.all()
    serializer_class = LicenseSerializer
    permission_classes = [permissions.IsAuthenticated]

class AssetStatusViewSet(viewsets.ModelViewSet):
    """Asset Status View
    Allows for GET, POST, DELETE and PATCH
    """
    queryset = Asset_Status.objects.all()
    serializer_class = AssetStatusSerializer
    permission_classes = [permissions.IsAuthenticated]

class AssetViewSet(viewsets.ModelViewSet):
    """Unfiltered Asset View
    Allows for GET, POST, DELETE and PATCH
    Since this is unfiltered, used primarily for POSTing and PATCHing
    """
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

class SingleAssetViewSet(APIView):
    """Single Filtered Asset View
    Allows for GET
    Receives an asset's ID then determines if the current user is allowed to see it
    """
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        assetId = request.query_params['assetId']
        user = request.user

        if assetId != None:
            asset = Asset.objects.get(id=assetId)
            serializer = AssetSerializer(asset)

            if(user.role_id == 1):
                return Response(serializer.data)
            elif(user.role_id == 2):
                return Response(serializer.data)
            elif(user.role_id == 3):
                if(user.id == asset.createdBy_id or user.id == asset.assignedTo_id or user.course_id_id == asset.course_id or asset.course_id == None):
                    return Response(serializer.data)
            elif(user.role_id == 4):
                if(user.id == asset.createdBy_id or user.id == asset.assignedTo_id):
                    return Response(serializer.data)
            
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class AssetAPIView(APIView):
    """Filtered Asset View
    Allows for GET and POST
    Filters Assets based on the current user's role
    Used primarily for any Asset Datagrids
    """
    serialzer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        user = request.user
        if(user.role_id == 1):
            incData = Asset.objects.all()
            serializer = self.serialzer_class(incData, many=True)
            return Response(serializer.data)
        elif(user.role_id == 2):
            incData = Asset.objects.all()
            serializer = self.serialzer_class(incData, many=True)
            return Response(serializer.data)
        elif(user.role_id == 3):
            incData = Asset.objects.filter(
                Q(createdBy=request.user.id) | Q(course=request.user.course_id) | Q(course=None)
            )
            serializer = self.serialzer_class(incData, many=True)
            return Response(serializer.data)
        elif(user.role_id == 4):
            incData = Asset.objects.filter(
                Q(createdBy=request.user.id) | Q(assignedTo=request.user.id)
            )
            serializer = self.serialzer_class(incData, many=True)
            return Response(serializer.data)
        else:
            response = {
                'success': request.user.role_id,
                'status_code': status.HTTP_403_FORBIDDEN,
                'message': request.user.id
            }
            return Response(response, status.HTTP_403_FORBIDDEN)

    def post(self, request):
        serializer = AssetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)