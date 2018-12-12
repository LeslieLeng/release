<template>
    <div>
      <div class="data_header">
        <div class="data_header_font">
          <p>登录</p>
        </div>
        <div class="data_header_logo">
          <p>CASC SISP</p>
        </div>
      </div>

      <div class="data_content">
        <div class="c_left">
          <img src="../../assets/imgs/u15976.png" alt="">
        </div>
        <div class="c_right">
          <div class="cont">
            <h2>请登录</h2>
            <el-form :model="ruleForm2" label-position="top" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名：" prop="name">
                <el-input prefix-icon="el-icon-share" type="text"  v-model="ruleForm2.name" placeholder="请输入用户名！" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="pass">
                <el-input prefix-icon="el-icon-edit" type="password" v-model="ruleForm2.pass" placeholder="请输入密码！" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "Login",
      data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          }else {
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (!value) {
           return callback(new Error('请输入密码'));
          }else {
            callback();
          }

        };
        return {
          ruleForm2: {
            pass: '',
            name: ''
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            name: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios.post(this.$store.state.url+'/myapp/login/', {
                account:this.ruleForm2.name,
                password:this.ruleForm2.pass,
              }).then((result) =>{
                if (result.data.code == 1) {
                  alert("用户名不存在！");
                } else if (result.data.code == 2) {
                  alert("密码错误！");
                } else if (result.data.code == 200) {
                  if (sessionStorage) {
                    sessionStorage.setItem("userId", JSON.stringify(result.data.data.uid));
                    sessionStorage.setItem("userName", JSON.stringify(result.data.data.account));
                    sessionStorage.setItem("userDuty", JSON.stringify(result.data.data.role));
                  }
                  if((result.data.data.role=="产保副总师")||(result.data.data.role=="保密员")){
                    this.$router.go(0)
                    this.$router.push('/admin')
                  }else {
                    this.$router.go(0)
                    this.$router.push('/rechengxiang')
                  }
                }else {
                  alert("服务器错误！");
                }
              }).catch((err) => {
                console.log(err)
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
  /*登陆框*/
  .data_content{
    width: 100%;
    height: 500px;
    margin-top: 20px;
    border: 2px solid #0E2D5F ;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    color: #545c64;
  }
  .c_left{
    width: 40%;
    text-align: center;
    padding-top: 120px;
  }
  .c_right{
    width: 60%;
    padding: 50px 50px 20px;
  }
  .c_right .cont{
    width: 400px;
  }
  .c_right button{
    margin-top: 20px;
    width: 100px;
    height: 40px;
    color: #fff;
    background:#0E2D5F ;
    border-radius: 5px;
    border: 2px solid #0E2D5F;
  }
  .c_right button:hover{
    background:#89a1cf ;
    color:#0E2D5F ;
  }
  /*数据头样式 */
  .data_header{
    background-color:#F2F2F2;
    height: 50px;
  }
  .data_header_font{
    float: left;
    width: 70%;
    height: 50px;
    background-color: #003366;
    border-bottom-right-radius: 50rem;
  }
  .data_header_logo{
    float: left;
    width: 30%;
    height: 50px;
    background-color: #F2F2F2;
  }
  .data_header_font>p{
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
  .data_header_logo>p{
    color: #AAB9C8;
    font-size: 35px;
    line-height: 50px;
    font-weight: 600;
    text-align: center;
    font-style: italic;
    margin-top: 0px;
  }
</style>
