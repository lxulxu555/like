import axios from "axios";
import { message } from "antd";
import store from "../redux/store";
import {loginOutUser} from '../redux/action/user'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
var userInfo = JSON.parse(localStorage.getItem("UserInfo"));

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.withCredentials = true; // 开启这个，后台服务器才能拿到cookie
    const token = userInfo && userInfo.token;
    token && (config.headers.token = `Bearer ${token}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use((response) => {
  const { msg, code } = response.data;
  if (code === 401) {
    store.dispatch(loginOutUser())
    return Promise.reject(response);
  } else if (code === 200) {
    return Promise.resolve(response);
  } else {
    message.error(msg);
    return Promise.reject(response);
  }
});

// get
export const get = (url, params) => {
  return new Promise((resolve) => {
    axios.get(url, { params: params }).then((res) => {
      resolve(res.data);
    });
  });
};

export const DELETE = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
};

// post
export const post = (url, ...params) => {
  return new Promise((resolve) => {
    axios.post(url, ...params).then((res) => {
      resolve(res.data);
    });
  }).catch((e) => {
    return e;
  });
};

export const put = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, ...params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};

export const patch = (url, params) => {
  // 将数据转换为formData格式
  // 正常情况下可以直接使用参数对象进行patch，如果出错可以尝试转换form Data
  var formData = new FormData();
  formData.append("username", params.username);
  formData.append("password", params.password);
  return new Promise((resolve, reject) => {
    axios
      .patch(url, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};
