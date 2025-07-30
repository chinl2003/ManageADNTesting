<template>
  <div class="home-wrapper">
    <!-- HERO -->
    <section class="hero-section animate-fade">
      <div class="text-content">
        <h1 class="hero-title">Cơ sở xét nghiệm hiện đại & uy tín</h1>
        <p class="hero-subtitle">
          Chúng tôi cung cấp các dịch vụ xét nghiệm nhanh chóng, chính xác, đạt chuẩn quốc tế.
        </p>
        <router-link to="/register">
          <button class="btn">Tạo tài khoản miễn phí</button>
        </router-link>
      </div>
      <div class="image-content">
        <img src="@/assets/anh6.png" alt="Xét nghiệm" class="hero-img animate-zoom" />
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about-section animate-fade-up">
      <div class="about-left">
        <img src="@/assets/anh7.png" alt="Phòng xét nghiệm" class="about-img animate-zoom" />
      </div>
      <div class="about-right">
        <h2 class="section-title">Về chúng tôi</h2>
        <p>
          Với hơn 10 năm kinh nghiệm trong lĩnh vực xét nghiệm y khoa, chúng tôi tự hào sở hữu đội ngũ chuyên gia hàng đầu và hệ thống máy móc đạt chuẩn quốc tế.
        </p>
        <ul class="checklist">
          <li>✔ Đội ngũ chuyên gia giàu kinh nghiệm</li>
          <li>✔ Máy móc hiện đại, đạt chuẩn ISO</li>
          <li>✔ Bảo mật thông tin tuyệt đối</li>
          <li>✔ Kết quả trả nhanh và chính xác</li>
        </ul>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="services-section animate-fade">
      <h2 class="section-title">Dịch vụ của chúng tôi</h2>
      <div class="services-grid">
        <div class="service-card animate-zoom-in" v-for="(srv, i) in services" :key="i">
          <img :src="srv.img" :alt="srv.title" />
          <h3>{{ srv.title }}</h3>
          <p>{{ srv.desc }}</p>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section class="team-section animate-fade-up">
      <h2 class="section-title">Đội ngũ chuyên gia</h2>
      <div class="team-grid">
        <div class="team-card animate-zoom-in" v-for="(member, index) in team" :key="index">
          <img :src="member.img" alt="Chuyên gia" />
          <h3>{{ member.name }}</h3>
          <p>{{ member.title }}</p>
        </div>
      </div>
    </section>

    <!-- AWARDS -->
    <section class="awards-section animate-fade">
      <h2 class="section-title">Thành tựu & Giải thưởng</h2>
      <div class="awards-grid">
        <div class="award-card animate-zoom-in" v-for="(award, i) in awards" :key="i">
          <img :src="award.img" :alt="award.title" />
          <p>{{ award.title }}</p>
        </div>
      </div>
    </section>

    <!-- FEEDBACK -->
    <section class="feedback-section animate-fade-up">
      <h2 class="section-title">Phản hồi từ khách hàng</h2>
      <div class="feedback-grid">
        <div class="feedback-card animate-zoom-in" v-for="(fb, idx) in feedbacks" :key="idx">
          <p>"{{ fb.text }}"</p>
          <strong>- {{ fb.name }}</strong>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      team: [
        { name: 'BS. Nguyễn Văn A', title: 'Chuyên gia sinh học phân tử', img: new URL('@/assets/anh1.png', import.meta.url).href },
        { name: 'ThS. Trần Thị B', title: 'Chuyên gia huyết học', img: new URL('@/assets/anh2.png', import.meta.url).href },
        { name: 'BS. Lê Văn C', title: 'Trưởng phòng xét nghiệm', img: new URL('@/assets/anh3.png', import.meta.url).href }
      ],
      awards: [
        { title: 'Giải thưởng Chất lượng Y tế Quốc gia', img: new URL('@/assets/anh4.png', import.meta.url).href },
        { title: 'Top 10 cơ sở xét nghiệm uy tín 2024', img: new URL('@/assets/anh5.png', import.meta.url).href },
      ],
      services: [
        {
          title: 'Xét nghiệm máu',
          desc: 'Phát hiện các bệnh lý máu và rối loạn miễn dịch.',
          img: new URL('@/assets/anh5.png', import.meta.url).href
        },
        {
          title: 'Xét nghiệm sinh hóa',
          desc: 'Đánh giá chức năng gan, thận, mỡ máu,...',
          img: new URL('@/assets/anh5.png', import.meta.url).href
        },
        {
          title: 'Xét nghiệm di truyền',
          desc: 'Tầm soát bệnh lý di truyền và dị tật bẩm sinh.',
          img: new URL('@/assets/anh5.png', import.meta.url).href
        }
      ],
      feedbacks: [
        { name: 'Nguyễn Thị Hương', text: 'Dịch vụ nhanh chóng, nhân viên tận tình.' },
        { name: 'Trần Văn Minh', text: 'Trang thiết bị hiện đại, rất hài lòng.' },
        { name: 'Lê Hoàng Nam', text: 'Tôi sẽ giới thiệu cho bạn bè và người thân.' }
      ]
    };
  }
};
</script>

