import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import {gsap} from 'gsap'
import 'element-plus/dist/index.css'
import Element from 'element-plus'
import DevUI from 'vue-devui';
// import {MonacoEditor} from 'monaco-vue3-editor'
import 'vue-fullpage.js/dist/style.css'
import VueFullPage from 'vue-fullpage.js'
const app = createApp(App)

app.use(Element)
app.use(gsap)
app.use(DevUI)
app.use(VueFullPage)
// app.use(MonacoEditor)
app.mount('#app')
