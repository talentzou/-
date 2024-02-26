<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key ,keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key,keyPath) => {
  console.log(key, keyPath)
}

</script>

<template>
  <div>
    主页
  </div>
 
</template>
<style>

</style>

