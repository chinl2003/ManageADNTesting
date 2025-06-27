<template>
  <div class="register-wrapper">
    <div class="register-container animate-fade">
      <div class="left-panel">
        <h2 class="title">Tạo tài khoản</h2>
        <p class="subtitle">Truy cập mọi tính năng, hoàn toàn miễn phí.</p>

        <form class="form" @submit.prevent="handleSubmit">
          <label>Họ và tên<span class="required">*</span></label>
          <input type="text" v-model="form.fullName" placeholder="Vui lòng nhập họ và tên" />
          <p v-if="errors.fullName" class="input-error">{{ errors.fullName }}</p>

          <label>Số điện thoại<span class="required">*</span></label>
          <input type="tel" v-model="form.phone" placeholder="Vui lòng nhập số điện thoại" />
          <p v-if="errors.phone" class="input-error">{{ errors.phone }}</p>

          <label>Email<span class="required">*</span></label>
          <input type="email" v-model="form.email" placeholder="Vui lòng nhập email" />
          <p v-if="errors.email" class="input-error">{{ errors.email }}</p>

          <label>Địa chỉ<span class="required">*</span></label>
          <input type="text" v-model="form.address" placeholder="Vui lòng nhập địa chỉ" />
          <p v-if="errors.address" class="input-error">{{ errors.address }}</p>

          <label>Giới tính<span class="required">*</span></label>
          <div class="gender-group">
            <label><input type="radio" value="Nam" v-model="form.gender" /> Nam</label>
            <label><input type="radio" value="Nữ" v-model="form.gender" /> Nữ</label>
            <label><input type="radio" value="Khác" v-model="form.gender" /> Giới tính khác</label>
          </div>
          <p v-if="errors.gender" class="input-error">{{ errors.gender }}</p>

          <label>Ngày sinh<span class="required">*</span></label>
          <input type="date" v-model="form.dob" />
          <p v-if="errors.dob" class="input-error">{{ errors.dob }}</p>

          <label>Mật khẩu<span class="required">*</span></label>
          <input type="password" v-model="form.password" placeholder="Vui lòng nhập mật khẩu" />
          <p v-if="errors.password" class="input-error">{{ errors.password }}</p>

          <label>Xác nhận mật khẩu<span class="required">*</span></label>
          <input type="password" v-model="form.confirmPassword" placeholder="Vui lòng xác nhận mật khẩu"
            oncopy="return false" onpaste="return false" oncut="return false" />
          <p v-if="errors.confirmPassword" class="input-error">{{ errors.confirmPassword }}</p>

          <div class="checkbox-group">
            <input type="checkbox" id="agree" v-model="form.agree" />
            <label for="agree" class="checkbox-label">
              Đồng ý với <a href="#">điều khoản</a> và <a href="#">chính sách</a> của chúng tôi
            </label>
          </div>

          <button type="submit" class="btn" :disabled="isSubmitting">Đăng ký</button>
        </form>
      </div>

      <div class="right-panel">
        <h3>Sử dụng mạng xã hội</h3>
        <button class="social google">Đăng ký bằng Google</button>
      </div>
    </div>
    <Teleport to="body">
      <VerifyEmail v-if="showModal" :visible="showModal" @close="showModal = false" :default-email="form.email" />
    </Teleport>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import { useToast } from 'vue-toastification';
