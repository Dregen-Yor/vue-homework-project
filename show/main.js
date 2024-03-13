import { createApp } from 'vue'
import Show from './views/workshows.vue'
import router from './router'
import '../src/index.css'
import 'gsap'

const show= createApp(Show);
show.use(router);
show.mount('#show');
