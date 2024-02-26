import { defineStore } from "pinia"
export const layoutStore = defineStore("layout", () => {
  const isFold = ref(false)
  const isRefresh=ref(true)
  return {
    isFold,
    isRefresh,
  }
})
