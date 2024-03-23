<script setup>
import {
  getDormResponse,
  deleteDormResponse,
  updateDormResponse,
  createDormResponse
} from "@/api/DORM/dorm"
import { useExportExcel } from "@/utils/exportExcel"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
import { floorsName, dormNumber } from "@/rules/dormRules"
import { Notification } from "@/utils/notification"
const refTable = ref(null)
const expDialog = ref(false)

let dormSearchParams = reactive({
  floorsName: "",
  dormNumber: "",
  dormCapacity: "",
  dormStatus: ""
})
let addDormParams = ref({
  id: "",
  floorsName: "",
  dormNumber: "",
  img: "",
  dormCapacity: "",
  dormStatus: ""
})
const searchRef = ref(null)
const Form = ref(null)

const searchRules = {
  floorsName: [
    {
      validator: floorsName,
      trigger: "blur"
    }
  ],
  dormNumber: [
    {
      validator: dormNumber,
      trigger: "blur"
    }
  ]
}
const formParamsRules = useRules(addDormParams.value)
let dormVisible = ref(false)
let isOperate = ref(true)
//导出数据
const fields = {
  floorsName: "宿舍楼名",
  dormNumber: "宿舍",
  img: "宿舍照片",
  dormCapacity: "宿舍类型",
  dormStatus: "宿舍状态"
}
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  useExportExcel(data, fields, filename)
}

function handleAvatarSuccess(response, file, fileList) {
  console.log("Upload successful:", response)
  if (response.code == 200) {
    addDormParams.value.img = response.data.url
  }
  console.log("file", file)
}
//照片上传前钩子
function beforeAvatarUpload(file) {
  const imgType = ["image/png", "image/jpeg", "image/webp"]
  const size = file.size / 1024 / 1024
  return new Promise((resolve, reject) => {
    if (imgType.includes(file.type)) {
      if (size < 5) {
        resolve()
      } else {
        reject(
          ElMessage({
            type: "error",
            message: "上传文件务必小于3M"
          })
        )
      }
    } else {
      reject(
        ElMessage({
          type: "error",
          message: "上传文件务必PNG|JPG|WEBP"
        })
      )
    }
  })
}
//标签状态
function stateTag(text) {
  switch (text) {
    case "空闲":
      return "success"
    case "满人":
      return "danger"
    case "有剩余床位":
      return "info"
    default:
      return "info" // 默认情况下返回 "info"
  }
}

/* 接口 */
//获取信息
//表格数据
const dormTableData = ref([])
const total = ref(0)
let Pages = reactive({
  PageSize: 10,
  Page: 1
})
async function getDorms(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  // console.log("发起请求")
  const { code, data } = await getDormResponse(dormSearchParams, Pages)
  if (code == 200) {
    dormTableData.value = data.list
    total.value = data.total
  }
}
// 更新
async function updateDorms() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const { code, msg } = await updateDormResponse(addDormParams.value)
    dormVisible.value = false
    const status = Notification(code, msg)
    status ? getDorms() : ""
  }
}
// 删除
async function deleteDorms(list) {
  if (list === undefined) {
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    // list=toRaw(refTable.value.getSelectionRows())
  }
  console.log("LIST", list)
  const { code, msg } = await deleteDormResponse(list)
  const status = Notification(code, msg)
  status ? getDorms() : ""
}
// 添加
async function createDorms() {
  const valid = await submitForm(Form.value)
  if (valid) {
    console.log(addDormParams.value)
    const { code, msg } = await createDormResponse([addDormParams.value])
    dormVisible.value = false
    const status = Notification(code, msg)
    status ? getDorms() : ""
  }
}
//搜索栏
async function SearchDorms() {
  const query = dormSearchParams
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
    getDorms()
  }
}

