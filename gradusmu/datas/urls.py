from django.urls import path,include
from . import views
datas_patterns = [
    path("add/",views.add_subject,name = "add_subject"),
    path("delete/",views.delete_subject,name = "delete_subject"),
    path("signed_search/",views.signed_search_subject,name = "signed_search_subject"),
    path("unsigned_search/",views.unsigned_search_subject,name = "unsinged_search_subject"),
    path("subject_detail/",views.subject_detail,name = "subject_detail"),
    path("score_detail/",views.score_detail,name = "score_detail"),
    path("score_graph_detail/<str:title>",views.score_graph_detail,name = "scoreGraphDetail"),
    path("balanced_culture/",views.balanced_search_subject,name = "balanced_culture"),
    path("core_culture/", views.core_search_subject, name="core_culture"),
    path("ess_culture/", views.ess_search_subject, name="ess_culture"),
    path("checkBal/", views.checkBal, name="checkBal"),
    path("sendMyBal/", views.sendMyBal, name="sendMyBal"),
    path("checkESS/", views.checkESS, name="checkESS"),
    path("checkCore/", views.checkCore, name="checkCore"),
    path("many_major/",views.many_major,name = "many_major"),
]

urlpatterns = [
    path('datas/', include(datas_patterns)),
]