<template>
  <div class="showBlogs">
    <h2>博客列表</h2>
     <div v-for="blog,index in blogs" :key="index" class="blog">
        <h2>
          <router-link v-rainbow="Math.random()" :to="'/blog/'+blog.blog_id">{{blog.title}}</router-link>
          <span v-if="blog.private" style="font-size:16px;color:#999">[仅自己可见]</span>
        </h2>
        <span>发表时间：{{blog.create_time}}</span>
        <span>分类：<router-link :to="{path:'/blogs',query:{category_id:blog.category_id}}">{{blog.name}}</router-link></span>
        <span>作者：<router-link :to="{path:'/blogs',query:{u_id:blog.u_id}}">{{blog.username}}</router-link></span>
     </div>
  </div>
</template>

<script>
export default {
  name:'showBlogs',
  data(){
    return {
      blogs:[]
    }
  },
  directives:{
    rainbow:{
      bind(el,binding,vnode){
        el.style.color = '#'+binding.value.toString(16).slice(2,8)
      }
    }
  },
  created(){
    this.getBlogs()
  },
  methods:{
    getBlogs(){
      this.$axios.get('/getBlogs.php',{
        params:{
          u_id:this.$route.query.u_id,
          category_id:this.$route.query.category_id
        }
      })
      .then(res=>{
        if(!res.data.status_code){
          this.blogs = res.data.blogs;
          this.blogs.sort((a,b)=>a.create_time<b.create_time)
        }else{
          alert(res.data.error_msg)
        }
      })
    }
  },
  watch:{
    $route:function(to,from) {
      // 使用watch解决路由在相同组件下跳转数据不刷新问题
      this.getBlogs();
    }
  }
}

</script>

<style scoped>
.showBlogs{
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 10px;
}
h2{
  font-size: 30px;
  margin-bottom: 10px;
}
.blog{
  max-width: 100%;
  margin: 10px 0 ;
  padding: 20px;
  background-color: #fff;
  border: 1px dotted #000;
  border-radius: 5px;
}
a{
  text-decoration: none;
  color: #89b5ff;
}
a:hover{
  text-decoration: underline;
  color: #ccc;
}
</style>