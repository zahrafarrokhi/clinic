from django.contrib import admin

from .models import Visit


class VisitAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    search_fields = (
        'created_at', 'updated_at',  'status',)
    list_display = (
         'patient', 'doctor', 'status', 'created_at', 'updated_at', )
    ordering = ('patient', 'doctor', 'status')
    fields = None
    # fieldsets = (
    #     ('dep info', {'fields': ('user', 'patient',
    #                              'doctor', 'assistant', 'status', 'payment')}),
    #     ('room info', {'fields': ('room_id', 'room_name', 'room_join_code')}),
    #     ('time info', {'fields': ('created_at', 'updated_at', 'closed_at')}),
    # )


admin.site.register(Visit, VisitAdmin)
