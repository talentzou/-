<script setup>
import {
  getBedResponse,
  updateBedResponse,
  deleteBedResponse,
  createBedResponse
} from "@/api/DORM/bed"
import { useExportExcel } from "@/utils/exportExcel"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
import { dormNumber } from "@/rules/dormRules"
import { Notification } from "@/utils/notification"
import { authFields} from "@/utils/authFields"
const {operate_auth, table_auth}=authFields("bed")
let $route = useRoute()
const refTable = ref(null)
const Form = ref(null)
const searchRef = ref(null)
const expDialog = ref(false)
let bedSearchParams = reactive({
  dormNumber: ""
})
let editBedParams = ref({
  bedStatus: "",
  dormNumber: "",
  bedNumber: "",
  remark: "",
  studentName: ""
})
const searchRules = {
  dormNumber: [
    {
      validator: dormNumber,
      trigger: "blur"
    }
  ]
}
const formRules = useRules(editBedParams.value)
let isOperate = ref(true)
let bedVisible = ref(false)
bedSearchParams.dormNumber = $route.params.name
//导出数据
const fields = {
  dormNumber: "宿舍",
  bedNumber: "床位编号",
  bedStatus: "床位状态",
  studentName: "入住人",
  remark: "备注"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}

/* 接口 */
let bedTableData = ref([])
// const total = ref(0)
async function getBeds() {
  const { code, data } = await getBedResponse(bedSearchParams)
  if (code == 200) {
    bedTableData.value = data.list
    // total.value = data.total
  }
}
// 更新
async function updateBeds() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateBedResponse(editBedParams.value)
    bedVisible.value = false
    const status = Notification(code, msg)
    status ? getBeds() : ""
  }
}
// 删除
async function deleteBeds(list) {
  console.log("LIST", list)
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  const { code, msg } = await deleteBedResponse(list)
  const status = Notification(code, msg)
  status ? getBeds() : ""
}
// 添加
async function createBeds() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await createBedResponse([editBedParams.value])
    bedVisible.value = false
    const status = Notification(code, msg)
    status ? getBeds() : ""
  }
}
//搜索栏
async function SearchFloor() {
  const query = bedSearchParams
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
    getBeds()
  }
}
onMounted(() => {
  getBeds()
})
</script>
<template>
  <div>
    <!-- 搜索 -->
    <el-form
      :rules="searchRules"
      :model="bedSearchParams"
      ref="searchRef"
      inline>
      <el-form-item prop="dormNumber">
        <el-input
          v-model="bedSearchParams.dormNumber"
          placeholder="请输入宿舍编号"
          clearable
          style="width: 180px" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchFloor"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <OperateButton
      :isOperate="isOperate"
      :authBtn="operate_auth"
      @excel="expDialog = true"
      @delete="deleteBeds"
      v-model="bedVisible" />
    <!-- 表格数据 -->
    <el-table
      :data="bedTableData"
      :default-sort="{ prop: 'bedNumber', order: 'descending' }"
      ref="refTable"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
      border
      :max-height="525">
      <el-table-column
        type="selection"
        fixed
        width="55" />
      <el-table-column
        width="55"
        type="index"
        label="#" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="bedNumber"
        label="床位编号"
        width="180"
        sortable
        align="center" />
      <el-table-column
        prop="bedStatus"
        label="床位状态"
        width="180"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tag
            type="info"
            v-if="row.bedStatus === '没人'"
            >{{ row.bedStatus }}</el-tag
          >
          <el-tag v-else>{{ row.bedStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="入住人"
        width="180"
        align="center" />
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @merge="bedVisible = true"
            @delete="deleteBeds"
            v-model="editBedParams" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <FormDialog
      @close="Form.resetFields()"
      v-model="bedVisible"
      v-model:params="editBedParams"
      :title="editBedParams.id ? `修改床位信息` : `添加床位信息`">
      <el-form
        ref="Form"
        :rules="formRules"
        :model="editBedParams"
        label-width="auto">
        <el-form-item
          label="宿舍"
          prop="dormNumber">
          <el-input v-model="editBedParams.dormNumber" />
        </el-form-item>
        <el-form-item
          label="床位编号"
          prop="bedNumber">
          <el-input v-model.number="editBedParams.bedNumber" />
        </el-form-item>
        <el-form-item
          label="床位状态"
          prop="bedStatus">
          <el-radio-group v-model="editBedParams.bedStatus">
            <el-radio label="有人">有人</el-radio>
            <el-radio label="没人">没人</el-radio>
            <el-radio label="其他">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="入住人"
          prop="studentName">
          <el-input v-model="editBedParams.studentName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="editBedParams.remark"
            placeholder="备注信息"
            :rows="3"
            type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="editBedParams.id ? updateBeds() : createBeds()"
            type="success"
            >{{ editBedParams.id ? "更新" : "添加" }}</el-button
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
