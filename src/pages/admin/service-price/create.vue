<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn" @click="closeModal">×</button>
            <h2 class="title">Thêm giá dịch vụ</h2>

            <form @submit.prevent="validateForm">
                <div class="form-scroll">
                    <!-- Dịch vụ -->
                    <div class="form-group">
                        <label>Dịch vụ <span class="required">*</span></label>
                        <Multiselect v-model="form.service" :options="services" :searchable="true"
                            :close-on-select="true" :clear-on-select="false" :preserve-search="true"
                            placeholder="Chọn dịch vụ" label="name" track-by="id" class="input-vue">
                            <template #option="{ option }">
                                <div>{{ option.name }}</div>
                            </template>
                        </Multiselect>
                        <div class="error" v-if="errors.service">Vui lòng chọn dịch vụ.</div>
                    </div>

                    <!-- Thời gian trả kết quả -->
                    <div class="form-group">
                        <label>Thời gian trả kết quả <span class="required">*</span></label>
                        <Multiselect v-model="form.resultTime" :options="resultTimes"
                            placeholder="Chọn thời gian trả kết quả" label="label" track-by="value" class="input-vue">
                            <template #option="{ option }">
                                <div>{{ option.label }}</div>
                            </template>
                        </Multiselect>
                        <div class="error" v-if="errors.resultTime">Vui lòng chọn thời gian trả kết quả.</div>
                    </div>

                    <!-- Phương thức lấy mẫu -->
                    <div class="form-group">
                        <label>Phương thức lấy mẫu <span class="required">*</span></label>
                        <Multiselect v-model="form.sampleMethod" :options="sampleMethods"
                            placeholder="Chọn phương thức lấy mẫu" label="label" track-by="value" class="input-vue">
                            <template #option="{ option }">
                                <div>{{ option.label }}</div>
                            </template>
                        </Multiselect>
                        <div class="error" v-if="errors.sampleMethod">Vui lòng chọn phương thức lấy mẫu.</div>
                    </div>

                    <!-- Giá dịch vụ -->
                    <div class="form-group">
                        <label for="price">Giá dịch vụ <span class="required">*</span></label>
                        <input v-model="form.priceDisplay" id="price" type="text" placeholder="Nhập giá"
                            class="input-control" @input="formatPrice" />
                        <div class="error" v-if="errors.price">Vui lòng nhập giá hợp lệ.</div>
                    </div>

                    <!-- Ngày áp dụng -->
                    <div class="form-group">
                        <label for="appliedFrom">Áp dụng từ ngày <span class="required">*</span></label>
                        <input v-model="form.appliedFrom" id="appliedFrom" type="date" class="input-control" />
                        <div class="error" v-if="errors.appliedFrom">Vui lòng chọn ngày áp dụng.</div>
                    </div>

                    <button type="submit" class="btn btn-register">Tạo mới</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import axios from '@/utils/axios';
import { toastSuccess, toastError } from '@/utils/toast';

export default {
    components: { Multiselect },
    props: ['show'],
    emits: ['close'],
    data() {
        return {
            form: {
                service: null,
                resultTime: null,
                sampleMethod: null,
                price: null,
                priceDisplay: '',
                appliedFrom: ''
            },
            errors: {},
            services: [],
            resultTimes: [],
            sampleMethods: []
        };
    },
    mounted() {
        this.fetchOptions();
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        fetchOptions() {
            Promise.all([
                axios.get('/services/get-list-services'),
                axios.get('/lookups/result-times'),
                axios.get('/lookups/sample-methods')
            ])
                .then(([res1, res2, res3]) => {
                    this.services = res1.data.data?.items || [];
                    this.resultTimes = res2.data.data || [];
                    this.sampleMethods = res3.data.data || [];
                })
                .catch(() => {
                    toastError('Lỗi khi tải dữ liệu chọn lọc!');
                });
        },
        formatPrice(e) {
            let rawValue = e.target.value.replace(/[^0-9]/g, '');
            const number = parseInt(rawValue, 10);
            if (!isNaN(number)) {
                this.form.price = number;
                this.form.priceDisplay = number.toLocaleString('en-US');
            } else {
                this.form.price = null;
                this.form.priceDisplay = '';
            }
        },
        validateForm() {
            const f = this.form;
            this.errors = {};

            if (!f.service) this.errors.service = true;
            if (!f.resultTime) this.errors.resultTime = true;
            if (!f.sampleMethod) this.errors.sampleMethod = true;
            if (!f.price || f.price < 0) this.errors.price = true;
            if (!f.appliedFrom) this.errors.appliedFrom = true;

            if (Object.keys(this.errors).length === 0) {
                this.submitForm();
            }
        },
        submitForm() {
            axios
                .post(`/services/${this.form.service.id}/prices`, {
                    resultTimeType: this.form.resultTime.value,
                    sampleMethod: this.form.sampleMethod.value,
                    price: this.form.price,
                    appliedFrom: this.form.appliedFrom,
                    isCivil: true
                })
                .then((response) => {
                    if (response.data.success) {
                        toastSuccess('Thêm giá cho dịch vụ thành công!');
                        this.closeModal();
                    } else {
                        toastError(response.data.message || 'Thêm giá thất bại!');
                    }
                })
                .catch(() => {
                    toastError('Lỗi trong quá trình gửi dữ liệu!');
                });
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

.input-vue {
    font-size: 14px;
    border-radius: 4px;
}

.input-control {
    padding: 0.5rem;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.required {
    color: red;
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

:deep(.multiselect__option--highlight) {
    background-color: #1c2260 !important;
    color: white !important;
}

:deep(.multiselect__option--selected::after) {
    display: none !important;
    content: none !important;
}

:deep(.multiselect__option--selected::before) {
    display: none !important;
    content: none !important;
}

:deep(.multiselect__option::after) {
    display: none !important;
    content: none !important;
}
</style>
