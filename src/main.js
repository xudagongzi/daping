import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import stores from './stores.js'

Vue.use(Vuex)
Vue.use(ElementUI);
Vue.prototype.$axios = axios;

const store = new Vuex.Store(stores)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');