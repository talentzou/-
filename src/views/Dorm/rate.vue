<script setup>
import {
  getRateResponse,
  deleteRateResponse,
  updateRateResponse,
  createRateResponse
} from "@/api/Dorm/rate"
import { GetFloorWithDormList } from "@/api/Dorm/floors"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
import { Notification } from "@/utils/notification"
import { floorDormRule } from "@/rules/dormRules"
import { authFields } from "@/utils/authFields"
import { FormatTime } from "@/utils/time"
const { operate_auth, table_auth } = authFields("rate")

const searchRef = ref(null)
const Form = ref(null)
const refTable = ref(null)
const expDialog = ref(false)

let rateSearchParams = reactive({
  floorDorm: ""
})
let isOperate = ref(true)
let rateEditParams = ref({
  rateDate: "",
  dormId: "",
  bedRate: "",
  groundRate: "",
  lavatory: "",
  goods: "",
  totalScore: "",
  rater: "",
  evaluation: ""
})

const formRules = useRules(rateEditParams.value)
let rateVisible = ref(false)

const totalScore = computed(() => {
  return (
    Number.parseInt(rateEditParams.value.bedRate) +
      Number.parseInt(rateEditParams.value.groundRate) +
      Number.parseInt(rateEditParams.value.lavatory) +
      Number.parseInt(rateEditParams.value.goods) || 0
  )
})
watchEffect(() => {
  if (totalScore.value >= 60) {
    rateEditParams.value.evaluation = "合格"
  } else {
    rateEditParams.value.evaluation = "不合格"
  }
})

