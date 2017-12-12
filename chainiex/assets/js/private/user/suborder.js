var obj = obje();
obj.menu();
var arr=[];
$('.wrap-dh h5').each(function () {
    $(this).on('click',function () {
        if($(this).next().height()==0){
            $(this).next().animate({height:($(this).next().find('li').length*50)+'px'},200)
        }else{
            $(this).next().animate({height:'0px'},200)
        }
    })
})
$('#sub').on('click',function () {
    $('#file1').click();
})
$('#file1').on('change',function () {
    $('#form2').ajaxSubmit({
        type:'post',
        url:'/image/upload',
        success:function (res) {
            res = JSON.parse(res);
            var txt = '<img src="'+res.data.url+'">';
            arr.push(res.data.name)
            $('#images').append(txt);
        }
    })
})
$('#tradeId').on('blur',function () {
    if($(this).val().length==21 ||$(this).val().length==0){

    }else{
        alert($('#errorMess').attr('data-gdh'))
    }
})
$('.resend').on('click',function () {
    if($('#title').val().length<=0){
        alert($('#errorMess').attr('data-title'));
        return false
    }
    if($('#content').val().length<=0){
        alert($('#errorMess').attr('data-content'));
        return false
    }
    $('#imgs').val(arr);
    var objs = $('#form1').serialize();
    objs['imgs']=arr
    $.ajax({
        url:'/case/create',
        type:'post',
        data:objs,
        dataType:'json',
        success:function (res) {
          if(res.code==0){
              alert($('#errorMess').attr('data-ok'));
              window.location.href='/case/list'
          }else if(res.code==4){
              alert($('#errorMess').attr('data-error'))
          }
        }
    })
})
$('.gdy').find('li').each(function () {
    $(this).on('click',function () {
        $(this).addClass('ggdy').siblings().removeClass('ggdy');
        $('#types').val($(this).attr('data-status'));
        if($(this).attr('data-status')==3){
            $('.bdsh').css('display','block');
        }else{
            $('.bdsh').css('display','none');
        }
    })
})