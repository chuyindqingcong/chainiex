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

