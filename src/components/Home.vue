<template>
    <div class="home">
        <div class="home_header">
            <div class="topbox">
                     <span class="bigfont">分布式数据采集系统</span>
            </div>
            <div  class="font_line">
            </div>
            <div class="bottombox" style="display:flex">
                <span class="smallfont" style="margin:auto">
                    太阳能电池测试数据
                </span>
            </div>
        </div>
      <div class="home_content" >
         <div class="home_content_top">
            <div class="home_content_danti" >
                <div id="chartDanti" style="width:95%;height:100%"> 1</div>
            </div>
            <div class="home_content_dieceng">
                <div id="chartDieceng" style="width:95%;height:100%"></div>
            </div>
         </div>
         <div class="home_content_bottom">
             <div class="home_content_hanjie" >
                 <div id="chartHanjie" style="width:95%;height:100%"></div>
             </div>
             <div class="home_content_all" id="allCompare">
                 <div id="allCompare" style="width:95%;height:100%"></div>
             </div>
         </div>
      </div>
      <div class="home_footer_line">
      </div>
      <div class="home_footer_fonta">
          <span>数据自动采集系统    ®    Copy Right 2018</span>
      </div>
      <div class="home_footer_fontb">
          <span>上海空间电源研究所    免责声明</span>
      </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
              // 单体
              dantiLegend:[],
              dantiIndexParams:[], // 后端返回的 带批号的
              dantiIndex:[], //  X轴参数
              dantiIsc:[], // 纵轴
              dantiIm:[], // 纵轴
              dantiVoc:[], // 纵轴
              dantiVm:[], // 纵轴
              dantiEff:[], // 纵轴
              dantiFF:[], // 纵轴
              // 叠层
              diecengLegend:[],
              diecengIndexParams:[], // 后端返回的 带批号的
              diecengIndex:[], //  X轴参数
              diecengIsc:[], // 纵轴
              diecengImpp:[], // 纵轴
              diecengVoc:[], // 纵轴
              diecengVmpp:[], // 纵轴
              diecengEff:[], // 纵轴
              diecengFF:[], // 纵轴
              diecengIVLV1:[],
              // 焊接
              hanjieLegend:[],
              hanjieIndexParams:[],
              hanjieIndex:[], //  X轴参数
              hanjieAverageVoltage:[], // 纵轴
              hanjieAverageCurrent:[], // 纵轴
              hanjieAveragePower:[], // 纵轴
              hanjieAverageResistance:[], // 纵轴
              hanjieWeldPressure:[], // 纵轴
              hanjieReferenceTemperature:[], // 纵轴
              // 单体 叠层 比较
              compareData:[],
