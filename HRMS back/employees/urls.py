from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet,
    EmployeeViewSet,
    JobOpeningViewSet,
    ApplicantViewSet,
    LoginAPI
)

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'job-openings', JobOpeningViewSet)
router.register(r'applicants', ApplicantViewSet)

# URL patterns
urlpatterns = [
    # Login API endpoint
    path('login/', LoginAPI.as_view(), name='login-api'),
    
    # Include all router URLs under 'api/'
    path('', include(router.urls)),
]
