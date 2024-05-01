<script setup>
import {
  getStayResponse,
  updateStayResponse,
  createStayResponse,
  deleteStayResponse
} from "@/api/Dorm/stay"
import { GetFloorWithDormList } from "@/api/Dorm/floors"
import { useExportExcel } from "@/utils/exportExcel"
import { useRules } from "@/rules/dormRules"
import { resetForm, submitForm } from "@/utils/rules"
import { Notification } from "@/utils/notification"
import { floorsName, dormNumber } from "@/rules/dormRules"
import { authFields } from "@/utils/authFields"
import { FormatTime } from "@/utils/time"
import { userStore } from "@/stores/user"
const $userStore = userStore()
const userInfo = computed(() => $userStore.userInfo)
const { operate_auth, table_auth } = authFields("stay")
//表格实例
const refTable = ref(null)
const searchRef = ref(null)
const Form = ref(null)
//导出对话框
const expDialog = ref(false)
//搜索参数
let staySearchParams = reactive({
  studentName: ""
})
//编辑参数
let stayEditParams = ref({
  stayTime: "",
  studentName: "",
  dormId: "",
  stayCause: "",
  opinions: ""
})
let isOperate = ref(true)
const searchRules = {
  studentName: [
    {
      required: true,
      message: "学生姓名不能为空",
      trigger: "blur"
    }
  ]
}
const formRules = useRules(stayEditParams.value)
//参数编辑对话框
let stayVisible = ref(false)

//标签颜色
function stateTag(text) {
  switch (text) {
    case "同意":
      return "success"
    case "不同意":
      return "danger"
    default:
      return "info"
  }
}

