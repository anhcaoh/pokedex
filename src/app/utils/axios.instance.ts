import axios from "axios";
import setupAxiosInterceptors from "./axios.interceptors";
const axiosInstance = axios.create({
  baseURL: "/",
  timeout: 5000, //default timeout 5s
  headers: {
    "Content-Type": "application/json",
  },
});
setupAxiosInterceptors(axiosInstance);
export default axiosInstance;
