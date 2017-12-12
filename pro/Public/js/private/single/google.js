var project = {};
var objs= new obje
project.init=function(){

	//提交google验证码
	this.google()
}
project.google = function() {
	$('#reds').on('click',function(){
		if($('#code').val().length<=0){
			alert($('#mess').attr('data-Norequire'));
			return false
		}
		$.ajax({
			url:'/Home/single/secondGoogleAuth',
			type:'post',
			data:{
				code:$('#code').val(),
			},
			success:function(req){
				if(req.status==1){
					alert(req.info)
					setTimeout(function(){
						window.location.href='/'
					},2000)
				}else{
					alert(req.info)
				}
			}
		})
	})
}
project.init();
