<template>
    <div class="dantiall" >
<!-- 查询部分 -->
     <div class="searchPart" style="width:100%;height:52px;margin-top:2px;background:#545C64;">
        <div class="left-search" style="float:left;width:60%;height:40px;margin-top:10px;">
          <span style="font: 400 13.3333px Arial;margin-left:5px">选择时间范围:</span>
                  <el-date-picker
            size="mini"
                    v-model="timeList"
                    type="daterange"
            align="right"
            unlink-panels
                    range-separator="-"
                    start-placeholder="开始日期"
                    format="yyyy-MM-dd"
            :picker-options="pickerOptions2"
                    value-format="yyyy-MM-dd"
                    end-placeholder="结束日期"
                    @change="chooseTimeRange">
                  </el-date-picker>
         <span style="font: 400 13.3333px Arial;margin-left:9%">产品批号:</span>
         <template>
           <el-select
           style="width:20%"
            v-model="batchList"
            filterable
            multiple
            collapse-tags
            placeholder="请选择"
            size="mini"
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
        <div class="right-button" style="float:left;width:40%;height:40px;margin-top:10px;margin-left:-8%">
          <span style="font:400 13.33333px Arial;">关键字:</span>
          <el-input size="mini" placeholder="请输入关键字" @keyup.native="searchKeyWords()"  v-model="keyWords" style="width:25%;" ></el-input>
          <el-button type="primary" size="mini" style="margin-left:20%"
          id="btn_search"  v-on:click="searchMesData()"
          >检索</el-button>
          <form id="upload" enctype="multipart/form-data" style="display:none">
          <input type="file" name="fileName" id="fileName" multiple="multiple" v-on:change="uploadPic()" style="display:none" />
            </form>
          <el-button type="primary" size="mini" style="margin-left:5%"
          id="btn_import" v-on:click="selectFile()">导入文件</el-button>
        </div>
      </div>


      <!-- 左边树状结构 -->
      <div class="treeDemo" style="float:left">
            <el-tree
            ref="tree"
            :data="treeData"
            show-checkbox
            :default-expand-all=true
            :highlight-current=true
            @node-click="handleNodeClick($event)"
            node-key="label"
            >
            </el-tree>
        <div>
          </div>
      </div>
      <!-- 右边表格结构 -->
      <div class="tableDemo" style="float:left;position:relative">
        <div>
          <template>
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="565">
        <el-table-column prop="BatchNumber" label="产品条码" width="160" fixed></el-table-column>
        <el-table-column prop="DateTime" label="焊接时间" width="140"></el-table-column>
        <el-table-column prop="WeldNumber" label="焊点编号" width="100"></el-table-column>
        <el-table-column prop="AverageVoltage" label="平均电压" width="100"></el-table-column>
        <el-table-column prop="AverageCurrent" label="平均电流" width="100"></el-table-column>
        <el-table-column prop="AveragePower" label="平均功率" width="100"></el-table-column>
        <el-table-column prop="AverageResistance" label="平均电阻" width="100"></el-table-column>
        <el-table-column prop="PeakVoltage" label="峰值电压" width="100"></el-table-column>
        <el-table-column prop="PeakCurrent" label="峰值电流" width="100"></el-table-column>
        <el-table-column prop="PeakPower" label="峰值功率" width="100"></el-table-column>
        <el-table-column prop="WeldPressure" label="焊接压力" width="100"></el-table-column>
        <el-table-column prop="ReferenceTemperature" label="参考温度" width="100"></el-table-column>
        <el-table-column prop="Result" label="判定结果" width="100"></el-table-column>

      </el-table>
    </template>
    <!-- 右边底部的基础属性结构 -->
        <div  class="detail_data" >
           <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="图像信息" name="first">
                  <img :src="imageUrl" id="imageDieceng"  class="min" @click="imageShow()">
            </el-tab-pane>
            <el-tab-pane label="其他属性" name='second'>
              <table id="otherAttr">
                <tr>
                  <td>测试人员:</td>
                  <td></td>
                  <td>测试日期:</td>
                  <td></td>

                </tr>
                <tr>
                  <td>测试设备:</td>
                  <td></td>
                  <td>测试周期:</td>
                  <td></td>

                </tr>
                <tr>
                  <td>测试合格:</td>
                  <td></td>
                  <td>测试样本:</td>
                  <td></td>

                </tr>
              </table>
            </el-tab-pane>

           </el-tabs>

        </div>
        </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
// import func from './vue-temp/vue-editor-bridge';

