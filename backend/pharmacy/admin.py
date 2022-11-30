from django.contrib import admin

# Register your models here.
from django.contrib import admin

from pharmacy import models
from pharmacy.models import PharmacyPrescriptionPic, PatientPrescriptionPic


class PharmacyAdmin(admin.ModelAdmin):
    search_fields = ('user', 'address', 'postal_code',
                     'phone_number',)
    list_display = ('user', 'address', 'postal_code',
                    'phone_number',)
    ordering = ('user',)
    fields = None
    fieldsets = (
        ('address info',
         {'fields': ('user', 'address', 'postal_code', 'phone_number', 'location')}),
    )


class InlinePharmacyPicture(admin.StackedInline):
    model = PharmacyPrescriptionPic

    fields = ('image', )

class InlinePatientPicture(admin.StackedInline):
    model = PatientPrescriptionPic

    fields = ('image', )


class PharmacyPrescriptionAdmin(admin.ModelAdmin):
    search_fields = ('patient', 'created_at',
                     'code', 'description', 'status')
    list_display = ('patient', 'created_at',
                     'code', 'status')
    ordering = ('-created_at', )
    fields = None
    fieldsets = (
        ('address info',
         {'fields': ('patient', 'status', 'created_at', 'updated_at', 'code',
                     'description', 'address', 'price', 'delivery_price', 'pharmacy_description','day','time')}),
    )
    inlines = [InlinePatientPicture, InlinePharmacyPicture]
    readonly_fields = ('created_at', 'updated_at', )


class PharmacyPrescriptionPicAdmin(admin.ModelAdmin):
    search_fields = ('image', 'prescription')
    list_display = ('image', 'prescription')
    ordering = ('image', 'prescription')


admin.site.register(models.Pharmacy, PharmacyAdmin)
admin.site.register(models.PharmacyPrescription, PharmacyPrescriptionAdmin)
admin.site.register(models.PharmacyPrescriptionPic, PharmacyPrescriptionPicAdmin)

