<script setup>
// const Comp = defineProps({
//   data: {
//     type: Array
//   },
//   label: {
//     type: String
//   },
//   list: {
//     type: Array
//   }
// })
// const props = {
//   value: "id",
//   label: Comp.label,
//   children: "children"
// }
// const listId = computed(() => {
//   return Comp.list
// })
// const IdList = ref([])
// watch(listId, () => {
//   IdList.value = listId.value
//   console.log("11111", listId.value)
// })
const Comp = defineProps({
  data: {
    type: Array
  },
  label: {
    type: String
  },
  list: {
    type: Array
  }
})

const props = {
  value: "id",
  label: Comp.label,
  children: "children"
}

const listId = computed(() => {
  return Comp.list
})
console.log("6699", Comp.list)
</script>
<template>
  <div>
    <el-tree-v2
      style="max-width: 600px"
      :data="data"
      :props="props"
      show-checkbox
      :default-checked-keys="listId"
      :item-size="35"
      :height="500" />
  </div>
</template>
<!-- 
    <!-- <el-tree
              v-if="drawerVisible"
              style="max-width: 600px"
              :data="Menus"
              :props="props"
              show-checkbox
              node-key="id"
              :default-checked-keys="listM"
              :item-size="35"
              :height="500" /> -->
 -->
