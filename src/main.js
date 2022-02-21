import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BalmUI from 'balm-ui'
import BalmUIPlus from 'balm-ui-plus'
import 'balm-ui-css'
import components from './components/UI'
import { FontAwesomeIcon } from './plugins/font-awesome'
import VueCookies from 'vue3-cookies'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
  app.component('font-awesome-icon', FontAwesomeIcon)
})

app.use(BalmUI)
app.use(BalmUIPlus)
app.use(VueCookies)
app.use(router)
app.use(store)
router.app = app

app.mount('#app')
