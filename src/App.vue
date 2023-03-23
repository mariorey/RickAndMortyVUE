<template>
  <header class="header">
    <img alt="Rick and Morty character search" class="logo" src="./assets/logo.png"/>
    <div class="header__toggleCharacters">
      <button class="toggleCharacters" v-bind:class="{ 'enabled': !toggle }" value="characters" v-on:click="toggleCharacters">CHARACTERS</button>
      <button class="toggleCharacters" v-bind:class="{ 'enabled': toggle }" value="episodes" v-on:click="toggleCharacters">EPISODES</button>
    </div>
    <SearchInput/>
  </header>
  <div class="container" v-bind:class="{ 'disabled': toggle }">
    <aside class="facets">
      <FilterList filter-type="status" v-bind:filters-collection="statusFilters">
      </FilterList>
      <FilterList filter-type="gender" v-bind:filters-collection="genderFilters">
      </FilterList>
    </aside>
    <main>
      <BaseGrid>
        <TransitionGroup name="grid">
          <Card v-for="character in characters" v-bind:key="character.id" v-bind:character="character"/>
        </TransitionGroup>
      </BaseGrid>
      <div class="buttonsContainer">
        <button class="buttonsContainer__button" v-bind:class="{ 'disabled': prevPage===''}" v-on:click="search(prevPage)"><img width="25" alt="Prev Page" src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/left-chevron-arrow-round-outline-icon.png"></button>
        <span v-bind:class="{ 'disabled': prevPage==='' && nextPage===''}">Pages</span>
        <button class="buttonsContainer__button" v-bind:class="{ 'disabled': nextPage===''}" v-on:click="search(nextPage)"><img width="25" alt="Next Page" src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/right-chevron-arrow-round-outline-icon.png"></button>
      </div>

    </main>
  </div>
  <div class="episodesContainer" v-bind:class="{ 'disabled': !toggle }">
    <Episodes v-bind:toggle="toggle">
      <FilterList class="seasonFilters" filter-type="season" v-bind:filters-collection='seasons'>
      </FilterList>
    </Episodes>
  </div>
  <footer class="footerInfo"> Created by <a class="gitHubLink" href="https://github.com/mariorey"> Mario Rey</a>
  </footer>
</template>
<script lang="ts">
import Card from '@/components/Card.vue'
import Filter from "@/components/Filter.vue";
import BaseGrid from "@/components/BaseGrid.vue";
import SearchInput from "@/components/SearchInput.vue";
import ClearButton from "@/components/ClearButton.vue";
import FilterList from "@/components/FilterList.vue";
import Episodes from "@/components/Episodes.vue";
import { mapState } from 'vuex';
import { mapActions } from 'vuex'
import { defineComponent } from 'vue'


export default defineComponent({
  components: {Episodes, FilterList, ClearButton, Filter, Card, BaseGrid, SearchInput},
  data() {
    return {
      seasons: ['S01', 'S02', 'S03', 'S04', 'S05'],
      statusFilters: ['Alive', 'Dead', 'Unknown'],
      toggle: false,
    };
  },
  mounted() {
    this.search()
  },
  computed: {
    ...mapState('search', ['query', 'statusFilterActivated', 'genderFilterActivated', 'prevPage', 'nextPage']),
    ...mapState('characters', ['characters']),
    genderFilters() {
      return this.characters?.reduce((filters, character) => filters.add(character.gender), new Set()) ?? [];
    },

  },
  watch:{
    query(){
      this.search()
    },
    statusFilterActivated(){
      this.search()
    },
    genderFilterActivated(){
      this.search()
    }
  },
  methods: {
    ...mapActions(['characters/fetchAPI']),
    search(uri = 'https://rickandmortyapi.com/api/character/?name=' + this.query + '&status=' + this.statusFilterActivated + '&gender=' + this.genderFilterActivated) {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.$store.dispatch('characters/fetchAPI', uri);
      }, 300);
    },

    toggleCharacters(event) {
      this.toggle = event.target.value !== 'characters';
    },


  }
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;

  &__toggleCharacters {
    color: dimgrey;
    display: flex;

    justify-content: center;
    border-radius: 0;
  }
}

.logo {
  width: 40vw;
  margin: 0 auto;
}

.facets {
  margin-left: 20px;
}

.filter:hover {
  font-weight: 600;
  cursor: pointer;
}

.buttonsContainer {
  display: flex;
  justify-content: center;
  align-items:center;
  margin: 10px;
  &__button{
    border-style:none;
    background:none;
  }
}

.toggleCharacters {
  font-size: 1em;
  cursor: pointer;
  border-style: none;
  background: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;

}

.enabled {
  font-weight: 600;
}


.container {
  display: flex;
  font-family: 'Arial', sans-serif;
}

.episodesContainer {
  display: flex;
}

.disabled {
  display: none;
}

@media only screen and (max-width: 830px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
  .facets {
    display: flex;
    margin: 0;
  }
  .filtersTitle {
    display: none;
  }
  .logo {
    width: 80vw;
  }

}

.footerInfo {
  display: flex;
  height: 100px;
  background: lightgrey;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
}

.gitHubLink {
  margin-left: 3px;
  color: black;
}

.grid-enter-active,
.grid-leave-active {
  transition: all .3s ease;
  transition-delay: .1s;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(.5);
}
</style>
