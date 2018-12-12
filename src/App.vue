<template>
  <div id="app">
    <!--<router-view v-if="isRouterAlive"></router-view>-->
    <Nav></Nav>





  </div>
</template>

<script>


import Nav from './components/Nav'


export default {
  name: 'App',
//  provide(){
//    return{
//    reload: this.reload
//    }
//  },
//  data(){
//    return{
//      isRouterAlive: true
//    }
//  },
//  methods:{
//    reload(){
//      this.isRouterAlive = false
//      this.$nextTick(function () {
//        this.isRouterAlive = true
//      })
//    }
//  },
  components: {
    Nav
  },
}
</script>

<style scoped>

#app{
  margin-left: -8px;
  margin-top:-8px;
}

</style>
