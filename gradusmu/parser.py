
import django
import requests
from bs4 import BeautifulSoup
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()
from datas.models import subjects
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep


def parse_blog():
    i=0
    year = '2018'
    semester = "1학기"
    chromedriver = './chromedriver.exe'
    driver = webdriver.Chrome(chromedriver)
    driver.set_window_position(0, 0)
    driver.maximize_window()
    driver.get('https://smsso.smu.ac.kr/')
    wait = WebDriverWait(driver, 10)

    id = driver.find_element(By.ID,'user_id')
    id.send_keys('201810924')
    pwd = driver.find_element(By.ID,'user_password')
    pwd.send_keys('kjhkjs1004;')
    driver.find_element(By.CLASS_NAME,'btn_login').click()
    driver.find_element(By.XPATH ,'//*[@id="top_wrap"]/div[6]/ul/li[1]/a').click()
    driver.switch_to.window(driver.window_handles[-1])
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME,"cl-text-wrapper")))
    driver.find_element(By.CLASS_NAME,'cl-text-wrapper').send_keys(Keys.ENTER)

    wait.until(EC.element_to_be_clickable((By.CLASS_NAME,"-cl-tree-item-wrap")))
    datas = driver.find_elements(By.CLASS_NAME,'-cl-tree-item-wrap')[3]
    datas.click()
    datas = datas.find_elements(By.CSS_SELECTOR,'.sub-items>.-cl-tree-item-wrap')[0]
    datas.click()
    wait.until(EC.presence_of_element_located((By.CLASS_NAME,'search-box')))
    searchBox = driver.find_element(By.CLASS_NAME,'search-box')
    datas = searchBox.find_element(By.CSS_SELECTOR,'.cl-numbereditor>div>div>input')
    sleep(5)
    for i in range(4):
        datas.send_keys(Keys.BACK_SPACE)
    datas.send_keys(year)
    datas = searchBox.find_elements(By.CSS_SELECTOR,'.cl-combobox')[0].find_element(By.CLASS_NAME,"cl-text")
    for i in range(3):
        datas.send_keys(Keys.BACK_SPACE)
    datas.send_keys(semester)
    firstRow = driver.find_element(By.CLASS_NAME,"cl-first-row")
    datas = firstRow.find_element(By.CSS_SELECTOR,'.cl-layout>.cl-button>a')
    datas.send_keys(Keys.ENTER)

    wait.until(EC.presence_of_element_located((By.CLASS_NAME,"cl-grid-detail")))
    board = driver.find_element(By.CLASS_NAME,"cl-grid-detail")
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".cl-grid-detail>div>div:first-child>div>.cl-grid-cell-inherit>.cl-grid-row")))
    datas = board.find_elements(By.CSS_SELECTOR,".cl-grid-detail>div>div:first-child>div>.cl-grid-cell-inherit>.cl-grid-row")
    for row in datas:
            # if i<351:
            #     i+=1
            #     continue
            
            cells = row.find_elements(By.CLASS_NAME,"cl-grid-cell")
            new_subject = subjects()

            new_subject.serialNumber = cells[1].text[:8] # 학수번호
            new_subject.distribution = int(cells[1].text[9]) # 분반
            new_subject.name = cells[2].text # 교과목명
            new_subject.grade = int(cells[3].text) #학년
            new_subject.prof = cells[4].text #담당교수
            new_subject.dept = cells[5].text # 개설학부
            new_subject.time = cells[6].text[:cells[6].text.find('(')] # 강의시간
            new_subject.room = cells[6].text[cells[6].text.find('(')+1:cells[6].text.find(')')] #강의실
            new_subject.type = cells[7].text # 이수구분
            if cells[8].text.find('.')!=-1:
                point = int(cells[8].text[:cells[8].text.find('.')])
            else:
                point = int(cells[8].text)
            new_subject.point =  point# 학점
            new_subject.semester = int(semester[0]) #학기
            new_subject.year = int(year) #학년
            new_subject.save()

    pos = datas[-1]

    while True:
        
        driver.execute_script("arguments[0].scrollIntoView(true);", pos)
        
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,".cl-grid-detail>div>div:first-child>div>.cl-grid-cell-inherit>.cl-grid-row")))
        data = board.find_elements(By.CSS_SELECTOR,".cl-grid-detail>div>div:first-child>div>.cl-grid-cell-inherit>.cl-grid-row")[1:]
        
        if not data:
            break
        for row in data:
            # if i<351:
            #     i+=1
            #     continue
            cells = row.find_elements(By.CLASS_NAME,"cl-grid-cell")
            new_subject = subjects()

            new_subject.serialNumber = cells[1].text[:8] # 학수번호
            new_subject.distribution = int(cells[1].text[9]) # 분반
            new_subject.name = cells[2].text # 교과목명
            new_subject.grade = int(cells[3].text) #학년
            new_subject.prof = cells[4].text #담당교수
            new_subject.dept = cells[5].text # 개설학부
            new_subject.time = cells[6].text[:cells[6].text.find('(')] # 강의시간
            new_subject.room = cells[6].text[cells[6].text.find('(')+1:cells[6].text.find(')')] #강의실
            new_subject.type = cells[7].text # 이수구분
            if cells[8].text.find('.')!=-1:
                point = int(cells[8].text[:cells[8].text.find('.')])
            else:
                point = int(cells[8].text)
            new_subject.point =  point# 학점
            new_subject.semester = int(semester[0]) #학기
            new_subject.year = int(year) # 개설연도
            new_subject.save()
        pos = data[-1]
        
    driver.quit()
    # html = req.text
    # soup = BeautifulSoup(html, 'html.parser')
    # my_titles = soup.select(
    #     'h3 > a'
    #     )
    # data = {}
    # for title in my_titles:
    #     data[title.text] = title.get('href')
    # return data

## 이 명령어는 이 파일이 import가 아닌 python에서 직접 실행할 경우에만 아래 코드가 동작하도록 합니다.
if __name__ == '__main__':
    blog_data_dict = parse_blog()
    # for t, l in blog_data_dict.items():
    #     BlogData(title=t, link=l).save()
