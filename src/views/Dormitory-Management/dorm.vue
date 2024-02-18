<script setup>
import { getDormInfoRequest } from "@/server/MG/dorm/dorm"
import OperateButton from "@/components/OperateButton/operate.vue"
import Pagination from "@/components/Pagination/pagination.vue"
let dormSearchParams = reactive({
  floorsName: "",
  dormNumber: "",
  dormType: "",
  dormStatus: ""
})
let addDormParams = reactive({
  floorsName: "",
  dormNumber: "",
  img: "",
  dormType: "",
  dormStatus: ""
})
let dormVisible = ref(false)
let isOperate = ref(true)
//表格数据
const dormTableData = ref([])
//选中表格数据
let selectDormData = ref([])

function selectCheckBox(selection) {
  isOperate.value = false
  if (selection.length === 0) {
    isOperate.value = true
  }
  selectDormData.value = selection
}
function handleAvatarSuccess() {}
function beforeAvatarUpload() {}
function editRowTable(row) {
  addDormParams = Object.assign(addDormParams, row)
  dormVisible.value = true
}
function clearDormParamsData() {
  addDormParams = Object.assign(addDormParams, {
    floorsName: "",
    dormNumber: "",
    img: "",
    dormType: "",
    dormStatus: ""
  })
}
function stateTag(text) {
  switch (text) {
    case "空闲":
      return "success"
    case "满人":
      return "danger"
    case "有剩余床位":
      return "info"
    default:
      return "info"
  }
}
/* 接口 */
//获取信息
async function getDormData() {
  const { code, data } = await getDormInfoRequest()
  dormTableData.value = data
}
//添加
async function increaseDormData() {}
//更新
async function updateDormData() {}
//删除
async function deleteDormData() {}
onMounted(() => {
  getDormData()
})
</script>
<template>
  <el-form
    :model="dormSearchParams"
    style="height: 35px; padding: 5px 0"
    inline>
    <el-form-item prop="floorsName">
      <el-input
        v-model="dormSearchParams.floorsName"
        placeholder="请选择宿舍楼"
        clearable
        style="width: 160px" />
    </el-form-item>
    <el-form-item prop="dormNumber">
      <el-input
        v-model="dormSearchParams.dormNumber"
        placeholder="请选择宿舍编号"
        clearable
        style="width: 160px" />
    </el-form-item>
    <el-form-item prop="dormType">
      <el-select
        style="width: 160px"
        v-model="dormSearchParams.dormType"
        placeholder="请选择宿舍类型">
        <el-option
          label="六人间"
          value="六人间" />
        <el-option
          label="四人间"
          value="四人间" />
        <el-option
          label="二人间"
          value="二人间" />
      </el-select>
    </el-form-item>
    <el-form-item prop="dormStatus">
      <el-select
        style="width: 160px"
        v-model="dormSearchParams.dormStatus"
        placeholder="宿舍状态">
        <el-option
          label="空闲"
          value="leisure" />
        <el-option
          label="满人"
          value="full" />
        <el-option
          label="有剩余床位"
          value="surplus" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-row :gutter="20">
        <el-col :span="12"><el-button type="primary">搜索</el-button></el-col>
        <el-col :span="12"><el-button>重置</el-button></el-col>
      </el-row>
    </el-form-item>
  </el-form>
  <!-- 操作 -->
  <OperateButton
    :isOperate="isOperate"
    v-model="dormVisible" />
  <!-- 表格数据 -->
  <el-table
    :data="dormTableData"
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
      label="宿舍编号"
      width="180"
      align="center">
      <template #default="{ row, column, $index }">
        <router-link
          :to="{
            name: 'bed',
            params: { name: row.dormNumber, type: row.dormType }
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
      prop="dormType"
      label="类型"
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
  <!-- 分页 -->
  <Pagination
    :total="100"
    @getCurrentPage="55"
    @getPageSizes="55" />
  <!-- 对话框 -->
  <el-dialog
    width="40%"
    v-model="dormVisible"
    @close="clearDormParamsData"
    :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4
        :id="titleId"
        :class="titleClass">
        {{ addDormParams.img ? "编辑宿舍信息" : "  添加宿舍信息" }}
      </h4>
    </template>
    <el-form
      :model="addDormParams"
      inline
      label-width="auto">
      <el-form-item label="楼层">
        <el-input
          v-model="addDormParams.floorsName"
          placeholder="请选择宿舍楼" />
      </el-form-item>
      <el-form-item label="编号">
        <el-input
          v-model="addDormParams.dormNumber"
          placeholder="请选择宿舍号" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          style="width: 196px"
          v-model="addDormParams.dormType"
          placeholder="请选择宿舍类型">
          <el-option
            label="六人间"
            value="六人间" />
          <el-option
            label="四人间"
            value="四人间" />
          <el-option
            label="二人间"
            value="二人间" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          style="width: 196px"
          v-model="addDormParams.dormStatus"
          placeholder="请选择宿舍状态">
          <el-option
            label="空闲"
            value="leisure" />
          <el-option
            label="满人"
            value="full" />
          <el-option
            label="有剩余床位"
            value="surplus" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
                <span style="color: red">{{ "jpg/png/jpeg" }}</span
                >的文件
              </p>
            </div>
          </template>
          <!-- <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> -->
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="addDormParams.id ? updateDormData() : increaseDormData()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
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
