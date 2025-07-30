<template>
  <div class="login-wrapper">
    <div class="login-container animate-fade">
      <h2 class="title">Xác thực Email</h2>
      <p class="subtitle">Vui lòng nhập email và mã xác thực để tiếp tục</p>

      <form class="form" @submit.prevent="handleVerify">
        <label>Email<span class="required">*</span></label>
        <div class="input-group">
          <span class="input-icon">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </span>
          <input type="email" v-model="email" placeholder="Nhập email" />
        </div>

        <label>Mã xác thực<span class="required">*</span></label>
        <div class="input-group">
          <span class="input-icon">
            <font-awesome-icon :icon="['fas', 'key']" />
          </span>
          <input type="text" v-model="code" placeholder="Nhập mã xác thực" />
        </div>

        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Đang xác thực...' : 'Xác thực' }}
        </button>

        <p class="signup-text">
          Đã có tài khoản?
          <router-link to="/login">Quay lại đăng nhập</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'VerifyEmailPage',
  props: {
    defaultEmail: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      email: this.defaultEmail,
      code: '',
      loading: false,
      toast: useToast()
    };
  },
  methods: {
    async handleVerify() {
      if (!this.email || !this.code) {
        this.toast.error('Vui lòng nhập đầy đủ email và mã xác thực.');
        return;
      }

      this.loading = true;

      try {
        const res = await axios.post('/auth/verify-email', {
          email: this.email,
          code: this.code
        });

        if (res.data.success) {
          this.toast.success(res.data.message || 'Xác thực thành công!');
          this.$router.push('/login');
        } else {
          this.toast.error(res.data.message || 'Xác thực thất bại!');
        }
      } catch (err) {
        const msg = err.response?.data?.message || 'Đã xảy ra lỗi.';
        this.toast.error(msg);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>

.login-wrapper {
  background: linear-gradient(to bottom right, #e3eafc, #f9fafe);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  max-width: 480px;
  width: 100%;
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2b3f91;
}

.subtitle {
  margin-bottom: 1.5rem;
  color: #666;
}

.form label {
  display: block;
  margin-top: 1rem;
  font-weight: 500;
  color: #333;
}

.required {
  color: red;
  margin-left: 2px;
}

.input-group {
  position: relative;
  margin-top: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #4257b2;
  outline: none;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
}

.btn {
  width: 100%;
  background-color: #4257b2;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-text {
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
}

.signup-text a {
  color: #4257b2;
  font-weight: bold;
  text-decoration: underline;
}

.signup-text a:hover {
  color: #2b6cb0;
}
</style>