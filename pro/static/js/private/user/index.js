var obj=new obje,project={};project.init=function(){new obje;this.send(),this.reImg(),this.bantab(),this.setHeight(),this.copy(),this.upust(),this.upDataPas(),this.sendGoogle(),this.ungoogle(),this.invitation()},project.invitation=function(){$("#Invitation").on("click",function(){$.ajax({url:"/Home/user/invite",type:"post",data:{email:$("#getEmail").val()},success:function(t){t.status,alert(t.info)}})})},project.ungoogle=function(){$("#unGool").on("click",function(){$.ajax({url:"/Home/user/unbind",type:"post",data:{code:$("#uncode").val()},success:function(t){1==t.status?(alert(t.info),setTimeout(function(){window.location.href=window.location.href},2e3)):alert(t.info)}})})},project.sendGoogle=function(){$("#sendGool").on("click",function(){return $("#pwd1").val().length<=0||$("#code1").val().length<=0?(alert($("#mess").attr("data-Norequire")),!1):0==$(".yy").attr("data-status")?(alert($("#mess").attr("data-errch")),!1):void $.ajax({url:"/Home/user/verifyGoogleAuth",type:"post",data:{pwd:$("#pwd1").val(),code:$("#code1").val(),type:1},success:function(t){1==t.status?(alert(t.info),setTimeout(function(){window.location.href=window.location.href},2e3)):alert(t.info)}})})},project.upDataPas=function(){$("#upDataPas").on("click",function(){$.ajax({url:"/Home/user/updatePassword",type:"post",data:{oldpwd:$("#oldpwd2").val(),pwd:$("#pwd2").val(),repwd:$("#repwd2").val()},success:function(t){1==t.status?(alert(t.info),setTimeout(function(){window.location.href="/Home/Index/login.html"},2e3)):alert(t.info)}})})},project.upust=function(){$("#usd1").on("click",function(){$("#file5").click()}),$("#usd2").on("click",function(){$("#file6").click()}),$("#file5").on("change",function(){$("#form5").ajaxSubmit({type:"post",url:"/Home/user/upload",data:{type:1},dataType:"json",success:function(t){1==t.status&&($("#usd1").html("上传成功"),$("#pic1").val(t.data))}})}),$("#file6").on("change",function(){$("#form6").ajaxSubmit({type:"post",url:"/Home/user/upload",dataType:"json",data:{type:2},success:function(t){1==t.status&&($("#usd2").html("上传成功"),$("#pic2").val(t.data))}})})},project.copy=function(){$("#copy").on("click",function(){try{document.getElementById("aa").select(),document.execCommand("Copy"),alert("已复制好，可贴粘。")}catch(t){alert("复制失败，请手动复制。")}})},project.setHeight=function(){$(".Tabcon").css("min-height",$(window).height()-208+"px")},project.bantab=function(){$(".userTab li").on("click",function(){$(this).addClass("userTabClass").siblings().removeClass("userTabClass"),$(".Tabcon>div").eq($(this).index()).css("display","block").siblings().css("display","none")})},project.send=function(){$("#rsend").on("click",function(){if($("#pic1").val().length>=0&&0==$("#pic2").val().length||0==$("#pic1").val().length&&$("#pic2").val().length>=0)return!1;var t=$("#formsrzi").serialize();$.ajax({url:"/Home/user/setMember",type:"post",data:t,success:function(t){console.log(t)}})})},project.reImg=function(){$(".yy").on("click",function(){0==$(this).attr("data-status")?($(this).attr("data-status",1),$(this).attr("src","/public/img/yy2.png"),$("#check1").click()):($(this).attr("data-status",0),$(this).attr("src","/public/img/yy1.png"),$("#check1").click())})},project.init();