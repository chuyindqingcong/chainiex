var obj = new obje();
obj.menu();
var url = obj.getUrl();
var regex = "[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*"
$('.btn-db').on('click',function () {
    var objs = {};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.pwd=$('#pwd').val();
    objs.repwd = $('#repwd').val();
    objs.email = $('#errorMess').attr('data-email');
    objs.code = $('#errorMess').attr('data-code');
    if(objs.pwd!=objs.repwd){
        alert($('#errorMess').attr('data-equalTo'));
        return false
    }
    if(objs.pwd.match(regex)==null){
        alert($('#errorMess').attr('data-errorpw'));
        return false;
    }
    if(objs.pwd.length<=8){
        alert($('#errorMess').attr('data-errorpw'));
        return false
    }
    $.ajax({
        url:'/password/set',
        type:'post',
        data:objs,
        dataType:'json',
        success:function (obj) {
            if(obj.code == 0){
                $('.div-x').eq(0).css('background','#66c6f5');
                $('.div-this').eq(0).next().addClass('div-this');
                $('.yima').css({'color':"#bbb",'margin-top':'50px'});
                $('.yima').html($('#errorMess').attr('data-cg'));
                setTimeout(function () {
                    window.location.href='/';
                },5000)
            }
        }
    })
})
if($(window).height()<733){
    $('.reload').css({'position':'relative','top':'0','margin-top':'0','margin-bottom':'26px'});
    $('.footer').css('position','relative')
}