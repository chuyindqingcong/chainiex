var project={}

project.init = function(){
	//初始化设置高度
	this.setHei();
		//倒计时
	this.djs()
}

project.djs = function () {
	var sj = 108000;
		var d =parseInt(sj/3600/24);
		var sj1 = sj-d*3600*24;
		var h = parseInt(sj1/3600);
		var sj2 = sj1-h*3600;
		var m = parseInt(sj2/60);
		sj--
		$('.time>li').eq(0).html(project.timer(d));
		$('.time>li').eq(2).html(project.timer(h));
		$('.time>li').eq(4).html(project.timer(m));
	setInterval(function(){
		var d =parseInt(sj/3600/24);
		var sj1 = sj-d*3600*24;
		var h = parseInt(sj1/3600);
		var sj2 = sj1-h*3600;
		var m = parseInt(sj2/60);
		sj--
		$('.time>li').eq(0).html(project.timer(d));
		$('.time>li').eq(2).html(project.timer(h));
		$('.time>li').eq(4).html(project.timer(m));
	},1000)
}
project.timer = function (data) {
    return parseInt(data/10)>0?data:'0'+data;
}
project.setHei = function(){
	$('.one').height($(window).height()+'px');
}
project.init()