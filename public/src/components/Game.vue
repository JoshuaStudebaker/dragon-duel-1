<template>
    <div class="game">
        <div v-if='!game.error && game._dragon.currentHP > 0' class="row">
            <div class="col-md-6">
                <p><strong>{{game._champion.name}} :</strong> {{game._champion.race}} {{game._champion.class}}</p>
                <p><strong>Current HP: </strong>{{game._champion.hp}}</p>
                <img class="icon" :src="game._champion.imgUrl" alt="">
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col">
                            <p><strong>{{game._dragon.name}}</strong></p>
                            <p><strong>Current HP: </strong>{{game._dragon.currentHP}}</p>
                            <img class="icon" :src="game._dragon.imgUrl" alt="">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Attacks:</p>
                        <button  @click="attack(attackType)" class="btn btn-danger" v-for="(dmg, attackType) in game._champion.attacks">{{attackType}}</button>
                    </div>
                </div>

            </div>
        </div>
        <div v-else-if="!game.error" class="row">
                <div class="col dragon-font win">
                    <h1>YOU WON!</h1>
                    <router-link :to="{ name: 'Home'}"><h4>Play Again?</h4></router-link>
                </div>
            </div>
        <div v-else class="row">
            <div class="col">
                <h3>Error: no game found</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Game',
        mounted() {
            if (!this.$store.state.game._id) {
                this.$store.dispatch('getGame', this.$route.params.gameId)
            }
        },
        data() {
            return {
                gameId: this.$route.params.gameId
            }
        },
        computed: {
            game() {
                return this.$store.state.game
            }
        },
        methods: {
            attack(attackType){
                this.$store.dispatch('attack', {attack: attackType, gameId: this.game._id})
            }
        }
    }

</script>

<style scoped>
    .btn {
        margin: 3px
    }
    .win {
        margin-top: 10vh;
        color: red
    }
</style>