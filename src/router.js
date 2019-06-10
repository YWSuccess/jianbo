import Vue from 'vue'
import VueRouter from 'vue-router'
import register from './components/register'
import login from './components/login'
import addBlog from './components/addBlog'
import editBlog from './components/editBlog'
import showBlog from './components/showBlog'
import showBlogs from './components/showBlogs'

Vue.use(VueRouter)

const routes = [
  {
    path:'/register',
    component:register
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/addBlog',
    meta:{
      login_required:true
    },
    component:addBlog
  },
  {
    path:'/editBlog/:blog_id',
    meta:{
      login_required:true
    },
    component:editBlog
  },
  {
    path:'/blog/:blog_id',
    component:showBlog
  },
  {
    path:'/blogs',
    component:showBlogs
  },
  {
    path:'/user/:u_id',
    component:showBlogs
  },
  {
    path:'/',
    component:showBlogs
  },
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next)=>{
  if(!$cookies.isKey('u_id') && to.matched.some((item)=>item.meta.login_required))
    next('/login');
  else
    next()
})

export default router