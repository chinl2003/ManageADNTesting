<template>
  <div class="relative">
    <header class="bg-white shadow-md px-6 flex justify-between items-center" ref="headerRef">
      <nav class="nav-menu w-full">
        <div>Trang chủ</div>
        <div>Các loại dịch vụ</div>
        <div>Hướng dẫn thu mẫu</div>
        <div>Chia sẻ về ADN</div>

        <!-- Đã đăng nhập -->
        <div v-if="isAuthenticated" class="relative flex items-center justify-center account-menu" ref="accountRef"
          @click="toggleDropdown">
          <font-awesome-icon :icon="['fas', 'user']" class="mr-1" />
          <span>Tài khoản của tôi</span>
        </div>

        <!-- Chưa đăng nhập -->
        <div v-else class="relative flex items-center justify-center account-menu cursor-pointer" @click="goToLogin">
          <font-awesome-icon :icon="['fas', 'user']" class="mr-1" />
          <span class="text-gray-500 hover:text-blue-600 transition">
            Xác thực tài khoản
          </span>
        </div>
      </nav>
    </header>

    <div v-if="dropdownOpen" class="dropdown-options bg-white shadow-md rounded-md z-50"
      :style="{ position: 'absolute', top: dropdownTop + 'px', right: 0 }">
      <div class="dropdown-item" @click="goToMyOrders">
        <font-awesome-icon :icon="['fas', 'history']" class="icon" />
        <span class="label">Đơn hàng của tôi</span>
      </div>
      <div class="dropdown-item" @click="goToMySampleReceipts">
        <font-awesome-icon :icon="['fas', 'vial']" class="icon" />
        <span class="label">Xác nhận mẫu đã gửi</span>
      </div>
      <div class="dropdown-item" @click="goToMyResults">
        <font-awesome-icon :icon="['fas', 'vial']" class="icon" />
        <span class="label">Kết quả xét nghiệm</span>
      </div>
      <div class="dropdown-item" @click="goToTransactionHistory">
        <font-awesome-icon :icon="['fas', 'file-invoice-dollar']" class="icon" />
        <span class="label">Lịch sử giao dịch</span>
      </div>
      <div class="dropdown-item" @click="goToMyProfile">
        <font-awesome-icon :icon="['fas', 'id-card']" class="icon" />
        <span class="label">Hồ sơ của tôi</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      dropdownTop: 0,
      dropdownLeft: 0,
      isAuthenticated: false
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    this.isAuthenticated = !!token
    this.checkAuth()
    this.tokenChecker = setInterval(() => {
      this.checkAuth()
    }, 500)
    document.addEventListener("click", this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside)
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token')
      this.isAuthenticated = !!token
    },
    toggleDropdown() {
      if (!this.isAuthenticated) return

      this.dropdownOpen = !this.dropdownOpen
      this.$nextTick(() => {
        if (this.$refs.accountRef) {
          const rect = this.$refs.accountRef.getBoundingClientRect()
          this.dropdownTop = rect.bottom + window.scrollY
          this.dropdownLeft = rect.left + window.scrollX
        }
      })
    },
    handleClickOutside(event) {
      if (
        this.dropdownOpen &&
        this.$refs.accountRef &&
        !this.$refs.accountRef.contains(event.target)
      ) {
        this.dropdownOpen = false
      }
    },
    goToLogin() {
      this.$router.push('/veryfy-email')
    },

    goToMyOrders() {
      this.dropdownOpen = false
      this.$router.push('/my-orders')
    },
    goToTransactionHistory() {
      this.dropdownOpen = false
      this.$router.push('/transaction-history')
    },
    goToMySampleReceipts() {
      this.dropdownOpen = false
      this.$router.push('/my-sample-receipts')
    },
    goToMyResults() {
      this.dropdownOpen = false
      this.$router.push('/my-results')
    },
    goToMyProfile() {
      this.dropdownOpen = false
      this.$router.push('/my-profile')
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #e7dede;
  z-index: 10;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
}

.nav-menu>div {
  flex: 1;
  text-align: center;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s ease;
  padding: 1rem 0;
  position: relative;
}

.nav-menu>div:hover {
  color: #2b6cb0;
}

.dropdown-options {
  border: 1px solid #ddd;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow: hidden;
  background-color: white;
  z-index: 1000;
}

.dropdown-item {
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #718096;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
}

.dropdown-item .icon {
  margin-right: 6px;
  color: #718096;
  transition: color 0.3s;
}

.dropdown-item .label {
  flex: 1;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #5a67d8;
  color: #fff;
}

.dropdown-item:hover .icon {
  color: #fff;
}
</style>