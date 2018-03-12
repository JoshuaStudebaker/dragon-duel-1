<template>
    <div class="champions">
        <div class="row">
            <div class="col">
                <h5>Choose Your Champion</h5>
            </div>
        </div>
        <div class="row">
            <div v-for="champion in champions" class="card writing col-6">
                <p><strong>{{champion.name}} :</strong> {{champion.race}} {{champion.class}}</p>
                <p><strong>Starting HP: </strong>{{champion.hp}}</p>
                <img class="icon" :src="champion.imgUrl" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Champions',
    data (){
        return {

        }
    },
    computed: {
        champions(){
            return this.$store.state.champions
        }
    }
}
</script>

<style>
    .writing{ 
        font-family: 'Indie Flower', cursive;
    }
    p{
        margin-bottom: 0px
    }
</style>