import VerifyEmail from '@/components/customer/verify-email.vue';
export default {
  components: {
    VerifyEmail,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      form: {
        fullName: '',
        phone: '',
        email: '',
        address: '',
        gender: '',
        dob: '',
        password: '',
        confirmPassword: '',
        agree: false,
      },
      errors: {},
      isSubmitting: false,
      showModal: false,
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.form.fullName) {
        this.errors.fullName = 'Vui lòng nhập họ và tên';
      }

      if (!this.form.phone) {
        this.errors.phone = 'Vui lòng nhập số điện thoại';
      } else if (!/^\d{10}$/.test(this.form.phone)) {
        this.errors.phone = 'Vui lòng nhập đúng 10 chữ số';
      }

      if (!this.form.email) {
        this.errors.email = 'Vui lòng nhập email';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Vui lòng nhập đúng định dạng email';
      }

      if (!this.form.address) {
        this.errors.address = 'Vui lòng nhập địa chỉ';
      }

      if (!this.form.gender) {
        this.errors.gender = 'Vui lòng chọn giới tính';
      }

      const today = new Date().toISOString().split('T')[0];
      if (!this.form.dob) {
        this.errors.dob = 'Vui lòng nhập ngày sinh';
      } else if (this.form.dob >= today) {
        this.errors.dob = 'Vui lòng chọn ngày sinh trong quá khứ';
      }

      if (!this.form.password) {
        this.errors.password = 'Vui lòng nhập mật khẩu';
      } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.form.password)
      ) {
        this.errors.password = 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ, số, ký tự đặc biệt';
      }

      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      } else if (this.form.confirmPassword !== this.form.password) {
        this.errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }

      return Object.keys(this.errors).length === 0;
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },

    handleSubmit() {
      if (!this.validateForm()) return;
      this.isSubmitting = true;

      const payload = {
        email: this.form.email,
        password: this.form.password,
        fullName: this.form.fullName,
        phone: this.form.phone,
        address: this.form.address,
        gender: this.form.gender,
        dateOfBirth: this.formatDate(this.form.dob),
      };

      axios
        .post('/auth/register', payload)
        .then((response) => {
          if (response.data.success) {
            this.toast.success(response.data.message || 'Đăng ký thành công!');
            this.showModal = true;
          } else {
            this.toast.error(response.data.message || 'Đăng ký thất bại!');
          }
        })
        .catch((error) => {
          const message =
            error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.';
          this.toast.error(message);
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    }
  },
};
</script>

<style scoped>
.btn:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

.input-error {
  font-size: 0.75rem;
  color: red;
  font-style: italic;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
}

.gender-group {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 1rem 0;
}

.gender-group label {
  font-weight: normal;
  color: #444;
}

.register-wrapper {
  background: linear-gradient(to bottom right, #e3eafc, #f9fafe);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.register-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 960px;
  width: 100%;
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.6s ease-in-out;
  gap: 2rem;
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

.left-panel,
.right-panel {
  flex: 1 1 400px;
}

.right-panel {
  margin-top: 10%;
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

/* --- Form --- */
.form label {
  display: block;
  font-weight: 500;
  color: #666;
  /* margin-bottom: 0.5rem; */
}

.required {
  color: red;
  margin-left: 4px;
}

.form input[type="text"],
.form input[type="email"],
.form input[type="password"],
.form input[type="tel"],
.form input[type="date"] {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
  margin-bottom: 0.25rem;
}

.form input:focus {
  border-color: #4257b2;
  outline: none;
}

/* --- Checkbox --- */
.checkbox-group {
  display: flex;
  align-items: center;
  /* căn giữa theo chiều dọc */
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.checkbox-group input[type="checkbox"] {
  transform: translateY(1px);
  /* tùy chỉnh để checkbox ngang hàng */
}

.checkbox-label {
  font-size: 0.875rem;
  color: #555;
}

.checkbox-label a {
  color: #4257b2;
  text-decoration: underline;
}

.checkbox-label a:hover {
  color: #2b6cb0;
}

/* --- Button --- */
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

.btn:hover {
  background-color: #2b3f91;
}

/* --- Link login --- */
.login-link {
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
}

.login-link a {
  color: #4257b2;
  font-weight: bold;
  text-decoration: underline;
}

.login-link a:hover {
  color: #2b6cb0;
}

/* --- Right side (Socials) --- */
.right-panel h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.social {
  display: block;
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.social:hover {
  background-color: #f0f0f0;
}

.google {
  color: #db4437;
}

.facebook {
  color: #1877f2;
}

.amazon {
  color: #000;
}

.business-link {
  font-size: 0.875rem;
  margin-top: 1.25rem;
}

.business-link a {
  color: #4257b2;
  text-decoration: underline;
}

.business-link a:hover {
  color: #2b6cb0;
}
</style>