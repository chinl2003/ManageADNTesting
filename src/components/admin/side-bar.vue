<template>
    <nav class="sidebar h-full flex-shrink-0">
        <ul class="space-y-3 flex-grow">
            <li v-for="(item, index) in menuItems" :key="item.name">
                <div class="block px-3 py-2 rounded sidebar-link" :class="{ 'active-link': activeIndex === index }"
                    @click="setActive(index)">
                    {{ item.name }}
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: 0,
            menuItems: [
                { name: 'Quản lí đơn hàng' },
                { name: 'Quản lí phiếu thu mẫu' },
                { name: 'Quản lí yêu cầu thu mẫu' },
                { name: 'Thống kê' },
                { name: 'Quản lí đánh giá dịch vụ' },
                { name: 'Quản lí dịch vụ' },
                { name: 'Quản lí tài khoản' },
                { name: 'Quản lí nội dung blogs' }
            ]
        }
    },
    methods: {
        setActive(index) {
            this.activeIndex = index
        }
    }
}
</script>

<style scoped>
.sidebar {
    width: 250px;
    background-color: #c3b5e6;
    color: white;
    position: relative;
    height: 100vh;
    min-height: 0;
    display: flex;
    flex-direction: column;
}

.sidebar-link {
    cursor: pointer;
    color: white;
    font-weight: normal;
    transition: background-color 0.3s, font-weight 0.3s;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.sidebar-link:hover {
    background-color: #4338ca;
    font-weight: bold;
}

.active-link {
    background-color: #4338ca;
    font-weight: bold;
}
</style>
