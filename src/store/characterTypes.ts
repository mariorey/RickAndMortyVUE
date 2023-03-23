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
    fetchAPI(state: any, uri: string): void{
        fetch(uri)
            .then(response => response.json())
            .then(data => {
                this.commit('characters/setCharacters', data.results);
                data.info === undefined || !data.info.prev ? this.commit('search/setPrevPage', '') : this.commit('search/setPrevPage', data.info.prev)
                data.info === undefined || !data.info.next ? this.commit('search/setNextPage', '') : this.commit('search/setNextPage', data.info.next)
            });

    }
};
export const mutations: MutationTree<CharactersState> = {
    setCharacters (state: CharactersState, characters: []){
        state.characters = characters
    },
};