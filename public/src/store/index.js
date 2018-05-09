import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'
vue.use(vuex)

//Handles server endpoint depending on if project is local or in production
var production = !window.location.host.includes('localhost')
let server = production ? '//dragon-vue.herokuapp.com/' : '//localhost:3000/'

let gameServer = axios.create({
    baseURL: server + 'api',
    timeout: 3000
})


export default new vuex.Store({
    state: {
        game: {},
        dragons: [],
        champions: []
    },
    mutations: {
        setGame(state, payload) {
            vue.set(state, "game", payload)
        },
        clearGame(state) {
            state.game = {}
        },
        setDragons(state, payload){
            state.dragons = payload.data
        },
        setChampions(state, payload){
            state.champions = payload.data
        }
    },
    actions: {
        init({ commit, dispatch }){
            dispatch('getDragons')
            dispatch('getChampions')
        },
        getDragons({commit, dispatch}){
            gameServer.get('/dragons')
                .then(dragons=>{
                commit('setDragons', dragons)
            })
        },
        getChampions({commit, dispatch}){
            gameServer.get('/champions')
                .then(champions=>{
                commit('setChampions', champions)
            })
        },
        newGame({ commit, dispatch }, payload) {
            gameServer
                .post('/game', payload)
                .then(res => {
                    commit('setGame', res.data.game)
                    router.push({name: 'Game', params:{gameId: res.data.game._id}})
                })
        },
        getGame({ commit, dispatch }, payload){
            gameServer
                .get('/game/'+payload)
                .then(res=>{
                    commit('setGame', res.data)
                })
        },
        attack({ commit, dispatch }, payload) {
            gameServer
                .put('/game/' + payload.gameId, payload)
                .then(res => {
                    commit('setGame', res.data)
                })
        }
    }
})