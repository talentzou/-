<script setup>
import { useRouter } from 'vue-router';

const router=useRouter()
console.log("router",router);
</script>

<template>
  <div class="nothing">
    <el-button
      class="goHome"
      type="success"
      round>
      <router-link to="/">返回主页</router-link></el-button
    >
  </div>
</template>

<style lang="scss" scoped>
.nothing {
  width: 100%;
  height: 100vh;
  background: no-repeat url("@/assets/imgs/404.jpg");
  background-size: cover;
  position: relative;
}
.goHome {
  width: 200px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, 0);
}
</style>
