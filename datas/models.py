from django.db import models
import json


# J 이수학점 MODEL

class GraduationCiteria(models.Model):
    underGra = models.CharField(max_length=50)  # 학부
    major = models.CharField(max_length=50)  # 학과

    essentialLiberal = models.IntegerField(null=True)  # 교필
    choiceLiberal = models.IntegerField(null=True)  # 균교

    # 심화전공
    deepMajor = models.IntegerField(null=True)  # 전심
    deepChoiceMajor = models.IntegerField(null=True)  # 전선

    # 다전공
    # 다전공2    manyMajor2 = models.IntegerField(null=True)
    manyMajor1 = models.IntegerField(null=True)

    # 부전공
    essMajor = models.IntegerField(null=True)  # 주전공
    subMajor = models.IntegerField(null=True)  # 부전공
    # 총 이수
    total = models.IntegerField(null=False,default=0)

class subjects(models.Model):
    serialNumber = models.CharField(max_length=100, null=False)  # 학수번호
    semester = models.IntegerField()  # 학기
    distribution = models.IntegerField(null=False)  # 분반
    name = models.CharField(max_length=100, null=False)  # 과목이름
    grade = models.IntegerField(null=False)  # 학년
    prof = models.CharField(max_length=100, null=False)  # 교수님
    dept = models.CharField(max_length=100, null=False)  # 개설학과
    time = models.CharField(max_length=100, null=False)  # 강의 시간
    room = models.CharField(max_length=100, null=False)  # 강의실
    type = models.CharField(max_length=100, null=False)  # 구분
    point = models.IntegerField(null=False)  # 학점
    year = models.CharField(max_length=10, null=False)  # 개설연도


class EssentialLiberalArts(models.Model):
    sort = models.CharField(max_length=50, null=True)
    name = models.CharField(max_length=50, null=True)
    year = models.IntegerField(null=True)

    def getEss():
        forCount = {}
        forCount['사고와표현'] = EssentialLiberalArts.objects.filter(
            name="사고와표현").values_list('sort', flat=True)
        forCount['EnglishFoundations'] = EssentialLiberalArts.objects.filter(
            name="EnglishFoundations").values_list('sort', flat=True)
        forCount['기초수학'] = EssentialLiberalArts.objects.filter(
            name="기초수학").values_list('sort', flat=True)
        forCount['컴퓨팅사고와데이터의이해'] = EssentialLiberalArts.objects.filter(
            name="컴퓨팅사고와데이터의이해").values_list('sort', flat=True)
        forCount['알고리즘과게임콘텐츠'] = EssentialLiberalArts.objects.filter(
            name="알고리즘과게임콘텐츠").values_list('sort', flat=True)
        forCount['교양과인성'] = EssentialLiberalArts.objects.filter(
            name="교양과인성").values_list('sort', flat=True)

        ess = {}
        ess["사고와표현"] = subjects.objects.filter(name__in=forCount["사고와표현"])
        ess["EnglishFoundations"] = subjects.objects.filter(
            name__in=forCount["EnglishFoundations"])
        ess["기초수학"] = subjects.objects.filter(name__in=forCount["기초수학"])
        ess["컴퓨팅사고와데이터의이해"] = subjects.objects.filter(
            name__in=forCount["컴퓨팅사고와데이터의이해"])
        ess["알고리즘과게임콘텐츠"] = subjects.objects.filter(
            name__in=forCount["알고리즘과게임콘텐츠"])
        ess["교양과인성"] = subjects.objects.filter(
            name__in=forCount["교양과인성"])

        return (ess)


class CoreLiberalArtsSortation(models.Model):
    name = models.CharField(max_length=50, null=True)


class CoreLiberalArts(models.Model):
    sort = models.CharField(max_length=50, null=True)
    name = models.CharField(max_length=50, null=True)
    year = models.IntegerField(null=True)

    def getCore():
        forCount = {}
        forCount['창의적문제해결역량'] = CoreLiberalArts.objects.filter(
            sort="창의적문제해결역량").values_list('name', flat=True)
        forCount['융복합역량'] = CoreLiberalArts.objects.filter(
            sort="융복합역량").values_list('name', flat=True)
        forCount['다양성존중역량'] = CoreLiberalArts.objects.filter(
            sort="다양성존중역량").values_list('name', flat=True)
        forCount['윤리실천역량'] = CoreLiberalArts.objects.filter(
            sort="윤리실천역량").values_list('name', flat=True)
        print(forCount)
        core = {}
        core["창의적문제해결역량"] = subjects.objects.filter(
            name__in=forCount["창의적문제해결역량"])
        core["융복합역량"] = subjects.objects.filter(name__in=forCount["융복합역량"])
        core["다양성존중역량"] = subjects.objects.filter(name__in=forCount["다양성존중역량"])
        core["윤리실천역량"] = subjects.objects.filter(name__in=forCount["윤리실천역량"])

        return (core)


class BalancedCurtureNot(models.Model):
    major = models.CharField(max_length=50, null=True)
    field = models.CharField(max_length=50, null=True)

    def getBalField():
        field = BalancedCurtureNot.objects.all()

        return (field)


class BalancedCultureSortation(models.Model):
    name = models.CharField(max_length=50, null=True)


class BalancedCulture(models.Model):
    sort = models.CharField(max_length=50, null=True)
    name = models.CharField(max_length=50, null=True)
    year = models.IntegerField(null=True)

    def getBal():
        forCount = {}
        forCount['인문'] = BalancedCulture.objects.filter(
            name="인문").values_list('sort', flat=True)
        forCount['사회'] = BalancedCulture.objects.filter(
            name="사회").values_list('sort', flat=True)
        forCount['자연'] = BalancedCulture.objects.filter(
            name="자연").values_list('sort', flat=True)
        forCount['공학'] = BalancedCulture.objects.filter(
            name="공학").values_list('sort', flat=True)
        forCount['예술'] = BalancedCulture.objects.filter(
            name="예술").values_list('sort', flat=True)

        bal = {}
        bal["인문"] = subjects.objects.filter(name__in=forCount["인문"])
        bal["사회"] = subjects.objects.filter(name__in=forCount["사회"])
        bal["자연"] = subjects.objects.filter(name__in=forCount["자연"])
        bal["공학"] = subjects.objects.filter(name__in=forCount["공학"])
        bal["예술"] = subjects.objects.filter(name__in=forCount["예술"])

        return (bal)
# 과목 모델
