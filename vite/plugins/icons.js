import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import Icons from "unplugin-icons/vite"
import path from "node:path"
//本地引入
export function createLocalSvgIcon() {
  return createSvgIconsPlugin({
    // Specify the icon folder to be cached
    // eslint-disable-next-line no-undef
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    // Specify symbolId format
    symbolId: "icon-[dir]-[name]"
  })
}
//按需引入
export function createSvgIcon() {
  return Icons({
    compiler: "vue3",
    autoInstall: true
  })
}
