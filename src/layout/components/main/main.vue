<script setup>
import { layoutStore } from "@/stores/layout"
const useLayoutStore=layoutStore()
const rebuild=computed(()=>useLayoutStore.isRefresh)
</script>
<template>
  <div class="main-content">
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component
          :is="Component"
          v-if="rebuild"
          :key="route.fullPath"></component>
      </transition>
    </router-view>

    <!-- <router-view /> -->
  </div>
</template>

<style>
.main-content {
  flex: 1;
  padding: 10px;
}

.fade-enter-active {
  animation:lightSpeedInRight 0.5s;
}
.fade-leave-active {
  animation: fadeOut 0.3s ;
}

</style>
