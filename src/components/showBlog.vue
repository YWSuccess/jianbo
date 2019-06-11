<template>
  <div class="showBlog">
    <h2>{{blog.title}}<span v-if="blog.private" style="font-size:16px;color:#999">[仅自己可见]</span></h2>
    <div class="infos">
      <span>发表时间：{{blog.create_time}}</span>
      <span>分类：<router-link :to="{path:'/blogs',query:{category_id:blog.category_id}}">{{blog.name}}</router-link></span>
      <span>作者：<router-link :to="{path:'/blogs',query:{u_id:blog.u_id}}">{{blog.username}}</router-link></span>
      <span v-if="this.$store.state.isLogin"><router-link :to="'/editBlog/'+blog.blog_id">编辑博客</router-link></span>
      <a v-if="this.$store.state.isLogin" href="javascript:;" @click="deleteBlog">删除博客</a>
    </div>
    <mark-down ref="markdown" :previewStatus="2" :initialValue="blog.content" :showTools="false"></mark-down>
    <div class="last_edit_time">最后更新时间：{{blog.last_edit_time}}</div>
  </div>
</template>

<script>
import MarkDown from '../markdown/index';
export default {
  name:'showBlog',
  data(){
    return{
      blog:{
        title:'',
        content:''
      },
    }
  },
  components:{
    MarkDown
  },
  created(){
    this.$axios.get('/getBlog.php',{
      params:{
        blog_id:this.$route.params.blog_id
      }
    })
    .then(res=>{
      if(!res.data.status_code){
        this.blog = res.data.blog
      }else{
        alert(res.data.error_msg)
      }
    })
  },
  methods:{
    deleteBlog(){
      if(confirm("删除后将不可恢复，您确定要删除吗？")){
        this.$axios.get('/delBlog.php',{
          params:{
            blog_id:this.blog.blog_id
          }
        })
        .then(res=>{
          if(!res.data.status_code){
            alert('删除成功！');
            this.$router.push({path:'/blogs',query:{u_id:this.$cookies.get('u_id')}})
          }else{
            alert(res.data.error_msg)
          }
        })
      }
    }
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
a{
  text-decoration: none;
  color: #0366d6;
}
a:hover{
  text-decoration: underline;
}
</style>