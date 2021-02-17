<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="allMsg"
          node-key="commentId"
          :props="treeProps"
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.content }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                Delete
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="8"
      @current-change="CurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAllMsgApi } from "../../api";
import { deleteMessage } from "../../util/PublicFunction";
export default {
  name: "msg",
  data() {
    return {
      allMsg: [],
      page: 1,
      total: 0,
      treeProps: {
        children: "replyList"
      }
    };
  },
  methods: {
    async getAllMsg(page) {
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "Loading", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
        target: document.querySelector("#table") //loadin覆盖的dom元素节点
      });
      const result = await getAllMsgApi({ page, rows: 8 });
      this.allMsg = result.data;
      this.page = page;
      this.total = result.total;
      loading.close();
    },
    CurrentChange(currentPage) {
      this.page = currentPage;
      this.getAllUser(this.page); //点击第几页
    },

    async DeleteUser(item) {
      const id = item.id;
      await deleteMessage("/api/admin", id);
      this.getAllUser(this.page);
    },
    async remove(node, data) {
      let type;
      let deleteId;
      console.log(data);
      if (data.id) {
        type = "/api/reply";
        deleteId = data.id;
      } else {
        type = "/api/comment";
        deleteId = data.commentId;
      }
      await deleteMessage(type, deleteId);
      this.getAllMsg(this.page);
    }
  },

  mounted() {
    this.getAllMsg(this.page);
  }
};
</script>

<style scoped>
.el-pagination {
  position: fixed;
  bottom: 30px;
  left: 50%;
}
</style>
