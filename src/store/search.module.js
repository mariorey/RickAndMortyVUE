export const searchModule = {
    namespaced: true,
    state: {
        query: '',
        statusFilterActivated: '',
        genderFilterActivated: '',
        seasonFilterActivated: '',
        prevPage: '',
        nextPage: ''
    },
    mutations: {
        setQuery(state, query){
            state.query = query
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
}