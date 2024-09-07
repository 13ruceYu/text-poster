import { createApp } from 'vue'
import './index.css'
import { Icon } from '@iconify/vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('Icon', Icon)

app.mount('#app')
