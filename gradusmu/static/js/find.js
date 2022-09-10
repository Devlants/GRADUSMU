var classMajor_a =
["역사콘텐츠전공", "지적재산권전공", "문헌정보학전공", "한일문화콘텐츠학과", "공간환경학부", 
"공공인재학부", "행정학부", "가족복지학과", "국가안보학과", "문화콘텐츠연계전공", "빅데이터과학연계전공", 
"공간정보빅데이터연계전공", "영유아체육과건강교육연계전공", "아동청소년상담연계전공", "디지털인문정보융합전공"];
var classMajor_b = 
["국어교육과", "영어교육과", "교육학과", "수학교육과"];
var classMajor_c = 
["경제금융학부", "경영학부", "글로벌경영학과", "융합경영학과", "부동산학연계전공", "빅데이터애널리틱스융합전공",
"스마트생산융합전공", "신산업비즈니스융합전공", "핀테크인텔리전스융합전공"];
var classMajor_d = 
["지능·데이터융합학부", "휴먼지능정보공학전공", "핀테크전공", "빅데이터융합전공", "스마트생산전공",
"SW융합학부", "컴퓨터과학전공", "전기공학전공", "지능IOT융합전공", "게임전공", "애니메이션전공",
"한일문화콘텐츠전공", "융합전자공학전공", "생명화학공학부", "생명공학전공", "화학에너지공학전공",
"화공신소재전공", "콘텐츠제작연계전공", "지능정보융합전공", "게임애니메이션AI융합전공", "금융데이터AI융합전공",
"인공지능융합전공", "바이오헬스디바이스융합전공", "바이오헬스데이터융합전공", "바이오헬스디자인융합전공"];
var classMajor_e = 
["식품영양학전공", "의류학전공", "스포츠무용학부", "스포츠건강관리전공", "무용예술전공", "조형예술전공",
"생활예술전공", "음악학부", "외식경영학연계전공", "미디어아트연계전공", "음악경영학연계전공", "문화예술교육융합전공"];

//학부선택 드롭박스 변경 기능
function categoryChange(classDepart) {
    var target = document.getElementById("classMajor");
 
    if(classDepart.value == "인문사회과학대학") var major = classMajor_a;
    else if(classDepart.value == "사범대학") var major = classMajor_b;
    else if(classDepart.value == "경영경제대학") var major = classMajor_c;
    else if(classDepart.value == "융합공과대학") var major = classMajor_d;
    else if(classDepart.value == "문화예술대학") var major = classMajor_e;
 
    target.options.length = 1;
   // document.createElement("option selected disabled");
    for (x in major) {
        var opt = document.createElement("option");
        opt.value = major[x];
        opt.innerHTML = major[x];
        target.appendChild(opt);
    }    
}

//Id찾기 버튼과 연결 - 정보입력확인
function findId() {
    let name = document.getElementById("name").ariaValueNow
    let grade = document.getElementById("grade").value
    let classNum = document.getElementById("classNum").value
    let classDepart = document.getElementById("classDepart").value
    let classMajor = document.getElementById("classMajor").value
    let check = true;

    // 이름확인
    if(name===""){
        alert("이름을 입력해주세요");
        check = false
    }
  
    // 학적정보 확인
    if(grade === "선택" || classNum === ""  || classDepart === "대학 선택" || classMajor === "학부/학과 선택"){
      alert("학적정보를 정확히 입력해주세요")
      check = false
    }
  
    if(check){ //모두 check가 되었다면
      $("#ID_Submit").trigger("click");
    }
  }