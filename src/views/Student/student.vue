<script setup>
import { useRules } from "@/rules/studentRules"
import { useExportExcel } from "@/utils/exportExcel"
import { resetForm, submitForm } from "@/utils/rules"
import { getStudentInfoRequest } from "@/api/STUDENT/student"
const searchRef = ref(null)
const Form = ref(null)
const searchStudentParams = reactive({
  studentName: "",
  studentNumber: "",
  major: ""
})
let isOperate = ref(true)
let studentVisible = ref(false)
let expDialog = ref(false)
let refTable = ref(null)
let studentEditParams = ref({
  studentName: "",
  studentNumber: "",
  sex: "",
  major: "",
  phone: "",
  dormNumber: ""
})
const searchRules = useRules(searchStudentParams)
const formRules = useRules(studentEditParams.value)
// 导出
const fields = {
  studentName: "学生姓名",
  studentNumber: "学号",
  sex: "性别",
  major: "专业",
  phone: "联系电话",
  dormNumber: "宿舍"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}
/* 接口 */
let studentTableData = ref([])
async function getStudentData() {
  const { code, data } = await getStudentInfoRequest()
  studentTableData.value = data
}
onMounted(() => {
  getStudentData()
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
        prop="dormNumber"
        style="width: 160px">
        <el-input
          v-model="searchStudentParams.dormNumber"
          placeholder="请输入宿舍名称" />
      </el-form-item>
      <el-form-item style="width: 160px">
        <el-input
          v-model="searchStudentParams.studentName"
          placeholder="请输入学生姓名"
          clearable />
      </el-form-item>
      <el-form-item style="width: 160px">
        <el-input
          v-model="searchStudentParams.bedNumber"
          placeholder="请输入专业"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(searchRef)"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      :isOperate="isOperate"
      v-model="studentVisible"
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
        label="序号" />
      <el-table-column
        prop="studentNumber"
        label="学号"
        width="120"
        align="center" />
      <el-table-column
        prop="studentName"
        label="姓名"
        width="120"
        align="center" />
      <el-table-column
        prop="sex"
        label="性别"
        width="80"
        align="center">
        <template #default="{ row, column, $index }"> </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="120"
        align="center" />
      <el-table-column
        prop="major"
        label="专业"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="120"
        align="center" />
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            @merge="studentVisible = true"
            v-model="studentEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="100"
      @getCurrentPage="55"
      @getPageSizes="55" />
    <FormDialog
      ref="Form"
      v-model="studentVisible"
      v-model:params="studentEditParams"
      :title="studentEditParams.id ? `修改学生信息` : `添加学生信息`"
      @close="Form.resetFields()">
      <el-form
        :model="studentEditParams"
        :rules="formRules"
        ref="Form">
        <el-form-item
          label="宿舍"
          prop="dormNumber"
          ><el-input
            v-model="studentEditParams.dormNumber"
            placeholder="请输入宿舍"
        /></el-form-item>
        <el-form-item
          label="学号"
          prop="studentNumber"
          ><el-input
            :disabled="studentEditParams.id"
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
          label="专业"
          prop="major"
          ><el-input
            v-model="studentEditParams.major"
            placeholder="请输入专业"
        /></el-form-item>
        <el-form-item
          label="手机号"
          prop="phone"
          ><el-input
            v-model="studentEditParams.phone"
            placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item style="display: block">
          <el-button
            @click="submitForm(Form)"
            type="success"
            >创建</el-button
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
