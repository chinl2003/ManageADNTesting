<template>
    <div class="transaction-list">

        <div v-if="isLoading" class="loading-spinner">
            <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else>

            <div class="row fw-semibold border-bottom">
                <div class="col">STT</div>
                <div class="col">Mã phiếu kết quả</div>
                <div class="col">Mã đơn hàng</div>
                <div class="col"></div>
            </div>

            <div v-if="bookings.length > 0">
                <div v-for="(tx, index) in bookings" :key="tx.id"
                    class="row content py-2 border-bottom align-items-center">
                    <div class="col">{{ index + 1 }}</div>
                    <div class="col cursor-pointer text-primary text-decoration-underline" @click="openDetail(tx.id)">
                        PKQ{{ tx.id }}
                    </div>
                    <div class="col">ĐH{{ tx.bookingId }}</div>
                    <div class="col d-flex gap-2 justify-content-center">
                        <button class="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                            @click="downloadPDF(tx.id)" title="Tải phiếu kết quả PDF">
                            <i class="bi bi-download"></i>
                        </button>

                        <button class="btn btn-sm btn-xanhtim d-flex align-items-center justify-content-center"
                            @click="openFeedback(tx.id)" title="Đánh giá kết quả">
                            <i class="bi bi-star-fill me-1"></i> Đánh giá
                        </button>
                    </div>

                </div>
            </div>

            <div v-else class="row py-4 content text-center text-muted">
                <div class="col">Không có dữ liệu</div>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
            <Paginate :total-items="totalItems" :items-per-page="pageSize" v-model:current-page="currentPage" />
        </div>
        <Teleport to="body">
            <DetailModal v-if="showDetail" :sampleReceiptId="selectedSampleReceiptId" @close="showDetail = false" />
             <FeedbackModal v-if="showFeedback" :resultId="selectedFeedbackId" @close="showFeedback = false" />
        </Teleport>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import Paginate from '@/components/common/paginate.vue';
import { SampleReceiptStatus, getEnumLabel } from '@/enums/enum';
import Multiselect from 'vue-multiselect';
import { toastSuccess, toastError } from '@/utils/toast'
import DetailModal from './detail.vue';
import html2pdf from 'html2pdf.js';
import { createApp } from 'vue';
import PdfRenderModal from './detail-pdf.vue';
import FeedbackModal from './feedback.vue';

export default {
    props: {
        filterStatus: [String, Number],
    },
    components: { Paginate, Multiselect, DetailModal, FeedbackModal  },
    data() {
        return {
            bookings: [],
            currentPage: 1,
            pageSize: 20,
            totalItems: 0,
            isLoading: false,
            statusOptions: [],
            showUpdateModal: false,
            selectedSampleReceiptId: null,
            showDetail: false,
            selectedFeedbackId: null,
            showFeedback: false,
        };
    },
    watch: {
        currentPage() {
            this.fetchSampleReceipt();
        },
        filterStatus() {
            this.currentPage = 1;
            this.fetchSampleReceipt();
        },
    },
    mounted() {
        this.fetchSampleReceipt();
    },
    methods: {
        openFeedback(id) {
            this.selectedFeedbackId = id;
            this.showFeedback = true;
        },
        openDetail(id) {
            this.selectedSampleReceiptId = id;
            this.showDetail = true;
        },
        fetchSampleReceipt() {
            this.isLoading = true;
            axios
                .get('/test-result/get-list', {
                    params: {
                        page: this.currentPage,
                        pageSize: this.pageSize,
                        token: this.token,
                    },
                })
                .then((res) => {
                    if (res.data.success) {
                        this.bookings = res.data.data.items;
                        this.totalItems = res.data.data.totalItems;
                    } else {
                        this.bookings = [];
                        this.totalItems = 0;
                    }
                })
                .catch((err) => {
                    console.error('Lỗi khi lấy danh sách phiếu thu mẫu:', err);
                    this.bookings = [];
                    this.totalItems = 0;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        },
        getStatusLabel(value) {
            return getEnumLabel(SampleReceiptStatus, value);
        },
        async downloadPDF(sampleReceiptId) {
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            document.body.appendChild(container);

            const app = createApp(PdfRenderModal, {
                sampleReceiptId,
                onReady: async () => {
                    const elementToPrint = container.querySelector('.a4-paper');
                    const opt = {
                        margin: 0,
                        filename: `phieu_ket_qua_${sampleReceiptId}.pdf`,
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                    };
                    await html2pdf().set(opt).from(elementToPrint).save();
                    app.unmount();
                    document.body.removeChild(container);
                    toastSuccess('Tải file PDF kết quả thành công!');
                }
            });

            app.mount(container);
        }
    },
};
</script>

<style scoped>
.transaction-list {
    font-size: 0.95rem;
    color: #444;
}

.row>.col {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.row>.col.text-center {
    justify-content: center;
}

.cursor-pointer {
    cursor: pointer;
}

.fw-semibold {
    font-weight: 600;
    font-size: 1.05rem;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px 5px 0 0;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.content {
    border: 1px solid #ddd;
    border-radius: 0 0 5px 5px;
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
}

.spinner-border.text-primary {
    color: #2b3f91 !important;
    width: 2.5rem;
    height: 2.5rem;
}

.no-data {
    text-align: center;
    font-style: italic;
    padding: 2rem;
    color: #888;
}

.failed-row {
    background-color: #e06e6e;
    color: white;
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
.btn-xanhtim {
  background-color: #4257b2;
  color: white;
  border: none;
}

.btn-xanhtim:hover {
  background-color: #36499c;
  color: white;
}

</style>