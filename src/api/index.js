import Login from './login';

const APIList = {
  Login,
};

export default {

  install(Vue) {
    console.log('install........');
    Vue.prototype.$api = APIList
  }
};