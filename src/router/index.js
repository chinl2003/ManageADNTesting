import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/main-layout.vue";
import AdminLayout from "@/layouts/admin-layout.vue";
import Home from "@/pages/customer/home-page.vue";
import AdminPage from "@/pages/admin/admin-page.vue";
import LoginView from "@/pages/customer/login.vue";
import RegisterView from "@/pages/customer/register.vue";
import { toastError } from "@/utils/toast"; 
import AccountManagement from "@/pages/admin/account/account-management.vue";
import ServiceManagement from "@/pages/admin/service/service-management.vue";
import ServicePriceManagement from "@/pages/admin/service-price/service-price-management.vue";
import OrderList from "@/pages/customer/orders/index.vue";
import TransactionHistory from "@/pages/customer/transactions/index.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home },
      {
        path: "login",
        name: "Login",
        component: LoginView
      },
      {
        path: "register",
        name: "Register",
        component: RegisterView
      },
      {
        path: "my-orders",
        name: "OrderList",
        component: OrderList
      },
      {
        path: "transaction-history",
        name: "TransactionHistory",
        component: TransactionHistory
      },

    ]
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", component: AdminPage },
      {
        path: "account-management",
        name: "AccountManagement",
        component: AccountManagement
      },
      {
        path: "service-management",
        name: "ServiceManagement",
        component: ServiceManagement
      },
      {
        path: "service-price-management",
        name: "ServicePriceManagement",
        component: ServicePriceManagement
      },
    ],
    meta: {
      requiresAuth: true,
      roles: ["Admin", "Manager", "Staff"] 
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (to.meta.requiresAuth) {
    if (!token) {
      toastError("Vui lòng đăng nhập để tiếp tục");
      return next({ path: "/login" });
    }

    const allowedRoles = to.meta.roles || [];
    if (!allowedRoles.includes(role)) {
      toastError("Bạn không có quyền truy cập!");
      return next({ path: "/" });
    }
  }

  next();
});

export default router;