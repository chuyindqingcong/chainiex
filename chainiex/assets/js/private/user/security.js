// $('.wrap-dh h5').each(function () {
//     $(this).on('click',function () {
//         if($(this).next().height()==0){
//             $(this).next().animate({height:($(this).next().find('li').length*50)+'px'},200)
//         }else{
//             $(this).next().animate({height:'0px'},200)
//         }
//     })
// })
// $('.lis').each(function () {
//     $(this).on('click',function () {
//         if($(this).next().height()==0){
//             $(this).next().animate({height:'300px'},200)
//         }else{
//             $(this).next().animate({height:'0px'},200)
//         }
//     })
// })
var obj = obje();
$('.lis').each(function () {
    $(this).on('click',function () {
        var imgs = $(this).find('.iconfont3');
        if(imgs.attr('data-status')==0){
            $(this).find('li').css('color','#000');
            // imgs.attr('src','/images/'+imgs.attr('src').split('/')[2].split('.')[0].substr(0,6)+'2.png');
            imgs.css('color','#68ddd5');
            imgs.attr('data-status','1')
        }else{
            $(this).find('li').css('color','#666');
            // imgs.attr('src','/images/'+imgs.attr('src').split('/')[2].split('.')[0].substr(0,6)+'1.png');
            imgs.css('color','#bbb');
            imgs.attr('data-status','0')
        }
        $(this).next().toggle();
        if($('.wrap-right').height()+180>$('.footer').offset().top||$('.wrap-right').height()>=$(window).height()-276){
            $('.footer').css('position','relative')
        }else{
            $('.footer').css('position','fixed')
        }
    })
})
$("#form").validate({
    submitHandler:function() {
        $('#mit').attr("disabled",true);
        var data =  $('#form').serialize();
        $.ajax({
            type:'post',
            url:'/user/tradePwd/set',
            data:data,
            dataType:'JSON',
            success:function (obj) {
                if(obj.code==0){
                    window.location.href=window.location.href
                }else{
                    alert($('#errorMess').attr('data-ymm'))
                    $('#mit').attr("disabled",false);
                }
            },
            error:function () {
                $('#mit').attr("disabled",false);
            }
        })
        return false
    },
    rules: {
        tradePwd:{
            required:true,
        },
        tradePwd2:{
            equalTo:"#tradePwd",
        },
        pwd:{
            required:true,
        },
        oldTradePwd:{
            required:true
        }
    },
    messages: {
        tradePwd:{
            required: $('#errorMess').attr('data-required')
        },
        tradePwd2:{
            equalTo:$('#errorMess').attr('data-equalTO')
        },
        pwd:{
            required:$('#errorMess').attr('data-required')
        },
        oldTradePwd:{
            required:$('#errorMess').attr('data-required')
        }
    }
});
$('.check').on('click',function () {
    if($(this).attr('data-status')==0){
        $(this).attr('src','/images/circles-2.png');
        $(this).attr('data-status',1);
        $('#check').click();
    }else{
        $(this).attr('src','/images/circles-1.png');
        $(this).attr('data-status',0);
        $('#check').click();
    }
})
$('#sub').on('click',function () {
    if($('#check').is(':checked') && $('#code').val().length>0){
        var obj = {};
        obj[$('#csrf').attr('name')]=$('#csrf').val();
        obj.code=$('#code').val();
        $.ajax({
            url:'/user/2fa',
            type:'post',
            data:obj,
            dataType:'JSON',
            success:function (obj) {
               if(obj.code==0){
                   alert($('#errorMess').attr('data-ok'));
                   window.location.href=window.location.href
               }else {
                   alert($('#errorMess').attr('data-bdsb'))
               }
            }
        })
    }else{
        alert($('#errorMess').attr('data-wtx'))
    }
})
$('#nsub').on('click',function () {
    var obj={};
    obj[$('#csrf').attr('name')]=$('#csrf').val();
    obj.code=$('#code').val();
    $.ajax({
        url:'/user/2fa/rm',
        type:'post',
        data:obj,
        dataType:'JSON',
        success:function (obj) {
            if(obj.code==0){
                alert($('#errorMess').attr('data-success'));
                window.location.href=window.location.href
            }else{
                alert($('#errorMess').attr('data-err'))
            }
        }
    })
})
obj.menu();
if($('#errors').html()==4){
    alert($('#errorMess').attr('data-nopass'))
}
$("#sig").validate({
    rules: {
        oldpwd:{
            required:true
        },
        pwd:{
            required:true,
            passwo:true

        },
        repwd:{
            required:true,
            equalTo:"#tradePwds"
        }
    },
    messages: {
        oldpwd:{
            required:$('#errorMess').attr('data-required'),
        },
        pwd:{
            required:$('#errorMess').attr('data-required'),
            passwo:$('#errorMess').attr('data-yzmm')
        },
        repwd:{
            required:$('#errorMess').attr('data-required'),
            equalTo:$('#errorMess').attr('data-equalTo')
        }
    }
});
$.validator.addMethod("passwo",function(value,element,params){//验证密码包含大小写，数字，长度大与8小于12
    // var regex="^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{8,12}$";
    var regex = "[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*";
    if(value.match(regex)==null || value.length<8 || value.length>16){
        return false;
    }else{
        return true
    }
});
//手机验证
time=60;
timer=null;
$('#getmob').on('click',function () {
    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test($('#mob').val()))){
        alert($('#errorMess').attr('data-sjyz'));
    }else{
        var objs ={};
        objs[$('#csrf').attr('name')]=$('#csrf').val();
        objs.type='1';
        objs.mobile=$('#mob').val();
        $.ajax({
            type:'post',
            url:'/mobile/send',
            dataType:'JSON',
            data:objs,
            success:function (res) {
                if(res.code==4){
                    alert($('#errorMess').attr('data-dsj'))
                }else{
                    $('#getmob').attr('disabled',true);
                    timer=setInterval(function () {
                        $('#getmob').html(time--);
                        if (time < 0) {
                            $('#getmob').removeAttr('disabled');
                            $('#getmob').html($('#errorMess').attr('data-resend'));
                            time = 60;
                            $('#getmob').attr("disabled", false);
                            clearInterval(timer)
                        }
                    },1000)
                }

            }
        })

    }
})
$('#mitmob').on('click',function () {
    if($('#mob').val().length<=0){
        alert($('#errorMess').attr('data-required'))
    }else{
        var objs ={};
        objs[$('#csrf').attr('name')]=$('#csrf').val();
        objs.code=$('#sjyz').val();
        objs.mobile=$('#mob').val();
        $.ajax({
            url:'/mobile/bind',
            type:'post',
            data:objs,
            dataType:'json',
            success:function (res) {
                if(res.code==0){
                    alert($('#errorMess').attr('data-ok'));
                    window.location.href=window.location.href
                }else{
                    alert($('#errorMess').attr('data-errmob'))
                }
            }
        })
    }
})
//身份证验证
$('#sub1').on('click',function () {
    $('#sfz1').click()
})
$('#sub2').on('click',function () {
    $('#sfz2').click()
})
$('#sfz1').on('change',function () {
    $('#form1').ajaxSubmit({
        type:'post',
        url:'/image/upload',
        success:function (res) {
            res = JSON.parse(res);
           $('#imgs1').attr('src',res.data.url);
           $('#positiveImg').val(res.data.name)
        }
    })
})
$('#sfz2').on('change',function () {
    $('#form2').ajaxSubmit({
        type:'post',
        url:'/image/upload',
        success:function (res) {
            res = JSON.parse(res);
            $('#imgs2').attr('src',res.data.url)
            $('#negtiveImg').val(res.data.name)
        }
    })
})
$('#subidcard').on('click',function () {
    if($('#idcard').val().length<1){
        alert($('#errorMess').attr('data-sfz'))
        return false
    }
    if($('#cardname').val().length<1){
        alert($('#errorMess').attr('data-sfzxm'))
        return false
    }
    if($('#negtiveImg').val().length<1 ||$('#positiveImg').val().length<1 ){
        alert($('#errorMess').attr('data-cardimg'))
        return false
    }
    var objs = $('#form6').serialize();
    $.ajax({
        type:'post',
        url:'/user/info/update',
        data:objs,
        dataType:'json',
        success:function (res) {
           if(res.code==0){
               alert($('#errorMess').attr('data-tjsend'));
               window.location.href=window.location.href
           }else if(res.code==3){
               alert($('#errorMess').attr('data-cardimg'))
           }
        }

    })
})
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(5).find('span').addClass('headerClass');