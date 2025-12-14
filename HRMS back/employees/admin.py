from django.contrib import admin
from .models import Department, Employee, JobOpening, Applicant


admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(JobOpening)
admin.site.register(Applicant)