<template>
  <div class="login">
    <form>
      <h2>登录</h2>
      <input v-model.trim="username" placeholder="账号">
      <input v-model.trim="password" type="password" placeholder="密码">
      <label><input type="checkbox" v-model="remeber">记住我(不是个人电脑不要勾选此项)</label>
      <router-link to="/register">没有账号？立即注册</router-link>
      <input type="submit" value="登 录" @click.prevent="login">
    </form>
  </div>
</template>

<script>
export default {
  name:'Login',
  data(){
    return {
      username:'',
      password:'',
      remeber:false,
      uPattern : /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,12}$/,
      pPattern : /^.*(?=.{6,12})(?=.*\d)(?=.*[a-zA-Z]).*$/
    }
  },
  created(){
    this.username = this.$route.query.username || ''
  },
  methods:{
    check(){
      if(!this.uPattern.test(this.username)){
        alert('请输入正确的账号！');
        return false
      }else if(!this.pPattern.test(this.password)){
        alert('请输入正确的密码！');
        return false
      }else{
        return true
      }
    },
    login(){
      if(this.check()){
        this.$axios.post('/login.php',{
          username:this.username,
          password:this.password,
          remeber:this.remeber
        })
        .then(res=>{
          if(!res.data.status_code){
            // 更新登录状态
            this.$store.commit('updateIsLogin',this.$cookies.isKey('u_id'));
            // 登录成功后跳转到展示博客界面
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
.login{
  max-width: 1200px;
  margin: 0 auto;
  padding: 150px 10%;
}
h2{
  font-size: 30px;
  margin: 10px 0;
}
form{
  margin: 0 auto;
  max-width: 80%
}
input{
  width: 100%;
  height: 50px;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
}
input[type="submit"]{
  border: none;
  color:#fff;
  background-color: #10a7b8;
  cursor:pointer;
}
input[type="checkbox"]{
  vertical-align: middle;
  width: 15px;
  height: 15px;
  margin: 0;
  padding: 0;
  float: left;
}
a{
  float: right;
}
</style>