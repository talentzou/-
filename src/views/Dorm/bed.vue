<script setup>
import { getBedInfoRequest } from "@/server/MG/bed/bed"
import { exportExcel } from "@/utils/excel"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
let $route = useRoute()
const refTable = ref(null)
const Form = ref(null)
const searchRef = ref(null)
const expDialog = ref(false)
let bedSearchParams = reactive({
  dormType: "",
  dormNumber: ""
})
let editBedParams = reactive({
  bedStatus: "",
  dormNumber: "",
  bedNumber: "",
  message: "",
  studentName: ""
})
const searchRules=useRules(bedSearchParams)
const formRules=useRules(editBedParams )
let isOperate = ref(true)
let bedVisible = ref(false)
bedSearchParams.dormNumber = $route.params.name
bedSearchParams.dormType = $route.params.type
//导出数据
function exportTable({ filename, allSelect }) {
  const data = allSelect
    ? refTable.value.data
    : refTable.value.getSelectionRows()
  exportExcel(data, filename)
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
  <div>
    <!-- 搜索 -->
    <el-form
     :rules="searchRules"
      :model="bedSearchParams"
      ref="searchRef"
      inline>
      <el-form-item prop="dormNumber">
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
      @excel="expDialog = true"
      v-model="bedVisible" />
    <!-- 表格数据 -->
    <el-table
      :data="bedTableData"
      ref="refTable"
      @selection-change="
        (list) => (list.length ? (isOperate = false) : (isOperate = true))
      "
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
        <template #default>
        {{ $route.params.name }}
      </template>
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
        prop="studentName"
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
            v-model="editBedParams" />
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 对话框 -->
    <FormDialog
      @close="Form.resetFields()"
      v-model="bedVisible"
      v-model:params="editBedParams"
      :title="editBedParams.id?`修改床位信息`:`添加床位信息`">
      <el-form
        ref="Form"
        :rules="formRules"
        :model="editBedParams"
        label-width="auto">
        <el-form-item
          label="宿舍"
          prop="dormNumber">
          <el-input v-model="editBedParams.dormNumber" />
        </el-form-item>
        <el-form-item
          label="床位编号"
          prop="bedNumber">
          <el-input v-model.number="editBedParams.bedNumber" />
        </el-form-item>
        <el-form-item
          label="床位状态"
          prop="bedStatus">
          <el-radio-group v-model="editBedParams.bedStatus">
            <el-radio label="有人">有人</el-radio>
            <el-radio label="没人">没人</el-radio>
            <el-radio label="其他">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="入住人"
          prop="studentName">
          <el-input v-model="editBedParams.studentName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="editBedParams.message"
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
