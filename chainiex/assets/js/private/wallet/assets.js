var obj = obje();
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
var monu =[];
$.ajax({
    url:'/coin/list',
    type:'get',
    dataType:'json',
    success:function (res) {
        for(var i=0;i<res.data.coins.length;i++){
            monu[res.data.coins[i].coin]=res.data[res.data.coins[i].coin]
        }
        obj.datatable($('#table'),'/fund/list',columns,obj.eachJson,"get",null,[100]);
    }
})

var columns=[{
    "mData" : "coin",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render":function (data) {
        return '<div style="width: 40px;text-align: left;display: inline-block;"><img style="width:22px;" src="/images/'+data+'.png"></div><span style="color: #000;font-weight: bold;display: inline-block;width: 60px;font-family: Arial !important;">'+data+'</span>'
    }

}, {
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%"
}, {
    "mData" : "lockAmount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%"
}, {
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render" :function (data,type,full) {
        return obj.addnum(full.lockAmount,data)
    }
}, {
    "mData" : "tocny",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render":function (res,type,full) {
        return obj.fds(obj.addnum(full.lockAmount,full.amount), monu[full.coin])
    }
},{
    "mData": "coin",
    "orderable": false, // 禁用排序
    "sDefaultContent": "",
    "sWidth": "5%",
    "render": function (data,type,full) {
        return '<span class="spans rechange" data-coin="'+data+'" data-status="0">充值</span>'
    }
},{
    "mData": "coin",
    "orderable": false, // 禁用排序
    "sDefaultContent": "",
    "sWidth": "5%",
    "render": function (data,type,full) {
        return '<span class="spans withd" data-coin="'+data+'" data-amount="'+full.amount+'">提现</span>'
    }
}];
obj.menu()
var timer = null;
$('#table').on('click','.rechange',function () {
    if($(this).attr('data-status')!=0){
        return false
    }
    if( $(this).hasClass('setcla') == true){
        $(this).parents('tr').next().remove();
        $(this).removeClass('setcla');
        return false
    }
    $(this).attr('data-status',1)
    $('.spans').removeClass('setcla');
    $(this).addClass('setcla');
    var coin = $(this).attr('data-coin');
    var laft = $(this);
    $('.pras').remove();
    $.ajax({
        url:'/user/address?coin='+coin,
        type:'get',
        dataType:'json',
        success:function (obj) {
            if(obj.code==0){
                var txt = '<tr class="pras">' +
                    '<td colspan="7">' +
                    '<div class="appendDiv">' +
                    ' <ul>' +
                    ' <li><img src="'+obj.data.address.qrAddress+'"></li>' +
                    ' <li>' +
                    ' <div>' +
                    '   <p>'+coin+' 充值地址</p>' +
                    '     <input id="aa" value="'+obj.data.address.address+'">'+
                    '      <button id="copy">复制到剪切板</button>' +
                    '        </div>' +
                    ' </li>' +
                    ' <li>' +
                    '    <div>' +
                    '    <p>禁止向'+coin+'地址充值除'+coin+'之外的资产，任何充入'+coin+'地址的非'+coin+'资产将不可找回。</p>' +
                    '     <p>使用'+coin+'地址充值需要30个网络才能到账。</p>' +
                    '     <p>充值完成后，您可以进入历史纪录页面跟踪进度</p>' +
                    '       </div>' +
                    ' </li>' +
                    '    </ul>' +
                    '</div>' +
                    '</td>' +
                    '</tr>';
                laft.parents('tr').after(txt)
            }else{
                timer = setInterval(function () {
                    $.ajax({
                        url:'/user/address?coin='+coin,
                        type:'get',
                        dataType:'json',
                        success:function (obj) {
                            if(obj.code==0){
                                var txt = '<tr class="pras">' +
                                    '<td colspan="7">' +
                                    '<div class="appendDiv">' +
                                    ' <ul>' +
                                    ' <li><img src="'+obj.data.address.qrAddress+'"></li>' +
                                    ' <li>' +
                                    ' <div>' +
                                    '   <p>'+coin+' 充值地址</p>' +
                                    '     <input id="aa" value="'+obj.data.address.address+'">'+
                                    '      <button id="copy">复制到剪切板</button>' +
                                    '        </div>' +
                                    ' </li>' +
                                    ' <li>' +
                                    '    <div>' +
                                    '    <p>禁止向'+coin+'地址充值除'+coin+'之外的资产，任何充入'+coin+'地址的非'+coin+'资产将不可找回。</p>' +
                                    '     <p>使用'+coin+'地址充值需要30个网络才能到账。</p>' +
                                    '     <p>充值完成后，您可以进入历史纪录页面跟踪进度</p>' +
                                    '       </div>' +
                                    ' </li>' +
                                    '    </ul>' +
                                    '</div>' +
                                    '</td>' +
                                    '</tr>';
                                laft.parents('tr').after(txt)
                                clearInterval(timer);
                            }
                        },
                        error:function (obj) {
                            alert($('#errorMess').attr('data-fwq'))
                        }
                    })
                },2000)
            }
            laft.attr('data-status','0');
        },
        error:function (obj) {
            alert($('#errorMess').attr('data-fwq'))
        }
    })
})
var amount =null;
$('#table').on('click','.withd',function () {
    if( $(this).hasClass('setcla') == true){
        $(this).parents('tr').next().remove();
        $(this).removeClass('setcla');
        return false
    }
    $('.spans').removeClass('setcla');
    $(this).addClass('setcla');
    var coin = $(this).attr('data-coin');
    amount =$(this).attr('data-amount');
    var laft = $(this);
    $('.pras').remove();
    var txt = '<tr class="pras">' +
        '<td colspan="7">' +
        '<form id="form">'+
            '<div class="sendpr">' +
            '<ul>' +
                '<li>你有<span style="color: #ffc619;text-decoration: underline; cursor: pointer" id="sendzl">'+amount+'</span>个'+coin+'可用于提款<li>' +
                '<li>地址:<input type="text" class="alignRight" name="address" id="address"><li>' +
                '<li>量:<input type="text" class="alignRight" id="zl" name="amount" autocomplete="off"><li>' +
                '<li>手续费: <span class="alignRight pt1">0</span ><li>' +
                '<li>总: <span class="alignRight pt2">0</span><li>' +
                '<li><span class="alignRight rens" id="rens">提现</span><li>' +
                '<li>' +
                    '<p>最小提现数量为: 0.01'+coin+'</p>' +
                    '<p>提现请求申请成功后，减去: <span class="pgone">0</span>'+coin+'</p>' +
                '<li>' +
            '<input type="hidden" name="coin" id="ccoin" value="'+coin+'">'+
            '</ul>'+
            '</div>' +
        '</form>'+
        '</td>' +
        '</tr>';
    laft.parents('tr').after(txt);
    if($('#ecmm').val()==1){
        var tt = '<li>二重密码:<input type="password" class="alignRightl" placeholder="" id="rCount" name="code"><li>';
        $('#zl').parent().after(tt);
    }
});
$('#table').on('click','#copy',function () {
    try{
        var Url2=document.getElementById("aa");
        Url2.select();
        document.execCommand("Copy");
        alert("已复制好，可贴粘。");
    }catch (err){
        alert("复制失败，请手动复制。");
    }
});
$('#table').on('click','#sendzl',function () {
    $('#zl').val($(this).html())
});
$('#table').on('click','#rens',function () {
    if($('#zl').val()>$('#sendzl').html()){
        alert('提现的数量不能大于已有数量')
        return false;
    }
    var datas = {};
    datas[$('#csrf').attr('name')]=$('#csrf').val();
    datas['address']=$('#address').val();
    datas['amount']=$('#zl').val();
    datas['coin']=$('#ccoin').val();
    datas['code']=$('#rCount').val();

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
            }else if(res.code==6){
                alert('密码错误')
                $('#tfrom1').attr("disabled",false);
            }else if(res.code==3){
                alert('请填写完整')
                $('#tfrom1').attr("disabled",false);
            }else{
                $('#tfrom1').attr("disabled",false);

            }
        }
    })
})



