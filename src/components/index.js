import svgIcon from "@/components/SvgIcon/svgIcon.vue"
import OperateButton from "@/components/OperateButton/operate.vue"
import Pagination from "@/components/Pagination/pagination.vue"
import TableButton from "@/components/TableButton/tableButton.vue"
import FormDialog from "@/components/FormDialog/dialog.vue"
import ExportDialog from "@/components/ExportDialog/exportLoading.vue"

let comp = { OperateButton, Pagination, TableButton, FormDialog, ExportDialog }
export default {
  install(app) {
    Object.keys(comp).forEach((key) => app.component(key, comp[key]))
    app.component("svg-icon", svgIcon)
  }
}
