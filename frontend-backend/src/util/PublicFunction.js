import { MessageBox, Message } from "element-ui";
import http from '../api/http'

export const deleteMessage = (url, id) => {
  return MessageBox.confirm(`此操作将删除, 是否继续?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      return http.delete(url, { id }).then(res => {
        return res.data;
      });
    })
    .catch(() => {
      Message({
        type: "info",
        message: "已取消删除"
      });
    });
};
