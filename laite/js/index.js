var project = {}

project.init = function() {
	//设置图片初始高度
	this.setHei()
	//切换内容
	this.qh()
}

project.qh = function() {
	$('.faqLeft>div').on('click',function(){
		$(this).addClass('fad').siblings().removeClass('fad');
		$('.faqRight>div').eq($(this).index()).css('display','block').siblings().css('display','none')
	})
}
project.setHei = function () {
	$('.ban img').css('height',($(window).height()-80)+'px')
}

project.init()
