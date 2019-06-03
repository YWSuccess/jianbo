import register from './components/register'
import login from './components/login'
import addBlog from './components/addBlog'

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
]