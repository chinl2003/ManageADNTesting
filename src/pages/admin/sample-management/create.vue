<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="title">Tạo phiếu thu mẫu</h4>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <div class="form-scroll">
        <div class="row">
          <!-- Vue Multiselect - 3 columns -->
          <div class="col-md-3">
            <div class="form-group mb-3">
              <label><strong class="text-dark">Đơn hàng <span class="text-danger">*</span></strong></label>
              <multiselect v-model="selectedBooking" :options="bookingOptions" :loading="isBookingLoading"
                :searchable="true" :clear-on-select="false" :close-on-select="true" placeholder="Chọn đơn hàng"
                label="label" track-by="id" @search-change="fetchBookings" @focus="fetchBookings" class="input-vue" />
            </div>
            <div class="text-end">
              <button class="btn btn-register btn-confirm half-width" @click="confirmBooking">Xác nhận</button>
            </div>
          </div>

          <!-- Booking Info -->
          <div v-if="confirmedBooking" class="col-md-9">
            <div class="receipt-container p-3">
              <h5 class="receipt-title">PHIẾU THU MẪU</h5>
              <p class="text-center text-muted fw-light small">
                Căn cứ theo thông tin của đơn hàng với mã: ĐH{{ confirmedBooking.id }}
              </p>
              <p><strong>Loại xét nghiệm:</strong> {{ confirmedBooking.isCivil ? 'Dân sự' : 'Hành chính' }}</p>
              <p><strong>Loại dịch vụ:</strong> {{ confirmedBooking.serviceName }}</p>

              <!-- Người gửi mẫu -->
              <div class="border rounded p-3 mb-3">
                <p><strong>Thông tin người gửi mẫu:</strong></p>
                <div class="ms-3">
                  <p>Họ và tên: {{ confirmedBooking.customerFullName }}</p>
                  <p>Số điện thoại: {{ confirmedBooking.customerPhone }}</p>
                  <p>Email: {{ confirmedBooking.customerEmail }}</p>
                  <p>Địa chỉ: {{ confirmedBooking.customerAddress }}</p>
                </div>
              </div>

              <!-- Người tiếp nhận -->
              <h6 class="receipt-subtitle mt-4">THÔNG TIN MẪU SINH HỌC</h6>
              <div class="row mb-3">
                <div class="col-12 mb-2">
                  <label class="form-label fw-bold">Người tiếp nhận</label>
                  <input v-model="receiverName" type="text" class="form-control small-input"
                    placeholder="Nhập họ và tên" />
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">Thời gian tiếp nhận mẫu</label>
                  <input v-model="receiveDate" type="date" class="form-control small-input" />
                </div>
              </div>

             <div class="text-end mb-2">
  <button class="btn btn-register btn-icon-only" @click="addSampleRow" title="Thêm dòng mới">
    <font-awesome-icon icon="circle-plus" />
  </button>
</div>

<div class="sample-table-wrapper">
  <div class="sample-table p-2 border rounded">
    <div class="row fw-bold border-bottom pb-2" style="display: flex; flex-wrap: nowrap;">
      <div class="cell-header" style="width: 40px;">STT</div>
      <div class="cell-header" style="width: 120px;">Mã mẫu</div>
      <div class="cell-header" style="width: 120px;">Loại mẫu</div>
      <div class="cell-header" style="width: 120px;">Người sở hữu</div>
      <div class="cell-header" style="width: 120px;">Quan hệ</div>
      <div class="cell-header" style="width: 80px;">Số lượng</div>
      <div class="cell-header" style="width: 120px;">Tình trạng</div>
      <div class="cell-header" style="width: 100px;">Người lấy mẫu</div>
      <div class="cell-header" style="width: 160px;">Thời gian lấy</div>
      <div style="width: 40px;" class="text-end"></div>
    </div>

    <div
      v-for="(sample, index) in samples"
      :key="index"
      class="row py-2 align-items-center border-bottom"
      style="display: flex; flex-wrap: nowrap;"
    >
      <div style="width: 40px;">{{ index + 1 }}</div>
      <div style="width: 120px;"><input v-model="sample.sampleCode" type="text" class="form-control" placeholder="Mã mẫu" /></div>
      <div style="width: 120px;"><input v-model="sample.type" type="text" class="form-control" placeholder="Loại mẫu" /></div>
      <div style="width: 120px;"><input v-model="sample.owner" type="text" class="form-control" placeholder="Người sở hữu" /></div>
      <div style="width: 120px;"><input v-model="sample.relationship" type="text" class="form-control" placeholder="Quan hệ" /></div>
      <div style="width: 80px;"><input v-model="sample.quantity" type="text" class="form-control" /></div>
      <div style="width: 120px;"><input v-model="sample.status" type="text" class="form-control" placeholder="Tình trạng" /></div>
      <div style="width: 100px;"><input v-model="sample.collector" type="text" class="form-control" placeholder="Người thu" /></div>
      <div style="width: 160px;"><input v-model="sample.collectionTime" type="datetime-local" class="form-control" /></div>
      <div style="width: 40px;" class="text-end">
        <button class="btn btn-sm btn-outline-danger" @click="removeSampleRow(index)" title="Xóa">
          <font-awesome-icon icon="trash-alt" />
        </button>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="footer-buttons">
            <button class="btn btn-register" @click="saveForm">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import axios from '@/utils/axios'
