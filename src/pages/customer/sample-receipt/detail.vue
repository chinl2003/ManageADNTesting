<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="title">Chi tiết phiếu thu mẫu</h4>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <div class="form-scroll" v-if="confirmedBooking">
        <div class="row">
          <div class="col-12">
            <div class="receipt-container p-3">
              <h5 class="receipt-title">PHIẾU THU MẪU</h5>
              <p class="text-center text-muted fw-light small">
                Căn cứ theo thông tin của đơn hàng với mã: ĐH{{ confirmedBooking.id }}
              </p>
              <p><strong>Loại xét nghiệm:</strong> {{ confirmedBooking.isCivil ? 'Dân sự' : 'Hành chính' }}</p>
              <p><strong>Loại dịch vụ:</strong> {{ confirmedBooking.dnaTestServiceName }}</p>

              <div class="border rounded p-3 mb-3">
                <p><strong>Thông tin người gửi mẫu:</strong></p>
                <div class="ms-3">
                  <p><span class="label-bold">Họ và tên:</span> {{ confirmedBooking.customerFullName }}</p>
                  <p><span class="label-bold">Số điện thoại:</span> {{ confirmedBooking.customerPhone }}</p>
                  <p><span class="label-bold">Email:</span> {{ confirmedBooking.customerEmail }}</p>
                  <p><span class="label-bold">Địa chỉ:</span> {{ confirmedBooking.customerAddress }}</p>
                </div>
              </div>

              <h6 class="receipt-subtitle text-center mt-4">THÔNG TIN MẪU SINH HỌC</h6>

              <div class="row mb-3">
                <div class="col-12">
                  <p><strong>Người tiếp nhận:</strong> {{ receiverName }}</p>
                  <p><strong>Thời gian tiếp nhận mẫu:</strong> {{ formatDate(receiveDate) }}</p>
                </div>
              </div>

              <!-- Table scroll wrapper -->
              <div class="sample-table-wrapper">
                <div class="sample-table p-2 border rounded">
                  <div class="sample-row header">
                    <div class="cell" style="width: 40px;">STT</div>
                    <div class="cell" style="width: 120px;">Mã mẫu</div>
                    <div class="cell" style="width: 120px;">Loại mẫu</div>
                    <div class="cell" style="width: 80px;">Số lượng</div>
                    <div class="cell" style="width: 120px;">Tình trạng</div>
                    <div class="cell" style="width: 120px;">Người sở hữu</div>
                    <div class="cell" style="width: 120px;">Quan hệ</div>
                    <div class="cell" style="width: 120px;">Người lấy mẫu</div>
                    <div class="cell" style="width: 160px;">Thời gian lấy</div>
                  </div>

                  <div v-for="(sample, index) in samples" :key="index" class="sample-row">
                    <div class="cell" style="width: 40px;">{{ index + 1 }}</div>
                    <div class="cell" style="width: 120px;">{{ sample.code || '-' }}</div>
                    <div class="cell" style="width: 120px;">{{ sample.type }}</div>
                    <div class="cell" style="width: 80px;">{{ sample.quantity }}</div>
                    <div class="cell" style="width: 120px;">{{ sample.status }}</div>
                    <div class="cell" style="width: 120px;">{{ sample.owner || '-' }}</div>
                    <div class="cell" style="width: 120px;">{{ sample.relationship || '-' }}</div>
                    <div class="cell" style="width: 120px;">{{ sample.collector }}</div>
                    <div class="cell" style="width: 160px;">{{ formatDateTime(sample.collectionTime) }}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="footer-buttons">
            <button class="btn btn-secondary" @click="$emit('close')">Đóng</button>
          </div>
        </div>
      </div>

      <div v-else class="text-center p-4 text-muted">
        Đang tải dữ liệu...
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios';

export default {
  props: {
    sampleReceiptId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      confirmedBooking: null,
      samples: [],
      receiverName: '',
      receiveDate: '',
    };
  },
  mounted() {
    this.fetchSampleReceiptDetail();
  },
  methods: {
    fetchSampleReceiptDetail() {
      axios.get('/sample-receipt/get-list', {
        params: {
          SampleReceiptId: this.sampleReceiptId,
        },
      })
        .then(res => {
          if (res.data.success && res.data.data.items.length > 0) {
            const data = res.data.data.items[0];
            this.confirmedBooking = data.booking || {};
            this.receiverName = data.receiverName || '';
            this.receiveDate = data.receiveDate || '';
            this.samples = (data.details || []).map(d => ({
              code: d.sampleCode,
              type: d.sampleType,
              quantity: d.quantity,
              status: d.status,
              collector: d.collector,
              collectionTime: d.collectionTime,
              owner: d.owner,
              relationship: d.relationship,
            }));

            this.confirmedBooking.customerFullName = data.customer?.fullName || '';
            this.confirmedBooking.customerPhone = data.customer?.phone || '';
            this.confirmedBooking.customerEmail = data.customer?.email || '';
            this.confirmedBooking.customerAddress = data.customer?.address || '';
          }
        })
        .catch(error => {
          console.error('Lỗi khi lấy chi tiết phiếu thu mẫu:', error);
        });
    },

    formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('vi-VN');
    },
    formatDateTime(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleDateString('vi-VN');
    },
  },
};
</script>

<style scoped>
.label-bold {
  font-weight: 700;
}

.receipt-subtitle {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.receipt-title {
  text-align: center;
  font-weight: bold;
}

.sample-table-wrapper {
  overflow-x: auto;
}

.sample-table {
  font-size: 0.9rem;
  min-width: 1000px;
}

.sample-row {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  align-items: center;
  min-height: 40px;
}

.sample-row.header {
  font-weight: bold;
  background: #f8f9fa;
}

.sample-row .cell {
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  width: 80%;
  max-height: 90%;
  overflow-y: auto;
  border-radius: 8px;
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}
</style>
