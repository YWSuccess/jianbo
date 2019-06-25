<template>
  <div class="showBlog">
    <h2>{{blog.title}}<span v-if="blog.private" style="font-size:16px;color:#999">[仅自己可见]</span></h2>
    <div class="infos">
      <span>发表时间：{{blog.create_time}}</span>
      <span>分类：<router-link :to="{path:'/blogs',query:{category_id:blog.category_id}}">{{blog.name}}</router-link></span>
      <span>作者：<router-link :to="{path:'/blogs',query:{u_id:blog.u_id}}">{{blog.username}}</router-link></span>
      <span v-if="editPower"><router-link :to="'/editBlog/'+blog.blog_id">[编辑]</router-link></span>
      <a v-if="editPower" href="javascript:;" @click="deleteBlog">[删除]</a>
    </div>
    <mark-down ref="markdown" :previewStatus="2" :initialValue="blog.content" :showTools="false"></mark-down>
    <div class="last_edit_time">最后更新时间：{{blog.last_edit_time}}</div>
    <div class="addComment">
      <textarea v-model="commentContent" placeholder="快来发表你的评论吧"></textarea>
      <input type="submit" value="发 表" @click.prevent="addComment">
    </div>
    <div class="comments">
      <div v-for="comment,index in comments" :key="index" class="comment">
        <p>{{comment.content}}</p>
        <p v-if="comment.u_id!=1"><span>{{comment.create_time}} - <router-link :to="{path:'/blogs',query:{u_id:comment.u_id}}">{{comment.username}}</router-link></span></p>
        <p v-else><span>{{comment.create_time}} - 匿名用戶</span></p>
      </div>
      <div v-if="!comments.length">
        <p>还没有评论哦~赶快来抢沙发吧！</p>
      </div>
    </div>
  </div>
</template>

<script>
import MarkDown from './markdown/index';
export default {
  name:'ShowBlog',
  data(){
    return{
      editPower:false,
      blog:{
        title:'',
        content:''
      },
      commentContent:'',
      comments:[]
    }
  },
  components:{
    MarkDown
  },
  created(){
    // 初始化blog
    this.$axios.get('/getBlog.php',{
      params:{
        blog_id:this.$route.params.blog_id
      }
    })
    .then(res=>{
      if(!res.data.status_code){
        this.blog = res.data.blog;
        // 根据登录状态动态渲染编辑、删除按钮
        this.editPower = this.$cookies.isKey('u_id') && this.blog.u_id ==this.$cookies.get('u_id');
        this.$axios.get('/getComments.php',{
          params:{
            blog_id:this.blog.blog_id
          }
        })
        .then(res=>{
          if(!res.data.status_code){
            this.comments = res.data.comments
          }else{
            alert(res.data.error_msg)
          }
        })
      }else{
        alert(res.data.error_msg);
        this.$router.push('/')
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
    },
    addComment(){
      this.$axios.post('/addComment.php',{
        blog_id:this.blog.blog_id,
        content:this.commentContent
      })
      .then(res=>{
        if(!res.data.status_code){
          this.comments.push(res.data.comment);
          this.commentContent = ''
        }else{
          alert(res.data.error_msg);
        }
      })
    }
  }
}
</script>

<style scoped>
.showBlog{
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 10px 50px;
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
  width: 100%;
  margin: 10px auto;
  padding: 10px;
  background-color: #bbb;
  text-align: center;
  border-radius: 5px;
  color: #666;
  box-sizing: border-box;
  margin-bottom: 30px;
}
a{
  text-decoration: none;
  color: #0366d6;
}
a:hover{
  text-decoration: underline;
}
.addComment{
  width: 100%;
  height: 60px;
  margin-bottom: 30px;
  position: relative;
}
.addComment textarea{
  float: left;
  width: 88%;
  height: 100%;
  padding: 10px;
  margin-right: 5px;
  font-size: 16px;
  border-radius: 5px;
  box-sizing: border-box;
}
.addComment input[type="submit"]{
  float: right;
  width: 10%; 
  min-width: 100px;
  height: 100%;
  color:#fff;
  cursor:pointer;
  font-size: 20px;
  background-color: #10a7b8;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
}
@media screen and (max-device-width : 415px){
  .addComment textarea {
    max-width: 235px;
  }
}
.comment{
  margin-top:10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px dotted #000;
}
.comment p:last-child{
  float: right;
}

</style>