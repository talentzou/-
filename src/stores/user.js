import { defineStore } from "pinia"
import { routes } from "../router/routes"
export const userStore = defineStore("user", () => {
   const userMenu=ref(routes)
   return {userMenu}
})
