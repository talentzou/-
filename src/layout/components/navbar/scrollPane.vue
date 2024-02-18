<script setup></script>
<template>
  <el-scrollbar  height="30px" class="scrollbar-container">
    <div class="scrollbar-flex-content">
      <!-- <router-link class="tag-view-item">
        
      </router-link> -->
    </div>
  </el-scrollbar>
</template>

<style>
.scrollbar-container {
  height: 30px;
}
.scrollbar-flex-content {
  display: flex;
  white-space: nowrap;
  padding: 0 15px;
  height: 30px;
  overflow: hidden;
}
.tag-view-item {
    margin-left: 5px;
    background-color: blanchedalmond;
}
</style>
