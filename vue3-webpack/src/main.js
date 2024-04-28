import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
// 卸载应用
window.unmount = () => {
    app.unmount()
  }