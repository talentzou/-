<script setup>
let expenseSearchParams = reactive({
  floorsName: "",
  dormNumber: "",
  settlementDate: "",
  accounter: ""
})
</script>

<template>
  <el-form
    :model="expenseSearchParams"
    style="height: 35px; padding: 5px 0"
    inline>
    <el-form-item prop="floorsName">
      <el-select
        style="width: 160px"
        v-model="expenseSearchParams.floorsName"
        placeholder="请选择宿舍楼">
        <el-option
          label="六人间"
          value="六人间" />
      </el-select>
    </el-form-item>
    <el-form-item prop="dormNumber">
      <el-select
        style="width: 160px"
        v-model="expenseSearchParams.dormNumber"
        placeholder="请选择宿舍">
        <el-option
          label="六人间"
          value="六人间" />
      </el-select>
    </el-form-item>
    <el-form-item prop="settlementDate">
      <el-date-picker
        @change="selectDatePicker"
        v-model="expenseSearchParams.settlementDate"
        type="date"
        format="YYYY-MM-DD"
        placeholder="Start date"
        value-format="x" />
    </el-form-item>
    <el-form-item prop="accounter">
      <el-input
        v-model="expenseSearchParams.accounter"
        placeholder="请输入结算人"
        clearable
        style="width: 160px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
