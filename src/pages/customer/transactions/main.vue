<template>
  <div class="transaction-list">
    
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else>

      <div class="row fw-semibold border-bottom">
        <div class="col">Mã giao dịch</div>
        <div class="col">Mã đơn hàng</div>
        <div class="col">Số tiền</div>
        <div class="col">Phương thức</div>
        <div class="col">Trạng thái</div>
        <div class="col">Thời gian</div>
        <div class="col">Ghi chú</div>
      </div>

      <div v-if="transactions.length > 0">
        <div v-for="tx in transactions" :key="tx.id" :class="{ 'failed-row': tx.status === 0 || tx.status === 2 }" class="row content py-2 border-bottom align-items-center">
          <div class="col">{{ tx.transactionCode }}</div>
          <div class="col">{{ tx.bookingId }}</div>
          <div class="col">{{ formatCurrency(tx.amount) }}</div>
          <div class="col">{{ tx.paymentMethod }}</div>
          <div class="col">{{ getStatusLabel(tx.status) }}</div>
          <div class="col">{{ formatDate(tx.createdAt) }}</div>
          <div class="col">{{ tx.message }}</div>
        </div>
      </div>

      <div v-else class="row py-4 content text-center text-muted">
        <div class="col">Không có dữ liệu</div>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-3">
      <Paginate :total-items="totalItems" :items-per-page="pageSize" v-model:current-page="currentPage" />
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import Paginate from '@/components/common/paginate.vue';
import { TransactionStatus, getEnumLabel } from '@/enums/enum';

export default {
  props: {
    filterStatus: [String, Number],
  },
  components: { Paginate },
  data() {
    return {
      transactions: [],
      currentPage: 1,
      pageSize: 20,
      totalItems: 0,
      isLoading: false,
    };
  },
  watch: {
    currentPage() {
      this.fetchTransactions();
    },
    filterStatus() {
      this.currentPage = 1;
      this.fetchTransactions();
    },
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      this.isLoading = true;
      axios
        .get('/transactions/history', {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            status: this.filterStatus !== '' ? this.filterStatus : null,
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.transactions = res.data.data.items;
            this.totalItems = res.data.data.totalItems;
          } else {
            this.transactions = [];
            this.totalItems = 0;
          }
        })
        .catch((err) => {
          console.error('Lỗi khi lấy danh sách giao dịch:', err);
          this.transactions = [];
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
    formatDate(date) {
      return new Date(date).toLocaleString('vi-VN');
    },
    getStatusLabel(value) {
      return getEnumLabel(TransactionStatus, value);
    },
  },
};
</script>

<style scoped>
.transaction-list {
  font-size: 0.95rem;
  color: #444;
}

.row > .col {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.row > .col.text-center {
  justify-content: center;
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
</style>
