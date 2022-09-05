from django.shortcuts import render, redirect
from .models import subjects, BalancedCulture, CoreLiberalArts, EssentialLiberalArts, GraduationCiteria, \
    BalancedCurtureNot
from accounts.models import User
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
import datetime

#들은 과목
@csrf_exempt
def signed_search_subject(request):
    request = json.loads(request.body)
    
    user = User.objects.get(id = request['user_id'])
    signed = list(user.sign_up.values_list('id',flat=True))
    if request['dept_type'] == "전심":
        dept_type = "1전심"
    elif request['dept_type'] == "전선":
        dept_type = "1전선"
    elif request['dept_type'] == "교선":
        dept_type = "교선"
    elif request['dept_type'] == "교필":
        dept_type = "교필"
    elif request['dept_type'] == "균교":
        dept_type = "균교"
    year = "20"+request['year'][:2]
    semester = request['year'][5]
    if dept_type == "균교":
        print(dept_type)
        datas = BalancedCulture.getBal()
        context = {}
        i=0
        for key in list(datas.keys()):
            for data in datas[key].filter(id__in = signed):
                context[i] = {
                    "id" : data.id,
                    "name" : data.name,
                    "serial_num" : data.serialNumber+"-"+str(data.distribution),
                    "prof" : data.prof,
                    "point" : data.point,
                    "sort" : key
                }
                i+=1
    elif dept_type == "교필":
        datas = CoreLiberalArts.getCore()
        context = {}
        i=0
        for key in list(datas.keys()):
            for data in datas[key].filter(id__in = signed):
                context[i] = {
                    "id" : data.id,
                    "name" : data.name,
                    "serial_num" : data.serialNumber+"-"+str(data.distribution),
                    "prof" : data.prof,
                    "point" : data.point,
                    "sort" : key
                }
                i+=1
        datas = EssentialLiberalArts.getEss()
        for key in list(datas.keys()):
            for data in datas[key].filter(id__in = signed):
                context[i] = {
                    "id" : data.id,
                    "name" : data.name,
                    "serial_num" : data.serialNumber+"-"+str(data.distribution),
                    "prof" : data.prof,
                    "point" : data.point,
                    "sort" : key
                }
                i+=1

    else:
        datas = subjects.objects.filter(type = dept_type,year = year, semester = int(semester)).filter(id__in = signed)
        context={}
        for i in range(len(datas)):
            context[i] = {
                "id" : datas[i].id,
                "name" : datas[i].name,
                "serial_num" : datas[i].serialNumber+"-"+str(datas[i].distribution),
                "prof" : datas[i].prof,
                "point" : datas[i].point,
            }
        
    return JsonResponse(context)

#안들은 과목
@csrf_exempt
def unsigned_search_subject(request):
    request = json.loads(request.body)
    
    user = User.objects.get(id = request['user_id'])
    signed = list(user.sign_up.values_list('id',flat=True))
    if request['dept_type'] == "전심":
        dept_type = "1전심"
    elif request['dept_type'] == "전선":
        dept_type = "1전선"
    elif request['dept_type'] == "교선":
        dept_type = "교선"
    elif request['dept_type'] == "교필":
        dept_type = "교필"
    elif request['dept_type'] == "균교":
        dept_type = "균교"
    year = "20"+request['year'][:2]
    semester = request['year'][5]
    if dept_type == "균교" :
        datas = BalancedCulture.getBal()
        context = {}
        i=0
        for key in list(datas.keys()):
            for data in datas[key].exclude(id__in = signed):
                context[i] = {
                    "id" : data.id,
                    "name" : data.name,
                    "serial_num" : data.serialNumber+"-"+str(data.distribution),
                    "prof" : data.prof,
                    "point" : data.point,
                    "sort" : key
                }
                i+=1
    elif dept_type == "교필":
        datas = CoreLiberalArts.getCore()
        context = {}
        i=0
        for key in list(datas.keys()):
            for data in datas[key].exclude(id__in = signed):
                context[i] = {
                    "id" : data.id,
                    "name" : data.name,
                    "serial_num" : data.serialNumber+"-"+str(data.distribution),
                    "prof" : data.prof,
                    "point" : data.point,
                    "sort" : key
                }
                i+=1
        datas = EssentialLiberalArts.getEss()
        for key in list(datas.keys()):
            for data in datas[key].exclude(id__in = signed):
                context[i] = {
                    "id" : data.id,
                    "name" : data.name,
                    "serial_num" : data.serialNumber+"-"+str(data.distribution),
                    "prof" : data.prof,
                    "point" : data.point,
                    "sort" : key
                }
                i+=1
    else :
        datas = subjects.objects.filter(type = dept_type,year = year, semester = int(semester)).exclude(id__in = signed)
        context={}
        for i in range(len(datas)):
            context[i] = {
                "id" : datas[i].id,
                "name" : datas[i].name,
                "serial_num" : datas[i].serialNumber+"-"+str(datas[i].distribution),
                "prof" : datas[i].prof,
                "point" : datas[i].point,
            }
        
    return JsonResponse(context)

