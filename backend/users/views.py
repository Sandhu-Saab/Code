from .models import User, Course, Role, SecurityGroup

from .serializers import UserSerializer
from .serializers import RoleSerializer
from .serializers import CourseSerializer
from .serializers import MyTokenObtainPairSerializer
from .serializers import SecurityGroupSerializer
from .serializers import RegisterSerializer
from .serializers import UserFastSerializer
from .serializers import EmailRequestSerializer

from rest_framework import viewsets, permissions, status, generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView


# All email related imports
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from core.settings import DEFAULT_FROM_EMAIL
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str
from django.utils.encoding import smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

"""Cheatsheet for roleId

1: Admin
2: Technician
3: Instructor
4: Student
5: Dummy
"""

""" DISCLAIMER:

There are a lot of similar codes with some light adjustments 
so, if there are parts that do not have commenting on it,
look above for reference. It will have the same definition
"""

""" User Management

This is for User Management, except for the TechnicianViewSet.
Can be used dynamically for example: SingleUserView can be used 
in every view in every role
"""


class UserViewSet(viewsets.ModelViewSet):
    """Normal User View
    Using serializers.ModelSerializer
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class UserFastViewSet(viewsets.ModelViewSet):
    """Much Faster User View
    Using serializers.Serializer
    """
    queryset = User.objects.all()
    serializer_class = UserFastSerializer
    permission_classes = [permissions.IsAuthenticated]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]


class SecurityGroupViewSet(viewsets.ModelViewSet):
    queryset = SecurityGroup.objects.all()
    serializer_class = SecurityGroupSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]


class MyObtainTokenPairView(TokenObtainPairView):
    """This is for JWT token"""
    serializer_class = MyTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]


class UpdateIsActiveViewSet(viewsets.ModelViewSet):
    """Switch is_active from False to True"""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAuthenticated]

    # This is to have a PATCH method for axios
    def patch(self, request):
        # Get the id of user from the string of character after ?userId='HERE'
        id = request.query_params['userId']
        # Get the user with that id from above
        user = User.objects.get(id=id)
        # Get the is_active value from ApproveUser() data
        is_active = request.data.is_active
        # This basically put every data above to serializer.
        # partial=True to make patch work
        serializer = user(user, data=is_active, partial=True)
        # Check if the data is valid, then save it to the database when click update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TechnicianViewSet(APIView):
    """This is for incident/problem management"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        id = request.query_params['role_id']
        if id is not None:
            user = User.objects.filter(role_id=id)
            serializer = UserSerializer(user, many=True)
            return Response(serializer.data)


class SingleUserView(APIView):
    """View a single user when click view button"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # This is for method GET from axios
    def get(self, request):
        # Get the id of user from the string of character after ?userId='HERE'
        id = request.query_params['user']
        # Get the all the user data from User table
        user = request.user
        if id is not None:
            # Get that user id
            user = User.objects.get(id=id)
            # Serialize that id, and then return that user data
            serializer = UserSerializer(user)
            return Response(serializer.data)
# Added 
class SingleCourseView(APIView):
    """View a single coruse when click view button"""
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    # This is for method GET from axios
    def get(self, request):
        # Get the id of user from the string of character after ?userId='HERE'
        id = request.query_params['courseId']
        # Get the all the user data from User table
        course = request.user
        if id is not None:
            # Get that user id
            course = Course.objects.get(id=id)
            # Serialize that id, and then return that user data
            serializer = CourseSerializer(course)
            return Response(serializer.data)


class UnapprovedUsersAPIView(APIView):
    """Get the users that just request a new account

    This is from Account Approval Section.
    The role is for Admin and Instructor
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    # This is for method GET from axios
    def get(self, request):
        # Get the role_id value from getUnapprovedUsers() data
        user = request.user.role_id
        if user == 1:
            # Filter users with is_active is False
            userData = User.objects.filter(
                is_active=False,
            )
            # Initialize the data and return it
            serializer = self.serializer_class(userData, many=True)
            return Response(serializer.data)
        if user == 3:
            # Filter is_active and filter course_id of the user that is logged in
            # In other words, instructor can only see students who just registered
            # and in the same course_id as the instructor
            userData = User.objects.filter(
                is_active=False,
                course_id=request.user.course_id,
            )
            # Initialize the data and return it
            serializer = self.serializer_class(userData, many=True)
            return Response(serializer.data)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


