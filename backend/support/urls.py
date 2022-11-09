from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
# list
router.register(r'tickets',views.TicketView,basename='ticket')
urlpatterns = [
    # # list
    # path('tickets/', views.TicketView.as_view({'get': 'list'}), name='ticket-list'),
    path('', include(router.urls)),
]