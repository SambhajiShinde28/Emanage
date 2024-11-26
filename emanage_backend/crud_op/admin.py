from django.contrib import admin
from .models import EmployeeViewModel

# Register your models here.

@admin.register(EmployeeViewModel)
class EmployeeViewAdmin(admin.ModelAdmin):
    list_display=('No', 'Person_Name', 'Salary', 'Bonus', 'Role', 'Department', 'Location', 'HireDate', 'Total_Absent', 'Current_Status', 'Profile_Image')

