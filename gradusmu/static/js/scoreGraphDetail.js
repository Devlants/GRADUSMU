//테이블 채우기
function putSubjectTable(data){
    $('#subjectTableTbody').html('');
    var length = Object.keys(data).length;
    for(var i = 0; i < length; i++){
        if((data[i]['signed']) == true){
            data[i]['signed'] = 'O';
        }else{
            data[i]['signed'] = 'X';
        }
    }
    if(length == 0){
        $('#subjectTableTbody').append('<tr><td colspan="6" style="background-color: white; border: 0.5px solid black; border-top: none; margin-top: 0;">수강하신 과목이 존재하지 않습니다.</td></tr>');
    }
    if(length > 0){
        $('#subjectTableTbody').html('<tr class="tbodyTr"> <td>' + data[0]['name'] + '</td><td>' + data[0]['serial_num'] + '</td><td>' + data[0]['prof'] + '</td><td>' + data[0]['point'] + '</td><td>' + data[0]['signed'] + '</td><td><button type="button" class="detailSubjectBtn" id="' + data[0]['id'] + '">상세정보</button></td>');
        for(var i = 1; i < length; i++){
            $('#subjectTableTbody').append('<tr class="tbodyTr"> <td>' + data[i]['name'] + '</td><td>' + data[i]['serial_num'] + '</td><td>' + data[i]['prof'] + '</td><td>' + data[i]['point'] + '</td><td>' + data[i]['signed'] + '</td><td><button type="button" class="detailSubjectBtn" id="' + data[i]['id'] + '">상세정보</button></td>');
        }
    }
}


//select 드롭다운 보이기(교양일 때)
function getSelect(data){
    if(data == '균형교양'){
        $('.subjectSelect').html('<select id="selectWhat"><option value="인문">인문</option><option value="사회">사회</option><option value="자연">자연</option><option value="공학">공학</option><option value="예술">예술</option></select>');
        getSubject('균형교양');
    }

    if(data == '핵심교양'){
        $('.subjectSelect').html('<select id="selectWhat"><option value="창의적문제해결역량">창의적문제해결</option><option value="융복합역량">융복합</option><option value="다양성존중역량">다양성존중</option><option value="윤리실천역량">윤리실천</option></select>');
        getSubject('핵심교양');
    }

    if(data == '기초교양'){
        $('.subjectSelect').html('<select id="selectWhat"><option value="사고와표현">사고와표현</option><option value="EnglishFoundations">영어</option><option value="기초수학">수학</option><option value="컴퓨팅사고와데이터의이해">컴퓨팅사고</option><option value="알고리즘과게임콘텐츠">알고리즘</option><option value="교양과인성">교양과인성</option></select>')
        getSubject('기초교양');
    }
}


//과목 가져오기
function getSubject(data){
    var dept_type = $('#selectWhat').val();
    if(data == '균형교양'){
        $.ajax({
            type:"POST",
            url: '/datas/balanced_culture/',
            data: JSON.stringify({
                "user_id" : user_id,
                "dept_type" : dept_type
            }),
            success: function(data){
                putSubjectTable(data);
                setBtn(dept_type);
            }, 
            error: function(){
                alert('못 가져오는뎈?');
            }
        })
    }
    if(data == '핵심교양'){
        $.ajax({
            type:"POST",
            url: '/datas/core_culture/',
            data: JSON.stringify({
                "user_id" : user_id,
                "dept_type" : dept_type
            }),
            success: function(data){
                putSubjectTable(data);
                setBtn(dept_type);
            }, 
            error: function(){
                alert('못 가져오는뎈?');
            }
        })
    }
    if(data == '기초교양'){
        $.ajax({
            type:"POST",
            url: '/datas/ess_culture/',
            data: JSON.stringify({
                "user_id" : user_id,
                "dept_type" : dept_type
            }),
            success: function(data){
                putSubjectTable(data);
                setBtn(dept_type);
            }, 
            error: function(){
                alert('못 가져오는뎈?');
            }
        })
    }
}

//전공 가져오기
function getMajor(){
    if(graphTitle == "전공심화"){
        $.ajax({
            type: 'POST',
            url: '/datas/many_major/',
            data: JSON.stringify({
                "user_id" : user_id,
                "dept" : "전심"
            }),
            success: function(data){
                putSubjectTable(data);
                setBtn(data.dept);
            }, 
            error: function(){
                alert('못 가져오는뎈?');
            }
    
        })
    }
    if(graphTitle == "전공선택"){
        $.ajax({
            type: 'POST',
            url: '/datas/many_major/',
            data: JSON.stringify({
                "user_id" : user_id,
                "dept" : "전선"
            }),
            success: function(data){
                putSubjectTable(data);
                setBtn(data.dept);
            }, 
            error: function(){
                alert('못 가져오는뎈?');
            }
    
        })
    }
    if(graphTitle == "주전공" || graphTitle == "전공1"){
        $.ajax({
            type: 'POST',
            url: '/datas/many_major/',
            data: JSON.stringify({
                "user_id" : user_id,
                "dept" : user_main_dept
            }),
            success: function(data){
                putSubjectTable(data);
                setBtn(data.dept);
            }, 
            error: function(){
                alert('못 가져오는뎈?');
            }
    
        })
    }
    if(graphTitle == "부전공" || graphTitle == "전공2"){
        $.ajax({
            type: 'POST',
            url: '/datas/many_major/',
            data: JSON.stringify({
                "user_id" : user_id,
                "dept" : user_second_dept
            }),
            success: function(data){
                putSubjectTable(data);
                setBtn(data.dept);
            }, 
            error: function(){
                alert('못 가져오는뎈?');
            }
    
        })
    }
}

$(document).ready(function(){
    if(graphTitle.includes('전공')){
        getMajor();
    }else{
        getSelect(graphTitle);
    }
    $('.subjectSelect').change(function(){
        getSubject(graphTitle);
    })
})


// modal setting 하는 btn 
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

