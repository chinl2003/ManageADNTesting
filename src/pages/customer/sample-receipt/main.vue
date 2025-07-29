<template>
  <div class="transaction-list">

    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else>

      <div class="row fw-semibold border-bottom">
        <div class="col">STT</div>
        <div class="col">Mã phiếu thu mẫu</div>
        <div class="col">Khách hàng</div>
        <div class="col">Trạng thái phiếu</div>
        <div class="col">Ngày tạo</div>
        <div class="col"></div>
      </div>

      <div v-if="bookings.length > 0">
        <div v-for="(tx, index) in bookings" :key="tx.id" class="row content py-2 border-bottom align-items-center">
          <div class="col">{{ index + 1 }}</div>
          <div class="col cursor-pointer text-primary text-decoration-underline" @click="openDetail(tx.id)">
            {{ tx.code }}
          </div>
          <div class="col">{{ tx.customerFullName }}</div>
          <div class="col">{{ getStatusLabel(tx.status) }}</div>
          <div class="col">{{ formatDate(tx.createdAt) }}</div>
          <div class="col">
            <button
                class="btn btn-sm btn-success"
                @click="openConfirmModal(tx.id)"
                title="Xác nhận"
                :disabled="tx.status === 1"
                >
                <font-awesome-icon icon="check" />
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
      <DetailModal v-if="showDetail" :sampleReceiptId="selectedSampleReceiptId" @close="showDetail = false" />
      <ConfirmModal
            v-if="showConfirmModal"
            :sampleReceiptId="selectedSampleReceiptId"
            @close="showConfirmModal = false"
            @success="handleConfirmSuccess"
        />
    </Teleport>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import Paginate from '@/components/common/paginate.vue';
import { SampleReceiptStatus, getEnumLabel } from '@/enums/enum';
import Multiselect from 'vue-multiselect';
import { toastSuccess, toastError } from '@/utils/toast'
import DetailModal from './detail.vue';
import { authState } from '@/store/auth';
import ConfirmModal from './confirm.vue';

export default {
  props: {
    filterStatus: [String, Number],
  },
  components: { Paginate, Multiselect, DetailModal, ConfirmModal },
  data() {
    return {
      bookings: [],
      currentPage: 1,
      pageSize: 20,
      totalItems: 0,
      isLoading: false,
      statusOptions: [],
      showUpdateModal: false,
      selectedSampleReceiptId: null,
      showDetail: false,
      showConfirmModal: false,
      selectedSampleReceiptId: null,
    };
  },
  watch: {
    currentPage() {
      this.fetchSampleReceipt();
    },
    filterStatus() {
      this.currentPage = 1;
      this.fetchSampleReceipt();
    },
  },
  mounted() {
    this.fetchSampleReceipt();
  },
  methods: {
    openConfirmModal(id) {
        this.selectedSampleReceiptId = id;
        this.showConfirmModal = true;
    },
    handleConfirmSuccess() {
        this.showConfirmModal = false;
        this.fetchSampleReceipt();
    },
    openDetail(id) {
      this.selectedSampleReceiptId = id;
      this.showDetail = true;
    },
    approveBooking(tx) {
      if (!tx || !tx.id) return;

      const payload = {
        bookingId: tx.id,
        status: 2, 
      };
      this.isLoading = true;
      axios
        .post('/bookings/update-booking', payload)
        .then((res) => {
          if (res.status === 200) {
            toastSuccess('Duyệt đơn hàng thành công!');
            this.fetchSampleReceipt(); 
          } else {
           toastError('Không thể duyệt đơn hàng');
          }
        })
        .catch((err) => {
         toastError('Có lỗi xảy ra khi duyệt đơn hàng');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openUpdateModal(bookingId) {
      this.selectedSampleReceiptId = bookingId;
      this.showUpdateModal = true;
    },
    fetchSampleReceipt() {
      this.isLoading = true;
      axios
        .get('/sample-receipt/get-list', {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            status: this.filterStatus !== '' ? this.filterStatus : null,
            customerFullName: authState.fullName || null,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.bookings = res.data.data.items;
            this.totalItems = res.data.data.totalItems;
          } else {
            this.bookings = [];
            this.totalItems = 0;
          }
        })
        .catch((err) => {
          console.error('Lỗi khi lấy danh sách phiếu thu mẫu:', err);
          this.bookings = [];
          this.totalItems = 0;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    },
    getStatusLabel(value) {
      return getEnumLabel(SampleReceiptStatus, value);
    },
  },
};
</script>

<style scoped>
.transaction-list {
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

.cursor-pointer {
  cursor: pointer;
}

.fw-semibold {
  font-weight: 600;
  font-size: 1.05rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px 5px 0 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
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

.failed-row {
  background-color: #e06e6e;
  color: white;
}

:deep(.multiselect__option--highlight) {
  background-color: #4257b2 !important;
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
