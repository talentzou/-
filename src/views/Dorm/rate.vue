<script setup>
import { getRateInfoRequest } from "@/server/MG/rate/rate"
import { exportExcel } from "@/utils/excel"
import { resetForm, submitForm, useRules } from "@/utils/dormRules"
const searchRef = ref(null)
const Form = ref(null)
const refTable = ref(null)
const expDialog = ref(false)

let rateSearchParams = reactive({
  rateDate: "",
  floorsName: "",
  dormNumber: "",
  Rater: "",
  evaluation: ""
})
let isOperate = ref(true)
let rateEditParams = reactive({
  id: "",
  rateDate: "",
  floorsName: "",
  dormNumber: "",
  bedRate: "",
  groundRate: "",
  lavatory: "",
  goods: "",
  totalScore: "",
  Rater: "",
  evaluation: "",
  remark: ""
})
const searchRules = useRules(rateSearchParams)
const formRules = useRules(rateEditParams)
let rateVisible = ref(false)

function stateTag(state) {
  if (state >= 90) {
    return "success"
  } else if (state >= 80) {
    return "primary"
  } else if (state >= 70) {
    return "info"
  } else if (state >= 60) {
    return "warning"
  } else {
    return "danger"
  }
}
const totalScore = computed(() => {
  return (
    Number.parseInt(rateEditParams.bedRate) +
    Number.parseInt(rateEditParams.groundRate) +
    Number.parseInt(rateEditParams.lavatory) +
    Number.parseInt(rateEditParams.goods)
  )
})
let selectRateTableData = ref([])
//导出表格
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  exportExcel(data, filename)
}
/* 接口 */
let rateTableData = ref([])
async function getRateData() {
  const { data, code } = await getRateInfoRequest()
  rateTableData.value = data
}
async function updateRateData() {}
async function deleteRateData() {}
async function increaseRateData() {}
onMounted(() => {
  getRateData()
})
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :rules="searchRules"
      :model="rateSearchParams"
      inline>
      <el-form-item
        style="width: 200px"
        prop="rateDate">
        <el-date-picker
          v-model="rateSearchParams.rateDate"
          type="date"
          format="YYYY-MM-DD"
          placeholder="Start date"
          value-format="x" />
      </el-form-item>
      <el-form-item
        style="width: 180px"
        prop="floorsName">
        <el-select
          placeholder="请选择宿舍楼"
          v-model="rateSearchParams.floorsName">
          <el-option
            value="11"
            label="A1" />
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 180px"
        prop="dormNumber">
        <el-select
          placeholder="请选择宿舍"
          v-model="rateSearchParams.dormNumber">
          <el-option
            value="11"
            label="A1-108" />
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 180px"
        prop="Rater">
        <el-input
          placeholder="请输入评分人"
          v-model="rateSearchParams.Rater" />
      </el-form-item>
      <el-form-item
        style="width: 180px"
        prop="evaluation">
        <el-select
          placeholder="请选择综合评价"
          v-model="rateSearchParams.evaluation">
          <el-option
            value="11"
            label="A1-108" />
        </el-select>
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
    <!-- 操作 -->
    <OperateButton
      :isOperate="isOperate"
      v-model="rateVisible"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      :data="rateTableData"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
      border
      ref="refTable"
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
        prop="rateDate"
        label="评比时间"
        width="200"
        align="center" />
      <el-table-column
        prop="dormNumber"
        label="宿舍"
        width="90"
        align="center" />
      <el-table-column
        prop="bedRate"
        label="床铺评分"
        width="90"
        align="center" />
      <el-table-column
        prop="groundRate"
        label="地面评分"
        width="90"
        align="center" />
      <el-table-column
        prop="lavatory"
        label="厕所卫生"
        align="center"
        width="90" />
      <el-table-column
        prop="goods"
        label="物品摆放"
        align="center"
        width="90" />
      <el-table-column
        prop="totalScore"
        label="总分"
        align="center"
        width="90" />
      <el-table-column
        prop="Rater"
        label="评分人"
        align="center"
        width="90" />
      <el-table-column
        prop="evaluation"
        label="综合评价"
        align="center"
        width="90">
        <template #default="{ row, column, $index }">
          <el-tag :type="stateTag(row.totalScore)">{{ row.evaluation }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            @merge="rateVisible = true"
            v-model="rateEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页 -->
    <Pagination
      :total="rateTableData.length"
      @getCurrentPage="getRateData"
      @getPageSizes="getRateData" />
    <!-- 对话框 -->
    <FormDialog
      @close="Form.resetFields()"
      v-model="rateVisible"
      v-model:params="rateEditParams"
      title="评分">
      <el-form
        ref="Form"
        inline
        :rules="formRules"
        :model="rateEditParams"
        label-width="auto">
        <el-form-item
          label="宿舍楼"
          prop="floorsName">
          <el-select
            style="width: 150px"
            v-model="rateEditParams.floorsName"
            placeholder="请选择宿舍楼">
            <el-option
              label="A1"
              value="男生宿舍" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="宿舍"
          prop="dormNumber">
          <el-select
            style="width: 150px"
            v-model="rateEditParams.dormNumber"
            placeholder="请选择宿舍楼">
            <el-option
              label="108"
              value="男生宿舍" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="床铺评分"
          prop="bedRate">
          <el-input
            placeholder="满分25分"
            v-model.number="rateEditParams.bedRate"
            style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item
          label="地面评分"
          prop="groundRate">
          <el-input
            v-model.number="rateEditParams.groundRate"
            style="width: 150px"
            placeholder="满分25分" />
        </el-form-item>
        <el-form-item
          label="厕所卫生"
          prop="lavatory">
          <el-input
            v-model.number="rateEditParams.lavatory"
            style="width: 150px"
            placeholder="满分25分" />
        </el-form-item>
        <el-form-item
          label="物品摆放"
          prop="goods">
          <el-input
            v-model.number="rateEditParams.goods"
            placeholder="满分25分"
            style="width: 150px" />
        </el-form-item>
        <el-form-item label="总分">
          <span v-if="rateEditParams.totalScore">{{
            rateEditParams.totalScore
          }}</span>
          <span
            v-else
            class="totalSpan">
            {{ totalScore }}</span
          >
        </el-form-item>
        <el-form-item
          label="评分人"
          prop="Rater">
          <el-input
            placeholder="请输入评分人"
            v-model="rateEditParams.Rater"
            style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item
          label="综合评价"
          prop="evaluation">
          <el-select
            v-model="rateEditParams.evaluation"
            style="width: 150px"
            placeholder="请选择评价">
            <el-option
              label="优秀"
              value="优秀" />
            <el-option
              label="中"
              value="中" />
            <el-option
              label="良"
              value="良" />
            <el-option
              label="合格"
              value="合格" />
            <el-option
              label="不合格"
              value="不合格" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="评比时间"
          prop="rateDate">
          <el-date-picker
            style="width: 150px"
            @change="selectDatePicker"
            v-model="rateEditParams.rateDate"
            type="date"
            format="YYYY-MM-DD"
            placeholder="Start date"
            value-format="x" />
        </el-form-item>
        <el-form-item
          label="备注"
          style="width: 100%"
          prop="remark">
          <el-input
            v-model="rateEditParams.remark"
            placeholder="备注信息"
            :rows="3"
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
<style scoped>
.totalSpan {
  width: 150px;
  padding: 2px;
  border: 1px #dcdfe6 solid;
  color: #8d8e91;
}
</style>
