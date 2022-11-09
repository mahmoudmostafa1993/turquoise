import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from '../src/router/router'
import store from './store/store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import mixins from './mixins/mixins'
import DatetimePicker from 'vuetify-datetime-picker'
import axios from 'axios'
// Language Plugin
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

Vue.use(DatetimePicker)
Vue.use(VueI18n)

// Ready translated locale messages
const language = {
  en: en,
  ar: ar,
}
let userLang = 'ar'
if (localStorage.getItem('userLang')) {
  userLang = localStorage.getItem('userLang')
}

// config file with base endpoint url
// axios.defaults.baseURL = process.env.VUE_APP_API_URL
const userData = localStorage.getItem('token')
if (userData) {
  // axios.defaults.headers.common['x-access-token'] = 'Bearer ' + userData.token
  axios.defaults.headers.common.Authorization = 'Bearer ' + userData
  axios.defaults.headers['Content-type'] = 'application/json'
  axios.defaults.headers.accept = '*/*'
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: userLang,
  messages: language,
})
Vue.use(require('vue-moment'))
Vue.use(VueResource)
// Vue Mixins
Vue.mixin({
  mixins: [mixins],
})
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
