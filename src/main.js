import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import {gsap} from 'gsap'
import 'element-plus/dist/index.css'
import Element from 'element-plus'
import {Axios} from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App)

app.use(router)
app.use(Element)
app.use(gsap)
app.use(VueAxios,Axios)
app.provide('Axios', app.config.globalProperties.axios)
app.mount('#app')
