<template>
    <div>
        <div class="analyze-header">
          <div class="analyze-select" style="float:left" >
          <span style="font: 400 13.3333px Arial;margin-left:5px">选择时间范围:</span>
         <el-date-picker
            style="width:37%"
            size="mini"
            v-model="timeList"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            @change="chooseTimeRange">
         </el-date-picker>
         <span style="font: 400 13.3333px Arial;">产品批号:</span>
         <template>
           <el-select
           style="width:22%"
            v-model="batchList"
            filterable
            :filter-method="searchKeyWords"
            multiple
            collapse-tags
            placeholder="请选择"
            size="mini"
            @visible-change="alertInfo($event,AREACODE)"
            @change='selectAll'>
            <el-option
              v-for="item in optionsNumber"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
          </div>
         <div class="analyze-choose" >
           <div class="choose-danti" >
             <div style="float:left;line-height:26px;width:16%">
               单体参数选择:
             </div>
             <div style="float:left;width:84%">
               <template>
               <el-checkbox-group v-model="checkListDanti" style="line-height:26px;font-size:12px" @change="alertTip()" class="select-checkbox">
                <el-checkbox label="Im"></el-checkbox>
                <el-checkbox label="Isc"></el-checkbox>
                <el-checkbox label="Vm"></el-checkbox>
                <el-checkbox label="Voc"></el-checkbox>
                <el-checkbox label="FF"></el-checkbox>
                <el-checkbox label="Eff"></el-checkbox>
              </el-checkbox-group>
             </template>
             </div>
           </div>
           <div class="choose-danti" >
             <div style="float:left;line-height:26px;width:16%">
               叠层参数选择:
             </div>
             <div style="float:left;width:84%">
               <template>
               <el-checkbox-group v-model="checkListDieceng" style="line-height:26px;font-size:12px" @change="alertTip()" class="select-checkbox">
                <el-checkbox label="Impp"></el-checkbox>
                <el-checkbox label="Isc"></el-checkbox>
                <el-checkbox label="Vmpp"></el-checkbox>
                <el-checkbox label="Voc"></el-checkbox>
                <el-checkbox label="FF"></el-checkbox>
                <el-checkbox label="Eff"></el-checkbox>
                <el-checkbox label="IVLV1"></el-checkbox>
              </el-checkbox-group>
             </template>
             </div>
           </div>
           <div class="choose-danti" >
             <div style="float:left;line-height:26px;width:16%">
               焊接参数选择:
             </div>
             <div style="float:left;width:84%">
               <template>
               <el-checkbox-group v-model="checkListHanjie" style="line-height:26px;font-size:12px" @change="alertTip()" class="select-checkbox" >
                <el-checkbox label="平均电压"></el-checkbox>
                <el-checkbox label="平均电流"></el-checkbox>
                <el-checkbox label="平均功率"></el-checkbox>
                <el-checkbox label="平均电阻"></el-checkbox>
                <el-checkbox label="焊接压力"></el-checkbox>
                <el-checkbox label="参考温度"></el-checkbox>
              </el-checkbox-group>
             </template>
             </div>
           </div>
        </div>
         <div class="submitBtn" style="float:left;width:15%;height:80px;">
                <div style="line-height:80px;width:100%">
                <el-button round type="primary" size="mini" id="btnCompare" v-on:click="startAnalyze()" >数据分析</el-button>
                 <el-button round id="btnExport" size="mini" type="primary"   v-on:click="exportData()" >导出数据</el-button>
                </div>
           </div>
        </div>
        <div class="analyze-content">
          <!-- 中间图表部分 -->
          <div class="charts">
            <div class="compare-chart" id="chartcompare">
            </div>
            <div class="statistic-chart" id="chartStatistic">

            </div>
          </div>
          <!-- 右边的参数选择-->
          <div class="mathparams">
            <div class="comapre-mathparams" style="width:103%;height:420px;border-bottom:0.5px solid lightgray">
              <div>
                <div style="width:100%;height:40px;background:#545C64;line-height:40px">
                  <span style="font:400 13.33333px Arial;color:white;margin-left:5px"> 数值分析</span>
                </div>
                <div class="mathTable">
                  <el-table :data="mathTable"  border style="width:100%" max-height="680">
                    <el-table-column prop="params" label="数据项目" width="80"></el-table-column>
                    <el-table-column prop="maxValue" label="最大值" width="110"></el-table-column>
                    <el-table-column prop="minValue" label="最小值" width="110"></el-table-column>
                    <el-table-column prop="average" label="平均值" width="110"></el-table-column>
                    <el-table-column prop="variance" label="方差" width="110"></el-table-column>
                    <el-table-column prop="standardVariance" label="标准差" width="110"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div class="statistics-mathparams" style="width:100%;height:420px;">
              <div class="statistic-paramchoose" style="width:100%;height:40px;background:#545C64">
                <div style="padding-top:6px">
                <span style="font:400 13.3333px Arial;color:white;margin-left:5px;">请选择统计的参数:</span>
                <el-select
                style="width:40%"
                  v-model="statisticValue"
                  clearable placeholder="请选择"
                  size="mini"
                  filterable
                  v-clickoutside="handleClose"
                  collapse-tags
                  @visible-change="tipsAlert($event,AREACODEA)">
                  <el-option
                    v-for="item in optionsValue"
                    :value="item"
                    :key='item'
                  >
                  </el-option>
                </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>
