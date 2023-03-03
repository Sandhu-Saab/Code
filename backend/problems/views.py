from django.shortcuts import render
from rest_framework.response import Response
from .models import Problem, User, SecurityGroup
from .serializers import ProblemSerializer, ProblemFastSerializer
from users.serializers import UserSerializer, SecurityGroupSerializer
from rest_framework import viewsets, status
from rest_framework import permissions
from rest_framework.views import APIView
from django.db.models import Q
# Create your views here.
"""
Problem Management
Almost identical to incident management in terms of how the code functions
Role IDs
1. Admin
2. Technician
3. Instructor
4. Student
5. Dummy (Nothing is really coded with this role)
"""


class ProblemViewSet(viewsets.ModelViewSet):
    """Problem View, no filtering, used for testing or for Posting where filtering doesn't matter"""
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProblemAPIView(APIView):
    """Problem Data Grid View, Filters what data can be seen based on Role
        Uses the ProblemFastSerializer, load times are significantly faster than the regular Problem Serializer
        However the Fast Serializer only serves certain fields made specifically for the DataGrids
    """
    serializer_class = ProblemFastSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role_id == 1:
            # Caches the data that is foreign keyed on Problems, without doing select_related the load times increase drastically
            probData = Problem.objects.select_related(
                'ticketOwnerId', 'userId', 'assignedTechId', 'priority', 'status').all()
            serializer = self.serializer_class(probData, many=True)
            return Response(serializer.data)
        if user.role_id == 2:
            userId = request.user.id
            userData = User.objects.get(id=userId)
            # This uses a relatively slow serializer, if possible to switch should be switched to a faster serializer
            userSecGroup = UserSerializer(userData)
            security = SecurityGroup.objects.get(name="Service Desk")
            serviceDesk = SecurityGroupSerializer(security)
            if(str(userSecGroup.data['security_group'][0]) == str(serviceDesk.data['securityGroupId'])):
                problemData = Problem.objects.select_related(
                    'ticketOwnerId', 'userId', 'assignedTechId', 'priority', 'status').filter(Q(security_group=None) | Q(
                        security_group=serviceDesk.data['securityGroupId']))
                serializer = self.serializer_class(problemData, many=True)
                return Response(serializer.data)
            else:
                # Performs a raw SQL query to get the tickets that fall into the security group of the technician or the tickets that they created.
                problemData = Problem.objects.raw(
                    'SELECT * FROM problems_problem p WHERE "ticketOwnerId_id"::uuid = %s OR "assignedTechId_id"::uuid = %s OR p.security_group_id IN (SELECT s.securitygroup_id FROM users_user_security_group s WHERE s.user_id = %s);', [userId, userId, userId])
                serializer = self.serializer_class(problemData, many=True)
                return Response(serializer.data)
        if user.role_id == 3:
            # The Q function works as an OR statement, so its where the section is either the users section or no section
            probData = Problem.objects.select_related(
                'ticketOwnerId', 'userId', 'assignedTechId', 'priority', 'status').filter(
                Q(ticketOwnerSection_id=user.course_id_id) | Q(ticketOwnerSection_id=None))
            serializer = self.serializer_class(probData, many=True)
            return Response(serializer.data)
        if user.role_id == 4:
            probData = Problem.objects.select_related(
                'ticketOwnerId', 'userId', 'assignedTechId', 'priority', 'status').filter(Q(ticketOwnerId=user.id) | Q(
                    ticketOwnerSection_id=user.course_id_id, isAssigned=True) | Q(ticketOwnerSection_id=None))
            serializer = self.serializer_class(probData, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class SingleProblemViewSet(APIView):
    """Viewset that gets a single problem by asking for a problemId in the request"""
    serializer_class = ProblemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        id = request.query_params['problemId']
        user = request.user
        if id != None:
            problem = Problem.objects.get(id=id)
            serializer = ProblemSerializer(problem)
            userData = User.objects.get(id=user.id)
            userSecGroup = UserSerializer(userData)
            if user.role_id == 1:
                return Response(serializer.data)
            if user.role_id == 2:
                security = SecurityGroup.objects.get(name="Service Desk")
                serviceDesk = SecurityGroupSerializer(security)
                if(str(userSecGroup.data['security_group'][0]) == str(serviceDesk.data['securityGroupId']) or serializer.data['security_group'] == None):
                    return Response(serializer.data)
                if(serializer.data['security_group'] != None):
                    if(str(serializer.data['assignedTechId']) == str(user.id)):
                        return Response(serializer.data)
                    isTrue = False
                    for serializer.data['security_group'] in userSecGroup.data['security_group']:
                        if serializer.data['security_group'] in userSecGroup.data['security_group']:
                            isTrue = True
                    if (isTrue == True):
                        return Response(serializer.data)
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
            if ((user.role_id == 3 and serializer.data['ticketOwnerSection'] == user.course_id_id) or serializer.data['ticketOwnerSection'] == None):
                return Response(serializer.data)
            if ((user.role_id == 4 and serializer.data['ticketOwnerSection'] == user.course_id_id and serializer.data['isAssigned'] == True) or str(user.id) == str(serializer.data['ticketOwnerId'])):
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)


