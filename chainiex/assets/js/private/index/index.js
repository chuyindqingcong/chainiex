var obj = obje();
obj.menu();
var uid = 0;//图表id

//公告
$.ajax({
    url:'/notice/list',
    type:'get',
    dataType:'json',
    data:{
        current:1,
        pageSize:3,
        content:1
    },
    success:function (req) {
        try {
            $('.wrap-tos p').html(req.data.notices[0].title).addClass('onli').attr('data-src',"/help/details?id=" + req.data.notices[0].id)
        } catch(err){}
    }
})

// 图标
// var myChart = echarts.init(document.getElementById('main'));
// var option = {
//     color : [ '#389A9E' ],
//     calculable : false,
//     grid : {
//         left : '1%',
//         right : '1%',
//         bottom : '1%',
//         containLabel : false
//     },
//     tooltip : {
//         trigger: 'axis',
//         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//             type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
//         },
//         formatter:function(e){
//             return e[0].data
//         }
//     },
//     xAxis :
//         {
//             show:false,
//             type : 'category',
//             boundaryGap : false,
//             axisLine : {
//                 show : false,
//                 onZero : false
//             },
//             data : ['null','null','null','null','null','null','null']
//         }
//     ,
//     yAxis :{
//         show:false,
//         type : 'value',
//         axisLine : {
//             show : false,
//             onZero : false
//         },
//     },
//     series : [
//         {
//             name:'成交',
//             type:'line',
//             smooth:true,
//             itemStyle: {normal: {areaStyle: {type: 'default'}}},
//             symbolSize : 3,
//             areaStyle : {
//                 normal : {
//                     color : '#389A9E',
//                     opacity : 0.5
//                 }
//             },
//             data:[2,3,1,4,2,1,5]
//         }
//     ]
// };
var arrColor=['#f7b33c','#3184cf','#95d86e','#52c2e2'];
var arrBGColor = ['#fce7c1','#b2d6ee','#c4e8ac','#d1eef8']
$.ajax({
    url:'/coin/list',
    type:'get',
    dataType:'json',
    success:function (req) {
        for(var i=0;i<req.data.coins.length;i++){
            var infos = null;
            var txt = null;
            for(var j=0;j<req.data.coinInfos.length;j++){
                if(req.data.coinInfos[j].coin==req.data.coins[i].coin){
                    infos = req.data.coinInfos[j]
                }
            }
            txt ='<div class="kap">\n' +
                    '            <img src="/images/'+req.data.coins[i].coin+'.png">\n' +
                    '            <h4>'+req.data.coins[i].name+'</h4>\n' +
                    '            <h5>( '+req.data.coins[i].coin+' )</h5>\n' +
                    '            <div class="iconLis">\n' +
                    '                <ul>\n' +
                    '                    <li>\n' +
                    '                        <img src="/images/m3.png" title="成交量">\n' +
                    '                        <span>'+infos.cur_adv+'</span>\n' +
                    '                    </li>\n' +
                    '                    <li>\n' +
                    '                        <img src="/images/m1.png" class="onli" data-src="/coin/sell?type=ask&coin='+req.data.coins[i].coin+'" title="买单量">\n' +
                    '                        <span>'+infos.sell_adv+'</span>\n' +
                    '                    </li>\n' +
                    '                    <li>\n' +
                    '                        <img src="/images/m2.png" class="onli" data-src="/coin/sell?type=bid&coin='+req.data.coins[i].coin+'" title="卖单量">\n' +
                    '                        <span>'+infos.buy_adv+'</span>\n' +
                    '                    </li>\n' +
                    '                </ul>\n' +
                    '            </div>\n' +
                    '            <div class="ech">\n' +
                    '                <div id="main'+uid+'"></div>\n' +
                    '                <div>\n' +
                    '                    <h6>'+infos.cur_adv+'</h6>\n' +
                    '                    <span>交易量</span>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '            <div class="nth">\n' +
                    '                <span class="onli" data-src="/coin/sell?type=ask&coin='+req.data.coins[i].coin+'">购买</span>\n' +
                    '                <span class="onli" data-src="/coin/sell?type=bid&coin='+req.data.coins[i].coin+'">出售</span>\n' +
                    '            </div>\n' +
                    '        </div>';
            $('.kaps').append(txt);
            var myChart = echarts.init(document.getElementById('main'+uid));
            var arrTime = []
            var arrAmount = []
            for(var p=0;p<infos.several_days.length;p++){
                arrAmount.unshift(infos.several_days[p].amount);
                arrTime.unshift(infos.several_days[p].gmtCreate)
            }
            arrAmount.push(infos.cur_adv);
            arrTime.push(new Date().getTime())
            if( arrTime.length<7){
                for(arrTime.length;arrTime.length<7;7-arrTime.length){
                    arrTime.unshift(0)
                    arrAmount.unshift(0)
                }
            }
            var option = {
                color : [ arrColor[uid] ],
                calculable : false,
                grid : {
                    left : '1%',
                    right : '1%',
                    bottom : '1%',
                    containLabel : false
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
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
                        data :arrTime
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
                        symbol:'pin',
                        symbolOffset:[0,'2px'],
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        symbolSize : 3,
                        areaStyle : {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: arrBGColor[uid]
                                }, {
                                    offset: 1,
                                    color: '#fff'
                                }])
                            }
                        },
                        data:arrAmount
                    }
                ]
            };
            myChart.setOption(option);
            myChart.on('click',function(eee){

            })
            uid++;
        }
    }
})
// 删除公告
$('.icon2').on('click',function () {
    $(this).parents('.wrap-tos').remove()
})