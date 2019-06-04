<template>
  <div class="showBlogs">
     <div v-for="blog,index in blogs" :key="index" class="blog">
        <h2><router-link :to="'/blog/'+blog.blog_id">{{blog.blog_title}}</router-link></h2>
        <span>发表时间：{{blog.create_time}}</span>
        <span>分类：{{blog.category_name}}</span>
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
  created(){
    this.$axios.get('getBlogs.php',{
      params:{
        u_id:this.$route.params.u_id || 1
      }
    })
    .then(res=>{
      let error_code = res.data.error_code;
      switch(error_code) {
        case 0:
          this.blogs = res.data.data;
          break;
        case 1221:
          alert('该博客账号不存在！');
          break;
        default:
          alert(`服务异常:${error_code}`);
        }
    })
  }
}
</script>

<style scoped>
.showBlogs{
  max-width: 800px;
  margin: 0 auto;
}
.blog{
  max-width: 100%;
  margin: 10px 0 ;
  padding: 10px;
  background-color: #eee;
  border: 1px dotted #000;
  border-radius: 5px;
}
a{
  text-decoration: none;
}

</style>