class EditProblemViewSet(APIView):
    """ Gets a single problem based on role and allows editing based on roles and owner of ticket"""
    serializer_class = ProblemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        id = request.query_params['problemId']
        user = request.user
        userData = User.objects.get(id=user.id)
        userSecGroup = UserSerializer(userData)
        if id != None:
            problem = Problem.objects.get(id=id)
            serializer = ProblemSerializer(problem)
            if user.role_id == 1:
                return Response(serializer.data)
            if user.role_id == 2:
                # Gets the service desk security group from the database
                security = SecurityGroup.objects.get(name="Service Desk")
                serviceDesk = SecurityGroupSerializer(security)
                if(str(serializer.data['assignedTechId']) == str(user.id)):
                    return Response(serializer.data)
                if(str(user.id) == str(serializer.data['ticketOwnerId'])):
                    return Response(serializer.data)
                # Asks if the user is part of the Service Desk Security group or if there isn't any security group on said ticket
                if(str(userSecGroup.data['security_group'][0]) == str(serviceDesk.data['securityGroupId']) or serializer.data['security_group'] == None):
                    return Response(serializer.data)
                if(serializer.data['security_group'] != None):
                    isTrue = False
                    for serializer.data['security_group'] in userSecGroup.data['security_group']:
                        if serializer.data['security_group'] in userSecGroup.data['security_group']:
                            isTrue = True
                    if (isTrue == True):
                        return Response(serializer.data)
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)

            if (user.role_id == 3 and (str(user.id) == str(serializer.data['ticketOwnerId']))):
                return Response(serializer.data)
            if (user.role_id == 4 and (str(user.id) == str(serializer.data['ticketOwnerId']))):
                return Response(serializer.data)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

    def put(self, request):
        """Updating a single problem, gets the problemId from request and updates said problem"""
        id = request.query_params['problemId']
        user = request.user
        userData = User.objects.get(id=user.id)
        userSecGroup = UserSerializer(userData)
        if id != None:
            problem = Problem.objects.get(id=id)
            serializer = ProblemSerializer(problem)
            if user.role_id == 1:
                serializer = ProblemSerializer(problem, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            if user.role_id == 2:
                security = SecurityGroup.objects.get(name="Service Desk")
                serviceDesk = SecurityGroupSerializer(security)
                if(str(serializer.data['assignedTechId']) == str(user.id)):
                    serializer = ProblemSerializer(
                        problem, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                if(str(user.id) == str(serializer.data['ticketOwnerId'])):
                    serializer = ProblemSerializer(problem, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                if(str(userSecGroup.data['security_group'][0]) == str(serviceDesk.data['securityGroupId']) or serializer.data['security_group'] == None):
                    serializer = ProblemSerializer(problem, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                if(serializer.data['security_group'] != None):
                    isTrue = False
                    for serializer.data['security_group'] in userSecGroup.data['security_group']:
                        if serializer.data['security_group'] in userSecGroup.data['security_group']:
                            isTrue = True
                    if (isTrue == True):
                        serializer = ProblemSerializer(
                            problem, data=request.data)
                        if serializer.is_valid():
                            serializer.save()
                            return Response(serializer.data)
                else:
                    return Response(status=status.HTTP_401_UNAUTHORIZED)
            if (user.role_id == 3 and str(user.id == str(serializer.data['ticketOwnerId']))):
                serializer = ProblemSerializer(problem, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            if (user.role_id == 4 and str(user.id) == str(serializer.data['ticketOwnerId'])):
                serializer = ProblemSerializer(problem, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
