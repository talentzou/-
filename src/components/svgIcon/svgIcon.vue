<template>
  <svg
    class="svg-icon">
    <use
      :xlink:href="prefix + name"
      :fill="color"></use>
  </svg>
</template>

<script setup>

defineProps({
  prefix: {
    type: String,
    default: "#icon-"
  },
  name: String,
  color: {
    type: String,
    default: "white"
  },
  // width: {
  //   type: String,
  //   default: "16"
  // },
  // height: {
  //   type: String,
  //   default: "16"
  // }
})
</script >

<style scoped lang="scss">
.svg-icon {
  width: 16px;
  height: 16px;
}
</style>
