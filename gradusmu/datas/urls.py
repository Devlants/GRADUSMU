from django.urls import path,include
from . import views
datas_patterns = [
    path("add/",views.add_subject,name = "add_subject"),
]

urlpatterns = [
    path('datas/', include(datas_patterns)),
]