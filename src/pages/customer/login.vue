<template>
  <div class="login-wrapper">
    <div class="login-container animate-fade">
      <h2 class="title">Đăng nhập</h2>
      <p class="subtitle">MATAP chào mừng bạn trở lại!</p>

      <form class="form" @submit.prevent="handleLogin">
        <label>Email<span class="required">*</span></label>
        <div class="input-group">
          <span class="input-icon">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </span>
          <input type="text" v-model="form.email" placeholder="Vui lòng nhập email" />
        </div>

        <label>Mật khẩu<span class="required">*</span></label>
        <div class="input-group">
          <span class="input-icon">
            <font-awesome-icon :icon="['fas', 'lock']" />
          </span>
          <input type="password" v-model="form.password" placeholder="Vui lòng nhập mật khẩu" />
        </div>

        <div class="options">
          <a class="forgot">Quên mật khẩu?</a>
        </div>

        <button type="submit" class="btn" :disabled="loading">
          Đăng nhập
        </button>

        <p class="signup-text">
          Bạn chưa có tài khoản?
          <router-link to="/register">Đăng kí ngay</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import { authState } from '@/store/auth';
import { toastSuccess, toastError, toastWarning } from '@/utils/toast';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      if (!this.form.email || !this.form.password) {
        toastError('Vui lòng nhập đầy đủ email và mật khẩu');
        return;
      }

      this.loading = true;

      try {
        const response = await axios.post('/auth/login', {
          email: this.form.email,
          password: this.form.password
        });

        if (response.data.success) {
          const token = response.data.data;
          const payload = this.parseJwt(token);

          const expiresAt = payload.exp * 1000;
          const now = Date.now();

          const fullNameEncoded = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
          const fullName = decodeURIComponent(fullNameEncoded);
          const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '';

          localStorage.setItem('token', token);
          localStorage.setItem('userFullName', fullName);
          localStorage.setItem('userRole', role);
          localStorage.setItem('loginTime', Date.now().toString());
          localStorage.setItem('expiresAt', expiresAt);
          authState.fullName = fullName;
          authState.role = role;
          authState.token = token;

          setTimeout(() => {
            this.logout();
          }, expiresAt - now);

          toastSuccess('Đăng nhập thành công!');
          this.$router.push(role === 'Customer' ? '/' : '/admin');
        } else {
          toastError(response.data.message || 'Đăng nhập thất bại!');
        }
      } catch (err) {
        toastError(err.response?.data?.message || 'Đã xảy ra lỗi khi đăng nhập.');
      } finally {
        this.loading = false;
      }
    },
    logout() {
      localStorage.clear();
      toastWarning('Phiên đăng nhập đã hết hạn');
      this.$router.push('/login');
    },
    parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    }
  }
};
</script>

<style scoped>
.btn:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

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
  border-top-left-radius: 8px !important;
  border-bottom-left-radius: 8px !important;
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

.options {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
  font-size: 0.875rem;
}

.forgot {
  color: #718096;
  text-decoration: underline;
  cursor: pointer;
}

.forgot:hover {
  color: #2b6cb0;
}

.btn {
  width: 100%;
  background-color: #4257b2;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2b3f91;
}

.signup-text {
  font-size: 0.875rem;
  text-align: center;
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
