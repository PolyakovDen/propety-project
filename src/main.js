import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import "./plugins/vue-mask";
import VueSocialSharing from "vue-social-sharing";

const baseURL = process.env.VUE_APP_API_URL;

Vue.use(VueSocialSharing);
Vue.use(VueAxios, axios);
axios.defaults.baseURL = baseURL;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
