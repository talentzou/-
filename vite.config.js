import { fileURLToPath, URL } from "node:url"
import { defineConfig, loadEnv } from "vite"
import createPlugins from "./vite/plugins"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  // eslint-disable-next-line no-undef, no-unused-vars
  const env = loadEnv(mode, process.cwd(), "")
  const plugins = createPlugins()
  // console.log(env.DORM_BASE_URL_API);
  return {
    plugins,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      proxy: {
        [env.DORM_PROXY_PREFIX_API]: {
          target: env.DORM_PROXY_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    envPrefix: "DORM_"
  }
})
