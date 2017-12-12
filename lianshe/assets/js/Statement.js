var project={}

project.init = function(){
	//初始化设置高度
	this.setHei();
	//切换图片
	this.setImg()
}
project.setImg = function () {
	$('.im').on('click',function(){
		if($(this).attr('data-status')==1){
			$(this).attr('src','../assets/images/r2.png');
			$(this).attr('data-status',2)
		}else{
			$(this).attr('src','../assets/images/r1.png');
			$(this).attr('data-status',1)
		}
	})
}
project.setHei = function(){
	$('.wraps').height($(window).height()+'px');
}
project.init()