from django.db import models

# Create your models here.

# J 이수학점 MODEL
class GraduationCiteria(models.Model):
    underGra = models.CharField(max_legnth=50)  #학부
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


class EssentialLiberalArtsSortation(models.Model):
    name = models.CharField(null=True)

class EssentialLiberalArts(models.Model):
    name = models.CharField(null=True)
    sort = models.ForeignKey(EssentialLiberalArtsSortation, on_delete=models.CASCADE)


class BalancedCultureSortation(models.Model):
    name = models.CharField(null=True)



class BalancedCulture(models.Model):
    name = models.CharField(null=True)
    sort = models.ForeignKey(BalancedCultureSortation, on_delete=models.CASCADE)



