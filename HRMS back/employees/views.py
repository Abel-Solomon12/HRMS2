from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate

from .models import Department, Employee, JobOpening, Applicant
from .serializers import (
    DepartmentSerializer,
    EmployeeSerializer,
    JobOpeningSerializer,
    ApplicantSerializer,
)


# ---- ViewSets ----

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    lookup_field = 'department_id'


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by('-created_at')
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email', 'designation']
    ordering_fields = ['created_at', 'salary', 'experience_years']

    def get_queryset(self):
        qs = super().get_queryset()
        dept = self.request.query_params.get('department')
        designation = self.request.query_params.get('designation')
        
        if dept:
            qs = qs.filter(department__department_id=dept)
        if designation:
            qs = qs.filter(designation__icontains=designation)
            
        return qs


class JobOpeningViewSet(viewsets.ModelViewSet):
    queryset = JobOpening.objects.all().order_by('-posted_at')
    serializer_class = JobOpeningSerializer


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all().order_by('-applied_at')
    serializer_class = ApplicantSerializer

    @action(detail=False, methods=['get'])
    def by_status(self, request):
        status = request.query_params.get('status')
        qs = self.queryset
        
        if status:
            qs = qs.filter(status=status)
            
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


# ---- Login API ----

class LoginAPI(APIView):
    """
    Login API for HRMS.
    """
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        user = authenticate(username=username, password=password)
        if user:
            return Response({"success": True, "username": user.username})
        else:
            return Response({"success": False, "error": "Invalid credentials"}, status=400)
