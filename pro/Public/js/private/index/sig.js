var project ={}
var objs = new obje()
project.init = function(){
	//设置页面高度
	this.setHeight()
	//切换icon 图片
	this.icon()
	//注册 验证
	this.sig()
	//写入邮箱
	this.setem()
}
project.setem = function (){
	var url = objs.getUrl()
	$('#email').val(url.email);
	$("#eee").val(url.email)
	if(url.pid!=undefined){
		$('#pid').val(url.pid)
	}
}
project.icon =function(){
	$('#banImg').on('click',function(){
		if($(this).attr('data-status')==0){
			$(this).attr('src','/public/img/yy2.png')
			$(this).attr('data-status',1)
		}else{
			$(this).attr('src','/public/img/yy1.png')
			$(this).attr('data-status',0)
		}
	})
}
project.setHeight = function(){
	if($(window).height()>$('.foot').offset().top){
	}else{
		$('.foot').css('position','relative')
	}
}
project.sig = function () {
	$('#sig').on('click',function(){
		if($('#nick').val().length<1 || $('#nick').val().length>16){
			alert($('#mess').attr('data-errUser'))
			return false
		}
		if($('#pwd').val().length<6 || $('#pwd').val().length>16){
				alert($('#mess').attr('data-errPas'))
			return false
		}
		if($('#repwd').val()!=$('#pwd').val()){
			alert($('#mess').attr('data-noPas'))
			return false
		}
		if($('#banImg').attr('data-status')!=1){
			alert($('#mess').attr('data-requ'))
			return false
		}
		var datas = $('#form1').serialize();
		$.ajax({
			url:'/Home/Reg/addReg',
			data:datas,
			type:'post',
			dataType:'json',
			success:function(req){
				if(req.status==1){
					alert(req.info)
					setTimeout(function(){
						window.location.href="/Home/index/login.html"
					},2000)
				}else{
					alert(req.info)
				}
			}
		})
	})

}
project.init()