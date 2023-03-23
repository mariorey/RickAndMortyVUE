import {Module, MutationTree} from "vuex";
export interface SearchState {
    query: string,
    statusFilterActivated: string,
    genderFilterActivated: string,
    seasonFilterActivated: string,
    prevPage: string,
    nextPage: string
}

export const mutations: MutationTree<SearchState> = {
    setQuery(state: any, query: string){
        state.query = query
    },
    setPrevPage (state: any, uri: string){
        state.prevPage = uri
    },
    setNextPage (state: any, uri: string){
        state.nextPage = uri
    },
    setStatusFilterActivated(state: any, value: string){
        state.statusFilterActivated = value
    },
    setGenderFilterActivated(state: any, value: string){
        state.genderFilterActivated = value
    },
    setSeasonFilterActivated(state: any, value: string){
        state.seasonFilterActivated = value
    }
}

export interface RootState {
    version: string;
}

export const searchModule : Module<SearchState, RootState> = {
    namespaced: true,
    state: {
        query: '',
        statusFilterActivated: '',
        genderFilterActivated: '',
        seasonFilterActivated: '',
        prevPage: '',
        nextPage: ''
    },
    mutations,
}



