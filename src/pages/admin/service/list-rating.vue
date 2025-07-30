<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">×</button>
      <h2 class="modal-title">Danh sách đánh giá</h2>

      <div v-if="ratings.length === 0" class="no-ratings">
        Chưa có đánh giá nào cho dịch vụ này.
      </div>

      <div v-else class="ratings-list">
        <div v-for="(rating, index) in ratings" :key="index" class="rating-card">
          <div class="rating-header">
            <strong>{{ rating.fullName }}</strong>
            <div class="stars">
              <span v-for="n in Math.floor(rating.stars / 2)" :key="n">⭐</span>
              <span v-if="rating.stars % 2 === 1">✩</span>
            </div>
          </div>
          <p class="comment">{{ rating.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ratings: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: white;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
}

.modal-title {
  text-align: center;
  margin-bottom: 20px;
}

.rating-card {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
}

.rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.stars {
  color: #f1c40f;
}

.comment {
  font-size: 14px;
  color: #333;
}

.no-ratings {
  text-align: center;
  font-style: italic;
  color: #777;
}
</style>