<script>
    export default
    {
      data() {
        return {
          statisticValue:'',
          statisticSelected:[],
          AREACODEA:'',
          AREACODE:'',
          timeStart:'',
          timeEnd:'',
          selectedDate:{},
          paramDict:{},
          seriesData:[],
          xAxisData:[],
          statisticXaxis:[],
          statisticYaxis:[],
          checkListDanti:[],
          checkListHanjie:[],
          checkListDieceng:[],
          optionsValue:[],
          varianceA:'',
          varianceStanrd:'',
          mathTable:[],
          activeName: 'first',
          pickerOptions2: {
            shortcuts: [{
              text: '最近三天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一年',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                picker.$emit('pick', [start, end]);
              }
            }],
          },
          optionsNumber:[],
          optionsNumberCopy:[],
          optionTemp:[],
          keyWord:'',
          oldOptions: [],
          batchList:'',
          timeList:'',
          batchIndex:{},
          hashBar:{},
          selectedParamOptions:[],
          selectedParamData: []
          };
      },
      created(){

      },
      mounted(){

      },
      watch:{
        timeList(val){
          if(this.timeList==null){
            this.optionsNumber=[];
            this.batchList=[];
          }
        },
        paramDict(e){
          if(JSON.stringify(this.paramDict) == "{}"){
            this.seriesData=[]
          }
        },
        checkListDanti(e){

        },
        checkListDieceng(e){

        },
        checkListHanjie(e){

        },
        statisticValue(e){
          var vm=this;
          vm.statisticXaxis=[];
          vm.statisticYaxis=[];
          //vm.statisticSelected=vm.statisticValue.toString();
          //当选择的参数为相应的值时,展示相应的后端返回的纵坐标的数据
          for(var k in this.hashBar){
            if(this.statisticValue==k){
             for(var item in this.hashBar[k]){
               vm.statisticXaxis.push(item);
               vm.statisticYaxis.push(this.hashBar[k][item]);
             }
              vm.statisticDrawLine();
              return false;
            }
          }
        }
      },
      methods:{
        searchKeyWords:function(val){
          // console.log(this.batchList)
          this.optionTemp=[];
          if(this.batchList.length==0){
               this.keyWord=val;
              //  var optionTemp = [{label:'全选',value:'全选'}];
              var temp =[];
            if(this.keyWord != ''){
                for(var i=0;i<this.optionsNumber.length;i++){
                  if(this.optionsNumber[i].value.indexOf(this.keyWord)>=0){
                    temp.push(this.optionsNumber[i])
                  }
                }
                this.optionsNumber=temp;
                this.optionTemp=temp;

            }else{
              this.optionsNumber=this.optionsNumberCopy;
            }
          }else{
            this.optionsNumber=this.optionsNumberCopy;
          }


        },
        handleClose:function() {
          this.visible = false;
        },
        getTipParams:function(paramName){
              var res = '';
          for(var item in this.batchIndex){
            if(Number(paramName)<this.batchIndex[item].length){
              var temp = item + ':' + this.batchIndex[item][Number(paramName)] + '\n';
              res += temp
            }
          }
              return res;
          },
        selectAll(val){
          const allValues=[];
          for(const item of this.optionsNumber){
            allValues.push(item.value)
          }
          const oldVal = this.oldOptions.length === 1? this.oldOptions[0]:[];
          if(val.includes('全选')) this.batchList = allValues;
          if(oldVal.includes('全选') && !val.includes('全选')) this.batchList = [];
          if(oldVal.includes('全选') && val.includes('全选')){
            const index = val.indexOf('全选');
            val.splice(index, 1);
            this.batchList = val
          }
          if(!oldVal.includes('全选') && !val.includes('全选')){
            if(val.length === allValues.length - 1) this.batchList = ['全选'].concat(val)
          }
          this.oldOptions[0] = this.batchList
        },
        chooseTimeRange(t){
          if(this.timeList){
             this.timeStart=t[0];
          this.timeEnd=t[1];
          this.selectedDate={
            startTime:this.timeStart,
            endTime: this.timeEnd
          }
          }
          if(JSON.stringify(this.selectedDate) == "{}"){
            this.optionsNumber=[];
          }else{
               this.getBatchNumber();
          }

        },
        alertInfo:function(callback,vc){
          try{
              if(callback&&this.timeList==null){
                alert("请选择时间范围!")
              }
              if(callback&&JSON.stringify(this.selectedDate) == "{}"){
                  alert("请选择时间范围!")
              }
          } catch (e) {
            console.log(e)
          }

        },
        tipsAlert:function($event,vc){
            var vm=this;
            if($event&&vm.timeList==null){
              alert("请先选择时间批号和参数!")
            }
            if($event&&vm.selectedDate.length<=0){
              alert("请先选择时间批号和参数!")
            }
        },
        getBatchNumber(){
          let obj = this.selectedDate;
          this.$http.post('/getBatchForAnalyze', obj).then(function (res) {
            this.optionsNumber = res.data;
            this.optionsNumberCopy = res.data;
          })
        },
        alertTip:function(){
            if(this.batchList.length<=0 && this.keyWord ==''){
              alert("请先选择产品批号!");
              this.checkListDanti = [];
              this.checkListDieceng = [];
              this.checkListHanjie = [];
              return false;
            }
        },
        startAnalyze:function(){
          let vm = this;

          if (this.checkListDanti.length==0 && this.checkListDieceng.length==0 && this.checkListHanjie.length==0){
            alert("请选择相应的批号和参数!");
            return false;
          }
          for(var i=0;i<this.optionTemp.length;i++){
              this.batchList.push(this.optionTemp[i].value);
            }
           this.paramDict = {
            batchNumber:this.batchList,
            keyword:this.keyWord,
             unitTest:this.checkListDanti,
             stackTest:this.checkListDieceng,
             weldTest:this.checkListHanjie
           };
           this.keyWord='';
           this.optionsNumber=this.optionsNumberCopy;
           this.optionTemp=[];
          this.optionsValue = [];
          for(var i=0;i<this.checkListDanti.length;i++){
            this.optionsValue.push(this.checkListDanti[i] + '-DT');
          }
          for(var i=0;i<this.checkListDieceng.length;i++){
            this.optionsValue.push(this.checkListDieceng[i] + '-DC')
          }
          for(var i=0;i<this.checkListHanjie.length;i++){
            this.optionsValue.push(this.checkListHanjie[i] + '-HJ')
          }
//          this.optionsValue=this.checkListDanti.concat(this.checkListDieceng).concat(this.checkListHanjie);
        this.$http.post('/analyzeData', this.paramDict).then(function (res) {
            vm.seriesData=res.data.seriesData;
            vm.xAxisData = res.data.xAxisData;
            vm.batchIndex = res.data.batchIndex;
            vm.hashBar = res.data.hashBar;
             vm.drawLine();
	       vm.caculateMathTable();
	       vm.statisticValue=vm.optionsValue[0];
//	       vm.statisticValue();

})
        },
        exportData(){
             if(JSON.stringify(this.selectedDate) == "{}"){
            alert("请选择导出时间范围和批号!");
            return false;
          }
            let exportParam = {
               saveDate:this.selectedDate,
              batchNumber:this.batchList
           };
          this.$http.post('/genFile', exportParam).then(function (res) {
                    window.open("/downloadFile");
//                      window.location.href = '/downloadFile';
                });
        },
           //平均值计算方法
        averageCaculate:function(z){
          var numbers=z.map(Number);
          var mean=0;
          var sum=0;
          for(var i=0;i<numbers.length;i++){
            sum+=numbers[i];
          }
          mean =sum/numbers.length;
          return mean.toFixed(6);
        },
        //最大值计算方法:
        maxCalulate:function(e){
            return (Math.max.apply(null,e)).toFixed(6)
        },
        minCalulate:function(e){
          return (Math.min.apply(null,e)).toFixed(6)
        },
        //方差计算方法
        variance : function(x) {
            var numbers=x.map(Number);
            var mean = 0;
            var sum = 0;
            var tempZ=0;
            for(var i=0;i<numbers.length;i++){
                sum += numbers[i];
            }
            mean = sum / numbers.length;
            sum = 0;
            for(var i=0;i<numbers.length;i++){
                sum += Math.pow(numbers[i] - mean , 2);
            }
            tempZ=sum/numbers.length;
            return tempZ.toFixed(6)
        },
        //标准差计算方法
        standardVariance:function(y){
            var numbers=y.map(Number)
            var mean = 0;
            var sum = 0;
            var tempY=0;
            for(var i=0;i<numbers.length;i++){
                sum += numbers[i];
            }
            mean = sum / numbers.length;
            sum = 0;
            for(var i=0;i<numbers.length;i++){
                sum += Math.pow(numbers[i] - mean , 2);
            }
            tempY=(Math.sqrt(sum/numbers.length)).toFixed(6)
            return tempY
        },
        //根据选择的参数来渲染表格
        caculateMathTable:function(){
            var vm=this;
            vm.mathTable=[];
                for(var j=0;j<this.seriesData.length;j++){
                    var temp={params:'',average:'',variance:'',standardVariance:'',maxValue:'',minValue:''};
                    temp.params=this.seriesData[j].name;
                    temp.average=vm.averageCaculate(this.seriesData[j].data);
                    temp.variance=vm.variance(this.seriesData[j].data);
                    temp.standardVariance=vm.standardVariance(this.seriesData[j].data);
                    temp.maxValue=vm.maxCalulate(this.seriesData[j].data);
                    temp.minValue=vm.minCalulate(this.seriesData[j].data);
                    vm.mathTable.push(temp)
                }
        },
        drawLine(){
          var that = this;
          var echarts=require('echarts/lib/echarts.js');
          require('echarts/lib/chart/pie.js');
          require('echarts/lib/chart/line.js');
          require('echarts/lib/chart/bar.js');
          require('echarts/lib/component/tooltip.js');
          require('echarts/lib/component/toolbox.js');
          var myChartCompare=echarts.init(document.getElementById('chartcompare'));
          var option = {
            title: {
                text: '太阳能电池测试参数统计分析'
            },
            tooltip: {
                 trigger: 'axis',
                     axisPointer:{
                              label:{
                                formatter:function(params){
                                    var r=that.getTipParams(params.value);
                                    return r
                                }
                            }
                          }
            },
            legend:{},
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
                          readOnly: false
                      },
                      dataZoom:{
                          yAxisIndex:'none'
                      },
                      magicType:{//动态类型切换 示例：feature: { magicType: {type: ['line', 'bar', 'stack', 'tiled']}}
                          show:true,
                          type:['line','bar']
                      },
                      restore: {//配置项还原。
                          show: true
                      },
                      saveAsImage: {//保存为图片。
                          show: true
                      }
                  }
              },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.xAxisData
                // data:this.xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series:this.seriesData
          };
          // option.legend={};
          myChartCompare.setOption(option,true);
        },
          //定义底下统计图表展示的方法
        statisticDrawLine(){
        var echarts=require('echarts/lib/echarts.js');
        require('echarts/lib/chart/pie.js');
        require('echarts/lib/chart/line.js');
        require('echarts/lib/chart/bar.js');
        require('echarts/lib/component/tooltip.js');
        require('echarts/lib/component/toolbox.js');
        var myChartStatistic=echarts.init(document.getElementById('chartStatistic'));
        var statisticOption={
          title: {
                text: '太阳能电池测试参数散列图'
            },
          tooltip:{
            trigger: 'axis'
          },
          toolbox: {//工具栏,内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                  feature: {//各工具配置项。
//                      dataView: {//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
//                          show: true,//是否显示组件。
//                          readOnly: false
//                      },
                      dataZoom:{
                          yAxisIndex:'none'
                      },
                      magicType:{//动态类型切换 示例：feature: { magicType: {type: ['line', 'bar', 'stack', 'tiled']}}
                          show:false,
                          type:['bar']
                      },
                      restore: {//配置项还原。
                          show: true
                      },
                      saveAsImage: {//保存为图片。
                          show: true
                      }
                  }
              },
          xAxis: {
            type: 'category',
            data: this.statisticXaxis
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data:this.statisticYaxis,
                type: 'bar'
            }]
        }
        myChartStatistic.setOption(statisticOption);
        }
    },


          }
