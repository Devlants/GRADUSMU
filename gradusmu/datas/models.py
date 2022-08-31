from django.db import models


# J 이수학점 MODEL

class GraduationCiteria(models.Model):
    underGra = models.CharField(max_length=50)  #학부
    major = models.CharField(max_length=50)     #학과

    essentialLiberal = models.IntegerField(null=True)  #교필
    choiceLiberal = models.IntegerField(null=True)      #균교

    #심화전공
    deepMajor = models.IntegerField(null=True)          #전심
    deepChoiceMajor = models.IntegerField(null=True)    #전선

    #다전공
    manyMajor1 = models.IntegerField(null=True)         #다전공2    manyMajor2 = models.IntegerField(null=True)

    # 부전공
    essMajor = models.IntegerField(null=True)           #주전공
    subMajor = models.IntegerField(null=True)           #부전공
    # 총 이수
    total = models.IntegerField(null=False)




class EssentialLiberalArts(models.Model):
    field = models.CharField(max_length=50, null=True)
    name = models.CharField(max_length=50,null=True)
    year = models.IntegerField(max_length=50, null=True)

class CoreLiberalArtsSortation(models.Model):
    name = models.CharField(max_length=50, null=True)

class  CoreLiberalArts(models.Model):
    sort = models.CharField(max_length=50, null=True)
    name = models.CharField(max_length=50, null=True)
    year = models.IntegerField(max_length=50, null=True)


class BalancedCurtureNot(models.Model):
    major = models.CharField(max_length=50, null=True)
    field = models.CharField(max_length=50, null=True)

class BalancedCultureSortation(models.Model):
    name = models.CharField(max_length = 50, null=True)



class BalancedCulture(models.Model):
    sort = models.CharField(max_length = 50, null=True)
    name = models.CharField(max_length = 50, null=True)
    year = models.IntegerField(max_length=50, null=True)
#과목 모델
class subjects(models.Model):
    serialNumber = models.CharField(max_length=100,null=False) #학수번호
    semester = models.IntegerField() #학기
    distribution = models.IntegerField(null=False) # 분반
    name = models.CharField(max_length=100,null=False) # 과목이름
    grade = models.IntegerField(null=False) #학년
    prof = models.CharField(max_length=100,null=False) # 교수님
    dept = models.CharField(max_length=100,null=False) # 개설학과
    time = models.CharField(max_length=100,null=False) # 강의 시간
    room = models.CharField(max_length=100,null=False) # 강의실
    type = models.CharField(max_length=100,null=False) # 구분
    point = models.IntegerField(null=False) # 학점
    year = models.CharField(max_length=10,null=False) # 개설연도



