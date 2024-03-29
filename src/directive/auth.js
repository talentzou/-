// 获取用户小仓库
import { userStore } from "@/stores/user"

//自定义指令，用于按钮是否显示
export default {
  install: (app) => {
    const $userStore = userStore()
    app.directive("auth", {
      //组件挂载完毕执行一次
      mounted(el, binding) {
        const authBtn = toRaw($userStore.authBtn)
        let isHas = false
        for (const index in authBtn) {
          if (authBtn[index][`btn_name`] == binding.value) {
            isHas = true
            break
          }
        }
        if (!isHas) {
          el && el.parentNode && el.parentNode.removeChild(el)
        }

      }
    })
  }
}
