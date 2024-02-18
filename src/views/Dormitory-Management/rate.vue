<script setup>
import OperateButton from "@/components/OperateButton/operate.vue"
import { getRateInfoRequest } from "@/server/MG/rate/rate"
let rateSearchParams = reactive({
  rateDate: "",
  floorsName: "",
  dormNumber: "",
  Rater: "",
  evaluation: ""
})
let isOperate = ref(true)
let rateEditParams = reactive({
  id:"",
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
let rateVisible = ref(false)
let rateTableData = ref([])
function stateTag(state) {
  if (state > 90) {
    return "success"
  } else if (state > 80) {
    return "primary"
  } else if (state > 70) {
    return "info"
  } else if (state > 60) {
    return "warning"
  } else {
    return "danger"
  }
}
function editRateRowTable(row) {
  console.log(Date.parse(row.rateDate))
  rateEditParams = Object.assign(rateEditParams, row)
  rateEditParams.rateDate = Date.parse(row.rateDate)
  rateVisible.value = true
}
function clearRateParamsData() {
  rateEditParams = Object.assign(rateEditParams, {
    id:"",
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
}
let selectRateTableData=ref([])
function selectRateCheckBox(selection) {
  isOperate.value = false
  if (selection.length === 0) {
    isOperate.value = true
  }
  selectRateTableData.value = selection
}
/* 接口 */
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
  <el-form
    :model="rateSearchParams"
    inline>
    <el-form-item style="width: 200px">
      <el-date-picker
        v-model="rateSearchParams.rateDate"
        type="date"
        format="YYYY-MM-DD"
        placeholder="Start date"
        value-format="x" />
    </el-form-item>
    <el-form-item style="width: 180px">
      <el-select placeholder="请选择宿舍楼">
        <el-option
          value="11"
          label="A1" />
      </el-select>
    </el-form-item>
    <el-form-item style="width: 180px">
      <el-select placeholder="请选择宿舍">
        <el-option
          value="11"
          label="A1-108" />
      </el-select>
    </el-form-item>
    <el-form-item style="width: 180px">
      <el-input placeholder="请输入评分人"></el-input>
    </el-form-item>
    <el-form-item style="width: 180px">
      <el-select placeholder="请选择综合评价">
        <el-option
          value="11"
          label="A1-108" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 操作 -->
  <OperateButton
    :isOperate="isOperate"
    v-model="rateVisible" />
  <!-- 表格数据 -->
  <el-table
    :data="rateTableData"
    @select="selectRateCheckBox"
    @select-all="selectRateCheckBox"
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
        <el-button
          type="primary"
          @click="editRateRowTable(row, column, $index)">
          <template #icon>
            <svg-icon
              name="edit"
              color="white"></svg-icon> </template
          >编辑
        </el-button>
        <el-popconfirm
          width="220"
          confirm-button-text="OK"
          cancel-button-text="No, Thanks"
          icon-color="#626AEF"
          title="你确定要删除吗?"
          @confirm="deleteTableList(row)">
          <template #reference>
            <el-button type="danger">
              <template #icon>
                <svg-icon
                  name="delete"
                  color="white"></svg-icon> </template
              >删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!--分页 -->
  <Pagination
    :total="rateTableData.length"
    @getCurrentPage="getRateData"
    @getPageSizes="getRateData" />
  <!-- 对话框 -->
  <el-dialog
    width="38%"
    v-model="rateVisible"
    @close="clearRateParamsData"
    :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4
        :id="titleId"
        :class="titleClass">
        {{ rateEditParams.id?"修改宿舍评分":"添加宿舍评分" }}
      </h4>
    </template>
    <el-form
      inline
      :model="rateEditParams"
      label-width="auto">
      <el-form-item label="宿舍楼">
        <el-select
          style="width: 150px"
          v-model="rateEditParams.floorsName"
          placeholder="请选择宿舍楼">
          <el-option
            label="A1"
            value="男生宿舍" />
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍">
        <el-select
          style="width: 150px"
          v-model="rateEditParams.dormNumber"
          placeholder="请选择宿舍楼">
          <el-option
            label="108"
            value="男生宿舍" />
        </el-select>
      </el-form-item>
      <el-form-item label="床铺评分">
        <el-input
          placeholder="满分25分"
          v-model="rateEditParams.bedRate"
          style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="地面评分">
        <el-input
          v-model="rateEditParams.groundRate"
          style="width: 150px"
          placeholder="满分25分" />
      </el-form-item>
      <el-form-item label="厕所卫生">
        <el-input
          v-model="rateEditParams.lavatory"
          style="width: 150px"
          placeholder="满分25分" />
      </el-form-item>
      <el-form-item label="物品摆放">
        <el-input
          v-model="rateEditParams.goods"
          placeholder="满分25分"
          style="width: 150px" />
      </el-form-item>
      <el-form-item label="评分人">
        <el-input
          placeholder="请输入评分人"
          v-model="rateEditParams.Rater"
          style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="综合评价">
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
      <el-form-item label="评比时间">
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
        style="width: 100%">
        <el-input
          v-model="rateEditParams.remark"
          placeholder="备注信息"
          :rows="3"
          type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="rateEditParams.id ? updateRateData() : increaseRateData()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
