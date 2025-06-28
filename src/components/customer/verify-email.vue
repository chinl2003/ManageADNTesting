<template>
    <div class="modal-overlay">
        <div class="modal">
            <button class="modal-close" @click="$emit('close')">×</button>
            <h2 class="modal-title">Vui lòng xác thực Email</h2>
            <div class="modal-body">
                <label for="email">Email<span class="required">*</span></label>
                <input type="email" id="email" v-model="email" placeholder="Nhập email" />

                <label for="code">Mã xác thực<span class="required">*</span></label>
                <input type="text" id="code" v-model="code" placeholder="Nhập mã xác thực" />

                <button :disabled="loading" class="btn" @click="handleVerify">
                    {{ loading ? 'Đang xác thực...' : 'Xác thực' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import { useToast } from 'vue-toastification';

export default {
    name: 'RegisterModal',
    props: {
        defaultEmail: String
    },
    emits: ['close'],
    setup() {
        const toast = useToast();
        return { toast };
    },
    data() {
        return {
            email: this.defaultEmail || '',
            code: '',
            loading: false
        };
    },
    watch: {
        defaultEmail(newEmail) {
            this.email = newEmail;
        }
    },
    methods: {
        handleVerify() {
            if (!this.email || !this.code) {
                this.toast.error('Vui lòng nhập đầy đủ email và mã xác thực.');
                return;
            }

            this.loading = true;

            axios
                .post('/auth/verify-email', {
                    email: this.email,
                    code: this.code
                })
                .then((res) => {
                    if (res.data.success) {
                        this.toast.success(res.data.message || 'Xác thực thành công!');
                        this.$emit('close');
                        this.$router.push('/login');
                    } else {
                        this.toast.error(res.data.message || 'Xác thực thất bại!');
                    }
                })
                .catch((err) => {
                    const msg = err.response?.data?.message || 'Đã xảy ra lỗi.';
                    this.toast.error(msg);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.btn:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
}

.modal {
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
}

.modal-close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    transition: color 0.3s;
}

.modal-close:hover {
    color: #000;
}

.modal-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #666;
    text-align: center;
}

.modal-body label {
    display: block;
    margin: 0.5rem 0 0.25rem;
    color: #666;
}

.modal-body input {
    width: 94%;
    padding: 0.75rem;
    margin-top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s;
    margin-bottom: 0.25rem;
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

.btn[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

.modal-body input:focus {
    border-color: #4257b2;
    outline: none;
}

.required {
    color: red;
    margin-left: 4px;
}
</style>
