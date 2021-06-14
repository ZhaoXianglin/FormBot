import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index'
import VeGauge from 'v-charts/lib/gauge.common'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.component(VeGauge.name, VeGauge)
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