import { toastSuccess, toastError, toastWarning } from '@/utils/toast';

import {
  SampleMethod,
  getEnumLabel
} from '@/enums/enum'

export default {
  components: { Multiselect },
  data() {
    return {
      selectedBooking: null,
      confirmedBooking: null,
      bookingOptions: [],
      isBookingLoading: false,
      currentPage: 1,
      pageSize: 50,
      receiverName: '',
      receiveDate: '',
      samples: [
        {
          type: '',
          owner: '',
          quantity: 0,
          status: '',
          collector: '',
          collectionTime: '',
          relationship: '',
          sampleCode: ''
        }
      ]
    }
  },
  methods: {
    async fetchBookings() {
      this.isBookingLoading = true
      try {
        const res = await axios.get('/bookings/get-list', {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
            status: null,
            IsAll: true,
            IsSampleReceipt: true,
          }
        })
        if (res.data.success) {
          this.bookingOptions = res.data.data.items.map((item) => ({
            ...item,
            label: `ĐH${item.id}`,
          }))
        } else {
          this.bookingOptions = []
        }
      } catch (err) {
        this.bookingOptions = []
      } finally {
        this.isBookingLoading = false
      }
    },
    async confirmBooking() {
      if (!this.selectedBooking) return
      try {
        const res = await axios.get('/bookings/get-list', {
          params: {
            bookingId: this.selectedBooking.id,
            IsAll: true
          }
        })
        if (res.data.success && res.data.data.items.length > 0) {
          this.confirmedBooking = res.data.data.items[0]
        }
      } catch (error) {
      }
    },
    getSampleMethodLabel(value) {
      return getEnumLabel(SampleMethod, value)
    },
    addSampleRow() {
      this.samples.push({
        type: '',
        owner: '',
        quantity: 1,
        status: '',
        collector: '',
        collectionTime: '',
        relationship: '',
        sampleCode: ''
      })
    },
    removeSampleRow(index) {
      this.samples.splice(index, 1)
    },
    saveForm() {

      const payload = {
        bookingId: this.confirmedBooking.id,
        customerId: this.confirmedBooking.customerId,
        customerFullName: this.confirmedBooking.customerFullName,
        receiverName: this.receiverName,
        receiveDate: this.receiveDate,
        samples: this.samples.map(s => ({
          type: s.type,
          owner: s.owner,
          quantity: Number(s.quantity),
          status: s.status,
          collector: s.collector,
          collectionTime: s.collectionTime,
          relationship: s.relationship,
          sampleCode: s.sampleCode
        }))
      };

      axios.post('/sample-receipt', payload)
        .then((response) => {
          toastSuccess('Tạo phiếu thu mẫu thành công!');
          this.$emit('created');
          this.$emit('close');
        })
        .catch((error) => {
        });
    }
  }
}
</script>

<style scoped>
.form-scroll {
  padding-top: 1rem;
  padding-right: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(90vh - 120px);
  width: 100%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-x: hidden;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-footer {
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}

.btn-register {
  background-color: #3f51b5;
  color: #fff;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  border-radius: 5px;
}

.btn-register:hover {
  background-color: #2c3ca9;
}

.btn-confirm {
  width: 100%;
}

.half-width {
  width: 50%;
}

.receipt-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  overflow-x: hidden;
}

.receipt-title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: uppercase;
}

.receipt-subtitle {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.5rem;
}

.sample-table {
  background-color: #fafafa;
  width: 100%;
  overflow-x: hidden;
}

.sample-table .row {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.small-input {
  width: 100%;
  max-width: 300px;
}

.btn-icon-only {
  border: 1px solid #3f51b5;
  background-color: transparent;
  color: #3f51b5;
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  transition: all 0.2s ease;
}

.btn-icon-only:hover {
  background-color: #3f51b5;
  color: #ffffff;
}

input.form-control:focus {
  border-width: 1px !important;
  box-shadow: none !important;
  border-color: #3f51b5 !important;
}

.footer-buttons {
  margin-left: auto;
}
.sample-table-wrapper {
  overflow-x: auto;
  width: 100%;
}

.sample-table {
  min-width: 1200px;
}
.cell-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

</style>
