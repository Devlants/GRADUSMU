from django.urls import path,include
from . import views

accounts_patterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('duplicated_check/', views.duplicated_check, name='duplicated_check'),
    path('find_id/', views.find_id, name='find_id'),
    path('find_pwd/send_email', views.find_pwd_send_email, name='find_pwd_send_email'),
    path('find_pwd/change_pwd', views.find_pwd_change_pwd, name='find_pwd_change_pwd'),
    path('profile/',views.profile,name = "profile"),
]

urlpatterns = [
    path('accounts/', include(accounts_patterns)),
]