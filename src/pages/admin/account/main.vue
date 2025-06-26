<template>
    <div class="main-content">
        <div class="d-flex header-row">
            <div class="col-fixed text-center">STT</div>
            <div class="col-fixed text-center">Họ và tên</div>
            <div class="col-fixed text-center">Email</div>
            <div class="col-fixed text-center">Số điện thoại</div>
            <div class="col-fixed text-center">Vai trò</div>
            <div class="col-fixed text-center">Ngày sinh</div>
            <div class="col-fixed text-center"></div>
        </div>

        <div v-for="(user, index) in paginatedUsers" :key="user.id" class="d-flex data-row">
            <div class="col-fixed text-center">{{ index + 1 + (currentPage - 1) * pageSize }}</div>
            <div class="col-fixed text-center">{{ user.fullName }}</div>
            <div class="col-fixed text-center">{{ user.email }}</div>
            <div class="col-fixed text-center">{{ user.phone }}</div>
            <div class="col-fixed text-center">{{ user.role }}</div>
            <div class="col-fixed text-center">{{ user.dob }}</div>
            <div class="col-fixed text-center action-buttons">
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

export default {
    components: {
        Paginate
    },
    data() {
        return {
            users: [],
            currentPage: 1,
            pageSize: 20
        };
    },
    computed: {
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.users.slice(start, end);
        }
    },
    mounted() {
        for (let i = 1; i <= 53; i++) {
            this.users.push({
                id: i,
                fullName: `Người dùng ${i}`,
                email: `user${i}@example.com`,
                phone: `012345678${i % 10}`,
                role: i % 2 === 0 ? 'Admin' : 'Customer',
                dob: '1990-01-01'
            });
        }
    }
};
</script>
<style scoped>
.main-content {
    border: 1px solid #ddd;
    border-radius: 5px;
}

.header-row {
    background-color: #f5f5f5;
    font-weight: bold;
    padding: 12px 16px;
    border-bottom: 1px solid #ccc;
    align-items: center;
}

.data-row {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    align-items: center;
}

.col-fixed {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    word-break: break-word;
    text-align: center;
    height: 100%;
}

.col-fixed:nth-child(1) {
    width: 60px;
}

.col-fixed:nth-child(2) {
    width: 180px;
}

.col-fixed:nth-child(3) {
    width: 220px;
}

.col-fixed:nth-child(4) {
    width: 140px;
}

.col-fixed:nth-child(5) {
    width: 120px;
}

.col-fixed:nth-child(6) {
    width: 160px;
}

.col-fixed:nth-child(7) {
    width: 19%;
}

@media (max-width: 768px) {
    .col-fixed {
        font-size: 12px;
        padding: 2px;
    }
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.btn-square {
    width: 40px;
    height: 40px;
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
</style>
