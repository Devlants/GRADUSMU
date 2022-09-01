from django.urls import path,include
from . import views
datas_patterns = [
    path("add/",views.add_subject,name = "add_subject"),
    path("delete/",views.delete_subject,name = "delete_subject"),
    path("signed_search/",views.signed_search_subject,name = "signed_search_subject"),
    path("unsigned_search/",views.unsigned_search_subject,name = "unsinged_search_subject"),
    path("subject_detail/",views.subject_detail,name = "subject_detail"),
    path("score_detail/",views.score_detail,name = "score_detail"),
    path("score_graph_detail/",views.score_graph_detail,name = "scoreGraphDetail"),
    path("balanced_culture/",views.balanced_search_subject,name = "balanced_culture")
]

urlpatterns = [
    path('datas/', include(datas_patterns)),
]