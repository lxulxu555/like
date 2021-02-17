<template>
  <div class="bg">
  <el-form ref="form" :model="form" label-width="80px" class="form">
    <el-form-item label="账号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "login",
    data() {
      return {
        form: {
          name: '',
          password:''
        }
      }
    },

    methods: {
      ...mapActions(['Login']),

      onSubmit() {
        const adminName = this.form.name
        const password = this.form.password
        this.http.post('/api/admin/login',{adminName,password},'post').then(res => {
          if(res.data.code === 200){
            this.Login(res.data.data)
            this.$router.push("/")
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
    }
  }
</script>


<style scoped>
  .bg{
    background-image: url("./images/背景.png");
    background-size: 100% 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form{
    background:rgba(244,244,244,0.6);
    width: 500px;
    height: 300px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .el-form-item{
    position: relative;
    right: 30px;
    top: 20px;

  }

  .el-button{
    width: 300px;
    background-color: #36b7ab;
    border-color: #36b7ab;
  }



</style>
