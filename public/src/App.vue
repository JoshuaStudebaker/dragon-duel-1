<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.dispatch('init')
    }
  }
</script>

<style>
  #app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .dragon-font {
    font-family: 'Metal Mania', cursive;
  }

  .writing {
    font-family: 'Indie Flower', cursive;
  }

  .icon {
    width: 100%
  }
</style>