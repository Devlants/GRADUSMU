from django.shortcuts import render, redirect
from django.contrib import auth
from django.contrib.auth import authenticate
from .models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.mail import EmailMessage
import random
from django.db.models import Q

def login(request):
    if request.method == 'POST':
        user = User.objects.filter(username=request.POST["username"])
        if (user.exists()):
            user = user[0]

            if user.password == request.POST["password"]:
                auth.login(request, user)
                return redirect("home")
        
        return render(request, "login.html",{"error" : True})
    else:
        return render(request, "login.html",{"error" : False})
# 회원가입


def register(request):
    if request.method == 'POST':
        try:
            user = User()
            user.username = request.POST['username']
            user.password = request.POST['password']
            user.email = request.POST['email']
            user.name = request.POST['name']
            user.grade = int(request.POST['grade'])
            user.student_num = request.POST['student_num']
            user.universe = request.POST['universe']
            user.dept = request.POST['dept']
            user.dept_type = request.POST['dept_type']
            if (user.dept_type != "전공심화"):
                user.second_dept = request.POST['second_dept']
                user.second_universe = request.POST['second_universe']
            else:
                user.second_dept = ''
                user.second_universe = ""
            user.save()
            return redirect('login')
        except Exception as e:
            print(e)
            return render(request, 'register.html')
    return render(request, 'register.html')

# 홈


def home(request):
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        points = user.sign_up.values_list('point', flat=True)
        major_point = user.sign_up.filter(Q(type="1전심") | Q(
            type="1전선")).values_list('point', flat=True)
        culture_point = user.sign_up.filter(Q(type="교선") | Q(
            type="교필")).values_list('point', flat=True)
        context = {
            "total": sum(points),
            "major": sum(major_point),
            "culture": sum(culture_point)
        }
        return render(request, "index.html", context)
    else:
        return render(request, "login.html")

# 아이디 중복 체크


@csrf_exempt
def duplicated_check(request):
    is_duplicated = True
    if request.method == "POST":
        request = json.loads(request.body)
        if (User.objects.filter(username=request["id"]).exists()):
            is_duplicated = True
        else:
            is_duplicated = False
    context = {
        "is_duplicated": is_duplicated,
    }
    return JsonResponse(context)
# 아이디 확인

def find(request):
    return render(request,"find.html")
@csrf_exempt
def find_id(request):

    if request.method == "POST":
        request = json.loads(request.body)
        user = User.objects.filter(name=request["name"], grade=int(request["grade"]),
                                   student_num=request["student_num"], universe=request["universe"], dept=request["dept"])
        if (user.exists()):
            id = user[0].username
            is_find = True
        else:
            id = ""
            is_find = False
    context = {
        "id": id,
        "is_find": is_find,
    }
    return JsonResponse(context)

# 비밀번호 변경


@csrf_exempt
def chagne_pwd(request):

    if request.method == "POST":
        request = json.loads(request.body)
        try:
            user = User.objects.get(id=int(request["user_id"]))
            user.password = request["password"]
            user.save()
            is_changed = True
        except:
            is_changed = False
    context = {
        "is_changed": is_changed,
    }
    return JsonResponse(context)

# 비밀번호 찾기-인증메일 보내기


@csrf_exempt
def find_pwd_send_email(request):

    if request.method == "POST":
        request = json.loads(request.body)
        print(request)
        user = User.objects.filter(username=request["id"])
        if user.exists() and user[0].email == request['email']:
            num = ""
            for i in range(1, 6):
                num += str(random.randint(0, 9))
            email = EmailMessage(
                'gradusmu 인증번호',                # 제목
                '인증번호 : '+num,       # 내용
                to=[request['email']]  # 받는 이메일 리스트
            )
            email.send()
            is_sent = True
        else:
            is_sent = False
    context = {
        "is_sent": is_sent,
        "certificationNumber": num,
    }
    return JsonResponse(context)

# 비밀번호 찾기 - 새 비밀번호 설정


@csrf_exempt
def find_pwd_change_pwd(request):

    if request.method == "PUT":
        request = json.loads(request.body)
        user = User.objects.filter(username=request["id"])
        if user.exists():
            user = User.objects.get(username=request["id"])
            user.password = request['pwd']
            user.save()
            is_changed = True
        else:
            is_changed = False
    else:
        is_changed = False
    context = {
        "is_changed": is_changed,
    }
    return JsonResponse(context)
# 프로필 사진 바꾸기


@csrf_exempt
def profile_img(request):

    if request.method == "POST":

        user = User.objects.get(id=int(request.POST['user_id']))
        try:
            user.image = request.FILES["image"]
            user.save()
            is_changed = True
        except:
            is_changed = False
        context = {
            "is_changed": is_changed,
        }
        return JsonResponse(context)

# 개인정보 수정


def profile(request):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=request.user.id)
            user.email = request.POST['email']
            user.name = request.POST['name']
            user.grade = int(request.POST['grade'])
            user.student_num = request.POST['student_num']
            user.universe = request.POST['universe']
            user.dept = request.POST['dept']
            user.dept_type = request.POST['dept_type']
            if (user.dept_type != "전공심화"):
                user.second_dept = request.POST['second_dept']
                user.second_universe = request.POST['second_universe']
            else:
                user.second_dept = ''
                user.second_universe = ""
            user.save()
            request.user = user
            print(1)
            return redirect('home')
        except Exception as e:
            print(e)
            return render(request, 'inform.html')
    return render(request, 'inform.html')

# 로그아웃


def logout(request):
    auth.logout(request)
    return render(request, "login.html")
