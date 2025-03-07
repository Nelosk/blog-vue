<template>
  <el-dialog
    v-model="showDialog"
    title="用户登录"
    width="400px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="loginFormRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          show-password
          clearable
        />
      </el-form-item>
    </el-form>

    <!-- 注册链接 -->
    <div class="register-link">
      <el-link type="primary" @click="emit('open-register')">没有账号？请注册</el-link>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" :loading="isSubmitting" @click="handleSubmit">
          登录
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive , computed} from "vue";
import {
  ElMessage,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { useUserStore } from "@/stores/useUserStore";

// 表单类型定义
interface LoginForm {
  username: string;
  password: string;
}

// 组件状态
const isSubmitting = ref(false);
const loginFormRef = ref<FormInstance>();

// 表单数据
const form = reactive<LoginForm>({
  username: "",
  password: "",
});

// 验证规则
const rules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
});

// 打开弹窗方法（暴露给父组件）
const emit = defineEmits(["update:modelValue", "open-register"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const showDialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// 提交处理
const handleSubmit = async () => {
  if (!loginFormRef.value) return;

  try {
    // 验证表单
    await loginFormRef.value.validate();
    isSubmitting.value = true;

    // 调用 Pinia action
    const userStore = useUserStore();
    await userStore.login({
      username: form.username,
      password: form.password,
    });

    // 登录成功处理
    ElMessage.success("登录成功");
    showDialog.value = false;
  } catch (error) {
    ElMessage.error((error as Error).message || "登录失败");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.register-link {
  text-align: right;
  margin-bottom: 10px;
}
.dialog-footer {
  text-align: right;
}
</style>