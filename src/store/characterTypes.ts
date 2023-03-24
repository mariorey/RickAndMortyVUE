import { ActionTree, Commit, MutationTree } from 'vuex';

export interface Character {
    name: string;
    species: string;
    status: string;
    image: string;
    gender: string;
}
export interface CharactersState {
    characters: Character[];
}

export interface RootState {
    version: string;
}

export const actions: ActionTree<CharactersState, RootState> = {
    fetchAPI({ commit },uri: string): void{
        fetch(uri)
            .then(response => response.json())
            .then(data => {
                commit('setCharacters', data.results);
                data.info === undefined || !data.info.prev ? commit('search/setPrevPage', '',{root:true}) : commit('search/setPrevPage', data.info.prev, {root:true})
                data.info === undefined || !data.info.next ? commit('search/setNextPage', '', {root:true}) : commit('search/setNextPage', data.info.next, {root:true})
            });

    }
};
export const mutations: MutationTree<CharactersState> = {
    setCharacters (state: CharactersState, characters: []): void{
        state.characters = characters
    },
};