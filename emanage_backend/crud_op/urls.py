from django.contrib import admin
from django.urls import path,include
from .views import EmployeeView,ImageFileDownloadLink,GeneratePDF
from rest_framework import routers

router=routers.DefaultRouter()
router.register(r'viewemployee',EmployeeView)

urlpatterns = [
    path('',include(router.urls)),
    path('download/<fileName>',ImageFileDownloadLink),
    path('pdf',GeneratePDF)
]