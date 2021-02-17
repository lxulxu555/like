import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home'
import user from '../components/user/user'
import login from '../components/login/login'
import news from "../components/news/news.vue"
import carousel from '../components/carousel/carousel'
import post from '../components/post/post.vue'
import oneClass from '../components/class/class.vue'
import product from '../components/product/product.vue'
import msg from '../components/msg/msg.vue'

Vue.use(Router)


//定义路由
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/user',
          name: '/user',
          component: user,
        },
        {
          path: '/carousel',
          name: '/carousel',
          component: carousel,
        },
        {
          path: '/class',
          name: '/class',
          component: oneClass,
        },
        {
          path: '/news',
          name: '/news',
          component: news
        },
        {
          path: '/post',
          name: '/post',
          component: post
        },
        {
          path: '/product',
          name: '/product',
          component: product
        },
        {
          path: '/msg',
          name: '/msg',
          component: msg
        },
      ]
    },
  ],
  mode: 'history',
})

//拦截器
router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    next()
  } else {
    let userInfo = localStorage.getItem("userInfo")
    if(!userInfo){
      next('/login');
    }else{
      next()
    }
  }
})

export default router
