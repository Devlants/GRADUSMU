function checkOnlyOne(element) {
    const checkboxes = document.getElementsByName("subject");
    
    checkboxes.forEach((cb) => {
      cb.checked = false;
    })
    
    element.checked = true;
}

//내가 들은 균형교양 영역 확인해보기
function getBalanceCategory(){
    $.ajax({
        type: 'POST',
        url: '/datas/checkBal/',
        data: JSON.stringify({
            'user_id' : user_id
        }),
        success: function(data){
            console.log(data);
            checkBalanceCategory(data);
        }
    })
}

function checkBalanceCategory(data){
    if(data['Liberal'] == true){
        $("input:checkbox[value='인문']").prop("checked",true);  
    }
    if(data['Society'] == true){
        $("input:checkbox[value='사회']").prop("checked",true);  
    }
    if(data['Natural'] == true){
        $("input:checkbox[value='자연']").prop("checked",true);  
    }
    if(data['Engineering'] == true){
        $("input:checkbox[value='공학']").prop("checked",true);  
    }
    if(data['Art'] == true){ 
        $("input:checkbox[value='예술']").prop("checked",true);  
    }
}

//내가 들은 기초교양 확인하기
function getBasicCategory(){
    $.ajax({
        type: 'POST',
        url: '/datas/checkESS/',
        data: JSON.stringify({
            'user_id' : user_id
        }),
        success: function(data){
            console.log(data);
            checkBasicCategory(data);
        }
    })
}

function checkBasicCategory(data){
    if(data['Think'] == true){
        $("input:checkbox[value='Think']").prop("checked",true);  
    }
    if(data['English'] == true){
        $("input:checkbox[value='English']").prop("checked",true);  
    }
    if(data['Math'] == true){
        $("input:checkbox[value='Math']").prop("checked",true);  
    }
    if(data['Computing'] == true){
        $("input:checkbox[value='Computing']").prop("checked",true);  
    }
    if(data['Algorithm'] == true){ 
        $("input:checkbox[value='Algorithm']").prop("checked",true);  
    }
    if(data['Refinement'] == true){ 
        $("input:checkbox[value='Refinement']").prop("checked",true);  
    }
}

//내가 들은 핵심교양 확인하기
function getCoreCategory(){
    $.ajax({
        type: 'POST',
        url: '/datas/checkCore/',
        data: JSON.stringify({
            'user_id' : user_id
        }),
        success: function(data){
            console.log(data);
            checkCoreCategory(data);
        }
    })
}

function checkCoreCategory(data){
    if(data['Creative'] == true){
        $("input:checkbox[value='Creative']").prop("checked",true);  
    }
    if(data['English'] == true){
        $("input:checkbox[value='Convergence']").prop("Convergence",true);  
    }
    if(data['Diversity'] == true){
        $("input:checkbox[value='Diversity']").prop("checked",true);  
    }
    if(data['Ethics'] == true){
        $("input:checkbox[value='Ethics']").prop("checked",true);  
    }
}

//자기 전공 해당 영역 확인하기
function checkApplicableMajor(){
    $.ajax({
        type: 'POST',
        url: '/datas/sendMyBal/',
        data: JSON.stringify({
            "user_id": user_id
        }),
        success: function(data){
            $("#" + data['result']).css("display", 'none'); 
            $('.selectEssentialType').append('<div style="font-size: 1rem; color: rgb(91, 91, 91);">('+ data['result'] + '제외)</div');
            // $("#" + data['result']).css('text-decoration', 'navy line-through'); 
            // $("#" + data['result']).css('text-decoration-thickness', '3px');
        }
    })
}

$(document).ready(function(){
    getTotalScore();
    checkApplicableMajor();
    getBalanceCategory();
    getBasicCategory();
    getCoreCategory();
})

function getTotalScore(){
    var total = user_total_point / 130 * 100;
    var major = user_major_point / user_total_major_point * 100;
    var choice_major = user_choice_major_point / user_total_choiceMajor_point * 100;
    var deep_major = user_deep_major_point / user_total_deepMajor_point * 100;
    var culture = user_culture_point / 33 * 100;
    $('.totalScoreGraph').css('width', total + '%');
    $('.majorScoreGraph').css('width', major + '%');
    $('.majorSelectScoreGraph').css('width', choice_major + '%');
    $('.deepMajorScoreGraph').css('width', deep_major + '%');
    $('.cultureScoreGraph').css('width', culture + '%');
}

function setBtn($dept_tye) {

    $('.detailSubjectBtn').click(function () {
        var $subject_id = $(this).attr('id');
        setModal(user_id,$dept_tye,$subject_id);
        console.log($subject_id);
        showModal($('.modal-wrap'));
    });

    $('.close-btn').click(function () {
        noneModal($('.modal-wrap'));
    });
}
