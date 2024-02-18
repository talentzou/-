import vue from "@vitejs/plugin-vue"
import createAutoImportPlugin from "./auto-import"
import createComponentPlugin from "./vue-components"
import { createLocalSvgIcon, createSvgIcon } from "./icons"
// import viteMockDevServer from "./mock"
export default function createPlugins() {
  let vitePlugins = [vue()]
  vitePlugins.push(createAutoImportPlugin())
  vitePlugins.push(createComponentPlugin())
  vitePlugins.push(createSvgIcon())
  vitePlugins.push(createLocalSvgIcon())
  // vitePlugins.push(viteMockDevServer())
  return vitePlugins
}
