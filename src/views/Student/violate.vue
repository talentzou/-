<script setup>
import { useRules } from "@/rules/studentRules"
import { useExportExcel } from "@/utils/exportExcel"
import { resetForm, submitForm } from "@/utils/rules"
import {
  getViolateResponse,
  updateViolateResponse,
  createViolateResponse,
  deleteViolateResponse
} from "@/api/Student/violate"
import { floorDormRule } from "@/rules/dormRules"
import { GetDormWithStudent } from "@/api/Dorm/dorm"
import { Notification } from "@/utils/notification"
import { authFields } from "@/utils/authFields"
import { FormatTime } from "@/utils/time"
const { operate_auth, table_auth } = authFields("violate")
let searchViolateParams = reactive({
  floorDorm: "",
  studentName: ""
})
let searchRef = ref(null)
let violateVisible = ref(false)
let expDialog = ref(false)
let isOperate = ref(true)
const Form = ref(null)
let violateEditParams = ref({
  sorts: [],
  studInfoId: "",
  dormId: "",
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
let Pages = ref({
  PageSize: 10,
  Page: 1
})
async function getViolates() {

  const { code, data } = await getViolateResponse(searchViolateParams, Pages.value)
  if (code == 200) {
    violateTableData.value = data.list
    total.value = data.total
  }
  console.log("jjjj", data.list)
}
// 更新
async function updateViolates() {
  const valid = await submitForm(Form.value)
  if (valid) {
    // console.log( typeof violateEditParams.value.sorts[0]);
    violateEditParams.value.dormId = violateEditParams.value.sorts[0]
    const { code, msg } = await updateViolateResponse(violateEditParams.value)
    violateVisible.value = false
    const status = Notification(code, msg)
    status ? getViolates() : ""
    delete violateEditParams.value.is
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
    list.dormId = violateEditParams.value.sorts[0]
    list.studInfoId = violateEditParams.value.sorts[1]
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
const options = ref([])

const getDormWithStu = async () => {
  const { code, data } = await GetDormWithStudent()
  // console.log("ppp宿舍学生", data)
  if (code == 200) {
    // options.value = data.list
    HandleCustomProps(data)
  }
  // const res = await GetDormWithStudent()
  // console.log("vbvnvnv+++++",res);
}
// 合并参数
const mergeParams = (arr) => {
  violateVisible.value = true
  options.value = NotHaveChild.value
  violateEditParams.value.sorts=[arr[0]]
  // violateEditParams.value.studInfoId=arr[1]
  console.log(violateEditParams.value);
}
// 处理数据
// 处理数据
const dormWithStu = ref([])
const NotHaveChild = ref([])
const HandleCustomProps = (data) => {
  const CustomProps = data.map((item) => {
    const temp = {}
    temp.label = item.floorsName + "-" + item.dormNumber
    temp.value = item.id
    temp.children = []
    item.studInfoList.forEach((children) => {
      let cc = {}
      cc.label = children.studentName
      cc.value = children.id
      temp.children.push(cc)
    })
    return temp
  })
  const NotChild = data.map((item) => {
    const temp = {}
    temp.label = item.floorsName + "-" + item.dormNumber
    temp.value = item.id
    temp.children = null
    return temp
  })
  // console.log(" CustomProps", CustomProps)
  dormWithStu.value = CustomProps
  NotHaveChild.value = NotChild
  // console.log("没有孩子", NotChild)
}
onMounted(() => {
  getDormWithStu()
  getViolates()
})
//页码数发生改变
const HandlePageChange = async (page) => {
  Pages.value=page
  const { code, data } = await getViolateResponse(searchViolateParams, page)
  if (code == 200) {
    violateTableData.value = data.list
  }
}
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :rules="floorDormRule"
      :model="searchViolateParams"
      inline>
      <el-form-item
        prop="floorDorm"
        style="width: 160px">
        <el-input
          v-model="searchViolateParams.floorDorm"
          placeholder="请输入宿舍名称" />
      </el-form-item>
      <el-form-item style="width: 160px">
        <el-input
          v-model="searchViolateParams.studentName"
          placeholder="请输入学生姓名"
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
      @add="options = dormWithStu"
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
        prop="studInfo.studentNumber"
        label="学号"
        width="160"
        align="center" />
      <el-table-column
        prop="studInfo.studentName"
        label="姓名"
        width="160"
        align="center" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="160"
        align="center">
        <template #default="{ row }">
          {{ row.dorm.floorsName + "-" + row.dorm.dormNumber }}</template
        >
      </el-table-column>
      <el-table-column
        prop="violate"
        label="违纪内容"
        width="180"
        align="center">
        <template #default="{ row }">
          <el-tag type="warning"> {{ row.violate }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="resolve"
        label="处理措施"
        width="160"
        align="center">
        <template #default="{ row }">
          <el-tag type="danger"> {{ row.resolve }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="recordDate"
        label="登记日期"
        width="120"
        align="center">
        <template #default="{ row }">
        {{ FormatTime(row.recordDate) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @delete="deleteViolates"
            @merge="mergeParams"
            v-model="violateEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      @getCurrentPage="HandlePageChange"
      @getPageSizes="HandlePageChange" />
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
          label="宿舍和学生"
          style="width: 100%"
          prop="sorts">
          <el-cascader
            clearable
            v-model="violateEditParams.sorts"
            placeholder="Try searchingL Guide"
            :options="options"
            filterable />
        </el-form-item>

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
