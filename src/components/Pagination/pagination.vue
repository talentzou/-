<script setup>
const $props = defineProps({
  total: {
    require: true,
    type: Number
  },
})
const $emit = defineEmits(["getCurrentPage", "getPageSizes"])
const pageAndSize = reactive({
  pageSizes: 10,
  currentPages: 4
})
function handleSizeChange(event) {
//   console.log("PageSizes", event)
  pageAndSize.pageSize = event
  $emit("getPageSizes", pageAndSize)
}
function handleCurrentChange(event) {
//   console.log("Page", event)
  pageAndSize.currentPages = event
  $emit("getCurrentPage", pageAndSize)
}
</script>
<template>
  <div class="demo-pagination">
    <el-pagination
      v-model:current-page="pageAndSize.currentPages"
      v-model:page-size="pageAndSize.pageSizes"
      :page-sizes="[10, 20, 40, 60]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="$props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>
<style>
.demo-pagination {
  margin-top: 10px;
}
</style>
