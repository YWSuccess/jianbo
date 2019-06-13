<template>
  <div id="app">
    <heading></heading>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import heading from './components/heading'
export default {
  name: 'App',
  components: {
    heading
  }
}
</script>

<style>
@import '../static/css/reset.css';
</style>
