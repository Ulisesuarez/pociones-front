import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import i18n from './i18n';
import VueCookie from 'vue-cookie';
import instance from './plugins/axios';
import Services from './services';
import Notifications from 'vue-notification'

// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(Notifications);
Vue.config.productionTip = false;
const services = Services({ axios:instance });
Vue.prototype.$services = services;
Vue.prototype.$axios= instance;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
