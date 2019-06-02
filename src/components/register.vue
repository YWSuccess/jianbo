<template>
  <div class="register">
    <form>
      <h2>欢迎注册。</h2>
      <input v-model="username" placeholder="账号" @blur="check">
      <input v-model="password" type="password" placeholder="密码" @keyup="check">
      <input v-model.trim="email" placeholder="邮箱(选填)">
      <input v-model.trim="nickname" placeholder="昵称(选填)">
      <input :disabled="!allowed" :class="{allowed:allowed}" type="submit" value="立即注册" @click.prevent="register">
    </form>
  </div>
</template>

<script>
export default {
  name:'register',
  data(){
    return {
      username:'',
      password:'',
      email:'',
      nickname:'',
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
    register(){
      this.$axios.post('register.php',{
        username:this.username,
        password:this.password,
        email:this.email,
        nickname:this.nickname
      })
      .then(res=>{
        let error_code = res.data.error_code;
          switch(error_code){
            case 0:
              this.$router.push('/login')
              break;
            case 1211:
              alert('该账号已被注册！');
              break;
            default:
              alert(`服务异常:${error_code}`);
          }
      })
    }
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