import register from './components/register'
import login from './components/login'
import addBlog from './components/addBlog'
import editBlog from './components/editBlog'
import showBlog from './components/showBlog'
import showBlogs from './components/showBlogs'

export default [
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
		component:addBlog
	},
  {
    path:'/editBlog',
    component:editBlog
  },
	{
		path:'/blog/:blog_id',
		component:showBlog
	},
	{
		path:'/:u_id',
		component:showBlogs
	},
	{
		path:'/',
		component:showBlogs
	},
]