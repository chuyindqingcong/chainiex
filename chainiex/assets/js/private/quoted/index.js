$('.qhButt').find('button').each(function () {
    $(this).on('click',function () {
        $(this).addClass('thisBut').siblings().removeClass('thisBut')
        $('.deal').find('.labqh').eq($(this).index()).css('display','block').siblings().css('display','none')
    })
})
var obj = obje();
obj.yesNum()

// $('#BDWN').on('change',function () {
//         var text = $('#BDWN').find("option:selected").attr('data-b');
//         $('#reference').html('CNY/'+text);
//         $('#price').attr('placeholder','CNY/'+text);
//         $('#count').html(text);
//         $('#zhb').html(text);
//         $('#place').attr('placeholder',arrs[text])
// });



// 新版本
$.ajax({
    url:'/coin/list',
    type:'get',
    dataType:'json',
    success:function (res) {
        for(var i=0;i<res.data.coins.length;i++){
            $('#BDWN').find('li').eq(i).attr('title','最新成交价格'+res.data[res.data.coins[i].coin])
            $('#BDWN1').find('li').eq(i).attr('title','最新成交价格'+res.data[res.data.coins[i].coin])
            $('#BDWN').find('li').eq(i).append('<span><b>'+res.data.coins[i].coin+'</b> ( '+res.data[res.data.coins[i].coin]+' )</span>')
            $('#BDWN1').find('li').eq(i).append('<span><b>'+res.data.coins[i].coin+'</b> ( '+res.data[res.data.coins[i].coin]+' )</span>')
        }
    }
})
$('.zfimg').on('click',function () {
    $(this).css({'background':'url("/images/'+$(this).attr('data-img')+'.png")','border':'none'});
    $(this).siblings().css({'background':'none','border':'1px solid #eee'})
    $('#payType').val($(this).attr('data-val'));
});
$('.zfimg1').on('click',function () {
    $(this).css({'background':'url("/images/'+$(this).attr('data-img')+'.png")','border':'none'});
    $(this).siblings().css({'background':'none','border':'1px solid #eee'})
    $('#payType1').val($(this).attr('data-val'));
});
$('.imgsUpdate').on('click',function(){
    $('#file1').click();
})
$('#file1').on('change',function () {
    $('#form2').ajaxSubmit({
        type:'post',
        url:'/image/upload',
        dataType:'json',
        success:function (req) {
            if(req.code ==0) {
                $('.imgsUpdate').attr('src',req.data.url)
                $('#qr').val(req.data.name)
            }
        }
    })
})
$('#alip').change(function(){
    $("#payType").val($('#alip').find('option:selected').attr('data-val'))
    if($('#alip').find('option:selected').attr('data-val')=="BANK"){
        $('.erwei').css('display','none')
    }else{
        $('.erwei').css('display','block')
    }
});
$('#alip1').change(function(){
    $("#payType1").val($('#alip1').find('option:selected').attr('data-val'))
});
$('#xs').change(function(){
    $("#limitTime").val($('#xs').find('option:selected').attr('data-val'))
});
$('#xs1').change(function(){
    $("#limitTime1").val($('#xs1').find('option:selected').attr('data-val'))
});
$('.xsimg').on('click',function () {
    $(this).addClass('xs-img').siblings().removeClass('xs-img');
    $('#limitTime').val($(this).attr('data-val'));
});
$('.xsimg1').on('click',function () {
    $(this).addClass('xs-img').siblings().removeClass('xs-img');
    $('#limitTime1').val($(this).attr('data-val'));
});
$('#tfrom1').on('click',function () {
    if(parseInt($('#minAmount').val())>parseInt($('#amount').val())){
        alert($('#errorMess').attr('data-zx'));
        return false
    }
    if($('#qr').val().length<=0 && $('#payId').val().length<=0){
        alert('请选择上传二维码,或者输入收款账号');
        return false
    }
    $("#reg").validate({
        submitHandler:function() {
            $('#tfrom1').attr("disabled",true);
            var datas = $('#reg').serialize();
            $.ajax({
                type:'post',
                url:'/quoted/create/quoted',
                data:datas,
                success:function (obj) {
                    var obj = JSON.parse(obj);
                    if(obj.code ==0){
                        alert($('#errorMess').attr('data-cg'))
                       window.location.href='/user/ad';
                    }else if(obj.code==6){
                        $('#tfrom1').attr("disabled",false);
                        alert($('#errorMess').attr('data-ye'))
                    }else if(obj.code==7){
                        $('#tfrom1').attr("disabled",false);
                        alert($('#errorMess').attr('data-ye'))
                        $('.czjm').css('display','block')
                    }else{
                        $('#tfrom1').attr("disabled",false);
                        alert($('#errorMess').attr('data-fwq'))
                    }
                }
            })
        },
        rules: {
            amount:{
                required:true,
                number:true
            },
            price:{
                required:true,
                number:true
            },
            minAmount:{
                required:true,
                number:true,
            },
            minmin:{
                min:200
            },

        },
        messages: {
            amount:{
                required:$('#errorMess').attr('data-required'),
                number:$('#errorMess').attr('data-number')
            },
            price:{
                required:$('#errorMess').attr('data-required')
            },
            minAmount:{
                required:$('#errorMess').attr('data-required')

            },
            minmin:{
                min:$('#errorMess').attr('data-min')
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo($('#erds'));
        }
    });
})

$('#minAmount').on('change',function () {
    if($('#price').val()>0){
        $('#minb').val(obj.fds($(this).val(),$('#price').val()))
        // $("#minb").css('opacity','1')

    }
})
$('#minb').on('change',function () {
    if($('#price').val()>0){
        $("#minAmount").val(obj.nofds($(this).val(),$('#price').val()));
        // $("#minAmount").css('opacity','1')
    }
})
$('#minAmount1').on('change',function () {
    if($('#price1').val()>0){
        $('#minb1').val(obj.fds($(this).val(),$('#price1').val()))
        // $("#minb1").css('opacity','1')
    }
})
$('#minb1').on('change',function () {
    if($('#price1').val()>0){
        $("#minAmount1").val(obj.nofds($(this).val(),$('#price').val()));
        // $("#minAmount1").css('opacity','1')
    }
})
$('#price').on('change',function () {
    $('#zcount').html(obj.fds($('#amount').val(),$('#price').val()))
   if($('#minAmount').val().length>0){
       $('#minAmount').change()
       $('#minb').change()
   }
})
$('#amount').on('change',function () {
    $('#zcount').html(obj.fds($('#amount').val(),$('#price').val()))
})
$('#price1').on('change',function () {
    $('#zcount1').html(obj.fds($('#amount1').val(),$('#price1').val()))
    if($('#minAmount1').val().length>0){
        $('#minAmount1').change()
        $('#minb1').change()
    }

})
$('#amount1').on('change',function () {
    $('#zcount1').html(obj.fds($('#amount1').val(),$('#price1').val()))
})

$('.ads').find('span').each(function () {
    $(this).on('click',function () {
        $(this).addClass('buy').siblings().removeClass('buy');
        $('.labqh').eq($(this).index()).css('display','block').siblings().css('display','none');
    })
})
$('#BDWN').find('li').each(function () {
    $(this).on('click',function () {
        var cool=$(this).attr('data-b')
        $('#coin').val(cool);
        $(this).addClass('pgone').siblings().removeClass('pgone');
        $('.czicon').html(cool);
        $('.zjicon').attr('data-icon',cool);
        $('.pgTo').each(function () {
            $(this).html(cool)
        })
    })
})
$('#BDWN1').find('li').each(function () {
    $(this).on('click',function () {
        var cool=$(this).attr('data-b')
        $('#coin1').val(cool);
        $(this).addClass('pgone').siblings().removeClass('pgone');
        $('.pgTo1').each(function () {
            $(this).html(cool)
        })
    })
})
// 购买
$('#gfrom1').on('click',function () {
    if(parseInt($('#minAmount1').val())>parseInt($('#amount1').val())){
        alert($('#errorMess').attr('data-zx'));
        return false
    }
    $("#reg2").validate({
        submitHandler:function() {
            $('#gfrom1').attr("disabled",true);
            var datas = $('#reg2').serialize();
            $.ajax({
                type:'post',
                url:'/quoted/create/quoted',
                data:datas,
                success:function (obj) {
                    var obj = JSON.parse(obj);
                    if(obj.code ==0){
                        alert($('#errorMess').attr('data-cg'))
                        window.location.href='/user/ad';
                    }else if(obj.code==6){
                        alert($('#errorMess').attr('data-no'))
                        $('#gfrom1').attr("disabled",false);
                    }else {
                        alert($('#errorMess').attr('data-fwq'))
                        $('#gfrom1').attr("disabled",false);
                    }
                }
            })
        },
        rules: {
            amount:{
                required:true,
            },
            price:{
                required:true,
            },
            minAmount:{
                required:true,
                number:true,
            },
            minmin:{
                min:200
            },
        },
        messages: {
            amount:{
                required:$('#errorMess').attr('data-required')
            },
            price:{
                required:$('#errorMess').attr('data-required')
            },
            minAmount:{
                required:$('#errorMess').attr('data-required'),
                number:$('#errorMess').attr('data-number')
            },
            minmin:{
                min:$('#errorMess').attr('data-min')
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo($('#erds1'));
        }
    });
})
$('body').on('click','#copy',function () {
    try{
        var Url2=document.getElementById("aa");
        Url2.select();
        document.execCommand("Copy");
        alert("已复制好，可贴粘。");
    }catch (err){
        alert("复制失败，请手动复制。");
    }
});
// 前去充值
$('.zjicon').on('click',function (res) {
    $.ajax({
        url:'/user/address',
        type:'get',
        dataType:'json',
        data:{
            coin:$('.zjicon').attr('data-icon')
        },
        success:function (res) {
            if(res.code==0){
                console.log(res)
                $('#aa').val(res.data.address.address);
                $('#czimgs').attr('src',res.data.address.qrAddress);
                $('.qqcz').css('display','none')
                $('.container').css('display','block')
            }else{
                alert('服务器异常')
            }
        }
    })
})
$('.czbg').on('click',function () {
    $('.czjm').css('display','none')
    $('.qqcz').css('display','block')
    $('.container').css('display','none')
})
$('.container .icon').on('click',function () {
    $('.czjm').css('display','none')
    $('.qqcz').css('display','block')
    $('.container').css('display','none')
})
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(3).find('span').addClass('headerClass');