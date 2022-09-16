from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Q
from datas.models import BalancedCulture,GraduationCiteria
class User(AbstractUser):
    #이름
    name = models.CharField(max_length=20, unique=False, verbose_name='사용자 이름', null=False)
    #학년
    grade = models.IntegerField(null=False,default = 1)
    #학번
    student_num = models.CharField(max_length=20,null=False)
    #학부
    universe = models.CharField(max_length = 50,null=False)
    #학과
    dept = models.CharField(max_length = 50,null=False,default = '')
    #전공분류
    dept_type = models.CharField(max_length = 50,null=False,default = '')
    #부전공/다전공
    second_universe = models.CharField(max_length = 50, null = False,default = "")
    second_dept = models.CharField(max_length = 50,null=False)
    image = models.ImageField(upload_to="",default = "/person.png")
    sign_up = models.ManyToManyField("datas.subjects")

    def total_points(self):
        return sum(self.sign_up.values_list('point',flat = True))

    def major_points(self):
        return self.choice_major_points()+self.deep_major_points()
        # return sum(self.sign_up.filter(Q(dept = self.dept,type = "1전심")|Q(dept = self.dept,type = "1전선")).values_list('point',flat = True))
    
    def choice_major_points(self):
        if self.dept_type == "전공심화":
            return sum(self.sign_up.filter(Q(dept = self.dept, type = "1전선")).values_list('point',flat = True))
        else :
            return sum(self.sign_up.filter(Q(dept = self.dept, type = "1전심")|Q(dept = self.dept, type = "1전선")).values_list('point',flat = True))
    
    def deep_major_points(self):
        if self.dept_type == "전공심화":
            return sum(self.sign_up.filter(Q(dept = self.dept,type = "1전심")).values_list('point',flat = True))
        else :
            return sum(self.sign_up.filter(Q(dept = self.second_dept, type = "1전심")|Q(dept = self.second_dept, type = "1전선")).values_list('point',flat = True))
    
    def culture_points(self):
        return sum(self.sign_up.filter(Q(type = "교선")|Q(type = "교필")).values_list('point',flat = True))
    
    def choice_culture_points(self):
        return sum(self.sign_up.filter(Q(type = "교선")).values_list('point',flat = True))
    
    def essential_culture_points(self):
        return sum(self.sign_up.filter(Q(type = "교필")).values_list('point',flat = True))

    def balanced_culture_points(self):
        result = 0
        signed = list(self.sign_up.values_list('id',flat=True))
        datas = BalancedCulture.getBal()
        for key in list(datas.keys()):
            result += sum(datas[key].filter(id__in = signed).values_list('point',flat=True))

        return result
    
    def balanced_culture_points_humanities(self):

        signed = list(self.sign_up.values_list('id',flat=True))
        datas = BalancedCulture.getBal()
        result = sum(datas["인문"].filter(id__in = signed).values_list('point',flat=True))

        return result
    def balanced_culture_points_social(self):

        signed = list(self.sign_up.values_list('id',flat=True))
        datas = BalancedCulture.getBal()
        result = sum(datas["사회"].filter(id__in = signed).values_list('point',flat=True))

        return result>=3
    def balanced_culture_points_nature(self):

        signed = list(self.sign_up.values_list('id',flat=True))
        datas = BalancedCulture.getBal()
        result = sum(datas["자연"].filter(id__in = signed).values_list('point',flat=True))

        return result
    def balanced_culture_points_enginnering(self):

        signed = list(self.sign_up.values_list('id',flat=True))
        datas = BalancedCulture.getBal()
        result = sum(datas["공학"].filter(id__in = signed).values_list('point',flat=True))

        return result
    def balanced_culture_points_art(self):

        signed = list(self.sign_up.values_list('id',flat=True))
        datas = BalancedCulture.getBal()
        result = sum(datas["예술"].filter(id__in = signed).values_list('point',flat=True))

        return result

    def total_major(self):
        if self.dept_type == "전공심화":
            return GraduationCiteria.objects.get(major = self.dept).deepMajor + GraduationCiteria.objects.get(major = self.dept).deepChoiceMajor
        elif self.dept_type == "복수전공":
            return GraduationCiteria.objects.get(major = self.dept).manyMajor1 + GraduationCiteria.objects.get(major = self.second_dept).manyMajor1
        else:
            return GraduationCiteria.objects.get(major = self.dept).essMajor + GraduationCiteria.objects.get(major = self.second_dept).subMajor

    def total_major_choice(self):
        if self.dept_type == "전공심화":
            return GraduationCiteria.objects.get(major = self.dept).deepChoiceMajor
        elif self.dept_type == "복수전공":
            return GraduationCiteria.objects.get(major = self.dept).manyMajor1
        else:
            return GraduationCiteria.objects.get(major = self.dept).essMajor
    def total_major_deep(self):
        if self.dept_type == "전공심화":
            return GraduationCiteria.objects.get(major = self.dept).deepMajor
        elif self.dept_type == "복수전공":
            return GraduationCiteria.objects.get(major = self.second_dept).manyMajor1
        else:
            return GraduationCiteria.objects.get(major = self.second_dept).subMajor

    def total_culture(self):
        return GraduationCiteria.objects.get(major = self.dept).essentialLiberal+ GraduationCiteria.objects.get(major = self.dept).choiceLiberal
    
    def total_culture_essential(self):
        return GraduationCiteria.objects.get(major = self.dept).essentialLibaral
    
    def total_cultuer_choice(self):
        return GraduationCiteria.objects.get(major = self.second_dept).choiceLiberal
