<script setup>
const props = defineProps({})
</script>
<template>
  <div class="logo_wrapper">
    <div>
      <img
        src="@/assets/imgs/logo.jpg"
        alt=""
        class="logo_sidebar_image" />
      <h1 class="logo_sidebar_title">{{ "宿舍管理系统" }}</h1>
    </div>
  </div>
</template>
<style>
.logo_wrapper {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.logo_sidebar_image {
  width: 28px;
  height: 28px;
  border-radius: 5px;
  vertical-align: middle;
 

}
.logo_sidebar_title {
  display: inline-block;
  line-height: 50px;
  margin-left: 10px;
  vertical-align: middle;
  font-weight: 800;
  font-size: 16px;
  color: #fff;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  position: relative;
  text-align: center;
  overflow: hidden;
  white-space: nowrap !important;
}
</style>
