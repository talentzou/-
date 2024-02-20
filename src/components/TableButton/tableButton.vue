<script setup>
const props = defineProps({
  row: {
    type: Object
  }
})
const modelValue = defineModel()
const emits = defineEmits(["merge"])
function editRowTable() {
  modelValue.value = { ...modelValue.value, ...props.row }
  emits("merge")
}
function deleteTableList() {}
</script>
<template>
  <el-button
    type="primary"
    size="small"
    @click="editRowTable">
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
    @confirm="deleteTableList">
    <template #reference>
      <el-button
        type="danger"
        size="small">
        <template #icon>
          <svg-icon
            name="delete"
            color="white"></svg-icon> </template
        >删除
      </el-button>
    </template>
  </el-popconfirm>
</template>
<style></style>
