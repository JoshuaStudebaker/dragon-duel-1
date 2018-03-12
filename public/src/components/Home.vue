<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-sm-12 text-center">
        <h1 class="dragon-font">Champions   <img src="../assets/logo.png" height="30rem">s. Dragons</h1>
      </div>
    </div>
    <div class="row">
      <champions class="col-md col-12"></champions>
      <dragons class="col-md col-12"></dragons>
    </div>
  </div>
</template>

<script>
import Dragons from './Dragons'
import Champions from './Champions'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    Dragons,
    Champions
  }
}
</script>


<style>

</style>
