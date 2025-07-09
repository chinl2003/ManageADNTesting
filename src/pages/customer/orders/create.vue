<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      <h4 class="title">Tạo đơn hàng mới</h4>

      <form @submit.prevent="validateForm">
        <div class="form-scroll">
          <!-- Loại dịch vụ -->
          <div class="form-group">
            <label>Loại dịch vụ <span class="required">*</span></label>
            <Multiselect v-model="form.service" :options="services" placeholder="Chọn loại dịch vụ" label="name"
              track-by="id" class="input-vue" />
            <div class="error" v-if="errors.service">Vui lòng chọn loại dịch vụ.</div>
          </div>

          <!-- Loại xét nghiệm -->
          <div class="form-group">
            <label>Loại xét nghiệm <span class="required">*</span></label>
            <Multiselect v-model="form.isCivil" :options="civilOptions" placeholder="Chọn loại xét nghiệm" label="label"
              track-by="value" class="input-vue" />
            <div class="error" v-if="errors.isCivil">Vui lòng chọn loại xét nghiệm.</div>
          </div>

          <!-- Phương thức lấy mẫu -->
          <div class="form-group">
            <label>Phương thức lấy mẫu <span class="required">*</span></label>
            <Multiselect v-model="form.sampleMethod" :options="sampleMethods" placeholder="Chọn phương thức"
              label="label" track-by="value" class="input-vue" />
            <div class="error" v-if="errors.sampleMethod">Vui lòng chọn phương thức lấy mẫu.</div>
          </div>

          <!-- Thời gian nhận kết quả -->
          <div class="form-group">
            <label>Thời gian nhận kết quả <span class="required">*</span></label>
            <Multiselect v-model="form.resultTime" :options="resultTimes" placeholder="Chọn thời gian" label="label"
              track-by="value" class="input-vue" />
            <div class="error" v-if="errors.resultTime">Vui lòng chọn thời gian nhận kết quả.</div>
          </div>

          <!-- Ngày thu mẫu -->
          <div class="form-group">
            <label>Ngày thu mẫu <span class="required">*</span></label>
            <input type="date" v-model="form.sampleDate" :disabled="form.sampleMethod?.value !== 1"
              class="input-control" />
            <div class="error" v-if="errors.sampleDate">Vui lòng chọn ngày thu mẫu.</div>
          </div>

          <!-- Tổng thanh toán -->
          <div class="form-group total-price" v-if="totalPrice !== null">
            <span class="label">Tổng giá trị đơn hàng:</span>
            <span class="value">
              <template v-if="totalPrice === 0">
                Vui lòng liên hệ: 0819790919 để biết thêm thông tin thanh toán!
              </template>
              <template v-else>
                {{ formatCurrency(totalPrice) }}
              </template>
            </span>
          </div>

          <button type="submit" class="btn btn-register" :disabled="isSubmitting">
            <span v-if="isSubmitting">
              <i class="bi bi-arrow-repeat spin"></i> Đang tạo...
            </span>
            <span v-else>
              Tạo đơn hàng
            </span>
          </button>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import axios from '@/utils/axios';
import { toastError, toastSuccess } from '@/utils/toast';

