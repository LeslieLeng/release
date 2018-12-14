<template>
  <div class="main_box">
      <div class="main_header">
          <div class="left_logo">
               <div class="logo_image">
                   <img src="../assets/imgs/logo.png" style="width:45px;height:45px" alt="">
               </div>
               <div class="logo_font"><span>上海空间电源研究所</span></div>
          </div>
          <div class="right_logo">
                <ul>
                    <li style="min-width:140px; padding-right:30px; margin-top: -16px;">
                        <span>{{name.replace(/\"/g, "")}}</span><br>
                        <span style="font-style:italic">{{duty.replace(/\"/g, "")}}</span>
                    </li>
                    <li style="margin-right:-20px;">
                      <img src="../assets/imgs/u15960.png" >
                    </li>
                    <li><img src="../assets/imgs/u15958.png" ></li>
                  <li>
                    <img src="../assets/imgs/u15956.png" >
                  </li>
                  <li style="width: 70px" class="btn_c" v-if="islogin" @click="clearUser()">注销</li>
                  <router-link v-if="!islogin" style="width: 70px" class="btn_c" tag="li" active-class="active" role="presentation" to="/login">
                    登录
                  </router-link>
                  <router-link style="width: 70px" class="btn_c" v-if="isBoss" tag="li" active-class="active" role="presentation" to="/admin">
                    用户管理
                  </router-link>
                </ul>

          </div>
      </div>
      <div class="main_content">

          <div class="main_content_right" >
              <div class="content_right_data">
                    <router-view></router-view>
              </div>
          </div>
          <div class="main_leftnav" >
    <el-menu style="margin-left:40px"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            router
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#1E1E1E">
            <el-menu-item index="/home">
         <i class="icon iconfont icon-index"></i>
        <span slot="title" style="font-size:15px">主&nbsp;&nbsp;&nbsp;&nbsp;页</span>
        </el-menu-item>
      <el-submenu index="1" appear-active-class="demoAA">
        <template slot="title">
          <i class="icon iconfont icon-liebiao"></i>
          <span style="font-size:15px">MES数据采集</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/danti"><i class="icon iconfont icon-dantijiance"></i>单体测试数据</el-menu-item>
          <el-menu-item index="/dieceng"><i class="icon iconfont icon-diejia"></i>叠层测试数据</el-menu-item>
          <el-menu-item index="/hanjie"><i class="icon iconfont icon-huaban"></i>焊接测试数据</el-menu-item>
          <el-menu-item index="/rechengxiang"><i class="el-icon-share"></i>热成像仪测试数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-menu-item index="/analyze">
        <i class="icon iconfont icon-tongjifenxi" style="width:16px;height:16px"></i>
        <span slot="title" style="font-size:15px">MES数据统计分析</span>
      </el-menu-item>


    </el-menu>

          </div>
      </div>
  </div>
</template>
<script>
import $ from 'jquery'

$(function(){
    $('.mesfont').click(
        function(){
           // alert(123124)
        $(this).next().toggle()
        }
    )


})
    import DanTi from './DanTi'
    import DieCeng from './DieCeng'
    import Home from './Home'
    import HanJie from './HanJie'
    import ReChengXiang from './ReChengXiang'
    export default{
        name:'Nav',
        data(){
            return{
                activeIndex:'1',
                message:'MES数据采集',
                islogin:false,
                isBoss:false,
                name:'811Sisp',
                duty:'Administrator'
            }
        },
      computed:{

      },
      mounted(){
        this.examine()
      },
        methods:{
          // 退出登录
          clearUser(){
            sessionStorage.clear()
            this.examine()
            this.$router.go(0)
            this.$router.push('/home')

          },
          // 用戶檢查
          examine(){
            if(sessionStorage.getItem("userId")){
              this.name=sessionStorage.getItem("userName")
              this.duty=sessionStorage.getItem("userDuty")
              this.islogin=true
            }else {
              this.islogin=false
            }
            if(sessionStorage.getItem("userDuty")=='"产保副总师"'){
              this.isBoss=true
            }else {
              this.isBoss=false
            }
          },

            handleSelect(key,keyPath){
                console.log(key,keyPath)
                var that=this;
                if(keyPath[1]=="1-1"){
                    that.message="MES数据采集"
                }
                if(keyPath[1]=="1-2"){
                    that.message="单体测试数据"
                }
                else if(keyPath[1]=='1-3'){
                    that.message="叠层测试数据"
                }
                else if(keyPath[1]=='1-4'){
                    that.message="叠层焊接数据"
                }
            }
        }
    }
</script>
<style scoped>
  /*图标*/
  .el-icon-share{
    width: 16px;
    height: 16px;
  }
  .btn_c{
    color: #fff;
    line-height: 32px;
    text-align: center;
    cursor:pointer;
  }
    .demoAA{
        background: RED;
    }
    .main_box{
        width: 100%;
        height: 920px;
        /* background: red; */

    }
    /* 头部导航栏固定样式 */
    .main_header{
        width: 100%;
        height: 50px;
        /* background-color:#000000; */
        background-color: #545c64;
        box-sizing: border-box;
    }
    .left_logo{
        width: 50%;
        float: left;
        height: 50px;
        /* background: red; */
    }
    .right_logo{
        width: 50%;
        float: left;
        height: 50px;
        /* background: blue; */
        box-sizing: border-box;
    }
    .logo_image{
        float: left;
        margin-left: 5px;
        padding-top: 2.5px;

    }

    .logo_font{
        float: left;
    }
    .logo_font>span{
        line-height: 50px;
        font-size: 28px;
        color: aliceblue;
        font-style: normal;
        font-weight: bold;
    }
    .right_logo>ul>li{
        height: 50px;
        width: 60px;
        /* background: yellow; */
        float: right;
        list-style: none;
        margin-top: -8px;
        margin-left: 20px;
    }

    .right_logo>ul>li>span{
        font-size: 12px;
        color: white;
    }

   /* 中间内容样式 */
    .main_content{
        width: 100%;
        height: 920px;
        background: orange;
    }
    .main_leftnav{
        float: left;
        width: 220px;
        height: 920px;
        background: #545c64;
        margin-left:-100%;
    }

    .main_content_right{
        float: left;
        height: 920px;
        width: 100%;
        background: #F2F2F2;
    }
    .content_right_data{
        margin-left:220px;
        height: 920px;
    }

    /* 左侧导航栏样式 */
    .main_leftnav>ul{
        width: 180px;
        height: 920px;
        /* background: green; */
        margin-top: 0.1px;
    }
    .main_leftnav>ul>li{
        list-style: none;
        width: 220px;
        /* height: 50px; */
        float: left;
        cursor: pointer;
        margin-left:-40px;
        /* background: red; */
    }
    .main_leftnav>ul>li>img{
        /* padding-left: -10px; */
        margin-left: 20px;
        /* padding-top: 10px; */
        margin-bottom:-7px;
    }
    .main_leftnav>ul>li>span{
        /* color:white; */
        line-height: 50px;
        display: inline-block;
        font-size: 17px;
    }
    .router-link-active{
        background:#F2F2F2;
    }
    .router-link-active .tab-link{
        color:black;
    }
    .tab-link{
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        text-indent: 20px;
        width:130px;
    }
    .el-menu-item.is-active {
   background-color: #C6E2FF !important;
}


</style>

