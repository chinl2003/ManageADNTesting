<template>
    <div class="transactions-wrapper">
        <div class="transactions-container animate-fade">
            <TransactionHeader @filter="setFilter" />
            <TransactionMain ref="mainRef" :filterStatus="status" />
        </div>
    </div>
</template>

<script>
import TransactionHeader from './header.vue';
import TransactionMain from './main.vue';

export default {
    components: { TransactionHeader, TransactionMain },
    data() {
        return {
            status: '',
        };
    },
    methods: {
        setFilter(value) {
            this.status = value;
        },
    },
};
</script>

<style scoped>
.transactions-wrapper {
    background: linear-gradient(to bottom right, #e3eafc, #f9fafe);
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.transactions-container {
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
