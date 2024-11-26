from django.db import models

# Create your models here.
class EmployeeViewModel(models.Model):
    No = models.AutoField(primary_key=True)
    Person_Name = models.CharField(max_length=500,default="Null")
    Salary = models.IntegerField(default=0)
    Bonus = models.IntegerField(default=0)
    Role = models.CharField(max_length=500, default="Null")
    Department = models.CharField(max_length=500,default="Null")
    Location = models.CharField(max_length=500,default="Null")
    HireDate = models.CharField(max_length=500,default="Null")
    Total_Absent = models.IntegerField(default=0)
    Current_Status = models.CharField(max_length=500,default="Null")
    Profile_Image = models.ImageField(upload_to='Images/')



    
