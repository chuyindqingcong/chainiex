Highcharts.one = {
  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
           '#FF9655', '#FFF263', '#6AF9C4'],
  chart: {
      backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [
              [0, 'rgb(255, 255, 255)'],
              [1, 'rgb(255,255,255)']
          ]
      },
  },

  title: {
      style: {
          color: '#000',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
  },
       yAxis: {  
        title: {  
            style:{ "color": "#666"}  
        },  
        markable:{enabled:false},//不显示每一个点的实心  
        labels: {  
            style: {  
                color: '#666'  
            }  
        },   
         gridLineColor: "#E6E6E6",
         
    },   
      xAxis: {  
        labels: {  
            style: {  
                color: '#666'  
            }  
        },
         lineColor: "#E6E6E6",

            tickColor: "#666",
            title: {
                style: {
                    color: "#666"
                }
            }       
    },
  subtitle: {
      style: {
          color: '#666666',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
  },

  legend: {
      itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: 'black'
      },
      itemHoverStyle:{
          color: 'gray'
      }   
  },
   lang: {
             rangeSelectorZoom: ''
        },global: { useUTC: false }
};
Highcharts.to = {
  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
           '#FF9655', '#FFF263', '#6AF9C4'],
  chart: {
      backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [
              [0, '#14384b'],
              [1, '#14384b']
          ]
      },
  },
  xAxis: {  
        labels: {  
            style: {  
                color: '#A1B5C1'  
            }  
        },
         lineColor: "#507691",
         minorGridLineColor: "#507691",
            tickColor: "#507691",
            title: {
                style: {
                    color: "#507691"
                }
            }       
    },
     yAxis: {  
        title: {  
            style:{ "color": "#FFFFFF"}  
        },  
        markable:{enabled:false},//不显示每一个点的实心  
        labels: {  
            style: {  
                color: '#A1B5C1'  
            }  
        },   
         gridLineColor: "#507691",
         
    },   
  title: {
      style: {
          color: '#000',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
  },
  rangeSelector: {
            buttonTheme: {
                fill: "#505053",
                stroke: "#000000",
                style: {
                    color: "#CCC"
                },
                states: {
                    hover: {
                        fill: "#707073",
                        stroke: "#000000",
                        style: {
                            color: "white"
                        }
                    },
                    select: {
                        fill: "#000003",
                        stroke: "#000000",
                        style: {
                            color: "white"
                        }
                    }
                }
            },
            inputBoxBorderColor: "#505053",
            inputStyle: {
                backgroundColor: "#333",
                color: "silver"
            },
            labelStyle: {
                color: "silver"
            }
        },
  legend: {
      itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: 'fff'
      },
      itemHoverStyle:{
          color: 'fff'
      }   
  },
   lang: {
             rangeSelectorZoom: ''
        },global: { useUTC: false }
};