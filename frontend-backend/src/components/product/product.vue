<template>
  <div>
    <el-button @click="addProduct()">添加土特产</el-button>
    <el-table :data="allProduct" style="width: 100%" v-loading="loading">
      <el-table-column label="标题" prop="name" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="价格" prop="price">
        <template slot-scope="scope">
          <span><span style="color:red">￥</span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        :formatter="dateForma"
      >
      </el-table-column>
      <el-table-column label="分类" prop="classifyName"> </el-table-column>
      <el-table-column label="图片" prop="images">
        <template slot-scope="scope">
          <img :src="scope.row.images[0]" style="width:50px;height:50px" />
        </template>
      </el-table-column>
      <el-table-column label="介绍" prop="intro" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="right" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="ClickItem(scope.row)">
            更新
          </el-button>
          <el-button size="mini" type="danger" @click="deleteProduct(scope.row)"
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
      title="编辑土特产"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form
        :model="form"
        ref="productForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="classifyId">
          <el-select v-model="form.classifyId" placeholder="请选择">
            <el-option
              v-for="item in allClass"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" prop="intro">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.intro"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="特产图片:" prop="image">
          <el-upload
            class="avatar-uploader"
            action="http://182.92.218.236:8888/api/upload/image"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :file-list="form.images"
            :headers="updateHeaders"
            :limit="3"
            :class="{ disabled: uploadDisabled }"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateProduct">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllProductApi,
  getClassApi,
  deleteImage,
  updateProduct,
  addProduct
} from "../../api";
import moment from "moment";
import { deleteMessage } from "../../util/PublicFunction";

export default {
  name: "product",
  data() {
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入价格"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      uploadDisabled: false,
      allClass: [],
      allProduct: [],
      dialogFormVisible: false,
      page: 1,
      total: 0,
      loading: true,
      requestType: "",
      updateHeaders: {
        contentType: "application/x-www-form-urlencoded",
        token: `Bearer ${localStorage.getItem("userToken")}`
      },
      form: {
        id: "",
        name: "",
        classifyId: "",
        images: [],
        price: "",
        intro: ""
      },
      rules: {
        name: { required: true, message: "请输入特产名称", trigger: "change" },
        price: [
          { required: true, message: "请输入价格", trigger: "change" },
          { validator: checkPrice, trigger: "change" }
        ],
        classifyId: { required: true, message: "请选择分类", trigger: "change" }
      }
    };
  },
  watch: {
    "form.images"(val) {
      console.log("123",val)
      if (val.length >= 3) {
        this.uploadDisabled = true;
      }else{
          this.uploadDisabled = false;
      }
    }
  },
  methods: {
    dateForma: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },

    async initAllClass() {
      const result = await getClassApi();
      this.allClass = result;
    },

    async getAllProduct(page) {
      const result = await getAllProductApi({ page, rows: 8 });
      result.data.forEach(item => {
        item.images !== null
          ? (item.images = item.images.split(","))
          : (item.images = []);
      });
      this.allProduct = result.data;
      this.page = page;
      this.total = result.total;
      this.loading = false;
    },

    closeDialog() {
      for (let key in this.form) {
        if (key !== "images") {
          this.form[key] = "";
        } else {
          this.form.images = [];
        }
      }
      this.dialogFormVisible = false;
    },

    CurrentChange(currentPage) {
      this.page = currentPage;
      this.getAllProduct(this.page); //点击第几页
    },

    ClickItem(item) {
      const data = {};
      data.id = item.id;
      data.name = item.name;
      data.classifyId = item.classifyId;
      data.price = item.price;
      data.intro = item.intro;
      data.images = item.images.map(item => ({
        name: item,
        url: item
      }));
      this.form = data;
      this.requestType = "update";
      this.dialogFormVisible = true;
    },

    addProduct() {
      this.dialogFormVisible = true;
      this.requestType = "add";
    },

    async deleteProduct(item) {
      const id = item.id;
      await deleteMessage("/api/goods/deleteGoods", id);
      this.getAllProduct(this.page);
    },

    updateProduct() {
      this.$refs["productForm"].validate(async valid => {
        if (valid) {
          const imagesData = [];
          const data = { ...this.form };
          data.images.forEach(item => {
            imagesData.push(item.url);
          });
          data.images = imagesData.toString();
          this.requestType === "update"
            ? await updateProduct(data)
            : await addProduct(data);
          this.getAllProduct(this.page);
          this.dialogFormVisible = false;
          for (let key in this.form) {
            this.form[key] = "";
          }
        } else {
          return false;
        }
      });
    },

    handleAvatarSuccess(res, file) {
      const image = {
        name: file.response.data.thumbnailUrl,
        url: file.response.data.thumbnailUrl
      };
      this.form.images.push(image);
    },

    async handleRemove(file, fileList) {
      const url = file.url;
      await deleteImage(url);
      this.form.images = fileList;
    }
  },

  mounted() {
    this.getAllProduct(this.page);
    this.initAllClass();
  }
};
</script>

<style>
.disabled .el-upload--picture-card {
  display: none !important;
}
.el-pagination {
  position: fixed;
  bottom: 30px;
  left: 50%;
}
</style>
