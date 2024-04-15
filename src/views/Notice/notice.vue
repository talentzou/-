<script setup>
import {
  getNoticeResponse,
  deleteNoticeResponse,
  updateNoticeResponse,
  createNoticeResponse
} from "@/api/Notice/notice"
import { resetForm, submitForm } from "@/utils/rules"
import { noticeRules } from "@/rules/noticeRules"
import { Notification } from "@/utils/notification"
import { onMounted } from "vue"
import { authFields} from "@/utils/authFields"
const {table_auth}=authFields("repair")
const Form = ref(null)
const refTable = ref(null)
const searchNotice = ref("")

const dialogVisible = ref(false)
const noticeEditParams = ref({
  id: "",
  title: "",
  author: "",
  timestamp: ""
})
function clearNoticeEditParams() {
  Form.value.resetFields()
  let tempObj = {}
  for (let key of Object.keys(noticeEditParams.value)) {
    tempObj[key] = ""
  }
  noticeEditParams.value = { ...noticeEditParams.value, ...tempObj }
}
// console.log("date",new Date());
/* 接口 */
const noticeTableData = ref([])
const total = ref(0)
let Pages = reactive({
  PageSize: 10,
  Page: 1
})
async function getNotices(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  console.log("发起请求")
  const { code, data } = await getNoticeResponse(searchNotice.value, Pages)
  if (code == 200) {
    noticeTableData.value = data.list
    total.value = data.total
  }
}
// 更新
async function updateNotices() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateNoticeResponse(noticeEditParams.value)
    dialogVisible.value = false
    const status = Notification(code, msg)
    status ? getNotices() : ""
  }
}
// 删除
async function deleteNotices(list) {
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  console.log("LIST", list)
  const { code, msg } = await deleteNoticeResponse(list)
  const status = Notification(code, msg)
  status ? getNotices() : ""
}
// 添加
async function createNotices() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const list = toRaw(noticeEditParams.value)
    console.log("list", list)
    const { code, msg } = await createNoticeResponse([list])
    dialogVisible.value = false
    const status = Notification(code, msg)
    status ? getNotices() : ""
  }
}
//搜索栏
async function SearchNotice() {
  if (searchNotice.value.length === 0) {
    ElMessage({
      message: "搜索输入不能为空",
      type: "error"
    })
    return
  }
  getNotices()
}
onMounted(() => {
  getNotices()
})
</script>
<template>
  <div>
    <div style="display: flex; margin-bottom: 20px">
      <el-input
        clearable
        style="width: 250px; margin-right: 20px"
        v-model="searchNotice"
        placeholder="请输入标题" />
      <el-button
        type="primary"
        @click="SearchNotice"
        >搜索</el-button
      >
      <el-button @click="resetForm(searchRef)">重置</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = true"
        style="position: absolute; right: 20px"
        ><el-icon><ep-Plus /></el-icon
      ></el-button>
    </div>
    <el-card>
      <el-table
        ref="refTable"
        :max-height="525"
        :data="noticeTableData"
        border>
        <el-table-column
          type="selection"
          fixed
          width="50" />
        <el-table-column
          width="55"
          type="index"
          label="#" />
        <el-table-column
          width="600"
          label="标题"
          prop="title" />
        <el-table-column
          width="100"
          label="作者"
          prop="author" />
        <el-table-column
          width="250"
          label="发布时间"
          prop="timestamp" />
        <el-table-column
          label="操作"
          prop="title">
          <template #default="{ row }">
            <TableButton
              :row="row"
              :authBtn="table_auth"
              @delete="deleteNotices"
              @merge="dialogVisible = true"
              v-model="noticeEditParams" />
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="total"
        @getCurrentPage="getNotices"
        @getPageSizes="getNotices" />
    </el-card>
    <el-dialog
      @close="clearNoticeEditParams"
      v-model="dialogVisible"
      :title="noticeEditParams.id ? `更新` : `添加`"
      width="500"
      align-center>
      <el-form
        ref="Form"
        :model="noticeEditParams"
        :rules="noticeRules"
        label-width="auto">
        <el-form-item
          label="标题"
          prop="title">
          <el-input
            v-model="noticeEditParams.title"
            autosize
            type="textarea" />
        </el-form-item>
        <el-form-item
          label="作者"
          prop="author">
          <el-input v-model="noticeEditParams.author" />
        </el-form-item>
        <el-form-item
          label="发布时间"
          prop="timestamp">
          <el-date-picker
            style="width: 100%"
            v-model="noticeEditParams.timestamp"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Start date" />
        </el-form-item>
        <el-form-item style="display: block">
          <el-button
            @click="noticeEditParams.id ? updateNotices() : createNotices()"
            type="success"
            >{{ noticeEditParams.id ? "更新" : "添加" }}</el-button
          >
          <el-button
            @click="resetForm(Form)"
            type="primary"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
