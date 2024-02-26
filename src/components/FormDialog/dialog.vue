<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "无",
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  width:{
    type:String,
    default:30+"%"
  }
})
const formParams = defineModel("params")
const emits = defineEmits(["update:modelValue","close"])
function clearBedParamsData() {
  let tempObj = {}
  for (let key of Object.keys(formParams.value)) {
    tempObj[key] = ""
  }
  formParams.value = { ...formParams.value, ...tempObj }
  emits("close")
}

const visibleKey = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits("update:modelValue", val)
  }
})
</script>
<template>
  <el-dialog
    :width="props.width"
    v-model="visibleKey"
    @close="clearBedParamsData"
    :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <h4
        :id="titleId"
        :class="titleClass">
        {{ props.title }}
      </h4>
    </template>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibleKey = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
