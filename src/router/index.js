import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/customer/HomePage.vue'
// import Services from '@/pages/customer/'
// import Blogs from '@/pages/Blogs.vue'
// import Booking from '@/pages/Booking.vue'
// import Login from '@/pages/Login.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    // { path: '/services', component: Services },
    // { path: '/blogs', component: Blogs },
    // { path: '/booking', component: Booking },
    // { path: '/login', component: Login },
  ]
})
