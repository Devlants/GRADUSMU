from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Q

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
    image = models.ImageField(upload_to="image",default = "/static/img/person.png")
    sign_up = models.ManyToManyField("datas.subjects")

    def total_points(self):
        return sum(self.sign_up.values_list('point',flat = True))

    def major_points(self):
        return sum(self.sign_up.filter(Q(type = "1전심")|Q(type = "1전선")).values_list('point',flat = True))
    
    def choice_major_points(self):
        return sum(self.sign_up.filter(Q(type = "1전선")).values_list('point',flat = True))
    
    def deep_major_points(self):
        return sum(self.sign_up.filter(Q(type = "1전심")).values_list('point',flat = True))
    
    def culture_points(self):
        return sum(self.sign_up.filter(Q(type = "교선")|Q(type = "교필")).values_list('point',flat = True))
    
    def choice_culture_points(self):
        return sum(self.sign_up.filter(Q(type = "교선")).values_list('point',flat = True))
    
    def essential_culture_points(self):
        return sum(self.sign_up.filter(Q(type = "교필")).values_list('point',flat = True))