</script>
<style>
.el-checkbox{
  color:	#FFF5EE;
}
.select-checkbox>.el-checkbox{
  width:7.1%
}
.mathTable .el-table__empty-block{
  min-height: 300px;
}
.mathTable .el-table__body-wrapper{
  height: 320px !important;
}
.el-checkbox__label{
  color:white;
}
.el-checkbox__label{
  margin-left:-5px;
}
</style>
<style scoped>

  .analyze-header{
    width:100%;
    height:80px;
    background-color:#003366;
    font: 400 13.3333px Arial;
    color:white;
  }
  .analyze-content{
    width:100%;
    height:840px;
  }
  .charts{
    float:left;width:70%;height:800px
  }
  .compare-chart{
    width:100%;
    height:420px;
    border-bottom:0.5px solid lightgray
  }
  .statistic-chart{
    width:100%;
    height:420px;
    /* background:lightblue; */
  }

  .mathparams{
    float:left;
    width:29%;
    height:840px;
    border-left:0.5px solid lightgray;
    background:white
  }
  .analyze-select{
    float: left;
    width:40%;
    height:40px;
    margin-top:25px;
  }
  .analyze-choose{
    float: left;
    width:45%;
    height:80px;
  }
  .choose-danti{
    float:left;
    width:100%;
    height:26px;
    border-right:0.5px solid #cccccc;
    margin-left:-2%;
  }
  #btnCompare{
    width:30%;
    margin-left:15%
  }
  #btnExport{
    width:30%;

  }


  .statistics-mathparams{
    border-right:0.5px solid lightgray;
  }

</style>



