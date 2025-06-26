import { reactive } from "vue";

export const authState = reactive({
  fullName: localStorage.getItem("userFullName") || "",
  role: localStorage.getItem("userRole") || "",
  token: localStorage.getItem("token") || "",
});
