var grade_year = 19;    // 입학년도
var grade = [[grade_year, 1], [grade_year, 2], [grade_year + 1, 1], [grade_year + 1, 2], [grade_year + 2, 1], [grade_year + 2, 2], [grade_year + 3, 1], [grade_year + 3, 2]];


$(document).ready(function () {
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

    $('#select-parent').change(function () {
        if (this.value == '전공') {
            var option_child_arr = ['전심', '전선'];
        }
        else if (this.value == '교양') {
            var option_child_arr = ['균교', '교필', '교선'];
        }
        else {
            var option_child_arr = ['1', '2', '3'];
        }

        $('#select-child option').remove()
        option_child_arr.forEach(function (i) {
            var option_child = document.createElement('option');
            $(option_child).val(i);
            $(option_child).text(i);
            select_child.append(option_child);
        });
        $("#select-child option:eq(0)").prop("selected", true);
        $('#third-drop').attr("disabled", true);
    });

    $('#select-child').change(function () {
        $('#third-drop').attr("disabled", false);
        $('#third-drop option').remove()
        grade.forEach(function (item) {
            let option_third = document.createElement('option');
            $(option_third).val(item[0] + '년도 ' + item[1] + '학기');
            $(option_third).text(item[0] + '년도 ' + item[1] + '학기');
            select_thrid.append(option_third);
        });
        $("#third-drop option:eq(0)").prop("selected", true);
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

function setBtn() {

    $('.detailbtn').click(function () {
        console.log('detail');
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
