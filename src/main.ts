import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.use(ElementPlus)
app.use(pinia)

  
app.mount('#app')

// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import router from './router'

// // 创建应用并挂载
// createApp(App)
//   .use(router)
//   .use(ElementPlus)
//   .use(createPinia())
//   .mount('#app')

// // 注册 Element Plus 图标组件
// Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
//   const app = createApp(App) // 如果需要访问 app 实例
//   app.component(key, component)
// })



