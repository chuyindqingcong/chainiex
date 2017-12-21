var myChart = echarts.init(document.getElementById('container'));

function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumns.push(rawData[i][4]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumns: volumns
    };
}
function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data.values[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
}

$.get('/stock-DJI.json', function (rawData) {
    var data = splitData(rawData);
    myChart.setOption(option = {
        backgroundColor: 'white',
        animation: false,
        legend: {
            bottom: 10,
            left: 'center',
            // data: ['参考数据', 'MA10', 'MA20', 'MA30','MA5'],
            inactiveColor: '#777',
            textStyle: {
                color: '#fff'
            },
            selected: {
                'MA10':true,
                '参考数据':true,
                'MA20':false,
                'MA30':false,
                'MA5':false
            },
        },
        tooltip: {
            showContent:false,//不现实悬浮提示
            trigger: 'none',
            // trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 0
                }
            },
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
        // toolbox: {
        //     feature: {
        //         dataZoom: {
        //             yAxisIndex: false
        //         },
        //         brush: {
        //             type: ['lineX', 'clear']
        //         }
        //     }
        // },
        // brush: {
        //     xAxisIndex: 'all',
        //     brushLink: 'all',
        //     outOfBrush: {
        //         colorAlpha: 0.1
        //     }
        // },
        grid: [
            {
                left: '10%',
                right: '5%',
                height: '50%',
            },
            {
                left: '5%',
                right: '5%',
                bottom: '20%',
                height: '15%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                // data: data.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false,lineStyle: { color: '#333333' }},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                // axisPointer: {
                //     z: 100
                // },
                //
                axisPointer: {
                    label: {
                        show:false,
                        formatter: function (params) {
                            linedata(params['seriesData'][0]['value']);
                            var seriesValue = (params.seriesData[0] || {}).value;
                            return params.value
                                + (seriesValue != null
                                        ? '\n' + echarts.format.addCommas(seriesValue)
                                        : ''
                                );
                        }
                    }
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                // data: data.categoryData,
                scale: true,
                boundaryGap : false,
                axisLine: {onZero: false},
                axisTick: {show: false},
                splitLine: {show: false},
                axisLabel: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            coinmember(params['seriesData'][0]['value']);
                            var seriesValue = (params.seriesData[0] || {}).value;
                            return params.value
                                + (seriesValue != null
                                        ? '\n' + echarts.format.addCommas(seriesValue)
                                        : ''
                                );
                        }
                    }
                }
            }
        ],
        yAxis: [
            {

                axisLine: {onZero: false,lineStyle: { color: '#333333' },},
                scale: true,
                splitArea: {
                    show: false
                },splitLine: {show: false}
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {show: false,},
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 50,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '85%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: '参考数据',
                type: 'candlestick',
                // data: data.values,
                dimensions:['','开盘','收盘','最低','最高'],
                itemStyle: {
                    normal: {
                        color: '#FD1050',
                        color0: '#06b800',
                        borderColor: '#FD1050',
                        borderColor0: '#06b800'
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        param = param[0];
                        return [
                            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                            'Open: ' + param.data[0] + '<br/>',
                            'Close: ' + param.data[1] + '<br/>',
                            'Lowest: ' + param.data[2] + '<br/>',
                            'Highest: ' + param.data[3] + '<br/>'
                        ].join('');
                    }
                },
                markLine: {
                    silent: true,
                    data: [{
                        yAxis: 0.00,
                    }],
                }
            },
            {
                name: 'MA5',
                type: 'line',
                markLine: {
                    data: [
                        {type: 'max', name: '最大值'}
                    ]
                }
            },
            {
                name: 'MA10',
                type: 'line',
                // data: calculateMA(10, data),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5,color:'gray'}
                }
            },
            {
                name: 'MA20',
                type: 'line',
                // data: calculateMA(5, data),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA30',
                type: 'line',
                // data: calculateMA(30, data),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },

            {
                name: '交易量',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                // data: data.volumns,
                itemStyle:{
                    normal:{
                        color:'#06b800'
                    }
                }
            }
        ]
    });
});
// myChart.showLoading();
function up() {
    // var newmoney=17832+Math.ceil(Math.random()*100);//最新价格
    // var data0=option.series[0].data;
    // // var data1=option.series[1].data;
    // var data5=option.series[5].data;
    // // data1[data1.length-2]=0;//加个归0
    // // data1.shift();//删除第一个数组元素
    // // data1.push(newmoney);
    // data5.shift();
    // data5.push([89440000+Math.random()*100]);
    // data0.shift();
    // data0.push([newmoney,17780+Math.ceil(Math.random()*100),17770+Math.ceil(Math.random()*10),17920+Math.ceil(Math.random()*100),894440000+Math.ceil(Math.random()*100)]);
        var id = '38';
        var url =objs.getUrl()
        if(!(url==undefined)){
            id=url.id
        }
    var volume = [];
    $.get("/Home/Orders/getOrdersKline",{"currency_id":id,"time":"kline_1h"},function(orders){
         option.series[0].data=orders['kline_1h'];
         var timedata=[];
         var kdata=[];
         var coinmember=[];//交易量
		 var ma10=[];
         for(var i=0;i<orders['kline_1h'].length;i++)
         {
             timedata[i]=orders['kline_1h'][i][0];
             kdata[i]=[orders['kline_1h'][i][2],orders['kline_1h'][i][3],orders['kline_1h'][i][4],orders['kline_1h'][i][5]];
             coinmember[i]=orders['kline_1h'][i][1];
			 ma10[i]=orders['kline_1h'][i][5];
         }
		 option['series'][0]['markLine']['data'][0]['yAxis']=orders['kline_1h'][orders['kline_1h'].length-1][2];
         option.xAxis[1].data=timedata;
         option.xAxis[0].data=timedata;
         option.series[0].data=kdata;
         option.series[5].data=coinmember;
		   option.series[2].data=ma10;
         myChart.setOption(option);
			myChart.hideLoading();
        //ma线
    });
}
setTimeout(up,1);

