<template>
  <div class="orders-wrapper">
    <div class="orders-container animate-fade">
      <Header @filter="setFilter" @add="handleAddOrder" @created="reloadOrders" />
      <Main ref="mainRef" :filterStatus="status"/>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'
import Main from './main.vue'

export default {
  components: { Header, Main },
  data() {
    return {
      status: '',
    }
  },
  methods: {
    setFilter(value) {
      this.status = value
    },
    handleAddOrder() {
      this.$router.push('/my-sample-receipts')
    },
    reloadOrders() {
      this.$refs.mainRef?.fetchSampleReceipt()
    }
  },
}
</script>

<style scoped>
.orders-wrapper {
  background: linear-gradient(to bottom right, #e3eafc, #f9fafe);
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.orders-container {
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