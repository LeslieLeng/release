<template>
  <div class="rechengxiaong">
    <div class="data_header">
      <div class="data_header_font">
        <p>热成像仪测试数据</p>
      </div>
      <div class="data_header_logo">
        <p>CASC SISP</p>
      </div>
    </div>
    <div class="data_nav">
      <ul class="data_nav_ul">
        <router-link to="/unreviewed" tag="li" style="margin-left:-25px;">
        <span class="topnav">未审核</span>
        </router-link>
        <router-link to="/reviewed" tag="li">
        <span class="topnav">已审核</span>
        </router-link>
        <router-link to="/rechengxiangall" tag="li">
          <span class="topnav">全部</span>
        </router-link>
      </ul>
    </div>

    <div class="data_grid">
      <router-view>
      </router-view>
    </div>
  </div>
</template>
<script>



  export default{
    name:"rechengxiang",
    components:{

    }
  }
</script>
<style scoped>
  .rechengxiaong{
    width: 100%;
    height: 920px;
    background:#FFFFFF;
    box-sizing: border-box;
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
  /* 数据导航样式 */
  .data_nav{
    width: 100%;
    height: 35px;
    background: #f2f2f2;
    border-bottom: 0.1px solid #ccc ;
    margin-top: -16px;
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
  }
  .data_nav_ul>li{
    list-style: none;
    float: left;
    text-decoration: none;
    width: 120px;
    height: 35px;
    margin-left: 5px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .router-link-active{
    border-bottom:2px solid #199ED8;
  }
  .topnav{
    color: gray;
    font-family: Arial,sans-serif;
    font-size: 15px;
  }
  .router-link-active .topnav{
    color:black;
    font-weight: bold;
  }
  /* 数据表格样式 */
  .data_grid{
    width: 100%;
    height: auto;
    /* background: blue; */
  }
  /* 查询样式 */
  .data_search{
    background:orange;
    width: 100%;
    height: 70px;
    margin-top: -13px;
    /* padding-left: 15px; */
  }
  /* 表头样式 */


</style>

