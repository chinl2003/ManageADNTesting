<template>
  <div class="services-wrapper">
    <!-- HEADER -->
    <section class="services-hero animate-fade">
      <h1 class="page-title">Dịch vụ xét nghiệm chuyên sâu & linh hoạt</h1>
      <p class="page-subtitle">
        Đáp ứng mọi nhu cầu từ xét nghiệm nhanh, xét nghiệm tại nhà, đến các yêu cầu phục vụ hành chính hoặc dân sự.
      </p>
    </section>

    <!-- CATEGORIES -->
    <section class="categories-section animate-fade-up">
      <h2 class="section-title">Các loại xét nghiệm</h2>
      <div class="categories-grid">
        <div class="category-card animate-zoom-in" v-for="(srv, i) in services" :key="i">
          <img :src="srv.img" :alt="srv.title" />
          <h3>{{ srv.title }}</h3>
          <p>{{ srv.desc }}</p>
        </div>
      </div>
    </section>

    <!-- SERVICE DETAIL OPTIONS -->
    <section class="options-section animate-fade">
      <h2 class="section-title">Tùy chọn gói dịch vụ</h2>
      <div class="options-grid">
        <div class="option-card">
          <h3>⏱ Thời gian trả kết quả</h3>
          <ul>
            <li>4 giờ - Gấp</li>
            <li>24 giờ - Tiêu chuẩn</li>
            <li>48 giờ - Tiết kiệm</li>
          </ul>
        </div>
        <div class="option-card">
          <h3>📍 Hình thức lấy mẫu</h3>
          <ul>
            <li>Tại cơ sở</li>
            <li>Tại nhà</li>
          </ul>
        </div>
        <div class="option-card">
          <h3>📄 Mục đích sử dụng</h3>
          <ul>
            <li>Dân sự</li>
            <li>Hành chính (hồ sơ, visa, tuyển dụng...)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section class="pricing-section animate-fade-up">
      <h2 class="section-title">Bảng giá tham khảo</h2>
      <div class="pricing-table">
        <table>
          <thead>
            <tr>
              <th>Loại xét nghiệm</th>
              <th>Thời gian</th>
              <th>Hình thức</th>
              <th>Mục đích</th>
              <th>Giá (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pkg, i) in pricing" :key="i">
              <td>{{ pkg.type }}</td>
              <td>{{ pkg.time }}</td>
              <td>{{ pkg.location }}</td>
              <td>{{ pkg.purpose }}</td>
              <td>{{ pkg.price.toLocaleString() }} đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      services: [
        {
          title: 'Xét nghiệm huyết học',
          desc: 'Phân tích thành phần máu, tầm soát bệnh lý liên quan đến máu.',
          img: new URL('@/assets/anh8.png', import.meta.url).href
        },
        {
          title: 'Xét nghiệm sinh hóa',
          desc: 'Đánh giá chức năng gan, thận, mỡ máu, đường huyết...',
          img: new URL('@/assets/anh9.png', import.meta.url).href
        },
        {
          title: 'Xét nghiệm vi sinh',
          desc: 'Phát hiện vi khuẩn, virus, ký sinh trùng gây bệnh.',
          img: new URL('@/assets/anh10.png', import.meta.url).href
        },
        {
          title: 'Xét nghiệm di truyền',
          desc: 'Tầm soát bệnh lý di truyền, định danh ADN.',
          img: new URL('@/assets/anh11.png', import.meta.url).href
        }
      ],
      pricing: [
        {
          type: 'Sinh hóa cơ bản',
          time: '24 giờ',
          location: 'Tại cơ sở',
          purpose: 'Dân sự',
          price: 300000
        },
        {
          type: 'Xét nghiệm máu toàn phần',
          time: '4 giờ',
          location: 'Tại nhà',
          purpose: 'Hành chính',
          price: 550000
        },
        {
          type: 'ADN huyết thống',
          time: '48 giờ',
          location: 'Tại cơ sở',
          purpose: 'Hành chính',
          price: 1200000
        },
        {
          type: 'Tầm soát dị tật thai nhi (NIPT)',
          time: '24 giờ',
          location: 'Tại nhà',
          purpose: 'Dân sự',
          price: 2500000
        }
      ]
    };
  }
};
</script>

<style scoped>
.services-wrapper {
  background: linear-gradient(to bottom right, #e3eafc, #f9fafe);
  padding: 2rem;
}

/* HEADER */
.services-hero {
  text-align: center;
  padding: 3rem 1rem;
  background: #fff;
  border-radius: 16px;
  margin-bottom: 3rem;
}
.page-title {
  font-size: 2.5rem;
  color: #2b3f91;
  font-weight: bold;
  margin-bottom: 1rem;
}
.page-subtitle {
  font-size: 1.125rem;
  color: #555;
  line-height: 1.6;
}

/* CATEGORIES */
.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.category-card {
  width: 250px;
  background: #f6f9ff;
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
}
.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 18px rgba(0,0,0,0.1);
}
.category-card img {
  width: 100px;
  margin-bottom: 1rem;
}

/* OPTIONS */
.options-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
}
.option-card {
  width: 260px;
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.06);
}
.option-card h3 {
  font-size: 1.125rem;
  color: #2b3f91;
  margin-bottom: 0.5rem;
}
.option-card ul {
  list-style-type: disc;
  padding-left: 1.25rem;
  color: #444;
}

/* PRICING */
.pricing-section {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
}
.pricing-table {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
thead {
  background: #4257b2;
  color: white;
}
th, td {
  padding: 1rem;
  border: 1px solid #ddd;
}
tbody tr:hover {
  background-color: #f2f4fc;
}

/* COMMON */
.section-title {
  font-size: 2rem;
  color: #2b3f91;
  margin: 2rem 0 1rem;
  text-align: center;
}

/* ANIMATIONS */
.animate-fade {
  animation: fadeIn 1s ease-in-out;
}
.animate-fade-up {
  animation: fadeUp 1s ease-in-out;
}
.animate-zoom-in {
  animation: zoomIn 0.8s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes zoomIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
