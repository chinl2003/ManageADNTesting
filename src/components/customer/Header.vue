<template>
  <header class="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <img src="@/assets/logo.png" alt="Logo" class="h-10">
    <nav class="space-x-4">
      <div>Trang chủ</div>
      <div>Dịch vụ</div>
      <div>Blog</div>
      <div>Đặt hẹn</div>
      <div class="flex items-center space-x-1">
        <font-awesome-icon :icon="['fas', 'user']" />
        <span>Tài khoản</span>
      </div>
    </nav>
  </header>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid #e7dede;
}

header img {
  height: 25px;
  object-fit: contain;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: 500;
  font-size: 1rem;
}

nav>* {
  cursor: pointer;
  color: #4a5568;
  text-decoration: none;
  transition: color 0.2s ease;
}

nav>*:hover {
  color: #2b6cb0;
}
</style>