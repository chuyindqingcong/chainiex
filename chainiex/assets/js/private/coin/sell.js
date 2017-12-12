var project = {};
var obj = obje()
project.init = function () {
    //选择搜索方式
    this.soso();
    //搜索内容
    this.query();
    //只允许输入数字
    obj.yesNum()
}
project.soso = function () {
    $('#fs li').each(function () {
        $(this).on('click',function () {
           $(this).parents('ul').prev().find('o').html($(this).html())
            $('.showfs>div').eq($(this).index()).css('display','block').siblings().css('display','none')
            $('#puid').val($(this).attr('data-status'));
            $('.adUser ul').css('display','none');
            setTimeout(function () {
                $('.adUser ul').removeAttr('style');
            },200)
        })
    })
}
project .query = function () {
    var url = obj.getUrl();
    if(url.type=='ask'){
        $('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
        $('.header-top>div>ul>li').eq(1).find('span').addClass('headerClass');
    }else{
        $('.header-top>div>ul>li').eq(0).find('span').removeClass('headerClass')
        $('.header-top>div>ul>li').eq(2).find('span').addClass('headerClass');
    }
    var columnsSale=[{
        "mData" : "email",
        "orderable" : false, // 禁用排序
        "sDefaultContent" : "",
        "sWidth" : "23%",
        "render" :function (data,type,full) {
            var txt=null
            if(full.userName){
                txt = full.userName
            }else{
                if(data.length>16){
                    txt = data.substring(0,16)+'...';
                }else{
                    txt = data.substring(0,16)
                }
            }

            var ex = full.ex==true?'<img src="/images/ex2.png" class="ex">':'<img src="/images/ex1.png" class="ex">';
            var userImg = full.profile?full.profile:'/images/default.jpg';
            var div = '<div class="userNa">' +
                '<div><img src="'+userImg+'" >'+ex+'</div> <span>'+txt+'</span></div>'
            return div
        }

    },{
        "mData" : "price",
        "orderable" : false, // 禁用排序
        "sDefaultContent" : "",
        "sWidth" : "25%",
        "render":function (data,type,full) {
            var txt = '交易量 '+full.tradeAmount+' | 好评度 '+full.reputation+' | 信任 '+full.trust;
            return txt
        }
    }, {
        "mData" : "payType",
        "orderable" : false, // 禁用排序
        "sDefaultContent" : "",
        "sWidth" : "7%",
        "render":function (data,type,full) {
            if(data==1){
                return $('#errorMess').attr('data-Bank');
            }else if(data ==2){
                return $('#errorMess').attr('data-Alipay');
            }else{
                return $('#errorMess').attr('data-WeChat');
            }
        }
    }, {
        "mData" : "minAmount",
        "orderable" : false, // 禁用排序
        "sDefaultContent" : "",
        "sWidth" : "18%",
        "render":function (data,type,full) {
            return data+"-"+full.leftAmount+' '+url.coin
        }
    }, {
        "mData" : "price",
        "orderable" : false, // 禁用排序
        "sDefaultContent" : "",
        "sWidth" : "15%",
        "render":function (data,type,full) {
            return '<span style="color: #828282;font-weight: bold">'+data+' CNY</span>'
        }
    },{
        "mData" : "type",
        "orderable" : false, // 禁用排序
        "sDefaultContent" : "",
        "sWidth" : "12%",
        "render" :function (data,type,full) {
            if(data==1){
                return '<button type="button" class="ggm onli" data-src="/quoted/buy?id='+full.id+'">购买</button>'
            }else{
                return '<button type="button" class="ggmto onli" data-src="/quoted/sell?id='+full.id+'">出售</button>'
            }
        }
    }];
    $('#minal').on('keydown',function (e) {
        if(e.which==13){
            $('.paging_simple_numbers').css('display','none');
            tab.api().ajax.url('/quoted/list?type=' + url.type + '&coin=' + url.coin + '&payType=' + $('#pay').val() + '&minAmount=' + $('#minal').val(), columnsSale).load(function (res) {
                if(res.data.page.totalResults>10){
                    $('.paging_simple_numbers').css('display','block');
                }
            });
        }
    })
    $('#username').on('keydown',function (e) {
        if(e.which==13){
            $('.paging_simple_numbers').css('display','none');
            tab.api().ajax.url('/quoted/user/list?type=' + url.type + '&coin=' + url.coin + '&username='+$('#username').val(), columnsSale).load(function (res) {
                if(res.data.page.totalResults>10){
                    $('.paging_simple_numbers').css('display','block');
                }
            });
        }
    })
    var tab = obj.datatable($('#table'),'/quoted/list?type='+url.type+'&coin='+url.coin,columnsSale,obj.eachJson,"get");
    $('#peytype ul li').each(function () {
        $(this).on('click',function () {
            $(this).parents('ul').prev().find('o').html($(this).html());
            $('#pay').val($(this).attr('data-status'))
            $('#peytype ul').css('display','none');
            setTimeout(function () {
                $('#peytype ul').removeAttr('style');
            },200)
        })
    })
    $('.but').on('click',function () {
       if($('#puid').val()==0) {
           $('.paging_simple_numbers').css('display','none');
           tab.api().ajax.url('/quoted/list?type=' + url.type + '&coin=' + url.coin + '&payType=' + $('#pay').val() + '&minAmount=' + $('#minal').val(), columnsSale).load(function (res) {
               if(res.data.page.totalResults>10){
                   $('.paging_simple_numbers').css('display','block');
               }
           });
       }else{
           $('.paging_simple_numbers').css('display','none');
           tab.api().ajax.url('/quoted/user/list?type=' + url.type + '&coin=' + url.coin + '&username='+$('#username').val(), columnsSale).load(function (res) {
               if(res.data.page.totalResults>10){
                   $('.paging_simple_numbers').css('display','block');
               }
           });
       }
    })
}
project.init();