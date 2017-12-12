var obj = new obje();
obj.menu();
var objs = {};
$('.btn-sb').on('click',function () {
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.mail = $('#emial').val();
    $.ajax({
        url:'/password/forget',
        type:'post',
        dataType:'json',
        data:objs,
        success:function (res) {
            if(res.code==0){
                $('.yima').html($('#errorMess').attr('data-fs').replace(/text1/,$('#emial').val()));
                $('.yima').append('<div><span>'+$('#errorMess').attr('data-ljx')+'</span><button type="button" class="btn-tj resend">'+$('#errorMess').attr('data-resend')+'</button></div>')
                $('.div-this').eq(0).html('<span><o>1</o></span><span>'+$('#errorMess').attr('data-resend')+'</span>  <div class="div-x"></div>');
                $('.div-x').eq(0).css('background','#68ddd5');
                $('.div-this').next().addClass('div-this');
                $('.reload').css('height','300px')
            }else if(res.code==4){
                alert($('#errorMess').attr('data-noemail'))
            }else if(res.code==6){
                alert($('#errorMess').attr('data-loemail'))
            }else{
                alert($('#errorMess').attr('data-errmail'))
            }
        }
    })
})
var time = 90;
var timer = null;
$('.wrap').on('click','.resend',function () {
    $(this).attr('disabled','true');
    var thiss = $(this);
    $.ajax({
        url:'/password/forget',
        type:'post',
        dataType:'json',
        data:objs,
        success:function (obj) {
            if(obj.code == 0){
                timer = setInterval(function () {
                    thiss.html(time--);
                    if(time<0){
                        thiss.removeAttr('disabled');
                        thiss.html($('#errorMess').attr('data-resend'));
                        time = 90;
                        clearInterval(timer)
                    }
                },1000)
            }else{
                alert($('#errorMess').attr('data-errmail'))
            }
        }
    });
})
if($(window).height()<733){
    $('.reload').css({'position':'relative','top':'0','margin-top':'0','margin-bottom':'26px'});
    $('.footer').css('position','relative')
}