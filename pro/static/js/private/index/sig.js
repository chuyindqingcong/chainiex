var project={},objs=new obje;project.init=function(){this.setHeight(),this.icon(),this.sig(),this.setem()},project.setem=function(){var t=objs.getUrl();$("#email").val(t.email),$("#eee").val(t.email),void 0!=t.pid&&$("#pid").val(t.pid)},project.icon=function(){$("#banImg").on("click",function(){0==$(this).attr("data-status")?($(this).attr("src","/public/img/yy2.png"),$(this).attr("data-status",1)):($(this).attr("src","/public/img/yy1.png"),$(this).attr("data-status",0))})},project.setHeight=function(){$(window).height()>$(".foot").offset().top||$(".foot").css("position","relative")},project.sig=function(){$("#sig").on("click",function(){if($("#nick").val().length<1||$("#nick").val().length>16)return alert($("#mess").attr("data-errUser")),!1;if($("#pwd").val().length<6||$("#pwd").val().length>16)return alert($("#mess").attr("data-errPas")),!1;if($("#repwd").val()!=$("#pwd").val())return alert($("#mess").attr("data-noPas")),!1;if(1!=$("#banImg").attr("data-status"))return alert($("#mess").attr("data-requ")),!1;var t=$("#form1").serialize();$.ajax({url:"/Home/Reg/addReg",data:t,type:"post",dataType:"json",success:function(t){1==t.status?(alert(t.info),setTimeout(function(){window.location.href="/Home/index/login.html"},2e3)):alert(t.info)}})})},project.init();