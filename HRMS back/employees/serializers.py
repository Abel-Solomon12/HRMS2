from rest_framework import serializers
from .models import Department, Employee, JobOpening, Applicant


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.CharField(write_only=True, allow_null=True, required=False)

    class Meta:
        model = Employee
        fields = [
            'id', 'first_name', 'last_name', 'email', 'phone',
            'department', 'department_id', 'designation', 'salary',
            'address', 'qualifications', 'experience_years', 'created_at', 'updated_at'
        ]

    def create(self, validated_data):
        dept_id = validated_data.pop('department_id', None)
        if dept_id:
            try:
                department = Department.objects.get(department_id=dept_id)
            except Department.DoesNotExist:
                department = None
            validated_data['department'] = department
        return super().create(validated_data)

    def update(self, instance, validated_data):
        dept_id = validated_data.pop('department_id', None)
        if dept_id is not None:
            try:
                department = Department.objects.get(department_id=dept_id)
            except Department.DoesNotExist:
                department = None
            instance.department = department
        return super().update(instance, validated_data)


class JobOpeningSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    department_id = serializers.CharField(write_only=True, allow_null=True, required=False)

    class Meta:
        model = JobOpening
        fields = '__all__'

    def create(self, validated_data):
        dept_id = validated_data.pop('department_id', None)
        if dept_id:
            try:
                validated_data['department'] = Department.objects.get(department_id=dept_id)
            except Department.DoesNotExist:
                validated_data['department'] = None
        return super().create(validated_data)


class ApplicantSerializer(serializers.ModelSerializer):
    job = JobOpeningSerializer(read_only=True)
    job_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Applicant
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)