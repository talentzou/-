<script setup>
const props = defineProps({
  isOperate: {
    require: true,
    type: Boolean,
    default: true
  }
})
let visible = defineModel()
const operateIsTrue = ref(true)
function addBtn() {
  visible.value = true
}
function deleteBtn() {}
function exportBtn() {}
</script>
<template>
  <!-- 操作 -->
  <el-row
    style="margin: 5px 0"
    :gutter="10">
    <el-col :span="1.5"
      ><el-button
        size="small"
        type="success"
        @click="addBtn">
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
        @click="deleteBtn"
        :disabled="props.isOperate"
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
        :disabled="props.isOperate"
        size="small"
        @click="exportBtn">
        <template #icon>
          <svg-icon
            name="export"
            color="white"></svg-icon> </template
        >导出
      </el-button>
    </el-col>
  </el-row>
</template>
