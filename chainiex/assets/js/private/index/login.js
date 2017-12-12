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
$('.icon-xu').on('click',function () {
	time = new Date().getTime();
	if(cou == 0){
        $(this).css('transform','rotate(360deg)');
        cou = 1;
	}else {
		$(this).css('transform','rotate(0deg');
		cou =0
	}
    $('.imgY').attr('src','/captcha?'+time);
});
$('.regis').on('click',function () {

})

$('.dl').on('click',function () {
    // if(localStorage.getItem('dydl')){
    //     $('#login').click()
    // }else {
    //     $('.zzcc').css('display', 'block');
    //     $('body').css('overflow', 'hidden');
    // }
    $('#login').click()
})
$('.rgbredd').on('click',function () {
    $('.zzcc').css('display','none');
    $('body').css('overflow','auto');
})
$('.rgbbluee').on('click',function () {
	localStorage.setItem('dydl','true');
    $('#login').click()
})
if($(window).height()>700){
	$('.wraps').css('height',($(window).height()-60-100)+'px')
}
$('.control').eq(0).addClass('header-register');
$('.headerClass').removeClass('headerClass')
$('.control').eq(1).removeClass('header-register');