var obj ={
    전공: ['전심','전선'],
    교양:['균교','일교','교필'],
    일선:[1,2,3],
    교직:[10,11,12],
    기타:[20,21,22]
}

var test={
    name:'김지훈',
    department:'컴퓨터과학과',
    semester: 31
}

var arr=['소프트웨어공학','HAEA0008-1','한혁수','3(설계)','상세정보','과목추가','인공지능','HAEA0017-1','김영준','취득학점','상세정보','과목추가','운영체제','HAEZ0004','손성훈','3','상세정보','과목추가','컴퓨터네트워크','HAEA0001','신경섭','3','상세정보','과목추가'];

var keysets = Object.keys(obj);

$(document).ready(function(){
    
    var select_parent = $('#select-parent');

    keysets.forEach(function(item) {
        var option_parent = document.createElement('option');
        $(option_parent).val(item);
        $(option_parent).text(item);
        select_parent.append(option_parent);
    });

    /* 
    $(select_parent).val("전공").prop("selected", true);
    $(select_parent).trigger("change")
    $('#select-child').val(obj['keysets']).prop("selected",true);
    */

    $('#select-parent').change(function(){
        $('#select-child option:gt(0)').remove()
        
        var select_child = $('#select-child');
        var key = $(this).val()
        obj[key].forEach(function(item) {
            var option_child = document.createElement('option');
            $(option_child).val(item);
            $(option_child).text(item);
    
            select_child.append(option_child);
        });
    
    });

    print_mainarea(arr);
});

function print_mainarea($arr){
    console.log($arr.length);
    var container = $('#main_area');
    for (var i=0; i<$arr.length;i++){
        if(i%6==0){
            var row = document.createElement('div');
            $(row).addClass('row row-cols-6');
            container.append(row);
        }
        var col = document.createElement('div');
        $(col).addClass('col')

        if((i+2)%6==0){
            var btn = document.createElement('button');
            $(btn).text(arr[i]);
            $(btn).addClass('mainarea_btn btn-sm')
            $(btn).css('background','black')
            col.append(btn);
        }
        else if((i+1)%6==0){
            var btn = document.createElement('button');
            $(btn).text(arr[i]);
            $(btn).addClass('mainarea_btn btn-sm')
            $(btn).css('background','#A51B86')
            col.append(btn);
        }
        else{
            col.append(arr[i]);
        }
        row.append(col);
        
    }

}