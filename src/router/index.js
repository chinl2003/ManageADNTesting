import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/main-layout.vue";
import AdminLayout from "@/layouts/admin-layout.vue";
import Home from "@/pages/customer/home-page.vue";
import AdminPage from "@/pages/admin/admin-page.vue";
import LoginView from "@/pages/customer/login.vue";
import RegisterView from "@/pages/customer/register.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        { path: "", component: Home },
        {
          path: 'login',
          name: 'Login',
          component: LoginView
        },
        {
          path: 'register',
          name: 'Register',
          component: RegisterView
        },
      ],
    },
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        { path: "", component: AdminPage },
      ],
    },
  ],
});
