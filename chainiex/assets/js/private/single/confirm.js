var obj = new obje();
obj.menu();
var time = 90;
var timer = null;
var objs={};
$('.btn-sb').on('click',function () {
    $('.btn-sb').attr("disabled",true);
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    $.ajax({
        url:'/mail/resend',
        type:'post',
        data:objs,
        dataType:'json',
        success:function (req) {
            $('.btn-sb').html(time--);
            if(req.code==0) {
                timer = setInterval(function () {
                    $('.btn-sb').html(time--);
                    if (time < 0) {
                        $('.btn-sb').removeAttr('disabled');
                        $('.btn-sb').html($('#errorMess').attr('data-reload'));
                        time = 90;
                        $('.btn-sb').attr("disabled", false);
                        clearInterval(timer)
                    }
                }, 1000)
            }else{
                alert(req.message)
            }
        }
    });
})
var url = obj.getUrl();
if($(window).height()<733){
    $('.reload').css({'position':'relative','top':'0','margin-top':'0','margin-bottom':'26px'});
    $('.footer').css('position','relative')
}