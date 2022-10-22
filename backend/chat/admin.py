from django.contrib import admin

from .models import ChatUser


class ChatUserAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    search_fields = (
        'rocketchat_id', 'username', )
    list_display = (
         'username', 'rocketchat_id', 'owner', 'created_at', 'updated_at', )
    fields = None


admin.site.register(ChatUser, ChatUserAdmin)
