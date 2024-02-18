<script setup>
import {
  getFloorsInfoRequest,
  deleteFloorsInfoRequest,
  updateFloorsInfoRequest,
  addFloorsInfoRequest
} from "@/server/MG/floors/floors"
import Pagination from "@/components/Pagination/pagination.vue"
import { nextTick, reactive } from "vue"
//初始页数数量
let pageAndSizeParams = reactive({
  pageSizes: 10,
  currentPages: 1
})
//搜索表单
const floorsSearchForm = reactive({
  floorName: "",
  type: ""
})
//操作按钮是否禁用
const operateIsTrue = ref(true)
//表格数据
const tableData = ref([])
//
const selectShow = computed(() => {
  return floorsSearchForm.floorName ? false : true
})
//重置
function reset() {
  pageAndSizeParams = Object.assign(pageAndSizeParams, {
    pageSizes: 10,
    currentPages: 1
  })
  getFloorsInfo(pageAndSizeParams)
}
//搜索
function searchFloors() {
  let temp = {}
  pageAndSizeParams = Object.assign(pageAndSizeParams, {
    pageSizes: 10,
    currentPages: 1
  })
  temp = Object.assign(pageAndSizeParams, floorsSearchForm)
  console.log(temp)
  // getFloorsInfo(temp)
}
//对话框
const visible = ref(false)
//宿舍楼参数
let floorsParams = reactive({
  floorsName: "",
  floors: "",
  floorsType: "",
  amount: "",
  id: ""
})
//编辑对话
function editRowTable(row, column, index) {
  floorsParams = Object.assign(floorsParams, row)
  visible.value = true
  // console.log("edit", floorsParams)
}
//选中项
function selectCheckBox(selection) {
  operateIsTrue.value = false
  if (selection.length === 0) {
    operateIsTrue.value = true
  }
  // console.log("selection", selection)
  deleteData.value = selection
}
// 添加按钮
function addFloorBtn() {
  floorsParams = Object.assign(floorsParams, {
    floorsName: "",
    floors: "",
    floorsType: "",
    amount: "",
    id: ""
  })
  visible.value = true
}

/* 接口api */
//获取楼层信息
async function getFloorsInfo(pageOrSize) {
  // console.log("pageOrSize", pageOrSize)
  if (pageOrSize !== undefined) {
    pageAndSizeParams = pageOrSize
  }
  const { code, data } = await getFloorsInfoRequest(pageAndSizeParams)
  tableData.value = data
  // console.log(tableData.value.length)
}
//添加楼层
async function increaseData() {
  console.log("我是增加")
  visible.value = false
}
//删除
let deleteData = ref([])
async function deleteTableList(selectData) {
  console.log(selectData)
}
//更新
async function updateTableList() {
  console.log("我是更新")
  visible.value = false
}
onMounted(() => {
  getFloorsInfo()
})
</script>
<template>
  <!-- 搜索 -->
  <el-form
    :model="floorsSearchForm"
    style="height: 35px; padding: 5px 0"
    inline>
    <el-form-item prop="floorName">
      <el-input
        v-model="floorsSearchForm.floorName"
        placeholder="请输入宿舍楼名"
        clearable
        style="width: 240px" />
    </el-form-item>
    <el-form-item prop="type">
      <el-select
        style="width: 240px"
        :disabled="selectShow"
        v-model="floorsSearchForm.type"
        placeholder="请选择宿舍类型">
        <el-option
          label="男生宿舍"
          value="男生宿舍" />
        <el-option
          label="女生宿舍"
          value="女生宿舍" />
      </el-select>
    </el-form-item>
    <el-form-item prop="type">
      <el-row :gutter="20">
        <el-col :span="12"
          ><el-button
            type="primary"
            @click="searchFloors"
            >搜索</el-button
          ></el-col
        >
        <el-col :span="12"><el-button @click="reset">重置</el-button></el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <!-- 操作 -->
  <el-row
    style="margin: 5px 0"
    :gutter="10">
    <el-col :span="1.5"
      ><el-button
        size="small"
        type="success"
        @click="addFloorBtn">
        <template #icon>
          <svg-icon
            name="plus"
            color="white"></svg-icon> </template
        >添加
      </el-button></el-col
    >
    <el-col :span="1.5">
      <el-button
        type="danger"
        @click="deleteTableList(deleteData)"
        :disabled="operateIsTrue"
        size="small">
        <template #icon>
          <svg-icon
            name="delete"
            color="white"></svg-icon> </template
        >删除
      </el-button>
    </el-col>
    <el-col :span="1.5">
      <el-button
        type="warning"
        :disabled="operateIsTrue"
        size="small">
        <template #icon>
          <svg-icon
            name="export"
            color="white"></svg-icon> </template
        >导出
      </el-button>
    </el-col>
  </el-row>
  <!-- 表格数据 -->
  <el-table
    :data="tableData"
    @select="selectCheckBox"
    @select-all="selectCheckBox"
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
      prop="floorsName"
      label="宿舍楼名"
      width="180"
      align="center" />
    <el-table-column
      prop="floors"
      label="楼层数"
      width="180"
      align="center" />
    <el-table-column
      prop="floorsType"
      label="类型"
      width="180"
      align="center">
      <template #default="{ row, column, $index }">
        <el-tag :type="row.floorsType === `男生宿舍` ? `primary` : `danger`">{{
          row.floorsType
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="amount"
      label="宿舍总数"
      width="150"
      align="center" />
    <el-table-column
      prop="操作"
      label="操作"
      align="center">
      <template #default="{ row, column, $index }">
        <el-button
          type="primary"
          @click="editRowTable(row, column, $index)">
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
  <!-- 对话框 -->
  <el-dialog
    width="30%"
    v-model="visible"
    :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4
        :id="titleId"
        :class="titleClass">
        {{ floorsParams.id ? "编辑宿舍楼" : "添加宿舍楼" }}
      </h4>
    </template>
    <el-form
      :model="floorsParams"
      label-width="auto">
      <el-form-item label="宿舍楼名称">
        <el-input v-model="floorsParams.floorsName" />
      </el-form-item>
      <el-form-item label="楼层数">
        <el-input v-model="floorsParams.floors" />
      </el-form-item>
      <el-form-item label="宿舍楼类型">
        <el-select
          style="width: 120px"
          v-model="floorsParams.floorsType"
          placeholder="请选择宿舍类型">
          <el-option
            label="男生宿舍"
            value="男生宿舍" />
          <el-option
            label="女生宿舍"
            value="女生宿舍" />
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍总数量">
        <el-input v-model="floorsParams.amount" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="floorsParams.id ? updateTableList() : increaseData()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <Pagination
    :total="tableData.length"
    @getCurrentPage="getFloorsInfo"
    @getPageSizes="getFloorsInfo" />
</template>
@/server/MG/stay/floors/floors
