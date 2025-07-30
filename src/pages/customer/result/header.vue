<template>
  <div class="row mb-4 align-items-center">
    <div class="col-md-5">
      <h2 class="title">Danh sách kết quả</h2>
    </div>
  </div>
</template>

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
