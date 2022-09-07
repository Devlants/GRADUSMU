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

function getSubject(){
    var dept_type = $('#select2').val();
    var year = $('#select3').val();

    $.ajax({
        type:"POST",
        url: 'datas/signed_search',
        data: JSON.stringify({
            "user_id" : user_id,
            "dept_type" : dept_type,
            "year" : year
        }),
        success: function(data){
            console.log(data);
        }, 
        error: function(){
            alert('못 가져오는뎈?');
        }
    })
}

$(document).ready(function(){
    getSubject();
})