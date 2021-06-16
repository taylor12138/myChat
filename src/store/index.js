import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    username: 'default',
    img: 'avator.png'
  },
  mutations: {
    setInfo(state) {
      const userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      state.username = userInfo.username;
    }
  }
})
export default store;