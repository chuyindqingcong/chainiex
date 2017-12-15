$('.fort>div>div').hover(function(){
	$(this).find('h6').css('color','red');
	var url =$(this).find('img').attr('src').split('.')[0];
	url = url.substr(0,url.length-1)
	$(this).find('img').attr('src',url+'2.png')
},function(){
	$(this).find('h6').css('color','#333');
	var url =$(this).find('img').attr('src').split('.')[0];
	url = url.substr(0,url.length-1)
	$(this).find('img').attr('src',url+'1.png')
})
$('.ud>div').mouseover(function(){
	$(this).addClass('scal').siblings().removeClass('scal');
	$('.plis>p').eq($(this).index()).css('display','block').siblings().css('display','none')
})

var _index7=0;
$(".flash4 ul li").mouseover(function(){
	_index7=$(this).index();
	$(this).stop().stop().animate({width:538},500).siblings("li").stop().animate({width:92.5},500);
	$(".imgCen").eq(_index7).css("display","block").siblings(".imgCen").css("display","none");
	$("p.bt_2").eq(_index7).css("display","block").siblings("p.bt_2").css("display","none");
	$(".imgTop img").eq(_index7).addClass("tm").siblings(".imgTop img").removeClass("tm");
});
$(".flash4 ul li").mouseout(function(){
	$(".imgCen").css("display","none");
	$("p.bt_2").css("display","none");
});

