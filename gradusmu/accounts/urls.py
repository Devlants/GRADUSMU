from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views

accounts_patterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('duplicated_check/', views.duplicated_check, name='duplicated_check'),
    path('find/',views.find,name = "find"),
    path('find_id/', views.find_id, name='find_id'),
    path('find_pwd/send_email/', views.find_pwd_send_email, name='find_pwd_send_email'),
    path('find_pwd/change_pwd/', views.find_pwd_change_pwd, name='find_pwd_change_pwd'),
    path('profile/',views.profile,name = "settings"),
    path('profile_img/',views.profile_img,name = "profile_img"),
    path('change_pwd/',views.chagne_pwd,name = "change_pwd"),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]

urlpatterns = [
    path('accounts/', include(accounts_patterns)),
]