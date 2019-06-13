<template>
  <div class="editBlog">
    <form>
      <h2>{{htmlValue.h2Value}}</h2>
      <select v-model="blog.category_id" @change="categoryChange">
        <option v-for="category,index in categories" :key="index" :value="category.category_id">{{category.name}}</option>
        <option value="_addCategory">添加分类</option>
      </select>
      <input v-model.trim="blog.title" placeholder="博客标题">
      <label><input type="checkbox" v-model="blog.private">仅本人可见</label>
      <mark-down ref="markdown" @on-save="save" :initialValue="blog.content"></mark-down>
      <input type="submit" :value="htmlValue.submitValue" @click.prevent="sendBlog">
    </form>
  </div>
</template>

<script>
import MarkDown from '../markdown/index';
export default {
  name:'editBlog',
  props:['type'],
  data(){
    return{
      htmlValue:{
        h2Value:'编辑博客',
        submitValue:'更新博客'
      },
      categories:[],
      blog:{
        title:'',
        content:'',
        category_id:null,
        private:false
      }
    }
  },
  components:{
    MarkDown
  },
  created(){
    this.$axios.get('/getCategories.php',{
      params:{
        u_id:this.$cookies.get('u_id')
      }
    })
    .then(res=>{
      if(!res.data.status_code){
        this.categories = res.data.categories;
        this.blog.category_id = this.categories[0]['category_id']
      }else{
        alert(res.data.error_msg)
      }
    })
    if(this.type==="add"){
      this.htmlValue = {
        h2Value:'发表博客',
        submitValue:'发表博客'
      }
    }else{
      this.$axios.get('/getBlog.php',{
        params:{
          blog_id:this.$route.params.blog_id,
        }
      })
      .then(res=>{
        if(!res.data.status_code){
          this.blog = res.data.blog;
          if(this.blog.u_id!=this.$cookies.get('u_id')){
            alert('只有作者可编辑哦！');
            this.$router.push(`/blog${this.blog.blog_id}`)
          }
        }else{
          alert(res.data.error_msg)
        }
      })
    }
  },
  methods:{
    categoryChange(e){
      if(e.target.value=="_addCategory"){
        let name = prompt("请输入分类名字");
        if(name){
          this.$axios.post('/addCategory.php',{
            name:name
          })
          .then(res=>{
            if(!res.data.status_code){
              this.categories.push({
                  category_id:res.data.category_id,
                  name:name
              });
              this.blog.category_id = res.data.category_id;
            }else{
              alert(res.data.error_msg)
            }
          },res=>{
            this.blog.category_id = this.categories[0]['category_id'];
          })
        }else{
          this.blog.category_id = this.categories[0]['category_id'];
        }
      }
    },
    save(res){
      this.blog.content = res.value;
    },
    check(){
      this.$refs.markdown.handleSave();
      if(!this.blog.category_id){
        alert('分类不能为空！');
        return false
      }else if(!this.blog.title){
        alert('标题不能为空！');
        return false
      }else if(!this.blog.content){
        alert('请先填写博客内容！');
        return false
      }else{
        return true
      }
    },
    sendBlog(){
      if(this.check()){
        const sendURL = this.type==='add'?'/addBlog.php':'/editBlog.php';
        this.$axios.post(sendURL,this.blog)
        .then(res=>{
          if(!res.data.status_code){
            if(this.type==='add'){
              alert('发表成功！');
              this.$router.push({path:`/blog/${res.data.blog_id}`})
            }else{
              alert('更新成功！');
              this.$router.push({path:`/blog/${this.blog.blog_id}`})
            }
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
.editBlog{
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 5%;
}
h2{
  font-size: 30px;
  margin: 10px 0;
  text-align: center;
}
select{
  max-width:150px;
  min-width:100px;
  width:20%;
  height: 30px;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0 10px 10px 0;
  font-size: 16px;
}
input{
  min-width: 200px;
  height: 30px;
  padding: 0 10px;
  font-size: 20px;
  box-sizing: border-box;
  border: 1px solid #aaa;
  outline: none;
  border-radius: 5px;
  margin-right: 10px;
}
input[type="submit"]{
  height: 50px;
  margin-top: 10px;
  font-size: 20px;
  border-radius: 5px;
  width: 100%;
  border: none;
  color:#fff;
  background-color: #10a7b8;
}
input[type="checkbox"]{
  vertical-align: middle;
  text-align: center;
  min-width: 15px;
  height: 15px;
  margin: 0;
  padding: 0;
}
</style>