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

let ableCheck = false;

$(document).ready(function() {
  $("#password").prop('disabled', true);
  $("#passwordCheck").prop('disabled', true); 
});


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
    let name = document.getElementById("name").value
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
  
    if(check){ //모두 check가 되었다면 아이디 찾기
    //  $("#ID_Submit").trigger("click");
    $.ajax({
      url: '/accounts/find_id/',
      type: "POST",
      dataType: "JSON",
      data: JSON.stringify({
        "name" : name,
        "grade" : grade,
        "student_num" : classNum,
        "universe" : classDepart,
        "dept" : classMajor,
      }),
      headers: { "X-CSRFToken": "{{ csrf_token }}" },

      success: function(result){
        console.log(result.id);
        if(result.is_find == true){
          alert("아이디 찾기 성공");
          $("#resultId").css("display","flex");
          $("#resultId").text("Id는 "+result.id+" 입니다"); //화면에 띄우기
          return;
        } else {
          alert("아이디가 존재하지 않습니다.");
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
  }

var checkNum = ""

function sendNumber() {
  //인증번호 보내기
  $.ajax({
    url: '/accounts/find_pwd/send_email/',
    type: "POST",
    dataType: "JSON",
    data: JSON.stringify({
      "id" : $('#UserId').val(),
      "email" : $('#email').val(),
    }),
    headers: { "X-CSRFToken": "{{ csrf_token }}" },

    success: function(result){
      ableCheck = true;
      console.log(ableCheck);
      if(result.is_sent == true){
        alert("이메일로 인증번호가 발송되었습니다.");
        checkNum = result.certificationNumber;

      } else {
        alert("실패");
        return;
      }

      if (ableCheck === true) { //인증번호 발송되었을 떄 input입력가능
        $("#password").prop('disabled', false);
        $("#passwordCheck").prop('disabled', false); 
      } else {
        $("#password").prop('disabled', true);
        $("#passwordCheck").prop('disabled', true); 
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

var checkNumber = 0;

function sendNumCheck() {
  //인증번호 체크
  if($("#checkNum").val() == checkNum) {
    alert("인증번호가 일치합니다.")
    checkNumber = 1;
    console.log(checkNumber)
  } else {
    alert("인증번호가 일치하지 않습니다.")
    checkNumber = 0;
    console.log(checkNumber)
  }
}

function newPwd() {
  //비밀번호 변경
  console.log(checkNumber)
  let Pwd = $('#password').val();
  let PwdCheck = $('#passwordCheck').val();

  if (Pwd !== PwdCheck) {
    checkNumber = 2;
  } else {
    checkNumber = 1;
  }

  if (checkNumber === 1) {
    $.ajax({
      url: '/accounts/find_pwd/change_pwd/',
      type: "PUT",
      dataType: "JSON",
      data: JSON.stringify({
        "id" : $('#UserId').val(),
        "pwd" : $('#passwordCheck').val(),
      }),
      headers: { "X-CSRFToken": "{{ csrf_token }}" },

      success: function(result){
        console.log(result.is_changed);
        if(result.is_changed == true){
          alert("비밀번호가 성공적으로 변경되었습니다.");
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
} else if (checkNumber === 0) {
  alert("인증번호가 일치하지 않습니다.");
} else {
  alert("비밀번호가 일치하지 않습니다.");
}
}

function unableInput() {

  
}