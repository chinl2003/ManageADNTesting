<template>
  <div class="row mb-4 align-items-center">
    <div class="col-5">
      <h2 class="text-xl font-bold">Danh sách người dùng</h2>
    </div>
    <div class="col-7 d-flex justify-content-end gap-2">
      <vue-multiselect
        v-model="selectedStatus"
        :options="statusOptions"
        placeholder="Chọn tình trạng"
        class="w-50"
      />
      <button class="btn btn-success text-white" @click="showModal = true">Thêm người dùng</button>
    </div>

    <CreateUserModal :show="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import CreateUserModal from './create.vue';

export default {
  components: {
    Multiselect,
    CreateUserModal
  },
  data() {
    return {
      selectedStatus: null,
      statusOptions: ['Hoạt động', 'Ngừng hoạt động'],
      showModal: false
    };
  }
};
</script>

<style scoped>
.btn-success {
  background-color: #28a745;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
</style>
