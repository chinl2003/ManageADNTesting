<template>
  <div class="container py-5">

    <!-- Giới thiệu -->
    <section class="mb-5 text-center animate__animated animate__fadeIn">
      <h1 class="display-5 fw-bold content">Hướng Dẫn Thu Mẫu ADN Tại Nhà</h1>
      <p class="lead">Tự thu mẫu tại nhà dễ dàng, nhanh chóng và đảm bảo chính xác đến 99.999%.</p>
      <img src="@/assets/anh12.png" alt="Kit thu mẫu ADN"
           class="img-fluid rounded shadow-sm w-75 my-3 animate__animated animate__zoomIn">
    </section>

    <!-- Bảng các loại mẫu -->
    <section class="mb-5">
      <h2 class="mb-3 text-primary">📌 Các loại mẫu được chấp nhận</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-striped align-middle">
          <thead class="table-primary">
            <tr>
              <th>Loại mẫu</th>
              <th>Mức độ phù hợp</th>
              <th>Độ chính xác</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in mauList" :key="m.ten">
              <td>{{ m.ten }}</td>
              <td>{{ m.mucDo }}</td>
              <td>{{ m.doChinhXac }}</td>
              <td>{{ m.ghiChu }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Hướng dẫn chi tiết -->
    <section class="mb-5">
      <h2 class="text-primary mb-4">🧬 Hướng dẫn chi tiết từng loại mẫu</h2>

      <div v-for="(mau, i) in huongDanList" :key="mau.ten" class="row align-items-center mb-5 animate__animated animate__fadeInUp"
           :class="{ 'flex-md-row-reverse': i % 2 === 1 }">
        <div class="col-md-6">
          <h4>{{ i + 1 }}. {{ mau.ten }}</h4>
          <ul>
            <li v-for="(b, j) in mau.buoc" :key="j">{{ b }}</li>
          </ul>
        </div>
        <div class="col-md-6 text-center">
          <img :src="mau.anh" :alt="mau.ten"
               class="img-fluid rounded shadow-sm animate__animated animate__zoomIn">
        </div>
      </div>
    </section>

    <!-- Gửi mẫu -->
    <section class="mb-5 animate__animated animate__fadeIn">
      <h2 class="text-primary mb-3">📦 Cách gửi mẫu về trung tâm</h2>
      <ol>
        <li>Cho tất cả mẫu vào túi zip chống ẩm trong kit.</li>
        <li>Ghi đầy đủ tên và mã mẫu trên bao bì.</li>
        <li>Cho vào hộp, dán kín niêm phong.</li>
        <li>Gửi về trung tâm qua bưu điện hoặc đơn vị vận chuyển.</li>
      </ol>
      <img src="@/assets/anh17.png" alt="Gửi mẫu xét nghiệm ADN"
           class="img-fluid rounded shadow-sm mt-3 animate__animated animate__slideInRight">
    </section>

    <!-- Lưu ý -->
    <section class="mb-5 animate__animated animate__fadeIn">
      <h2 class="text-danger mb-3">⚠️ Lưu ý quan trọng</h2>
      <ul class="list-group">
        <li class="list-group-item">Không chạm tay trần vào phần mẫu sinh học.</li>
        <li class="list-group-item">Không để mẫu bị ướt, nóng ẩm hay nhiễm bẩn.</li>
        <li class="list-group-item">Luôn ghi nhãn rõ ràng từng người để tránh nhầm lẫn.</li>
        <li class="list-group-item">Đảm bảo mẫu khô hoàn toàn trước khi đóng gói.</li>
      </ul>
      <img src="@/assets/anh18.png" alt="Lưu ý thu mẫu"
           class="img-fluid rounded shadow-sm mt-3 animate__animated animate__zoomIn">
    </section>
  </div>
</template>

<script>
export default {
  name: 'HuongDanThuMau',
  data() {
    return {
      mauList: [
        { ten: 'Tăm bông má trong', mucDo: '⭐⭐⭐⭐⭐', doChinhXac: 'Rất cao', ghiChu: 'Khuyến khích dùng' },
        { ten: 'Tóc có chân', mucDo: '⭐⭐⭐⭐', doChinhXac: 'Cao', ghiChu: 'Cần lấy đúng chân tóc' },
        { ten: 'Móng tay/chân', mucDo: '⭐⭐⭐', doChinhXac: 'Trung bình', ghiChu: 'Cần đủ số lượng' },
        { ten: 'Máu khô trên giấy', mucDo: '⭐⭐⭐⭐', doChinhXac: 'Cao', ghiChu: 'Dễ bảo quản' },
        { ten: 'Răng sữa', mucDo: '⭐⭐⭐⭐', doChinhXac: 'Cao', ghiChu: 'Áp dụng cho trẻ em' },
        { ten: 'Bao cao su, băng vệ sinh...', mucDo: '⭐⭐', doChinhXac: 'Thấp', ghiChu: 'Không khuyến khích' }
      ],
      huongDanList: [
        {
          ten: 'Mẫu niêm mạc miệng (Tăm bông)',
          buoc: [
            'Không ăn/uống ít nhất 1 giờ trước khi lấy mẫu.',
            'Miết mạnh tăm bông vào má trong tối thiểu 30 giây.',
            'Lấy 2–3 mẫu (cả 2 bên má).',
            'Để khô, cho vào túi zip kèm nhãn tên.'
          ],
          anh: new URL('@/assets/anh13.png', import.meta.url).href
        },
        {
          ten: 'Mẫu tóc có chân',
          buoc: [
            'Nhổ 5–10 sợi tóc có chân (phần trắng).',
            'Dùng nhíp sạch hoặc găng tay.',
            'Gói trong giấy khô, sạch, bỏ vào túi riêng.'
          ],
          anh: new URL('@/assets/anh14.png', import.meta.url).href
        },
        {
          ten: 'Mẫu móng tay/chân',
          buoc: [
            'Cắt từ 10 móng tay/chân sạch (không sơn móng).',
            'Gói trong giấy trắng, để vào túi riêng.'
          ],
          anh: new URL('@/assets/anh15.png', import.meta.url).href
        },
        {
          ten: 'Mẫu máu khô',
          buoc: [
            'Dùng kim chích lấy 1–2 giọt máu từ ngón tay.',
            'Thấm lên giấy thấm máu chuyên dụng trong kit.',
            'Để khô hoàn toàn rồi bỏ vào bao đựng riêng.'
          ],
          anh: new URL('@/assets/anh16.png', import.meta.url).href
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Responsive tweaks */
@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}

/* Optional: Enhance section spacing */
section {
  scroll-margin-top: 100px;
}

/* Hover scale effect for all images */
img:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}
.content{
    color: #2b3f91;
}
</style>