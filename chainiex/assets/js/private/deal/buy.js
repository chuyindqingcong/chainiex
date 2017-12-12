var obj = obje();
obj.yesNum();
$('#cny').on('change',function () {
    $('#btc').val((obj.nofds($(this).val(),$('.rate').html())));
    $('#btc').change();
})
$('#btc').on('change',function () {
    $('#cny').val(parseFloat(obj.fds($(this).val(),$('.rate').html()).toFixed(2)))
})
// $('#sub').on('click',function () {
//     var data =  $('#form').serialize();
//     $.ajax({
//         type:'post',
//         url:'/order/create',
//         data:data,
//         success:function (obj) {
//             var obj = JSON.parse(obj)
//             if(obj.code==0){
//                 window.location.href='/order/deal?tradeId='+obj.data.tradeId
//             }
//         }
//     })
//     return false
// })
$("#form").validate({
    submitHandler:function() {
        $('.zzcc').css('display','block');
        $('body').css('overflow','hidden');
    },
    rules: {
        amount:{
            required:true,
            max:parseFloat($('#count').html())+0.00000001
        },
        jyje:{
            min:parseFloat($('#errorMess').attr('data-mins'))-0.00000001
        }
    },
    messages: {
        amount:{
            required: $('#errorMess').attr('data-required'),
            min:$('#errorMess').attr('data-min'),
            max:$('#errorMess').attr('data-max')
        },
        jyje:{
            min:$('#errorMess').attr('data-min')
        }
    },
    errorPlacement: function(error, element) {
        error.appendTo($('.shouerr'));
    }
});

$('.rgbredd').on('click',function () {
    $('.zzcc').css('display','none');
    $('body').css('overflow','auto');
})
$('.rgbbluee').on('click',function () {
    $('.zzcc').css('display','none');
    $('#sub').attr("disabled",true);
    var data =  $('#form').serialize();
    $.ajax({
        type:'post',
        url:'/order/create',
        data:data,
        success:function (obj) {
            var obj = JSON.parse(obj);
            if(obj.code==0){
                window.location.href='/order/deal?tradeId='+obj.data.tradeId
            }else if(obj.code==4){
                $('#sub').attr("disabled",false);
                alert($('#errorMess').attr('data-maxmin'))
            }else if(obj.code==3){
                $('#sub').attr("disabled",false);
                alert($('#errorMess').attr('data-user'))
            }else{
                $('#sub').attr("disabled",false);
                alert(obj.message)
            }
        }
    })
})
$('#btc').on('change',function () {
    $('#sxf').val(obj.fds($('#btc').val(),$('#errorMess').attr('data-fee'))+' ')
})