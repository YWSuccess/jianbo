<template>
  <div class="addBlog">
    <editBlog type="add"></editBlog>
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