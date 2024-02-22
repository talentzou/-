<script setup>
import { getStayInfoRequest } from "@/server/MG/stay/stay"
let staySearchParams = reactive({
  date: ""
})
let stayEditParams = reactive({
  stayDate: "",
  student: "",
  floorsName: "",
  dormNumber: "",
  stayCause: "",
  instructor: ""
})
let stayVisible = ref(false)
function selectDatePicker() {
  console.log(staySearchParams.date)
}
let isOperate = ref(true)
let stayTableData = ref([])
let selectStayTableData = ref([])
function selectStayCheckBox(selection) {
  isOperate.value = false
  if (selection.length === 0) {
    isOperate.value = true
  }
  selectStayTableData.value = selection
}
function stateTag(text) {
  switch (text) {
    case "同意":
      return "success"
    case "不同意":
      return "danger"
    case "审核中":
      return "info"
    default:
      return "warning"
  }
}
function editStayRowTable(row) {
  stayEditParams = Object.assign(stayEditParams, row)
  stayVisible.value = true
}
function clearSTayParamsData() {
  stayEditParams = Object.assign(stayEditParams, {
    stayDate: "",
    student: "",
    floorsName: "",
    dormNumber: "",
    stayCause: "",
    instructor: ""
  })
}
function getStayPageSize(pageSize) {
  getStayData()
}
function getStayPage(pages) {
  getStayData()
}
/* 接口 */
async function getStayData() {
  const { code, data } = await getStayInfoRequest()
  stayTableData.value = data
}
async function updateStayData() {}
async function deleteStayData() {}
async function increaseStayData() {}
onMounted(() => {
  getStayData()
})
</script>
<template>
  <el-form
    :model="staySearchParams"
    inline>
    <el-form-item style="width: 200px">
      <el-date-picker
        @change="selectDatePicker"
        v-model="staySearchParams.date"
        type="daterange"
        format="YYYY-MM-DD"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="x" />
    </el-form-item>
    <el-form-item style="width: 180px">
      <el-input placeholder="请输入留宿学生名"></el-input>
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
      <el-select placeholder="审核意见">
        <el-option
          value="agree"
          label="同意" />
        <el-option
          value="check"
          label="审核中" />
        <el-option
          value="reject"
          label="不同意" />
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
    v-model="stayVisible" />
  <!-- 表格数据 -->
  <el-table
    :data="stayTableData"
    @select="selectStayCheckBox"
    @select-all="selectStayCheckBox"
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
      prop="stayDate"
      label="留宿时间"
      width="200"
      align="center">
      <template #default="{ row, column, $index }">
        <el-text truncated>
          {{ row.stayDate[0] }}~{{ row.stayDate[1] }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column
      prop="student"
      label="留宿学生"
      width="120"
      align="center" />
    <el-table-column
      prop="stayCause"
      label="留宿原因"
      width="120"
      align="center">
      <template #default="{ row, column, $index }">
        <el-tooltip
          class="box-item"
          effect="light"
          :content="`${row.stayCause}`"
          placement="top">
          <el-text
            type="primary"
            class="w-150px mb-2"
            truncated>
            {{ row.stayCause }}
          </el-text>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column
      prop="floorsName"
      label="宿舍楼"
      width="120"
      align="center" />
    <el-table-column
      prop="dormNumber"
      label="宿舍"
      align="center"
      width="120" />
    <el-table-column
      prop="instructor"
      label="辅导员"
      align="center"
      width="120" />
    <el-table-column
      prop="auditProgress"
      label="审核进度"
      align="center"
      width="120">
      <template #default="{ row, column, $index }">
        <el-tag :type="stateTag(row.auditProgress)">{{
          row.auditProgress
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="操作"
      label="操作"
      align="center">
      <template #default="{ row, column, $index }">
        <TableButton
          :row="row"
          @merge="stayVisible = true"
          v-model="stayEditParams" />
      </template>
    </el-table-column>
  </el-table>
  <Pagination
    :total="stayTableData.length"
    @getCurrentPage="getStayPage"
    @getPageSizes="getStayPageSize" />
  <!-- 对话框 -->
  <FormDialog
    v-model="stayVisible"
    v-model:params="stayEditParams"
    title="留宿申请">
    <el-form
      :model="stayEditParams"
      label-width="auto">
      <el-form-item label="留宿时间">
        <el-date-picker
          @change="selectDatePicker"
          v-model="stayEditParams.stayDate"
          type="daterange"
          format="YYYY-MM-DD"
          start-placeholder="Start date"
          end-placeholder="End date"
          value-format="x" />
      </el-form-item>
      <el-form-item label="留宿学生">
        <el-input v-model="stayEditParams.student" />
      </el-form-item>
      <el-form-item label="宿舍楼层">
        <el-select
          placeholder="请选择宿舍楼"
          v-model="stayEditParams.floorsName">
          <el-option
            label="jj"
            value="kk" />
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍编号">
        <el-select
          placeholder="请选择宿舍"
          v-model="stayEditParams.dormNumber">
          <el-option
            label="jj"
            value="kk" />
        </el-select>
      </el-form-item>
      <el-form-item label="留宿原因">
        <el-input
          v-model="stayEditParams.stayCause"
          placeholder="请输入内容"
          type="textarea" />
      </el-form-item>
      <el-form-item label="辅导员">
        <el-input
          v-model="stayEditParams.instructor"
          placeholder="请输入辅导员" />
      </el-form-item> </el-form
  ></FormDialog>
</template>
@/server/MG/stay/stay
