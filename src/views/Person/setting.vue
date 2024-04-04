<script setup>
import { SetUserInfo } from "@/api/User/user"
import { userStore } from "@/stores/user"
import { Notification } from "@/utils/notification"
const centerDialogVisible = ref(false)
const $userStore = userStore()
const userInfo = computed(() => $userStore.userInfo)
//照片上传前钩子
function beforeAvatarUpload(file) {
  const imgType = ["image/png", "image/jpeg", "image/webp"]
  const size = file.size / 1024 / 1024
  return new Promise((resolve, reject) => {
    if (imgType.includes(file.type)) {
      if (size < 5) {
        resolve()
      } else {
        reject(
          ElMessage({
            type: "error",
            message: "上传文件务必小于3M"
          })
        )
      }
    } else {
      reject(
        ElMessage({
          type: "error",
          message: "上传文件务必PNG|JPG|WEBP"
        })
      )
    }
  })
}
function handleAvatarSuccess(res) {
  console.log("上传照片成功", res)
  updateUserInfo(res.data.url)
}

async function updateUserInfo(url) {
  let params = { avatar: url }
  if (!url) {
    // console.log("修改信息",userInfo.value);
    params = {
      nickname: userInfo.value.nickname,
      sex: userInfo.value.sex,
      avatar: userInfo.value.url,
      // email: userInfo.value.email,
      telephone: userInfo.value.telephone,
      dorm: userInfo.value.dorm
    }
  }
  
  const { code, msg } = await SetUserInfo(params)
  const status = Notification(code, msg)
  status ? $userStore.getUserInfo() : ""
  centerDialogVisible.value = false
}
</script>
<template>
  <div
    class="info"
    style="padding: 20px">
    <div class="uploadContainer">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/base/upload/imageUpload"
        name="image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <div class="hover">
          <img
            v-if="userInfo.avatar"
            :src="userInfo.avatar"
            class="avatar" />
          <div
            class="avatar-uploader-icon"
            v-else>
            <svg-icon
              name="plus"
              color="#b6b8be"></svg-icon>
          </div>
          <span
            class="editImg back"
            v-if="userInfo.avatar">
            <svg-icon
              name="username"
              color="#fff"></svg-icon
            >点击更换头像</span
          >
        </div>
      </el-upload>
      <p style="color: #8c939d; margin: 20px 0">
        请上传大小不超过<span style="color: red">5MB</span>格式为
        <span style="color: red">{{ "jpg/png/webp" }}</span
        >的文件
      </p>
    </div>
    <el-descriptions
      style="max-width: 500px"
      title="个人信息"
      :column="2"
      size="large"
      border>
      <template #extra>
        <el-button
          type="primary"
          @click="centerDialogVisible = true"
          >编辑</el-button
        >
      </template>
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="username"
            color="black"></svg-icon
          >用户名 </template
        >{{ userInfo.userName }}</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="nickname"
            color="black"></svg-icon
          >姓名 </template
        >{{ userInfo.nickname }}</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_sex"
            color="black"></svg-icon
          >性别</template
        >{{ userInfo.sex }}</el-descriptions-item
      >
      <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_dorm"
            color="black"></svg-icon
          >宿舍</template
        >{{ userInfo.dorm }}</el-descriptions-item
      >
      <el-descriptions-item  :span="2"> 
        <template #label>
          <svg-icon
            name="user_phone"
            color="black"></svg-icon
          >手机号码</template
        >{{ userInfo.telephone }}</el-descriptions-item
      >
      <!-- <el-descriptions-item>
        <template #label>
          <svg-icon
            name="user_email"
            color="black"></svg-icon
          >邮箱 </template
        >{{ userInfo.email }}</el-descriptions-item
      > -->
      <el-descriptions-item :span="2">
        <template #label>
          <svg-icon
            name="user_createat"
            color="black"></svg-icon
          >创建时间 </template
        >{{ userInfo.CreatedAt }}</el-descriptions-item
      >
      <el-descriptions-item
        label="Remarks"
        :span="2">
        <template #label>
          <svg-icon
            name="user_remark"
            color="black"></svg-icon
          >备注 </template
        >{{ userInfo.remark }}
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog
      v-model="centerDialogVisible"
      title="编辑信息"
      width="700"
      align-center>
      <el-form
        inline
        :model="userInfo"
        label-width="auto">
        <el-form-item
          prop="userName"
          label="用户名">
          <el-input
            v-model="userInfo.userName"
            style="width: 200px"
            disabled
            placeholder="Please input" />
        </el-form-item>
        <el-form-item
          prop="nickname"
          label="姓名">
          <el-input
            v-model="userInfo.nickname"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item>
        <el-form-item
          prop="sex"
          label="性别">
          <el-select
            v-model="userInfo.sex"
            style="width: 200px"
            placeholder="please select your zone">
            <el-option
              label="男"
              value="男" />
            <el-option
              label="女"
              value="女" />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="dorm"
          label="宿舍">
          <el-input
            v-model="userInfo.dorm"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item>
        <el-form-item
          prop="telephone"
          label="电话">
          <el-input
            v-model="userInfo.telephone"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱">
          <el-input
            v-model="userInfo.email"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item>
        <el-form-item
          prop="CreatedAt"
          label="创建时间">
          <el-input
            disabled
            v-model="userInfo.CreatedAt"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item>
        <el-form-item
          prop="remark"
          label="备注">
          <el-input
            disabled
            v-model="userInfo.remark"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="updateUserInfo()">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style>
.uploadContainer {
  width: 500px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.hover {
  position: relative;
  height: 100%;
  width: 100%;
}
.back {
  display: none;
}
.hover:hover .editImg {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 20px;
  transition: opacity 0.3s;
}

.avatar-uploader .el-upload {
  /* border: 1px dashed var(--el-border-color); */
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}
</style>
