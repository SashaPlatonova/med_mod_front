import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BalmUI from 'balm-ui'
import BalmUIPlus from 'balm-ui-plus'
import 'balm-ui-css'
import components from './components/UI'
import { FontAwesomeIcon } from './plugins/font-awesome'

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
  app.component('font-awesome-icon', FontAwesomeIcon)
})

app.use(BalmUI)
app.use(BalmUIPlus)
app.use(router)
app.use(store)

app.mount('#app')
