import { Module } from "vuex";
import {actions, CharactersState, mutations, RootState} from "@/store/characterTypes";

export const charactersModule: Module<CharactersState, RootState> = {
    namespaced: true,
    state: {
        characters: []
    },
    actions,
    mutations,

}