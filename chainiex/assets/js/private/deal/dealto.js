var obj = obje();
var getS = null;
var coinName = $('#errorMess').attr('data-coinname');
if($('#hiddens').val()==1){

}else{
    if($('.div-jd').find('.div-this').length==2){
        $('.div-this').eq(0).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-icon')+'</span> ');
        $('.div-jd img').eq(0).attr('src','/images/right1.png');


    }else if($('.div-jd').find('.div-this').length==3){
        $('.div-this').eq(0).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-paid')+'</span> ');
        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-paids')+'</span>');
        $('.div-jd img').eq(0).attr('src','/images/right1.png');
        $('.div-jd img').eq(1).attr('src','/images/right1.png');
    }else if($('.div-jd').find('.div-this').length==4){
        $('.div-this').eq(0).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-paid')+'</span> ');
        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-paids')+'</span> ');
        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-ypaids')+'</span> ');
    }
}

$('body').on('click','#clear',function () {
    $.ajax({
        type:'get',
        url:'/order/cancel',
        data:{
            tradeId:$('#hidden').val()
        },
        success:function (obj) {
            var obj = JSON.parse(obj);
            if(obj.code == 0){
                alert($('#errorMess').attr('data-no'))
                window.location.href='/'
            }
        }

    })
})
$('.dzz').on('click','#orz1',function () {
    var objs ={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.tradeId=$('#hidden').val();
    objs.type=$('#hidden').attr('data-type')==0?'bid':'ask';
    $.ajax({
        type:"post",
        url:'/order/payed',
        data:objs,
        dataType:"json",
        success:function (obj) {
            if(obj.code==0){

                getStatus1();
            }
        }
    })
})
$('.dzz').on('click','#orz',function () {
    var objs ={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.tradeId=$('#hidden').val();
    objs.type=$('#hidden').attr('data-type')==0?'bid':'ask';
    $.ajax({
        type:"post",
        url:'/order/payed',
        data:objs,
        dataType:"json",
        success:function (obj) {
           if(obj.code==0){

           }
        }
    })
})
$('.dzz').on('click','#faso',function () {
    if(!$('#getjy').length==0){
        $('#zc1').css('display','block')
    }else{
        var objs ={};
        objs[$('#csrf').attr('name')]=$('#csrf').val();
        objs.tradeId=$('#hidden').val();
        objs.type=$('#hidden').attr('data-type')==0?'bid':'ask';
        $.ajax({
            type:"post",
            url:'/order/received',
            data:objs,
            dataType:"json",
            success:function (res) {
                if(res.code==0){
                    getStatus2();
                }else if(res.code==4){
                    alert($('#errorMess').attr('data-passerr'))
                }
            }
        })
    }

})
$('.dzz').on('click','#faso1',function () {
    if(!$('#getjy').length==0){
       $('#zc2').css('display','block')
    }else{
       var objs ={};
       objs[$('#csrf').attr('name')]=$('#csrf').val();
       objs.tradeId=$('#hidden').val();
       objs.type=$('#hidden').attr('data-type')==0?'bid':'ask';
        $.ajax({
            type:"post",
            url:'/order/received',
            data:objs,
            dataType:"json",
            success:function (res) {
                if(res.code==0){
                    getStatus2();
                }else if(res.code==4){
                    alert($('#errorMess').attr('data-passerr'))
                }
            }
        })
    }
})
$('.rgbredd').each(function () {
    $(this).on('click',function () {
        try {
            $('#zc1').css('display','none');
            $('#zc2').css('display','none')
        }catch(f){}
    })
})
$('#sub1').on('click',function () {
    var objs ={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.tradeId=$('#hidden').val();
    objs.type=$('#hidden').attr('data-type')==0?'bid':'ask';
    objs.tradepass=$('#mmm1').val();
    $.ajax({
        type:"post",
        url:'/order/received',
        data:objs,
        dataType:"json",
        success:function (res) {
            if(res.code==0){
                $('.div-this').eq(1).html('<span>已释放</span>');
                $('.div-this').eq(2).html('<span>交易成功</span>');
                $('.div-this').next().next().addClass('div-this');
                $('.div-jd img').eq(1).attr('src','/images/right1.png');
                try {
                    $('#zc1').css('display','none');
                    $('#zc2').css('display','none')
                }catch(f){}
            }else if(res.code==4){
                alert($('#errorMess').attr('data-passerr'))
            }
        }
    })
})
$('#sub2').on('click',function () {
    var objs ={};
    objs[$('#csrf').attr('name')]=$('#csrf').val();
    objs.tradeId=$('#hidden').val();
    objs.type=$('#hidden').attr('data-type')==0?'bid':'ask';
    objs.tradepass=$('#mmm2').val();
    $.ajax({
        type:"post",
        url:'/order/received',
        data:objs,
        dataType:"json",
        success:function (res) {
            if(res.code==0){
                try {
                    $('#zc1').css('display','none');
                    $('#zc2').css('display','none')
                }catch(f){}
                getStatus2();
            }else if(res.code==4){
                alert($('#errorMess').attr('data-passerr'))
            }
        }
    })
})
// 出售页面
var timer = null;
if($('#hidden').attr('data-type')==0){
    $.ajax({
        url:'/user/address?coin='+coinName,
        type:'get',
        dataType:'json',
        success:function (obj) {
            if(obj.code==0){
                clearInterval(timer);
                $('.timer').html(obj.data.address.address)
            }else{
                timer = setInterval(function () {
                    $.ajax({
                        url:'/user/address?coin='+coinName,
                        type:'get',
                        dataType:'json',
                        success:function (obj) {
                            if(obj.code==0){
                                clearInterval(timer);
                                $('.timer').html(obj.data.address.address)
                            }
                        }
                    })
                },2000);
            }
        }
    })
}
if($('#m1').val()==1){
    function getStatus1() {
        getS = setInterval(function () {
            var objs = {};
            objs[$('#csrf').attr('name')] = $('#csrf').val();
            objs['tradeId'] = $('#hidden').val();
            $.ajax({
                url: '/order/status',
                type: 'get',
                data: objs,
                dataType: 'json',
                success: function (obj) {
                    if (obj.data.status ==1) {
                        $('.div-this').eq(0).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-icon')+'</span> ');
                        $('.div-this').eq(0).next().next().addClass('div-this');
                        var tp = '<p>对方已转账,请付款付款完成后，请务必点击“付款完成”。</p><div><button type="button" id="orz1" class="rsends">付款完成</button></div>';
                        $('.xqnr').html(tp);
                        clearInterval(getS)
                    }else if(obj.data.status==2){
                        $('.div-this').eq(0).next().next().addClass('div-this');
                        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>已付款</span> ');
                        $('.div-jd img').eq(0).attr('src','/images/right1.png');
                        $('.div-this').eq(1).next().next().addClass('div-this');
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>待确认</span> ');
                        $('.div-jd img').eq(1).attr('src','/images/right1.png');
                        $('.xqnr').html('<p>请等待对方发放'+coinName+'</p>');
                    }else if(obj.data.status ==3){
                        $('.div-jd img').eq(2).attr('src','/images/right1.png');
                        $('.div-this').eq(2).next().next().addClass('div-this');
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>已收币</span>');
                        $('.div-this').eq(3).html('<div class="sbnc"><b></b></div><span>系统处理中</span>');
                        $('.dzz').remove();
                    }else if (obj.data.status==4) {
                        $('.div-jd img').eq(2).attr('src','/images/right1.png');
                        $('.div-this').eq(2).next().next().addClass('div-this');
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>已收币</span>');
                        $('.dzz').remove();
                        $('.div-this').eq(3).html('<div class="sbnc"><b></b></div><span>交易成功</span>');
                        clearInterval(getS);
                    }
                }
            })
        }, 2000)
    }
    getStatus1()
}
if($('#m2').val()==1){
    function getStatus2() {
        getS = setInterval(function () {
            var objs = {};
            objs[$('#csrf').attr('name')] = $('#csrf').val();
            objs['tradeId'] = $('#hidden').val();
            $.ajax({
                url: '/order/status',
                type: 'get',
                data: objs,
                dataType: 'json',
                success: function (obj) {
                    if (obj.data.status ==1) {
                        $('.div-this').eq(0).html('<div class="sbnc"><b></b></div><span>'+$('#errorMess').attr('data-icon')+'</span> ');
                        $('.div-jd img').eq(0).attr('src','/images/right1.png');
                        $('.div-this').eq(0).next().next().addClass('div-this');
                        var tp = '<p>等待对方转账</p> <div>\n' +
                            '                                                <button type="button" id="clear" class="rsend" style="margin-right: 0px;">交易取消</button>\n' +
                            '                                            </div>';
                        $('.xqnr').html(tp)
                    }else if(obj.data.status==2){
                        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>已收款</span> ');
                        $('.div-jd img').eq(1).attr('src','/images/right1.png');
                        $('.div-this').eq(1).next().next().addClass('div-this');
                        var tp = '<p>对方已转账,请查看到账后，请务必点击“释放'+coinName+'”。</p><div><button type="button" id="faso1" class="rsends">释放'+coinName+'</button></div>';
                        $('.xqnr').html(tp)
                        clearInterval(getS)
                    }else if (obj.data.status ==3){
                        $('.div-jd img').eq(2).attr('src','/images/right1.png');
                        $('.div-this').eq(2).next().next().addClass('div-this');
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>已释放</span> ');
                        $('.div-this').eq(3).html('<div class="sbnc"><b></b></div><span>系统处理中</span>');
                    }else if (obj.data.status==4) {
                        $('.div-jd img').eq(2).attr('src','/images/right1.png');
                        $('.div-this').eq(2).next().next().addClass('div-this');
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>已释放</span> ');
                        $('.dzz').html('<div class="xqnr">' +
                            '                                        <div>' +
                            '                                            <button type="button" id="haoping" class="rsend">好评</button>' +
                            '                                            <button type="button" id="xinren" class="rsend" style="margin-right: 0px;">信任</button>' +
                            '                                        </div>' +
                            '                                    </div>')
                        $('.div-this').eq(3).html('<div class="sbnc"><b></b></div><span>交易成功</span>');
                        clearInterval(getS)
                    }
                }
            })
        }, 2000)
    }
    getStatus2()
}
if($('#m3').val()==1){
    function getStatus3() {
        getS = setInterval(function () {
            var objs = {};
            objs[$('#csrf').attr('name')] = $('#csrf').val();
            objs['tradeId'] = $('#hidden').val();
            $.ajax({
                url: '/order/status',
                type: 'get',
                data: objs,
                dataType: 'json',
                success: function (obj) {
                    if(obj.data.status==2){
                        $('.div-this').eq(0).next().next().addClass('div-this');
                        $('.div-this').eq(0).html('<div class="sbnc"><b></b></div><span>已转账</span>');
                        $('.div-jd img').eq(0).attr('src','/images/right1.png');
                        $('.div-this').eq(1).html('<div class="sbnc">  <b>\n' +
                            '                                                   <svg class="icon shoui" aria-hidden="true">\n' +
                            '                                                       <use xlink:href="#icon-jinbi"></use>\n' +
                            '                                                   </svg>\n' +
                            '                                               </b></div><span>待确认</span>')
                        $('.xqnr').html('<p>请等待对方发放'+coinName+'</p>');
                    }else if(obj.data.status ==3){
                        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>已释放</span>');
                        $('.div-jd img').eq(1).attr('src','/images/right1.png');
                        $('.div-this').eq(0).next().next().addClass('div-this');
                        $('.div-this').eq(0).next().next().next().next().addClass('div-this');
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>系统处理中</span>');
                    }else if (obj.data.status==4) {
                        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>已释放</span>');
                        $('.div-jd img').eq(1).attr('src','/images/right1.png');
                        $('.div-this').eq(0).next().next().addClass('div-this');
                        $('.div-this').eq(0).next().next().next().next().addClass('div-this');
                        $('.dzz').html('<div class="xqnr">\n' +
                            '                                        <div>\n' +
                            '                                            <button type="button" id="haoping" class="rsend">好评</button>\n' +
                            '                                            <button type="button" id="xinren" class="rsend" style="margin-right: 0px;">信任</button>\n' +
                            '                                        </div>\n' +
                            '                                    </div>')
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>交易成功</span>');
                        clearInterval(getS);
                    }
                }
            })
        }, 2000)
    }
    getStatus3()
}
if($('#m4').val()==1){
    function getStatus4() {
        getS = setInterval(function () {
            var objs = {};
            objs[$('#csrf').attr('name')] = $('#csrf').val();
            objs['tradeId'] = $('#hidden').val();
            $.ajax({
                url: '/order/status',
                type: 'get',
                data: objs,
                dataType: 'json',
                success: function (obj) {
                    if (obj.data.status==4) {
                        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>已释放</span>');
                        $('.div-jd img').eq(1).attr('src','/images/right1.png');
                        $('.dzz').remove();
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>交易成功</span>');

                        clearInterval(getS)
                    }else if(obj.data.status ==3){
                        $('.div-this').eq(1).html('<div class="sbnc"><b></b></div><span>已释放</span>');
                        $('.div-jd img').eq(1).attr('src','/images/right1.png');
                        $('.dzz').remove();
                        $('.div-this').eq(2).html('<div class="sbnc"><b></b></div><span>系统处理中</span>');
                    }else if(obj.data.status==2){
                        var tp = '<p>请仔细确认是否到账的付款信息到账后，请务必点击“发放'+coinName+'”。</p><div><button type="button" id="faso" class="rsends">发放'+coinName+'</button></div>';
                        $('.div-this').eq(0).html('<div class="sbnc"><b></b></div><span>待确认</span>')
                        $('.div-jd img').eq(0).attr('src','/images/right1.png');
                        $('.div-this').eq(0).next().next().addClass('div-this');
                        $('.div-this').eq(1).html('<div class="sbnc"><b> <svg class="icon shoui" aria-hidden="true">\n' +
                            '                                                       <use xlink:href="#icon-jinbi"></use>\n' +
                            '                                                   </svg></b></div><span>已付款</span> ');

                        $('.xqnr').html(tp)
                    }
                }
            })
        }, 2000)
    }
    getStatus4()
}
//放大二维码
$('.eimg').find('img').eq(0).on('mousemove',function () {
    $('.dtimg').css({'z-index':30,'opacity':1})
})
$('.eimg').find('img').eq(0).on('mouseout',function () {
    $('.dtimg').css({'z-index':-1,'opacity':0})
})

//聊天
    var socket = new SockJS("/chainiex");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        stompClient.subscribe('/chain_u/message/chat',function(greeting){
            var mess = JSON.parse(greeting.body);
            var date = new Date();

            var txt = '    <li>\n' +
                '                    <img src="'+$('#usersTo').attr('data-img')+'">\n' +
                '                    <div>\n' +
                '                        <div>'+$('#usersTo').attr('data-name')+' <o>'+date.getHours()+'：'+date.getMinutes()+'</o></div>\n' +
                '                        <div>\n' +
                '                            <span>'+mess.content+'</span>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </li>';
            $('.qqmess ul').append(txt)
        });
    });

    $('#sendMess').on('click',function () {
        var date = new Date();
        var txt = '<li class="user">\n' +
            '                    <div>\n' +
            '                        <div><o>'+date.getHours()+'：'+date.getMinutes()+'</o> '+$('#users').attr('data-name')+' </div>\n' +
            '                        <div>\n' +
            '                            <span>'+$('#textMess').val()+'</span>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    <img src="'+$('#users').attr('data-img')+'">\n' +
            '                </li>'
        $('.qqmess ul').append(txt)
        stompClient.send("/app/chat", {}, JSON.stringify({ 'content': $('#textMess').val(), "sessionId": $('#mess').attr('data-tradeId'),"type":0,"toId":$('#mess').attr('data-toId')}));
        $('#textMess').val("")
    })
var count = 0;
var thisCount=1;
$.ajax({
    url:'/comm/list',
    type:'get',
    data:{
        sessionId:$('#hidden').val(),
        current:thisCount,
        pageSize:10
    },
    dataType:'json',
    success:function (res) {
        var txt = '';
        count =Math.ceil(res.data.data.totalResults/10);
        if(!res.data.data.data){
            return false
        }
        for(var i=res.data.data.data.length-1;i>=0;i--){
            var date = new Date(res.data.data.data[i].gmtCreate);
            if(res.data.data.data[i].fromUser==$('#users').attr('data-id')){
                txt+='<li class="user">\n' +
                    '                    <div>\n' +
                    '                        <div><o>'+date.getHours()+'：'+date.getMinutes()+'</o> '+$('#users').attr('data-name')+' </div>\n' +
                    '                        <div>\n' +
                    '                            <span>'+res.data.data.data[i].content+'</span>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                    <img src="'+$('#users').attr('data-img')+'">\n' +
                    '                </li>'
            }else{
                txt +='    <li>\n' +
                    '                    <img src="'+$('#usersTo').attr('data-img')+'">\n' +
                    '                    <div>\n' +
                    '                        <div>'+$('#usersTo').attr('data-name')+' <o>'+date.getHours()+'：'+date.getMinutes()+'</o></div>\n' +
                    '                        <div>\n' +
                    '                            <span>'+res.data.data.data[i].content+'</span>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </li>';
            }
        }
        thisCount++
        if(txt.length>1){
            $('.qqmess ul').append(txt)
        }
    }
})
$('.qqmess').scroll(function (res) {
    if($('.qqmess').scrollTop()==0){
            if(count>thisCount){
                $.ajax({
                    url:'/comm/list',
                    type:'get',
                    data:{
                        sessionId:$('#hidden').val(),
                        current:thisCount,
                        pageSize:10
                    },
                    dataType:'json',
                    success:function (res) {
                        var txt = '';
                        count =Math.ceil(res.data.data.totalResults/10);
                        for(var i=9;i>=0;i--){
                            var date = new Date(res.data.data.data[i].gmtCreate);
                            if(res.data.data.data[i].fromUser == $('#users').attr('data-id')){
                                txt+='<li class="user">\n' +
                                    '                    <div>\n' +
                                    '                        <div><o>'+date.getHours()+'：'+date.getMinutes()+'</o> '+$('#users').attr('data-name')+' </div>\n' +
                                    '                        <div>\n' +
                                    '                            <span>'+res.data.data.data[i].content+'</span>\n' +
                                    '                        </div>\n' +
                                    '                    </div>\n' +
                                    '                    <img src="'+$('#users').attr('data-img')+'">\n' +
                                    '                </li>'
                            }else{
                                txt +='    <li>\n' +
                                    '                    <img src="'+$('#usersTo').attr('data-img')+'">\n' +
                                    '                    <div>\n' +
                                    '                        <div>'+$('#usersTo').attr('data-name')+' <o>'+date.getHours()+'：'+date.getMinutes()+'</o></div>\n' +
                                    '                        <div>\n' +
                                    '                            <span>'+res.data.data.data[i].content+'</span>\n' +
                                    '                        </div>\n' +
                                    '                    </div>\n' +
                                    '                </li>';
                            }
                        }
                        thisCount++
                        if(txt.length>1){
                            $('.qqmess ul').prepend(txt)
                        }
                    }
                })
            }
    }
})
//好评信任
var objsd = {}
objsd[$('#csrf').attr('name')]=$('#csrf').val();
objsd.tradeId=$('#mess').attr('data-tradeId');
$('.wraps').on('click','#haoping',function () {
    objsd.type=0;
    $.ajax({
        url:'/user/trust',
        type:'post',
        dataType:'json',
        data:objsd,
        success:function (res) {
            if(res.code==0){
                alert('评价成功');
               $('.dzz').eq(0).remove()
            }
        }
    })
})
$('.wraps').on('click','#xinren',function () {
    objsd.type=1;
    $.ajax({
        url:'/user/trust',
        type:'post',
        dataType:'json',
        data:objsd,
        success:function (res) {
            if(res.code==0){
                alert('评价成功');
                $('.dzz').eq(0).remove()
            }
        }
    })
})