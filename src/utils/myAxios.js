import axios from "axios";
const tokneAddress = "NEFU_LABORATORY_RESERVATION_SYSTEM_TOKEN";
// 请求拦截器
axios.defaults.baseURL = "/api/";
axios.interceptors.request.use(
  (config) => {
    // 获取 Token
    const token = sessionStorage.getItem(tokneAddress);
    if (token) {
      // 如果有 Token，将其添加到请求头 Authorization 中
      config.headers["token"] = `${token}`;
    }
    // 你可以在这里进行其他操作，如添加请求头、修改请求配置等
    return config;
  },
  (error) => {
    // 请求错误时处理
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 在响应成功时，你可以做一些额外的处理
    return response;
  },
  (error) => {
    // 处理响应错误，比如 Token 过期等
    if (error.response && error.response.status === 401) {
      console.error("Token 过期或无效，请重新登录");
      // 可以在这里处理 Token 过期，如清除本地 Token、跳转到登录页面等
    } else if (error.response && error.response.status === 500) {
      console.error("服务器错误，请稍后再试");
    }
    return Promise.reject(error);
  }
);

// 导出封装的 axios 实例
export default axios;
