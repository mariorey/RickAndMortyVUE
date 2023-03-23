import {searchModule} from './search.module'
import { charactersModule } from './characters.module'
import { createStore } from 'vuex'

export const store = createStore({
  modules: {
    search: searchModule,
    characters: charactersModule
  }
})