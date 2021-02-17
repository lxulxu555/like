<template>
  <div>
    <el-table :data="allPosts" style="width: 100%" v-loading="loading">
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="作者" prop="user.nickName"> </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        :formatter="dateForma"
      >
      </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="showDetail(scope.row)">
            查看详情
          </el-button>
          <el-button size="mini" type="danger" @click="DeletePosts(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { getPostApi } from "../../api";
import moment from "moment";
import { deleteMessage } from '../../util/PublicFunction';

export default {
  name: "post",
  data() {
    return {
      allPosts: [],
      dialogImageUrl: "",
      page: 1,
      total: 0,
      formLabelWidth: "100px",
      loading: true
    };
  },
  methods: {
    dateForma: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },

    showDetail (row){
      window.location.href = `http://localhost:3000/posts-detail/${row.id}`
    },

    async getAllPosts(page) {
      const result = await getPostApi({ page, rows: 8 });
      this.allPosts = result.data;
      this.page = page;
      this.total = result.total;
      this.loading = false;
    },

    CurrentChange(currentPage) {
      this.page = currentPage;
      this.getSpecialtyNews(this.page); //点击第几页
    },

    ClickItem(item) {
      console.log(item)
    },

    async DeletePosts(item) {
      const id = item.id;
      await deleteMessage('/api/post',id)
      this.getAllPosts(this.page);
    }
  },

  mounted() {
    this.getAllPosts(this.page);
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