onMounted(() => {
   getDorms()
})
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :model="dormSearchParams"
      :rules="searchRules"
      style="line-height: 50px"
      inline>
      <el-form-item
        style="width: 160px"
        prop="floorsName">
        <el-input
          placeholder="请输入宿舍楼名称"
          v-model="dormSearchParams.floorsName" />
      </el-form-item>
      <el-form-item
        style="width: 160px"
        prop="dormNumber">
        <el-input
          placeholder="请选择宿舍"
          v-model="dormSearchParams.dormNumber" />
      </el-form-item>
      <el-form-item>
        <el-select
          clearable
          prop="dormCapacity"
          style="width: 160px"
          v-model="dormSearchParams.dormCapacity"
          placeholder="请选择宿舍类型">
          <el-option
            label="六人间"
            :value="6" />
          <el-option
            label="四人间"
            :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          prop="dormStatus"
          clearable
          style="width: 160px"
          v-model="dormSearchParams.dormStatus"
          placeholder="宿舍状态">
          <el-option
            label="空闲"
            value="空闲" />
          <el-option
            label="满人"
            value="满人" />
          <el-option
            label="有剩余床位"
            value="有剩余床位" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="SearchDorms"
          >搜索</el-button
        >
        <el-button @click="resetForm(searchRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <OperateButton
      :isOperate="isOperate"
      @delete="deleteDorms"
      @excel="expDialog = true"
      v-model="dormVisible" />
    <!-- 表格数据 -->
    <el-table
      :data="dormTableData"
      :default-sort="{ prop: 'floorsName', order: 'descending' }"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
      ref="refTable"
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
        sortable
        width="180"
        align="center" />
      <el-table-column
        label="宿舍编号"
        width="180"
        align="center">
        <template #default="{ row, column, $index }">
          <router-link
            :to="{
              name: 'bed',
              params: { name: row.dormNumber, type: row.dormCapacity }
            }"
            style="color: #409eff"
            >{{ row.dormNumber }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="img"
        label="宿舍照片"
        width="180"
        align="center">
        <template #default="{ row, column, $index }">
          <img
            :src="row.img"
            alt=""
            class="dorm_img" />
        </template>
      </el-table-column>
      <el-table-column
        prop="dormCapacity"
        label="类型(几人间)"
        width="180"
        align="center" />
      <el-table-column
        label="宿舍状态"
        width="180"
        align="center">
        <template #default="{ row, column, $index }">
          <el-tag :type="stateTag(row.dormStatus)">{{ row.dormStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row, column, $index }">
          <TableButton
            :row="row"
            @merge="dormVisible = true"
            @delete="deleteDorms"
            v-model="addDormParams" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      @getCurrentPage="getDorms"
      @getPageSizes="getDorms" />
    <!-- 对话框 -->
    <FormDialog
      :width="45"
      v-model="dormVisible"
      @close="Form.resetFields()"
      v-model:params="addDormParams"
      :title="addDormParams.id ? `修改宿舍信息` : `添加宿舍信息`">
      <el-form
        ref="Form"
        :rules="formParamsRules"
        :model="addDormParams"
        inline
        label-width="auto">
        <el-form-item
          label="图片"
          prop="img">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/base/upload/imageUpload"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img
              v-if="addDormParams.img"
              :src="addDormParams.img"
              class="avatar" />
            <div
              class="avatar-uploader-icon"
              v-else>
              <svg-icon
                name="plus"
                color="#b6b8be"></svg-icon>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                <p>
                  请上传大小不超过<span style="color: red">5MB</span>格式为
                  <span style="color: red">{{ "jpg/png/webp" }}</span
                  >的文件
                </p>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="宿舍楼"
          prop="floorsName">
          <el-input
            v-model="addDormParams.floorsName"
            placeholder="请输入宿舍楼名称" />
        </el-form-item>
        <el-form-item
          label="编号"
          prop="dormNumber">
          <el-input
            v-model="addDormParams.dormNumber"
            placeholder="请输入宿舍名称" />
        </el-form-item>
        <el-form-item
          label="类型"
          prop="dormCapacity">
          <el-select
            :disabled="addDormParams.id === `` ? false : true"
            style="width: 196px"
            v-model="addDormParams.dormCapacity"
            placeholder="请选择宿舍类型">
            <el-option
              label="六人间"
              :value="6" />
            <el-option
              label="四人间"
              :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="状态"
          prop="dormStatus">
          <el-select
            style="width: 196px"
            v-model="addDormParams.dormStatus"
            placeholder="请选择宿舍状态">
            <el-option
              label="空闲"
              value="空闲" />
            <el-option
              label="满人"
              value="满人" />
            <el-option
              label="有剩余床位"
              value="有剩余床位" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            @click="addDormParams.id ? updateDorms() : createDorms()"
            type="success"
            >{{ addDormParams.id ? "更新" : "添加" }}
          </el-button>
          <el-button
            @click="resetForm(Form)"
            type="primary"
            >重置</el-button
          >
        </el-form-item>
      </el-form></FormDialog
    >
    <ExportDialog
      v-model="expDialog"
      @select="exportTable" />
  </div>
</template>
<style>
.dorm_img {
  height: 35px;
  width: 35px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style>
@/rules/dormRules
