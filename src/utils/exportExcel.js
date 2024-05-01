import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

/**
 * @param {Array} 表格数据
 * @param {Object} 表格表头字段
 * @param {string} 表格文件名
 * @return {void}
 */
export async function useExportExcel(data,fields,filename) {
  if (filename === "")
  return ElMessage({
    message: "文件名不能为空！！！",
    type: "error"
  })
if (data.length === 0) {
  return ElMessage({
    message: "没有选中项数据导出！！！",
    type: "error"
  })
}
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet("My Sheet")
  let columns = []
  Object.entries(fields).forEach(([key, value]) => {
    if (key !== "id") {
      let obj = {}
      obj.header = value
      obj.key = key
      obj.width = 30
      obj.style = { alignment: { vertical: "middle", horizontal: "center" } }
      columns.push(obj)
    }
  })
  //   设置表头
  worksheet.columns = columns

  // 获取表头
  const table_header_row = worksheet.getRow(1)
  //   设置行高
  table_header_row.height = 25
  //
  Object.keys(fields).forEach((header, index,) => {
    const cell = table_header_row.getCell(index + 1)
    //    设置字体大小
    cell.font = {
      bold: true
    }
    //    字体居中
    cell.alignment = { vertical: "middle", horizontal: "center" }
    // 背景颜色
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" }
    }
    // 边框颜色
    cell.border = {
      top: { style: " thin", color: { argb: "FFEBEEF5" } },
      left: { style: " thin", color: { argb: "FF888888" } },
      bottom: { style: " thin", color: { argb: "FFEBEEF5" } },
      right: { style: " thin", color: { argb: "FF888888" } }
    }
  })
  //添加数据
  data.forEach((e) => {
    Reflect.deleteProperty(e, "id")
    worksheet.addRow(e)
  })
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: "application/octet-stream" })
  saveAs(blob, `${filename}.xlsx`)
}
/* 
// 导出import { useExportExcel } from "@/utils/exportExcel"
// const fields = {
//   studentName: "学生姓名",
//   studentNumber: "学号",
//   sex: "性别",
//   phone: "联系电话",
//   dormId: "宿舍"
// }
// function exportTable({ filename, allSelect }) {
//   const data = allSelect
//     ? refTable.value.data
//     : refTable.value.getSelectionRows()
//   useExportExcel(data, fields, filename)
// }
 */
