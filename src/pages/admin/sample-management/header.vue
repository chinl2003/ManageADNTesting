<template>
  <div class="row mb-4 align-items-center">
    <div class="col-md-5">
      <h2 class="title">Danh sách phiếu thu mẫu</h2>
    </div>
    <div class="col-md-7 d-flex justify-content-end align-items-center gap-3 content">
      <multiselect v-model="selectedStatus" :options="statusOptions" placeholder="Chọn trạng thái" label="label"
        track-by="value" class="custom-multiselect" @update:modelValue="onStatusChange" />
        <button class="btn btn-add" @click="showModal = true">
        <font-awesome-icon :icon="['fas', 'plus']" class="icon" />
        Thêm phiếu
      </button>
    </div>
    <Teleport to="body">
      <CreateModal v-if="showModal" @close="showModal = false" @created="onCreated" />
    </Teleport>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { BookingStatus } from '@/enums/enum'
import CreateModal from './create.vue'

export default {
  components: { Multiselect, CreateModal },
  data() {
    return {
      selectedStatus: null,
      statusOptions: [],
      showModal: false
    }
  },
  created() {
    this.statusOptions = this.generateStatusOptions()
  },
  methods: {
    onStatusChange(val) {
      this.$emit('filter', val?.value ?? '')
    },
    generateStatusOptions() {
      const options = [{ value: '', label: 'Tất cả trạng thái' }]
      for (const key in BookingStatus) {
        if (!isNaN(key)) {
          options.push({
            value: Number(key),
            label: BookingStatus[key],
          })
        }
      }
      return options
    },
    onCreated() {
      this.$emit('created')
    }
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
.content{
  padding-left: 0 !important;
}
</style>
