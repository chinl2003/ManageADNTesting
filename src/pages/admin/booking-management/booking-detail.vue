<template>
    <div class="modal-backdrop">
        <div class="modal-container">
            <div class="modal-header">
                <h5 class="modal-title">Thông tin chi tiết</h5>
                <button class="close-btn" @click="$emit('close')">&times;</button>
            </div>

            <div v-if="isLoading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status"></div>
            </div>

            <div class="modal-body row" v-if="order">

                <div class="col-md-6">
                    <div class="info-box">
                        <h6 class="section-title">Thông tin đơn hàng</h6>
                        <p><strong>Mã đơn hàng:</strong> ĐH{{ order.id }}</p>
                        <p><strong>Loại xét nghiệm:</strong> {{ order.isCivil ? 'Dân sự' : 'Hành chính' }}</p>
                        <p><strong>Loại dịch vụ:</strong> {{ order.serviceName }}</p>
                        <p><strong>Phương thức lấy mẫu:</strong> {{ getSampleMethodLabel(order.sampleMethod) }}</p>
                        <p><strong>Thời gian nhận kết quả:</strong> {{ getResultTimeLabel(order.resultTime) }}</p>
                        <p v-if="order.appointmentTime"><strong>Ngày thu mẫu:</strong> {{ order.appointmentTime }}</p>
                        <p v-if="order.sampleCollector"><strong>Người thu mẫu:</strong> {{ order.sampleCollector }}</p>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="info-box">
                        <h6 class="section-title">Thông tin khách hàng</h6>
                        <p><strong>Họ và tên:</strong> {{ order.customerFullName }}</p>
                        <p><strong>Email:</strong> {{ order.customerEmail || 'N/A' }}</p>
                        <p><strong>Số điện thoại:</strong> {{ order.customerPhone || 'N/A' }}</p>
                        <p><strong>Địa chỉ:</strong> {{ order.customerAddress || 'N/A' }}</p>
                        <p><strong>Giới tính:</strong> {{ order.customerGender || 'N/A' }}</p>
                        <p><strong>Ngày sinh:</strong> {{ order.customerDob || 'N/A' }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import { ResultTimeType, SampleMethod, getEnumLabel } from '@/enums/enum';

export default {
    props: {
        bookingId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            isLoading: false,
            order: null,
        };
    },
    mounted() {
        this.fetchBooking();
    },
    methods: {
        async fetchBooking() {
            this.isLoading = true;
            try {
                const res = await axios.get('/bookings/get-list', {
                    params: {
                        bookingId: this.bookingId,
                        IsAll: true,
                    },
                });
                console.log("res", res)
                if (res.data.success && res.data.data.items.length > 0) {
                    const b = res.data.data.items[0];
                    this.order = b;
                } else {
                    this.order = null;
                }
            } catch (err) {
                console.error('Lỗi khi gọi API chi tiết đơn hàng:', err);
                this.order = null;
            } finally {
                this.isLoading = false;
            }
        },
        getSampleMethodLabel(value) {
            return getEnumLabel(SampleMethod, value);
        },
        getResultTimeLabel(value) {
            return getEnumLabel(ResultTimeType, value);
        },
        getStatusLabel(value) {
            return getEnumLabel(BookingStatus, value);
        },
    }
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-container {
    background: white;
    width: 90%;
    max-width: 900px;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    position: relative;
    font-family: 'Segoe UI', sans-serif;
    color: #000;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1.5rem;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: bold;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.8rem;
    font-weight: bold;
    color: #000;
    cursor: pointer;
}

.modal-body {
    display: flex;
    flex-wrap: nowrap;
}

.modal-body .col-md-6 {
    flex: 1 1 50%;
    min-width: 0;
}

.modal-body p {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: #000;
}

.modal-body p strong {
    width: 160px;
    display: inline-block;
    font-weight: 600;
}

.info-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 1rem;
    background-color: #fafafa;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.03);
}

.section-title {
    background-color: #f0f0f0;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: #000;
}
</style>
