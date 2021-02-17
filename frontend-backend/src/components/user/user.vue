<template>
  <div>
    <el-button @click="addUser()">添加用户</el-button>
    <el-table :data="AllUser" style="width: 100%" v-loading="loading">
      <el-table-column label="用户名" prop="adminName"> </el-table-column>

      <el-table-column label="密码" prop="password"> </el-table-column>

      <el-table-column label="角色" prop="role"> </el-table-column>

      <el-table-column label="描述" prop="description"> </el-table-column>

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
      title="编辑用户"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form :model="form" ref="userForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="adminName">
          <el-input v-model="form.adminName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select
            v-model="form.role"
            placeholder="请选择角色"
            @change="selectTrigger(form.role)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUser, UpdateUser, addUser } from "../../api";
import { deleteMessage } from "../../util/PublicFunction";

export default {
  name: "user",
  data() {
    return {
      AllUser: [],
      page: 1,
      total: 0,
      dialogFormVisible: false,
      form: {
        id: "",
        adminName: "",
        password: "",
        description: "",
        role: ""
      },
      options: [
        {
          label: "经理",
          value: "经理"
        },
        {
          label: "管理员",
          value: "管理员"
        },
        {
          label: "普通用户",
          value: "普通用户"
        }
      ],
      loading: true,
      requestType: "",
      rules: {
        adminName: {
          required: true,
          message: "请输入账号",
          trigger: "change"
        },
        password: {
          required: true,
          message: "请输入密码",
          trigger: "change"
        },
        role: {
          required: true,
          message: "请选择角色",
          trigger: "change"
        },
        description: {
          required: true,
          message: "请输入说明",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    async getAllUser(page) {
      const result = await getAllUser({ page, rows: 8 });
      this.AllUser = result.data;
      this.page = page;
      this.total = result.total;
      this.loading = false;
    },
    closeDialog() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.dialogFormVisible = false;
    },
    addUser() {
      this.dialogFormVisible = true;
      this.requestType = "add";
    },

    CurrentChange(currentPage) {
      this.page = currentPage;
      this.getAllUser(this.page); //点击第几页
    },

    ClickItem(item) {
      const data = { ...item };
      if (data.role === "管理员") {
        data.role = "管理员";
      } else if (data.role === "经理") {
        data.role = "经理";
      } else {
        data.role = "普通用户";
      }

      this.form = data;
      this.dialogFormVisible = true;
      this.requestType = "update";
    },

    selectTrigger(val) {
      this.form.role = val;
    },

    async DeleteUser(item) {
      const id = item.id;
      await deleteMessage("/api/admin", id);
      this.getAllUser(this.page);
    },

    async updateUser() {
      this.$refs["userForm"].validate(async valid => {
        if (valid) {
          const { requestType } = this;
          const result =
            requestType === "update"
              ? await UpdateUser(this.form)
              : await addUser(this.form);
          this.getAllUser(this.page);
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
    this.getAllUser(this.page);
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
