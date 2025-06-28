<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn" @click="closeModal">×</button>
            <h2 class="title">Thêm dịch vụ</h2>

            <form @submit.prevent="validateForm">
                <div class="form-scroll">
                    <div class="form-group">
                        <label for="name">Tên dịch vụ <span class="required">*</span></label>
                        <input v-model="form.name" id="name" type="text" placeholder="Nhập tên dịch vụ" class="input-control" />
                        <div class="error" v-if="errors.name">{{ errors.name }}</div>
                    </div>

                    <div class="form-group">
                        <label for="description">Mô tả</label>
                        <textarea v-model="form.description" id="description" placeholder="Nhập mô tả" class="input-control"></textarea>
                    </div>

                    <div class="form-group">
                        <label>Trạng thái <span class="required">*</span></label>
                        <div class="gender-options">
                            <label v-for="opt in statusOptions()" :key="opt.value">
                                <input type="radio" v-model="form.status" :value="opt.value" /> {{ opt.label }}
                            </label>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-register">Tạo mới</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import { toastSuccess, toastError } from '@/utils/toast';
import { StatusEnum } from '@/enums/status';

export default {
    props: ['show'],
    emits: ['close'],
    data() {
        return {
            form: {
                name: '',
                description: '',
                status: ''
            },
            errors: {}
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        validateForm() {
            this.errors = {};
            const f = this.form;

            if (!f.name) this.errors.name = 'Vui lòng nhập tên dịch vụ.';
            if (!f.status) this.errors.status = 'Vui lòng chọn trạng thái.';

            if (Object.keys(this.errors).length === 0) {
                this.submitForm();
            }
        },
        submitForm() {
            axios.post('/services', this.form)
                .then(response => {
                    if (response.data.success) {
                        toastSuccess(response.data.message || 'Tạo dịch vụ thành công!');
                        this.closeModal();
                    } else {
                        toastError(response.data.message || 'Tạo dịch vụ thất bại!');
                    }
                })
        },
        statusOptions() {
            return Object.entries(StatusEnum).map(([key, value]) => ({
                value: key,
                label: value
            }));
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
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
    width: 100%;
    box-sizing: border-box;
}
textarea.input-control {
    height: auto;
    min-height: 80px;
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