class ViewUserListAPIView(APIView):
    """Get user data to display on the User List

    This is for Admin and Technician
    """
    serializer_class = UserFastSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def get(self, request):
        user = request.user.role_id
        if user == 1 or user == 2:
            userData = User.objects.filter(
                is_active=True
            )
            serializer = self.serializer_class(userData, many=True)
            return Response(serializer.data)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


class EditSingleUserViewSet(viewsets.ModelViewSet):
    """Update a user when click Edit button"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def patch(self, request):
        id = request.query_params['userId']
        user = User.objects.get(id=id)
        # Get all the user data from updateUser() and updateStudents
        userData = request.data
        serializer = user(user, data=userData, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Added 
class EditSingleCourseViewSet(viewsets.ModelViewSet):
    """Update a user when click Edit button"""
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def patch(self, request):
        id = request.query_params['courseId']
        course = Course.objects.get(id=id)
        # Get all the user data from updateCourse() and updateStudents
        userData = request.data
        serializer = course(course, data=userData, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ViewClassListForInstructorAPIView(APIView):
    """Get users that are students and in the same course as the instructor

    This is for instructor only
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def get(self, request):
        user = request.user.role_id
        if user == 3:
            userData = User.objects.filter(
                course_id=request.user.course_id,
                role=4
            )
            serializer = self.serializer_class(userData, many=True)
            return Response(serializer.data)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


class FilterRoleAPIView(APIView):
    """Get the role data based on the current logged in user"""
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def get(self, request):
        user = request.user.role_id
        if user == 1 or user == 2:
            roleData = Role.objects.all()
            serializer = self.serializer_class(roleData, many=True)
            return Response(serializer.data)
        if user == 3:
            roleData = Role.objects.filter(
                roleId=4
            )
            serializer = self.serializer_class(roleData, many=True)
            return Response(serializer.data)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


class FilterCoursesAPIView(APIView):
    """Get the section data based on the current logged in user"""
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def get(self, request):
        user = request.user.role_id
        if user == 1 or user == 2:
            courseData = Course.objects.all()
            serializer = self.serializer_class(courseData, many=True)
            return Response(serializer.data)
        if user == 3:
            # Get the section that is the same as the current logged in user
            courseData = Course.objects.filter(
                id=request.user.course_id_id
            )
            serializer = self.serializer_class(courseData, many=True)
            return Response(serializer.data)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


class ViewStudentDataAPIView(APIView):
    """Get other users' data that is a student and the same 
        as the current logged in user
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def get(self, request):
        user = request.user.role_id
        if user == 4:
            userData = User.objects.filter(
                course_id=request.user.course_id,
                role=4
            )
            serializer = self.serializer_class(userData, many=True)
            return Response(serializer.data)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


class ViewInstructorDataAPIView(APIView):
    """Get other teachers' data that is an instructor and the same 
        as the current logged in user
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same definition. Look above for reference
    def get(self, request):
        user = request.user.role_id
        if user == 4:
            userData = User.objects.filter(
                course_id=request.user.course_id,
                role=3
            )
            serializer = self.serializer_class(userData, many=True)
            return Response(serializer.data)
        else:
            return Response(status.HTTP_403_FORBIDDEN)


"""Sending Email

This is all the SendGrid code below
It is using SendGrid's Python Library
For more reference, please follow: https://github.com/sendgrid/sendgrid-python
"""


