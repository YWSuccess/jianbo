<template>
  <div class="addBlog">
    <EditBlog type="add"></EditBlog>
  </div>
</template>

<script>
import EditBlog from './EditBlog';
export default {
  name:'AddBlog',
  data(){
    return{
    }
  },
  components:{
    EditBlog
  }
}
</script>

<style scoped>
</style>