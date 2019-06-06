<template>
  <div class="addBlog">
    <editBlog type="1"></editBlog>
  </div>
</template>

<script>
import editBlog from './editBlog';
export default {
  name:'addBlog',
  data(){
    return{
    }
  },
  components:{
    editBlog
  }
}
</script>

<style scoped>
</style>