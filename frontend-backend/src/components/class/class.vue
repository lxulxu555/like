<template>
  <div>
    <el-button @click="addClass()">添加分类</el-button>
    <el-table :data="allClass" style="width: 100%" v-loading="loading">
      <el-table-column label="ID" prop="id"> </el-table-column>

      <el-table-column label="分类名" prop="name"> </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="ClickItem(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="DeleteClass(scope.row)"
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
      title="编辑分类"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form :model="form" ref="classForm" :rules="rules" label-width="100px">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateClass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getClassApi, addClassApi, updateClassApi } from "../../api";
import { deleteMessage } from "../../util/PublicFunction";

export default {
  name: "class",
  data() {
    return {
      allClass: [],
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      form: {
        id: "",
        name: ""
      },
      loading: true,
      requestType: "",
      rules: {
        name: {
          required: true,
          message: "请输入分类名称",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    async getAllClass() {
      const result = await getClassApi();
      this.allClass = result;
      this.total = result.length;
      this.loading = false;
    },

    closeDialog() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.dialogFormVisible = false;
    },

    addClass() {
      this.dialogFormVisible = true;
      this.requestType = "add";
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

    selectTrigger(val) {
      this.form.role = val;
    },

    async DeleteClass(item) {
      const id = item.id;
      const result = await deleteMessage("/api/classify", id);
      this.getAllClass(this.page);
    },

    async updateClass() {
      this.$refs["classForm"].validate(async valid => {
        if (valid) {
          const { requestType } = this;
          const result =
            requestType === "update"
              ? await updateClassApi(this.form)
              : await addClassApi(this.form);
          this.getAllClass();
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
    this.getAllClass();
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
