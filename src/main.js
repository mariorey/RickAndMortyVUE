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
    },
    getters: {

    },

})

createApp(App).use(store).mount('#app')
