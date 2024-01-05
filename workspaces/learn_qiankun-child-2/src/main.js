import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// main.ts
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper';

let app;
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App).use(router).mount('#app');
} else {
  renderWithQiankun({
    mount(props) {
      console.log('--mount');
      console.log('props :', props)
      app = createApp(App);
      app
        .use(router)
        .mount(
          (props.container
            ? props.container.querySelector('#app')
            : document.getElementById('app'))
        );
    },
    bootstrap() {
      console.log('--bootstrap');
    },
    update() {
      console.log('--update');
    },
    unmount() {
      console.log('--unmount');
      app?.unmount();
    }
  });
}