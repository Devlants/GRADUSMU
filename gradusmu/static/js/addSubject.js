let date = new Date();
let grade_year = date.getFullYear().toString().substring(2);
var grade = [];
for (i = grade_year; i>=18;i--){
    grade.push([i,2]);
    grade.push([i,1]);
}
$(document).ready(function () {
    grade.forEach(function (item) {
        let option_third = document.createElement('option');
        $(option_third).val(item[0] + '년도 ' + item[1] + '학기');
        $(option_third).text(item[0] + '년도 ' + item[1] + '학기');
        $('#third-drop').append(option_third);
    });
    $("#third-drop option:eq(0)").prop("selected", true);
    set_page();
});

function set_page() {
    init_mainarea(user_id,"전심", "22년도 2학기");
    set_dropbox()
}

function init_mainarea($userid,$dept_tye,$year){
    $.ajax({
        //요청이 전송될 URL 주소
        url: '/datas/unsigned_search/',
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify({
            "user_id": $userid,
            "dept_type": $dept_tye,
            "year": $year
        }),
        headers: { "X-CSRFToken": "{{ csrf_token }}" },

        success: function (data) {
            var vlist = Object.values(data);
            set_mainarea(vlist);
            setBtn();
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

function set_dropbox() {
    var select_parent = $('#select-parent');
    var select_child = $('#select-child');
    var select_thrid = $('#third-drop');
    $('#third-drop option:eq(0)').text(grade[0][0]+"년도 "+grade[0][1]+"학기");

    $('#select-parent').change(function () {
        if (this.value == '전공') {
            var option_child_arr = ['전심', '전선'];
        }
        else {
            var option_child_arr = ['균교', '교필', '교선'];
        }

        $('#select-child option').remove()
        option_child_arr.forEach(function (i) {
            var option_child = document.createElement('option');
            $(option_child).val(i);
            $(option_child).text(i);
            select_child.append(option_child);
        });
        $("#select-child option:eq(0)").prop("selected", true);
        $('#select-child').trigger('change');
    });

    $('#select-child').change(function () {
        var dept = select_child.val();
        var year = $("#third-drop").val();
        console.log(user_id,dept,year);
        print_mainarea(user_id, dept, year);
    });

    $('#third-drop').change(function () {
        var dept = select_child.val();
        var year = $(this).val();
        console.log(user_id,dept,year);
        print_mainarea(user_id, dept, year);
    })
}


function set_mainarea(vlist) {
    var container = $('#main_area');
    vlist.forEach(function (item) {
        var i = Object.keys(item);
        var row = document.createElement('div');
        $(row).addClass('row ' + item[i[0]]);
        container.append(row);
        for (var j = 0; j < 4; j++) {
            var col = document.createElement('div');
            $(col).addClass('col');
            col.append(item[i[j + 1]]);
            row.append(col);
        }
        var col = document.createElement('div');
        $(col).addClass('col');
        var btn = document.createElement('button');
        $(btn).text('상세보기');
        $(btn).addClass('mainarea_btn detailbtn');
        $(btn).css('background', 'black');
        col.append(btn);
        row.append(col);

        var col = document.createElement('div');
        $(col).addClass('col');
        var btn = document.createElement('button');
        $(btn).text('과목추가');
        $(btn).addClass('mainarea_btn addbtn')
        $(btn).css('background', '#A51B86')
        col.append(btn);
        row.append(col);
    });
}

function print_mainarea($userid, $dept_tye, $year) {
    $.ajax({
        //요청이 전송될 URL 주소
        url: '/datas/unsigned_search/',
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify({
            "user_id": $userid,
            "dept_type": $dept_tye,
            "year": $year
        }),
        headers: { "X-CSRFToken": "{{ csrf_token }}" },

        success: function (data) {
            var vlist = Object.values(data);
            console.log(1);
            $('#main_area').empty();
            set_mainarea(vlist);
            setBtn($dept_tye);
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

function setBtn($dept_tye) {

    $('.detailbtn').click(function () {
        var $subject_id = $(this).parent().parent().attr('class').substr(4);
        setModal(user_id,$dept_tye,$subject_id);
        console.log('detail');
        showModal($('.modal-wrap'));
    });

    $('.close-btn').click(function () {
        noneModal($('.modal-wrap'));
    });
    $('.addbtn').click(function () {
        var subject_id = $(this).parent().parent().attr('class').substr(4);
        addSubject(user_id, subject_id);
    });
}

function addSubject($userid, $subjectid) {
    $.ajax({
        //요청이 전송될 URL 주소
        url: '/datas/add/',
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify({
            "user_id": $userid,
            "subject_id": $subjectid
        }),
        headers: { "X-CSRFToken": "{{ csrf_token }}" },

        success: function (data) {
            alert('과목추가성공');
            $('div').remove('.'+$subjectid);
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
