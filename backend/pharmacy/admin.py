from django.contrib import admin

# Register your models here.
from django.contrib import admin

from doctor import models
from pharmacy.models import PharmacyPrescriptionPic


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


class InlinePicture(admin.StackedInline):
    model = PharmacyPrescriptionPic

    fields = ('image', )


class PharmacyPrescriptionAdmin(admin.ModelAdmin):
    search_fields = ('patient', 'created_at',
                     'code', 'description')
    list_display = ('patient', 'created_at',
                     'code', )
    ordering = ('-created_at', )
    fields = None
    fieldsets = (
        ('address info',
         {'fields': ('patient', 'created_at', 'updated_at', 'code', 'description')}),
    )
    inlines = [InlinePicture]


class PharmacyPrescriptionPicAdmin(admin.ModelAdmin):
    search_fields = ('image', 'prescription')
    list_display = ('image', 'prescription')
    ordering = ('image', 'prescription')


admin.site.register(models.Pharmacy, PharmacyAdmin)
admin.site.register(models.PharmacyPrescription, PharmacyPrescriptionAdmin)
admin.site.register(models.PharmacyPrescriptionPic, PharmacyPrescriptionPicAdmin)
