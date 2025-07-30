<template>
    <div class="modal-backdrop">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-xanhtim  fw-bold">Đánh giá</h5>
                <button type="button" class="btn-close" @click="$emit('close')"></button>
            </div>
            <div class="modal-body">
                <p class="fst-italic">
                    Mọi ý kiến đóng góp của bạn là tiền đề để chúng tôi phát triển, xin chân thành cảm ơn!
                </p>
                <div class="mb-3">
                    <label class="form-label">Nội dung đánh giá</label>
                    <textarea v-model="comment" class="form-control" rows="4"
                        placeholder="Nhập đánh giá của bạn..."></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Đánh giá</label>
                    <div class="star-rating">
                        <i v-for="i in 5" :key="i" class="bi"
                            :class="i <= rating ? 'bi-star-fill text-warning' : 'bi-star text-secondary'"
                            @click="rating = i"></i>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" @click="$emit('close')">Đóng</button>
                <button class="btn btn-xanhtim" @click="submitFeedback"> <i class="bi bi-send me-1"></i> Gửi đánh
                    giá</button>
            </div>
        </div>
    </div>
</template>

<script>
import { toastSuccess } from '@/utils/toast';
import axios from '@/utils/axios'; 

export default {
    props: {
        resultId: Number,
    },
    data() {
        return {
            comment: '',
            rating: 0,
        };
    },
    mounted() {
        this.loadExistingRating();
    },
    methods: {
        submitFeedback() {
            if (!this.rating || !this.comment.trim()) {
                return alert('Vui lòng nhập đầy đủ đánh giá và chọn sao.');
            }

            const payload = {
                bookingId: this.resultId,
                stars: this.rating,
                comment: this.comment.trim(),
            };

            axios.post('/rating/new-rating', payload)
                .then(() => {
                    toastSuccess('Gửi đánh giá thành công! Cảm ơn bạn đã đóng góp ý kiến.');
                    this.$emit('close');
                })
                .catch((error) => {
                    const message = error?.response?.data?.message || 'Gửi đánh giá thất bại.';
                    alert(message);
                });
        },
        async loadExistingRating() {
        try {
        const response = await axios.get('/rating/list-rating', {
            params: { bookingId: this.resultId }
        });

        if (response?.data) {
            this.rating = response.data.stars;
            this.comment = response.data.comment;
            this.isReadonly = true; 
        }
        } catch (error) {
        }
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    border-radius: 10px;
    width: 500px;
    max-width: 95%;
    padding: 1.5rem;
    position: relative;
}

.star-rating {
    font-size: 1.5rem;
    cursor: pointer;
}

.bi-star-fill,
.bi-star {
    margin-right: 0.3rem;
}

.text-xanhtim {
    color: #4257b2;
}

.btn-xanhtim {
    background-color: #4257b2;
    color: white;
    border: none;
}

.btn-xanhtim:hover {
    background-color: #36499c;
    color: white;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
</style>