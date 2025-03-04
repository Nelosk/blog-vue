<template>
  <div id="oauthlogin">
    <template>
      <!-- 在登录弹窗模板中添加 -->
      <div class="third-party-login">
        <el-divider>快速登录</el-divider>
        <div class="oauth-buttons">
          <el-tooltip content="GitHub登录" placement="top">
            <el-button
              icon="github"
              circle
              class="github-btn"
              @click="handleOAuthLogin('github')"
            />
          </el-tooltip>

          <el-tooltip content="微信登录" placement="top">
            <el-button
              type="success"
              icon="wechat"
              circle
              class="wechat-btn"
              @click="handleOAuthLogin('wechat')"
            />
          </el-tooltip>
        </div>

        <!-- 加载状态 -->
        <div v-if="oauthLoading" class="oauth-loading">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>正在跳转第三方登录...</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/useUserStore";

// 第三方登录类型
type OAuthProvider = "github" | "wechat" | "google";

const userStore = useUserStore();
const oauthLoading = ref(false);

// 处理第三方登录
const handleOAuthLogin = async (provider: OAuthProvider) => {
  try {
    oauthLoading.value = true;

    // 打开新窗口进行OAuth认证
    const authWindow = window.open(
      `${import.meta.env.VITE_API_BASE}/auth/${provider}`,
      "_blank",
      "width=600,height=800"
    );

    // 监听消息（后端需要在认证成功后发送消息）
    window.addEventListener(
      "message",
      async (event) => {
        if (event.origin !== import.meta.env.VITE_API_BASE) return;

        const { token, user } = event.data;
        if (token && user) {
          await userStore.handleOAuthCallback({ token, user });
          authWindow?.close();
          ElMessage.success(`${provider}登录成功`);
        }
      },
      { once: true }
    );
  } catch (error:any) {
    ElMessage.error(`第三方登录失败: ${error.message}`);
  } finally {
    oauthLoading.value = false;
  }
};
</script>
<style scoped lang="less">
.third-party-login {
  margin-top: 20px;
  text-align: center;

  .oauth-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;

    .el-button {
      font-size: 24px;
      padding: 12px;

      &.github-btn {
        background: #24292e;
        border-color: #24292e;
        &:hover {
          background: #2d3339;
        }
      }

      &.wechat-btn {
        background: #07c160;
        border-color: #07c160;
        &:hover {
          background: #06ad56;
        }
      }
    }
  }

  .oauth-loading {
    margin-top: 15px;
    color: var(--el-color-primary);
    .el-icon {
      animation: rotating 2s linear infinite;
      margin-right: 8px;
    }
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
