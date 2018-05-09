<template>
    <div class="home">
      <div v-if="activeDragon.id>=0 && activeChampion.id>=0" class="row">
          <div class="col">
            <button class="btn btn-secondary" @click="newGame">Start</button>
          </div>
        </div>
      <div class="row">
        <champions v-on:setChampion='setChampion' :activeChampion='activeChampion' class="col-md col-12"></champions>
        <dragons v-on:setDragon='setDragon' :activeDragon='activeDragon' class="col-md col-12"></dragons>
                <dragons v-on:setDragon='setDragon' :activeDragon='activeDragon' class="col-md col-12"></dragons>
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
      activeChampion: {},
      activeDragon: {}
    }
  },
  methods: {
    setChampion(champion){
      this.activeChampion = champion
    },
    setDragon(dragon){
      this.activeDragon = dragon
    },
    newGame(){
      this.$store.dispatch('newGame', {championId: this.activeChampion.id, dragonId: this.activeDragon.id})
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
