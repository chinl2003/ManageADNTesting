import axios from 'axios';
import { authState } from '@/store/auth';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5119/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = authState.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosClient;
