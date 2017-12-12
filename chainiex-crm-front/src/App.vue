<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        user: null
      }
    }
  }
</script>

<style>
  * {
    margin: 0 auto;
    padding: 0;
  }
</style>