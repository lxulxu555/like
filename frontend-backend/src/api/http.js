import axios from "axios";
import { Message } from "element-ui"; //element库的消息提示，可以不用
import router from "../router";
import store from "../store";

//创建axios实例
var service = axios.create({
  baseURL: "http://182.92.218.236:8888/",
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
    contentType: "application/x-www-form-urlencoded",
    token: `Bearer ${localStorage.getItem("userToken")}`
  }
});
export default {
  params(url, param, cback, reject, method) {
    service({
      method: method,
      url,
      [method === "get" || method === "delete" ? "params" : "data"]: param
    })
      .then(res => {
        //axios返回的是一个promise对象
        var res_code = res.status.toString();

        if (res_code.charAt(0) == 2) {
          const code = res.data.code;
          if (code === 200) {
            cback(res); //cback在promise执行器内部
            if (res.config.method !== "get") {
              Message.success("成功");
            }
          } else {
            reject(res);
            Message.error(res.data.msg);
          }
        } else {
          console.log(res, "异常1");
        }
      })
      .catch(err => {
        if (err.response.data.msg === "请登录") {
          Message({
            showClose: true,
            message: "您的身份已过期，请重新登录",
            type: "error"
          });
          store.dispatch("Login", null);
          router.push("/login");
        } else if (err.response.data.msg === "授权不足") {
          Message({
            showClose: true,
            message: "您的权限不足，如有需要，请联系开发人员",
            type: "error"
          });
        }
      });
  },

  //get请求，其他类型请求复制粘贴，修改method
  get(url, param) {
    return new Promise((cback, reject) => {
      this.params(url, param, cback, reject, "get");
    });
  },

  post(url, param) {
    return new Promise((cback, reject) => {
      this.params(url, param, cback, reject, 'post');
    });
  },

  put(url, param) {
    return new Promise((cback, reject) => {
      this.params(url, param, cback, reject, 'put');
    });
  },

  delete(url, param) {
    return new Promise((cback, reject) => {
      this.params(url, param, cback, reject, "delete");
    });
  }
};
