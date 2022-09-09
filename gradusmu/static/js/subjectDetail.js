
function showModal($modalwrap) {
    $modalwrap.css('display', 'block');
}

function noneModal($modalwrap) {
    $('.modal-title, #class_number, #subject_type, #professor, #grades, #establishment, #lecture_room, #lecture_time, #department, #acceptance').empty();
    $modalwrap.css('display', 'none');
}

function setModal($userid,$dept_tye,$subjectid) {
    $.ajax({
        //요청이 전송될 URL 주소
        url: '/datas/subject_detail/',
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify({
            "user_id" : $userid,
            "dept_type" : $dept_tye,
            "subject_id" : $subjectid
        }),
        headers: { "X-CSRFToken": "{{ csrf_token }}" },

        success: function (data) {
            var $name = data.name;
            var $serialnum = data.serial_num;
            var $type = data.type;
            var $prof = data.prof;
            var $point = data.point;
            var $year = data.year;
            var $room = data.room;
            var $time = data.time;
            var $dept = data.dept;
            var $signed = data.signed;

            $('.modal-title').append($name);
            $('#class_number').append('학수번호-분반: ' + $serialnum);
            $('#subject_type').append('과목분류: '+ $type);
            $('#professor').append('담당교수: ' + $prof);
            $('#grades').append('학점: ' + $point);
            $('#establishment').append('개설연도: ' + $year);
            $('#lecture_room').append('강의실: ' + $room);
            $('#lecture_time').append('강의시간: ' + $time);
            $('#department').append('개설학과: ' + $dept);
            $('#acceptance').append('수강여부: ' + ($signed ? 'o' : 'x'));

        },
        error: function (xhr, textStatus, thrownError) {
            alert(
                "Could not send URL to Django. Error: " +
                xhr.status +
                ": " +
                xhr.responseText
            );
        },
    });
}