//              compareDimensions:[]
            }
        },
        created(){
          this.getChartData();
        },
        mounted(){
          this.drawLine();
        },

        methods:{
            getDantiParams:function(paramName){
                var res = '';
                for(var i=0;i<this.dantiIndex.length;i++){
                    if(this.dantiIndex[i]==paramName){
                        res=this.dantiIndexParams[this.dantiIndex.indexOf(paramName)]
                    }
                }
                return res;
            },
            getDiecengParams:function(paramName){
                var res = '';
                for(var i=0;i<this.diecengIndex.length;i++){
                    if(this.diecengIndex[i]==paramName){
                        res=this.diecengIndexParams[this.diecengIndex.indexOf(paramName)]
                    }
                }
                return res;
            },
            getHanjieParams:function(paramName){
                var res = '';
              res=this.hanjieIndexParams[Number(paramName)];
                return res;
            },
          getChartData:function () {
              let vm = this;
            this.$http.post('/getChartData', 'HomeCharts').then(function (res) {
              this.dantiLegend = res.data.unitTest.Legend;
              this.dantiIndexParams = res.data.unitTest.IndexParams;
              this.dantiIsc = res.data.unitTest.Isc;
              this.dantiIm = res.data.unitTest.Im;
              this.dantiVoc = res.data.unitTest.Voc;
              this.dantiVm = res.data.unitTest.Vm;
              this.dantiEff = res.data.unitTest.Eff;
              this.dantiFF = res.data.unitTest.FF;
              for(var i=0;i<res.data.unitTest.IndexParams.length;i++){
                var temp = i.toString();
                this.dantiIndex[i] = temp//.toString();
              }

              this.diecengLegend = res.data.stackTest.Legend;
              this.diecengIndexParams = res.data.stackTest.IndexParams;
              this.diecengIsc = res.data.stackTest.Isc;
              this.diecengImpp = res.data.stackTest.Impp;
              this.diecengVoc = res.data.stackTest.Voc;
              this.diecengVmpp = res.data.stackTest.Vmpp;
              this.diecengEff = res.data.stackTest.Eff;
              this.diecengFF = res.data.stackTest.FF;
              this.diecengIVLV1 = res.data.stackTest.IVLV1;
              for(var j=0;j<this.diecengIndexParams.length;j++){
                this.diecengIndex[j] = j.toString();
              }

              this.hanjieLegend = res.data.weldTest.Legend;
              this.hanjieIndexParams = res.data.weldTest.IndexParams;
              this.hanjieAverageVoltage = res.data.weldTest.AverageVoltage;
              this.hanjieAverageCurrent = res.data.weldTest.AverageCurrent;
              this.hanjieAveragePower = res.data.weldTest.AveragePower;
              this.hanjieAverageResistance = res.data.weldTest.AverageResistance;
              this.hanjieWeldPressure = res.data.weldTest.WeldPressure;
              this.hanjieReferenceTemperature = res.data.weldTest.ReferenceTemperature;
              for(var k=0;k<this.hanjieIndexParams.length;k++){
                this.hanjieIndex[k] = k.toString();
              }

//              this.compareDimensions = res.data.compare.compareDimensions;
              this.compareData = res.data.compare.compareData;
              vm.drawLine();

    });

         },
            drawLine(){
                var that = this;
                var echarts=require('echarts/lib/echarts');
                //引入柱状图饼状图折线图
                require('echarts/lib/chart/pie.js');
                require('echarts/lib/chart/bar.js');
                require('echarts/lib/chart/line.js');
                //引入提示框和标题组件
                require('echarts/lib/component/tooltip');
                require('echarts/lib/component/toolbox.js');
                //基于准备好的dom,初始化echarts实例
                var myChartDanti=echarts.init(document.getElementById('chartDanti'));
                var myChartDieceng=echarts.init(document.getElementById('chartDieceng'));
                var myChartHanjie=echarts.init(document.getElementById('chartHanjie'));
                var myChartCompare=echarts.init(document.getElementById('allCompare'));

                // 单体
                var dantiParams = {
                      title: {
                              text: '单体测试数据'
                      },
                      tooltip: {
                          trigger: 'axis',
                          axisPointer:{
                              label:{
                                formatter:function(params){
                                    var r=that.getDantiParams(params.value);
                                    return r
                                }
                            }
                          }
                      },
                      legend: {
                          left:110,
                          top:10,
                        itemwidth:10,
                        itemheight:10,
                          data:this.dantiLegend
                      },
                      grid: {
                          left: '3%',
                          right: '4%',
                          bottom: '3%',
                          containLabel: true
                      },
                       toolbox: {//工具栏,内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                          feature: {//各工具配置项。

                              dataView: {//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                                  show: true,//是否显示组件。
                                  readOnly: false,
                                  iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              },
                              dataZoom:{
                                  yAxisIndex:'none',
                                  iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }

                              },
                              magicType:{//动态类型切换 示例：feature: { magicType: {type: ['line', 'bar', 'stack', 'tiled']}}
                                  show:true,
                                  readOnly:false,
                                  type:['line','bar'],
                                   iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              },
                              restore: {//配置项还原。
                                  show: true,
                                   iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              },
                              saveAsImage: {//保存为图片。
                                  show: true,
                                   iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              }
                          }
                      },

                      xAxis: {
                          type: 'category',
                          boundaryGap: false,
                          data: this.dantiIndex
                      },
                      yAxis: {
                      type:'value'
                      },
                      series: [
                          {
                            name:this.dantiLegend[0],
                            type:'line',
                            stack: '1',
                            symbol:'none',
                            data:this.dantiIsc
                          },
                          {
                            name:this.dantiLegend[1],
                            type:'line',
                            stack: '2',
                            symbol:'none',
                            data:this.dantiIm
                          },
                          {
                            name:this.dantiLegend[2],
                            type:'line',
                            stack: '3',
                            symbol:'none',
                            data:this.dantiVoc
                          },
                          {
                            name:this.dantiLegend[3],
                            type:'line',
                            stack: '4',
                            symbol:'none',
                            data:this.dantiVm
                          },
                          {
                            name:this.dantiLegend[4],
                            type:'line',
                            stack: '5',
                            symbol:'none',
                            data:this.dantiEff

                          },
                          {
                            name:this.dantiLegend[5],
                            type:'line',
                            stack: '6',
                            symbol:'none',
                            data:this.dantiFF
                          }
                      ]
                  };
                myChartDanti.setOption(dantiParams);

                // 叠层
                var diecengParams = {
                title: {
                  text: '叠层测试数据'
                },
                  tooltip: {
                    trigger: 'axis',
                     axisPointer:{
                              label:{
                                formatter:function(params){
                                    var r=that.getDiecengParams(params.value);
                                    return r
                                }
                            }
                          }
                  },
                  legend: {
                    left:110,
                    top:10,
                    data:this.diecengLegend
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  toolbox: {//工具栏,内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                    feature: {//各工具配置项。
                      dataView: {//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                        show: true,//是否显示组件。
                        readOnly: false,
                        iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                      },
                      dataZoom:{
                        yAxisIndex:'none',
                        iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                      },
                      magicType:{//动态类型切换 示例：feature: { magicType: {type: ['line', 'bar', 'stack', 'tiled']}}
                        show:true,
                        type:['line','bar'],
                        iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                      },
                      restore: {//配置项还原。
                        show: true,
                        iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                      },
                      saveAsImage: {//保存为图片。
                        show: true,
                        iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                      }
                    }
                  },

                  xAxis: {
                    type: 'category',
//                    boundaryGap: false,
                    data: this.diecengIndex
                  },
                   yAxis:
                         {
                    type:'value',
                    },
                  series: [
                    {
                      name:this.diecengLegend[0],
                      type:'bar',
                      stack: '1',
                      data:this.diecengIsc
                    },
                    {
                      name:this.diecengLegend[1],
                      type:'bar',
                      stack: '2',
                      data:this.diecengImpp
                    },
                    {
                      name:this.diecengLegend[2],
                      type:'bar',
                      stack: '3',
                      data:this.diecengVoc
                    },
                    {
                      name:this.diecengLegend[3],
                      type:'bar',
                      stack: '4',
                      data:this.diecengVmpp
                    },
                    {
                      name:this.diecengLegend[4],
                      type:'bar',
                      stack: '5',
                      data:this.diecengEff
                    },
                    {
                      name:this.diecengLegend[5],
                      type:'bar',
                      stack: '6',
                      data:this.diecengFF
                    },
                    {
                      name:this.diecengLegend[6],
                      type:'bar',
                      stack: '7',
                      data:this.diecengIVLV1
                    }
                  ]

                };
                myChartDieceng.setOption(diecengParams);

                // 焊接
                var hanjieParams = {
                      title: {
                              text: '焊接测试数据'
                      },
                      tooltip: {
                          trigger: 'axis',
                          axisPointer:{
                              label:{
                                  formatter:function(params){
                                      var r=that.getHanjieParams(params.value);
                                      return r
                                  }
                              }
                          }
                      },
                      legend: {
                          left:110,
                          top:10,
                          data:this.hanjieLegend
                      },
                      grid: {
                          left: '3%',
                          right: '4%',
                          bottom: '3%',
                          containLabel: true
                      },
                       toolbox: {//工具栏,内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                          feature: {//各工具配置项。

                              dataView: {//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                                  show: true,//是否显示组件。
                                  readOnly: false,
                                  iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }

                              },
                              dataZoom:{
                                  yAxisIndex:'none',
                                  iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              },
                              magicType:{//动态类型切换 示例：feature: { magicType: {type: ['line', 'bar', 'stack', 'tiled']}}
                                  show:true,
                                  type:['line','bar'],
                                  iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              },
                              restore: {//配置项还原。
                                  show: true,
                                  iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              },
                              saveAsImage: {//保存为图片。
                                  show: true,
                                  iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                              }
                          }
                      },

                      xAxis: {
                          type: 'category',
                          boundaryGap: false,
                          data: this.hanjieIndex
                      },
                      yAxis: {
                      type:'value'
                      },
                      series: [
                          {
                              name:this.hanjieLegend[0],
                              type:'line',
                              stack: '1',
                            areaStyle:{},
                            symbol:'none',
                              data:this.hanjieAverageVoltage
                          },
                          {
                              name:this.hanjieLegend[1],
                              type:'line',
                              stack: '2',
                            areaStyle:{},
                            symbol:'none',
                              data:this.hanjieAverageCurrent
                          },
                          {
                              name:this.hanjieLegend[2],
                              type:'line',
                              stack: '3',
                            areaStyle:{},
                            symbol:'none',
                              data:this.hanjieAveragePower
                          },
                          {
                              name:this.hanjieLegend[3],
                              type:'line',
                              stack: '4',
                            areaStyle:{},
                            symbol:'none',
                              data:this.hanjieAverageResistance
                          },
                          {
                              name:this.hanjieLegend[4],
                              type:'line',
                              stack: '5',
                            areaStyle:{},
                            symbol:'none',
                              data:this.hanjieWeldPressure
                          },
                          {
                              name:this.hanjieLegend[5],
                              type:'line',
                              stack: '6',
                            areaStyle:{},
                            symbol:'none',
                              data:this.hanjieReferenceTemperature
                          }
                      ]
                  };
                myChartHanjie.setOption(hanjieParams);

                // 单体 叠层 比较
                 var compareParams= {
                title:{
                    text:'单体/叠层对比'
                },
                legend: {},
                tooltip: {},
                toolbox: {//工具栏,内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                    feature: {//各工具配置项。

                        dataZoom:{
                            yAxisIndex:'none',
                            iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                        },
                        restore: {//配置项还原。
                            show: true,
                            iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                        },
                        saveAsImage: {//保存为图片。
                            show: true,
                            iconStyle: {
                                borderColor: '#1e90ff'
                            },
                            emphasis:{
                                iconStyle: {
                                    borderColor: '#1e90ff'
                                },
                            }
                        }
                    }
                },
                   dataset:this.compareData,

     xAxis: [
            {type: 'category', gridIndex: 0},
            {type: 'category', gridIndex: 1}
     ],
    yAxis: [
          {gridIndex: 0,
           "splitLine": {     //网格线
          "show": false
        }

          },
          {gridIndex: 1,position:"right",
            "splitLine": {     //网格线
            "show": false
            }}
    ],
    grid: [
        // {x: '55%'},
        // {top: '55%'}
        {x: '7%', y: '10%', width: '55%', height: '80%'},
        {x2: '13%', y: '10%', width: '25%', height: '80%'},
    ],


                series: [{
                  datasetIndex:0,
                  type:'bar',
                   xAxisIndex: 0, yAxisIndex: 0
                },
                  {
                  datasetIndex:1,
                  type:'bar',
                  xAxisIndex: 0, yAxisIndex: 0
                },
                    {
                  datasetIndex:2,
                  type:'bar',
                  xAxisIndex: 1, yAxisIndex: 1
                },
                   {
                  datasetIndex:3,
                  type:'bar',
                  xAxisIndex: 1, yAxisIndex: 1
                },
    ]
            };
                myChartCompare.setOption(compareParams);
		   window.onresize = function(){
            myChartCompare.resize();
            myChartDieceng.resize();
            myChartDanti.resize();
            myChartHanjie.resize();
            }
            }
        }
    }
