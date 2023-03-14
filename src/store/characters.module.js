export const charactersModule = {
    namespaced: true,
    state: {
        characters: []
    },
    actions: {
        fetchAPI(state, uri){
            fetch(uri)
                .then(response => response.json())
                .then(data => {
                    this.commit('characters/setCharacters', data.results);
                    data.info === undefined || !data.info.prev ? this.commit('search/setPrevPage', '') : this.commit('search/setPrevPage', data.info.prev)
                    data.info === undefined || !data.info.next ? this.commit('search/setNextPage', '') : this.commit('search/setNextPage', data.info.next)
                });

        },
    },
    mutations: {
        setCharacters (state, characters){
            state.characters = characters
        },
    },

}