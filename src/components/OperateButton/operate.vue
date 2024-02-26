<script setup>
const props = defineProps({
  isOperate: {
    require: true,
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(["excel"])
let visible = defineModel()
const operateIsTrue = ref(true)
function addBtn() {
  visible.value = true
}
function deleteBtn() {}
function exportBtn() {
  emits("excel")
}
</script>
<template>
  <!-- 操作 -->
  <div class="operate">
    <el-button
      size="small"
      type="success"
      @click="addBtn">
      <template #icon>
        <svg-icon
          name="plus"
          color="white"></svg-icon> </template
      >添加
    </el-button>

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
  </div>
</template>
<style>
.operate {
  line-height: 32px;
  margin-bottom: 8px;
}
</style>
