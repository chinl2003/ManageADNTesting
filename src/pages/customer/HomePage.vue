<!-- HomePage.vue -->
<template>
  <div class="h-full">
    <Header />
    <section class="text-center p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        Chào mừng đến với Trung Tâm ADN Huyết Thống
      </h1>
      <p class="text-gray-600 mb-6">
        Chúng tôi cung cấp các dịch vụ xét nghiệm chính xác và bảo mật
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/customer/Header.vue'

export default {
  components: { Header }
}
</script>
