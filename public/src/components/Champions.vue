<template>
    <div class="champions">
        <div class="row">
            <div class="col">
                <h5>Choose Your Champion</h5>
            </div>
        </div>
        <div class="row">
            <div @click="setActiveChampion(champion)" v-for="champion in champions" class="card writing col-6" :class="{active: activeChampion.id==champion.id}">
                <div >
                    <p><strong>{{champion.name}} :</strong> {{champion.race}} {{champion.class}}</p>
                    <p><strong>Starting HP: </strong>{{champion.hp}}</p>
                    <img class="icon action" :src="champion.imgUrl" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Champions',
    props: ['activeChampion'],
    data (){
        return {

        }
    },
    computed: {
        champions(){
            return this.$store.state.champions
        }
    },
    methods: {
        setActiveChampion(champion){
            this.$emit('setChampion', champion)
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
    .card:hover{
        border: 3px solid green;
    }
    .active {
        border: 5px solid blue;
    }
</style>