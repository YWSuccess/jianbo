<template>
  <div class="addBlog">
    <form>
      <h2>发表博客</h2>
      <select v-model="blog.category_id" @change="categoryChange">
        <option v-for="category,index in categories" :key="index" :value="category.category_id">{{category.category_name}}</option>
        <option value="_addCategory">添加分类</option>
      </select>
      <input v-model="blog.title" placeholder="博客标题" @blur="check">
      <label><input type="checkbox" v-model="blog.private">仅本人可见</label>
      <mark-down ref="markdown" @on-save="save" :initialValue="blog.content"></mark-down>
      <input :disabled="!allowed" :class="{allowed:allowed}" type="submit" value="发表博客" @click.prevent="addBlog">
    </form>
  </div>
</template>

<script>
import MarkDown from '../markdown/index';
export default {
  name:'addBlog',
  data(){
    return{
      categories:[],
      blog:{
        title:'',
        content:'',
        category_id:null,
        private:false
      },
      allowed:false
    }
  },
  components:{
    MarkDown
  },
  methods:{
    categoryChange(e){
      if(e.target.value=="_addCategory"){
        let category_name = prompt("请输入分类名字");
        if(category_name){
          this.$axios.post('/addCategory.php',{
            category_name:category_name
          })
          .then(res=>{
            let error_code = res.data.error_code;
            switch(error_code){
              case 0:
                this.categories.push({
                  category_id:res.data.category_id,
                  category_name:category_name
                });
                this.blog.category_id = res.data.category_id;
                break;
              case 1241:
                alert('分类数量上限！');
                this.blog.category_id = this.categories[0]['category_id'];
                break;
              default:
                alert(`服务异常:${error_code}`);
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
      if(this.blog.title && this.blog.category_id){
        this.allowed = true;
      }else{
        this.allowed = false;
      }
    },
    addBlog(){
      this.$refs.markdown.handleSave();
      this.$axios.post('/addBlog.php',this.blog)
      .then(res=>{
        let error_code = res.data.error_code;
        switch(error_code){
          case 0:
            break;
          default:
            alert(`服务异常:${error_code}`);
        }
      })
    }
  },
  created(){
    this.$axios.get('/getCategories.php',{
        params:{
          u_id:1,
        }
      })
      .then(res=>{
        let error_code = res.data.error_code;
        switch(error_code){
          case 0:
            this.categories = res.data.data;
            this.blog.category_id = this.categories[0]['category_id'];
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
.addBlog{
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 5%;
}
h2{
  font-size: 30px;
  margin: 10px 0;
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
  background-color: #ccc;
}
input[type="checkbox"]{
  vertical-align: middle;
  text-align: center;
  min-width: 15px;
  height: 15px;
  margin: 0;
  padding: 0;
}
input.allowed{
  background-color: #10a7b8;
}
</style>