export default {
  name: "dantiall",
  data() {
    return {
      activeName: "first",
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
      selectedDate:{},
      treeData: [],
      treeDataCopy:[],
      keyWords:'',
      tableData: [],
      optionsNumber:[],
      oldOptions: [],
      batchList: [],
      detailData: {},
      imageUrl:"",
      // queryDate: "",
      timeList:"",
      timeStart:'',
      timeEnd:''
    };
  },
    created: function() {
//      this.getOptionList();
//      this.getTree();
    },
    mounted:function () {
      this.getTreeList();
    },
  watch:{
    timeList(val){
            if(this.timeList==null){
              this.optionsNumber=[];
              this.batchList=[];
            }
          }
  },
    methods: {
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
      findValue:function(objParam, value){
        var backData = {
          flag: false,
          index:-1
        };
        for(var i=0;i<objParam.length;i++){
          for(var key in objParam[i]){
          if(objParam[i][key] == value){
            backData.flag=true;
            backData.index=i;
            return backData
          }
        }
        }
        return backData;
        },
      searchKeyWords:function(){
            var keyWord=this.keyWords;
            var that=this;
            var treeTemp = [];
            var yearNodeIndex = 0;
            var monthNodeIndex = 0;
            if(keyWord !=''){
              var parentNode = that.treeDataCopy[0];
              var parentNodes = {};

              for(var i=0;i<parentNode.children.length;i++){
                var yearNode = parentNode.children[i];

                for(var j=0; j<yearNode.children.length;j++){
                  var monthNode = yearNode.children[j];

                  for(var k=0; k<monthNode.children.length;k++){
                    if(monthNode.children[k].label.indexOf(keyWord)>=0){
                      var fileNode = {label:monthNode.children[k].label, type:monthNode.children[k].type};
                      if(!parentNodes.hasOwnProperty('label')){
                        parentNodes={label: parentNode.label, type:parentNode.type, children:[{}]};
                        parentNodes.children[0] = {label: yearNode.label, type:yearNode.type, children:[{}]};
                        parentNodes.children[0].children[0] = {label: monthNode.label, type:monthNode.type, children:[]};
                        parentNodes.children[0].children[0].children.push(fileNode)
                      }
                      else{
                        var arr = this.findValue(parentNodes.children, yearNode.label);
                        if(!arr.flag){
                          parentNodes.children.push({label: yearNode.label,type:yearNode.type,children:[{}]});
                          yearNodeIndex = parentNodes.children.length-1;
                          parentNodes.children[yearNodeIndex].children[0] = {label: monthNode.label,type:monthNode.type,children:[]};
                          parentNodes.children[yearNodeIndex].children[0].children.push(fileNode)
                        }else{
                          var arrTemp = this.findValue(parentNodes.children[arr.index].children, monthNode.label);
                          if(!arrTemp.flag){
                            parentNodes.children[arr.index].children.push({label: monthNode.label,type:monthNode.type,children:[]});
                            monthNodeIndex = parentNodes.children[arr.index].children.length - 1;
                            parentNodes.children[arr.index].children[monthNodeIndex].children.push(fileNode)
                          }else{
                            parentNodes.children[arr.index].children[arrTemp.index].children.push(fileNode)
                          }
                        }
                      }

                    }
                  }
              }
              treeTemp.push(parentNodes);
              that.treeData= treeTemp;
              }
            }else{
                that.treeData=that.treeDataCopy;
            }
        },
    getOptionList:function () {
          let optionObj = {mesType: 'weldTest',StartDate:this.timeStart,EndDate:this.timeEnd};
          this.$http.post('/getOptionList', optionObj).then(function (res) {
          this.optionsNumber = res.data.batchList;
      });
      },
    getTreeList:function () {
      let treeObj = {mesType: 'hanjieall'};
      this.$http.post('/getTree', treeObj).then(function (res) {
      this.treeData = res.data;
      this.treeDataCopy = res.data;
    })
    },

    handleClick(tab, event) {
      console.log(tab, event);
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
               this.getOptionList();
          }
      },
    searchMesData: function() {
  //      let _productBatch = $("#productBatch")
  //        .find("option:selected")
  //        .text();
        let arrSearch = {
          mesType:'weldTest',
          StartDate:'',
          EndDate:'',
          BatchNumber: []
        };
         if(this.timeList==null){
           this.getTreeList();
             return false;
        }
        arrSearch.BatchNumber = this.batchList;
        arrSearch.StartDate=this.timeStart;
        arrSearch.EndDate=this.timeEnd;

          this.$http.post('/searchMesData',arrSearch).then(function(res){
          if(res.data){
            this.treeData = res.data;
            this.treeDataCopy = res.data;
          }else{
            alert("未找到相关数据")
          }
          });

      },
    handleNodeClick(event) {
      if (event.type === "file") {
        let obj = {mesType: 'weldTest', fileName: event.label};
        this.$http.post('/getTreeTable',obj).then(function(res){
        if(res.data){
          this.tableData = res.data.tableData;
	        //this.imageUrl="http://pic29.nipic.com/20130511/9252150_174018365301_2.jpg"
	        this.imageUrl=res.data.imgUrl;
        }else{
          alert("未找到相关数据")
        }
        });

        //  alert(e.label);
      }
    },
    checkedKeys: function() {
      //获取选中的节点文件
      // alert(JSON.stringify(this.$refs.tree.getCheckedKeys()));
      // console.log(this.$refs.tree.getCheckedKeys());
      var fileName = this.$refs.tree.getCheckedKeys();
      for (var i = 0; i < fileName.length; i++) {
        if (fileName[i].indexOf(".xls") != -1) {
          alert(fileName[i]);
        }
      }
    },
    //导入文件
    selectFile: function() {
      //      event.preventDefault();
      $("#fileName").trigger("click");
    },
    //图片缩放
    imageShow:function(){
      $("#imageDieceng").toggleClass('min');
       $("#imageDieceng").toggleClass('max');
    },

    uploadPic: function() {
      //      el.preventDefault();//取消默认行为
      let vm = this;
      let formData = new FormData();
        for(var i=0;i < $("#fileName")[0].files.length; i++){
            formData.append('upload_file',$("#fileName")[0].files[i]);
        }
//        formData.append("upload_file", $("#fileName")[0].files[0]);
      formData.append("mesType", "weldTest");
      let temp = new Date($('#fileName')[0].files[0].lastModifiedDate);
      let modifyTime = temp.getFullYear()+"-"+(temp.getMonth()+1)+"-"+temp.getDate();
      formData.append("modifyTime",modifyTime);
      let oReq = new XMLHttpRequest();
      oReq.open("POST", "/uploadFile");
      oReq.send(formData);
      oReq.onload = function(res) {
        if (this.status == 200 || this.status == 304) {
           alert(JSON.parse(this.response).msg);
            vm.getTreeList();
        } else {
          alert("上传失败");
        }
      };
//      let treeObj = {mesType: 'hanjieall'};
//      this.$http.post('/getTree', treeObj).then(function (res) {
//        this.searchData = res.data;
//
//    });
      $(".fileName").html("");
      $("#fileName").val("");
    }
  }
};
</script>
<style>
  .el-table__empty-block {
    min-height: 490px;
  }
  .right-button .el-input{
    width:25%
  }
  .el-table__body-wrapper{
  height: 505px;
}
</style>
<style scoped>
 span{
  color:white
}
.DantiSearch {
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  background: #545C64;
  background-color:yellow;
}
.left-select{
  margin-left:5px;
  margin-top:8px;
  float: left;
  width:70%;
  height:40px;
  box-sizing:boder-box;
  background-color:green;
}
.right-button{
  float: left;
  width:29%;
  height:50px;
  /* background-color:red; */
}

