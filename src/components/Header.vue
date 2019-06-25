<template>
  <div class="header">
    <div class="nav">
      <h1><router-link to="/">简 博</router-link></h1>
      <span class="login" @click="toLogin"></span>
      <span v-if="this.$store.state.isLogin" class="addBlog" @click="toAddBlog"></span>
      <span v-if="this.$store.state.isLogin" class="logout" @click="toLogout"></span>
    </div>
  </div>
</template>

<script>
export default {
  name:'Header',
  data(){
    return{
      
    }
  },
  mounted(){
    this.$store.commit('updateIsLogin',this.$cookies.isKey('u_id'))
  },
  methods:{
    toLogin(){
      if(!this.$cookies.isKey('u_id')){
        this.$router.push('/login')
      }else{
        this.$router.push({path:'/blogs',query:{u_id:this.$cookies.get('u_id')}})
      }
    },
    toAddBlog(){
      this.$router.push('/addBlog')
    },
    toLogout(){
      this.$axios.get('/logout.php')
      .then(res=>{
        if(res.data.status_code==0){
          // 用户退出后更新登录状态，保证正确渲染菜单项
          this.$store.commit('updateIsLogin',this.$cookies.isKey('u_id'))
          this.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  position: fixed;
  z-index:999;
}
.nav{
  max-width: 100%;
  background-color: #10a7b8;
  text-align: center;
  max-width: 100%;
  padding: 20px;
  position: relative;
  margin: 0 auto;
  color: #fff;
}
.login{
  position: absolute;
  width: 32px;
  height: 32px;
  top: 20px;
  right: 10px;
  border-radius: 20px;
  background-color: #f2f2f2;
  background-image: url('../assets/login.png');
  background-size: cover;
  cursor: pointer;
}
.addBlog{
  position: absolute;
  width: 32px;
  height: 32px;
  top: 20px;
  right: 50px;
  border-radius: 20px;
  background-color: #f2f2f2;
  background-image: url('../assets/addBlog.png');
  background-size: cover;
  cursor: pointer;
}
.logout{
  position: absolute;
  width: 32px;
  height: 32px;
  top: 20px;
  right: 90px;
  border-radius: 20px;
  background-color: #f2f2f2;
  background-image: url('../assets/logout.png');
  background-size: cover;
  cursor: pointer;
}
h1 a{
  color: #fff;
  font-size: 30px;
  text-decoration: none;
}
h1 a:hover{
  text-decoration: underline;
}
</style>
