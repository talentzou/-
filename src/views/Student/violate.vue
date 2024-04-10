<script setup>
import { useRules, searchRule } from "@/rules/studentRules"
import { useExportExcel } from "@/utils/exportExcel"
import { resetForm, submitForm } from "@/utils/rules"
import {
  getViolateResponse,
  updateViolateResponse,
  createViolateResponse,
  deleteViolateResponse
} from "@/api/Student/violate"
import { Notification } from "@/utils/notification"
import { authFields } from "@/utils/authFields"
import { FormatTime } from "@/utils/time"
const { operate_auth, table_auth } = authFields("violate")
let searchViolateParams = reactive({
  studentNumber: "",
  dormNumber: ""
})
let searchRef = ref(null)
let violateVisible = ref(false)
let expDialog = ref(false)
let isOperate = ref(true)
const Form = ref(null)
let violateEditParams = ref({
  studentNumber: "",
  studentName: "",
  dormNumber: "",
  violate: "",
  resolve: "",
  recordDate: ""
})
// 导出
const fields = {
  studentNumber: "学生学号",
  studentName: "学生姓名",
  dormNumber: "宿舍",
  violate: "违纪内容",
  resolve: "处理措施",
  recordDate: "登记日期"
}
const formRules = useRules(violateEditParams.value)
const refTable = ref(null)
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}

/* 接口 */
let violateTableData = ref([])
const total = ref(0)
let Pages = reactive({
  PageSize: 10,
  Page: 1
})
async function getViolates(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  // console.log("发起请求")
  const { code, data } = await getViolateResponse(searchViolateParams, Pages)
  if (code == 200) {
    violateTableData.value = data.list
    total.value = data.total
  }
}
// 更新
async function updateViolates() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateViolateResponse(violateEditParams.value)
    violateVisible.value = false
    const status = Notification(code, msg)
    status ? getViolates() : ""
  }
}
// 删除
async function deleteViolates(list) {
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  console.log("LIST", list)
  const { code, msg } = await deleteViolateResponse(list)
  const status = Notification(code, msg)
  status ? getViolates() : ""
}
// 添加
async function createViolates() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const list = toRaw(violateEditParams.value)
    // console.log("list", list)
    const { code, msg } = await createViolateResponse([list])
    violateVisible.value = false
    const status = Notification(code, msg)
    status ? getViolates() : ""
  }
}
//搜索栏
async function SearchViolates() {
  const query = searchViolateParams
  let params = Object.fromEntries(
    Object.entries(query).filter(([key]) => query[key])
  )
  // console.log("对象",params,Object.keys(params).length);
  if (!Object.keys(params).length) {
    console.log("控制")
    ElMessage({
      message: "搜索输入不能为空",
      type: "error"
    })
    return
  }
  const valid = await submitForm(searchRef.value)
  if (valid) {
    getViolates()
  }
}
onMounted(() => {
  getViolates()
})
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :rules="searchRule"
      :model="searchViolateParams"
      inline>
      <el-form-item
        prop="dormNumber"
        style="width: 160px">
        <el-input
          v-model="searchViolateParams.dormNumber"
          placeholder="请输入宿舍名称" />
      </el-form-item>
      <el-form-item style="width: 160px">
        <el-input
          v-model="searchViolateParams.studentNumber"
          placeholder="请输入学号"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchViolates"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      :isOperate="isOperate"
      :authBtn="operate_auth"
      @delete="deleteViolates"
      v-model="violateVisible"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      ref="refTable"
      :data="violateTableData"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
      border
      :max-height="525">
      <el-table-column
        type="selection"
        fixed
        width="50" />
      <el-table-column
        width="55"
        type="index"
        label="#" />
      <el-table-column
        prop="studentNumber"
        label="学号"
        width="160"
        align="center" />
      <el-table-column
        prop="studentName"
        label="姓名"
        width="160"
        align="center" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="160"
        align="center" />
      <el-table-column
        prop="violate"
        label="违纪内容"
        width="180"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tag type="warning"> {{ row.violate }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="resolve"
        label="处理措施"
        width="160"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tag type="danger"> {{ row.resolve }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="recordDate"
        label="登记日期"
        width="120"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tag type="success"> {{ FormatTime(row.recordDate) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @delete="deleteViolates"
            @merge="violateVisible = true"
            v-model="violateEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      @getCurrentPage="getViolates"
      @getPageSizes="getViolates" />
    <FormDialog
      ref="Form"
      v-model="violateVisible"
      v-model:params="violateEditParams"
      :title="violateEditParams.id ? `修改学生信息` : `添加学生信息`"
      @close="Form.resetFields()">
      <el-form
        :model="violateEditParams"
        :rules="formRules"
        label-width="auto"
        ref="Form">
        <el-form-item
          label="宿舍"
          prop="dormNumber"
          ><el-input
            v-model="violateEditParams.dormNumber"
            placeholder="请输入宿舍"
        /></el-form-item>
        <el-form-item
          label="学号"
          prop="studentNumber"
          ><el-input
            v-model="violateEditParams.studentNumber"
            placeholder="请输入学号"
        /></el-form-item>
        <el-form-item
          label="学生名字"
          prop="studentName"
          ><el-input
            v-model="violateEditParams.studentName"
            placeholder="请输入学生名字"
        /></el-form-item>
        <el-form-item
          label="违纪内容"
          prop="violate"
          ><el-input
            v-model="violateEditParams.violate"
            placeholder="请输入违纪内容"
        /></el-form-item>
        <el-form-item
          label="处理措施"
          prop="resolve"
          ><el-input
            v-model="violateEditParams.resolve"
            placeholder="请输入处理措施" />
        </el-form-item>
        <el-form-item
          label="登记日期"
          prop="recordDate">
          <el-date-picker
            style="width: 195px"
            v-model="violateEditParams.recordDate"
            type="date"
            format="YYYY-MM-DD"
            placeholder="请选择日期" />
        </el-form-item>
        <el-form-item style="display: block">
          <el-button
            @click="violateEditParams.id ? updateViolates() : createViolates()"
            type="success"
            >{{ violateEditParams.id ? "更新" : "添加" }}</el-button
          >
          <el-button
            @click="resetForm(Form)"
            type="primary"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </FormDialog>
    <ExportDialog
      v-model="expDialog"
      @select="exportTable" />
  </div>
</template>
