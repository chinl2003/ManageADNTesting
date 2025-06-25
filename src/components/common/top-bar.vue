<template>
  <div class="topbar bg-white shadow border-b border-gray-400">
    <div class="topbar-content">
      <div class="logo pl-4">
        <img src="@/assets/logo.png" alt="Logo" class="h-6 object-contain" />
      </div>

      <div class="auth-actions flex items-center space-x-8 pr-4">
        <div class="flex items-center group-funtion cursor-pointer">
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" class="text-base" />
          <span class="ml-2 leading-none">Đăng nhập</span>
        </div>
        <div class="flex items-center group-funtion cursor-pointer">
          <font-awesome-icon :icon="['fas', 'user-plus']" class="text-base" />
          <span class="ml-2 leading-none">Đăng kí</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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