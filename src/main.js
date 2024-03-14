import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import 'gsap'
import 'element-plus/dist/index.css'
import Element from 'element-plus'
const app = createApp(App)

app.use(router)
app.use(Element)

app.mount('#app')
