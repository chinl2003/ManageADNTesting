<template>
  <div class="topbar bg-white shadow px-6 py-2 flex justify-end items-center space-x-8 text-gray-700 text-sm border-b border-gray-400">
    <div class="flex items-center space-x-1 cursor-pointer">
      <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
      <div>Đăng nhập</div>
    </div>

    <div class="flex items-center space-x-1 cursor-pointer">
      <font-awesome-icon :icon="['fas', 'user-plus']" />
      <div>Đăng kí</div>
    </div>
  </div>
</template>
<style scoped>
.topbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem; 
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid #e7dede;
  background-color: white;
  font-size: 0.875rem;
  color: #4a5568; 
  width: 100%;
  box-sizing: border-box;
}
.topbar > div {
  display: flex;
  align-items: center;
  gap: 0.25rem; 
  cursor: pointer;
}
select {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

</style>