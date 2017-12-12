var project = {};
var objs = new obje()
project.init=function(){
	this.rsend()
}
project.rsend = function (){
	$('#rsend').on('click',function(){
		$.ajax({
			url:'/Home/login/findpwd',
			type:'get',
			dataType:'json',
			data:{
				email:$('.email').val()
			},
			success:function(req){
				if(req.status ==1){
					alert(req.info)
					$('.getEmail').html($('.email').val())
					$('.email').css('display','none')
					$('#rsend').css('display','none')
					$('.spans').css('display','block')
				}else{
					alert(req.info)
				}
			}
		})
	})
}

project.init();
