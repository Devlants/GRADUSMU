from django.urls import path,include
from . import views
datas_patterns = [
    
]

urlpatterns = [
    path('accounts/', include(datas_patterns)),
]