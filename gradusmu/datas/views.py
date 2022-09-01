from django.shortcuts import render, redirect
from .models import subjects
from accounts.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse

# 학점 가져오기
# 총학점, 전공학점, 교양학점
def point():
    return

#수강한 과목 가져오기
#상위항목, 하위항목별로 구분 가능해야됨
def complete():
    return

#과목 상세
def subject_detail():
    return 

#학점 상세 페이지
def point_detail():
    return

#과목 추가
@csrf_exempt
def add_subject(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            user = User.objects.get(id = data['user_id'])
            user.sign_up.add(subjects.objects.get(id = data["subject_id"]))
            is_added = True
        except:
            is_added = False
        context = {
            "is_added" : is_added,
        }
        return JsonResponse(context)
    
    return render(request, "addSubject.html")
