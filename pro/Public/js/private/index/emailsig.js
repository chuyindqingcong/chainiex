var project = {}
var objs = new obje()
project.init = function(){
	//注册邮件
	this.send()
}

project.send = function() {
	$('#sendEmail').on('click',function(){
		alert($('#mess').attr('data-ok'))
		  $('#sendEmail').attr("disabled",true);
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
			if(!reg.test($('#email').val())){
				alert($('#mess').attr('data-error'))
				return false
			}
		var pids = '';
		var url= objs.getUrl();
		try{
			if(url.pid!=undefined){
				pids=url.pid
			}
		}catch(e){

		}

		$.ajax({
			url:'/Home/Reg/sendEmail',
			type:'post',
			data:{
				email:$('#email').val(),
				pid:pids
			},
			success:function(req){
				if(req.status==1){
					alert(req.info)
				}else{
					 $('#sendEmail').attr("disabled",false);
					alert(req.info)
				}
			}
		})
	})
}
project.init()