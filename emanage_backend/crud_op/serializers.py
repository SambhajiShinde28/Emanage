from rest_framework import serializers
from .models import EmployeeViewModel


class EmployeeViewSerializers(serializers.HyperlinkedModelSerializer):
    No=serializers.ReadOnlyField()
    class Meta:
        model = EmployeeViewModel
        fields = "__all__"

