import axios from "axios";
import { message } from "antd";
import store from "../redux/store";
import { openLoading, closeLoading } from "../redux/actions";
const { serviceURL } = require("../../config/serviceUrl");

// const requestConfig = {
//   baseURL: serviceURL,
//   timeout: 10000,
//   // proxy: {
//   //   host: '127.0.0.1',
//   //   port: 9000,
//   //   auth: {
//   //     username: 'mikeymike',
//   //     password: 'rapunz3l'
//   //   }
//   // },
// };
// const Axios = axios.create({ timeout: 10000 });
axios.defaults.baseURL = "/MBT";

// 计数器
let requestCount = 0;

// 展示loading
function showLoading() {
  if (requestCount === 0) {
    store.dispatch(openLoading());
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  if (requestCount <= 0) return;
  requestCount--;
  if (requestCount === 0) {
    store.dispatch(closeLoading());
  }
}
// 删除 isLoading 字段
function deleteLoading(obj) {
  let newObj = { ...obj };
  delete newObj.isLoading;
  return newObj;
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.isLoading !== false) {
      showLoading();
    }
    return deleteLoading(config);
  },
  (error) => {
    if (error.isLoading !== false) {
      hideLoading();
    }
    message.error("请求超时");
    return Promise.reject(deleteLoading(error));
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.config.isLoading !== false) {
      hideLoading();
    }
    if (response.status === 200) {
      return response.data;
    }
  },
  (error) => {
    if (error.config.isLoading !== false) {
      hideLoading();
    }
    message.error("服务端错误：" + error);
    return Promise.reject(error);
  }
);

/**
 * POST
 * @param {*} queryString 操作字符串
 * @param {*} isLoading true:使用遮罩层  false:不使用
 * @returns
 */
export function post(queryString, isLoading = true) {
  return axios({
    method: "post",
    url: serviceURL,
    data: { query: queryString },
    isLoading: isLoading,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${store.getState().token}`,
    },
  });
  // return axios
  //   .post(serviceURL, { query: queryString })
  //   .then((res) => res.data)
  //   .catch((error) => console.log(error));
}

/**
 * GET
 * @param {*} queryString 查询字符串
 * @param {*} isLoading true:使用遮罩层  false:不使用
 * @returns
 */
export function get(queryString, isLoading = true) {
  return axios({
    method: "get",
    url: serviceURL,
    params: { query: queryString },
    isLoading: isLoading,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      // Authorization: `Bearer ${store.getState().token}`,
    },
  });
}
