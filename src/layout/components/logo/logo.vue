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
  width: 32px;
  height: 32px;
  border-radius: 5px;
  vertical-align: middle;
  margin-right: 10px;

}
.logo_sidebar_title {
  display: inline-block;
  line-height: 50px;
  margin: 0;
  vertical-align: middle;
  font-weight: 800;
  font-size: 18px;
  color: #fff;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}
</style>
