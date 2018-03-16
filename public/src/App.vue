<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h1 class="dragon-font">Champions
            <img src="./assets/logo.png" height="30rem">s. Dragons</h1>
        </div>
      </div>
      <router-view/>
    </div>
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
    color: white;
    margin-top: 60px;
  }

  body {
    background: black;
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