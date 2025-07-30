<template>
    <div class="profile-wrapper">
        <div class="profile-card animate-fade">
            <h2 class="title">Hồ sơ cá nhân</h2>
            <p class="subtitle">Thông tin người dùng hiện tại</p>

            <div class="avatar-section">
                <img :src="previewImage || defaultAvatar" class="avatar" />
                <label class="upload-btn">
                    Tải ảnh lên
                    <input type="file" accept="image/*" @change="onImageChange" hidden />
                </label>
                <small v-if="profile.avatarPath" style="margin-top: 5px; color: #666;">
                    {{ profile.avatarPath }}
                </small>
            </div>

            <div class="info-grid">
                <div class="info-item"><strong>Họ tên:</strong> <input v-model="profile.fullName" /></div>
                <div class="info-item"><strong>Email:</strong> <input v-model="profile.email" /></div>
                <div class="info-item"><strong>Số điện thoại:</strong> <input v-model="profile.phone" /></div>
                <div class="info-item"><strong>Địa chỉ:</strong> <input v-model="profile.address" /></div>
                <div class="info-item"><strong>Ngày sinh:</strong> <input type="date" v-model="profile.dateOfBirth" />
                </div>
                <div class="info-item">
                    <strong>Giới tính:</strong>
                    <select v-model="profile.gender">
                        <option value="">-- Chọn giới tính --</option>
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                    </select>
                </div>
            </div>

            <div class="update-btn-wrapper">
                <button class="update-btn" @click="updateProfile">Cập nhật</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import { toastSuccess, toastError } from '@/utils/toast';

export default {
    name: 'UserProfilePage',
    data() {
        return {
            profile: {},
            email: '',
            role: '',
            previewImage: null,
            selectedAvatarFile: null,
            defaultAvatar: 'https://via.placeholder.com/120x120.png?text=Avatar',
            avatarBaseUrl: 'http://localhost:5119/uploads/avatars/' // <-- cập nhật lại domain thật của bạn
        };
    },
    mounted() {
        this.fetchUserProfile();
    },
    methods: {
        formatDateToInput(dateStr) {
            const date = new Date(dateStr);
            if (!isNaN(date)) {
                return date.toISOString().split('T')[0];
            }
            return '';
        },

        async fetchUserProfile() {
            try {
                const res = await axios.get('/users/me');
                if (res.data.success) {
                    this.profile = res.data.data;

                    this.profile.dateOfBirth = this.formatDateToInput(this.profile.dateOfBirth);

                    this.previewImage = this.profile.avatarPath
                        ? `http://localhost:5119${this.profile.avatarPath}`
                        : null;


                    this.email = localStorage.getItem('userEmail') || '';
                    this.role = localStorage.getItem('userRole') || '';
                } else {
                    toastError(res.data.message || 'Không thể tải hồ sơ người dùng.');
                }
            } catch (error) {
                toastError(error.response?.data?.message || 'Lỗi khi tải hồ sơ.');
            }
        },

        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedAvatarFile = file;
                this.previewImage = URL.createObjectURL(file);
            }
        },

        async updateProfile() {
            try {
                const formData = new FormData();
                formData.append('fullName', this.profile.fullName || '');
                formData.append('phone', this.profile.phone || '');
                formData.append('address', this.profile.address || '');
                formData.append('gender', this.profile.gender || '');
                formData.append('dateOfBirth', this.profile.dateOfBirth || '');
                if (this.selectedAvatarFile) {
                    formData.append('avatar', this.selectedAvatarFile);
                }

                const res = await axios.put('/users/me/profile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (res.data.success) {
                    toastSuccess('Cập nhật hồ sơ thành công!');
                    this.fetchUserProfile();
                } else {
                    toastError(res.data.message || 'Cập nhật thất bại.');
                }
            } catch (error) {
                toastError(error.response?.data?.message || 'Lỗi khi cập nhật hồ sơ.');
            }
        }
    }
};
</script>

<style scoped>
.profile-wrapper {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #e3eafc, #f9fafe);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.profile-card {
    max-width: 700px;
    width: 100%;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.title {
    font-size: 2rem;
    font-weight: bold;
    color: #2b3f91;
    text-align: center;
}

.subtitle {
    color: #666;
    text-align: center;
    margin-bottom: 1.5rem;
}

.avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
}

.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #4257b2;
    margin-bottom: 1rem;
}

.upload-btn {
    background-color: #4257b2;
    color: white;
    padding: 0.5rem 1rem;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.upload-btn:hover {
    background-color: #2b3f91;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
}

.info-item {
    background: #f0f4fd;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #333;
    border-left: 4px solid #4257b2;
}

.update-btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.update-btn {
    background-color: #4257b2;
    color: white;
    padding: 0.75rem 2rem;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.update-btn:hover {
    background-color: #2b3f91;
}

input,
select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>