/* 接口 */
let rateTableData = ref([])
const total = ref(0)
let Pages = ref({
  PageSize: 10,
  Page: 1
})
async function getRates(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  // console.log("发起请求")
  const { code, data, msg } = await getRateResponse(
    rateSearchParams,
    Pages.value
  )

  if (code == 200) {
    rateTableData.value = data.list
    total.value = data.total
  } else {
    Notification(code, msg)
  }
}
// 更新
async function updateRates() {
  const valid = await submitForm(Form.value)
  if (valid) {
    rateEditParams.value.totalScore = totalScore.value
    const { code, msg } = await updateRateResponse(rateEditParams.value)
    rateVisible.value = false
    const status = Notification(code, msg)
    status ? getRates() : ""
  }
}
// 删除
async function deleteRates(list) {
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  console.log("LIST", list)
  const { code, msg } = await deleteRateResponse(list)
  const status = Notification(code, msg)
  status ? getRates() : ""
}
// 添加
async function createRates() {
  const valid = await submitForm(Form.value)
  if (valid) {
    let list = toRaw(rateEditParams.value)
    // console.log("HSBB", list)
    // rateEditParams.value.totalScore = totalScore.value
    list = {
      rateDate: list.rateDate,
      dormId: list.dormId,
      bedRate: list.bedRate,
      groundRate: list.groundRate,
      lavatory: list.lavatory,
      goods: list.goods,
      totalScore: totalScore.value,
      rater: list.rater,
      evaluation: list.evaluation
    }
    console.log("参数为", list);
    // console.log("数据为", typeof rateEditParams.value.totalScore)
    const { code, msg } = await createRateResponse([list])
    rateVisible.value = false
    const status = Notification(code, msg)
    status ? getRates() : ""
  }
}
//搜索栏
async function SearchRates() {
  if (rateSearchParams.floorDorm.length === 0) {
    console.log("控制")
    ElMessage({
      message: "搜索输入不能为空",
      type: "error"
    })
    return
  }
  const valid = await submitForm(searchRef.value)
  if (valid) {
    getRates()
  }
}
//获取宿舍楼和宿舍信息
const options = ref([])
const getFloorWithDorm = async () => {
  const { code, data } = await GetFloorWithDormList()
  // console.log("ppp", data)
  if (code == 200) {
    options.value = data.list
  }
}
onMounted(() => {
  getFloorWithDorm()
  getRates()
})
//页码数发生改变
const HandlePageChange = async (page) => {
  Pages.value = page
  const { code, data } = await getRateResponse(rateSearchParams, page)
  if (code == 200) {
    rateTableData.value = data.list
  }
}
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :rules="floorDormRule"
      :model="rateSearchParams"
      inline>
      <el-form-item
        style="width: 180px"
        prop="floorDorm">
        <el-input
          v-model="rateSearchParams.floorDorm"
          placeholder="请输入宿舍" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchRates"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <OperateButton
      :isOperate="isOperate"
      :authBtn="operate_auth"
      v-model="rateVisible"
      @delete="deleteRates"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      :data="rateTableData"
      :default-sort="{ prop: 'rateDate', order: 'descending' }"
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
        label="#" />
      <el-table-column
        prop="dorm.floorsName"
        label="宿舍楼"
        width="90"
        align="center" />

      <el-table-column
        prop="dormNumber"
        label="宿舍号"
        width="90"
        align="center">
        <template #default="{ row }">
          <el-tag>{{ row.dorm.floorsName + "-" + row.dorm.dormNumber }}</el-tag>
        </template>
      </el-table-column>
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
        prop="rateDate"
        label="评比时间"
        width="160"
        align="center"
        sortable>
        <template #default="{ row }">
          {{ FormatTime(row.rateDate) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="rater"
        label="评分人"
        align="center"
        width="90" />
      <el-table-column
        prop="evaluation"
        label="综合评价"
        align="center"
        width="90">
        <template #default="{ row }">
          <el-tag>{{ row.evaluation }}</el-tag>
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
            @merge="rateVisible = true"
            @delete="deleteRates"
            v-model="rateEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页 -->
    <Pagination
      :total="total"
      @getCurrentPage="HandlePageChange"
      @getPageSizes="HandlePageChange" />
    <!-- 对话框 -->
    <FormDialog
      :width="45"
      @close="Form.resetFields()"
      v-model="rateVisible"
      v-model:params="rateEditParams"
      :title="rateEditParams.id ? `修改评分` : `添加评分`">
      <el-form
        ref="Form"
        inline
        :rules="formRules"
        :model="rateEditParams"
        label-width="auto">
        <el-form-item
          label="宿舍"
          prop="dormId">
          <el-select
            v-model="rateEditParams.dormId"
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
          label="床铺评分"
          prop="bedRate">
          <el-input
            placeholder="满分25分"
            v-model.number="rateEditParams.bedRate"></el-input>
        </el-form-item>
        <el-form-item
          label="地面评分"
          prop="groundRate">
          <el-input
            v-model.number="rateEditParams.groundRate"
            placeholder="满分25分" />
        </el-form-item>
        <el-form-item
          label="厕所卫生"
          prop="lavatory">
          <el-input
            v-model.number="rateEditParams.lavatory"
            placeholder="满分25分" />
        </el-form-item>
        <el-form-item
          label="物品摆放"
          prop="goods">
          <el-input
            v-model.number="rateEditParams.goods"
            placeholder="满分25分" />
        </el-form-item>
        <el-form-item label="总分">
          <el-input
            disabled
            @change="rateEditParams.totalScore = totalScore"
            v-model.number="totalScore" />
        </el-form-item>
        <el-form-item
          label="评分人"
          prop="rater">
          <el-input
            placeholder="请输入评分人"
            v-model="rateEditParams.rater"></el-input>
        </el-form-item>
        <el-form-item
          label="综合评价"
          prop="evaluation">
          <el-select
            disabled
            v-model="rateEditParams.evaluation"
            style="width: 200px"
            placeholder="请选择评价">
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
            style="width: 195px"
            v-model="rateEditParams.rateDate"
            type="date"
            format="YYYY-MM-DD"
            placeholder="Start date" />
        </el-form-item>
        <el-form-item>
          <el-button
            @click="rateEditParams.id ? updateRates() : createRates()"
            type="success"
            >{{ rateEditParams.id ? "更新" : "添加" }}</el-button
          >
          <el-button
            @click="resetForm(Form)"
            type="primary"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </FormDialog>
    <!-- <ExportDialog
      v-model="expDialog"
      @select="exportTable" /> -->
  </div>
</template>
<style scoped></style>
selectDatePicker @/rules/dormRules
