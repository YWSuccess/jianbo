<template>
  <div class="showBlogs">
    <div class="header">
      <h2>博客列表</h2>
      <input class="search" type="text" v-model="searchKey" placeholder="搜索...">
    </div>
    <div v-for="blog,index in filterBlogs" :key="index" class="blog">
      <h2>
        <router-link v-rainbow="Math.random()" :to="'/blog/'+blog.blog_id">{{blog.title}}</router-link>
        <span v-if="blog.private" style="font-size:16px;color:#999">[仅自己可见]</span>
      </h2>
      <span>发表时间：{{blog.create_time}}</span>
      <span>分类：<router-link :to="{path:'/blogs',query:{category_id:blog.category_id}}">{{blog.name}}</router-link></span>
      <span>作者：<router-link :to="{path:'/blogs',query:{u_id:blog.u_id}}">{{blog.username}}</router-link></span>
    </div>
    <div v-if="!blogs.length" class="blog">
      <h2><router-link to="/blog/1">暂时还没有博客~来看看Markdown使用指南吧</router-link></h2>
    </div>
  </div>
</template>

<script>
export default {
  name:'ShowBlogs',
  data(){
    return {
      blogs:[],
      searchKey:''
    }
  },
  directives:{
    // 自定义指令，给每个博客标题渲染不同的颜色
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
        }else{
          alert(res.data.error_msg)
        }
      })
    }
  },
  computed:{
    // 根据用户输入关键词过滤博客
    filterBlogs(){
      return this.blogs.filter(blog=>blog.title.toLowerCase().match(this.searchKey.toLowerCase())||blog.content.toLowerCase().match(this.searchKey.toLowerCase()))
    }
  },
  watch:{
    // 由于此组件存在不同路由同组件下跳转，所以使用watch来监听$route的变化，保证在$route变化时能够及时更新视图
    $route:function(to,from) {
      this.getBlogs();
    }
  }
}

</script>

<style scoped>
.showBlogs{
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 10px;
}
h2{
  font-size: 30px;
  margin-bottom: 10px;
}
.header{
  position: relative;
}
.header .search{
  position: absolute;
  top: 0;
  right: 0;
  min-width: 120px;
  margin: 10px 0px;
  padding: 5px;
  border: 1px solid #000;
  border-radius: 20px;
  outline:none;
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