<template>
  <div>
    <el-button @click="addCarousel()">添加轮播图</el-button>
    <el-table :data="AllCarousel" style="width: 100%" v-loading="loading">
      <el-table-column label="标题" prop="title"> </el-table-column>

      <el-table-column label="图片" prop="url">
        <template slot-scope="scope">
          <img :src="scope.row.url" style="width:80px;height:80px" />
        </template>
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
      :current-page="currentPage"
      :page-size="8"
      @current-change="CurrentChange"
    >
    </el-pagination>

    <el-dialog
      title="编辑轮播图"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form
        :model="form"
        ref="carouselForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="轮播图名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图片:" prop="image">
          <el-upload
            class="avatar-uploader"
            action="http://182.92.218.236:8888/api/upload/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePictureCardPreview"
            :headers="updateHeaders"
          >
            <img v-if="form.url" :src="form.url" class="avatar" />
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
  getCarousel,
  updateCarousel,
  addCarouselApi,
  deleteCarouselApi
} from "../../api";
import { deleteMessage } from "../../util/PublicFunction";

export default {
  name: "carousel",
  data() {
    return {
      AllCarousel: [],
      dialogImageUrl: "",
      dialogVisible: false,
      dialogFormVisible: false,
      currentPage: 1,
      total: 0,
      form: {
        id: "",
        title: "",
        url: ""
      },
      updateHeaders: {
        contentType: "application/x-www-form-urlencoded",
        token: `Bearer ${localStorage.getItem("userToken")}`
      },
      requestType: "",
      loading: true,
      rules: {
        title: {
          required: true,
          message: "请输入轮播图名称",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    async getAllCarousel() {
      const result = await getCarousel();
      this.AllCarousel = result;
      this.total = result.length;
      this.loading = false;
    },
    addCarousel() {
      this.dialogFormVisible = true;
      this.requestType = "add";
    },
    closeDialog() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.dialogFormVisible = false;
    },
    CurrentChange(currentPage) {
      this.page = currentPage;
    },

    ClickItem(item) {
      this.dialogFormVisible = true;
      const data = { ...item };
      this.form = data;
      this.requestType = "update";
    },

    handleAvatarSuccess(res, file) {
      this.form.url = file.response.data.thumbnailUrl;
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    async DeleteUser(item) {
      const id = item.id;
      await deleteMessage("api/carousel", id);
      this.getAllCarousel();
    },

    async updateCarousel() {
      this.$refs["carouselForm"].validate(async valid => {
        if (valid) {
          this.requestType === "update"
            ? await updateCarousel(this.form)
            : await addCarouselApi(this.form);
          this.getAllCarousel();
          this.dialogFormVisible = false;
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
    this.getAllCarousel();
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px;
  border-style: dashed;
}
.avatar {
  width: 300px;
  height: 300px;
  display: block;
}
</style>
