from django.contrib import admin

from doctor import models


class DepartmentAdmin(admin.ModelAdmin):
    search_fields = ('name', 'faname')
    list_display = ('name', 'faname')
    ordering = ('name', 'faname')


class DoctorAdmin(admin.ModelAdmin):
    search_fields = ('first_name', 'last_name', 'department',
                     'degree', 'user', 'medical_code', 'city', 'phone')
    list_display = ['user', 'department', 'first_name', 'last_name',
                    'phone']
    ordering = ('last_name', 'first_name', 'department', 'city')
    fields = None


class OfficeAdmin(admin.ModelAdmin):
    search_fields = ('address', 'location',
                     'postal_code', 'phone_number')
    list_display = [field.name for field in models.Office._meta.get_fields() if
                    field.name not in ["", ]]
    ordering = ('address', )
    fields = None


admin.site.register(models.Department, DepartmentAdmin)
admin.site.register(models.Doctor, DoctorAdmin)
admin.site.register(models.Office, OfficeAdmin)

