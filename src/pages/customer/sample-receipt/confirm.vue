<!-- ConfirmModal.vue -->
<template>
  <div class="modal-backdrop">
    <div class="modal-content p-4 rounded shadow">
      <h5 class="mb-3">Xác nhận mẫu xét nghiệm</h5>
      <div class="form-check mb-3">
        <input
          type="checkbox"
          id="agreement"
          class="form-check-input"
          v-model="isAgreed"
        />
        <label class="form-check-label" for="agreement">
          Tôi cam kết mẫu được cung cấp có nguồn gốc hợp pháp, và tôi đồng ý sử dụng mẫu này cho mục đích xét nghiệm ADN.
        </label>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-secondary me-2" @click="$emit('close')">Hủy</button>
        <button class="btn btn-success" @click="confirm">Xác nhận</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios';
import { toastSuccess, toastWarning, toastError } from '@/utils/toast';

export default {
  props: {
    sampleReceiptId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isAgreed: false,
    };
  },
  methods: {
    confirm() {
      if (!this.isAgreed) {
        toastWarning('Vui lòng xác nhận cam kết!');
        return;
      }

      axios
        .post('/sample-receipt/update-status', {
          sampleReceiptId: this.sampleReceiptId,
          status: 1,
        })
        .then(() => {
          toastSuccess('Xác nhận thành công!');
          this.$emit('success'); // gọi về để reload list
        })
        .catch(() => {
          toastError('Có lỗi khi xác nhận');
        });
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}
.modal-content {
  background: white;
  width: 500px;
  max-width: 90%;
}
</style>
