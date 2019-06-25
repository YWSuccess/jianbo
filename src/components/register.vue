<template>
  <div class="register">
    <form>
      <h2>欢迎注册。</h2>
      <input v-model.trim="username" placeholder="账号(4-12位数字、字母、下划线、汉字的组合)">
      <input v-model.trim="password" type="password" placeholder="密码(6-12位数字、字母、下划线的组合)">
      <input v-model.trim="rePassword" type="password" placeholder="重复密码">
      <input v-model.trim="email" placeholder="邮箱">
      <input v-model.trim="nickname" placeholder="昵称(选填)">
      <input type="submit" value="立即注册" @click.prevent="register">
    </form>
  </div>
</template>

<script>
export default {
  name:'Register',
  data(){
    return {
      username:'',
      password:'',
      rePassword:'',
      email:'',
      nickname:'',
      uPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{4,12}$/,
      pPattern: /^.*(?=.{6,12})(?=.*\d)(?=.*[a-zA-Z]).*$/,
      ePattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    }
  },
  methods:{
    check(){
      if(!this.uPattern.test(this.username)){
        alert('账号需为4-12位数字、字母的组合！');
        return false
      }else if(!this.pPattern.test(this.password)){
        alert('密码需为6-12位数字、字母、下划线的组合！');
        return false
      }else if(this.password!=this.rePassword){
        alert('两次密码输入不一致！');
        this.rePassword = '';
        return false
      }else if(!this.ePattern.test(this.email)){
        alert('请输入正确的邮箱！');
        return false
      }else{
        return true
      }
    },
    register(){
      if(this.check()){
        this.$axios.post('/register.php',{
          username:this.username,
          password:this.password,
          email:this.email,
          nickname:this.nickname
        })
        .then(res=>{
          if(!res.data.status_code){
            // 注册成功后跳转到登录界面
            alert('注册成功！');
            this.$router.push({path:'/login',query:{username:this.username}})
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
.register{
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
</style>