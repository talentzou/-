//自动引入插件
import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import IconsResolver from "unplugin-icons/resolver"

 //自动引入组件
export default function createAutoImportPlugin(){
    return AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon"
          })
        ]
    })
}
