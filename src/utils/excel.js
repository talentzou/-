import { read, utils, writeFile } from "xlsx"
export function exportExcel(data,  filename) {
  /* 利用数据 */
  // //创建表
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
  const ws = utils.json_to_sheet(data)
  //创建文件
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, "sheet")
  writeFile(wb, `${filename}.xlsx`)

  // /* 利用dom */
  // const table=document.getElementById("table")
  // console.log(table);
  // const ws2=utils.table_to_sheet(table)
  // const wb2=utils.book_new()
  // utils.book_append_sheet(wb2,ws2,"sheetkk")
  // writeFile(wb2, "test22.xlsx")
}
