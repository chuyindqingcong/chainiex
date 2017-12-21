(function(H) {

    var langOptions = {
            en: H.merge(H.getOptions(), {
                lang: {
                    rangeSelectorZoom: ''
                },
                rangeSelector: {
                    buttons: [{
                        type: 'month',
                        count: 1,
                        text: '1m'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    }, {
                        type: 'year',
                        count:  1,
                        text: '1y'
                    }, {
                        type: 'all',
                        text: 'All'
                    }]
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%e. %b',
                        week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y'
                    }
                },

                navigator: {
                    xAxis: {
                        dateTimeLabelFormats: {
                            millisecond: '%H:%M:%S.%L',
                            second: '%H:%M:%S',
                            minute: '%H:%M',
                            hour: '%H:%M',
                            day: '%e. %b',
                            week: '%e. %b',
                            month: '%b \'%y',
                            year: '%Y'
                        }
                    }
                }
            }),
            'zh_CN': {
                lang: {
                    // Highcharts
                    contextButtonTitle: '图表导出菜单',
                    decimalPoint: '.',
                    downloadJPEG: "下载JPEG图片",
                    downloadPDF: "下载PDF文件",
                    downloadPNG: "下载PNG文件",
                    downloadSVG: "下载SVG文件",
                    drillUpText: "返回 {series.name}",
                    invalidDate: '无效的时间',
                    loading: '加载中...',
                    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    noData: "没有数据",
                    numericSymbols: null,
                    printChart: "打印图表",
                    resetZoom: '重置缩放比例',
                    resetZoomTitle: '重置为原始大小',
                    shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    thousandsSep: ',',
                    weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],

                    // Highstock
                    rangeSelectorFrom: '开始时间',
                    rangeSelectorTo: '结束时间',
                    rangeSelectorZoom: '',

                    // Highmaps
                    zoomIn: '缩小',
                    zoomOut: '放大'
                },

                global: {
                    // 不使用 UTC时间
                    // useUTC: false,
                    //timezoneOffset: -8 * 60,
                    canvasToolsURL: protocol + '//cdn.hcharts.cn/highcharts/modules/canvas-tools.js',
                    VMLRadialGradientURL: protocol + +'//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png'
                },

                // title: {
                //     text: '图表标题'
                // },

                tooltip: {
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%Y-%m-%d',
                        week: '%Y-%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                    },
                    split: false
                },

                exporting: {
                    url: protocol + '//export.highcharts.com.cn'
                },

                credits: {
                    text: 'Highcharts.com.cn',
                    href: 'https://www.highcharts.com.cn'
                },

                xAxis: {
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%Y-%m-%d',
                        week: '%Y-%m',
                        month: '%Y-%m',
                        year: '%Y'
                    }
                },

                /**
                 * Highstock
                 */


                rangeSelector: {
                    inputDateFormat: '%Y-%m-%d',
                    buttonTheme: {
                        width: 'auto',
                        style: {
                            fontSize: '12px',
                            padding: '4px'
                        }
                    },

                    buttons: [{
                        type: 'month',
                        count: 1,
                        text: '时'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '天'
                    }, {
                        type: 'week',
                        count: 1,
                        text: '周'
                    }, {
                        type: 'month',
                        count: 1,
                        text: '月'
                    }, {
                        type: 'all',
                        text: '所有'
                    }]
                },

                navigator: {
                    xAxis: {
                        dateTimeLabelFormats: {
                            millisecond: '%H:%M:%S.%L',
                            second: '%H:%M:%S',
                            minute: '%H:%M',
                            hour: '%H:%M',
                            day: '%Y-%m-%d',
                            week: '%Y-%m',
                            month: '%Y-%m',
                            year: '%Y'
                        }
                    }
                },

                plotOptions: {
                    series: {
                        dataGrouping: {
                            dateTimeLabelFormats: {
                                millisecond: ['%Y-%m-%d %H:%M:%S.%L', '%Y-%m-%d %H:%M:%S.%L', ' ~ %H:%M:%S.%L'],
                                second: ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S', ' ~ %H:%M:%S'],
                                minute: ['%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M', ' ~ %H:%M'],
                                hour: ['%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M', ' ~ %H:%M'],
                                day: ['%Y-%m-%d', '%Y-%m-%d', ' ~ %Y-%m-%d'],
                                week: ['%Y-%m-%d', '%Y-%m-%d', ' ~ %Y-%m-%d'],
                                month: ['%Y-%m', '%Y-%m', ' ~ %Y-%m'],
                                year: ['%Y', '%Y', ' ~ %Y']
                            }
                        }
                    },
                    ohlc: {
                        tooltip: {
                            split: false,
                            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
                                '开盘：{point.open}<br/>' +
                                '最高：{point.high}<br/>' +
                                '最低：{point.low}<br/>' +
                                '收盘：{point.close}<br/>'
                        }
                    },
                    candlestick: {
                        tooltip: {
                            split: false,
                            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
                                '开盘：{point.open}<br/>' +
                                '最高：{point.high}<br/>' +
                                '最低：{point.low}<br/>' +
                                '收盘：{point.close}<br/>'
                        }
                    }
                }
            }
        },
        protocol = window.location.protocol;

    H.Chart.prototype.setLang = function(lang, extraOptions, redraw) {
        if (langOptions[lang]) {

            var options = H.merge({}, langOptions[lang], extraOptions || {});
            this.update(options, redraw || true);
        }
    }
})(Highcharts);