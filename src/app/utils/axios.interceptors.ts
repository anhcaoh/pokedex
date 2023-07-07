import { AxiosInstance } from "axios";

const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
  // HTTP Request interceptor
  axiosInstance.interceptors.request.use(
    function (config) {
      //empty
      return config;
    },
    function (error) {
      // Error handling
      return Promise.reject(error);
    }
  );

  // HTTP Response interceptor
  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code 2xx
      return response;
    },
    async function (error) {
      //empty
    }
  );
};
export default setupAxiosInterceptors;
