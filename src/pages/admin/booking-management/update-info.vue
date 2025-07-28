<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <button class="close-btn" @click="closeModal">×</button>
            <h2 class="title">Cập nhật thông tin đơn hàng</h2>

            <div class="form-scroll">
                <div class="form-group">
                    <label>Trạng thái <span class="required">*</span></label>
                    <multiselect v-model="form.status" :options="statusOptions" placeholder="Chọn trạng thái"
                        label="label" track-by="value" class="custom-multiselect" />
                    <div class="error" v-if="errors.status">{{ errors.status }}</div>
                </div>

                <div class="form-group">
                    <label>Ghi chú</label>
                    <input type="text" v-model="form.note" placeholder="Nhập ghi chú" class="input-control" />
                </div>

                <button type="button" class="btn btn-register" @click="submitUpdate">
                    <font-awesome-icon icon="rotate" class="me-2" />
                    Cập nhật
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { BookingStatus } from '@/enums/enum'
import { toastSuccess, toastError } from '@/utils/toast'
import axios from '@/utils/axios';

export default {
    components: { Multiselect },
    props: {
        show: Boolean,
        bookingId: {
            type: Number,
            required: true
        }
    },
    emits: ['close', 'updated'],
    data() {
        return {
            form: {
                status: null,
                note: '',
            },
            statusOptions: [],
            errors: {},
        }
    },
    watch: {
        booking: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.form.status = this.statusOptions.find(
                        (opt) => opt.value === val.status
                    )
                    this.form.note = val.note || ''
                }
            },
        },
    },
    created() {
        this.statusOptions = this.generateStatusOptions()
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        generateStatusOptions() {
            const options = []
            for (const key in BookingStatus) {
                if (!isNaN(key)) {
                    options.push({
                        value: Number(key),
                        label: BookingStatus[key],
                    })
                }
            }
            return options.slice(3);
        },
        submitUpdate() {
            this.errors = {};

            if (!this.form.status) {
                this.errors.status = 'Vui lòng chọn trạng thái.';
                return;
            }

            const payload = {
                bookingId: this.bookingId,
                status: this.form.status.value,
                note: this.form.note,
            };

            axios
                .post('/bookings/update-booking', payload)
                .then((res) => {

                    if (res.status === 200) {
                        toastSuccess(res.data || 'Cập nhật thành công');
                        this.$emit('updated');
                        this.closeModal();
                    } else {
                        toastError('Cập nhật thất bại');
                    }
                })
                .catch((err) => {
                    console.error('API Error:', err);
                    const message =
                        err.response?.data?.message ||
                        err.response?.data?.title ||
                        'Lỗi khi cập nhật';
                    toastError(message);
                }).finally(() => {
                    this.closeModal();
                });
        }
    },
}
</script>

<style scoped>
@import "vue-multiselect/dist/vue-multiselect.min.css";

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

.title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2b3f91;
    margin-bottom: 1rem;
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
    background-color: #4257b2;
    color: white;
    width: 100%;
    padding: 0.6rem;
    border: none;
    border-radius: 5px;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-register:hover {
    background-color: #5a6dc4;
    color: white;
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
    background-color: #4257b2 !important;
    color: white !important;
}

:deep(.multiselect__option--selected::after),
:deep(.multiselect__option--selected::before),
:deep(.multiselect__option::after) {
    display: none !important;
    content: none !important;
}

.custom-multiselect {
    width: 100%;
}

.input-control:focus {
    outline: none;
    border-color: #4257b2;
    box-shadow: 0 0 0 2px rgba(66, 87, 178, 0.2);
}
</style>
