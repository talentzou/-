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
  },
  count: {
    type: Number,
    default: 0
  }
})
const $emits = defineEmits(["change", "close"])
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

console.log(Comp.count, "xu=+++" + Comp.tab, Comp.list.length)
const CheckChange = () => {
  // console.log(Tree.value.getCheckedKeys())
  console.log("之前的长度", Comp.list)

  if (Comp.tab === "btn") {
    console.log("按钮++++++")
    let temp = Tree.value.getCheckedKeys()
    temp = temp.filter((item) => item < 1000)
    length.value = temp.length
    IdList.value = temp
    console.log("9999", IdList.value)
  } else {
    console.log("菜单++++++")
    // console.log("选中", Tree.value.getCheckedKeys());
    console.log("选中的节点数", Tree.value.getCheckedKeys().length)
    // 选中长度
    // length.value = Tree.value.getCheckedKeys().length
    IdList.value = Tree.value.getCheckedKeys()
    IdList.value.push(...Tree.value.getHalfCheckedKeys())
    length.value = IdList.value.length
  }
  console.log("选中后", length.value, "原来", Comp.list.length)
}
const clickFetch = (list) => {
//  console.log(list.length);
  const isNull = list.length ? true : false
  console.log(isNull, "djdbbdd")
  if (!isNull) {
    ElNotification({
      title: "error",
      message: `${Comp.tab }节点数量无变化,操作失败`,
      duration: 2000,
      type: "error"
    })
    return
  }
  if (Comp.tab === `menu`) {
    if (length.value >= Comp.list.length + Comp.count) {
      RelateMenu()
    } else {
      DeleteRelateMenu()
    }
  } else {
    if (length.value >= Comp.list.length) {
      RelateBtn()
    } else {
      DeleteRelateBtn()
    }
  }
}

//添加按钮
const RelateBtn = async () => {
  console.log("按钮添加")
  const { code, msg } = await AddRelationBtn({
    roleId: Comp.roleId,
    roleBtnIdList: IdList.value
  })
  const status = Notification(code, msg)
  $emits("close")
  status ? $emits("change") : ""
  IdList.value = []
}
// 删除按钮
const DeleteRelateBtn = async () => {
  console.log("按钮删除")
  const { code, msg } = await DeleteRelationBtn({
    roleId: Comp.roleId,
    roleBtnIdList: IdList.value
  })
  const status = Notification(code, msg)
  $emits("close")
  status ? $emits("change") : ""
  IdList.value = []
}

// 添加菜单
const RelateMenu = async () => {
  console.log("菜单添加")
  console.log("length", length.value)
  console.log("Comp.list.length", Comp.list.length)
  const { code, msg } = await AddRelationMenu({
    roleId: Comp.roleId,
    roleMenuIdList: IdList.value
  })
  const status = Notification(code, msg)
  $emits("close")
  status ? $emits("change") : ""
  IdList.value = []
}
// 删除菜单
const DeleteRelateMenu = async () => {
  console.log("菜单删除", length.value, Comp.list.length + Comp.count)
  const { code, msg } = await DeleteRelationMenu({
    roleId: Comp.roleId,
    roleMenuIdList: IdList.value
  })
  const status = Notification(code, msg)
  $emits("close")
  status ? $emits("change") : ""
  IdList.value = []
}
</script>
<template>
  <div>
    <el-button
      type="primary"
      v-if="tab === `btn`"
      style="left: 300px; position: relative"
      @click="clickFetch(IdList)">
      <el-icon class="el-icon--left"><ep-Setting /></el-icon>确定</el-button
    >
    <el-button
      type="primary"
      v-if="tab === `menu`"
      style="left: 300px; position: relative"
      @click="clickFetch(IdList)">
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
