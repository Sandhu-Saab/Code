from django.urls import path, include
from changes import views
from .views import RequestAPIView, RequestAPIViewSet, RequestViewSet, BusinessJustificationViewSet, RiskAssesmentViewSet, InstallPlanViewSet, BackoutPlanViewSet, CommunicationPlanViewSet, ApprovalsViewSet
from rest_framework import routers
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'requestData', RequestViewSet,
                basename="requestData")
router.register(r'businessData', BusinessJustificationViewSet,
                basename="businessData")
router.register(r'assessmentData', RiskAssesmentViewSet,
                basename="assesmentData")
router.register(r'installPlanData', InstallPlanViewSet,
                basename="installPlanData")
router.register(r'backoutPlanData', BackoutPlanViewSet,
                basename="backoutPlanData")
router.register(r'communicationPlanData', CommunicationPlanViewSet,
                basename="communicationPlanData")


urlpatterns = [
    path('api/requests/', RequestAPIView.as_view(), name='requestView'),
    path('api/request/', RequestAPIViewSet.as_view(), name='singleRequest'),
    path('api/', include(router.urls)),
]

urlpatterns += router.urls