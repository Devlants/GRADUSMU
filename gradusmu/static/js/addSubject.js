var obj = {
    전공: ['전심', '전선'],
    교양: ['균교', '교선', '교필'],
    일선: [1, 2, 3],
    교직: [10, 11, 12]
}

var test = {
    name: '김지훈',
    department: '컴퓨터과학과',
    semester: [3, 1]
}

var grade = [[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2], [4, 1], [4, 2]];

var arr = {
    0: ['소프트웨어공학', 'HAEA0008-1', '한혁수', '3(설계)'],
    1: ['인공지능', 'HAEA0017-1', '김영준', '취득학점'],
    2: ['운영체제', 'HAEZ0004', '손성훈', '3'],
    3: ['컴퓨터네트워크', 'HAEA0001', '신경섭', '3']

}
var keysets = Object.keys(obj);

$(document).ready(function () {
    set_user_info();
    set_dropbox();
    print_mainarea(arr);
    setBtn()
});

function set_user_info() {
    var $name = test.name;
    var $department = test.department;
    document.getElementById('addSubject_user_name').append($name + '(' + $department + ')');
}

function set_dropbox() {
    var select_parent = $('#select-parent');
    keysets.forEach(function (item) {
        var option_parent = document.createElement('option');
        $(option_parent).val(item);
        $(option_parent).text(item);
        select_parent.append(option_parent);
    });

    $('#select-parent').change(function () {
        $('#select-child option').remove()

        var select_child = $('#select-child');
        var key = $(this).val()
        obj[key].forEach(function (item) {
            var option_child = document.createElement('option');
            $(option_child).val(item);
            $(option_child).text(item);

            select_child.append(option_child);
        });

        $('#select-child').click(function () {
            $('#third-drop').attr("disabled", false);
            var select_thrid = $('#third-drop');
            grade.forEach(function (item) {
                let option_third = document.createElement('option');
                $(option_third).val(item[0] + '학년 ' + item[1] + '학기');
                $(option_third).text(item[0] + '학년 ' + item[1] + '학기');
                select_thrid.append(option_third);
            });

        });
    });


}


function print_mainarea($arr) {
    var container = $('#main_area');
    for (var i = 0; i < Object.keys($arr).length; i++) {
        var row = document.createElement('div');
        $(row).addClass('row');
        container.append(row);
        for (var j = 0; j < 4; j++) {
            var col = document.createElement('div');
            $(col).addClass('col');
            col.append($arr[i][j]);
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

    }
}

function setBtn() {

    $('.detailbtn').click(function () {
        console.log('detail');
    });
    $('.addbtn').click(function () {
        console.log('add');
        location.reload();
    });
    $('#return_btn').click(function () {
        console.log('d');
    });
}
