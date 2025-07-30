<template>
  <footer class="footer-wrapper">
    <div class="footer-grid">
      <!-- Cột 1: Giới thiệu -->
      <div class="footer-column">
        <h2>Trung Tâm ADN Huyết Thống</h2>
        <p>Đơn vị uy tín cung cấp dịch vụ xét nghiệm ADN dân sự và hành chính.</p>
        <p><strong>Giờ làm việc:</strong><br /> 8h – 17h (Thứ 2 – Thứ 7)</p>
      </div>

      <!-- Cột 2: Liên hệ -->
      <div class="footer-column">
        <h3>Liên hệ</h3>
        <p><span class="emoji">📍</span> 123 Đường Sức Khỏe, Q1, TP.HCM</p>
        <p><span class="emoji">📞</span> 0909 123 456</p>
        <p><span class="emoji">📧</span> contact@xetnghiemyte.vn</p>
      </div>

      <!-- Cột 3: Dịch vụ -->
      <div class="footer-column">
        <h3>Dịch vụ nổi bật</h3>
        <ul>
          <li>ADN cha con</li>
          <li>Dòng mẹ</li>
          <li>Pháp lý</li>
          <li>Tư vấn miễn phí</li>
        </ul>
      </div>

      <!-- Cột 4: Tư vấn -->
      <div class="footer-column">
        <h3>Đăng ký tư vấn</h3>
        <form @submit.prevent="handleSubmit">
          <input type="text" placeholder="Họ và tên" required />
          <input type="tel" placeholder="Số điện thoại" required />
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>

    <!-- Mạng xã hội -->
    <div class="footer-social">
      <a href="#" aria-label="Facebook"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
      <a href="#" aria-label="Zalo"><font-awesome-icon :icon="['fas', 'comment-dots']" /></a>
      <a href="#" aria-label="Instagram"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
    </div>

    <p class="footer-note">&copy; 2025 Trung Tâm ADN Huyết Thống. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.");
    }
  }
}
</script>

<style scoped>
.footer-wrapper {
  background: linear-gradient(to right, #eef2ff, #f7faff);
  padding: 3rem 1.5rem;
  color: #2d3748;
  font-family: 'Segoe UI', sans-serif;
  border-top: 3px solid #4257b2;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  text-align: left;
}

.footer-column h2,
.footer-column h3 {
  color: #2b3f91;
  margin-bottom: 0.5rem;
}

.footer-column p,
.footer-column li {
  font-size: 0.95rem;
  margin: 0.4rem 0;
  color: #4a5568;
}

.footer-column ul {
  padding: 0;
  list-style: none;
}

.footer-column form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.footer-column input {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 0.95rem;
}
.footer-column button {
  background-color: #4257b2;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.footer-column button:hover {
  background-color: #2b3f91;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
.footer-social a {
  font-size: 1.5rem;
  color: #4257b2;
  transition: transform 0.3s, color 0.3s;
}
.footer-social a:hover {
  transform: scale(1.2);
  color: #2b3f91;
}

.footer-note {
  font-size: 0.875rem;
  text-align: center;
  color: #718096;
  border-top: 1px solid #cbd5e0;
  padding-top: 1rem;
  margin-top: 1rem;
}

.emoji {
  margin-right: 0.4rem;
}
</style>
