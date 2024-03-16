<script setup>
const $props = defineProps({
  total: {
    require: true,
    type: Number
  },
})
const $emit = defineEmits(["getCurrentPage", "getPageSizes"])
const pageAndSize = reactive({
  PageSize: 10,
  Page: 1
})
function handleSizeChange(event) {
//   console.log("PageSizes", event)
  pageAndSize.PageSize = event
  $emit("getPageSizes", pageAndSize)
}
function handleCurrentChange(event) {
//   console.log("Page", event)
  pageAndSize.Page = event
  $emit("getCurrentPage", pageAndSize)
}
</script>
<template>
  <div class="demo-pagination">
    <el-pagination
      v-model:current-page="pageAndSize.Page"
      v-model:page-size="pageAndSize.PageSize"
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
