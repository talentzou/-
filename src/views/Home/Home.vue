<script lang="ts" setup>
const activities = [
  {
    content: "Event start",
    timestamp: "2018-04-15"
  },
  {
    content: "Approved",
    timestamp: "2018-04-13"
  },
  {
    content: "Success",
    timestamp: "2018-04-11"
  }
]
const list = ref([
  { title: "用户统计", icon: "user", color: "#2c4058" },
  { title: "空宿舍统计", icon: "empty_dorm", color: "#ffb102" },
  { title: "住宿人数", icon: "accommodation", color: "#0590fd" },
  { title: "待报修统计", icon: "repair_task", color: "#00798a" }
])
</script>
<template>
  <div class="home">
    <!-- 统计区 -->
    <div>
      <el-card class="statistics">
        <div
          v-for="d in list"
          :style="{ backgroundColor: d.color }"
          :key="d">
          <svg-icon
            :name="d.icon"
            width="65"
            color="white"
            height="65"></svg-icon>
          <div class="statistics-text">
            <span>{{ d.title }}</span>
            <span>{{ 0 }}</span>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 通告区 -->
    <div class="annunciation">
      <div class="welcome">
        <h2>Hello,欢迎您回来,{{ "小主" }}</h2>
        <div
          class="img"
          style="height: 100%"></div>
      </div>
      <div style="background-color: white; padding: 10px">
        <h2 style="margin-bottom: 25px; font-size: 20px">宿舍通告</h2>
        <el-timeline class="annunciation-timeline">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>

    </div>
  </div>
</template>
<style>
.home {
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #eee;
}
.statistics {
  flex: 1;
  display: flex;
  margin: 8px;
  div {
    flex: 1;
    height: 80px;
    margin: 10px 20px;
    padding: 8px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    .statistics-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        font-size: 20px;
        font-weight: bold;
        white-space: nowrap;
        color: white;
        margin: 8px;
      }
    }
  }
}
.annunciation {
  flex: 3;
  margin: 8px;
  display: flex;
  .welcome {
    flex: 1;
    flex-direction: column;
    margin-right: 8px;
    padding: 10px;
    background-color: white;
    .img {
      background: url("@/assets/imgs/welcome.jpg") no-repeat;
      background-size: contain;
    }
    h2 {
      width: 100%;
      text-align: center;
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 15px;
    }
  }
  .annunciation-timeline {
    flex: 3;
    min-width: 600px;
    height: 100%;
  }
}
</style>
