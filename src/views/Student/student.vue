<script setup>
import { useRules, searchRule } from "@/rules/studentRules"
import { useExportExcel } from "@/utils/exportExcel"
import { resetForm, submitForm } from "@/utils/rules"
import {
  getStudentResponse,
  updateStudentResponse,
  createStudentResponse,
  deleteStudentResponse
} from "@/api/Student/student"
import { GetFloorWithDormList } from "@/api/Dorm/floors"
import { Notification } from "@/utils/notification"
import { authFields } from "@/utils/authFields"
const { operate_auth, table_auth } = authFields("student")
const searchRef = ref(null)
const Form = ref(null)
const searchStudentParams = reactive({
  studentName: "",
  studentNumber: ""
})
let isOperate = ref(true)
let studentVisible = ref(false)
let expDialog = ref(false)
let refTable = ref(null)
let studentEditParams = ref({
  studentName: "",
  studentNumber: "",
  sex: "",
  phone: "",
  dormId: ""
})
const searchRules = searchRule
const formRules = useRules(studentEditParams.value)
// 导出
const fields = {
  studentName: "学生姓名",
  studentNumber: "学号",
  sex: "性别",
  phone: "联系电话",
  dormId: "宿舍"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}
/* 接口 */
let studentTableData = ref([])
const total = ref(0)
let Pages = reactive({
  PageSize: 10,
  Page: 1
})
async function getStudents(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  console.log("发起请求")
  const { code, data } = await getStudentResponse(
    searchStudentParams,
    Pages
  )
  if(code==200){
    studentTableData.value = data.list
    total.value = data.total
  }
}
// 更新
async function updateStudents() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateStudentResponse(studentEditParams.value)
    studentVisible.value = false
    const status = Notification(code, msg)
    status ? getStudents() : ""
  }
}
// 删除
async function deleteStudents(list) {
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  console.log("LIST", list)
  const { code, msg } = await deleteStudentResponse(list)
  const status = Notification(code, msg)
  status ? getStudents() : ""
}
// 添加
async function createStudents() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const list = toRaw(studentEditParams.value)
    console.log("list", list)
    const { code, msg } = await createStudentResponse([list])
    studentVisible.value = false
    const status = Notification(code, msg)
    status ? getStudents() : ""
  }
}
//搜索栏
async function SearchStudents() {
  const query = searchStudentParams
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
    getStudents()
  }
}
const options = ref([])
const getFloorWithDorm = async () => {
  const { code, data } = await GetFloorWithDormList()
  console.log("ppp", data)
  if (code == 200) {
    options.value = data.list
  }
}
onMounted(() => {
  getFloorWithDorm()
  getStudents()
})
</script>

<template>
  <div>
    <!-- 搜索 -->
    <el-form
      ref="searchRef"
      :rules="searchRules"
      :model="searchStudentParams"
      inline>
      <el-form-item
        prop="studentNumber"
        style="width: 160px">
        <el-input
          v-model="searchStudentParams.studentNumber"
          placeholder="请输入学号" />
      </el-form-item>
      <el-form-item style="width: 160px">
        <el-input
          v-model="searchStudentParams.studentName"
          placeholder="请输入学生姓名"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchStudents"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      :isOperate="isOperate"
      :authBtn="operate_auth"
      v-model="studentVisible"
      @delete="deleteStudents"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      ref="refTable"
      :data="studentTableData"
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
        width="150"
        align="center" />
      <el-table-column
        prop="studentName"
        label="姓名"
        width="150"
        align="center" />
      <el-table-column
        prop="sex"
        label="性别"
        width="120"
        align="center">
        <template #default="{ row, column, $index }"> </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="150"
        align="center" />

      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="180"
        align="center">
        <template #default="{ row }">
          <el-tag>{{
            row.dorm.floorsName + "-" + row.dorm.dormNumber
          }}</el-tag></template
        >
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @delete="deleteStudents"
            @merge="studentVisible = true"
            v-model="studentEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      @getCurrentPage="getStudents"
      @getPageSizes="getStudents" />
    <FormDialog
      ref="Form"
      v-model="studentVisible"
      v-model:params="studentEditParams"
      :title="studentEditParams.id ? `修改学生信息` : `添加学生信息`"
      @close="Form.resetFields()">
      <el-form
        :model="studentEditParams"
        :rules="formRules"
        label-width="auto"
        ref="Form">
        <el-form-item
          label="宿舍"
          prop="dormId">
          <el-select
            v-model="studentEditParams.dormId"
            placeholder="请选择宿舍"
            style="width: 100%">
            <el-option-group
              v-for="group in options"
              :key="group.floorsName"
              :label="group.floorsName">
              <el-option
                v-for="item in group.dormList"
                :key="item.id"
                :label="group.floorsName + `-` + item.dormNumber"
                :value="item.id" />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item
          label="学号"
          prop="studentNumber"
          ><el-input
            v-model="studentEditParams.studentNumber"
            placeholder="请输入"
        /></el-form-item>
        <el-form-item
          label="学生名字"
          prop="studentName"
          ><el-input
            v-model="studentEditParams.studentName"
            placeholder="请输入学生名字"
        /></el-form-item>
        <el-form-item
          label="性别"
          prop="sex">
          <el-select
            v-model="studentEditParams.sex"
            placeholder="请选择性别">
            <el-option
              label="男"
              value="男" />
            <el-option
              label="女"
              value="女" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          ><el-input
            v-model="studentEditParams.phone"
            placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item style="display: block">
          <el-button
            @click="studentEditParams.id ? updateStudents() : createStudents()"
            type="success"
            >{{ studentEditParams.id ? "更新" : "添加" }}</el-button
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

<style lang="scss" scoped></style>
