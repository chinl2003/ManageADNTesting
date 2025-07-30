<template>
  <div class="main-content">
    <div class="row-grid header-row">
      <div class="col-cell">STT</div>
      <div class="col-cell">Tên dịch vụ</div>
      <div class="col-cell">Mô tả</div>
      <div class="col-cell">Trạng thái</div>
      <div class="col-cell">Ngày tạo</div>
      <div class="col-cell"></div>
    </div>

    <div v-for="(service, index) in paginate" :key="service.id" class="row-grid data-row">
      <div class="col-cell">{{ index + 1 + (currentPage - 1) * pageSize }}</div>
      <div class="col-cell"><span class="service-link" @click="openRatingModal(service.ratings)">
          {{ service.name }}
        </span></div>
      <div class="col-cell">{{ service.description }}</div>
      <div class="col-cell">{{ service.isActive ? 'Hoạt động' : 'Không hoạt động' }}</div>
      <div class="col-cell">{{ service.createdAtString }}</div>
      <div class="col-cell action-buttons">
        <button class="btn-square red" title="Xóa dịch vụ">
          <font-awesome-icon icon="trash" />
        </button>
        <button class="btn-square gray" title="Chỉnh sửa">
          <font-awesome-icon icon="edit" />
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-3">
      <Paginate :total-items="services.length" :items-per-page="pageSize" v-model:current-page="currentPage" />
    </div>
    <Teleport to="body">
      <ListRating v-if="showModal" :ratings="selectedRatings" @close="showModal = false" />

    </Teleport>
  </div>
</template>
<script>
import Paginate from '@/components/common/paginate.vue';
import axios from '@/utils/axios';
import ListRating from './list-rating.vue';

export default {
  components: {
    Paginate, ListRating
  },
  data() {
    return {
      services: [],
      currentPage: 1,
      pageSize: 20,
      totalItems: 0,
      selectedRatings: [],
      showModal: false
    };
  },
  computed: {
    paginate() {
      return this.services;
    }
  },
  watch: {
    currentPage: 'fetchServices'
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    openRatingModal(ratings) {
      this.selectedRatings = ratings;
      this.showModal = true;
    },
    fetchServices() {
      axios.get('/services/get-list-services', {
        params: {
          page: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then(response => {
          if (response.data.success) {
            const paged = response.data.data;
            this.services = paged.items.map(service => ({
              name: service.name,
              description: service.description || '',
              isActive: service.isActive,
              createdAtString: service.createdAtString || '',
              ratings: service.ratings || [],
            }));
            this.totalItems = paged.totalItems;
          } else {
            console.error(response.data.message);
          }
        })
        .catch(error => {
          console.error('Lỗi khi tải danh sách dịch vụ:', error);
        });
    }
  }
};
</script>
<style scoped>
.main-content {
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.row-grid {
  display: grid;
  grid-template-columns:
    60px 400px 400px 200px 200px 100px;
  align-items: center;
  padding: 8px 12px;
  width: 100%;
  box-sizing: border-box;
}

.header-row {
  background-color: #f5f5f5;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

.data-row {
  border-bottom: 1px solid #eee;
}

.col-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-break: break-word;
  padding: 6px 4px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn-square {
  height: 26px;
  padding: 0 8px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-square.green {
  background-color: #28a745;
}

.btn-square.red {
  background-color: #dc3545;
}

.btn-square.gray {
  background-color: #a2a2a2;
}

.btn-square.green:hover {
  background-color: #218838;
}

.btn-square.red:hover {
  background-color: #c82333;
}

.btn-square.gray:hover {
  background-color: #8d8d8d;
}

/* Responsive: Thu gọn table */
@media (max-width: 768px) {
  .row-grid {
    display: block;
  }

  .col-cell {
    display: flex;
    justify-content: space-between;
    padding: 8px 6px;
    border-bottom: 1px solid #ddd;
    font-size: 13px;
  }

  .header-row {
    display: none;
  }

  .data-row {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px;
  }
}
.service-link {
  color: #007bff;
  cursor: pointer;
}
.service-link:hover {
  text-decoration: none;
}

</style>
