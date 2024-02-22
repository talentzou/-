<script setup>
import { getBedInfoRequest } from "@/server/MG/bed/bed"
let $route = useRoute()
// console.log($route)
let bedSearchParams = reactive({
  bedStatus: "",
  dormType: "",
  dormNumber: "",
  bedNumber: "",
  bedPerson: ""
})
let editParams = reactive({
  bedStatus: "有人",
  dormNumber: "",
  bedNumber: "",
  message: "",
  bedPerson: ""
})
let isOperate = ref(true)
//对话框
let bedVisible = ref(false)
//选中表格数据
let selectBedData = ref([])
bedSearchParams.dormNumber = $route.params.name
bedSearchParams.dormType = $route.params.type
function selectCheckBox(selection) {
  isOperate.value = false
  if (selection.length === 0) {
    isOperate.value = true
  }
  selectBedData.value = selection
}

/* 接口 */
let bedTableData = ref([])
async function getBedData() {
  const { code, data } = await getBedInfoRequest()
  bedTableData.value = data
}
async function deleteBedData() {}
async function increaseBedData() {}
async function updateBedData() {}
onMounted(() => {
  getBedData()
})
</script>
<template>
  <!-- 搜索 -->
  <el-form
    :model="bedSearchParams"
    style="height: 35px; padding: 5px 0"
    inline>
    <el-form-item prop=" dormNumber">
      <el-input
        v-model="bedSearchParams.dormNumber"
        placeholder="请输入宿舍编号"
        clearable
        style="width: 160px" />
    </el-form-item>
    <el-form-item prop="dormType">
      <el-select
        style="width: 160px"
        v-model="bedSearchParams.dormType"
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
    <el-form-item prop="dormNumber">
      <el-input
        v-model="bedSearchParams.bedNumber"
        placeholder="请选择床位编号"
        clearable
        style="width: 160px" />
    </el-form-item>
    <el-form-item prop="dormStatus">
      <el-select
        style="width: 160px"
        v-model="bedSearchParams.bedStatus"
        placeholder="床位状态">
        <el-option
          label="没人"
          value="Not" />
        <el-option
          label="有人"
          value="Have" />
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
    v-model="bedVisible" />
  <!-- 表格数据 -->
  <el-table
    :data="bedTableData"
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
      prop="dormNumber"
      label="宿舍"
      width="180"
      align="center">
      <!-- <template #default>
        {{ $route.query.dormNumber }}
      </template> -->
    </el-table-column>

    <el-table-column
      prop="bedNumber"
      label="床位编号"
      width="180"
      align="center" />
    <el-table-column
      prop="bedStatus"
      label="床位状态"
      width="180"
      align="center">
      <template #default="{ row, column, $index }">
        <el-tag
          class="ml-2"
          type="info"
          v-if="row.bedStatus === '没人'"
          >{{ row.bedStatus }}</el-tag
        >
        <el-tag
          class="ml-2"
          v-else
          >{{ row.bedStatus }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column
      prop="bedPerson"
      label="入住人"
      width="180"
      align="center" />
    <el-table-column
      prop="操作"
      label="操作"
      align="center">
      <template #default="{ row, column, $index }">
        <TableButton
          :row="row"
          @merge="bedVisible = true"
          v-model="editParams" />
      </template>
    </el-table-column>
  </el-table>
  <!-- 对话框 -->
  <FormDialog
    v-model="bedVisible"
    v-model:params="editParams"
    title="修改床位">
    <el-form
      :model="editParams"
      label-width="auto">
      <el-form-item label="宿舍">
        <el-select
          style="width: 120px"
          v-model="editParams.dormNumber"
          placeholder="请选择宿舍类型">
          <el-option
            label="A1-08"
            value="男生宿舍" />
          <el-option
            label="女生宿舍"
            value="女生宿舍" />
        </el-select>
      </el-form-item>
      <el-form-item label="床位编号">
        <el-input v-model="editParams.bedNumber" />
      </el-form-item>
      <el-form-item label="床位状态">
        <el-radio-group v-model="editParams.bedStatus">
          <el-radio label="有人">有人</el-radio>
          <el-radio label="没人">没人</el-radio>
          <el-radio label="其他">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="入住人">
        <el-input v-model="editParams.bedPerson" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="editParams.message"
          placeholder="备注信息"
          :rows="3"
          type="textarea" />
      </el-form-item>
    </el-form>
  </FormDialog>
</template>