<style scoped>
.home-wrapper {
  background: linear-gradient(to bottom right, #e3eafc, #f9fafe);
  padding: 2rem;
}

/* HERO */
.hero-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.06);
  margin-bottom: 3rem;
}

.text-content {
  flex: 1 1 50%;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: bold;
  color: #2b3f91;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.image-content {
  flex: 1 1 40%;
  text-align: center;
}

.hero-img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

/* ABOUT */
.about-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  align-items: center;
}

.about-left, .about-right {
  flex: 1 1 50%;
}

.about-img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.section-title {
  font-size: 2rem;
  color: #2b3f91;
  margin-bottom: 1rem;
}

.checklist li {
  list-style: none;
  margin: 0.5rem 0;
  color: #333;
}

/* SERVICES */
.services-section {
  background: #fff;
  padding: 3rem;
  margin-bottom: 3rem;
  border-radius: 16px;
}

.services-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.service-card {
  background: #f6f9ff;
  padding: 1.5rem;
  border-radius: 12px;
  width: 250px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.service-card img {
  width: 100px;
  margin-bottom: 1rem;
}

/* TEAM */
.team-section {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 3rem;
}

.team-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.team-card {
  width: 220px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card img {
  width: 100%;
  border-radius: 50%;
  border: 4px solid #4257b2;
  margin-bottom: 1rem;
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

/* AWARDS */
.awards-grid {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}
.award-card {
  width: 200px;
  text-align: center;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.award-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}
.award-card img {
  width: 100px;
  height: auto;
  margin-bottom: 0.5rem;
}

/* FEEDBACK */
.feedback-section {
  margin-bottom: 3rem;
  background: #f9fbff;
  padding: 3rem;
  border-radius: 16px;
}
.feedback-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  
}
.feedback-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  width: 280px;
  font-style: italic;
  color: #444;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.feedback-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}
/* CONTACT */
.contact-section {
  text-align: center;
  padding: 2rem 1rem;
  background: #f1f5ff;
  border-radius: 12px;
  color: #333;
}

/* BUTTON */
.btn {
  background-color: #4257b2;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s;
}
.btn:hover {
  transform: scale(1.05);
  background-color: #2b3f91;
}

/* ANIMATIONS */
.animate-fade {
  animation: fadeIn 1s ease-in-out;
}
.animate-fade-up {
  animation: fadeUp 1s ease-in-out;
}
.animate-zoom {
  animation: zoomIn 1.2s ease-in-out;
}
.animate-zoom-in {
  animation: zoomIn 0.8s ease-in-out;
}
.animate-fade,
.animate-fade-up,
.animate-zoom-in {
  will-change: transform, opacity;
  animation-fill-mode: both;
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
