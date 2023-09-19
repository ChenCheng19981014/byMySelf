import { createApp } from 'vue'
import './style.css'
import './reset.css'
import App from './App.vue'
import route from './router/index'
createApp(App).use(route).mount('#app')
