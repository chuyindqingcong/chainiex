var project={}

project.init = function(){
	//初始化设置高度
	this.setHei();
	// //hover事件
	// this.hover()
	//监听scroll 事件
	this.scroll()
}
project.scroll = function (){
	var arr = [];
	for(var i=0;i<$('.mian>div').length;i++){
		arr.push($('.mian>div').eq(i).offset().top-100)
	}
	$(window).on('scroll',function(){
		var thIndex=0;
		for(var i=0;i<arr.length;i++){
			if(arr[i]<=$(window).scrollTop()){
				thIndex=i
			}
		}
		$('.filex>div').eq(thIndex).addClass('thisFilex').siblings().removeClass('thisFilex')
	})
	$('.filex>div').on('click',function(){
		 $('body,html').animate({'scrollTop':arr[$(this).attr('data-i')]+100},300)
	})
}
// project.hover = function(){
// 	$('.ulis>div').hover(function(){
// 		$(this).find('img').attr('src','./images/red02.png');
// 		$(this).find('p').css('color','#3765c5')
// 	},function(){
// 		$(this).find('img').attr('src','./images/red01.png');
// 		$(this).find('p').css('color','#a4a5a5')
// 	})
// }
project.setHei = function(){
	$('.one').height($(window).height()+'px');
}
project.init()