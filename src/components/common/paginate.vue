<template>
  <div class="d-flex justify-center mt-4 gap-2 flex-wrap">
    <button
      class="paginate-btn"
      :disabled="currentPage <= 1"
      @click="changePage(currentPage - 1)"
    >
      Trước
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="paginate-btn"
      :class="{ active: page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      class="paginate-btn"
      :disabled="currentPage >= totalPages"
      @click="changePage(currentPage + 1)"
    >
      Sau
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 20 },
  currentPage: { type: Number, required: true }
});

const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

function changePage(page) {
  if (page !== props.currentPage && page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
  }
}
</script>

<style scoped>
.paginate-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  color: #333;
  cursor: pointer;
  min-width: 2.5rem;
  text-align: center;
  font-size: 0.875rem;
  transition: 0.2s;
}

.paginate-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.paginate-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.paginate-btn.active {
  background-color: #4257b2;
  color: white;
  font-weight: bold;
}
</style>
