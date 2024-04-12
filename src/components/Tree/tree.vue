<script setup>
import { AddRelationMenu, DeleteRelationMenu } from "@/api/Menu/menu"
import { DeleteRelationBtn, AddRelationBtn } from "@/api/Btn/btns"
import { Notification } from "@/utils/notification"
const Comp = defineProps({
  data: {
    type: Array
  },
  roleId: {
    type: Number
  },
  list: {
    type: Array
  },
  tab: {
    type: String
  }
})
const $emits = defineEmits(["change"])
const props = {
  value: "id",
  label: "title",
  children: "children"
}
const Tree = ref(null)
const listId = computed(() => {
  return Comp.list
})
let length = ref(0)
const IdList = ref([])
const CheckChange = () => {
  // console.log(Tree.value.getCheckedKeys())
  // console.log("之前的长度", Comp.list.length)

  if (Comp.tab === "btn") {
    let temp = Tree.value.getCheckedKeys()
    temp = temp.filter((item) => item < 1000)
    length.value = temp.length
    IdList.value = temp
  } else {
    length.value = Tree.value.getCheckedKeys().length
    IdList.value = Tree.value.getCheckedKeys()
  }
  // console.log("选中后", length.value)
}
const RelateBtn = async () => {
  console.log("按钮添加")
  const { code, msg } = await AddRelationBtn({
    roleId: Comp.roleId,
    roleBtnIdList: IdList.value
  })
  const status = Notification(code, msg)
  status ? $emits("change") : ""
}
const DeleteRelateBtn = async () => {
  console.log("按钮删除")
  const { code, msg } = await DeleteRelationBtn({
    roleId: Comp.roleId,
    roleBtnIdList: IdList.value
  })
  const status = Notification(code, msg)
  status ? $emits("change") : ""
}
const RelateMenu = async () => {
  console.log("菜单添加")
  const { code, msg } = await AddRelationMenu({
    roleId: Comp.roleId,
    roleMenuIdList: IdList.value
  })
  const status = Notification(code, msg)
  status ? $emits("change") : ""
}
const DeleteRelateMenu = async () => {
  console.log("菜单删除")
  const { code, msg } = await DeleteRelationMenu({
    roleId: Comp.roleId,
    roleMenuIdList: IdList.value
  })
  const status = Notification(code, msg)
  status ? $emits("change") : ""
}
</script>
<template>
  <div>
    <el-button
      type="primary"
      v-if="tab === `btn`"
      style="left: 300px; position: relative"
      @click="length > Comp.list.length ? RelateBtn() : DeleteRelateBtn()">
      <el-icon class="el-icon--left"><ep-Setting /></el-icon>确定</el-button
    >
    <el-button
      type="primary"
      v-if="tab === `menu`"
      style="left: 300px; position: relative"
      @click="length > Comp.list.length ? RelateMenu() : DeleteRelateMenu()">
      <el-icon class="el-icon--left"><ep-Setting /></el-icon>确定</el-button
    >
    <el-tree-v2
      @check-change="CheckChange"
      style="max-width: 600px"
      ref="Tree"
      :data="data"
      :props="props"
      show-checkbox
      :default-checked-keys="listId"
      :item-size="35"
      :height="500" />
  </div>
</template>
