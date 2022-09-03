$(document).ready(function () {

    setModal();

    $('.detail_btn').click(function () {
        showModal($('.modal-wrap'));
    });

    $('.close-btn').click(function () {
        noneModal($('.modal-wrap'));
    });

});

function showModal($modalwrap) {
    $modalwrap.css('display', 'block');
}

function noneModal($modalwrap) {
    $modalwrap.css('display', 'none');
}

function setModal() {

    $.ajax({
        //요청이 전송될 URL 주소
        url: '',
        type: "POST",
        dataType: "JSON",
        data: {
            'name': '소프트웨어공학',
            'serialNumber': 'HAEA0008',
            'distribution': 1,
            'prof': '한혁수',
            'dept': '컴퓨터과학과',
            'time': '목(5,6,7)',
            'room': 'G211',
            'type': '전공심화',
            'point': 3,
            'year': '2022',
            'youngyuck': '영역',
            'take': true,

            csrfmiddlewaretoken: '{{ csrf_token }}'
        },
        headers: { "X-CSRFToken": "{{ csrf_token }}" },

        success: function (data) {
            console.log("2");
            var $title = data.name;
            var $classNumber = data.serialNumber;
            var $subjectType = data.type;
            var $distribution = data.distribution;
            var $professor = data.prof;
            var $grades = data.point;
            var $establishment = data.year;
            var $lectureRoom = data.room;
            var $lectureTime = data.time;
            var $department = data.dept;
            var $youngyuck = data.youngyuck;
            var $acceptance = data.take;

            $('#subjectDetail_title').append($title);
            $('#class_number').append('학수번호-분반: ' + $classNumber + '-' + $distribution);
            $('#subject_type').append('과목분류: ' + $subjectType + '(' + $youngyuck + ')');
            $('#professor').append('담당교수: ' + $professor);
            $('#grades').append('학점: ' + $grades + '학점');
            $('#establishment').append('개설연도: ' + $establishment);
            $('#lecture_room').append('강의실: ' + $lectureRoom);
            $('#lecture_time').append('강의시간: ' + $lectureTime);
            $('#department').append('개설학과: ' + $department);
            $('#acceptance').append('수강여부: ' + ($acceptance ? 'o' : 'x'));

        },
        error: function (xhr, textStatus, thrownError) {
            console.log("3");
            alert(
                "Could not send URL to Django. Error: " +
                xhr.status +
                ": " +
                xhr.responseText
            );
        },
    });
}
