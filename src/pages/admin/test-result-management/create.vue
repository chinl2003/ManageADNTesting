<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="title">Tạo phiếu kết quả</h4>
                <button class="close-btn" @click="$emit('close')">&times;</button>
            </div>

            <div class="form-scroll">
                <div class="row">
                    
                    <div class="col-md-3">
                        <div class="form-group mb-3">
                            <label><strong class="text-dark">Đơn hàng <span
                                        class="text-danger">*</span></strong></label>
                            <multiselect v-model="selectedBooking" :options="bookingOptions" :loading="isBookingLoading"
                                :searchable="true" :clear-on-select="false" :close-on-select="true"
                                placeholder="Chọn đơn hàng" label="label" track-by="id" @search-change="fetchBookings"
                                @focus="fetchBookings" class="input-vue" />
                        </div>
                        <div class="text-end">
                            <button class="btn btn-register btn-confirm half-width" @click="confirmBooking">Xác
                                nhận</button>
                        </div>
                    </div>

                    <div v-if="confirmedBooking" class="col-md-9">
                        <div class="receipt-container p-3">
                            <h5 class="receipt-title">PHIẾU KẾT QUẢ</h5>
                            <p><strong>Loại xét nghiệm:</strong> {{ confirmedBooking.isCivil ? 'Dân sự' : 'Hành chính'
                            }}</p>
                            <p><strong>Loại dịch vụ:</strong> {{ confirmedBooking.serviceName }}</p>

                            <div class="border rounded p-3 mb-3">
                                <p><strong>Thông tin người gửi mẫu:</strong></p>
                                <div class="ms-3">
                                    <p>Họ và tên: {{ confirmedBooking.customerFullName }}</p>
                                    <p>Số điện thoại: {{ confirmedBooking.customerPhone }}</p>
                                    <p>Email: {{ confirmedBooking.customerEmail }}</p>
                                    <p>Địa chỉ: {{ confirmedBooking.customerAddress }}</p>
                                </div>
                            </div>

                            <h6 class="receipt-subtitle mt-4">THÔNG TIN XÉT NGHIỆM</h6>
                            <div class="text-end mb-2">
                                <button class="btn btn-register btn-icon-only" @click="addResultRow"
                                    title="Thêm dòng mới">
                                    <font-awesome-icon icon="circle-plus" />
                                </button>
                            </div>
                            <div class="table-responsive sample-table border rounded p-2">
                                <table class="table table-bordered align-middle text-center">
                                    <thead>
                                        <tr>
                                            <th rowspan="2" class="align-middle">STT</th>
                                            <th rowspan="2" class="align-middle">Locus</th>
                                            <template v-for="sample in bookingSamples" :key="sample.id">
                                                <th colspan="2" class="align-middle">{{ sample.sampleType }}</th>
                                            </template>
                                            <th rowspan="2" class="align-middle">PI</th>
                                            <th rowspan="2" class="align-middle"></th>
                                        </tr>
                                        <tr>
                                            <template v-for="sample in bookingSamples" :key="'sub-' + sample.id">
                                                <th class="align-middle">Allele 1</th>
                                                <th class="align-middle">Allele 2</th>
                                            </template>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(resultRow, index) in testResults" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td><input v-model="resultRow.locus" type="text"
                                                    class="form-control form-control-sm" /></td>
                                            <template v-for="sample in bookingSamples"
                                                :key="'input-' + sample.id + '-' + index">
                                                <td>
                                                    <input v-if="resultRow.samples[sample.id]"
                                                        v-model="resultRow.samples[sample.id].allele1" type="text"
                                                        class="form-control form-control-sm" />
                                                </td>
                                                <td>
                                                    <input v-if="resultRow.samples[sample.id]"
                                                        v-model="resultRow.samples[sample.id].allele2" type="text"
                                                        class="form-control form-control-sm" />
                                                </td>
                                            </template>
                                            <td><input v-model="resultRow.pi" type="text"
                                                    class="form-control form-control-sm" /></td>
                                            <td class="align-middle">
                                                <button class="btn btn-danger btn-sm" @click="removeResultRow(index)"
                                                    title="Xóa" :disabled="testResults.length === 1">
                                                    <font-awesome-icon icon="trash" />
                                                </button>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-end mt-3 gap-2">
                                    <button class="btn btn-icon-only btn-register" @click="calculateCPI">
                                        Tính CPI
                                    </button>
                                    <button class="btn btn-icon-only btn-register" @click="calculateProbability">
                                        Tính xác suất
                                    </button>
                                </div>

                                <div v-if="cpi || probability" class="mt-3 p-3 border rounded bg-light">
                                    <p v-if="cpi"><strong>CPI:</strong> {{ cpi.toFixed(2) }}</p>
                                    <p v-if="probability"><strong>Xác suất huyết thống:</strong> {{ probability.toFixed(4) }}%</p>
                                    <p v-if="probability"><strong>Kết luận:</strong> {{ conclusion }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <div class="footer-buttons">
                        <button class="btn btn-register" @click="saveForm">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import axios from '@/utils/axios'
import { toastSuccess, toastError, toastWarning } from '@/utils/toast';

import {
    SampleMethod,
    getEnumLabel
} from '@/enums/enum'

export default {
    components: { Multiselect },
    data() {
        return {
            selectedBooking: null,
            confirmedBooking: null,
            bookingOptions: [],
            isBookingLoading: false,
            currentPage: 1,
            pageSize: 20,
            receiverName: '',
            receiveDate: '',
            bookingSamples: [],
            testResults: [],
            cpi: 0,
            probability: 0,
            conclusion: ''
        }
    },
    methods: {
        removeResultRow(index) {
            this.testResults.splice(index, 1)
        },
        async fetchBookings() {
            this.isBookingLoading = true
            try {
                const res = await axios.get('/bookings/get-list', {
                    params: {
                        page: this.currentPage,
                        pageSize: this.pageSize,
                        status: null,
                        IsAll: true,
                        IsTestResult: true,
                    }
                })
                if (res.data.success) {
                    console.log("res", res)
                    this.bookingOptions = res.data.data.items.map((item) => ({
                        ...item,
                        label: `ĐH${item.id}`,
                    }))
                } else {
                    this.bookingOptions = []
                }
            } catch (err) {
                this.bookingOptions = []
            } finally {
                this.isBookingLoading = false
            }
        },
        async confirmBooking() {
            if (!this.selectedBooking) return
            try {
                const res = await axios.get('/bookings/get-list', {
                    params: {
                        bookingId: this.selectedBooking.id,
                        IsAll: true
                    }
                })

                if (res.data.success && res.data.data.items.length > 0) {
                    this.confirmedBooking = res.data.data.items[0]

                    const sampleRes = await axios.get('/sample-receipt/sample-types', {
                        params: {
                            bookingId: this.selectedBooking.id
                        }
                    })
                    if (sampleRes.data && Array.isArray(sampleRes.data)) {
                        this.bookingSamples = sampleRes.data.map((sample, index) => ({
                            ...sample,
                            id: `sample-${index}`
                        }))
                        this.testResults = [{
                            locus: '',
                            samples: Object.fromEntries(
                                this.bookingSamples.map(s => [s.id, { allele1: '', allele2: '' }])
                            ),
                            pi: ''
                        }]
                    }
                }
            } catch (error) {
            }
        },
        getSampleMethodLabel(value) {
            return getEnumLabel(SampleMethod, value)
        },
        addSampleRow() {
            this.samples.push({
                type: '',
                quantity: 1,
                status: '',
                collector: '',
                collectionTime: ''
            })
        },
        removeSampleRow(index) {
            this.samples.splice(index, 1)
        },
        addResultRow() {
            const row = {
                locus: '',
                samples: Object.fromEntries(
                    this.bookingSamples.map(s => [s.id, { allele1: '', allele2: '' }])
                ),
                pi: ''
            };
            this.testResults.push(row);
        },
        calculateCPI() {
            if (!this.testResults.length) return;

            let product = 1;
            for (const result of this.testResults) {
                const pi = parseFloat(result.pi);
                if (!isNaN(pi) && pi > 0) {
                    product *= pi;
                }
            }
            this.cpi = product || 0;
        },

        calculateProbability() {
            if (!this.cpi || this.cpi <= 0) {
                toastWarning("Cần tính CPI trước khi tính xác suất.");
                return;
            }

            this.probability = (this.cpi / (this.cpi + 1)) * 100;

            if (this.probability >= 99.9) {
                this.conclusion = `Kết quả xét nghiệm ADN cho thấy có quan hệ huyết thống cha - con giữa hai mẫu với xác suất là ${this.probability.toFixed(4)}%.`;
            } else if (this.probability >= 90) {
                this.conclusion = `Kết quả xét nghiệm ADN cho thấy khả năng có quan hệ huyết thống, tuy nhiên chưa đủ mạnh để khẳng định chắc chắn. Xác suất là ${this.probability.toFixed(4)}%.`;
            } else {
                this.conclusion = `Kết quả xét nghiệm ADN không ủng hộ giả thuyết có quan hệ huyết thống. Xác suất là ${this.probability.toFixed(4)}%.`;
            }

            toastSuccess(`Đã tính xác suất: ${this.probability.toFixed(4)}%`);
        },
        saveForm() {
            if (!this.confirmedBooking || this.testResults.length === 0) {
                toastWarning('Vui lòng chọn đơn hàng và nhập dữ liệu xét nghiệm.');
                return;
            }

            const locusResults = this.testResults.map(result => {
                const sampleEntries = Object.values(result.samples);
                return {
                    locus: result.locus,
                    allele1_Person1: sampleEntries[0]?.allele1 || '',
                    allele2_Person1: sampleEntries[0]?.allele2 || '',
                    allele1_Person2: sampleEntries[1]?.allele1 || '',
                    allele2_Person2: sampleEntries[1]?.allele2 || '',
                    pi: parseFloat(result.pi || 0),
                    note: ''
                };
            });

            const payload = {
                bookingId: this.confirmedBooking.id,
                conclusion: this.conclusion,
                cpi: this.cpi,
                probability: this.probability,
                locusResults: locusResults
            };

            axios.post('/test-result', payload)
                .then(() => {
                    toastSuccess('Lưu kết quả xét nghiệm thành công!');
                    this.$emit('close');
                })
                .catch(() => {
                    toastError('Lỗi khi lưu kết quả xét nghiệm!');
                });
        }
    }
}
</script>

<style scoped>
.form-scroll {
    padding-top: 1rem;
    padding-right: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(90vh - 120px);
    width: 100%;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    overflow: hidden;
}

.modal-content {
    background: white;
    width: 90%;
    max-width: 1200px;
    max-height: 90vh;
    overflow-x: hidden;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
}

.title {
    font-size: 1.25rem;
    font-weight: 600;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-footer {
    border-top: 1px solid #eee;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
}

.btn-register {
    background-color: #3f51b5;
    color: #fff;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    border-radius: 5px;
}

.btn-register:hover {
    background-color: #2c3ca9;
}

.btn-confirm {
    width: 100%;
}

.half-width {
    width: 50%;
}

.receipt-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    overflow-x: hidden;
}

.receipt-title {
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    text-transform: uppercase;
}

.receipt-subtitle {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 1.5rem;
}

.sample-table {
    background-color: #fafafa;
    width: 100%;
    overflow-x: hidden;
}

.sample-table .row {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.small-input {
    width: 100%;
    max-width: 300px;
}

.btn-icon-only {
    border: 1px solid #3f51b5;
    background-color: transparent;
    color: #3f51b5;
    padding: 0.2rem 0.4rem;
    border-radius: 5px;
    transition: all 0.2s ease;
}

.btn-icon-only:hover {
    background-color: #3f51b5;
    color: #ffffff;
}

input.form-control:focus {
    border-width: 1px !important;
    box-shadow: none !important;
    border-color: #3f51b5 !important;
}

.footer-buttons {
    margin-left: auto;
}
</style>
