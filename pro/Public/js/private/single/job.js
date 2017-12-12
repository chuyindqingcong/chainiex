var project = {};
var objs= new obje
project.init=function(){
	//选择问题类型
	this.sel()
	//上传文件
	this.upload()
	//提交表单
	this.send()
	//删除文件
	this.delet()
}
project.delet = function () {
	$('#request-attachments-pool').on('click','.iconnode',function(){
		$(this).parents('li').remove();
	})
}
project.send = function (){
	$('.sendsy1').on('click',function(){
		if($('#title').val().length<=0 || $('#email').val().length <=0 || $('#describe').val().length<=0){
			alert($('#mess').attr('data-err'))
			return false
		}
		var datas = $('#form2').serialize();
		$.ajax({
			url:'/Home/single/addJob',
			type:'post',
			data:datas,
			success:function(req){
				if(req.status==1){
					alert(req.info)
				}else{
					alert(req.info)
				}
			}
		})
	})
}
project.upload = function(){
	$('.upload-dropzone').on('click',function(){
		$('#file5').click()
	})
	$('#file5').on('change',function () {
		$('#form5').ajaxSubmit({
	        type:'post',
	        url:'/Home/single/uploadMore',
	        dataType:'json',
	        success:function (req) {
	            if(req.status ==1) {
	            	var a =$('#form5')[0].firstElementChild.files;
	            	var txt = '';
	            	console.log(a)
	            	for(var i=0;i<a.length;i++){
	            		txt += '  <li class="upload-item" data-upload-item="" aria-busy="false">'+
  							req.data[i].name+
					  ' <svg class="icon iconnode">'+
					 '  <use xlink:href="#icon-guanbi"></use>'+
					 '  </svg>'+
					        '<input type="hidden" name="file_path['+i+']" value="'+req.data[i].path+'">'+
					' </li>';
	            	}
	            	$('#request-attachments-pool').append(txt)
	                alert($('#mess').attr('data-ok'))
	            }
	        }
	    })
	})
}
project.sel = function () {
	$('.textInput').on('click',function(){
		$('.hideTx').css('display','block')
	})
	$('.hideTx li').on('click',function(){
		$('.textInput').html($(this).html());
		$('#hidss').val($(this).attr('data-id'))
		$('.hideTx').css('display','none')
	})
}
project.init();
