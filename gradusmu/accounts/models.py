from django.db import models
from django.contrib.auth.models import AbstractUser

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
    second_dept = models.CharField(max_length = 50,null=False)
