<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn" @click="closeModal">×</button>
            <h2 class="title">Tạo tài khoản</h2>

            <form @submit.prevent="validateForm">
                <div class="form-scroll">
                    <div class="form-group" v-for="(field, index) in fields" :key="index">
                        <label :for="field.id">
                            {{ field.label }}
                            <span v-if="field.required" class="required">*</span>
                        </label>

                        <select v-if="field.type === 'select'" v-model="form[field.id]" class="input-control"
                            :id="field.id">
                            <option disabled value="">-- {{ field.placeholder }} --</option>
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.name }}
                            </option>
                        </select>

                        <input v-else v-model="form[field.id]" :type="field.type" :placeholder="field.placeholder"
                            :id="field.id" class="input-control" />

                        <div class="error" v-if="errors[field.id]">
                            {{ errors[field.id] }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Giới tính<span class="required">*</span></label>
                        <div class="gender-options">
                            <label><input type="radio" v-model="form.gender" value="Nam" /> Nam</label>
                            <label><input type="radio" v-model="form.gender" value="Nữ" /> Nữ</label>
                            <label><input type="radio" v-model="form.gender" value="Khác" /> Khác</label>
                        </div>
                        <div class="error" v-if="errors.gender">{{ errors.gender }}</div>
                    </div>

                    <button type="submit" class="btn btn-register">Đăng ký</button>

                </div>

            </form>
        </div>
    </div>
</template>
<script>
import axios from '@/utils/axios';
import { toastSuccess, toastError } from '@/utils/toast';

export default {
    props: ['show'],
    emits: ['close'],
    data() {
        return {
            roles: [],
            form: {
                fullName: '',
                phone: '',
                email: '',
                address: '',
                dob: '',
                password: '',
                confirmPassword: '',
                gender: '',
                role: ''
            },
            errors: {},
            fields: [
                { id: 'fullName', label: 'Họ và tên', required: true, placeholder: 'Nhập họ và tên', type: 'text' },
                { id: 'phone', label: 'Số điện thoại', required: true, placeholder: 'Nhập số điện thoại', type: 'text' },
                { id: 'email', label: 'Email', required: true, placeholder: 'Nhập email', type: 'email' },
                { id: 'address', label: 'Địa chỉ', required: false, placeholder: 'Nhập địa chỉ', type: 'text' },
                { id: 'dob', label: 'Ngày sinh', required: true, placeholder: '', type: 'date' },
                { id: 'password', label: 'Mật khẩu', required: true, placeholder: 'Nhập mật khẩu', type: 'password' },
                { id: 'confirmPassword', label: 'Xác nhận mật khẩu', required: true, placeholder: 'Xác nhận mật khẩu', type: 'password' },
                { id: 'role', label: 'Vai trò', required: true, placeholder: 'Chọn vai trò', type: 'select' }
            ]
        };
    },
    mounted() {
        this.loadRoles();
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        loadRoles() {
            axios.get('/lookups/role')
                .then(response => {
                    if (response.data.success && Array.isArray(response.data.data)) {
                        this.roles = response.data.data.map(role => ({
                            id: role.value,
                            name: role.label
                        }));
                    } else {
                        console.error('Không thể tải danh sách vai trò:', response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi gọi API roles:', error);
                });
        },
        submitForm() {
            const payload = {
                email: this.form.email,
                password: this.form.password,
                fullName: this.form.fullName,
                phone: this.form.phone,
                address: this.form.address,
                gender: this.form.gender,
                dateOfBirth: this.formatDate(this.form.dob),
                role: this.form.role
            };

            axios.post('/users', payload)
                .then(response => {
                    if (response.data.success) {
                        toastSuccess(response.data.message || 'Tạo tài khoản thành công!');
                        this.closeModal();
                    } else {
                        toastError(response.data.message || 'Tạo tài khoản thất bại!');
                    }
                })
                .catch(error => {
                    const msg = error.response?.data?.message || 'Lỗi khi gửi yêu cầu!';
                    toastError(msg);
                });
        },

        formatDate(dateStr) {
            const d = new Date(dateStr);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        },
        validateForm() {
            this.errors = {};
            const f = this.form;

            if (!f.fullName) this.errors.fullName = 'Vui lòng nhập họ và tên.';
            if (!f.phone) this.errors.phone = 'Vui lòng nhập số điện thoại.';
            else if (!/^\d{10}$/.test(f.phone)) this.errors.phone = 'Số điện thoại phải đủ 10 chữ số.';
            if (!f.email) this.errors.email = 'Vui lòng nhập email.';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) this.errors.email = 'Email không hợp lệ.';
            if (!f.dob) this.errors.dob = 'Vui lòng chọn ngày sinh.';
            if (!f.password) this.errors.password = 'Vui lòng nhập mật khẩu.';
            else if (f.password.length < 8) this.errors.password = 'Mật khẩu phải có ít nhất 8 ký tự.';
            if (!f.confirmPassword) this.errors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
            else if (f.confirmPassword !== f.password) this.errors.confirmPassword = 'Mật khẩu không khớp.';
            if (!f.gender) this.errors.gender = 'Vui lòng chọn giới tính.';
            if (!f.role) this.errors.role = 'Vui lòng chọn vai trò.';

            if (Object.keys(this.errors).length === 0) {
                this.submitForm();
            }
        }

    }
};
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    width: 500px;
    max-height: 90vh;
    padding: 1.5rem;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.form-scroll {
    overflow-y: auto;
    max-height: 70vh;
    padding-right: 6px;
    scrollbar-width: none;
}

.form-scroll::-webkit-scrollbar {
    display: none;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.input-control {
    height: 40px;
    padding: 0.5rem;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
}

.gender-options {
    display: flex;
    gap: 1rem;
    margin-top: 0.25rem;
}

.required {
    color: red;
    margin-left: 2px;
}

.error {
    color: red;
    font-size: 13px;
    font-style: italic;
    margin-top: 2px;
}

.btn-register {
    background-color: #3f51b5;
    color: white;
    width: 100%;
    padding: 0.6rem;
    border: none;
    border-radius: 5px;
    margin-top: 1rem;
}

.close-btn {
    position: absolute;
    top: 8px;
    right: 10px;
    font-size: 1.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>
