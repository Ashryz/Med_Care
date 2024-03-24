import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Token 6d9243bfb4651cf12a3653531269af58a60f4780'
  },
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     if (localStorage.getItem("token")) {
//       config.headers.Authorization = `Token ${localStorage.getItem("token")}`;
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