// 历史纪录
var columns3=[{
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "15%",

}, {
    "mData" : "toAddress",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "57%"
},{
    "mData" : "status",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "8%",
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
    "sWidth" : "20%",
    "render":function (data,type,full) {
        return obj.formTime(data)
    }
}];
var columns2=[{
    "mData" : "coin",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "5%",
    "render":function (data,type,full) {
        return data
    }
},{
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
    "sWidth" : "10%",
    "render" :function (data,type,full) {
        return '<div style="width: 240px;\n' +
            '    word-break: break-all;\n' +
            '    font-size: 12px;\n' +
            '    text-align: center;\n' +
            '    line-height: 18px;">'+data+'</div>'
    }
}, {
    "mData" : "txId",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
    "render" :function (data,type,full) {
        return '<div style="width: 240px;\n' +
            '    word-break: break-all;\n' +
            '    font-size: 12px;\n' +
            '    text-align: center;\n' +
            '    line-height: 18px;">'+data+'</div>'
    }
},{
    "mData" : "amount",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "10%",
},{
    "mData" : "status",
    "orderable" : false, // 禁用排序
    "sDefaultContent" : "",
    "sWidth" : "5%",
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
var tab = obj.datatable($('#table2'),'/deposit/list?coin=BTC',columns2,obj.eachJson,"get",shouWrap,[5]);
var tabs = obj.datatable($('#table3'),'/withdraw/list?coin=BTC',columns3,obj.eachJson,"get",shouWrap,[5]);
function shouWrap() {
    if($('.wrap-right').height()+180>$('.footer').offset().top||$('.wrap-right').height()>=$(window).height()-276){
        $('.footer').css('position','relative')
    }else{
        $('.footer').css('position','fixed')
    }
}
$('.uplis').find('li').each(function () {
    $(this).on('click',function () {
        $('.uplis').find('h4').css('background','none')
        $(this).parents('ul').prev().css('background','#f2fafd');
        if($(this).attr('data-status')==0){
            tab.api().ajax.url('/deposit/list?coin='+$(this).html()).load();
            $('.tt').eq(0).css('display','block');
            $('.tt').eq(1).css('display','none');
        }else{
            tabs.api().ajax.url('/withdraw/list?coin='+$(this).html()).load();
            $('.tt').eq(1).css('display','block');
            $('.tt').eq(0).css('display','none');
        }
        var lebt =$(this);
        $(this).parent().prev().find('span').html(lebt.html());
    })
})
$('.colorr').on('change','#zl',function () {
    $('.pt1').html(obj.fds($(this).val(),$('#fee').val()))
    $('.pt2').html(obj.addnum(obj.fds($(this).val(),$('#fee').val()),$(this).val()))
    $('.pgone').html(obj.fds($(this).val(),$('#fee').val()))
})
$('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
$('.header-top>div>ul>li').eq(4).find('span').addClass('headerClass');