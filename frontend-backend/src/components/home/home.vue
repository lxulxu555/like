<template>
  <el-container>
    <el-header>
      <img src="../../assets/euraisa-logo.png"/>
      <h2>土特产推荐管理系统</h2>
      <div :style="{flex:1}"/>

      <el-dropdown @command="exitUser">
        <span class="el-dropdown-link">
           欢迎您，{{getUserInfo.adminName}}
           <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出账户</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div>
        {{gettime}}
      </div>
      <div class="city-wea">
        {{localweather.city}}
        {{localweather.wea}}
      </div>
      <img :src="weatherImg" class="image-weather">
    </el-header>

    <el-container>
      <el-aside>
        <el-menu
          router
          :default-active="$route.name"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <home-left :navMenus="leftMenus"/>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </el-container>

</template>


<script>
  import {mapActions, mapState} from 'vuex';
  import HomeLeft from "./home-left";
  import menuList from '../../util/menuConfig'


  export default {
    components: {HomeLeft},
    data() {
      return {
        gettime: '',//当前时间
        localweather: {},
        weatherImg: '',
        leftMenus: menuList,
      }
    },


    computed: {
      getUserInfo() {
        const info = this.$store.state.UserInfo
        const user = typeof info === "string" ? JSON.parse(this.$store.state.UserInfo) : info
        return {...user}
      }
    },

    methods: {
      ...mapActions(['Login','SaveJurisdiction']),
      ...mapState(['UserInfo']),

      getTime: function () {
        var _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
      },

      currentTime() {
        setInterval(this.getTime, 500)
      },

      getWeather: function () {
        var _this = this;
        this.$axios.get('https://tianqiapi.com/api?version=v6&appid=71549884&appsecret=XH6bWw5A').then(function (response) {
          _this.localweather = response.data
          _this.weatherImg = 'http://tq.daodaoim.com//tianqiapi/skin/pitaya/' + response.data.wea_img + '.png'
        }).catch(() => {
        })
      },

      exitUser(command) {
        this.Login(null)
        this.$router.push("/login")
      }
    },


    mounted() {
      this.currentTime()
      this.getWeather()
      this.SaveJurisdiction(JSON.parse(this.UserInfo()))
    },
  }
</script>

<style>
  .el-container {
    height: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .el-header {
    width: 100%;
    background-color: #ADD8E6;
    display: flex;
  flex-direction: row;
    align-items: center;
  }

  .el-header h2 {
    margin-left: 15px;
  }

  .city-wea {
    padding: 15px;
  }

  .image-weather {
    width: 40px;
    height: 40px;
  }

  .el-menu {
    height: 100%;
    width: 250px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dropdown {
    margin-right: 50px;
  }
</style>

