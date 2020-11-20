import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Mine = () => import('../views/mine/Mine.vue')
const Detail = () => import('../views/detail/Detail.vue')

//1.安装插件
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/category', component: Category },
  { path: '/cart', component: Cart },
  { path: '/mine', component: Mine },
  { path: '/detail/:iid', component: Detail },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//解决vue3.0版本以上重复点菜单问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
