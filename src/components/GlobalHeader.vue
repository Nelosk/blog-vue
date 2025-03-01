<template>
  <div id="globalHeader">
    <el-row :gutter="0">
      <el-col :span="5">
        <div class="title-bar">
          <img class="logo" src="../assets/images/logo.png" alt="logo" />
          <div class="title">HelloBlog</div>
        </div>
      </el-col>
      <el-col :span="11">
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            主页
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="test">说说</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3" :offset="3">
        <div class="user">
          <!-- <el-avatar @click="handleAvatarClick" :icon="UserFilled"/> -->
          <!-- 头像组件 -->
          <el-avatar
            @click="handleAvatarClick"
            v-if="!userStore.userinfo.isLogged"
            :icon="UserFilled"
            :size="40"
            class="default-avatar"   
          />
          <el-avatar
            @click="handleAvatarClick"
            v-else
            :src="userAvatar"
            :size="40"
            class="user-avatar"
          />
          <span class="username" style="margin-left: 10px">
            {{  userStore.userinfo.username}}
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UserFilled } from "@element-plus/icons-vue";
import { useUserinfoStore } from "@/stores/useUserinfoStore";

const userStore = useUserinfoStore();
const id = ref(userStore.userinfo.id);
const userAvatar = ref(userStore.userinfo.avatar);

// const isLoggedIn = ref(userStore.isLoggedIn);


const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleAvatarClick = () => {
  console.log("avatar clicked");
};

</script>

<style lang="scss" scoped>
#globalHeader {
  .title-bar {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #fff;
    .logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }
  /* 右侧部分 */
  .right-section {
    display: flex;
    align-items: center;
    width: 100px; /* 固定宽度 */
  }
}
</style>
