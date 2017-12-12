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
    "mData" : "gmtCreate",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "17%",
    "render":function (data,type,full) {
        return obj.formTime(data)
    }
},{
    "mData" : "type",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "7%",
    "render":function (data,type,full) {
        if(data==1){
            return '充值'
        }else if(data==2){
            return '提现'
        }else if(data==3){
            return '纠纷'
        }else{
            return '认证'
        }
    }
},{
    "mData" : "title",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "17%",
},{
    "mData" : "content",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "30%",
}];
obj.datatable($('#table'),'/case/list/my',columns,obj.eachJson,"get");
obj.menu()
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(5).find('span').addClass('headerClass');