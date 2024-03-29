<script setup>
import {
  getExpenseResponse,
  updateExpenseResponse,
  deleteExpenseResponse,
  createExpenseResponse
} from "@/api/EXPENSE/expense"
import { useExportExcel } from "@/utils/exportExcel"
import { resetForm, submitForm } from "@/utils/rules"
import { useRules, searchRule } from "@/rules/expenseRules"
import { Notification } from "@/utils/notification"
import { authFields} from "@/utils/authFields"
const refTable = ref(null)
const searchRef = ref(null)
const Form = ref(null)
let expenseSearchParams = reactive({
  floorsName: "",
  dormNumber: "",
  settlementDate: "",
  accounter: ""
})
let expenseEditParams = ref({
  uuid: "",
  floorsName: "",
  dormNumber: "",
  paymentTime: "",
  waterConsumption: "",
  waterCharge: "",
  electricityConsumption: "",
  electricityCharge: "",
  totalCost: "",
  accountant: "",
  phone: "",
  remark: ""
})
// 按钮字段
const {operate_auth, table_auth}=authFields("expense")
console.log("operate_auth",operate_auth,"table_auth",table_auth);
const searchRules = searchRule
const formRules = useRules(expenseEditParams.value)
let isOperate = ref(true)
//导出对话框
const expDialog = ref(false)

let expenseVisible = ref(false)
//导出表格
const fields = {
  floorsName: "宿舍楼",
  dormNumber: "宿舍",
  paymentTime: "订单时间",
  waterConsumption: "用水量",
  waterCharge: "水费",
  electricityConsumption: "用电量",
  electricityCharge: "电费",
  totalCost: "总费用",
  accountant: "计算人",
  phone: "联系电话",
  remark: "备注"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}
function selectDatePicker(params) {}

const waterCharge = computed(() => {
  return Number.parseFloat(expenseEditParams.value.waterConsumption) * 1.5 || 0
})
const electricityCharge = computed(() => {
  return (
    Number.parseFloat(expenseEditParams.value.electricityConsumption, "kkkk") *
      0.6 || 0
  )
})
const totalCost = computed(() => {
  console.log(expenseEditParams.value)
  return waterCharge.value + electricityCharge.value || 0
})
watchEffect(() => {
  expenseEditParams.value.waterCharge = waterCharge.value
  expenseEditParams.value.electricityCharge = electricityCharge.value
  expenseEditParams.value.totalCost = totalCost.value
})
/* 接口 */
let expenseTableData = ref([])
const total = ref(0)
let Pages = reactive({
  PageSize: 10,
  Page: 1
})
async function getExpenses(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  console.log("发起请求")
  const { code, data } = await getExpenseResponse(expenseSearchParams, Pages)
  if (code == 200) {
    expenseTableData.value = data.list
    total.value = data.total
  }
}
// 更新
async function updateExpenses() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateExpenseResponse(expenseEditParams.value)
    expenseVisible.value = false
    const status = Notification(code, msg)
    status ? getExpenses() : ""
  }
}
// 删除
async function deleteExpenses(list) {
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  console.log("LIST", list)
  const { code, msg } = await deleteExpenseResponse(list)
  const status = Notification(code, msg)
  status ? getExpenses() : ""
}
// 添加
async function createExpenses() {
  const valid = await submitForm(Form.value)
  if (valid) {
    expenseEditParams.value.waterConsumption = waterCharge.value
    expenseEditParams.value.electricityCharge = electricityCharge.value
    const list = toRaw(expenseEditParams.value)
    console.log(list)
    const { code, msg } = await createExpenseResponse([list])
    expenseVisible.value = false
    const status = Notification(code, msg)
    status ? getExpenses() : ""
  }
}
//搜索栏
async function SearchExpenses() {
  const query = expenseSearchParams
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
    getExpenses()
  }
}
onMounted(() => {
  getExpenses()
})
</script>

