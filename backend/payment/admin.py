
from django.contrib import admin

from .models import Payment


class PaymentAdmin(admin.ModelAdmin):
    search_fields = ( 'id','user', 'amount', 'card_number', 'description')
    list_display = ('user', 'amount', 'card_number',
                    'status', 'rrn', 'id')
    ordering = ('-created_at', 'amount', )
    fields = None
    fieldsets = (
        ('general info',
         {'fields': ('user', 'created_at', 'amount', 'card_number', 'status', 'description'
                     )}),
        ('payment gate info',
         {'fields': (
                     'rrn', 'ref_id',
                     )}),

    )
    readonly_fields = ('user', 'created_at', 'amount', 'card_number',
                     'rrn', 'ref_id',)


admin.site.register(Payment, PaymentAdmin)