class SendGridMailSender(generics.GenericAPIView):
    """Send email when resets password"""
    serializer_class = EmailRequestSerializer
    permission_classes = [permissions.AllowAny]

    # This is for method POST from axios
    def post(self, request):
        # This line doesn't do anything, other than to include self. because running the code requires it
        # If somehow you can use this value or get rid of this, feel free to do so :)
        serializer = self.serializer_class(data=request.data)
        # Get the email value from when the user enters their email for password reset
        email = request.data.get('email', '')
        # Check if that email exists in the User table
        if User.objects.filter(email=email).exists():
            # Get that email
            user = User.objects.get(email=email)
            # Hash the user id with random string of characters. Ex: Troy -> VHJveQ==
            hashed_user_id = urlsafe_base64_encode(smart_bytes(user.id))
            # Create a token for that email
            token = PasswordResetTokenGenerator().make_token(user)
            """This requires a bit of explanations:

            From what I understand, the reverse() function takes an endpoint that you created, then make it 
            as a 2-way URL, meaning you can click on that link and it will redirect back to the URL page.
            How it work inside the reverse():
                - 'password-reset-confirm' will find the path with the name variable from the urlpatterns
                (and I believe it grabs only the forget/password/).
                - kwargs={} is to specify more on what to grab, in this case from the urls.py, are the 
                <hashed_user_id> and the <token>.
            For more reference: https://docs.djangoproject.com/en/dev/topics/http/urls/#reverse-resolution-of-urls
            Hope you all understand this :)
            """
            encrypted_user_data = reverse(
                'password-reset-confirm', kwargs={'hashed_user_id': hashed_user_id, 'token': token})
            """This is the link to reset the password

            Currently the 'http://localhost:3000' is hard-coded, so change this when:
                - For testing purposes, replace it with 'http://localhost:3000'
                - For the test server, replace it with 'https://staging.pixellriveritsm.ca'
                - For the production server, replace it with 'https://pixellriveritsm.ca'
            Or make it dynamically like I tried before with this: 
                - current_site = get_current_site(request=request).domain
            But it grabs the http://127.0.0.1:8000/, so make it work somehow would be great! :)
            For more information: https://docs.djangoproject.com/en/4.1/ref/contrib/sites/
            """
            reset_link = 'http://localhost:3000' + encrypted_user_data
            """This is the actual sending email function
            
            Pretty self-explanatory:
                from_email: this is sender, click on DEFAULT_FROM_EMAIL and F12 to see where it is referenced
                to_emails: this is send to, currently is the user who requests their email
                subject: it's the subject, duh :)
                html_content: use same as HTML, but you don't have to use the tags.
                    if possible, make multiple lines for readability
            Refer to Technical Manual for where I got this code from.
            """
            message = Mail(
                from_email=DEFAULT_FROM_EMAIL,
                to_emails=user.email,
                subject='Testing Email Sendgrid',
                html_content='<p> Hi, <br> Please click the link below to reset your password. <p/>' +
                        reset_link
            )
            try:
                # Get the API key from the environment in your computer that you set with the name 'SENDGRID_API_KEY'
                # Refer back to Technical Manual if you forgot
                # sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
                sg = SendGridAPIClient(
                    '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')
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
                return Response({'success': 'Email sent successfully!'},
                                status=status.HTTP_200_OK)
            except Exception:
                return Response({'error': 'Email failed to sent!'},
                                status=status.HTTP_403_FORBIDDEN)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    """Validate if the right user is getting their email"""

    def get(self, hashed_user_id, token):
        try:
            # Decode the user id that we encoded it before
            id = smart_str(urlsafe_base64_decode(hashed_user_id))
            user = User.objects.get(id=id)
            # Check the token and user that is decoded
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is invalid'},
                                status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'Validate successfully!',
                            'hashed_user_id': "Put hashed_user_id if you want to see it",
                             'token': "Put token if you want to see it"})
        except DjangoUnicodeDecodeError:
            if not PasswordResetTokenGenerator().check_token(user):
                return Response({'error': 'Token is not valid, please request a new one'},
                                status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordViewSet(viewsets.ModelViewSet):
    """Change password after user has clicked on the reset link"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    # Same definition. Look above for reference
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response({'success': True, 'message': 'Password reset success'},
                        status=status.HTTP_200_OK)


class SendRejectEmail(generics.GenericAPIView):
    """Send email when a new account is rejected"""
    serializer_class = EmailRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same as the above email function. Look above for reference
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data.get('email', '')
        user = User.objects.get(email=email)

        message = Mail(
            from_email=DEFAULT_FROM_EMAIL,
            to_emails=user.email,
            subject='Testing Email Sendgrid',
            html_content='<p> Hi, <br> Your account has been rejected. Please contact your instructor or request a new account. <p/>'
        )
        try:
            sg = SendGridAPIClient(
                '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')
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
            return Response({'success': 'Email sent successfully!'},
                            status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Email failed to sent!'},
                            status=status.HTTP_403_FORBIDDEN)


class SendAcceptEmail(generics.GenericAPIView):
    """Send email when a new account is accepted"""
    serializer_class = EmailRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Same as the above email function. Look above for reference
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data.get('email', '')
        user = User.objects.get(email=email)

        message = Mail(
            from_email=DEFAULT_FROM_EMAIL,
            to_emails=user.email,
            subject='Testing Email Sendgrid',
            html_content='<p> Hi, <br> Your account has been accepted. Please login to your new account  <p/>'
        )
        try:
            sg = SendGridAPIClient(
                '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')
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
            return Response({'success': 'Email sent successfully!'},
                            status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Email failed to sent!'},
                            status=status.HTTP_403_FORBIDDEN)
