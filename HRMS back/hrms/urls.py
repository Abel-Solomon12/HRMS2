from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Simple homepage view
def home(request):
    return HttpResponse("Welcome to HRMS!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('employees.urls')),  # your existing API routes
    path('', home),  # <-- this is the new homepage route
]
