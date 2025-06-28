<template>
  <header class="bg-white shadow-md px-6 flex justify-between items-center">
    <nav class="nav-menu w-full">
      <div>Trang chủ</div>
      <div>Dịch vụ</div>
      <div>Blog</div>
      <div>Đặt hẹn</div>
      <div class="flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'user']" class="mr-1" />
        <span>Tài khoản</span>
      </div>
    </nav>
  </header>
</template>
<style scoped>
header {
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #e7dede;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: 500;
  font-size: 1rem;
}

.nav-menu > div {
  flex: 1; 
  text-align: center;
  cursor: pointer;
  color: #4a5568;
  transition: color 0.2s ease;
  padding: 1rem 0; 
}

.nav-menu > div:hover {
  color: #2b6cb0;
}
</style>