/* 接口 */
let stayTableData = ref([])
const total = ref(0)
let Pages = ref({
  PageSize: 10,
  Page: 1
})
// 查寻
async function getStays(PageAndSize) {
  if (PageAndSize !== undefined) {
    Pages = PageAndSize
  }
  // console.log("发起请求")
  const { code, data } = await getStayResponse(staySearchParams, Pages.value)
  console.log("留宿申请数据", data.list)

  if (code == 200) {
    stayTableData.value = data.list.map((item) => {
      // console.log("开始时间", item.stayTime.startTime)
      // console.log("结束时间", item.stayTime.endTime)
      item.stayTime = [item.stayTime.startTime, item.stayTime.endTime]
      return item
    })
    total.value = data.total
  }
}
// 更新
async function updateStays() {
  const valid = await submitForm(Form.value)
  if (valid) {
    const list = toRaw(stayEditParams.value)
    list.stayTime = {
      startTime: list.stayTime[0],
      endTime: list.stayTime[1]
    }
    const { code, msg } = await updateStayResponse(list)
    stayVisible.value = false
    const status = Notification(code, msg)
    status ? getStays() : ""
    if (Reflect.has(stayEditParams.value, "id")) {
      console.log("有id99")
      delete stayEditParams.value.id
      delete stayEditParams.value.dorm
    }
  }
}
// 删除
async function deleteStays(list) {
  if (list === undefined) {
    console.log("8888888")
    list = refTable.value.getSelectionRows().map((item) => toRaw(item))
    console.log("8888888", list)
    list = list.map((item) => {
      item.stayTime = {
        startTime: item.stayTime[0],
        endTime: item.stayTime[1]
      }
      return item
    })
  }
  console.log("LIST", list)
  const { code, msg } = await deleteStayResponse(list)
  const status = Notification(code, msg)
  status ? getStays() : ""
}
// 添加
async function createStays() {
  const valid = await submitForm(Form.value)
  if (valid) {
    let list = toRaw(stayEditParams.value)
    list.stayTime = {
      startTime: list.stayTime[0],
      endTime: list.stayTime[1]
    }
    list = {
      stayTime: list.stayTime,
      studentName: list.studentName,
      dormId: list.dormId,
      stayCause: list.stayCause,
      opinions: list.opinions
    }
    // console.log("list", list)
    const { code, msg } = await createStayResponse([list])
    stayVisible.value = false
    const status = Notification(code, msg)
    status ? getStays() : ""
  }
}
//搜索栏
async function SearchStays() {
  const query = staySearchParams
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
    getStays()
  }
}
const options = ref([])
const getFloorWithDorm = async () => {
  const { code, data } = await GetFloorWithDormList()
  console.log("ppp", data)
  if (code == 200) {
    options.value = data.list
  }
}
onMounted(() => {
  getFloorWithDorm()
  getStays()
})
const HandlePageChange = async (page) => {
  Pages.value = page
  const { code, data } = await getStayResponse(staySearchParams, page)
  if (code == 200) {
    stayTableData.value = data.list.map((item) => {
      item.stayTime = [item.stayTime.startTime, item.stayTime.endTime]
      return item
    })
  }
}
</script>
<template>
  <div>
    <el-form
      ref="searchRef"
      :rules="searchRules"
      :model="staySearchParams"
      inline>
      <el-form-item style="width: 200px">
        <el-input
          clearable
          placeholder="请输入留宿学生名"
          v-model="staySearchParams.studentName" />
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="SearchStays"
            >搜索</el-button
          >
          <el-button @click="resetForm(searchRef)">重置</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <OperateButton
      :isOperate="isOperate"
      v-model="stayVisible"
      :authBtn="operate_auth"
      @delete="deleteStays()"
      @excel="expDialog = true" />
    <!-- 表格数据 -->
    <el-table
      ref="refTable"
      :data="stayTableData"
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
        label="#" />
      <el-table-column
        prop="stayDate"
        label="留宿时间"
        width="200"
        align="center">
        <template #default="{ row }">
          <el-text truncated>
            {{ FormatTime(row.stayTime[0]) }}~{{ FormatTime(row.stayTime[1]) }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="留宿学生"
        width="120"
        align="center" />
      <el-table-column
        prop="stayCause"
        label="留宿原因"
        width="220"
        align="center">
        <template #default="{ row }">
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
        prop="dormNumber"
        label="宿舍"
        align="center"
        width="180">
        <template #default="{ row }">
          <el-tag>{{ row.dorm.floorsName + "-" + row.dorm.dormNumber }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="opinions"
        label="审核意见"
        align="center"
        width="120">
        <template #default="{ row }">
          <el-tag :type="stateTag(row.opinions)">{{ row.opinions }}</el-tag>
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
            @merge="stayVisible = true"
            @delete="deleteStays"
            v-model="stayEditParams" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      @getCurrentPage="HandlePageChange"
      @getPageSizes="HandlePageChange" />
    <!-- 对话框 -->
    <FormDialog
      @close="Form.resetFields()"
      v-model="stayVisible"
      v-model:params="stayEditParams"
      :title="stayEditParams.id ? `修改留宿申请` : `添加留宿申请`">
      <el-form
        ref="Form"
        :rules="formRules"
        :model="stayEditParams"
        label-width="auto">
        <el-form-item
          label="留宿时间"
          prop="stayTime">
          <el-date-picker
            v-model="stayEditParams.stayTime"
            type="daterange"
            format="YYYY-MM-DD"
            start-placeholder="Start date"
            end-placeholder="End date" />
        </el-form-item>
        <el-form-item
          label="宿舍"
          prop="dormId">
          <el-select
            v-model="stayEditParams.dormId"
            placeholder="请选择宿舍"
            style="width: 100%">
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
          label="留宿学生"
          prop="studentName">
          <el-input v-model="stayEditParams.studentName" />
        </el-form-item>
        <el-form-item
          label="留宿原因"
          prop="stayCause">
          <el-input
            v-model="stayEditParams.stayCause"
            placeholder="请输入内容"
            type="textarea" />
        </el-form-item>
        <el-form-item
          label="意见"
          prop="opinions"
          v-auth="`stay_add_opinions`"
          v-if="userInfo.roleId !== 3">
          <el-select
            v-model="stayEditParams.opinions"
            placeholder="请选择意见">
            <el-option
              label="同意"
              value="同意" />
            <el-option
              label="不同意"
              value="不同意" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="stayEditParams.id ? updateStays() : createStays()"
            type="success"
            >{{ stayEditParams.id ? "更新" : "添加" }}</el-button
          >
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
@/server/MG/stay/stay @/rules/dormRules