/*树和表格样式*/
.treeDemo {
  width: 19%;
  height: 765px;
  border: 0.5px solid gray;
  border-right: 2px solid lightblue;
  overflow-y: scroll;
  overflow-x: scroll;
  /* border-radius: 5px; */
}
.tableDemo {
  width: 80%;
  height: 775px;
  border-top: 0.5px solid gray;
}
/* !!!!更改表格底部滚动条的高度样式*/
.el-table__body-wrapper{
  height: 715px;
}
.el-tree {
  min-width: 100%;
  display: inline-block !important;
}
.el-tree-node__label {
  color: black;
}
.el-tree-node__content:hover {
  color: red;
}
.dantiall {
  width: 100%;
  height: 800px;
  background-color: #ffffff;
}
.el-table td {
  padding: 2px 0;
}
/* 右下详细信息样式 */
.detail_data {
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  position: absolute;
  top: 565px;
  margin-left: 2px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
}
#basicInfo{
  font-family: sans-serif;
  font-size: 13px;
  border-collapse: collapse;
}
#basicInfo td{
  width: 100px;
  /* background: #F2F2F2; */
  height: 30px;
}
#basicInfo tr td{
  color: gray;
  text-align: left;
}
#otherAttr{
  font-family: sans-serif;
  font-size: 13px;
  border-collapse: collapse;
}
#otherAttr td{
  width: 100px;
  /* background: gray; */
  height: 30px;
}
#otherAttr tr td{
  color: gray;
  text-align: left;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background-color: #6699FF;
}
.el-date-editor .el-range-separator{
  line-height: 17px;
}
.min{
  width:200px;
  cursor: zoom-in;
}
.max{
  width: 500px;
  cursor: zoom-out;
  position: fixed;
  visibility: visible;
  z-index: 1102;
  left: 50%;
  top: 50%;
  width: 549px;
  height: 531px;
  margin-left: -274.5px;
  margin-top: -265.5px;
  display: block;

}
</style>
