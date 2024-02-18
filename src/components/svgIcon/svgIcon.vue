<template>
  <svg
    :style="{ width: width + `px`, height: height + `px` }"
    class="svg">
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
  width: {
    type: String,
    default: "25"
  },
  height: {
    type: String,
    default: "25"
  }
})
</script>

<style>
.svg {
  color: rgb(227, 27, 27);
  /* margin-right: 10px; */
  /* padding-right: 10px; */
}
</style>
