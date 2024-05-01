<script setup>
import {
  getDormResponse,
  deleteDormResponse,
  updateDormResponse,
  createDormResponse
} from "@/api/Dorm/dorm"
import { getFloorsInfoRequest } from "@/api/Dorm/floors"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
import { dormNumber } from "@/rules/dormRules"
import { Notification } from "@/utils/notification"
import { authFields } from "@/utils/authFields"
const { operate_auth, table_auth } = authFields("dorm")
// console.log("operate_auth",operate_auth,"table_auth",table_auth);
const refTable = ref(null)
const expDialog = ref(false)

let dormSearchParams = reactive({
  floorId: "",
  dormNumber: "",
  Capacity: ""
})
let addDormParams = ref({
  floorId: "",
  dormNumber: "",
  img: "",
  Capacity: ""
})
const searchRef = ref(null)
const Form = ref(null)

const searchRules = {
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

/* 接口 */
//获取信息
//表格数据
let Pages = ref({
  PageSize: 10,
  Page: 1
})
const dormTableData = ref([])
const total = ref(0)
// 获取
async function getDorms() {
  console.log("发起请求+++++++++++++++++++++")
  const res = await getDormResponse(dormSearchParams, Pages.value)
  if (res.code == 200) {
    dormTableData.value = res.data.list
    // console.log("更新后的数据",data.list)
    total.value = res.data.total
  }
  console.log("kkkkkkk", res)
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
    let list = {
      floorId: addDormParams.value.floorId,
      dormNumber: addDormParams.value.dormNumber,
      img: addDormParams.value.img,
      Capacity: addDormParams.value.Capacity
    }
    const { code, msg } = await createDormResponse([list])
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
const floorList = ref([])
// 获取宿舍楼列表
const getFloorList = async () => {
  const { code, data } = await getFloorsInfoRequest({
    PageSize: 10,
    Page: 1
  })
  if (code == 200) {
    floorList.value = data.list
    console.log("999tttt", data)
  }
  console.log("dghgggdggd", code)
}

onMounted(() => {
  getFloorList()
  getDorms()
})
//页码数发生改变
const HandlePageChange = async (page) => {
  Pages.value = page
  console.log("页数和页码发生改变")
  const { code, data } = await getDormResponse(dormSearchParams, page)
  if (code == 200) {
    dormTableData.value = data.list
    console.log(data.list)
  }
}
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :model="dormSearchParams"
      :rules="searchRules"
      style="line-height: 50px"
      inline>
      <el-form-item prop="floorId">
        <el-select
          clearable
          prop="floorId"
          style="width: 160px"
          v-model="dormSearchParams.floorId"
          placeholder="请选择宿舍楼">
          <el-option
            v-for="item in floorList"
            :key="item.id"
            :label="item.floorsName"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 160px"
        prop="dormNumber">
        <el-input
          placeholder="请选择宿舍"
          v-model="dormSearchParams.dormNumber" />
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
      :authBtn="operate_auth"
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
        label="#" />
      <el-table-column
        prop="floorsName"
        label="宿舍楼名"
        sortable
        width="180"
        align="center" />
      <el-table-column
        label="宿舍号"
        width="180"
        align="center">
        <template #default="{ row }">
          <el-tag>{{ row.floorsName + "-" + row.dormNumber }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="img"
        label="宿舍照片"
        width="180"
        align="center">
        <template #default="{ row }">
          <img
            :src="row.img"
            alt=""
            class="dorm_img" />
        </template>
      </el-table-column>
      <el-table-column
        prop="Capacity"
        label="容纳数"
        width="180"
        align="center">
        <template #default="{ row }">{{
          row.count + "/" + row.Capacity
        }}</template>
      </el-table-column>

      <el-table-column
        prop="操作"
        label="操作"
        align="center">
        <template #default="{ row }">
          <TableButton
            :row="row"
            :authBtn="table_auth"
            @merge="dormVisible = true"
            @delete="deleteDorms"
            v-model="addDormParams" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      @getCurrentPage="HandlePageChange"
      @getPageSizes="HandlePageChange" />
    <!-- 对话框-->
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
          prop="floorId">
          <el-select
            clearable
            prop="floorId"
            style="width: 160px"
            v-model="addDormParams.floorId"
            placeholder="请选择宿舍楼">
            <el-option
              v-for="item in floorList"
              :key="item.id"
              :label="item.floorsName"
              :value="item.id" />
          </el-select>
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
          prop="Capacity">
          <el-select
            :disabled="addDormParams.id ? true : false"
            style="width: 196px"
            v-model="addDormParams.Capacity"
            placeholder="请选择宿舍容纳数">
            <el-option
              label="六人间"
              :value="6" />
            <el-option
              label="四人间"
              :value="4" />
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
    <!-- <ExportDialog
      v-model="expDialog"
      @select="exportTable" /> -->
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
