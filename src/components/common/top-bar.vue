<template>
  <div class="topbar bg-white shadow border-b border-gray-400">
    <div class="topbar-content">
      <div class="logo pl-4">
        <img src="@/assets/logo.png" alt="Logo" class="h-6 object-contain" />
      </div>

      <div class="auth-actions flex items-center space-x-8 pr-4">
        <template v-if="fullName">
          <div class="flex items-center space-x-2 text-gray-700 font-medium user-info">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="text-base" @click="handleLogout" />
            <span>Xin chào, {{ fullName ?? '' }}</span>
          </div>
        </template>

        <template v-else>
          <router-link to="/login" class="flex items-center group-funtion cursor-pointer">
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="text-base" />
            <span class="ml-2 leading-none">Đăng nhập</span>
          </router-link>

          <router-link to="/register" class="flex items-center group-funtion cursor-pointer">
            <font-awesome-icon :icon="['fas', 'user-plus']" class="text-base" />
            <span class="ml-2 leading-none">Đăng ký</span>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullName: ''
    };
  },
  mounted() {
    this.fullName = localStorage.getItem('userFullName') || '';
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.user-info {
  display: flex;
  gap: 0.25rem;
}

.topbar {
  display: flex;
  align-items: center;
  height: 30px;
  border-bottom: 1px solid #e7dede;
  background-color: white;
  font-size: 0.875rem;
  color: #4a5568;
  width: 100%;
  box-sizing: border-box;
}

.topbar-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
}

span {
  display: inline-block;
  line-height: 1;
}

.group-funtion {
  display: flex;
  gap: 0.25rem;
}

.logo img {
  height: 4rem;
  object-fit: contain;
}
</style>