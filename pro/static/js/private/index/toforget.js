var project={},objs=new obje;project.init=function(){this.rsend();var n=window.location.pathname;n=n.split(".")[0],n=n.split("/");try{$("#key").val(n[n.length-1])}catch(n){}},project.rsend=function(){$("#rsend").on("click",function(){if($("#pwd").val().length<6&&$("#pwd").val().length>16)return alert("密码不能小于6位大于16位"),!1;if($("#pwd").val()!==$("#repwd").val())return alert("密码不一致"),!1;var n=$("#form1").serialize();$.ajax({url:"/Home/login/resetPwd",data:n,type:"post",dataType:"json",success:function(n){1==n.status?(alert(n.info),$(".password").css("display","none"),$(".spans").css("display","block"),$("#rsend").css("display","none")):alert(n.info)}})})},project.init();