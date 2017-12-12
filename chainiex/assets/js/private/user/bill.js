$('.props').on('click',function () {
    $('.zzc').css('display','block');
    $('.rBtc').append($('#rBtc').val());
    $('.rCount').append($('#rCount').val())
    return false
})
$('.rgbred').on('click',function () {
    $('.zzc').css('display','none');
    $('.rBtc').html('');
    $('.rCount').html('');
})
$('.rgbblue').on('click',function () {
    var datas = $('#form1').serialize();
    $('.rBtc').html('');
    $('.rCount').html('');
})

var obj = obje();
var columns=[{
    "mData" : "gmtDeal",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "17%",
    "render":function (data,type,full) {
        return obj.formTime(data)
    }
},{
    "mData" : "coin",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "7%",

},{
    "mData" : "type",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "5%",
    "render":function (data,type,full) {
        if(data==0 && $('#errorMess').attr('data-uid')==full.uid){
            return '<span style="color: #84ca47">'+$("#errorMess").attr("data-m")+'</span>'
        }else if(data==0 && $('#errorMess').attr('data-uid')!=full.uid){
            return '<span style="color: #fb5959">'+$("#errorMess").attr("data-mm")+'</span>'
        }else if(data==1 && $('#errorMess').attr('data-uid')==full.uid){
            return '<span style="color: #84ca47">'+$("#errorMess").attr("data-m")+'</span>'
        }else{
            return '<span style="color: #fb5959">'+$("#errorMess").attr("data-mm")+'</span>'
        }
    }
}, {
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "7%",
    "render":function (data,type,full) {
        if(full.status==4){
            if(full.type==0 && $('#errorMess').attr('data-uid')==full.uid){
                return '+'+data
            }else if(full.type==0 && $('#errorMess').attr('data-uid')!=full.uid){
                return '-'+data
            }else if(full.type==1 && $('#errorMess').attr('data-uid')==full.uid){
                return '+'+data
            }else{
                return '-'+data
            }
        }else{
            return data
        }

    }

}, {
    "mData" : "price",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%"
},{
    "mData" : "price",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render":function (data,type,full) {
        return (data*full.amount).toFixed(2);
    }
}, {
    "mData" : "status",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "8%",
    "render":function (data,type,full) {
        var txt = null;
        if(data==0||data==1){
            txt ='<span>'+$("#errorMess").attr("data-code1")+'</span>'
        }else if(data==2){
            txt = '<span>'+$("#errorMess").attr("data-code2")+'</span>'
        }else if(data ==3){
            txt ='<span>'+$("#errorMess").attr("data-code3")+'</span>'
        }else if(data ==4){
            txt = '<span style="background: #84ca47;color: #fff;padding: 4px 6px;border-radius: 4px">'+$("#errorMess").attr("data-code4")+'</span>'
        }else if(data ==100){
            txt = '<span style="background: #fb5959;color: #fff;padding: 4px 6px;border-radius: 4px">'+$("#errorMess").attr("data-code5")+'</span>'
        }
        return txt
    }
},{
    "mData" : "tradeId",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "5%",
    "render":function (data,type,full) {
        return '<button type="button" class="props onli" data-src="/order/deal?tradeId='+data+'">'+$("#errorMess").attr("data-xq")+'</button>'
    }
}];
obj.datatable($('#table'),'/order/list/my?coin',columns,obj.eachJson,"get",null,[12],12);
obj.menu()
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(5).find('span').addClass('headerClass');