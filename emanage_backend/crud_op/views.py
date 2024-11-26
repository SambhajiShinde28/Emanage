from django.shortcuts import render
from .serializers import EmployeeViewSerializers
from rest_framework import viewsets,status
from .models import EmployeeViewModel
from django.http import FileResponse
from django.conf import settings
import os
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q

# the below importing is for creating a pdf file
from io import BytesIO
from django.http import HttpResponse,Http404
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer
from datetime import datetime
from django.http import JsonResponse


# Create your views here.
class EmployeeView(viewsets.ModelViewSet):

    queryset = EmployeeViewModel.objects.all()
    serializer_class = EmployeeViewSerializers
    

    @action(detail=False, methods=['post'])
    def searchresult(self,request):
        search = request.data.get('search_query', None)
        result = EmployeeViewModel.objects.filter(
            Q(Person_Name__icontains=search) |
            Q(Salary__icontains=search) | 
            Q(Bonus__icontains=search) |
            Q(Role__icontains=search) |
            Q(Department__icontains=search) |
            Q(Location__icontains=search) |
            Q( HireDate__icontains=search) |
            Q(Total_Absent__icontains=search) |
            Q(Current_Status__icontains=search) 
        )
        filteredData = EmployeeViewSerializers(result,many=True,context={'request':request})
        return Response(filteredData.data)

    
    @action(detail=False, methods=['put'])
    def updateemployee(self,request):

        personId = int(request.data.get('No', None))

        try:
            employee = EmployeeViewModel.objects.get(No=personId)
        except EmployeeViewModel.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(employee, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


    @action(detail=False, methods=['delete'],url_path='deleteemployee')
    def DeleteEmployee(self,request):

        personId = int(request.data.get('data', None))

        try:
            employee = EmployeeViewModel.objects.get(No=personId)  
            employee.delete() 
            return Response({"message": "Employee deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except EmployeeViewModel.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)


    @action(detail=False, methods=['post'], url_path='createemployee')
    def create_employee(self, request):
    
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Employee created successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def ImageFileDownloadLink(req,fileName):
    file = os.path.join("media/Images",fileName)
    if not os.path.exists(file):
            raise Http404("File not found")
            
    fileOpened = open(file,'rb')
    return FileResponse(fileOpened,as_attachment=True, filename=fileName)


def GeneratePDF(req):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, leftMargin=45, rightMargin=45, topMargin=50, bottomMargin=50)
    styles = getSampleStyleSheet()
    
    
    header_style = styles['Heading1']
    header_style.alignment = 1  
    header = Paragraph("Employee Report", header_style)
    
    date_style = styles['Normal']
    date_style.alignment = 2  
    date = Paragraph(f"Date: {datetime.now().strftime('%Y-%m-%d')}", date_style)
    
    
    employeeData = EmployeeViewModel.objects.all()
    data = [
        ['No', 'Person_Name', 'Salary', 'Bonus', 'Role', 'Department', 'Location', 'HireDate', 'Total_Absent', 'Current_Status']
    ]
    for emp in employeeData:
        data.append([emp.No, emp.Person_Name, emp.Salary, emp.Bonus, emp.Role, emp.Department, emp.Location, emp.HireDate, emp.Total_Absent, emp.Current_Status])

    max_columns = 4  
    tables = []
    page_width = letter[0] - 100  
    
    for start_col in range(0, len(data[0]), max_columns):
        chunk = [
            row[start_col:start_col + max_columns] for row in data
        ]
        
        num_columns = len(chunk[0])  
        col_widths = [page_width / num_columns] * num_columns
        
        table = Table(chunk, colWidths=col_widths, hAlign='LEFT') 
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ]))
        tables.append(table)
        tables.append(Spacer(1, 20))  

    elements = [header, date, Spacer(1, 20)] + tables
    doc.build(elements)

    pdf_data = buffer.getvalue()
    buffer.close()

    media_path = "media/PDF_Files"
    pdf_filename = f"employee_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    pdf_file_path = os.path.join(media_path, pdf_filename)

    with open(pdf_file_path, 'wb') as f:
        f.write(pdf_data)

    file = os.path.join("media/PDF_Files",pdf_filename)
    if not os.path.exists(file):
            raise Http404("File not found")
            
    fileOpened = open(file,'rb')
    return FileResponse(fileOpened,as_attachment=True, filename=pdf_filename)

