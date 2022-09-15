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
        $('#subjectTableTbody').append('<tr><td colspan="6" style="background-color: white; border: 0.5px solid black; border-top: none; margin-top: 0;">수강하신 과목이 존재하지 않습니다.</td></tr>');
    }
    if(length > 0){
        $('#subjectTableTbody').html('<tr class="tbodyTr"> <td>' + data[0]['name'] + '</td><td>' + data[0]['serial_num'] + '</td><td>' + data[0]['prof'] + '</td><td>' + data[0]['point'] + '</td><td><button type="button" class="deleteSubjectBtn" id="' + data[0]['id'] + '" onclick="deleteSubject(' + data[0]['id'] + ')")>삭제하기</button></td><td><button type="button" class="detailSubjectBtn" id="' + data[0]['id'] + '">상세정보</button></td>');
        for(var i = 1; i < length; i++){
            $('#subjectTableTbody').append('<tr class="tbodyTr"> <td>' + data[i]['name'] + '</td><td>' + data[i]['serial_num'] + '</td><td>' + data[i]['prof'] + '</td><td>' + data[i]['point'] + '</td><td><button type="button" class="deleteSubjectBtn" id="' + data[i]['id'] + '" onclick="deleteSubject(' + data[i]['id'] + ')")>삭제하기</button></td><td><button type="button" class="detailSubjectBtn" id="' + data[i]['id'] + '">상세정보</button></td>');
        }
    }
}

function set_dropbox() {
    var select_child = $('#select2');

    $('#select1').change(function () {
        if (this.value == '전공') {
            var option_child_arr = ['전심', '전선'];
        }
        else {
            var option_child_arr = ['균교', '교필', '교선'];
        }

        $('#select2 option').remove()
        option_child_arr.forEach(function (i) {
            var option_child = document.createElement('option');
            $(option_child).val(i);
            $(option_child).text(i);
            select_child.append(option_child);
        });
        $("#select2 option:eq(0)").prop("selected", true);
        $('#select2').trigger('change');
    });

    $('#select2').change(function () {
        getSubject();
    });

    $('#select3').change(function () {
        getSubject();
    })
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
            setBtn(dept_type);  //modal setting btn 함수 호출
        }, 
        error: function(){
            alert('못 가져오는뎈?');
        }
    })
}

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

function deleteSubject(num){
    $.ajax({
        type:"DELETE",
        url: 'datas/delete/',
        data: JSON.stringify({
            "user_id" : user_id,
            "subject_id": num
        }),
        success: function(){
            alert('삭제되었습니다.');
            location.reload();
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
    setPieChart();
    set_dropbox();
})

function setPieChart(){
    let major_int = parseInt(major);
    let culture_int = parseInt(culture);
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
          labels: ["전공", "교양"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#2BCE1C", "#FFC700"],
              data: [major_int,culture_int]
            }
          ]
        }
    });
}
