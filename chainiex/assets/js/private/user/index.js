$('.wrap-dh h5').each(function () {
    $(this).on('click',function () {
        if($(this).next().height()==0){
            $(this).next().animate({height:($(this).next().find('li').length*50)+'px'},200)
        }else{
            $(this).next().animate({height:'0px'},200)
        }
    })
})
var obj = obje();
    obj.menu()
$('.userSig span').on('click',function () {
    $.ajax({
        url:'/user/logout',
        type:'get',
        success:function () {
            window.location.href="/"
        }
    })
})
var options =
    {
        thumbBox: '.thumbBox',
        spinner: '.spinner',
        imgSrc: '/images/avatar.png'
    }
var cropper = $('.imageBox').cropbox(options);
$('#upload-file').on('change', function(){
    var reader = new FileReader();
    reader.onload = function(e) {
        options.imgSrc = e.target.result;
        cropper = $('.imageBox').cropbox(options);
    }
    reader.readAsDataURL(this.files[0]);
    this.files = [];
})
$('#btnCrop').on('click', function(){
    var img = cropper.getDataURL();
    $('#aaa').html('');
    $('.cropped').html();
    $('.shouhi').css('display','block')
    $('#aaa').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" >');
    // $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
    $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;" id="getBase"><p>128px*128px</p>');
    // $('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');
})
$('#btnZoomIn').on('click', function(){
    cropper.zoomIn();
})
$('#btnZoomOut').on('click', function(){
    cropper.zoomOut();
})
$('body').on('click','#rimgs',function () {
    var objs={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.profile = $('#getBase').attr('src');
    $.ajax({
        url:'/user/profile/modify',
        type:'post',
        data:objs,
        dataType:'json',
        success:function (res) {
            if(res.code==0){
                $('.shouUp').css('display','none')
                $('.userSig img').attr('src',$('#getBase').attr('src'))
                $('.userTi img').attr('src',$('#getBase').attr('src'))
                alert('上传成功')
            }
        }
    })
})
$('.yeshide').on('click',function () {
    $('.shouUp').css('display','none')
    $('body').css('overflow-y','auto')
})
$('.updataImg').on('click',function () {
    $('.shouUp').css('display','block')
    $('body').css('overflow-y','hidden')
})
$('.shouUpBg').on('click',function () {
    $('.shouUp').css('display','none')
    $('body').css('overflow-y','auto')
})
$('.container h5 .icon').on('click',function () {
    $('.shouUp').css('display','none')
    $('body').css('overflow-y','auto')
})
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(5).find('span').addClass('headerClass');