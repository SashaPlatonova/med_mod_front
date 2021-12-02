import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BalmUI from 'balm-ui'
import BalmUIPlus from 'balm-ui-plus'
import 'balm-ui-css'
import components from './components/UI'

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

app.use(BalmUI)
app.use(BalmUIPlus)
app.use(router)

app.mount('#app')
