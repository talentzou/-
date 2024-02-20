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
const emit = defineEmits(["update:modelValue"])
function clearBedParamsData() {
  let tempObj = {}
  for (let key of Object.keys(formParams.value)) {
    tempObj[key] = ""
  }
  //   console.log(tempObj)
  formParams.value = { ...formParams.value, ...tempObj }
}

const visibleKey = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
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
        <el-button
          type="primary"
          @click="floorsParams.id ? updateTableList() : increaseData()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
