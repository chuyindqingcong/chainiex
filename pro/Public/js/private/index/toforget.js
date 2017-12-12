var project = {};
var objs =new obje()
project.init=function(){
	this.rsend()
	//赋值给key
	var url = window.location.pathname
	url= url.split('.')[0]
	url = url.split('/')
	try{
		$('#key').val(url[url.length-1])
	}catch(err){}
}
project.rsend = function (){
	$('#rsend').on('click',function(){
		if($('#pwd').val().length<6&&$('#pwd').val().length>16){
			alert('密码不能小于6位大于16位')
			return false
		}
		if($('#pwd').val()!==$('#repwd').val()){
			alert('密码不一致')
			return false
		}
		var datas = $('#form1').serialize();
		$.ajax({
			url:"/Home/login/resetPwd",
			data:datas,
			type:'post',
			dataType:'json',
			success:function(req){
				if(req.status==1){
					alert(req.info)
					$('.password').css('display','none');
					$('.spans').css('display','block')
					$('#rsend').css('display','none')
				}else{
					alert(req.info)
				}
			}
		})
	})
}

project.init();
