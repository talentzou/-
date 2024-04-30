<script setup>
import {
  getExpenseResponse,
  updateExpenseResponse,
  deleteExpenseResponse,
  createExpenseResponse
} from "@/api/Expense/expense"
import { GetFloorWithDormList } from "@/api/Dorm/floors"
import { useExportExcel } from "@/utils/exportExcel"
import { resetForm, submitForm } from "@/utils/rules"
import { useRules } from "@/rules/expenseRules"
import { floorDormRule } from "@/rules/dormRules"
import { Notification } from "@/utils/notification"
import { authFields } from "@/utils/authFields"
import { FormatTime } from "@/utils/time"
import { watchEffect } from "vue"
const refTable = ref(null)
const searchRef = ref(null)
const Form = ref(null)
let expenseSearchParams = reactive({
  floorDorm: ""
})
let expenseEditParams = ref({
  dormId: "",
  paymentTime: "",
  waterCharge: "",
  electricityCharge: "",
  totalCost: "",
  accountant: "",
  phone: ""
})
// 按钮字段
const { operate_auth, table_auth } = authFields("expense")
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
  waterCharge: "水费",
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

const totalCost = computed(() => {
  const electricityCharge =
    Number.parseFloat(expenseEditParams.value.electricityCharge) || 0
  const waterCharge =
    Number.parseFloat(expenseEditParams.value.waterCharge) || 0
  return electricityCharge + waterCharge
})

watchEffect(() => {
  expenseEditParams.value.totalCost = totalCost.value
})
/* 接口 */
let expenseTableData = ref([])
const total = ref(0)
let Pages = ref({
  PageSize: 10,
  Page: 1
})
async function getExpenses(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  // console.log("发起请求")
  const { code, data, msg } = await getExpenseResponse(
    expenseSearchParams,
    Pages.value
  )
  console.log(code, "99999")
  if (code == 200) {
    expenseTableData.value = data.list
    total.value = data.total
  } else {
    Notification(code, msg)
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
  delete expenseEditParams.value.id
  const valid = await submitForm(Form.value)
  if (valid) {
    let list = toRaw(expenseEditParams.value)
    console.log("添加参数数据", list)
    list = {
      dormId: list.dormId,
      paymentTime: list.paymentTime,
      waterCharge: list.waterCharge,
      electricityCharge: list.electricityCharge,
      totalCost: list.totalCost,
      accountant: list.accountant,
      phone: list.phone
    }
    const { code, msg } = await createExpenseResponse([list])
    expenseVisible.value = false
    const status = Notification(code, msg)
    status ? getExpenses() : ""
  }
}

//搜索栏
async function SearchExpenses() {
  if (expenseSearchParams.floorDorm.length == 0) {
    console.log("控制")
    ElMessage({
      message: "搜索输入不能为空",
      type: "error"
    })
    return
  }
  const valid = await submitForm(searchRef.value)
  console.log("AKANSNSN", valid)
  if (valid) {
    getExpenses()
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
  getExpenses()
})
//页码数发生改变
const HandlePageChange = async (page) => {
  Pages.value = page
  const { code, data } = await getExpenseResponse(expenseSearchParams, page)
  if (code == 200) {
    expenseTableData.value = data.list
  }
}
</script>

<template>
  <div>
    <el-form
      :model="expenseSearchParams"
      ref="searchRef"
      :rules="floorDormRule"
      inline>
      <el-form-item
        style="width: 180px"
        prop="floorDorm">
        <el-input
          clearable
          v-model="expenseSearchParams.floorDorm"
          placeholder="请输入宿舍" />
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
        prop="dormNumber"
        label="宿舍"
        width="180"
        align="center">
        <template #default="{ row }">
          <el-tag>{{ row.dorm.floorsName + "-" + row.dorm.dormNumber }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymentTime"
        label="缴费时间"
        width="200"
        align="center">
        <template #default="{ row }">
          {{ FormatTime(row.paymentTime) }}</template
        >
      </el-table-column>

      <el-table-column
        prop="waterCharge"
        label="水费"
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
        <template #default="{ row }">
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
      @getCurrentPage="HandlePageChange"
      @getPageSizes="HandlePageChange" />
    <FormDialog
      :width="45"
      @close="Form.resetFields()"
      v-model="expenseVisible"
      v-model:params="expenseEditParams"
      :title="expenseEditParams.id ? `修改费用信息` : `添加费用信息`">
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
            v-model="expenseEditParams.paymentTime"
            type="date"
            format="YYYY-MM-DD"
            placeholder="Start date" />
        </el-form-item>
        <el-form-item
          label="宿舍"
          prop="dormId">
          <el-select
            v-model="expenseEditParams.dormId"
            placeholder="请选择宿舍"
            style="width: 200px">
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
          label="水费"
          prop="waterCharge">
          <el-input
            @blur="
              expenseEditParams.waterCharge = Number.parseFloat(
                expenseEditParams.waterCharge
              )
            "
            v-model="expenseEditParams.waterCharge"
            placeholder="请输入水费" />
        </el-form-item>
        <el-form-item
          label="电费"
          prop="electricityCharge">
          <el-input
            @blur="
              expenseEditParams.electricityCharge = Number.parseFloat(
                expenseEditParams.electricityCharge
              )
            "
            v-model="expenseEditParams.electricityCharge"
            placeholder="请输入电费" />
        </el-form-item>
        <el-form-item label="总费用">
          <el-input
            disabled
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
        <el-form-item>
          <el-button
            @click="expenseEditParams.id ? updateExpenses() : createExpenses()"
            type="success"
            >{{ expenseEditParams.id ? "更新" : "创建" }}</el-button
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