<template>
  <div>
    <el-form
      :model="expenseSearchParams"
      ref="searchRef"
      :rules="searchRules"
      inline>
      <el-form-item prop="floorsName">
        <el-input
          style="width: 180px"
          v-model="expenseSearchParams.floorsName"
          placeholder="请输入宿舍楼名称" />
      </el-form-item>
      <el-form-item prop="dormNumber">
        <el-input
          style="width: 180px"
          v-model="expenseSearchParams.dormNumber"
          placeholder="请输入宿舍名称" />
      </el-form-item>
      <el-form-item prop="accounter">
        <el-input
          v-model="expenseSearchParams.accounter"
          placeholder="请输入结算人"
          clearable
          style="width: 180px" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchExpenses"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      v-model="expenseVisible"
      :authBtn="operate_auth"
      :isOperate="isOperate"
      @delete="deleteExpenses"
      @excel="expDialog = true" />
    <el-table
      :data="expenseTableData"
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
        prop="floorsName"
        label="宿舍楼"
        width="90"
        align="center" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="90"
        align="center" />
      <el-table-column
        prop="paymentTime"
        label="缴费时间"
        width="200"
        align="center" />
      <el-table-column
        prop="waterConsumption"
        label="用水量"
        width="100"
        align="center" />
      <el-table-column
        prop="waterCharge"
        label="水费"
        width="100"
        align="center" />
      <el-table-column
        prop="electricityConsumption"
        label="用电量"
        width="100"
        align="center" />
      <el-table-column
        prop="electricityCharge"
        label="电费"
        width="100"
        align="center" />
      <el-table-column
        prop="totalCost"
        label="总费用"
        width="100"
        align="center" />
      <el-table-column
        prop="accountant"
        label="核算人"
        width="100"
        align="center" />
      <el-table-column
        prop="phone"
        label="联系电话"
        width="120"
        align="center" />
      <el-table-column
        prop="操作"
        label="操作"
        align="center"
        fixed="right"
        width="200">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @delete="deleteExpenses"
            @merge="expenseVisible = true"
            v-model="expenseEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      @getCurrentPage="getExpenses"
      @getPageSizes="getExpenses" />
    <FormDialog
      :width="45"
      @close="Form.resetFields()"
      v-model="expenseVisible"
      v-model:params="expenseEditParams"
      :title="expenseEditParams.uuid ? `修改费用信息` : `添加费用信息`">
      <el-form
        ref="Form"
        :rules="formRules"
        label-position="left"
        :model="expenseEditParams"
        label-width="auto"
        inline>
        <el-form-item
          label="缴费时间"
          prop="paymentTime"
          style="width: 270px">
          <el-date-picker
            @change="selectDatePicker"
            v-model="expenseEditParams.paymentTime"
            type="date"
            format="YYYY-MM-DD"
            placeholder="Start date" />
        </el-form-item>
        <el-form-item
          prop="floorsName"
          label="宿舍楼">
          <el-input
            :disabled="expenseEditParams.uuid == `` ? false : true"
            v-model="expenseEditParams.floorsName"
            placeholder="请输入宿舍楼名称" />
        </el-form-item>
        <el-form-item
          label="宿舍编号"
          prop="dormNumber">
          <el-input
            :disabled="expenseEditParams.uuid == `` ? false : true"
            placeholder="请输入宿舍名称"
            v-model="expenseEditParams.dormNumber" />
        </el-form-item>
        <el-form-item
          label="水量"
          prop="waterConsumption">
          <el-input
            v-model.number="expenseEditParams.waterConsumption"
            placeholder="请输入用水量" />
        </el-form-item>
        <el-form-item
          label="水费"
          prop="waterCharge">
          <el-input
            disabled
            @change="expenseEditParams.waterCharge = waterCharge"
            v-model.number="waterCharge"
            placeholder="请输入水费" />
        </el-form-item>
        <el-form-item
          label="电量"
          prop="electricityConsumption">
          <el-input
            v-model.number="expenseEditParams.electricityConsumption"
            placeholder="请输入用电量" />
        </el-form-item>
        <el-form-item
          label="电费"
          prop="electricityCharge">
          <el-input
            disabled
            @change="expenseEditParams.electricityCharge = electricityCharge"
            v-model.number="electricityCharge"
            placeholder="请输入电费" />
        </el-form-item>
        <el-form-item label="总费用">
          <el-input
            disabled
            @change="expenseEditParams.totalCost = totalCost"
            v-model="totalCost"
            placeholder="总费用" />
        </el-form-item>
        <el-form-item
          label="结算人员"
          prop="accountant">
          <el-input
            v-model="expenseEditParams.accountant"
            placeholder="请输入结算人员" />
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="phone">
          <el-input
            v-model="expenseEditParams.phone"
            placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item
          label="备注"
          style="width: 100%">
          <el-input
            v-model="expenseEditParams.remark"
            placeholder="请输入备注"
            type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="
              expenseEditParams.uuid ? updateExpenses() : createExpenses()
            "
            type="success"
            >{{ expenseEditParams.uuid ? "更新" : "创建" }}</el-button
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
@/rules/expenseRules
