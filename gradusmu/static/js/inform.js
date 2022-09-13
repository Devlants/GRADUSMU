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

function categoryChange(classDepart) {
  var target = document.getElementById("classMajor");
  var plustarget = document.getElementById("plus_classMajor");

  if(classDepart.value == "인문사회과학대학") var major = classMajor_a;
  else if(classDepart.value == "사범대학") var major = classMajor_b;
  else if(classDepart.value == "경영경제대학") var major = classMajor_c;
  else if(classDepart.value == "융합공과대학") var major = classMajor_d;
  else if(classDepart.value == "문화예술대학") var major = classMajor_e;

  target.options.length = 1;
  plustarget.options.length = 1;
 // document.createElement("option selected disabled");
  for (x in major) {
      var opt = document.createElement("option");
      opt.value = major[x];
      opt.innerHTML = major[x];
      target.appendChild(opt);
  }    
}

//전공분류 하위의 학적정보 dropbox 선택 함수입니다.
function categoryChange_plus(classDepart) {
  var plustarget = document.getElementById("plus_classMajor");

  if(classDepart.value == "인문사회과학대학") var major = classMajor_a;
  else if(classDepart.value == "사범대학") var major = classMajor_b;
  else if(classDepart.value == "경영경제대학") var major = classMajor_c;
  else if(classDepart.value == "융합공과대학") var major = classMajor_d;
  else if(classDepart.value == "문화예술대학") var major = classMajor_e;

  plustarget.options.length = 1;
 // document.createElement("option selected disabled");
  for (x in major) {
      var opt = document.createElement("option");
      opt.value = major[x];
      opt.innerHTML = major[x];
      plustarget.appendChild(opt);
  }    
}


//비밀번호 수정하기 버튼을 누르면 비밀번호 수정 폼이 나타납니다.
function pwdFormOn() {
  if ( document.getElementById('changePwd').style.display == "block") {
    document.getElementById('changePwd').style.display = "none";
  } else {
    document.getElementById('changePwd').style.display = "block";
  }
}

//심화전공 선택시 전공분류 하위 학적정보 display가 none이 됩니다.
function showDeptType() {
  var radioChecked = document.querySelector('input[type=radio][name="dept_type"]:checked');
  if (radioChecked.value === '전공심화') {
    document.getElementById("plusMajor").style.display = "none";
  } else {
    document.getElementById("plusMajor").style.display = "flex";
  }}

$(document).ready(function () {
  $('input[type=radio][name="dept_type"]').on('change', function() {
    if (this.value === '전공심화') {
      document.getElementById("plusMajor").style.display = "none";
    } else {
      document.getElementById("plusMajor").style.display = "flex";
    }
  });
}
);

//수정폼에 기존정보 나타나기
$(document).ready(function() {
  document.getElementById("grade").value = grade; //학년
  //document.getElementById("classDepart").value = universe;
  $("#classDepart").val(universe).prop("selected", true); //대학
  $("#classDepart").change(categoryChange(classDepart));
  $("#classMajor").val(dept).prop("selected", true); //학부

  //$("input:radio[name='dept_type']").prop('checked', false); 
  $("input:radio[name='dept_type']:radio[value='"+dept_type+"']").prop('checked', true); //전공분류
  showDeptType(); //전공분류 드롭박스 보여주기
  document.getElementById("plus_classDepart").value = second_universe;
  $("#plus_classDepart").change(categoryChange_plus(plus_classDepart));
  $("#plus_classMajor").val(second_dept).prop("selected", true); 
});


function updatePwd() {
  var presentPwd = $('#presentPwd').val()
  var newPwd = $('#NewPwdCheck').val()

  //if (presentPwd==false) then alert("올바르지 않은 비밀번호입니다.")
  if(email == ''){
    alert('아이디를 입력해주세요.')
    return;
  }

  $.ajax({
    url: '/accounts/change_pwd/',
    type: "POST",
    dataType: "JSON",
    data: JSON.stringify({
      "user_id": user_id,
      "password" : newPwd }
      ),
    headers: { "X-CSRFToken": "{{ csrf_token }}" },

    success: function(result){
      console.log(result.is_changed);
      if(result.is_changed == true){
        alert("비밀번호가 변경되었습니다. 다시 로그인해 주세요.");
        var url = '/accounts/login/'
        location.replace(url);
        return;
      } else {
        alert("실패");
        return;
      }
    },

    error: function (xhr, textStatus, thrownError) {
      alert(
          "Could not send URL to Django. Error: " +
          xhr.status +
          ": " +
          xhr.responseText
      );
    },
  })
}

//form 입력창의 값이 유효한지 확인 후 수정 submit 합니다.
function modifyingCheck() {
  let email = document.getElementById("email").value
  let name = document.getElementById("name").value
  let grade = document.getElementById("grade").value
  let classNum = document.getElementById("classNum").value
  let classDepart = document.getElementById("classDepart").value
  let classMajor = document.getElementById("classMajor").value
  let check = true;

  // 이름확인
  if(name===""){
      document.getElementById("nameError").innerHTML="이름이 올바르지 않습니다."
      check = false
  }else{
      document.getElementById("nameError").innerHTML=""
  }

  // 이메일확인
  if(email.includes('@')){
    let emailId = email.split('@')[0]
    let emailServer = email.split('@')[1]
    if(emailId === "" || emailServer === ""){
      document.getElementById("emailError").innerHTML="이메일이 올바르지 않습니다."
      check = false
    }
    else{
      document.getElementById("emailError").innerHTML=""
    }
  }else{
    document.getElementById("emailError").innerHTML="이메일이 올바르지 않습니다."
    check = false
  }
  
  // 학적정보 확인
  if(grade === "선택" || classNum === ""  || classDepart === "대학 선택" || classMajor === "학부/학과 선택"){
    document.getElementById("classInformError").innerHTML="학적정보를 정확히 입력해주세요"
    check = false
  }else{
    document.getElementById("classInformError").innerHTML=""
  }

  if(check){ //모두 check가 되었다면
    document.getElementById("emailError").innerHTML=""
    document.getElementById("nameError").innerHTML=""
    document.getElementById("passwordError").innerHTML=""
    document.getElementById("passwordCheckError").innerHTML=""
    document.getElementById("classInformError").innerHTML=""

    $("#submit").trigger("click");
  }
}