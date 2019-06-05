<template>
  <div class="heading">
    <h1>简 博</h1>
    <span class="login_icon" @click="login"></span>
    <span v-if="" class="addBlog_icon" @click="addBlog"></span>
  </div>
</template>

<script>
export default {
  name:'heading',
  data(){
    return{
      
    }
  },
  methods:{
    login(){
      if(this.$cookies.get('u_id')){
        this.$router.push(`/${this.$cookies.get('u_id')}`)
      }else{
        this.$router.push('/login')
      }
    },
    addBlog(){
      this.$router.push('/addBlog')
    }
  }
}
</script>

<style scoped>
.heading{
  max-width: 100%;
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  background-color: #10a7b8;
  position: relative;
  color: #fff;
}
.login_icon{
  position: absolute;
  width: 40px;
  height: 40px;
  top: 15px;
  right: 15px;
  border-radius: 20px;
  background-color: #f2f2f2;
  background-image: url('../assets/login.png');
  background-size: cover;
}
.addBlog_icon{
  position: absolute;
  width: 40px;
  height: 40px;
  top: 15px;
  right: 65px;
  border-radius: 20px;
  background-color: #f2f2f2;
  background-image: url('../assets/addBlog.png');
  background-size: cover;
}
h1{
  font-size: 30px;
}
</style>