#과목 상세
@csrf_exempt
def subject_detail(request):
    print(request.body)
    request = json.loads(request.body)
    print(1)
    print(request)
    user = User.objects.get(id = request['user_id'])
    signed = list(user.sign_up.values_list('id',flat=True))

    subject = subjects.objects.get(id = request['subject_id'])
    
    context = {
            "id" : subject.id,
            "name" : subject.name,
            "year" : subject.year + "년" + str(subject.semester) + "학기",
            "type" : subject.type,
            "serial_num" : subject.serialNumber+"-"+str(subject.distribution),
            "prof" : subject.prof,
            "point" : str(subject.point) + "학점",
            "room" : subject.room,
            "time" : subject.time,
            "dept" : subject.dept,
            "signed" : True if subject.id in signed else False,
        }
    return JsonResponse(context)

#학점 상세 페이지
def score_detail(request):
    return render(request,"scoreDetail.html")

#학점 상세 페이지
def score_graph_detail(request):
    return render(request,"scoreGraphDetail.html")

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
    else:
        
        return render(request, "addSubject.html")

@csrf_exempt
def delete_subject(request):
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)
            
            user = User.objects.get(id = data['user_id'])
            user.sign_up.remove(subjects.objects.get(id = data["subject_id"]))
            is_deleted = True
        except:
            is_deleted = False
        context = {
            "is_deleted" : is_deleted,
        }
        return JsonResponse(context)
    else:
        
        return render(request, "addSubject.html")
# 균교 영역별
@csrf_exempt 
def balanced_search_subject(request):
    request = json.loads(request.body)
    
    user = User.objects.get(id = request['user_id'])
    signed = list(user.sign_up.values_list('id',flat=True))
    currentDateTime = datetime.datetime.now()
    date = currentDateTime.date()
    year = date.strftime("%Y")
    datas = BalancedCulture.getBal()
    context = {}
    i=0
    for data in datas[request['dept_type']].filter(id__in = signed):
        context[i] = {
            "id" : data.id,
            "name" : data.name,
            "serial_num" : data.serialNumber+"-"+str(data.distribution),
            "prof" : data.prof,
            "point" : data.point,
            "signed" : True
        }
        i+=1
    for data in datas[request['dept_type']].filter(year = year).exclude(id__in = signed):
        context[i] = {
            "id" : data.id,
            "name" : data.name,
            "serial_num" : data.serialNumber+"-"+str(data.distribution),
            "prof" : data.prof,
            "point" : data.point,
            "signed" : False
        }
        i+=1    
    return JsonResponse(context)

#기초교양 영역별
@csrf_exempt
def core_search_subject(request):
    request = json.loads(request.body)

    user = User.objects.get(id=request['user_id'])
    signed = list(user.sign_up.values_list('id', flat=True))
    currentDateTime = datetime.datetime.now()
    date = currentDateTime.date()
    year = date.strftime("%Y")
    datas = CoreLiberalArts.getCore()
    context = {}
    i = 0
    for data in datas[request['dept_type']].filter(id__in=signed):
        context[i] = {
            "id": data.id,
            "name": data.name,
            "serial_num": data.serialNumber + "-" + str(data.distribution),
            "prof": data.prof,
            "point": data.point,
            "signed": True
        }
        i += 1
    for data in datas[request['dept_type']].filter(year=year).exclude(id__in=signed):
        context[i] = {
            "id": data.id,
            "name": data.name,
            "serial_num": data.serialNumber + "-" + str(data.distribution),
            "prof": data.prof,
            "point": data.point,
            "signed": False
        }
        i += 1
    return JsonResponse(context)