var datatime='kline_1h';
var timetmp=0;//缓存
$('.line-select button').click(function () {
    myChart.showLoading();
    timetmp=$(this).index();
    $('button[data-time='+datatime+']').removeClass('btn-select');
    gettime(timetmp);
    $('button[data-time='+timetmp+']').addClass('btn-select');
    datatime =timetmp;//缓存键值复制
});
function gettime(member) {
    //获取时间键值
    switch (member){
        case 0:
            timetmp='kline_1m';
            break;
        case 1:
            timetmp='kline_3m';
            break;
        case 2:
            timetmp='kline_5m';
            break;
        case 3:
            timetmp='kline_15m';
            break;
        case 4:
            timetmp='kline_30m';
            break;
        case 5:
            timetmp='kline_1h';
            break;
        case 6:
            timetmp="kline_8h";
            break;
        case 7:
            timetmp='kline_12h';
            break;
        case 8:
            timetmp='kline_1d';
            break;
        case 9:
            timetmp='kline_7d';
            break;
    }
    $.get("/Home/Orders/getOrdersKline",{"currency":$("#currency_id").val(),"time":timetmp},function(orders){
        var volume = [];
        // option.series[0].data=orders['kline_1h'];
        var index=null;
        var getdata=[];
        for(var item in orders){
            getdata=orders[item];
        }
        var timedata=[];
        var kdata=[];
        var coinmember=[];//交易量
        var kbiao=[];
        var ma10=[];
        for(var i=0;i<getdata.length;i++)
        {
            timedata[i]=getdata[i][0];
            kdata[i]=[getdata[i][2],getdata[i][3],getdata[i][4],getdata[i][5]];
            coinmember[i]=getdata[i][1];
            ma10[i]=getdata[i][5];
        }
        kbiao[0]=getdata[getdata.length-1][2];
        option['series'][0]['markLine']['data'][0]['yAxis']=kbiao[0]=getdata[getdata.length-1][2];
        option.xAxis[1].data=timedata;
        option.xAxis[0].data=timedata;
        option.series[0].data=kdata;
        option.series[1].data=kbiao;
        option.series[2].data=ma10;
        option.series[5].data=coinmember;
        delete option['dataZoom'][0]['end'];
        delete option['dataZoom'][0]['start'];
        delete option['dataZoom'][1]['start'];
        delete option['dataZoom'][1]['end'];
        myChart.setOption(option);
        myChart.hideLoading();
    });
}
//更新成交量
function coinmember(values) {
    if(values)
    {
        $('#coinmember').html(values);
    }else{
         $('#coinmember').html(0);
    }
}
//显示当前鼠标位置价格
function linedata(value) {
    if(value){
        //防止false终止程序
        $('.show-data #openmoney').html(value[1]);
        $('.show-data #closemoney').html(value[2]);
        $('.show-data #heightmoney').html(value[3]);
        $('.show-data #lowmoney').html(value[4]);
    }else{

    }
}
