<template>
  <div>
    <el-button @click="addSpecialtyNews()">添加资讯</el-button>
    <el-table :data="AllNews" style="width: 100%" v-loading="loading">
      <el-table-column label="标题" prop="title"> </el-table-column>

      <el-table-column
        label="创建时间"
        prop="createTime"
        :formatter="dateForma"
      >
      </el-table-column>

      <el-table-column label="图片" prop="matterUrl">
        <template slot-scope="scope">
          <img :src="scope.row.matterUrl" style="width:80px;height:80px" />
        </template>
      </el-table-column>

      <el-table-column label="介绍" prop="content" show-overflow-tooltip>
      </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="ClickItem(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="DeleteUser(scope.row)"
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

    <el-dialog
      title="编辑土特产资讯"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form :model="form" ref="newsForm" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="intro">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="资讯图片:" prop="image">
          <el-upload
            class="avatar-uploader"
            action="http://182.92.218.236:8888/api/upload/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="updateHeaders"
          >
            <img v-if="form.matterUrl" :src="form.matterUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCarousel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSpecialtyNewsApi,
  updateAddSpecialtyNewsApi,
  deleteSpecialtyApi
} from "../../api";
import moment from "moment";
import { deleteMessage } from "../../util/PublicFunction";

export default {
  name: "news",
  data() {
    return {
      AllNews: [],
      dialogImageUrl: "",
      dialogFormVisible: false,
      page: 1,
      total: 0,
      form: {
        id: "",
        title: "",
        content: "",
        matterUrl: ""
      },
      updateHeaders: {
        contentType: "application/x-www-form-urlencoded",
        token: `Bearer ${localStorage.getItem("userToken")}`
      },
      loading: true,
      rules: {
        title: {
          required: true,
          message: "请输入资讯标题",
          trigger: "change"
        }
      }
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

    async getSpecialtyNews(page) {
      const result = await getSpecialtyNewsApi({ page, rows: 8 });
      this.AllNews = result.data;
      this.page = page;
      this.total = result.total;
      this.loading = false;
    },

    addSpecialtyNews() {
      this.dialogFormVisible = true;
    },

    closeDialog() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.dialogFormVisible = false;
    },
    CurrentChange(currentPage) {
      this.page = currentPage;
      this.getSpecialtyNews(this.page); //点击第几页
    },

    ClickItem(item) {
      this.dialogFormVisible = true;
      const data = { ...item };
      this.form = data;
    },

    handleAvatarSuccess(res, file) {
      this.form.matterUrl = file.response.data.thumbnailUrl;
    },

    async DeleteUser(item) {
      const id = item.id;
      await deleteMessage("/api/matter", id);
      this.getSpecialtyNews(this.page);
    },

    async updateCarousel() {
      this.$refs["newsForm"].validate(async valid => {
        if (valid) {
          await updateAddSpecialtyNewsApi(this.form);
          this.dialogFormVisible = false;
          this.getSpecialtyNews(this.page);
          for (let key in this.form) {
            this.form[key] = "";
          }
        } else {
          return false;
        }
      });
    }
  },

  mounted() {
    this.getSpecialtyNews(this.page);
  }
};
</script>

<style scoped>
.el-pagination {
  position: fixed;
  bottom: 30px;
  left: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px;
  border-style: dashed;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>
