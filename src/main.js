//初始化样式
import "reset-css"
import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import svgIcon from "./components/svgIcon/index.vue"
//引入本地icon注册脚本
import "virtual:svg-icons-register"
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component("svg-icon", svgIcon)
app.mount("#app")
