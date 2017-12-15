var project={}

project.init = function(){
	//初始化设置高度
	this.setHei();
	//切换图片
	this.setImg()
	//页面跳转
	this.href()
	//alert重写
	this.alert()
}
project.alert = function () {
    window.alert=function (val) {
        if(window.alertTime){
            clearTimeout(window.alertTime)
        }else{
            window.alertTime=null
        }
        var div=null
        if(document.getElementById('alert1')==null ||document.getElementById('alert1')=='undefined'){
            div = document.createElement('div');
            div.setAttribute('style',"height:30px;line-height:30px;background:rgba(0,0,0,.5);position:fixed;top:0px;left:0;color:#fff;padding:10px;opacity:1;border-radius:5px;z-index:999999999999");
            div.setAttribute('id','alert1');
            div.innerHTML=val;
            document.body.appendChild(div);
            var widht=0;
            div=document.getElementById('alert1');
            if(div.currentStyle)
            {
                width=div.currentStyle['width'];
            }
            else
            {
                width=getComputedStyle(div, false)['width'];
            }
            width=parseInt(width)/2;
            div.style.left='50%';
            div.style.top='50%';
            div.style.marginTop="-20px";
            div.style.marginLeft='-'+width+'px';

            window.alertTime = setTimeout(function () {
                div=document.getElementById('alert1');
                div.parentNode.removeChild(div);
            },2000)
        }else{
            div=document.getElementById('alert1');
            div.parentNode.removeChild(div);
            div = document.createElement('div');
            div.setAttribute('style',"height:30px;line-height:30px;background:rgba(0,0,0,.5);position:fixed;top:0px;left:0;color:#fff;padding:10px;opacity:1;border-radius:5px");
            div.setAttribute('id','alert1');
            div.innerHTML=val;
            document.body.appendChild(div);
            var widht=0;
            div=document.getElementById('alert1');
            if(div.currentStyle)
            {
                widht=div.currentStyle['width'];
            }
            else
            {
                width=getComputedStyle(div, false)['width'];
            }
            width=parseInt(width)/2;
            div.style.left='50%';
            div.style.top='50%';
            div.style.marginTop="-20px";
            div.style.marginLeft='-'+width+'px';

            window.alertTime= setTimeout(function () {
                div=document.getElementById('alert1');
                div.parentNode.removeChild(div);

            },2000)
        }
    }
}
project.href = function () {
	$('.papa').on('click',function(){
		if($('.im').attr('data-status')==2){
			window.location.href='/index'
		}else{
			alert($('#mess').attr('data-err'))
			return false
		}
	})
}
project.setImg = function () {
	$('.im').on('click',function(){
		if($(this).attr('data-status')==1){
			$(this).attr('src','images/r2.png');
			$(this).attr('data-status',2)
		}else{
			$(this).attr('src','images/r1.png');
			$(this).attr('data-status',1)
		}
	})
}
project.setHei = function(){
	$('.wraps').height($(window).height()+'px');
}
project.init()