export default {
  props: ['show'],
  emits: ['close'],
  components: { Multiselect },
  watch: {
    form: {
      deep: true,
      handler() {
        const f = this.form;
        if (f.service && f.isCivil !== null && f.sampleMethod && f.resultTime) {
          this.fetchPrice();
        } else {
          this.totalPrice = null;
        }
      }
    },
    show(newVal) {
      if (!newVal) {
        this.resetForm()
      }
    },
  },

  data() {
    return {
      form: {
        service: null,
        isCivil: null,
        sampleMethod: null,
        resultTime: null,
        sampleDate: '',
      },
      isSubmitting: false,
      errors: {},
      services: [],
      resultTimes: [],
      sampleMethods: [],
      civilOptions: [
        { value: true, label: 'Dân sự' },
        { value: false, label: 'Hành chính' },
      ],
      totalPrice: null
    };
  },
  mounted() {
    this.fetchOptions();
  },
  methods: {
    fetchOptions() {
      Promise.all([
        axios.get('/services/get-list-services'),
        axios.get('/lookups/result-times'),
        axios.get('/lookups/sample-methods'),
      ]).then(([res1, res2, res3]) => {
        this.services = res1.data.data?.items || [];
        this.resultTimes = res2.data.data || [];
        this.sampleMethods = res3.data.data || [];
      });
    },
    validateForm() {
      const f = this.form;
      this.errors = {};

      if (!f.service) this.errors.service = true;
      if (f.isCivil === null) this.errors.isCivil = true;
      if (!f.sampleMethod) this.errors.sampleMethod = true;
      if (!f.resultTime) this.errors.resultTime = true;
      // if (f.sampleMethod?.value === 0 && !f.sampleDate) this.errors.sampleDate = true;

      if (Object.keys(this.errors).length === 0) {
        this.submitForm();
      }
    },
    submitForm() {
      this.isSubmitting = true;
      const f = this.form;
      const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const [yyyy, mm, dd] = dateStr.split('-');
        return `${dd}-${mm}-${yyyy}`;
      };
      const payload = {
        dnaTestServiceId: f.service.id,
        isCivil: f.isCivil.value,
        sampleMethod: f.sampleMethod.value,
        resultTimeType: f.resultTime.value,
        appointmentDate:
          f.sampleMethod.value === 1 && f.sampleDate
            ? formatDate(f.sampleDate)
            : null,
        totalPrice: this.totalPrice ?? 0
      };

      axios
        .post('/bookings', payload)
        .then((res) => {
          if (res.data.success) {
            toastSuccess(res.data.message || 'Tạo đơn hàng thành công!');
            this.$emit('close');
            this.$emit('created');
          } else {
            toastError(res.data.message || 'Tạo thất bại!');
          }
        })
        .catch(() => toastError('Lỗi gửi dữ liệu!'))
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    formatCurrency(amount) {
      if (typeof amount !== 'number') return '';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      }).format(amount);
    },
    fetchPrice() {
      const { service, isCivil, sampleMethod, resultTime } = this.form;
      axios
        .get(`/services/${service.id}/advanced-price`, {
          params: {
            isCivil: isCivil.value,
            sampleMethod: sampleMethod.value,
            resultTimeType: resultTime.value,
          }
        })
        .then(res => {
          if (res.data.success) {
            this.totalPrice = res.data.data;
          } else {
            this.totalPrice = null;
            toastError(res.data.message || 'Không tìm thấy giá.');
          }
        })
        .catch(() => {
          this.totalPrice = null;
          toastError('Lỗi khi lấy giá dịch vụ.');
        });
    },
    resetForm() {
      this.form = {
        service: null,
        isCivil: null,
        sampleMethod: null,
        resultTime: null,
        sampleDate: '',
      };
      this.errors = {};
      this.totalPrice = null;
    }


  },
};
</script>

<style scoped>
@import 'vue-multiselect/dist/vue-multiselect.min.css';

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

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  color: #666;
  font-weight: 500;
  margin-bottom: 6px;
}

.input-vue {
  font-size: 14px;
  border-radius: 4px;
}

.input-control {
  font-size: 14px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 0.6rem;
  color: #333;
}

.input-control::placeholder {
  color: #999;
}

.input-control:disabled {
  cursor: not-allowed;
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
  color: #e3e7ff;
  width: 100%;
  padding: 0.6rem;
  border: none;
  border-radius: 5px;
}

.btn-register:hover {
  background-color: #2c3ca9;
  color: #ffffff;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #000;
}

:deep(.multiselect__option--highlight) {
  background-color: #1c2260 !important;
  color: white !important;
}

.title {
  color: #666;
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

.total-price {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #2c3ca9;
  margin-bottom: 1rem;
  border-top: 1px solid #e0e0e0;
  padding-top: 0.8rem;
}

.total-price .label {
  margin-right: 0.5rem;
}

.total-price .value {
  color: #e53935;
  text-align: center;
}

.total-price .value:has(template:only-child) {
  color: #999;
}
.spin {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.btn-register:disabled {
  background-color: #3f51b5 !important; 
  color: #e3e7ff !important;           
  opacity: 0.5;                      
  cursor: not-allowed;
}
</style>