var project={}

project.init = function(){
	//初始化设置高度
	this.setHei();
	//登录
	this.login()
	//隐藏
	this.hide()
	//初始化函数
	this.main()
}
project.main= function(){
	project.t1()
}
project.t1 = function(){
	$('.t1').on('click',function(){
		$('.shou-wrap>div').eq(1).css('display','block').siblings().css('display','none');
		$('.shouS').css('display','block')
	})
	$('.t2').on('click',function(){
		$('.shou-wrap>div').eq(2).css('display','block').siblings().css('display','none');
		$('.shouS').css('display','block')
	})
	$('.t3').on('click',function(){
		$('.shou-wrap>div').eq(0).css('display','block').siblings().css('display','none');
		$('.shouS').css('display','block')
	})
	$('.t4').on('click',function(){
		$('.shou-wrap>div').eq(0).css('display','block').siblings().css('display','none');
		$('.shouS').css('display','block')
	})
}
project.hide = function () {
	$('.zz').on('click',function(){
		$('.shouS').css('display','none')
	})
}
project.login = function () {
	$('.regi').on('click',function(){
		$('.shou-wrap>div').eq(1).css('display','block').siblings().css('display','none');
		$('.shouS').css('display','block')
	})
	$('.logi').on('click',function(){
		$('.shou-wrap>div').eq(0).css('display','block').siblings().css('display','none');
		$('.shouS').css('display','block')
	})
}
project.setHei = function(){
	$('.one').height($(window).height()+'px');
}
project.init()