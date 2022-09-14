from django.contrib import admin

from .models import City, SupplementaryInsurance


# Register your models here.
class CityAdmin(admin.ModelAdmin):
    search_fields = ('fa_name', 'parent')
    list_display = ('fa_name', 'parent')
    ordering = ('parent',)


class SupplementaryInsuranceAdmin(admin.ModelAdmin):
    search_fields = ('fa_name',)
    list_display = ('fa_name',)
    ordering = ('fa_name',)


admin.site.register(City, CityAdmin)
admin.site.register(SupplementaryInsurance, SupplementaryInsuranceAdmin)
