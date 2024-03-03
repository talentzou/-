<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(["update:modelValue", "select"])
const visibleKey = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits("update:modelValue", val)
  }
})
let filename = ref("")
// function exportTable({ filename, isSelect }) {
 
//   // if (isSelect) {
//   //   exportExcel(refTable.value.data,filename)
//   // } else {
//   //   const part = refTable.value.getSelectionRows()
//   //   if (part.length === 0) {
//   //     return ElMessage({
//   //       message: "没有选中项导出！！！",
//   //       type: "error"
//   //     })
//   //   }
//   //   exportExcel(part,filename)
//   // }
// }
// defineExpose({
//   exportTable
// })
</script>
<template>
  <el-dialog
    width="25%"
    v-model="visibleKey"
    @close="filename=``"
    :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4
        :id="titleId"
        :class="titleClass">
        {{ "导出数据" }}
      </h4>
    </template>
    <el-input
      v-model="filename"
      placeholder="请输入文件名" style="margin-bottom: 10px;"/>
    <div>
      <el-button
        text
        type="primary"
        @click="() => emits('select',{allSelect:false,filename })"
        >{{ "选择部分导出" }}</el-button
      >
      <el-button
        text
        type="success"
        @click="() => emits('select', { allSelect:true,filename})"
        >{{ "全部导出" }}</el-button
      >
    </div>
  </el-dialog>
</template>
