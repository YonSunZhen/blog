import Vue from 'vue'
import App from './articleDetail.vue'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#articleDetail');