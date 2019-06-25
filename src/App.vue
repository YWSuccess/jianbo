<template>
  <div id="app">
    <Header></Header>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
@import '../static/css/reset.css';
</style>
