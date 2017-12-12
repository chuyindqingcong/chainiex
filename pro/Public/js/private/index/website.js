var project = {}
var objs = new obje()
project.init=function(){
	    //获取数据
        this.getdata()
    // this.ech()
	//切换
	this.echClick()
    //发送注册请求
    this.send()
}
project.getdata = function (){
    $.ajax({
        url:'/Home/index/website',
        type:'post',
        dataType:'json',
        success:function(req){
            var arr1=[]
            var arr2=[]
            for(var i=0;i<req.data.length;i++){
                var txt = '<li>'+
                '  <p>'+req.data[i].currency_mark+'/USDT ('+parseFloat(req.data[i].latest_price)+')</p>'+
                '<div>'+
                '   <span>24小时量:'+parseInt(req.data[i].one_day_trades)+'</span>'+
                '   <span class="jggreen">('+parseFloat(req.data[i].up_or_down)+'%)</span>'+
                '  </div>'+
                ' </li>';
                var txts = ' <div class="swiper-slide">'+
                '<p>'+req.data[i].currency_mark+'/USDT ('+parseFloat(req.data[i].latest_price)+')</p>'+
                ' <div>'+
                '  <span>24小时量:'+parseInt(req.data[i].one_day_trades)+'</span>'+
                '   <span class="jggreen">('+parseFloat(req.data[i].up_or_down)+'%)</span>'+
                ' </div>';
                    $('#swipreList').append(txts)
                    $('#swipreList>div').eq(0).addClass('selectLi');
                    $('#iconlists').append(txt)

                    var arrs1=[]
                    var arrs2=[]
                for(var j=0;j<req.data[i].every_hour_trades.length;j++){
                    arrs1.push(req.data[i].every_hour_trades[j].hour)
                    arrs2.push(req.data[i].every_hour_trades[j].price)
                }
                if(arr1.length<24){
                    for(var b = arrs1.length;b<24;b++){
                        // arrs1.unshift((Math.random()+1)*10)
                        // arrs2.unshift((Math.random()+1)*10)
                        arrs1.unshift(0)
                        arrs2.unshift(0)
                    }
                }
                arr1.push(arrs1)
                arr2.push(arrs2)
            }
            $('#iconlists>li').eq(0).addClass('selectLi');
            //设施图表隐藏
            project.ech(arr1,arr2);
                  var swiper = new Swiper('.swiper-container', {
                        slidesPerView: 2,
                        spaceBetween: 0,
                        freeMode: true,
                        pagination: {
                          el: '.swiper-pagination',
                          clickable: true,
                      },
                    });
            $('.echs>div').eq(1).css('display','none')
            $('.echs>div').eq(2).css('display','none')
        }
    })
}
project.send = function() {
    $('#sendEmail').on('click',function(){
      $('#sendEmail').attr("disabled",true);
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
      if(!reg.test($('#email').val())){
        alert($('#mess').attr('data-error'))
        return false
    }
    $.ajax({
        url:'/Home/Reg/sendEmail',
        type:'post',
        data:{
            email:$('#email').val()
        },
        success:function(req){
            if(req.status==1){
                alert(req.info)
            }else{
             $('#sendEmail').attr("disabled",false);
             alert(req.info)
         }
     }
 })
})
}
project.echClick = function(){
	$('body').on('click','.jgxs li',function(){
		$('.echs>div').eq($(this).index()).css('display','block').siblings().css('display','none')
		$(this).addClass('selectLi').siblings().removeClass('selectLi')
	})
    $('body').on('click','#swipreList>div',function(){
        $('.echs>div').eq($(this).index()).css('display','block').siblings().css('display','none')
        $(this).addClass('selectLi').siblings().removeClass('selectLi')
    })
}
project.ech = function(arr1,arr2){
    for(var i=0;i<arr1.length;i++){
    var intId= i+1;
    var myChart = echarts.init(document.getElementById('char'+intId));
    $("#char"+intId).css( 'width', $("#char"+intId).width() );
    var option = {
        color : [ "#fff"],
        calculable : false,
        grid : {
            left : '0%',
            right : '0%',
            bottom : '1%',
            containLabel : false
        },
        tooltip : {
            trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter:function(e){
                        return e[0].data
                    }
                },
                xAxis :
                {
                    show:false,
                    type : 'category',
                    boundaryGap : false,
                    axisLine : {
                        show : false,
                        onZero : false
                    },
                    data :arr1[i]
                }
                ,
                yAxis :{
                    show:false,
                    type : 'value',
                    axisLine : {
                        show : false,
                        onZero : false
                    },
                },
                series : [
                {
                    name:'成交',
                    type:'line',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'},color:'rgba(255,255,255,.6)'}},
                    symbolSize :5,
                    showSymbol:true,
                    symbolRotate:false,
                    symbol:'image:///Public/img/bbb.png',
                     // symbol:'circle',   
                    areaStyle : {
                        normal: {
                            color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(255,255,255,.05)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(255,255,255,.01)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                        }
                    },
                    data:arr2[i]
                }
                ]
            };
            myChart.setOption(option);
    }
}

project.init()