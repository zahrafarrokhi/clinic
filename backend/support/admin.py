from django.contrib import admin
from support.models import Ticket, Message


class InlineMessage(admin.StackedInline):
    model = Message

    fields = ('user', 'text', 'file')
    ordering = ('created_at', )


class TicketAdmin(admin.ModelAdmin):
    inlines = [InlineMessage]
    search_fields = ('id', 'user', 'subject', 'status')
    list_display = ('id', 'user', 'subject', 'created_at',
                    'status')
    ordering = ('-created_at', )
    fields = None
    fieldsets = (
        ('General Info',
         {'fields': ('user', 'subject', 'created_at', 'updated_at', 'status',
                     )}),

    )
    readonly_fields = ('created_at', 'updated_at')


admin.site.register(Ticket, TicketAdmin)


class MessageAdmin(admin.ModelAdmin):
    search_fields = ('id', 'user', 'text', 'file', )
    list_display = ('id', 'user', 'text', 'created_at')
    ordering = ('-created_at', )
    fields = None
    fieldsets = (
        ('general info',
         {'fields': ('user', 'created_at', 'updated_at', 'text', 'file',
                     )}),

    )

    readonly_fields = ('created_at', 'updated_at')


admin.site.register(Message, MessageAdmin)