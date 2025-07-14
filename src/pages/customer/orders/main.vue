<template>
  <div class="order-list">

    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else>

      <div class="row fw-semibold border-bottom">
        <div class="col">Mã đơn hàng</div>
        <div class="col">Loại xét nghiệm</div>
        <div class="col">Loại dịch vụ</div>
        <div class="col">Phương thức lấy mẫu</div>
        <div class="col">Thời gian nhận kết quả</div>
        <div class="col">Tổng tiền</div>
        <div class="col">Ngày thu mẫu</div>
        <div class="col">Ngày đặt</div>
        <div class="col">Trạng thái</div>
        <div class="col text-center"></div>
      </div>

      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.id" class="row content py-2 border-bottom align-items-center">
          <div class="col">{{ order.code }}</div>
          <div class="col">{{ order.isCivil ? 'Dân sự' : 'Hành chính' }}</div>
          <div class="col">{{ order.serviceName }}</div>
          <div class="col">{{ getSampleMethodLabel(order.sampleMethod) }}</div>
          <div class="col">{{ getResultTimeLabel(order.resultTime) }}</div>
          <div class="col">{{ formatCurrency(order.totalPrice) }}</div>
          <div class="col">{{ order.sampleDate || '-' }}</div>
          <div class="col">{{ order.bookingDate }}</div>
          <div class="col">{{ getStatusLabel(order.status) }}</div>
          <div class="col text-center">
            <button class="btn btn-sm btn-outline-primary me-1" :disabled="order.status !== 0"
              :class="{ 'disabled-btn': order.status !== 0 }" title="Chỉnh sửa" @click="openEditModal(order)">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger me-1" :disabled="order.status !== 0"
              :class="{ 'disabled-btn': order.status !== 0 }" title="Hủy đơn hàng" @click="deleteOrder(order.id)">
              <i class="bi bi-x-circle"></i>
            </button>
            <button class="btn btn-sm btn-outline-success" :disabled="order.status !== 0"
              :class="{ 'disabled-btn': order.status !== 0 }" title="Thanh toán" @click="payOrder(order.id)">
              <i class="bi bi-credit-card"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="row py-4 content text-center text-muted">
        <div class="col">Không có dữ liệu</div>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-3">
      <Paginate :total-items="totalItems" :items-per-page="pageSize" v-model:current-page="currentPage" />
    </div>
    <Teleport to="body">
      <BookingModal :show="showEditModal" :edit-data="selectedOrder" @close="onModalClose" @updated="onOrderUpdated" />
      <PaymentModal :show="showPaymentModal" :order="selectedPaymentOrder" @close="showPaymentModal = false"
        @confirm="onPaymentConfirmed" />
    </Teleport>
  </div>
</template>


<script>
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from '@/utils/axios';
import BookingModal from './create.vue';
import PaymentModal from '../orders/payment-result.vue';
import {
  ResultTimeType,
  SampleMethod,
  BookingStatus,
  getEnumLabel,
} from '@/enums/enum';
import Paginate from '@/components/common/paginate.vue';
import { toastError, toastSuccess } from '@/utils/toast';
import Swal from 'sweetalert2';

export default {
  props: {
    filterStatus: [String, Number],
  },
  components: { Paginate, BookingModal, PaymentModal },
  data() {
    return {
      orders: [],
      currentPage: 1,
      pageSize: 20,
      totalItems: 0,
      isLoading: false,
      selectedOrder: null,
      showEditModal: false,
      selectedPaymentOrder: null,
      showPaymentModal: false,
    };
  },
  watch: {
    currentPage() {
      this.fetchOrders();
    },
    filterStatus() {
      this.currentPage = 1;
      this.fetchOrders();
    },
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      this.isLoading = true;
      axios
        .get('/bookings/get-list', {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            status: this.filterStatus || null,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.data.items;
            this.totalItems = res.data.data.totalItems;
          } else {
            this.orders = [];
            this.totalItems = 0;
          }
        })
        .catch((err) => {
          console.error('Lỗi khi gọi API lấy đơn hàng:', err);
          this.orders = [];
          this.totalItems = 0;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      }).format(value);
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
    openEditModal(order) {
      this.selectedOrder = order;
      this.showEditModal = true;
    },
    onModalClose() {
      this.showEditModal = false;
      this.selectedOrder = null;
    },
    onOrderUpdated() {
      this.fetchOrders();
    },
    deleteOrder(orderId) {
      Swal.fire({
        title: 'Xác nhận hủy đơn hàng?',
        text: 'Bạn sẽ không thể hoàn tác thao tác này!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Không',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`/bookings/${orderId}`)
            .then(res => {
              if (res.data.success) {
                toastSuccess(res.data.message || 'Đơn hàng đã được hủy thành công!');
                this.fetchOrders();
              } else {
                toastError(res.data.message || 'Không thể hủy đơn hàng.');
              }
            })
            .catch(() => {
              toastError('Lỗi khi gửi yêu cầu hủy đơn hàng.');
            });
        }
      });
    },
    payOrder(orderId) {
      this.selectedPaymentOrder = this.orders.find(o => o.id === orderId);
      this.showPaymentModal = true;
    },
    onPaymentConfirmed({ method, bank, amount }) {
      this.isLoading = true;
      axios
        .get(`/bookings/${this.selectedPaymentOrder.id}/create-payment-url`, {
          params: {
            method,
            bank,
            amount,
          },
        })
        .then((res) => {
          if (res.data.success) {
            toastSuccess(res.data.message || 'Thanh toán thành công!');
            this.fetchOrders();
          } else {
            toastError(res.data.message || 'Thanh toán thất bại!');
          }
        })
        .catch(() => {
          toastError('Quá trình thanh toán xảy ra lỗi. Vui lòng thử lại sau.');
        })
        .finally(() => {
          this.isLoading = false;
          this.showPaymentModal = false;
        });
    }
  },
};
</script>

<style scoped>
.order-list {
  font-size: 0.95rem;
  color: #444;
}

.row>.col {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.row>.col.text-center {
  justify-content: center;
}

.fw-semibold {
  font-weight: 600;
  font-size: 1.05rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px 5px 0 0;
}

.content {
  border: 1px solid #ddd;
  border-radius: 0 0 5px 5px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.spinner-border.text-primary {
  color: #2b3f91 !important;
  width: 2.5rem;
  height: 2.5rem;
}

.no-data {
  text-align: center;
  font-style: italic;
  padding: 2rem;
  color: #888;
}

.action-btn.disabled-btn {
  opacity: 0.5;
  cursor: not-allowed !important;
}

button:disabled {
  cursor: not-allowed !important;
}
</style>