<template>
  <div class="order-list">
    <!-- TABLE HEADER -->
    <div class="row fw-semibold border-bottom pb-2 mb-2">
      <div class="col-md-2">Mã đơn</div>
      <div class="col-md-3">Ngày đặt</div>
      <div class="col-md-3">Trạng thái</div>
      <div class="col-md-4">Thao tác</div>
    </div>

    <!-- TABLE ROWS -->
    <div
      v-for="order in filteredOrders"
      :key="order.id"
      class="row py-2 border-bottom align-items-center"
    >
      <div class="col-md-2">{{ order.code }}</div>
      <div class="col-md-3">{{ order.date }}</div>
      <div class="col-md-3">{{ order.status }}</div>
      <div class="col-md-4">
        <button class="btn btn-sm btn-outline-primary me-2">Xem</button>
        <button class="btn btn-sm btn-outline-secondary">Tải kết quả</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterStatus: String,
  },
  data() {
    return {
      orders: [
        { id: 1, code: 'ORD001', date: '28/06/2025', status: 'Đang xử lý' },
        { id: 2, code: 'ORD002', date: '25/06/2025', status: 'Hoàn thành' },
        { id: 3, code: 'ORD003', date: '20/06/2025', status: 'Đã hủy' },
      ],
    }
  },
  computed: {
    filteredOrders() {
      if (!this.filterStatus) return this.orders
      return this.orders.filter((o) => o.status === this.filterStatus)
    },
  },
}
</script>

<style scoped>
.order-list {
  font-size: 0.95rem;
  color: #444;
}
</style>
