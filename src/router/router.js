import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register'
import Login from '../components/Login'
import AddBlog from '../components/AddBlog'
import EditBlog from '../components/EditBlog'
import ShowBlog from '../components/ShowBlog'
import ShowBlogs from '../components/ShowBlogs'

Vue.use(VueRouter)

const routes = [
  {
    path:'/register',
    component:Register
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/addBlog',
    meta:{
      login_required:true
    },
    component:AddBlog
  },
  {
    path:'/editBlog/:blog_id',
    meta:{
      login_required:true
    },
    component:EditBlog
  },
  {
    path:'/blog/:blog_id',
    component:ShowBlog
  },
  {
    path:'/blogs',
    component:ShowBlogs
  },
  {
    path:'/user/:u_id',
    component:ShowBlogs
  },
  {
    path:'/',
    component:ShowBlogs
  },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

// 判断要跳转的组件是否包含需要登录权限，如果包含且未登录则跳转到登录组件
router.beforeEach((to,from,next)=>{
  if(!$cookies.isKey('u_id') && to.matched.some(item=>item.meta.login_required))
    next('/login');
  else
    next()
})

export default router