<template>
  <div class="showBlog">
    <h2>{{blog.blog_title}}</h2>
    <div class="infos">
	    <span>发表时间：{{blog.create_time}}</span>
	    <span>分类：{{blog.category_name}}</span>	
    </div>
    <mark-down ref="markdown" :previewStatus="2" :initialValue="blog.blog_content" :showTools="false"></mark-down>
  	<div class="last_edit_time">最后更新时间：{{blog.last_edit_time}}</div>
  </div>
</template>

<script>
import MarkDown from '../markdown/index';
export default {
  name:'showBlog',
  data(){
    return{
      blog:null,
    }
  },
  components:{
    MarkDown
  },
  created(){
    this.$axios.get('/getBlog.php',{
        params:{
          blog_id:this.$route.params.blog_id,
        }
      })
      .then(res=>{
      let error_code = res.data.error_code;
      switch(error_code) {
        case 0:
          this.blog = res.data.data;
          break;
        case 1101:
          alert('该博客仅本人可见！');
          this.$router.push('/login');
          break;
        case 1231:
          alert('该博客不存在！');
          break;
        default:
          alert(`服务异常:${error_code}`);
        }
    })
  }
}
</script>

<style scoped>
.showBlog{
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 10px 50px;
  background-color: #f1f1f1;
  border-radius: 5px;
}
h2{
  font-size: 30px;
  margin: 10px 0;
  text-align: center;
}
.infos{
  width: 100%;
  margin: 10px auto;
  text-align: right;
}
.last_edit_time{
	width: 60%;
 	margin: 10px auto;
 	padding: 10px;
 	background-color: #bbb;
  text-align: center;
  border-radius: 5px;
  color: #666;
}
</style>