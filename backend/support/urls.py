from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
# list,create,retrive
router.register(r'tickets',views.TicketView,basename='ticket')
router.register(r'ticket-create',views.CreateTicketView,basename='ticket-create')
router.register(r'messages',views.MessageView,basename='messages')
router.register(r'close-ticket',views.CloseTicket,basename='close-ticket')
urlpatterns = [
    # # list
    # path('tickets/', views.TicketView.as_view({'get': 'list','post':'create'}), name='ticket-list-create'),

    path('', include(router.urls)),
]