</script>
<style scoped>
    .home{
        width: 100%;
        /* background-color:#f2f2f2; */
        height: 100%;
        margin-top:-100px;
    }
    .home_header{
        width: 100%;
        height: 7%;
        box-sizing: border-box;
        margin-top: 110px;
    }
    .home_content{
        width:100%;height:84%;
        /* background:red; */
        margin-top:10px
    }
    .home_content_top{
        width: 100%;
        height: 50%;
        /* background:green; */
        float:left;
    }
    .home_content_bottom{
        width: 100%;
        height: 50%;
        background: yellow;
        float: left;
    }
    .home_content_danti{
        float: left;
        width: 50%;
        height: 100%;
        background: #ffffff;
    }
    .home_content_dieceng{
        float: left;
        width: 50%;
        height: 100%;
        background: #ffffff;
    }
    .home_content_hanjie{
        float:left;
        width: 50%;
        height: 100%;
        background: #ffffff;
    }
    .home_content_all{
        float: left;
        width: 50%;
        height: 100%;
        background: #ffffff;
    }
    .topbox{
        width: 100%;
        margin: 0 auto;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .bigfont{
        font-size: 40px;
        font-style: normal;
        font-weight: 620;
        color: #003366;
        text-align: center;
    }
    .font_line{
        border: 0.5px solid gray;
        margin: 0 auto;
        width: 100%;
        height: 0;
        margin-top: 10px;
    }
    .bottombox{
        width: 100%;
        height: 18px;
        line-height: 18px;
    }
    .smallfont{
        font-size: 14px;
        color: slategrey;
        text-align: center;
    }
    .home_footer_line{
        width: 100%;
        height: 0;
        border: 0.5px solid gray;
        border-width: 60%;
    }
    .home_footer_fonta{
        width: 100%;
        height: 3%;
        /* background: purple; */
        display: flex;
    }
    .home_footer_fonta>span{
        margin: auto;
        color: black;
        font-size: 13px;
    }
    .home_footer_fontb{
        width: 100%;
        height: 3%;
        /* background: lightseagreen; */
        display: flex;
    }
    .home_footer_fontb>span{
        margin:auto;
        color: black;
        font-size: 13px;
     }





</style>
