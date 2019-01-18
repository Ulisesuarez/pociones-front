import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import i18n from './i18n';
import VueCookie from 'vue-cookie';
import instance from './plugins/axios';
import Services from './services';


// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.config.productionTip = false;
console.log(instance);
const services = Services({ axios:instance });
console.log(services);
Vue.prototype.$services = services;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
