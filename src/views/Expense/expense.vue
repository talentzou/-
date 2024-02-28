<script setup>
import { getExpenseInfoRequest } from "@/server/EXPENSE/expense"
import { exportExcel } from "@/utils/excel"
import { resetForm, submitForm } from "@/utils/rules"
import { useRules } from "@/rules/expenseRules"
import { computed } from "vue"
const refTable = ref(null)
const searchRef = ref(null)
const Form = ref(null)
let expenseSearchParams = reactive({
  floorsName: "",
  dormNumber: "",
  settlementDate: "",
  accounter: ""
})
let expenseEditParams = reactive({
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
const searchRules = useRules(expenseSearchParams)
const formRules = useRules(expenseEditParams)
let isOperate = ref(true)
//导出对话框
const expDialog = ref(false)

let expenseVisible = ref(false)
//导出表格
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  exportExcel(data, filename)
}
function selectDatePicker(params) {}

const waterCharge = computed(() => {
  return Number.parseFloat(expenseEditParams.waterConsumption) * 1.5 || 0
})
const electricityCharge = computed(() => {
  return (
    Number.parseFloat(expenseEditParams.electricityConsumption, "kkkk") * 0.6 ||
    0
  )
})
const totalCost = computed(() => {
  console.log(expenseEditParams)
  return waterCharge.value + electricityCharge.value || 0
})
watchEffect(() => {
  expenseEditParams.waterCharge = waterCharge.value
  expenseEditParams.electricityCharge = electricityCharge.value
  expenseEditParams.totalCost = totalCost.value
})
/* 接口 */
let expenseTableData = ref([])

async function getExpenseFData() {
  const { code, data } = await getExpenseInfoRequest(222)
  expenseTableData.value = data
}
onMounted(() => {
  getExpenseFData()
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
          @click="submitForm(searchRef)"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <OperateButton
      v-model="expenseVisible"
      :isOperate="isOperate"
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
        label="序号" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="100"
        align="center" />
      <el-table-column
        prop="paymentTime"
        label="缴费时间"
        width="130"
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
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            @merge="expenseVisible = true"
            v-model="expenseEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="0"
      @getCurrentPage="getExpenseFData"
      @getPageSizes="getExpenseFData" />
    <FormDialog
      :width="45"
      @close="Form.resetFields()"
      v-model="expenseVisible"
      v-model:params="expenseEditParams"
      :title="expenseEditParams.id?`修改费用信息`:`添加费用信息`">
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
            placeholder="Start date"
            value-format="x" />
        </el-form-item>
        <el-form-item
          label="宿舍编号"
          prop="dormNumber">
          <el-input
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
@/rules/expenseRules
