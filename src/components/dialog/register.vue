<template>
  <el-dialog
    v-model="showDialog"
    title="用户注册"
    width="400px"
    :close-on-click-modal="false"
  >
    <el-form
      ref="registerFormRef"
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

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
      </el-form-item>
    </el-form>

    <!-- 返回登录链接 -->
    <div class="back-to-login">
      <el-link type="primary" @click="emit('open-login')"
        >已有账号？去登录</el-link
      >
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" :loading="isSubmitting" @click="handleSubmit">
          注册
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useUserStore } from "@/stores/useUserStore";

// 表单类型定义
interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

// 组件状态
const isSubmitting = ref(false);
const registerFormRef = ref<FormInstance>();

// 表单数据
const form = reactive<RegisterForm>({
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
});

// 验证确认密码
const validateConfirmPassword = (_: any, value: string, callback: any) => {
  if (value !== form.password) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};
// 验证邮箱
const validateEmail = (_: any, value: string, callback: any) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (value === "") {
    callback(new Error("请输入邮箱地址"));
  } else if (!emailRegex.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback(); // 验证通过
  }
};

const rules = reactive<FormRules<RegisterForm>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { validator: validateConfirmPassword, trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { validator: validateEmail, trigger: "blur" },
  ],
});

// 打开弹窗方法（暴露给父组件）
const emit = defineEmits(["update:modelValue", "open-login"]);
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
  if (!registerFormRef.value) return;

  try {
    // 验证表单
    await registerFormRef.value.validate();
    isSubmitting.value = true;

    // 调用 Pinia action
    const userStore = useUserStore();
    await userStore.register({
      username: form.username,
      password: form.password,
      email: form.email,
    });

    // 注册成功处理
    ElMessage.success("注册成功，请登录");
    showDialog.value = false;
  } catch (error) {
    ElMessage.error((error as Error).message || "注册失败");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.back-to-login {
  text-align: right;
  margin-bottom: 10px;
}
.dialog-footer {
  text-align: right;
}
</style>
