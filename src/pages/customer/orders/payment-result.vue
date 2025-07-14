<template>
    <div v-if="show" class="modal-backdrop">
        <div class="modal-content p-4 bg-white rounded shadow">
            <h5 class="mb-4 fw-bold">Xác nhận thanh toán</h5>

            <div class="mb-3">
                <label class="form-label fw-semibold">
                    Số tiền cần thanh toán <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control" :value="formattedAmount" @input="onAmountInput" />
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">
                    Phương thức thanh toán <span class="text-danger">*</span>
                </label>
                <select class="form-select" v-model="method">
                    <option value="VNPAY">VNPAY</option>
                    <option value="MOMO">MOMO</option>
                    <option value="ATM">ATM</option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold">
                    Ngân hàng <span class="text-danger">*</span>
                </label>
                <select class="form-select" v-model="bank">
                    <option value="NSB-TEST-BANKING">NSB-TEST-BANKING</option>
                </select>
            </div>

            <div class="text-end">
                <button class="btn btn-danger me-2" @click="$emit('close')">Hủy</button>
                <button class="btn btn-success" @click="confirmPayment">Thanh toán</button>
            </div>
        </div>
    </div>
</template>

<script>
import { toastError } from "@/utils/toast";

export default {
    props: {
        show: Boolean,
        order: Object,
    },
    data() {
        return {
            amount: 0,
            method: "VNPAY",
            bank: "NSB-TEST-BANKING",
        };
    },
    computed: {
        formattedAmount() {
            return this.amount.toLocaleString("vi-VN");
        },
    },
    watch: {
        show(val) {
            if (val && this.order) {
                this.amount = this.order.totalPrice;
            }
        },
    },
    methods: {
        onAmountInput(e) {
            const raw = e.target.value.replace(/\D/g, "");
            this.amount = parseInt(raw || "0", 10);
        },
        confirmPayment() {
            if (!this.amount || this.amount <= 0) {
                toastError("Vui lòng nhập số tiền.");
                return;
            }
            if (!this.method.trim()) {
                toastError("Vui lòng chọn phương thức thanh toán.");
                return;
            }
            if (!this.bank.trim()) {
                toastError("Vui lòng chọn ngân hàng.");
                return;
            }

            this.$emit("confirm", {
                method: this.method,
                bank: this.bank,
                amount: this.amount,
            });
        }
    },
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    width: 400px;
    max-width: 95%;
    border-radius: 8px;
}

.form-control:focus,
.form-select:focus {
    border-color: #ccc !important;
    box-shadow: none !important;
    outline: none !important;
}

.form-select option:hover {
    background-color: #2b3f91 !important;
    color: white;
}
</style>