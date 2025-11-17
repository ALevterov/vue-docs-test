import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";

const app = createApp(App)

const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  timeout: 5000
}

app.use(Toast, toastOptions)

app.use(createPinia())
app.use(router)

app.mount('#app')
