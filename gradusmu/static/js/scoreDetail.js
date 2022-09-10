function checkOnlyOne(element) {
    const checkboxes = document.getElementsByName("subject");
    
    checkboxes.forEach((cb) => {
      cb.checked = false;
    })
    
    element.checked = true;
}


$(document).ready(function(){
    getTotalScore();
    getEssentialTable();
    $('.selectCultureType').change(function(){
        getEssentialTable();
    })
    // $('input:checkbox[value="인문"]').is(":checked") == true;
    // alert($('.selectEssentialType input:checkbox').is(':checked'));
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

function getEssentialTable(){
    var dept_type = $('#selectCultureType').val();
    $.ajax({
        type: 'POST',
        url: '/datas/balanced_culture/',
        data: JSON.stringify({
            "user_id" : user_id,
            "dept_type": dept_type
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
        $('#subjectTable').append('<div style="display: flex; justify-content: center; padding: 40px 0; border: 1px solid black; border-top: none; background-color: white; width: initial; text-align:center;">수강하신 과목이 존재하지 않습니다.</div>');
    }
    if(length > 0){
        $('#subjectTableTbody').html('<tr class="tbodyTr"> <td>' + data[0]['name'] + '</td><td>' + data[0]['serial_num'] + '</td><td>' + data[0]['prof'] + '</td><td>' + data[0]['point'] + '</td><td>' + data[0]['signed'] + '</td><td><button type="button" class="detailSubjectBtn" id="' + data[0]['id'] + '">상세정보</button></td>');
        for(var i = 1; i < length; i++){
            $('#subjectTableTbody').append('<tr class="tbodyTr"> <td>' + data[i]['name'] + '</td><td>' + data[i]['serial_num'] + '</td><td>' + data[i]['prof'] + '</td><td>' + data[i]['point'] + '</td><td>' + data[i]['signed'] + '</td><td><button type="button" class="detailSubjectBtn" id="' + data[i]['id'] + '">상세정보</button></td>');
        }
    }
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
