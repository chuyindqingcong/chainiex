var time=null;
$('.wrap-lrg').find('span').each(function(){
	$(this).on('click',function(){
		$(this).addClass('login-q').siblings().removeClass('login-q');
		$('.regs').eq($(this).index()).css('display','block').siblings().css('display','none');
        $('.imgY').attr('src','/captcha?'+time);
	})
})
$(window).scroll(function(){
	if($(window).scrollTop()>10){
		$('.header').css({'background':'#fff','color':'#000'});
		$('.header-top div ul li b').css('border-top','5px solid #000');
		$('.header-register').css({'border':'1px solid #000'})
		
	}else{
		$('.header').css({'background':'transparent','color':'#fff'});
		$('.header-top div ul li b').css('border-top','5px solid #fff');
		$('.header-register').css('border','1px solid #fff')
	}
})
var obj = obje();
obj.menu();
$('#reds').on('click',function () {
    var objs ={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.code=$('#pwd').val();
	$.ajax({
		url:'/2fa/confirm',
		type:'post',
		data:objs,
		dataType:"JSON",
		success:function (res) {
			if(res.code==0){
				window.location.href='/'
			}else{
				alert('您输入有误')
			}
        }
	})
})