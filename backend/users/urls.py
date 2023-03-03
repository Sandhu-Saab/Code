from django.urls import include, path
from rest_framework import routers
from users import views
from .views import MyObtainTokenPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()

# Part responsible: Accept button in Account Apporval
router.register(r'updateIsActive', views.UpdateIsActiveViewSet,
                basename='updateIsActive')
# Part responsible: Update a user from Edit button
router.register(r'editSingleUserList', views.EditSingleUserViewSet,
                basename='editSingleUserList')
# Added 
router.register(r'editSingleCourseList', views.EditSingleCourseViewSet,
                basename='editSingleCourseList')

# Part responsible: Change password from ForgotPasswordForm
router.register(r'changePassword', views.ChangePasswordViewSet,
                basename='changePassword')
router.register(r'users', views.UserViewSet, basename='users')
router.register(r'userFast', views.UserFastViewSet, basename='usersFast')
router.register(r'roles', views.RoleViewSet, basename='roles')
router.register(r'courses', views.CourseViewSet, basename='courses')
router.register(r'securitygroups', views.SecurityGroupViewSet,
                basename='securitygroups')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/getTechnician/', views.TechnicianViewSet.as_view(),
         name="getTechnician"),

    # User Management.

    # This is where all the paths related to the User Management (and some above)
    # Each path has a small description above to indicate whichh part in the app it responsible for
    # For what it roles these endpoints belong to, please refer back to views.py to look at the code
    ###

    # Responsible when you view a user by clicking the view button
    path('api/viewSingleUser/', views.SingleUserView.as_view(),
         name="viewSingleUser"),

    # Added 
    path('api/viewSingleCourse/', views.SingleCourseView.as_view(),
         name="viewSingleCourse"),

    # Part responsible: Account Approval List
    path('api/unapprovedUsers/', views.UnapprovedUsersAPIView.as_view(),
         name="unapporvedUsersView"),

    # Part responsible: New User
    path('api/filterRole/', views.FilterRoleAPIView.as_view(),
         name="filterRole"),
    path('api/filterCourses/', views.FilterCoursesAPIView.as_view(),
         name="filterCourses"),

    # Part responsible: User List
    path('api/viewUserList/', views.ViewUserListAPIView.as_view(),
         name="viewUserList"),

    # Part responsible: Class List
    path('api/viewClassListForInstructor/', views.ViewClassListForInstructorAPIView.as_view(),
         name="viewClassListForInstructor"),

    # Part responsible: Class List
    path('api/viewStudentData/', views.ViewStudentDataAPIView.as_view(),
         name="viewClassListForStudent"),
    path('api/viewInstructorData/', views.ViewInstructorDataAPIView.as_view(),
         name="viewClassListForStudent"),

    # Sending email.

    # All email related endpoints are from below
    # There will also be role indication and the part responsible for
    ###

    # This is for every user that request a new account
    # Part responsible: Request Account link from the Login screen
    path('api/passwordResetRequest/', views.SendGridMailSender.as_view(),
         name="passwordResetRequest"),
    # This path doesn't being used in the frontend,
    # but it is used in the reverse() method from views.py
    # See more explanation in views.py
    path('forget/password/<hashed_user_id>/<token>/', views.PasswordTokenCheckAPI.as_view(),
         name="password-reset-confirm"),

    # This is for Admin and Instructor
    # Part responsible: Accept and Reject in Account Approval
    path('api/sendRejectEmail/', views.SendRejectEmail.as_view(),
         name="sendRejectEmail"),
    path('api/sendAcceptEmail/', views.SendAcceptEmail.as_view(),
         name="sendAcceptEmail"),
]

urlpatterns += router.urls
