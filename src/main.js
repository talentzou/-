//初始化样式
import "reset-css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import svgIcon from "./components/svgIcon/svgIcon.vue"
//引入本地icon注册脚本
import "virtual:svg-icons-register"
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component("svg-icon", svgIcon)
app.mount("#app")
