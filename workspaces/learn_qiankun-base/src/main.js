import './assets/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerMicroApps, start } from 'qiankun';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// load micro app
registerMicroApps([
  {
    name: 'vue',
    entry: 'http://localhost:7100/',
    container: '#vue',
    activeRule: '/vue'
  },
  {
    name: 'vue2',
    entry: 'http://localhost:7200/',
    container: '#vue2',
    activeRule: '/vue2'
  },
])

start()

const app = createApp(App)

app.use(router)
app.use(Antd)

app.mount('#app')
