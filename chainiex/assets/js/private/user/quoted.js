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

var obj = obje();
obj.menu()
var columns=[{
    "mData" : "coin",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "5%",
},{
    "mData" : "gmtCreate",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "15%",
    "render":function (data,type,full) {
        return obj.formTime(data);
    }

}, {
    "mData" : "type",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "5%",
    "render":function (data,type,full) {
        if(data==0){
            return '<span style="color:#84ca47">买</span>'
        }else if(data ==1){
            return '<span style="color:#fb5959">卖</span>'
        }
    }
}, {
    "mData" : "price",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%"
}, {
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
}, {
    "mData" : "dealAmount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%"
}, {
    "mData" : "leftAmount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
}, {
    "mData" : "status",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "8%",
    "render":function (data,type,full) {
        if(data ==0 ||data ==3){
            return $('#errorMess').attr('data-code1')
        }else if(data==6){
            return $('#errorMess').attr('data-code2')
        }else{
            if(data==4){
                return $('#errorMess').attr('data-code3')
            }else if(data==1){
                return $('#errorMess').attr('data-code6')
            }else if(data==2){
                return $('#errorMess').attr('data-code4')
            }else if(data==5){
                return $('#errorMess').attr('data-code5')
            }
        }
    }
}, {
    "mData" : "game_count",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "12%",
    "render":function (data,type,full) {
        if(full.status==0 ||full.status ==3||full.status==1){

        }else{
            var txt = "";
            if(full.status==6){
                 txt =  '<button type="button" class="props thiss" data-id="'+full.id+'" style="margin-right: 9px;" data-type="'+full.type+'" data-coin="'+full.coin+'">'+$('#errorMess').attr('data-jh')+'</button>'+
                    '<button type="button" class="props cle" data-id="'+full.id+'">'+$('#errorMess').attr('data-qx')+'</button>';
            }else if(full.status==4 ||full.status==2){
                txt = '<button type="button" class="props cle" data-id="'+full.id+'">'+$('#errorMess').attr('data-qx')+'</button>';
            }
            return txt
        }
    }
}];
var tab=obj.datatable($('#table'),'/quoted/list/my',columns,obj.eachJson,"get",null,[12],12);
$('#table').on('click','.cle',function () {
    var objs = {};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.advId=$(this).attr('data-id');
    $.ajax({
        url:'/quoted/cancel',
        type:'post',
        dataType:'JSON',
        data:objs,
        success:function (req) {
            if(req.code==0){
                tab.api().ajax.reload()
            }else if(req.code==4){
                alert($('#errorMess').attr('data-noqx'))
            }
        }
    })
})
$('#table').on('click','.thiss',function () {
    var objs = {};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.advId=$(this).attr('data-id');
    objs.type=$(this).attr('data-type')
    objs.coin = $(this).attr('data-coin')
    $.ajax({
        url:'/quoted/active',
        type:'post',
        dataType:'JSON',
        data:objs,
        success:function (req) {
            if(req.code==0){
                tab.api().ajax.reload()
            }else if(req.code==4){
                alert($('#errorMess').attr('data-max'))
            }else{
                alert(req.message)
            }
        }
    })
})
$('#sel').on('click',function () {
    if($(this).attr('data-status')==0){
        $('.ect').css({'height':'140px'})
        $(this).attr('data-status','1')
        $('#zzc').css('display','block')
    }else{
        $('.ect').css({'height':'0px'});
        $(this).attr('data-status','0')
        $('#zzc').css('display','none')
    }

})
$('.ect').on('click','li',function () {
    $('.paging_simple_numbers').css('display','none');
    tab.api().ajax.url('/quoted/list/my?status='+$(this).attr('data-status')).load(function (res) {
        if(res.data.page.totalResults>12){
            $('.paging_simple_numbers').css('display','block');
        }
    });
    $('.ect').css({'height':'0px'});
    $('#sel').attr('data-status','0');
    $('#zzc').css('display','none')
})
$('#zzc').on('click',function () {
    $('#sel').attr('data-status','0');
    $('#zzc').css('display','none');
    $('.ect').css({'height':'0px'});
})
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(5).find('span').addClass('headerClass');