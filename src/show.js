import './assets/main.css'

import { createApp } from 'vue'
import Show from './page/workshows.vue'
import router from './router'
import './index.css'
import 'gsap'

const show= createApp(Show);
show.use(router);
show.mount('#show');
