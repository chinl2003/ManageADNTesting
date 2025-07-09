<!-- Header.vue -->
<template>
  <div class="row mb-4 align-items-center">
    <div class="col-md-5">
      <h2 class="title">Danh sách đơn hàng</h2>
    </div>
    <div class="col-md-7 d-flex justify-content-end align-items-center gap-3">
      <multiselect
        v-model="selectedStatus"
        :options="statusOptions"
        placeholder="Chọn trạng thái"
        label="label"
        track-by="value"
        class="custom-multiselect"
        @input="emitFilter"
      />
      <button class="btn btn-add" @click="showModal = true">
        <font-awesome-icon :icon="['fas', 'plus']" class="icon" />
        Thêm đơn hàng
      </button>
    </div>
    <Teleport to="body">
      <CreateBookingModal :show="showModal" @close="showModal = false" />
    </Teleport>
    
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import CreateBookingModal from './create.vue'

export default {
  components: { Multiselect, CreateBookingModal },
  data() {
    return {
      selectedStatus: null,
      showModal: false,
      statusOptions: [
        { value: '', label: 'Tất cả trạng thái' },
        { value: 'Đang xử lý', label: 'Đang xử lý' },
        { value: 'Hoàn thành', label: 'Hoàn thành' },
        { value: 'Đã hủy', label: 'Đã hủy' },
      ],
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filter', this.selectedStatus?.value || '')
    },
  },
}
</script>

<style scoped>
@import "vue-multiselect/dist/vue-multiselect.min.css";

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2b3f91;
}

.custom-multiselect {
  width: 26%;
}

.btn-add {
  background-color: #4257b2;
  color: #dce0f2;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-add:hover {
  background-color: #2b3f91;
  color: #ffffff;
}

.btn-add .icon {
  color: inherit;
  transition: color 0.3s;
}

.btn-add:hover .icon {
  color: #ffffff;
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
