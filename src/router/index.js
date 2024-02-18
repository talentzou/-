import { createRouter, createWebHistory } from "vue-router"
import { routes } from "./routes"
// import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
