//自动注册插件
//On-demand components auto-importing.
import Components from "unplugin-vue-components/vite"
import IconsResolver from "unplugin-icons/resolver"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
export default function createComponentPlugin(){
    return  Components({
        resolvers: [
          // 自动注册组件
          IconsResolver({
            prefix: false,
            enabledCollections: ["ep"]
            // alias: {
            //   Ic:"ep"
            // }
          }),
          ElementPlusResolver()
        ]
      })
}