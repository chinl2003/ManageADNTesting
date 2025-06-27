<template>
  <div class="main-content">
    <div class="row-grid header-row">
      <div class="col-cell">STT</div>
      <div class="col-cell">Họ và tên</div>
      <div class="col-cell">Email</div>
      <div class="col-cell">Số điện thoại</div>
      <div class="col-cell">Vai trò</div>
      <div class="col-cell">Ngày sinh</div>
      <div class="col-cell">Giới tính</div>
      <div class="col-cell">Chức vụ</div>
      <div class="col-cell"></div>
    </div>

    <div v-for="(user, index) in paginatedUsers" :key="user.id" class="row-grid data-row">
      <div class="col-cell">{{ index + 1 + (currentPage - 1) * pageSize }}</div>
      <div class="col-cell">{{ user.fullName }}</div>
      <div class="col-cell">{{ user.email }}</div>
      <div class="col-cell">{{ user.phone }}</div>
      <div class="col-cell">{{ user.role }}</div>
      <div class="col-cell">{{ user.dob }}</div>
      <div class="col-cell">{{ user.gender }}</div>
      <div class="col-cell">{{ user.position }}</div>
      <div class="col-cell action-buttons">
        <button class="btn-square green" title="Thêm chức vụ">
          <font-awesome-icon icon="plus" />
        </button>
        <button class="btn-square red" title="Xóa tài khoản">
          <font-awesome-icon icon="trash" />
        </button>
        <button class="btn-square gray" title="Chỉnh sửa">
          <font-awesome-icon icon="edit" />
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-3">
      <Paginate :total-items="users.length" :items-per-page="pageSize" v-model:current-page="currentPage" />
    </div>
  </div>
</template>
<script>
import Paginate from '@/components/common/paginate.vue';
import axios from '@/utils/axios';
export default {
    components: {
        Paginate
    },
    data() {
        return {
            users: [],
            currentPage: 1,
            pageSize: 20,
            totalItems: 0
        };
    },
    computed: {
        paginatedUsers() {
            return this.users;
        }
    },
    watch: {
        currentPage: 'fetchUsers'
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            axios.get('/users', {
                params: {
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            })
                .then(response => {
                    if (response.data.success) {
                        console.log('Danh sách người dùng:', response.data.data);
                        const paged = response.data.data;
                        this.users = paged.items.map(user => ({
                            id: user.id,
                            fullName: user.fullName || '',
                            email: user.email,
                            phone: user.phone || '',
                            role: user.role,
                            dob: user.dateOfBirth
                                ? new Date(user.dateOfBirth).toLocaleDateString('vi-VN')
                                : '',
                            gender: user.gender || '',
                            position: user.position || ''
                        }));
                        this.totalItems = paged.totalItems;
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi tải danh sách người dùng:', error);
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
    60px  
    160px  
    200px   
    140px   
    100px  
    120px   
    100px  
    120px   
    100px; 
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
    display: none; /* Ẩn tiêu đề ở mobile */
  }

  .data-row {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px;
  }
}
</style>
