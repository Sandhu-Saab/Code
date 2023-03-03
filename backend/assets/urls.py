from django.urls import path, include
from assets import views
from .views import AssetViewSet, LicenseViewSet, AssetStatusViewSet, SingleAssetViewSet
from rest_framework import routers
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'assetData', AssetViewSet,
                basename="assetData")
router.register(r'licenseData', LicenseViewSet,
                basename="licenseData")
router.register(r'assetStatusData', AssetStatusViewSet,
                basename="assetStatusData")

            

urlpatterns = [
    path('api/assets/', views.AssetAPIView.as_view(), name="assetView"),
    path('api/asset/', views.SingleAssetViewSet.as_view(), name="singleAssetView"),
    path('api/', include(router.urls)),
]

urlpatterns += router.urls