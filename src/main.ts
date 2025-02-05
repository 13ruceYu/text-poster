import { Icon } from '@iconify/vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store'
import './index.css'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('Icon', Icon)

app.mount('#app')
