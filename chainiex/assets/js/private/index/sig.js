var time=null;
var cou = 0;
$('.wrap-lrg').find('span').each(function(){
	$(this).on('click',function(){
		$(this).addClass('login-q').siblings().removeClass('login-q');
		$('.regs').eq($(this).index()).css('display','block').siblings().css('display','none');
        $('.imgY').attr('src','/captcha?'+time);
	})
})

var obj = obje();
obj.menu();
$('.imgY').on('click',function () {
	time = new Date().getTime();
	// if(cou == 0){
     //    $(this).css('transform','rotate(360deg)');
     //    cou = 1;
	// }else {
	// 	$(this).css('transform','rotate(0deg');
	// 	cou =0
	// }
    $('.imgY').attr('src','/captcha?'+time);
});
$("#reg").validate({
    rules: {
        email:{
            required:true,
            email:true
        },
        pwd:{
            required:true,
            passwo:true

        },
        repwd:{
            required:true,
            equalTo:"#pwd"
        },
        clause:{
            required:true
        },
        captcha:{
            required:true
        },
        userName:{
            required:true
        }
    },
    messages: {
        email:{
            required:$('#errorMess').attr('data-required'),
            email:$('#errorMess').attr('data-email')
        },
        pwd:{
            required:$('#errorMess').attr('data-required'),
            passwo:$('#errorMess').attr('data-pass')
        },
        repwd:{
            required:$('#errorMess').attr('data-required'),
            equalTo:$('#errorMess').attr('data-repa')
        },
        clause:{
            required:$('#errorMess').attr('data-label')
        },
        username:{
            required:$('#errorMess').attr('data-required'),
        }
    },
    errorPlacement: function(error, element) {
        error.appendTo($('#erds'));
    }
});
// 自定义验证函数
$.validator.addMethod("passwo",function(value,element,params){//验证密码包含大小写，数字，长度大与8小于12
    // var regex="^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,16}$";
    var regex = "[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*";
    if(value.match(regex)==null || value.length<8 || value.length>16){
        return false;
    }else{
        return true
    }
});
$('.check').on('click',function () {
    if($(this).attr('data-status')==0){
        $(this).attr('src','/images/circles-2.png');
        $(this).attr('data-status',1);
        $('#clause').click();
    }else{
        $(this).attr('src','/images/circles-1.png');
        $(this).attr('data-status',0);
        $('#clause').click();
    }
})
$('.headerClass').removeClass('headerClass')
if($(window).height()>700){
    $('.wraps').css('height',($(window).height()-60-100)+'px')
}
var url = obj.getUrl();
    try {
        if(url.code){
           $('#intive').val(url.code)
        }
    }catch (e){

    }
$('#shou1').on('change',function () {
    $('#pwd').val( $('#shou1').val())
})
$('#open1').on('click',function () {
    if($(this).hasClass('openEyes')){
        $(this).removeClass('openEyes')
        $('#shou1').css('display','none');
    }else{
        $(this).addClass('openEyes')
        $('#shou1').css('display','block');
        $('#shou1').val($('#pwd').val())
    }
})
$('#shou12').on('change',function () {
    $('#repwd').val( $('#shou12').val())
})
$('#open2').on('click',function () {
    if($(this).hasClass('openEyes')){
        $(this).removeClass('openEyes')
        $('#shou12').css('display','none');
    }else{
        $(this).addClass('openEyes')
        $('#shou12').css('display','block');
        $('#shou12').val($('#repwd').val())
    }
})