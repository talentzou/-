<script setup>
const props = defineProps({
  row: {
    type: Object
  },
  authBtn: {
    type: Object
  }
})
const modelValue = defineModel()
const emits = defineEmits(["merge", "delete"])
function UpdateRow() {
  modelValue.value = { ...modelValue.value, ...props.row }
  // console.log();
  // if (Reflect.has(props.row,"studInfoId")&&Reflect.has(props.row,"dormId")){
  //   emits("merge")
  // }
  // console.log("9999");
  emits("merge",[props.row.dormId,props.row.studInfoId])
}
function DeleteRow() {
  // console.log("ssssss", props.row.id)
  emits("delete", [{ id: props.row.id, uuid: props.row.uuid }])
}
</script>
<template>
  <div>
    <el-button
      v-auth="`${authBtn&&authBtn.edit}`"
      type="primary"
      size="small"
      @click="UpdateRow">
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
      @confirm="DeleteRow">
      <template #reference>
        <el-button
          v-auth="`${authBtn&&authBtn.delete}`"
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
  </div>
</template>
<style></style>
