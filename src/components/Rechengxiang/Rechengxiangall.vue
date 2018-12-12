<template>
  <div class="rechengxiang">
    <!-- 查询部分 -->
    <div class="searchPart" style="width:100%;height:52px;margin-top:2px;background:#545C64;">
      <div class="right-button" style="float:left;width:90%;height:40px;margin-top:10px;">
        <span style="font: 400 13.3333px Arial;margin-left:5px">关键字:</span>
        <el-input size="mini" placeholder="请输入关键字" @keyup.enter.native="search()" v-model="keyWords"
                  style="width:17%;"></el-input>
        <el-button type="primary" size="mini" style="margin-left:2%"
                   id="btn_search" v-on:click="search()"
        >检索
        </el-button>

        <!--发布测试数据-->
        <el-button v-if="isSheji" @click="openEdit" type="primary" size="mini" style="float: right"
                   id="btn_addtext"
        >增添数据
        </el-button>
        <!-- Form -->
        <el-dialog title="热成像仪测试数据" :visible.sync="dialogVisible" width="50%">
          <el-row>
            <el-col :span="12">
              <el-form label-position="left" label-width="120px">
                <el-form-item label="批次号 :">
                  <el-input style="width: 60%" v-model="add_p_number"></el-input>
                </el-form-item>
                <el-form-item label="印刷版号 :">
                  <el-input style="width: 60%" v-model="add_printed"></el-input>
                </el-form-item>
                <el-form-item label="测试工况 :">
                  <el-input style="width: 60%" v-model="add_p_test"></el-input>
                </el-form-item>
                <el-form-item label="持续时间 :">
                  <el-input style="width: 60%" v-model="add_time_of_duration"></el-input>
                </el-form-item>
                <el-form-item label="环境温度 :">
                  <el-input style="width: 60%" v-model="add_temperature"></el-input>
                </el-form-item>
                <el-form-item label="判读要求 :">
                  <el-input style="width: 60%" v-model="add_required"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form label-position="left" label-width="120px">
                <el-form-item label="最高点对应器件名称 :">
                  <el-input style="width: 60%" v-model="add_device"></el-input>
                </el-form-item>
                <el-form-item label="功耗 :">
                  <el-input style="width: 60%" v-model="add_power_dissipation"></el-input>
                </el-form-item>
                <el-form-item label="热阻 :">
                  <el-input style="width: 60%" v-model="add_heat_resistance"></el-input>
                </el-form-item>
                <el-form-item label="壳温 :">
                  <el-input style="width: 60%" v-model="add_k_temperature"></el-input>
                </el-form-item>
                <el-form-item label="结温 :">
                  <el-input style="width: 60%" v-model="add_tj"></el-input>
                </el-form-item>
                <el-form-item label="Ⅰ级降额结温值 :">
                  <el-input style="width: 60%" v-model="add_htj"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <label>上传热成像图片：</label>
              <form id="upload1" enctype="multipart/form-data" style="display:none">
                <input type="file" name="fileName" id="fileName1"  @change="changeImage1($event)" style="display:none" />
              </form>
              <el-button type="primary"  style="margin-left:5%"
                         id="btn_import1" v-on:click="selectFile1()">上传图片</el-button>
              <label>{{upathname1}}</label>
            </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAddTest">保存</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
    <!-- 左边树状结构 -->
    <div class="treeDemo" style="float:left">

      <el-tree
        ref="tree"
        :data="treeData"
        :highlight-current=true
        :default-expand-all=true
        @node-click="handleNodeClick($event)"
        @check-change="handleCheckChange"
        node-key="label"
        show-checkbox
      >
      </el-tree>
    </div>

    <!-- 右边表格结构 -->
    <div class="tableDemo" style="float:left;position:relative">
      <div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="565"
            :highlight-current-row=true
            @row-click="clickRow">
            <el-table-column prop="p_number" label="批次号" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.p_number"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.p_number}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="printed" label="印制板号" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.printed"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.printed}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="p_test" label="测试工况" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.p_test"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.p_test}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="time_of_duration" label="持续时间" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.time_of_duration"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.time_of_duration}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="temperature" label="环境温度" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.temperature"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.temperature}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="required" label="判读要求" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.required"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.required}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="device" label="最高点对应器件名称" width="160">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.device"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.device}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="power_dissipation" label="功耗" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.power_dissipation"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.power_dissipation}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="heat_resistance" label="热阻" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.heat_resistance"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.heat_resistance}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="k_temperature" label="壳温" width="130">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.k_temperature"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.k_temperature}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="tj" label="结温" width="100">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.tj"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.tj}}</label>
              </template>
            </el-table-column>
            <el-table-column prop="htj" label="Ⅰ级降额结温值" width="130">
              <template slot-scope="scope">
                <el-input v-if='scope.row.editable' size="small" v-model="scope.row.htj"></el-input>
                <label v-if='!scope.row.editable'>{{scope.row.htj}}</label>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="250">
              <template slot-scope="scope">
                <span v-if="isSheji">
                <el-button v-if='!scope.row.editable' size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button v-if='scope.row.editable' size="mini" @click="saveEdit(scope.$index, scope.row)">保存
                </el-button>
                </span>
                <span v-if="isAdmin">
                  <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </span>
                <span v-if="isConfirm(scope.$index, scope.row)">
                  <el-button type="success" size="mini" @click="handleConfirm(scope.$index, scope.row)">确认</el-button>
                </span>
                <span v-if="!isConfirm(scope.$index, scope.row)">
                  <el-button type="success"  size="mini" plain disabled>已确认</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 右边底部的基础属性结构 -->
        <div class="detail_data">
          <el-tabs v-model="activeName">
            <el-tab-pane label="图像信息" name="first">
              <table id="otherAttr">
                <tr>
                  <td width="220px">图片缩略图：</td>
                  <td width="220px">修改图片：</td>
                  <td>
                    <form id="upload2" enctype="multipart/form-data" style="display:none">
                      <input multiple="multiple" type="file" name="fileName" id="fileName2"  @change="changeImage2($event)" style="display:none" />
                    </form>
                    <el-button size="mini" type="primary"  style="margin-left:5%"
                               id="btn_import2" v-on:click="selectFile2()">选择图片</el-button>
                  </td>
                  <td><el-button v-if="upathname2" type="primary" size="mini" @click="saveEditImg()">保存</el-button></td>
                </tr>
                <tr>
                  <td width="220px">
                    <viewer>
                      <ul style="list-style: none;padding: 0;margin: 0" class="showimages">
                        <li style=" float:left" v-for="(image,index) in images"
                            :key="index">
                          <img class="min" :src="image" />
                        </li>
                      </ul>
                    </viewer>
                  </td>
                  <td></td>
                  <td> <label>{{upathname2}}</label></td>
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
  import axios from 'axios'
  import $ from "jquery";
  export default {
    name: "rechengxiang",
    data() {
      return {

        activeName: "first",
        datalist:'',
        // 模态框发布数据
        dialogVisible: false,
        add_p_number: '',
        add_printed: '',
        add_p_test: '',
        add_time_of_duration: '',
        add_temperature: '',
        add_required: '',
        add_device: '',
        add_power_dissipation: '',
        add_heat_resistance: '',
        add_tj: '',
        add_htj: '',
        add_k_temperature:'',
        // 上传图片
        upath1:'',
        upath2:'',
        upathname1:'',
        upathname2:'',
        //检索
        keyWords: '',
        // 表格
        tableData: [

        ],
        //树状图
        treeData: [
        ],
        //角色确认
        isConfirm:true,
        // 角色判断
        isSheji:false,
        isAdmin:false,
        //所选目录
        df_model:'',
        df_standalone:'',
        df_stage_marker:'',
        //展示图片
        imageurl:'http://e.hiphotos.baidu.com/image/h%3D300/sign=8000a165df1b0ef473e89e5eedc551a1/b151f8198618367afe76969623738bd4b21ce5fa.jpg,http://d.hiphotos.baidu.com/image/h%3D300/sign=e6cb69522534349b6b066885f9eb1521/91ef76c6a7efce1b5ef04082a251f3deb58f659b.jpg,http://a.hiphotos.baidu.com/image/h%3D300/sign=a284ee4bc595d143c576e22343f18296/0b7b02087bf40ad182fac5ab5a2c11dfa9ecce58.jpg',
        imageUrlMIs:'',
        imageUrlTIs:'',
        images:['http://e.hiphotos.baidu.com/image/h%3D300/sign=8000a165df1b0ef473e89e5eedc551a1/b151f8198618367afe76969623738bd4b21ce5fa.jpg','http://d.hiphotos.baidu.com/image/h%3D300/sign=e6cb69522534349b6b066885f9eb1521/91ef76c6a7efce1b5ef04082a251f3deb58f659b.jpg','http://a.hiphotos.baidu.com/image/h%3D300/sign=a284ee4bc595d143c576e22343f18296/0b7b02087bf40ad182fac5ab5a2c11dfa9ecce58.jpg'],
        imgId:'',
      }
    },
    methods: {
      // 树
      getTree() {
        //树第1级
        axios.post(this.$store.state.url+'/myapp/getTree/').then((result) => {
          // console.log(result.data.data)
          this.treeData = result.data.data
        })
      },
      handleNodeClick(event) {
        let _this = this
        if (event.type == 'model') {
          //树第2级
          axios.post(this.$store.state.url+'/myapp/getTree_two/', {
            model: event.label,
            father_data: _this.treeData,
          }).then((result) => {
            _this.treeData = result.data.data
          }).catch((err) => {
            console.log(err)
          })
        } else if (event.type == 'standalone') {
          //树第3级
          axios.post(this.$store.state.url+'/myapp/getTree_three/', {
            model: this.$refs.tree.currentNode.node.parent.data.label,
            standalone: event.label,
            father_data: _this.treeData,
          }).then((result) => {
            _this.treeData = result.data.data
          }).catch((err) => {
            console.log(err)
          })
        } else if (event.type == 'stage_marker') {
          // 2级目录
          this.df_model = this.$refs.tree.currentNode.node.parent.parent.data.label,
            // 3级目录
            this.df_standalone = this.$refs.tree.currentNode.node.parent.data.label,
            // 4级目录
            this.df_stage_marker = event.label
          this.getInfo()
        }else if(event.type == 'message'){
          var arr = event.label.split("_")
          // console.log(arr)
          this.df_model=arr[0]
          this.df_standalone=arr[1]
          this.df_stage_marker=arr[2]
          this.getInfo()
        }
      },
      // 检索
      search(){
        // console.log(this.keyWords.length)
        if(this.keyWords.length==0){
          this.getTree()
        }else {
          axios.post(this.$store.state.url+'/myapp/search/',{
            stage_marker:this.keyWords
          }).then((result) => {
            // console.log(result.data.data)
            this.treeData = result.data.data
          })
        }
      },
      //获取数据
      getInfo() {
        axios.post(this.$store.state.url+'/myapp/show_info_all/', {
          model: this.df_model,
          standalone: this.df_standalone,
          stage_marker: this.df_stage_marker
        }).then((result) => {
          this.tableData = [];
          this.datalist = result.data.data;
          // console.log(result.data.data)
          for (let i = 0; i < this.datalist.length; i++) {
            if (this.datalist[i].p_number != null) {
              this.tableData.push({
                p_number: this.datalist[i].p_number,
                printed: this.datalist[i].printed,
                p_test: this.datalist[i].p_test,
                time_of_duration: this.datalist[i].time_of_duration,
                temperature: this.datalist[i].temperature,
                required: this.datalist[i].required,
                device: this.datalist[i].device,
                power_dissipation: this.datalist[i].power_dissipation,
                heat_resistance: this.datalist[i].heat_resistance,
                tj: this.datalist[i].tj,
                htj: this.datalist[i].htj,
                id: this.datalist[i].id,
                k_temperature:this.datalist[i].k_temperature,
                image_1:this.datalist[i].image1,
                image_2:this.datalist[i].image2,
                shejishi: this.datalist[i].role1_confirm,
                chanbaoshi: this.datalist[i].role2_confirm,
                zhuren: this.datalist[i].role3_confirm,
                admin: this.datalist[i].role4_confirm,
                editable: false,
              })
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 打开编辑模态框
      openEdit(){
        if(this.df_model.length==0||this.df_stage_marker.length==0||this.df_standalone.length==0){
          alert('请选择目录')
        }else {
          this.dialogVisible=true
        }
      },
      // 增添
      saveAddTest() {
        let _this = this
        var formData = new FormData();
        //依次添加多个文件
        for (var i = 0; i < this.upath1.length; i++) {
          formData.append('image_1', this.upath1);
        }
        formData.append('model', this.df_model)
        formData.append('standalone', this.df_standalone)
        formData.append('stage_marker', this.df_stage_marker)
        formData.append('p_number', this.add_p_number)
        formData.append('printed', this.add_printed)
        formData.append('p_test', this.add_p_test)
        formData.append('time_of_duration', this.add_time_of_duration)
        formData.append('temperature', this.add_temperature)
        formData.append('k_temperature', this.add_k_temperature)
        formData.append('required', this.add_required)
        formData.append('device', this.add_device)
        formData.append('power_dissipation', this.add_power_dissipation)
        formData.append('heat_resistance', this.add_heat_resistance)
        formData.append('tj', this.add_tj)
        formData.append('htj', this.add_htj)
        let oReq = new XMLHttpRequest();
        oReq.open("POST", this.$store.state.url+'/myapp/add_info/');
        oReq.send(formData);
        oReq.onload = function(res) {
          alert('添加成功')
          _this.upath1='';
          _this.upathname1='';
          _this.add_p_number='';
          _this.add_printed='';
          _this.add_p_test='';
          _this.add_time_of_duration='';
          _this.add_temperature='';
          _this.add_required='';
          _this.add_device='';
          _this.add_power_dissipation='';
          _this.add_heat_resistance='';
          _this.add_k_temperature='';
          _this.add_tj='';
          _this.add_htj='';
          _this.dialogVisible = false
          _this.getInfo()
        };

      },
      // 编辑
      handleEdit(index, row) {
        row.editable = true;
      },
      // 保存
      saveEdit(index, row) {
        row.editable = false;
        axios.post(this.$store.state.url+'/myapp/edit_info/', {
          id: row.id,
          p_number: row.p_number,
          printed: row.printed,
          p_test: row.p_test,
          time_of_duration: row.time_of_duration,
          temperature: row.temperature,
          k_temperature: row.k_temperature,
          required: row.required,
          device: row.device,
          power_dissipation: row.power_dissipation,
          heat_resistance: row.heat_resistance,
          tj: row.tj,
          htj: row.htj,
        }).then((result) => {
          this.getInfo()
        }).catch((err) => {
          console.log(err)
        })
      },
      // 保存图片
      saveEditImg(){
        let _this = this
        var imgformData = new FormData();
        //依次添加多个文件
        for (var i = 0; i < this.upath2.length; i++) {
          imgformData.append('image_2', this.upath2);
        }
      },
      // 删除
      handleDelete(index, row) {
        axios.post(this.$store.state.url+'/myapp/del_info/', {
          id: row.id
        }).then((result) => {
          alert('删除成功!')
          this.getInfo()
        }).catch((err) => {
          console.log(err)
        })
      },
      // 确认
      handleConfirm(index, row) {
        var juese = ''
        if (sessionStorage.getItem("userDuty") == '"设计师"') {
          juese = 'role1_confirm'
        } else if (sessionStorage.getItem("userDuty") == '"产保师"') {
          juese = 'role2_confirm'
        } else if (sessionStorage.getItem("userDuty") == '"主任设计师/技术负责人"') {
          juese = 'role3_confirm'
        } else if (sessionStorage.getItem("userDuty") == '"产保副总师"') {
          juese = 'role4_confirm'
        }else {
          alert('没有权限！')
          return false
        }
        axios.post(this.$store.state.url+'/myapp/confirm_info/', {
          id: row.id,
          role: juese
        }).then((result) => {
          alert('确认成功!')
          this.getInfo()
        }).catch((err) => {
          console.log(err)
        })
      },
      // 选中导出数据
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data);
      },
      //设计师可编辑
      isShejishi() {
        if (sessionStorage.getItem("userDuty") == '"设计师"') {
          this.isSheji = true
        } else {
          this.isSheji = false
        }
      },
      //管理员可删除
      isBoss() {
        if ((sessionStorage.getItem("userDuty") == '"设计师"')||(sessionStorage.getItem("userDuty") == '"产保副总师"')||(sessionStorage.getItem("userDuty") == '"保密员"')) {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      },
      //不同角色确定
      isConfirm(index, row) {
        if ((sessionStorage.getItem("userDuty") == '"设计师"') && (row.shejishi == 1)) {
          return false
        } else if ((sessionStorage.getItem("userDuty") == '"产保师"') && (row.chanbaoshi == 1)) {
          return false
        } else if ((sessionStorage.getItem("userDuty") == '"主任设计师/技术负责人"') && (row.zhuren == 1)) {
          return false
        } else if ((sessionStorage.getItem("userDuty") == '"产保副总师"') && (row.admin == 1)) {
          return false
        } else {
          return true
        }
      },
      //导入图片
      changeImage1(e) {
        this.upath1 = e.target.files;
        for (var i = 0; i < this.upath1.length; i++) {
          this.upathname1+=e.target.files[i].name+','
        }
      },
      selectFile1(){
        $("#fileName1").trigger("click");
      },
      changeImage2(e) {
        this.upath2 = e.target.files;
        for (var i = 0; i < this.upath2.length; i++) {
          this.upathname2+=e.target.files[i].name+','
        }
      },
      selectFile2(){
        $("#fileName2").trigger("click");
      },
      // /-待修改-/
      //选中当前行
      clickRow(row) {
        this.imgId = row.id
        // console.log(row);
        let imgurl = this.$store.state.url
        this.imageUrlMIs = imgurl+'/myapp'+row.image_1;
        this.imageUrlTIs = imgurl+'/myapp'+row.image_2;
      },

    },
    mounted(){
      this.getTree()
      this.isShejishi()
    }
  }
</script>

<style scoped>
  span {
    color: white
  }
  .showimages li+li{
    display: none;
  }
  .right-button {
    float: left;
    width: 29%;
    height: 50px;
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

  #otherAttr {
    font-family: sans-serif;
    font-size: 13px;
    border-collapse: collapse;
  }

  #otherAttr td {
    width: 100px;
    /* background: gray; */
    height: 30px;

  }

  #otherAttr tr td {
    color: gray;
    text-align: left;
  }

  /*图片*/
  .min {
    width: 200px;
    cursor: zoom-in;
    height: 120px;
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
