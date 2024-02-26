<script setup>
import { getExpenseInfoRequest } from "@/server/EXPENSE/expense"
import { exportExcel } from "@/utils/excel"
const refTable = ref(null)
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
      style="height: 35px; padding: 5px 0"
      inline>
      <el-form-item prop="floorsName">
        <el-select
          style="width: 160px"
          v-model="expenseSearchParams.floorsName"
          placeholder="请选择宿舍楼">
          <el-option
            label="六人间"
            value="六人间" />
        </el-select>
      </el-form-item>
      <el-form-item prop="dormNumber">
        <el-select
          style="width: 160px"
          v-model="expenseSearchParams.dormNumber"
          placeholder="请选择宿舍">
          <el-option
            label="六人间"
            value="六人间" />
        </el-select>
      </el-form-item>
      <el-form-item prop="settlementDate">
        <el-date-picker
          @change="selectDatePicker"
          v-model="expenseSearchParams.settlementDate"
          type="date"
          format="YYYY-MM-DD"
          placeholder="Start date"
          value-format="x" />
      </el-form-item>
      <el-form-item prop="accounter">
        <el-input
          v-model="expenseSearchParams.accounter"
          placeholder="请输入结算人"
          clearable
          style="width: 160px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
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
      v-model="expenseVisible"
      v-model:params="expenseEditParams"
      title="费用信息">
      <el-form
        :model="expenseEditParams"
        label-width="auto">
        <el-form-item label="宿舍编号">
          <el-select
            style="width: 160px"
            placeholder="请选择宿舍"
            v-model="expenseEditParams.dormNumber">
            <el-option
              label="jj"
              value="kk" />
          </el-select>
        </el-form-item>
        <el-form-item label="缴费时间时间">
          <el-date-picker
            @change="selectDatePicker"
            v-model="expenseEditParams.paymentTime"
            type="date"
            format="YYYY-MM-DD"
            placeholder="Start date"
            value-format="x" />
        </el-form-item>
        <el-form-item label="用水量">
          <el-input
            v-model="expenseEditParams.waterConsumption"
            placeholder="请输入数字" />
        </el-form-item>
        <el-form-item label="水费">
          <el-input
            v-model="expenseEditParams.waterCharge"
            placeholder="请输入数字" />
        </el-form-item>
        <el-form-item label="用电量">
          <el-input
            v-model="expenseEditParams.electricityConsumption"
            placeholder="请输入数字" />
        </el-form-item>
        <el-form-item label="电费">
          <el-input
            v-model="expenseEditParams.electricityCharge"
            placeholder="请输入数字" />
        </el-form-item>
        <el-form-item label="总费用">
          <el-input
            v-model="expenseEditParams.totalCost"
            placeholder="请输入数字" />
        </el-form-item>
        <el-form-item label="结算人员">
          <el-input
            v-model="expenseEditParams.accountant"
            placeholder="请输入结算人员" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input
            v-model="expenseEditParams.phone"
            placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="expenseEditParams.remark"
            placeholder="请输入备注"
            type="textarea" />
        </el-form-item>
      </el-form>
    </FormDialog>
    <ExportDialog
      v-model="expDialog"
      @select="exportTable" />
  </div>
</template>

<style lang="scss" scoped></style>
