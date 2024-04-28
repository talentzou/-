<script setup>
import { SetSelfInfo } from "@/api/User/user"
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

  const { code, msg } = await SetSelfInfo(params)
  const status = Notification(code, msg)
  status ? $userStore.getUserInfo() : ""
  centerDialogVisible.value = false
}
</script>
<template>
  <div
    class="info"
    style="padding: 20px; background-color: #eff0f4">
    <el-card style="display: flex;justify-content: center;">
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
      </div>
    </el-card>

    <el-card style="margin-top: 20px">
      <el-descriptions
        title="个人信息"
        :column="1"
        size="large">
        <template #extra>
          <el-button
            type="primary"
            @click="centerDialogVisible = true"
            >编辑</el-button
          >
        </template>
        <el-descriptions-item
          label="用户名"
          label-class-name="my-label">
          {{ userInfo.userName }}</el-descriptions-item
        >
        <el-descriptions-item
          label-class-name="my-label"
          label="昵称">
          {{ userInfo.nickname }}</el-descriptions-item
        >
        <el-descriptions-item
          label="性别"
          label-class-name="my-label">
          {{ userInfo.sex }}</el-descriptions-item
        >
        <el-descriptions-item
          label="宿舍"
          label-class-name="my-label">
          {{ userInfo.dorm.floorsName+"-"+userInfo.dorm.dormNumber }}</el-descriptions-item
        >
        <el-descriptions-item
          label="手机号码"
          label-class-name="my-label">
          {{ userInfo.telephone }}</el-descriptions-item
        >
        <el-descriptions-item
          label-class-name="my-label"
          label="创建时间">
          {{ userInfo.CreatedAt }}</el-descriptions-item
        >
        <el-descriptions-item
          label-class-name="my-label"
          label="备注">
          {{ userInfo.remark }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

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
        <!-- <el-form-item
          prop="dorm"
          label="宿舍">
          <el-input
            v-model="userInfo.dorm"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item> -->
        <el-form-item
          prop="telephone"
          label="电话">
          <el-input
            v-model="userInfo.telephone"
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
        <!-- <el-form-item
          prop="remark"
          label="个人描述">
          <el-input
            v-model="userInfo.remark"
            style="width: 200px"
            placeholder="Please input" />
        </el-form-item> -->
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
<style scoped>
.uploadContainer {
  width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
:deep(.el-descriptions__cell) {
  display: flex;
  margin: 5px 0;
}
:deep(.el-descriptions__cell) span {
  font-size: 22px;
}
:deep(.el-descriptions__content) {
  color: #b1e4d1;
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
  width: 150px;
  height: 150px;
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
:deep(.my-label) {
  width: 35%;
  display: block;
}
</style>
