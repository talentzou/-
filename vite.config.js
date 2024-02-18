import { fileURLToPath, URL } from "node:url"
import { defineConfig, loadEnv } from "vite"
import createPlugins from "./vite/plugins"
// import vue from "@vitejs/plugin-vue"
// //On-demand API auto-importing.
// import AutoImport from "unplugin-auto-import/vite"
// //On-demand components auto-importing.
// import Components from "unplugin-vue-components/vite"
// //Access thousands of icons as components.
// import Icons from "unplugin-icons/vite"
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// import IconsResolver from "unplugin-icons/resolver"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  // eslint-disable-next-line no-undef, no-unused-vars
  const env = loadEnv(mode, process.cwd(), "")
  const plugins = createPlugins()
  console.log(env.DORM_BASE_URL_API);
  return {
    plugins,
    // plugins: [
    //   vue(),
    //   //自动引入插件
    //   AutoImport({
    //     imports: ["vue", "vue-router", "pinia"],
    //     resolvers: [
    //       //自动引入组件
    //       ElementPlusResolver(),
    //       IconsResolver({
    //         prefix: "Icon"
    //       })
    //     ]
    //   }),
    //   Components({
    //     resolvers: [
    //       // 自动注册组件
    //       IconsResolver({
    //         prefix: false,
    //         enabledCollections: ["ep"]
    //         // alias: {
    //         //   Ic:"ep"
    //         // }
    //       }),
    //       ElementPlusResolver()
    //     ]
    //   }),
    //   //解析并加载svg
    //   Icons({
    //     compiler: "vue3",
    //     autoInstall: true
    //   })
    // ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5173',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    },
    envPrefix:"DORM_",
  
  }
})