@csrf_exempt
def ess_search_subject(request):
    request = json.loads(request.body)

    user = User.objects.get(id=request['user_id'])
    signed = list(user.sign_up.values_list('id', flat=True))
    currentDateTime = datetime.datetime.now()
    date = currentDateTime.date()
    year = date.strftime("%Y")
    datas = EssentialLiberalArts.getEss()
    context = {}
    i = 0
    for data in datas[request['dept_type']].filter(id__in=signed):
        context[i] = {
            "id": data.id,
            "name": data.name,
            "serial_num": data.serialNumber + "-" + str(data.distribution),
            "prof": data.prof,
            "point": data.point,
            "signed": True
        }
        i += 1
    for data in datas[request['dept_type']].filter(year=year).exclude(id__in=signed):
        context[i] = {
            "id": data.id,
            "name": data.name,
            "serial_num": data.serialNumber + "-" + str(data.distribution),
            "prof": data.prof,
            "point": data.point,
            "signed": False
        }
        i += 1
    return JsonResponse(context)


@csrf_exempt
def sendData(request):
    criteria = GraduationCiteria.object.all()
    return render(request, '/templates/scoreDetail.html', {"criteria" : criteria})

#핵신교양 확인
def checkCore(request):
    core = CoreLiberalArts.object.all()
    user = User.objects.get(id=request['user_id'])
    signed = list(user.sign_up.values_list('id', flat=True))
    datas = CoreLiberalArts.getCore()
    key1, key2, key3, key4= False
    for key in list(datas.keys()):
        for data in datas[key].filter(id__in=signed):
            if key == '창의적문제해결역량':
                key1 = True
            elif key == '융복합역량':
                key2 = True
            elif key == '다양성존중역량':
                key3 = True
            elif key == '윤리실천역량':
                key4 = True
    context = {
        'Creative': key1,
        'Convergence': key2,
        'Diversity': key3,
        'Ethics': key4
    }
    return render(request, '/templates/scoreDetail.html', {"checkEss": context})
#기초교양 확인
def checkESS(request):
    ess = EssentialLiberalArts.object.all()
    user = User.objects.get(id=request['user_id'])
    signed = list(user.sign_up.values_list('id', flat=True))
    datas = EssentialLiberalArts.getEss()
    key1, key2, key3, key4, key5 = False
    for key in list(datas.keys()):
        for data in datas[key].filter(id__in=signed):
            if key == '사고와표현':
                key1 = True
            elif key == 'EnglishFoundations':
                key2 = True
            elif key == '기초수학':
                key3 = True
            elif key == '컴퓨팅사고와데이터의이해':
                key4 = True
            elif key == '알고리즘과게임콘텐츠':
                key5 = True
    context = {
        'Think': key1,
        'English': key2,
        'Math': key3,
        'Computing': key4,
        'Algorithm': key5
    }
    return render(request, '/templates/scoreDetail.html', {"checkEss": context})
#균교 확인
def checkBal(request):
    bal = BalancedCulture.object.all()
    user = User.objects.get(id=request['user_id'])
    signed = list(user.sign_up.values_list('id', flat=True))
    datas = BalancedCulture.getBal()
    key1, key2, key3, key4, key5 = False
    for key in list(datas.keys()):
        for data in datas[key].filter(id__in=signed):
            if key == '인문':
                key1 = True
            elif key == '사회':
                key2 = True
            elif key == '자연':
                key3 = True
            elif key == '공학':
                key4 = True
            elif key == '예술':
                key5 = True
    context = {
        'Liberal': key1,
        'Society': key2,
        'Natural': key3,
        'Engineering': key4,
        'Art': key5
    }
    return render(request, '/templates/scoreDetail.html', {"checkBal": context})


## 내 균교영역 보내기
def sendMyBal(request):
    bal = BalancedCulture.object.all()
    user = User.objects.get(id=request['user_id'])
    compare = BalancedCurtureNot.object.all()

    for com in compare:
        if user.dept == com.major:
            result = com.field

    return render(request, '/templates/scoreDetail.html', {"myBal": result})





