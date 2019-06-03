<template>
  <div class="login">
    <form>
      <h2>登录</h2>
      <input v-model="username" placeholder="账号" @blur="check">
      <input v-model="password" type="password" placeholder="密码" @keyup="check">
      <router-link to="/register">没有账号？立即注册</router-link>
      <input :disabled="!allowed" :class="{allowed:allowed}" type="submit" value="登录" @click.prevent="login">
    </form>
  </div>
</template>

<script>
export default {
  name:'login',
  data(){
    return {
      username:'',
      password:'',
      allowed:false
    }
  },
  methods:{
    check(){
      if(this.username && this.password){
        this.allowed = true;
      }else{
        this.allowed = false;
      }
    },
    login(){
      this.$axios.post('login.php',{
      	username:this.username,
      	password:this.password
      })
      .then(res=>{
        let error_code = res.data.error_code;
        switch(error_code){
          case 0:
            break;
          case 1221:
            alert('该博客账号不存在！');
            break;
          case 1222:
            alert('密码错误！');
            break;
          default:
            alert(`服务异常:${error_code}`);
        }
      })
    }
  },
  created(){
    this.username = this.$route.query.username || ''
  }
}
</script>

<style scoped>
.login{
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 10%;
}
form{
  margin: 0 auto;
  max-width: 80%
}
form input{
  width: 100%;
  height: 50px;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
  border: 1px solid #aaa;
  outline: none;
  border-radius: 5px;
}
input[type="submit"]{
  border: none;
  color:#fff;
  background-color: #ccc;
}
form .allowed{
  background-color: #10a7b8;
}
h2{
  font-size: 30px;
}
</style>