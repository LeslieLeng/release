import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state={
  url:'http://172.16.3.105:8079'
}

export default new Vuex.Store({
  state
});
