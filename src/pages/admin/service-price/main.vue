<template>
    <div class="main-content">
        <div class="row-grid header-row">
            <div class="col-cell">STT</div>
            <div class="col-cell">Tên dịch vụ</div>
            <div class="col-cell">Thời gian trả kết quả</div>
            <div class="col-cell">Phương thức lấy mẫu</div>
            <div class="col-cell">Giá tiền</div>
            <div class="col-cell">Ngày áp dụng</div>
            <div class="col-cell"></div>
        </div>

        <div v-for="(price, index) in paginatedData" :key="price.id" class="row-grid data-row">
            <div class="col-cell">{{ index + 1 + (currentPage - 1) * pageSize }}</div>
            <div class="col-cell">{{ price.serviceName }}</div>
            <div class="col-cell">
                {{ getEnumLabel(ResultTimeType, price.resultTimeType) }}
            </div>
            <div class="col-cell">
                {{ getEnumLabel(SampleMethod, price.sampleMethod) }}
            </div>
            <div class="col-cell">{{ formatCurrency(price.price) }}</div>
            <div class="col-cell">{{ formatDate(price.createdAt) }}</div>
            <div class="col-cell action-buttons">
                <button class="btn-square gray" title="Cập nhật">
                    <font-awesome-icon icon="edit" />
                </button>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
            <Paginate :total-items="totalItems" :items-per-page="pageSize" v-model:current-page="currentPage" />
        </div>
    </div>
</template>

<script>
import Paginate from '@/components/common/paginate.vue';
import axios from '@/utils/axios';
import { ResultTimeType, SampleMethod, getEnumLabel } from '@/enums/enum';

export default {
    components: { Paginate },
    data() {
        return {
            prices: [],
            currentPage: 1,
            pageSize: 20,
            totalItems: 0,
            ResultTimeType,
            SampleMethod,
        };
    },
    computed: {
        paginatedData() {
            return this.prices.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
    },
    watch: {
        currentPage() {
        },
    },
    mounted() {
        this.fetchPrices();
    },
    methods: {
        fetchPrices() {
            axios.get('/services/prices')
                .then((response) => {
                    if (response.data.success) {
                        this.prices = response.data.data;
                        this.totalItems = this.prices.length;
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi tải danh sách giá dịch vụ:', error);
                });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN').format(value);
        },
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('vi-VN');
        },
        getEnumLabel
    },
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
        60px 500px 200px 250px 160px 160px 80px;
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

.btn-square.gray {
    background-color: #a2a2a2;
}

.btn-square.gray:hover {
    background-color: #8d8d8d;
}

/* Responsive */
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
</style>
