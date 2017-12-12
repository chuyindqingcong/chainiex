$('.props').on('click',function () {
    if($('#rBtc').val().length>0&&$('#rCount').val()>0){
        $('.zzc').css('display','block');
        $('.rBtc').html($('#rBtc').val());
        $('.rCount').html($('#rCount').val())
    }else{
        alert($('#errorMess').attr('data-wz'))
    }
    return false
})
$('.rgbred').on('click',function () {
    $('.zzc').css('display','none');
    $('.rBtc').html('');
    $('.rCount').html('');
})
$('.rgbblue').on('click',function () {
    var datas = $('#form').serialize();
    $('.zzc').css('display','none');
    $('.rBtc').html('');
    $('.rCount').html('');
    $.ajax({
        type:'post',
        url:'/withdraw/create',
        data:datas,
        dataType:'json',
        success:function (res) {
            if(res.code ==0){
                alert('提交成功')
            }else if(res.code==4){
                alert('提现数量超出余额');
                $('#tfrom1').attr("disabled",false);
            }else if(res.code==7){
                alert('密码错误')
                $('#tfrom1').attr("disabled",false);
            }else{
                $('#tfrom1').attr("disabled",false);
            }
        }
    })
})

var obj = obje();
var columns=[{
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",

}, {
    "mData" : "toAddress",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%"
},{
    "mData" : "status",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render" :function(data,type,full){
        var txt =null;
        if(data==2){
            txt =$('#errorMess').attr('data-code1')
        }else if(data ==1){
            txt= $('#errorMess').attr('data-code2')
        }else if(data==3){
            txt = $('#errorMess').attr('data-code3')
        }else {

            txt = $('#errorMess').attr('data-code4')
        }
        return txt
    }

},{
    "mData" : "gmtCreate",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render":function (data,type,full) {
        return obj.formTime(data)
    }
}];
var columnss=[{
    "mData" : "gmtCreate",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render":function (data,type,full) {
        return obj.formTime(data)
    }

}, {
    "mData" : "toAddress",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%"
},{
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
},{
    "mData" : "status",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render" :function(data,type,full){
        var txt =null;
        if(data==2){
            txt =$('#errorMess').attr('data-code1')
        }else if(data ==1){
            txt= $('#errorMess').attr('data-code2')
        }else if(data==3){
            txt = $('#errorMess').attr('data-code3')
        }else {
            txt = $('#errorMess').attr('data-code4')
        }
        return txt
    }
}];
$('.cttable').find('li').each(function () {
    $(this).on('click',function () {
        $(this).addClass('thisRedis').siblings().removeClass('thisRedis');
        $('.tabless').find('.tt').eq($(this).index()).css('display','block').siblings().css('display','none')
        shouWrap();
    })
})
obj.datatable($('#table'),'/deposit/list?coin='+$('#errorMess').attr('data-coin'),columnss,obj.eachJson,"get",shouWrap,[5]);
obj.datatable($('#table2'),'/withdraw/list?coin='+$('#errorMess').attr('data-coin'),columns,obj.eachJson,"get",shouWrap,[5]);

function shouWrap() {
    if($('.wrap-right').height()+180>$('.footer').offset().top||$('.wrap-right').height()>=$(window).height()-276){
        $('.footer').css('position','relative')
    }else{
        $('.footer').css('position','fixed')
    }
}
var timer = null;
$.ajax({
    url:'/user/address?coin='+$('#errorMess').attr('data-coin'),
    type:'get',
    dataType:'json',
    success:function (obj) {
        if(obj.code==0){
            $('#getImg').attr('src',obj.data.address.qrAddress);
            $('#getDz').html(obj.data.address.address);
        }else{
            timer = setInterval(function () {
                $.ajax({
                    url:'/user/address?coin='+$('#errorMess').attr('data-coin'),
                    type:'get',
                    dataType:'json',
                    success:function (obj) {
                        if(obj.code==0){
                            $('#getImg').attr('src',obj.data.address.qrAddress);
                            $('#getDz').html(obj.data.address.address);
                            clearInterval(timer);
                        }
                    },
                    error:function (obj) {
                        alert($('#errorMess').attr('data-fwq'))
                    }
                })
            },2000)
        }
    },
    error:function (obj) {
        alert($('#errorMess').attr('data-fwq'))
    }
})
$('.kzonli').on('click',function () {
   var url = obj.getUrl();

   if(url.coin==$(this).attr('data-src').split('?')[1].split('=')[1]) {
       return false
   }
})
var loca = obj.getUrl().coin;
    $('.user-dh').find('.kzonli').each(function () {
      if(loca==$(this).attr('data-src').split('?')[1].split('=')[1]){
          $(this).addClass('this-li')
      }
    })