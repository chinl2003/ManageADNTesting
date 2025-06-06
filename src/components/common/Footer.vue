<template>
  <footer class="bg-gray-100 text-center text-gray-700 text-sm px-6 py-6 mt-10">
    <div>
      <p>Trung Tâm ADN Huyết Thống là đơn vị uy tín cung cấp dịch vụ xét nghiệm ADN dân sự và hành chính.</p>
      <p>Giờ làm việc: 8h – 17h (Thứ 2 – Thứ 7)</p>
    </div>

    <div class="flex justify-between mt-6 max-w-4xl mx-auto text-gray-600">
      <div class="flex items-center space-x-2">
        <font-awesome-icon :icon="['fas', 'phone-alt']" />
        <span>0819790919</span>
      </div>

      <div class="flex items-center space-x-2">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <span>123 Đường ABC, Quận XYZ, TP. HCM</span>
      </div>

      <div class="flex items-center space-x-2">
        <font-awesome-icon :icon="['fas', 'envelope']" />
        <span>MATAP@gmail.com</span>
      </div>
    </div>
  </footer>
</template>
<style scoped>
footer {
  background-color: #f7fafc; 
  color: #4a5568; 
  font-size: 0.875rem; 
  padding: 1.5rem 1.5rem; 
  margin-top: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 150px; 
}

footer > div:first-child {
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

footer > div:last-child {
  display: flex;
  justify-content: center;
  gap: 4rem;
  max-width: 640px; 
  width: 100%;
  color: #718096; 
}

footer > div:last-child > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>

