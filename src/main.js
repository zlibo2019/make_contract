// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill";
import store from './store'
import './plugins/element'
import 'swiper/dist/css/swiper.min.css';
import './assets/css/theme.scss';
// import Blob from './excel/Blob.js'
// import Export2Excel from './excel/expor2Excal'

// Vue.use(API);
// Vue.use(utils);

Vue.config.productionTip = false;


new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
