function editProfileImg(){
    let profile = document.getElementById("profileImgBtn");
    profile.click();
    $('#profileImgBtn').change(function(){
        postProfileImg();
    })
}

function postProfileImg(){
    var form = $('#uploadForm')[0];
    const formData = new FormData(form);
    $.ajax({
        type: "POST",
        url: 'accounts/profile_img/',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function(data){
            location.reload();
            alert('프로필 사진이 성공적으로 변경되었습니다.');
        },
        complete: function(data){
        }
    })
}

function putSubjectTable(data){
    $('#subjectTableTbody').html('');
    var length = Object.keys(data).length;
    if(length == 0){
        $('#subjectTableTbody').html('수강하신 과목이 존재하지 않습니다.');
    }
    if(length > 0){
        $('#subjectTableTbody').html('<tr class="tbodyTr"> <td>' + data[0]['name'] + '</td><td>' + data[0]['serial_num'] + '</td><td>' + data[0]['prof'] + '</td><td>' + data[0]['point'] + '</td><td><button type="button" class="deleteSubjectBtn" id="' + data[0]['id'] + '" onclick="deleteSubject(' + data[0]['id'] + ')")>삭제하기</button></td><td><button type="button" class="detailSubjectBtn" id="' + data[0]['id'] + '">상세정보</button></td>');
        for(var i = 1; i < length; i++){
            $('#subjectTableTbody').append('<tr class="tbodyTr"> <td>' + data[i]['name'] + '</td><td>' + data[i]['serial_num'] + '</td><td>' + data[i]['prof'] + '</td><td>' + data[i]['point'] + '</td><td><button type="button" class="deleteSubjectBtn" id="' + data[i]['id'] + '" onclick="deleteSubject(' + data[i]['id'] + ')")>삭제하기</button></td><td><button type="button" class="detailSubjectBtn" id="' + data[i]['id'] + '">상세정보</button></td>');
        }
    }
}

function getSubject(){
    var dept_type = $('#select2').val();
    var year = $('#select3').val();

    $.ajax({
        type:"POST",
        url: 'datas/signed_search/',
        data: JSON.stringify({
            "user_id" : user_id,
            "dept_type" : dept_type,
            "year" : year
        }),
        success: function(data){
            putSubjectTable(data);
        }, 
        error: function(){
            alert('못 가져오는뎈?');
        }
    })
}

function deleteSubject(num){
    $.ajax({
        type:"DELETE",
        url: 'datas/delete/',
        data: JSON.stringify({
            "user_id" : user_id,
            "subject_id": num
        }),
        success: function(data){
            alert('삭제되었습니다.');
            putSubjectTable(data);
        }, 
        error: function(){
            alert('못 가져오는뎈?');
        }
    })
}

$(document).ready(function(){
    $('#subjectTableTbody').html('');
    getSubject();
    $('.selecBasicInformation').change(function(){
        getSubject();
    })
})

