<script></script>
<template>
  <div>
    <el-descriptions
      style="max-width: 500px"
      title="Vertical list with border"
      :column="2"
      size="large"
      border>
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="username"
            color="black"></svg-icon
          >用户名 </template
        >2015201153</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="nickname"
            color="black"></svg-icon
          >姓名 </template
        >张三</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_sex"
            color="black"></svg-icon
          >性别</template
        >男</el-descriptions-item
      >
      <el-descriptions-item label="年龄">
        <template #label>
          <svg-icon
            name="user_age"
            color="black"></svg-icon
          >年龄 </template
        >18</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_dorm"
            color="black"></svg-icon
          >宿舍 </template
        >d5-202</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_phone"
            color="black"></svg-icon
          >手机号 </template
        >18100000000</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_email"
            color="black"></svg-icon
          >邮箱 </template
        >123456@qq.com</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_createat"
            color="black"></svg-icon
          >创建时间 </template
        >2024-02-22</el-descriptions-item
      >
      <el-descriptions-item label="Remarks">
        <template #label>
          <svg-icon
            name="user_remark"
            color="black"></svg-icon
          >备注
        </template>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
