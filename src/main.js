import { createApp } from 'vue'
import App from './App.vue'
import {createStore} from "vuex";

const store = createStore({
    state: {
        characters: [],
        query: '',
        statusFilterActivated: '',
        genderFilterActivated: '',
        seasonFilterActivated: '',
        prevPage: '',
        nextPage: ''
    },
    getters: {
        getQuery(state){
            return state.query
        }
    },
    mutations: {
        setQuery(state, query){
            state.query = query
        },
        setCharacters (state, characters){
            state.characters = characters
        },
        setPrevPage (state, uri){
            state.prevPage = uri
        },
        setNextPage (state, uri){
            state.nextPage = uri
        },
        setStatusFilterActivated(state, value){
            state.statusFilterActivated = value
        },
        setGenderFilterActivated(state, value){
            state.genderFilterActivated = value
        },
        setSeasonFilterActivated(state, value){
            state.seasonFilterActivated = value
        }
    },
    actions: {
        fetchAPI(state, uri){

                fetch(uri)
                    .then(response => response.json())
                    .then(data => {
                        this.commit('setCharacters', data.results);
                        data.info === undefined || !data.info.prev ? this.commit('setPrevPage', '') : this.commit('setPrevPage', data.info.prev)
                        data.info === undefined || !data.info.next ? this.commit('setNextPage', '') : this.commit('setNextPage', data.info.next)
                    });

        },
    }

})

createApp(App).use(store).mount('#app')
