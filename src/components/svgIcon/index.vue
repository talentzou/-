<template>
  <div>
    <svg :style="{ width: width + `px`, height: height + `px` }">
      <use
        :xlink:href="prefix + name"
        :fill="color"></use>
    </svg>
  </div>
</template>

<script setup>
console.log("5555555555555")
defineProps({
  prefix: {
    type: String,
    default: "#icon-"
  },
  name: String,
  color: {
    type: String,
    default: "black"
  },
  width: {
    type: String,
    default: "16"
  },
  height: {
    type: String,
    default: "16"
  }
})
</script>

<style></style>
