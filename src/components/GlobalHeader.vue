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
            v-if="!token"
            :icon="UserFilled"
            :size="40"
            class="default-avatar"   
          />
          <el-avatar
            @click="handleLogout"
            v-else
            :src="userAvatar"
            :size="40"
            class="user-avatar"
          />
          <Login ref="loginDialogRef" />
          <span class="username" style="margin-left: 10px">
            {{  userStore.userinfo.username}}
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref,computed } from "vue";
import { UserFilled } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from 'element-plus';
import { useUserStore } from "@/stores/useUserStore";
import Login from "@/components/dialog/login.vue";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userinfo } =storeToRefs(userStore);
const token = computed(() => userStore.userinfo.token);
const userAvatar = computed(() => userinfo.value.avatar);

// const userAvatar = computed(() => userStore.userinfo.avatar);


// const isLoggedIn = ref(userStore.isLoggedIn);


const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const loginDialogRef = ref<InstanceType<typeof Login>>()
const handleAvatarClick = () => {
  console.log("弹出登录框");
  loginDialogRef.value?.open()
};
// 登出逻辑
const handleLogout = () => {
    // 使用 ElMessageBox 弹出确认对话框
    ElMessageBox.confirm('确定要登出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
    .then(() => {
        // 用户点击“确定”时执行的操作
        clearUserInfo(); // 清除用户信息
        ElMessage.success('已成功登出'); // 提示登出成功
    })
    .catch(() => {
        // 用户点击“取消”时执行的操作
        ElMessage.info('已取消登出'); // 提示取消登出
    });
};
const clearUserInfo = () => {
    userStore.clearUserInfo();
    // 跳转到登录页面
    // router.push('/login');
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
@/stores/useUserStore