<template>
  <div>
    <div class="data_header">
      <div class="data_header_font">
        <p>用户管理</p>
      </div>
      <div class="data_header_logo">
        <p>CASC SISP</p>
      </div>
    </div>
    <div class="data_content">
      <div id="addtest">
        <h2>创建热成像仪测试任务</h2>
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="产品型号">
            <el-input v-model="model" placeholder="请输入产品型号！"></el-input>
          </el-form-item>
          <el-form-item label="产品编号">
            <el-input v-model="standalone" placeholder="请输入产品编号！"></el-input>
          </el-form-item>
          <el-form-item label="阶段名称">
            <el-select v-model="stage_marker" placeholder="请选择阶段名称">
              <el-option label="方案件" value="方案件"></el-option>
              <el-option label="电性件" value="电性件"></el-option>
              <el-option label="鉴定件" value="鉴定件"></el-option>
              <el-option label="正样件" value="正样件"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addtest">创建</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="adduser">
        <div class="title">
          <span>用户信息</span>
        </div>
        <div id="addlist" >
          <el-form  :inline="true"  class="demo-form-inline">
            <el-form-item label="用户名：">
              <el-input size="small" v-model="userName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
              <el-input size="small" v-model="userPwd" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="职务：">
              <el-select size="small" v-model="userDuty" placeholder="人员职务">
                <el-option label="设计师" value="设计师"></el-option>
                <el-option label="产保师" value="产保师"></el-option>
                <el-option label="主任设计师/技术负责人" value="主任设计师/技术负责人"></el-option>
                <el-option label="产保副总师" value="产保副总师"></el-option>
                <el-option label="保密员" value="保密员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click="add">新增</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData"
            border
            height='367'
            :header-cell-style="{background:'#666666',color:'#fff'}"
            style="width: 100%;overflow:auto" >
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="dataName"
              label="用户名"
              width="250">
            </el-table-column>
            <el-table-column
              prop="dataPwd"
              label="密码"
              width="250">
            </el-table-column>
            <el-table-column
              prop="dataDuty"
              label="职位"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                <el-dialog
                  title="修改"
                  :visible.sync="dialogVisible"
                  width="30%"
                >
                  <el-form class="demo-form-inline">
                    <el-form-item label="用户名:">
                      <el-input v-model="updateName" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                      <el-input v-model="updatePwd" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="职务:"><br>
                      <el-select v-model="updateDuty">
                        <el-option label="设计师" value="设计师"></el-option>
                        <el-option label="产保师" value="产保师"></el-option>
                        <el-option label="主任设计师/技术负责人" value="主任设计师/技术负责人"></el-option>
                        <el-option label="产保副总师" value="产保副总师"></el-option>
                        <el-option label="保密员" value="保密员"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveEdit">保存</el-button>
  </span>
                </el-dialog>

                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Admin",
    data(){
      return{
        // 发布测试
        model:'',
        standalone:'',
        stage_marker:'',
        // 输入信息
        userName:'',
        userPwd:'',
        userDuty:'',
        userId:'',
        // 用户列表
        userdata:'',
        tableData: [],
        // 编辑
        dialogVisible: false,
        updateName:'',
        updatePwd:'',
        updateDuty:'',
        updateId:'',
      }
    },
    methods: {
      //发布测试目录
      addtest(){
        if((this.model.length==0)||(this.standalone.length==0)||(this.standalone.length==0)){
          alert('目录不能为空！')
        }else {
          axios.post(this.$store.state.url+'/myapp/add_atree/', {
            model:this.model,
            standalone:this.standalone,
            stage_marker:this.stage_marker
          }).then((result) =>{
            alert('创建成功')
            this.model = '';
            this.standalone = '';
            this.stage_marker = '';
            console.log(result)
          }).catch((err) => {
            console.log(err)
          })
        }
      },

      // 增加用户
      add(){
        let _this = this
        axios.post(this.$store.state.url+'/myapp/add_user/', {
          account:this.userName,
          password:this.userPwd,
          role:this.userDuty,
        })
          .then(function (response) {
            _this.userName='';
            _this.userPwd='';
            _this.userDuty='';
            _this.tableData=[];
            _this.ajaxUserList();
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      // 编辑用户信息
      handleEdit(index, row) {
        this.updateName = row.dataName
        this.updatePwd = row.dataPwd
        this.updateDuty = row.dataDuty
        this.updateId = row.dataId
        this.dialogVisible = true
        console.log(this.updateId);
      },
      // 保存用户信息
      saveEdit(){
        let _this = this
        axios.post(this.$store.state.url+'/myapp/edit_user/', {
          uid:this.updateId,
          account:this.updateName,
          password:this.updatePwd,
          role:this.updateDuty
        })
          .then(function (response) {
            alert('保存成功！')
            _this.dialogVisible = false
            _this.tableData=[]
            _this.ajaxUserList()
            // console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 删除
      handleDelete(index,row) {
        let _this = this
        axios.post(this.$store.state.url+'/myapp/del_user/', {
          account:row.dataName,
        })
          .then(function (response) {
            _this.tableData=[]
            _this.ajaxUserList()
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // 获取所有用户
      ajaxUserList() {
        axios.post(this.$store.state.url+'/myapp/get_user').then((result) => {
          this.userdata = result.data.data
          // console.log(result.data.data)
          for (let i = 0; i < this.userdata.length; i++) {
            this.tableData.push({
              dataName:this.userdata[i].account,
              dataPwd:this.userdata[i].password,
              dataDuty:this.userdata[i].role,
              dataId:this.userdata[i].uid
            })
          }
        })
      }
    },
    mounted(){
      this.ajaxUserList()
    }
  }
</script>

<style scoped>
  /*内容*/
  .data_content{
    width: 100%;
    margin-top: 20px;
    border: 2px solid #0E2D5F ;
    border-radius: 15px;
    height: 100%;
    color: #545c64;
  }
  #addtest{
    text-align: center;
  }
  #adduser{
    width: 80%;
    margin: 40px auto;
    border: 1px solid #0E2D5F;
    border-radius: 15px;
    background: #fff;
    padding-bottom: 20px;
  }
  #adduser .title{
    border-radius: 15px 15px 0 0;
    width: 100%;
    background: #337ab7;
    text-align: center;
    height: 60px;
    line-height: 60px;
    color: #fff;
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  #addlist{
    margin: 0 auto ;
    width: 90%;
    text-align: center;
  }
  #addlist h3{
    text-align: center;
  }
  /*数据头样式 */
  .data_header {
    background-color: #F2F2F2;
    height: 50px;
  }

  .data_header_font {
    float: left;
    width: 70%;
    height: 50px;
    background-color: #003366;
    border-bottom-right-radius: 50rem;
  }

  .data_header_logo {
    float: left;
    width: 30%;
    height: 50px;
    background-color: #F2F2F2;
  }

  .data_header_font > p {
    color: #ffffff;
    float: left;
    font-size: 18px;
    line-height: 50px;
    font-weight: 400;
    text-align: center;
    font-style: italic;
    margin-top: 0px;
    margin-left: 5px;
  }

  .data_header_logo > p {
    color: #AAB9C8;
    font-size: 35px;
    line-height: 50px;
    font-weight: 600;
    text-align: center;
    font-style: italic;
    margin-top: 0px;
  }
</style>
