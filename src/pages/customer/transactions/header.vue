<template>
    <div class="row mb-4 align-items-center">
        <div class="col-md-5 header">
            <h2 class="title">Lịch sử giao dịch</h2>
        </div>
        <div class="col-md-7 d-flex justify-content-end align-items-center gap-3 search">
            <Multiselect v-model="selectedStatus" :options="statusOptions" placeholder="Chọn trạng thái" label="label"
                track-by="value" class="custom-multiselect" @update:modelValue="onStatusChange" />
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { TransactionStatus } from '@/enums/enum';

export default {
    components: { Multiselect },
    data() {
        return {
            selectedStatus: null,
            statusOptions: [],
        };
    },
    created() {
        this.statusOptions = this.generateStatusOptions();
    },
    methods: {
        generateStatusOptions() {
            const options = [{ value: '', label: 'Tất cả trạng thái' }];
            for (const key in TransactionStatus) {
                if (!isNaN(key)) {
                    options.push({
                        value: Number(key),
                        label: TransactionStatus[key],
                    });
                }
            }
            return options;
        },
        onStatusChange(val) {
            this.$emit('filter', val?.value ?? '');
        },
    },
};
</script>

<style scoped>
@import "vue-multiselect/dist/vue-multiselect.min.css";

.title {
    font-size: 2rem;
    font-weight: bold;
    color: #2b3f91;
}

.custom-multiselect {
    width: 50%;
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

.search {
    padding-right: 0 !important;
}

.header {
    padding-left: 0 !important;
}
</style>
