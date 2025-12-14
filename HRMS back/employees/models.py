from django.db import models


class Department(models.Model):
  department_id = models.CharField(max_length=50, unique=True)
  name = models.CharField(max_length=100)
  description = models.TextField(blank=True)


  def __str__(self):
     return f"{self.name}"


class Employee(models.Model):
 first_name = models.CharField(max_length=100)
 last_name = models.CharField(max_length=100)
 email = models.EmailField(unique=True)
 phone = models.CharField(max_length=30, blank=True)
 department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='employees')
 designation = models.CharField(max_length=100, blank=True)
 salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)


# Profile details
 address = models.TextField(blank=True)
 qualifications = models.JSONField(default=list, blank=True) # list of qualifications
 experience_years = models.IntegerField(default=0)


 created_at = models.DateTimeField(auto_now_add=True)
 updated_at = models.DateTimeField(auto_now=True)


 def __str__(self):
   return f"{self.first_name} {self.last_name}"


class JobOpening(models.Model):
  title = models.CharField(max_length=150)
  department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='job_openings')
  requirements = models.TextField(blank=True)
  status = models.CharField(max_length=50, choices=(('open','Open'), ('closed','Closed')), default='open')
  posted_at = models.DateTimeField(auto_now_add=True)


  def __str__(self):
     return self.title


class Applicant(models.Model):
  name = models.CharField(max_length=200)
  email = models.EmailField()
  phone = models.CharField(max_length=30, blank=True)
  job = models.ForeignKey(JobOpening, on_delete=models.SET_NULL, null=True, related_name='applicants')
  resume_url = models.URLField(blank=True)
  status = models.CharField(max_length=50, choices=(('applied','Applied'),('review','In Review'),('rejected','Rejected'),('hired','Hired')), default='applied')
  applied_at = models.DateTimeField(auto_now_add=True)


  def __str__(self):
    return f"{self.name} - {self.job}"