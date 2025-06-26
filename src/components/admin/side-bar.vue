<template>
    <div class="sidebar" :class="{ expanded: isExpanded }" @click.stop>
        <div v-for="(item, index) in menuItems" :key="index" class="sidebar-item"
            :class="{ active: clickedIndex === index }">
            <font-awesome-icon :icon="item.icon" class="sidebar-icon" @click="onIconClick(index)" />
            <span v-if="isExpanded && activeIndex === index" class="sidebar-label" @click="onLabelClick">
                {{ item.name }}
            </span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, inject } from 'vue';

export default {
    setup() {
        const isExpanded = ref(false);
        const activeIndex = ref(-1);
        const clickedIndex = ref(-1);

        const sidebarExpanded = inject('sidebarExpanded');
        const currentLabel = inject('currentLabel');

        const menuItems = [
            { name: 'Quản lí đơn hàng', icon: ['fas', 'shopping-cart'] },
            { name: 'Quản lí phiếu thu mẫu', icon: ['fas', 'file-invoice'] },
            { name: 'Quản lí yêu cầu thu mẫu', icon: ['fas', 'file-signature'] },
            { name: 'Thống kê', icon: ['fas', 'chart-bar'] },
            { name: 'Quản lí đánh giá dịch vụ', icon: ['fas', 'star'] },
            { name: 'Quản lí dịch vụ', icon: ['fas', 'flask'] },
            { name: 'Quản lí tài khoản', icon: ['fas', 'users'] },
            { name: 'Quản lí nội dung blogs', icon: ['fas', 'blog'] }
        ];

        const onIconClick = (index) => {
            activeIndex.value = index;
            clickedIndex.value = index;
            isExpanded.value = true;
            currentLabel.value = menuItems[index].name;
            sidebarExpanded.value = true;
        };

        const onLabelClick = () => {
            isExpanded.value = false;
            activeIndex.value = -1;
            sidebarExpanded.value = false;
        };

        const handleClickOutside = (e) => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && !sidebar.contains(e.target)) {
                isExpanded.value = false;
                activeIndex.value = -1;
                currentLabel.value = '';
                sidebarExpanded.value = false;
            }
        };

        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            menuItems,
            isExpanded,
            activeIndex,
            clickedIndex,
            onIconClick,
            onLabelClick
        };
    }
};
</script>

<style scoped>
.sidebar {
    position: absolute;
    top: 5%;
    left: 0;
    height: 100vh;
    width: 4rem;
    background-color: #1c2260;
    color: white;
    transition: width 0.3s ease;
    z-index: 40;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 1rem;
}

.sidebar.expanded {
    width: 16rem;
}

.sidebar-item {
    display: flex;
    align-items: center;
    height: 3rem;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease;
    padding-left: 1rem;
    position: relative;
}

.sidebar-icon {
    font-size: 1.25rem;
    color: white;
}

.sidebar-label {
    margin-left: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
    white-space: nowrap;
    cursor: pointer;
    opacity: 0.5;
}

.sidebar-label:hover {
    opacity: 1;
}
</style>
