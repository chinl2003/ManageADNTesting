<template>
  <div class="container py-5">

    <!-- Header -->
    <section class="text-center mb-5 animate__animated animate__fadeInDown">
      <h1 class="display-5 fw-bold text">🧬 Khám Phá Thế Giới ADN</h1>
      <p class="lead">Những điều thú vị, ứng dụng và tầm quan trọng của ADN trong cuộc sống hiện đại.</p>
      <img src="@/assets/anh19.png" alt="Cấu trúc ADN"
           class="img-fluid rounded shadow my-4 animate__animated animate__zoomIn scale-hover w-75">
    </section>

    <!-- Blog Content -->
    <section class="mb-5">
      <div class="row mb-5 align-items-center animate__animated animate__fadeInLeft">
        <div class="col-md-6">
          <h3 class="text-primary">1️⃣ ADN là gì?</h3>
          <p>
            ADN (axit deoxyribonucleic) là vật chất di truyền chứa thông tin quy định sự phát triển và hoạt động của mọi sinh vật sống. Mỗi người có một mã ADN riêng biệt – đó là lý do tại sao xét nghiệm ADN có thể xác định danh tính, huyết thống hoặc đặc điểm di truyền.
          </p>
        </div>
        <div class="col-md-6 text-center">
          <img src="@/assets/anh20.png" alt="ADN là gì"
               class="img-fluid rounded shadow scale-hover">
        </div>
      </div>

      <div class="row mb-5 align-items-center animate__animated animate__fadeInRight flex-md-row-reverse">
        <div class="col-md-6">
          <h3 class="text-primary">2️⃣ Ứng dụng của ADN</h3>
          <ul>
            <li>Xác định huyết thống: cha – con, mẹ – con, anh chị em...</li>
            <li>Giải mã di truyền học: tìm hiểu bệnh di truyền, đột biến gen.</li>
            <li>Hỗ trợ điều tra pháp y, nhận dạng cá nhân.</li>
            <li>Tìm nguồn gốc tổ tiên, phân tích nguồn gốc dân tộc.</li>
          </ul>
        </div>
        <div class="col-md-6 text-center">
          <img src="@/assets/anh21.png" alt="Ứng dụng ADN"
               class="img-fluid rounded shadow scale-hover">
        </div>
      </div>

      <div class="row mb-5 align-items-center animate__animated animate__fadeInUp">
        <div class="col-md-6">
          <h3 class="text-primary">3️⃣ ADN và sức khỏe</h3>
          <p>
            Mỗi gen trong ADN có thể liên quan đến nguy cơ mắc các bệnh như tiểu đường, ung thư, Alzheimer,... Việc giải mã ADN giúp bạn hiểu rõ nguy cơ để có kế hoạch sống lành mạnh, phòng tránh từ sớm.
          </p>
        </div>
        <div class="col-md-6 text-center">
          <img src="@/assets/anh22.png" alt="ADN và sức khỏe"
               class="img-fluid rounded shadow scale-hover">
        </div>
      </div>

      <div class="row mb-5 align-items-center animate__animated animate__fadeInLeft flex-md-row-reverse">
        <div class="col-md-6">
          <h3 class="text-primary">4️⃣ Xét nghiệm ADN có chính xác không?</h3>
          <p>
            Xét nghiệm ADN hiện đại có độ chính xác lên đến 99.999%. Miễn là mẫu được thu đúng quy cách, kết quả luôn đáng tin cậy, được ứng dụng trong pháp luật, y tế, và dân sự.
          </p>
        </div>
        <div class="col-md-6 text-center">
          <img src="@/assets/anh23.png" alt="Độ chính xác của ADN"
               class="img-fluid rounded shadow scale-hover">
        </div>
      </div>

      <div class="row mb-5 align-items-center animate__animated animate__fadeInRight">
        <div class="col-md-6">
          <h3 class="text-primary">5️⃣ ADN và cá nhân hóa trong tương lai</h3>
          <p>
            Thế giới đang hướng tới y học cá nhân hóa – nơi mỗi người được chăm sóc theo hồ sơ ADN riêng biệt. Điều này giúp tăng hiệu quả điều trị và giảm tác dụng phụ. ADN cũng giúp cá nhân hóa chế độ ăn, thể thao và lối sống.
          </p>
        </div>
        <div class="col-md-6 text-center">
          <img src="@/assets/anh24.png" alt="ADN tương lai"
               class="img-fluid rounded shadow scale-hover">
        </div>
      </div>
    </section>

    <!-- Kết luận -->
    <section class="text-center animate__animated animate__fadeInUpBig">
      <h2 class="text-success fw-bold mb-4">💡 ADN không chỉ là khoa học – mà còn là chìa khóa mở ra hiểu biết về chính bạn!</h2>
      <img src="@/assets/anh24.png" alt="Tương lai của ADN"
           class="img-fluid rounded shadow scale-hover w-75">
      <p class="mt-4">Hãy khám phá bản thân mình thông qua bộ gen – đơn giản, bảo mật và đầy giá trị!</p>
    </section>

  </div>
</template>

<script>
export default {
  name: 'ChiaSeVeADN'
};
</script>

<style scoped>
/* Responsive font */
@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}

/* Tạo hiệu ứng scale khi hover ảnh */
.scale-hover {
  transition: transform 0.4s ease-in-out;
}
.scale-hover:hover {
  transform: scale(1.05);
  cursor: pointer;
}

/* Section spacing */
section {
  scroll-margin-top: 100px;
}
.text {
  color: #2b3f91; 
}
</style>
