import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import VeGauge from 'v-charts/lib/gauge.common'
Vue.config.productionTip = false
Vue.component(VeGauge.name, VeGauge)
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
