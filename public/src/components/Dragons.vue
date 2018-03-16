<template>
        <div class="dragons">
            <div class="row">
                <div class="col">
                    <h5>Choose your Opponent</h5>
                </div>
            </div>
            <div class="row">
                <div @click="setActiveDragon(dragon)" v-for="dragon in dragons" class="card writing col-6" :class="{active: activeDragon.id==dragon.id}">
                    <div >
                        <p><strong>{{dragon.name}}</strong></p>
                        <p><strong>Starting HP: </strong>{{dragon.maxHP}}</p>
                        <img class="icon action" :src="dragon.imgUrl" alt="">
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <script>
    export default {
        name: 'Dragons',
        props: ['activeDragon'],
        data (){
            return {
    
            }
        },
        computed: {
            dragons(){
                return this.$store.state.dragons
            }
        },
        methods: {
            setActiveDragon(dragon){
                this.$emit('setDragon', dragon)
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
        .card{
            background: transparent
        }
        .card:hover{
            border: 3px solid green;
        }
        .active {
            border: 5px solid blue;
        }
    </style>