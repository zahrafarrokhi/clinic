from django.contrib import admin

from laboratory.models import PatientPrescriptionPic
from laboratory import models



class InlinePatientPicture(admin.StackedInline):
    model = PatientPrescriptionPic

    fields = ('image', )


class LaboratoryPrescriptionAdmin(admin.ModelAdmin):
    search_fields = ('patient', 'created_at',
                     'code', 'description', 'status')
    list_display = ('patient', 'created_at',
                     'code', 'status')
    ordering = ('-created_at', )
    fields = None
    fieldsets = (
        ('address info',
            {'fields': (
                'patient', 'status', 'created_at', 'updated_at', 'code',
                'description', 'address',
                # 'delivery_price', 'pharmacy_description','day','time', 'price
                )
            }
         ),
    )
    inlines = [InlinePatientPicture, ]
    readonly_fields = ('created_at', 'updated_at', )

admin.site.register(models.LaboratoryPrescription, LaboratoryPrescriptionAdmin)
